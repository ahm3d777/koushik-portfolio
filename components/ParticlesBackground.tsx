
import React, { useEffect, useRef } from 'react';

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      color: string;
      alpha: number;
      hasTrail: boolean;
      trailLength: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1; // 1px to 3px
        this.speedY = Math.random() * 1.5 + 0.5; // 0.5 to 2.0 vertical speed
        
        // Colors: Rose or Silver
        const isRose = Math.random() > 0.6; // 40% chance of rose
        this.color = isRose ? '244, 63, 94' : '192, 192, 192'; // rgb values
        
        this.alpha = Math.random() * 0.5 + 0.2;
        
        // 15% chance to have a light trail
        this.hasTrail = Math.random() < 0.15;
        this.trailLength = this.hasTrail ? Math.random() * 20 + 10 : 0;
      }

      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height + 100;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.hasTrail = Math.random() < 0.15;
        this.trailLength = this.hasTrail ? Math.random() * 20 + 10 : 0;
      }

      update() {
        this.y -= this.speedY;
        
        if (this.hasTrail) {
            // Trails move slightly faster for parallax effect
            this.y -= this.speedY * 0.5;
        }

        if (this.y < -50) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        
        if (this.hasTrail) {
            // Draw gradient trail
            const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.trailLength * 2);
            gradient.addColorStop(0, `rgba(${this.color}, ${this.alpha})`);
            gradient.addColorStop(1, `rgba(${this.color}, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x, this.y, this.size, this.trailLength * 2);
        } else {
            // Draw simple circle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.fill();
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth / 8, 80); // Responsive count
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none opacity-60"
    />
  );
};

export default ParticlesBackground;
