
import React from 'react';

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

interface OverlayContentProps {
  phase: AppPhase;
}

export const OverlayContent: React.FC<OverlayContentProps> = ({ phase }) => {
  const renderContent = () => {
    switch (phase) {
      case AppPhase.COUNTDOWN_3:
        return <div key="3" className="text-[15rem] md:text-[25rem] matrix-text font-bold text-white animate-glitch-enter">3</div>;
      case AppPhase.COUNTDOWN_2:
        return <div key="2" className="text-[15rem] md:text-[25rem] matrix-text font-bold text-white animate-glitch-enter">2</div>;
      case AppPhase.COUNTDOWN_1:
        return <div key="1" className="text-[15rem] md:text-[25rem] matrix-text font-bold text-white animate-glitch-enter">1</div>;
      case AppPhase.GREETING_NEW_YEAR:
        return (
          <div key="ny" className="text-center flex flex-col items-center justify-center h-full animate-zoom-in">
            <h1 className="text-5xl md:text-8xl matrix-text text-white mb-8 tracking-wider animate-glitch-enter">Happy New</h1>
            <h1 className="text-6xl md:text-[10rem] matrix-text text-pink-500 leading-none glow-pink animate-pulse">Year 2026</h1>
          </div>
        );
      case AppPhase.GREETING_NAME:
        return (
          <div key="name" className="text-center flex flex-col items-center animate-glitch-enter">
            <div className="mb-8 relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-pink-500 shadow-[0_0_30px_#ff2e88]">
               <img 
                 src="https://res.cloudinary.com/dyovozajb/image/upload/v1767240315/Screenshot_20260101_110338_TikTok_i6zwfa.jpg" 
                 alt="Yến Nhi" 
                 className="w-full h-full object-cover" 
                 onError={(e) => {
                   e.currentTarget.src = "https://via.placeholder.com/400?text=Yến+Nhi";
                 }} 
               />
            </div>
            <h1 className="text-5xl md:text-[10rem] matrix-text text-white tracking-widest uppercase text-center px-4 animate-zoom-in">
              YẾN NHI
            </h1>
          </div>
        );
      case AppPhase.GREETING_COMPLIMENT:
        return (
          <div key="compliment" className="text-center flex flex-col gap-6 animate-slide-up">
            <p className="text-4xl md:text-7xl matrix-text text-white">XINH GÁI,</p>
            <p className="text-4xl md:text-7xl matrix-text text-white" style={{animationDelay: '0.2s'}}>DÁNG NGON,</p>
            <p className="text-6xl md:text-[9rem] matrix-text text-pink-500 font-bold glow-pink animate-pulse" style={{animationDelay: '0.4s'}}>HPNY</p>
          </div>
        );
      case AppPhase.GREETING_LOVE:
        return (
          <div key="love" className="text-center flex flex-col items-center justify-center gap-4 animate-zoom-in">
            <h1 className="text-5xl md:text-[8rem] matrix-text text-white tracking-wider animate-glitch-enter">VẠN SỰ</h1>
            <h1 className="text-5xl md:text-[8rem] matrix-text text-white tracking-wider animate-glitch-enter" style={{animationDelay: '0.2s'}}>NHƯ Ý</h1>
            <h1 className="text-5xl md:text-[8rem] matrix-text text-pink-400 tracking-wider glow-pink animate-glitch-enter" style={{animationDelay: '0.4s'}}>AN KHANG</h1>
          </div>
        );
      case AppPhase.GREETING_FINAL:
        return (
          <div key="final" className="relative w-full h-full flex items-center justify-center animate-fade-in">
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
               <svg viewBox="0 0 100 100" className="w-[90vw] h-[90vw] md:w-[60vh] md:h-[60vh] animate-pulse-heart">
                  <path d="M50 88.9L16.7 55.6C7.2 46.1 7.2 30.9 16.7 21.4 26.2 11.9 41.4 11.9 50.9 21.4L50 22.3 49.1 21.4C58.6 11.9 73.8 11.9 83.3 21.4 92.8 30.9 92.8 46.1 83.3 55.6L50 88.9z" 
                        fill="none" 
                        stroke="#ff2e88" 
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                  />
                  <path d="M50 80L23 53C16 46 16 34 23 27 30 20 42 20 49 27L50 28 51 27C58 20 70 20 77 27 84 34 84 46 77 53L50 80z" 
                        fill="rgba(255, 46, 136, 0.1)" 
                        stroke="#ff2e88" 
                        strokeWidth="0.5"
                  />
               </svg>
             </div>
             
            <div className="z-10 text-center space-y-4">
              <h2 className="text-2xl md:text-4xl matrix-text text-white leading-relaxed max-w-4xl mx-auto animate-fade-in">
                CHÚC BẠN TỪ NĂM NAY
                <br />
                MỌI THỨ ĐỀU
              </h2>
              <h1 className="text-5xl md:text-8xl matrix-text text-pink-500 font-bold glow-pink uppercase mt-4 animate-pop-in">PHẤT...</h1>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="z-10 flex items-center justify-center w-full h-full p-4 select-none pointer-events-none">
      {renderContent()}
    </div>
  );
};
