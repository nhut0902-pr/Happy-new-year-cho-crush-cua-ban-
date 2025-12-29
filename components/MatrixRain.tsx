
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

    // VIDEO RECREATION CONFIG
    const chars = "10".split(""); // STRICTLY BINARY
    const fontSize = 14; // Slightly larger to be visible but dense
    const columnSpacing = 10; // Tight columns
    let columns = Math.floor(width / columnSpacing);

    let drops: number[] = [];
    let speeds: number[] = [];
    let opacities: number[] = [];
    
    const init = () => {
      columns = Math.floor(width / columnSpacing);
      drops = [];
      speeds = [];
      opacities = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; 
        // varied speeds: some fast streams, some slower
        speeds[i] = (Math.random() * 2 + 1) * speed; 
        opacities[i] = Math.random() * 0.5 + 0.5;
      }
    };

    init();

    const draw = () => {
      // Hard fade for distinct tails
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; 
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px 'DotGothic16', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * columnSpacing;
        const y = drops[i] * fontSize;

        // Visual logic:
        // Head is bright white
        // Tail is the color (pink)
        
        // Draw the tail character
        ctx.fillStyle = color;
        ctx.globalAlpha = opacities[i] * 0.8;
        ctx.fillText(text, x, y);

        // Draw the leading head (brighter, sometimes sparkles)
        // We draw it slightly below current pos to look like it's leading
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 1.0;
        ctx.fillText(text, x, y + fontSize);

        // Reset
        if (y * fontSize > height && Math.random() > 0.95) {
          drops[i] = -10; // Restart above screen
          speeds[i] = (Math.random() * 2 + 1) * speed;
        }

        drops[i] += speeds[i] * 0.5; // Scale speed
      }
      ctx.globalAlpha = 1.0;
    };

    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
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
    />
  );
};
