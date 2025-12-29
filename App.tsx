
import React, { useState, useEffect, useRef } from 'react';
import { MatrixRain } from './components/MatrixRain';
import { OverlayContent } from './components/OverlayContent';
import { Fireworks } from './components/Fireworks';

enum AppPhase {
  IDLE,
  COUNTDOWN_3,
  COUNTDOWN_2,
  COUNTDOWN_1,
  GREETING_NEW_YEAR,
  GREETING_NAME,
  GREETING_COMPLIMENT,
  GREETING_LOVE,
  GREETING_FINAL,
}

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.IDLE);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startExperience = () => {
    setPhase(AppPhase.COUNTDOWN_3);
    if (audioRef.current) {
      audioRef.current.volume = 0.8;
      audioRef.current.play().catch(e => {
        console.warn("Audio interaction required:", e);
      });
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    switch (phase) {
      case AppPhase.COUNTDOWN_3:
        timer = setTimeout(() => setPhase(AppPhase.COUNTDOWN_2), 1000);
        break;
      case AppPhase.COUNTDOWN_2:
        timer = setTimeout(() => setPhase(AppPhase.COUNTDOWN_1), 1000);
        break;
      case AppPhase.COUNTDOWN_1:
        timer = setTimeout(() => setPhase(AppPhase.GREETING_NEW_YEAR), 1000);
        break;
      case AppPhase.GREETING_NEW_YEAR:
        timer = setTimeout(() => setPhase(AppPhase.GREETING_NAME), 4000);
        break;
      case AppPhase.GREETING_NAME:
        timer = setTimeout(() => setPhase(AppPhase.GREETING_COMPLIMENT), 4000);
        break;
      case AppPhase.GREETING_COMPLIMENT:
        timer = setTimeout(() => setPhase(AppPhase.GREETING_LOVE), 4000);
        break;
      case AppPhase.GREETING_LOVE:
        timer = setTimeout(() => setPhase(AppPhase.GREETING_FINAL), 4000);
        break;
      default:
        break;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [phase]);

  const showFireworks = phase >= AppPhase.GREETING_NEW_YEAR;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Assets: Music */}
      <audio ref={audioRef} src="assets/music.mp3" loop preload="auto" />

      {/* Background Matrix Effect */}
      <MatrixRain 
        color={phase === AppPhase.IDLE ? "rgba(255, 46, 136, 0.5)" : "#ff2e88"} 
        speed={phase === AppPhase.IDLE ? 0.7 : 1.5}
      />

      {/* Fireworks Layer */}
      {showFireworks && <Fireworks />}

      {/* Start Button Overlay */}
      {phase === AppPhase.IDLE && (
        <div className="z-50 text-center animate-fade-in">
          <div className="mb-8 space-y-2">
            <p className="text-pink-500/80 text-sm font-mono tracking-widest animate-pulse uppercase">00011010101_CORE_READY</p>
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.5em]">System initialized</p>
          </div>
          <button 
            onClick={startExperience}
            className="px-14 py-6 bg-transparent border-2 border-pink-500 text-pink-500 rounded-lg text-4xl font-bold tracking-[0.3em] hover:bg-pink-500 hover:text-white transition-all duration-500 transform hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_40px_rgba(255,46,136,0.4)]"
          >
            ENTER
          </button>
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-pink-400 font-bold uppercase tracking-[0.4em] animate-bounce text-sm">Bấm để bắt đầu</p>
            <p className="text-white/20 text-[9px] font-mono">Requires audio interaction</p>
          </div>
        </div>
      )}

      {/* Main Animated Content */}
      {phase !== AppPhase.IDLE && (
        <OverlayContent phase={phase} />
      )}

      {/* Footer Branding */}
      <div className="absolute bottom-6 left-6 z-50 text-pink-500/20 text-[10px] font-mono select-none uppercase tracking-widest">
        <span>Vercel Build v3.2.0</span>
      </div>
      
      <div className="absolute bottom-6 right-6 z-50 text-pink-500/50 text-xs font-mono select-none flex flex-col items-end">
        <span className="opacity-40">SYSTEM_00011010101</span>
        <span className="text-pink-400 font-bold mt-1 tracking-widest uppercase glow-pink">Powered By Nhutcoder</span>
      </div>
    </div>
  );
};

export default App;
