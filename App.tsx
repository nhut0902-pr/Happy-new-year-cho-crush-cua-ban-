
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
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Giả lập hệ thống load để người dùng thấy trang web đang chạy
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const startExperience = () => {
    setPhase(AppPhase.COUNTDOWN_3);
    if (audioRef.current) {
      audioRef.current.volume = 0.8;
      audioRef.current.play().catch(e => {
        console.warn("Yêu cầu tương tác người dùng để phát nhạc:", e);
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
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center font-['DotGothic16']">
      {/* Assets: Music - Đảm bảo đường dẫn tương đối đúng cho Vercel */}
      <audio ref={audioRef} src="assets/music.mp3" loop preload="auto" />

      {/* Background Matrix Effect */}
      <MatrixRain 
        color={phase === AppPhase.IDLE ? "#222" : "#ff2e88"} 
        speed={phase === AppPhase.IDLE ? 0.5 : 1.5}
      />

      {/* Fireworks Effect Layer */}
      {showFireworks && <Fireworks />}

      {/* Start Button Overlay */}
      {phase === AppPhase.IDLE && (
        <div className={`z-50 text-center transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-6 space-y-2">
            <p className="text-pink-500/40 text-xs animate-pulse">SYSTEM_READY: OK</p>
            <p className="text-pink-500/40 text-xs animate-pulse" style={{animationDelay: '0.2s'}}>ASSETS_LOADED: OK</p>
          </div>
          <button 
            onClick={startExperience}
            className="px-12 py-5 bg-transparent border-2 border-pink-500 text-pink-500 rounded-lg text-3xl font-bold tracking-[0.2em] hover:bg-pink-500 hover:text-white transition-all duration-500 transform hover:scale-105 shadow-[0_0_30px_rgba(255,46,136,0.3)] active:scale-95"
          >
            ENTER
          </button>
          <p className="mt-6 text-pink-500/60 text-sm uppercase tracking-widest animate-bounce">Nhấn để bắt đầu</p>
        </div>
      )}

      {/* Main Animated Content */}
      {phase !== AppPhase.IDLE && (
        <OverlayContent phase={phase} />
      )}

      {/* Footer Branding */}
      <div className="absolute bottom-6 left-6 z-50 text-pink-500/30 text-[10px] font-mono select-none uppercase tracking-tighter">
        <span>Vercel Build v3.0.1 - {new Date().getFullYear()}</span>
      </div>
      
      <div className="absolute bottom-6 right-6 z-50 text-pink-500/50 text-xs font-mono select-none flex flex-col items-end">
        <span className="opacity-50">00011010101 SYSTEM</span>
        <span className="text-pink-400 font-bold mt-1 tracking-widest shadow-sm">Powered By Nhutcoder</span>
      </div>
    </div>
  );
};

export default App;
