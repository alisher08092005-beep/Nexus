
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { Mic, Loader2, X, MessageSquare, Sparkles } from 'lucide-react';

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function decode(base64: string) {
  if (!base64) return new Uint8Array(0);
  try {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  } catch (e) {
    return new Uint8Array(0);
  }
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, Math.max(1, Math.floor(frameCount)), sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < buffer.length; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const LiveConsultant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const startSession = async () => {
    if (!process.env.API_KEY) {
      alert("AI Key missing. Ensure it is configured in Netlify.");
      return;
    }

    setIsConnecting(true);
    try {
      // CRITICAL: AudioContext must be resumed inside a user gesture for mobile browsers
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const outputCtx = new AudioCtx({ sampleRate: 24000 });
      await outputCtx.resume();
      audioContextRef.current = outputCtx;

      const inputCtx = new AudioCtx({ sampleRate: 16000 });
      await inputCtx.resume();
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = mediaStream;
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            if (!streamRef.current) return;
            const source = inputCtx.createMediaStreamSource(streamRef.current);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              if (!e.inputBuffer || e.inputBuffer.numberOfChannels === 0) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const base64 = encode(new Uint8Array(int16.buffer));
              sessionPromise.then(s => {
                if (s) s.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            setIsConnecting(false);
            setIsActive(true);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts.find(p => p.inlineData)?.inlineData?.data;
            if (audioData && audioContextRef.current) {
              setIsSpeaking(true);
              const decodedBytes = decode(audioData);
              const buffer = await decodeAudioData(decodedBytes, audioContextRef.current, 24000, 1);
              const source = audioContextRef.current.createBufferSource();
              source.buffer = buffer;
              source.connect(audioContextRef.current.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              };
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e){} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onerror: (e) => {
            console.error('Advisor Error:', e);
            stopSession();
          },
          onclose: () => stopSession()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          systemInstruction: 'You are the Nexus Growth Advisor. Keep it brief, professional, and inspiring.'
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Advisor Start Failed:', err);
      setIsConnecting(false);
      setIsActive(false);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) try { sessionRef.current.close(); } catch(e){}
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (audioContextRef.current) try { audioContextRef.current.close(); } catch(e){}
    sessionRef.current = null;
    streamRef.current = null;
    audioContextRef.current = null;
    setIsActive(false);
    setIsSpeaking(false);
    setIsConnecting(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {isActive ? (
        <div className="absolute bottom-0 right-0 bg-white w-[300px] md:w-80 rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="p-4 bg-indigo-600 flex justify-between items-center text-white">
            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Sparkles size={14} /> Live Advisor</span>
            <button onClick={stopSession} className="hover:bg-white/20 p-1 rounded-full"><X size={16} /></button>
          </div>
          <div className="p-8 flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${isSpeaking ? 'border-indigo-400 bg-indigo-50 scale-110' : 'border-slate-100'}`}>
              {isSpeaking ? (
                <div className="flex gap-1">
                  {[1,2,3].map(i => <div key={i} className="w-1 h-5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: `${i*0.1}s` }}></div>)}
                </div>
              ) : <Mic className="w-8 h-8 text-slate-300" />}
            </div>
            <p className="mt-4 text-slate-900 font-bold text-sm">Nexus Voice Active</p>
          </div>
        </div>
      ) : (
        <button 
          onClick={startSession}
          disabled={isConnecting}
          className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl hover:scale-110 transition-all flex items-center justify-center disabled:opacity-50"
        >
          {isConnecting ? <Loader2 className="animate-spin" /> : <MessageSquare size={28} />}
        </button>
      )}
    </div>
  );
};

export default LiveConsultant;
