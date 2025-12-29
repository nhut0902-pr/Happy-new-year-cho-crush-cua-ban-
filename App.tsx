
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
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
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

  // Determine if fireworks should show
  const showFireworks = phase >= AppPhase.GREETING_NEW_YEAR;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Assets: Music */}
      <audio ref={audioRef} src="assets/music.mp3" loop />

      {/* Background Matrix Effect */}
      <MatrixRain 
        color={phase === AppPhase.IDLE ? "#333" : "#ff2e88"} 
        speed={phase === AppPhase.IDLE ? 1 : 1.5}
      />

      {/* Fireworks Effect Layer */}
      {showFireworks && <Fireworks />}

      {/* Start Button Overlay */}
      {phase === AppPhase.IDLE && (
        <div className="z-50 text-center animate-pulse">
          <button 
            onClick={startExperience}
            className="px-8 py-4 bg-transparent border-2 border-pink-500 text-pink-500 rounded-full text-2xl font-bold tracking-widest hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-[0_0_20px_rgba(255,46,136,0.5)]"
          >
            BẮT ĐẦU
          </button>
          <p className="mt-4 text-pink-500/60 font-mono text-sm uppercase tracking-tighter">Click to unlock the experience</p>
        </div>
      )}

      {/* Main Animated Content */}
      {phase !== AppPhase.IDLE && (
        <OverlayContent phase={phase} />
      )}

      {/* Footer Branding */}
      <div className="absolute bottom-4 right-4 z-50 text-pink-500/50 text-xs font-mono select-none flex flex-col items-end">
        <span>00011010101 SYSTEM V3.0</span>
        <span className="text-pink-400 font-bold mt-1">Powered By Nhutcoder</span>
      </div>
    </div>
  );
};

export default App;
