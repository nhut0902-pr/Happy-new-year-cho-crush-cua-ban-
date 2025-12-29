
import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  color?: string;
  speed?: number;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ 
  color = "#ff2e88", 
  speed = 1.0 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initial clear
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    const chars = "10".split(""); 
    const fontSize = 15; 
    const columnSpacing = 12; 
    let columns = Math.floor(width / columnSpacing);

    let drops: number[] = [];
    let speeds: number[] = [];
    
    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / columnSpacing);
      drops = [];
      speeds = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; 
        speeds[i] = (Math.random() * 1.5 + 0.5) * speed; 
      }
    };

    init();

    const draw = () => {
      // Trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)"; 
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px 'DotGothic16', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * columnSpacing;
        const y = drops[i] * fontSize;

        // Tail
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);

        // Leading head
        ctx.fillStyle = "#ffffff";
        ctx.fillText(text, x, y + fontSize);

        if (y * fontSize > height && Math.random() > 0.975) {
          drops[i] = -10;
        }

        drops[i] += speeds[i]; 
      }
    };

    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [color, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: '#000' }}
    />
  );
};
