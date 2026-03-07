import { useEffect, useRef, useState } from "react";

export function DiscoBall() {
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Scroll detection: show when "programm" section is in view
  useEffect(() => {
    const check = () => {
      const el = document.getElementById("programm");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Show when the top of the section is within 300px of viewport top
      setVisible(rect.top < 300 && rect.bottom > 0);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  // Canvas light rays
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 200;
    const h = 300;
    canvas.width = w;
    canvas.height = h;

    let t = 0;

    const lightColors = [
      "rgba(255,100,100,0.25)",
      "rgba(100,200,255,0.25)",
      "rgba(255,220,80,0.25)",
      "rgba(150,255,150,0.25)",
      "rgba(255,150,255,0.25)",
      "rgba(255,255,255,0.2)",
    ];

    const rays = Array.from({ length: 8 }, (_, i) => ({
      angle: (Math.PI * 2 * i) / 8,
      speed: 0.008 + Math.random() * 0.012,
      length: 80 + Math.random() * 120,
      width: 3 + Math.random() * 5,
      color: lightColors[i % lightColors.length],
      offset: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.016;

      const cx = w / 2;
      const cy = 40; // ball center

      // Draw light rays from ball
      rays.forEach((ray) => {
        const angle = ray.angle + Math.sin(t * ray.speed * 60 + ray.offset) * 0.5 + t * 0.3;
        const endX = cx + Math.cos(angle) * ray.length;
        const endY = cy + Math.sin(angle) * ray.length + 40; // bias downward

        ctx.save();
        ctx.globalAlpha = 0.4 + Math.sin(t * 2 + ray.offset) * 0.2;

        // Ray as gradient line
        const grad = ctx.createLinearGradient(cx, cy, endX, endY);
        grad.addColorStop(0, ray.color);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = ray.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
      });

      // Floating light dots
      for (let i = 0; i < 12; i++) {
        const dotAngle = t * 0.5 + (Math.PI * 2 * i) / 12;
        const dotR = 50 + Math.sin(t * 1.5 + i) * 30;
        const dx = cx + Math.cos(dotAngle) * dotR;
        const dy = cy + 100 + Math.sin(dotAngle) * dotR * 0.6;
        const dotAlpha = 0.3 + Math.sin(t * 3 + i * 0.8) * 0.25;

        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fillStyle = lightColors[i % lightColors.length].replace(/[\d.]+\)$/, `${dotAlpha})`);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [visible]);

  return (
    <div
      className="fixed z-50 pointer-events-none left-1/2"
      style={{
        top: 42,
        transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-180px)",
        transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Light effects canvas behind the ball */}
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
        style={{
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 320,
          height: 460,
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 0.5s",
        }}
      />

      {/* String / wire */}
      <div
        className="mx-auto"
        style={{
          width: 2,
          height: 32,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(200,200,200,0.3))",
        }}
      />

      {/* Disco ball */}
      <div
        className="relative mx-auto"
        style={{
          width: 77,
          height: 77,
        }}
      >
        {/* Ball base */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 35% 30%, #e8e8f0, #a0a0b0 40%, #707080 70%, #505060)",
            boxShadow:
              "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(200,200,255,0.15), inset 0 -4px 8px rgba(0,0,0,0.3)",
          }}
        />

        {/* Mirror tiles grid - clips to circle */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <svg viewBox="0 0 88 44" className="absolute inset-0 h-full" style={{
            width: "200%",
            animation: visible ? "disco-tile-scroll 2.5s linear infinite" : "none",
          }}>
            {/* Horizontal bands */}
            {[6, 11, 16, 21, 26, 31, 36, 39].map((y) => (
              <line
                key={`h-${y}`}
                x1="0"
                y1={y}
                x2="88"
                y2={y}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.5"
              />
            ))}
            {/* Vertical lines - doubled for seamless scroll */}
            {[3, 8, 13, 18, 23, 28, 33, 38, 43, 47, 52, 57, 62, 67, 72, 77, 82, 87].map((x) => (
              <line
                key={`v-${x}`}
                x1={x}
                y1="2"
                x2={x}
                y2="42"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.5"
              />
            ))}
            {/* Sparkle highlights - first half */}
            <circle cx="10" cy="14" r="2" fill="rgba(255,255,255,0.6)" />
            <circle cx="24" cy="8" r="1.5" fill="rgba(255,255,255,0.5)" />
            <circle cx="18" cy="28" r="1.8" fill="rgba(255,255,255,0.4)" />
            <circle cx="35" cy="12" r="1" fill="rgba(255,255,255,0.7)" />
            <circle cx="8" cy="22" r="1.2" fill="rgba(255,255,255,0.45)" />
            <circle cx="30" cy="34" r="1.5" fill="rgba(255,255,255,0.35)" />
            <circle cx="40" cy="20" r="1.8" fill="rgba(255,255,255,0.55)" />
            {/* Sparkle highlights - second half (repeat for seamless) */}
            <circle cx="54" cy="14" r="2" fill="rgba(255,255,255,0.6)" />
            <circle cx="68" cy="8" r="1.5" fill="rgba(255,255,255,0.5)" />
            <circle cx="62" cy="28" r="1.8" fill="rgba(255,255,255,0.4)" />
            <circle cx="79" cy="12" r="1" fill="rgba(255,255,255,0.7)" />
            <circle cx="52" cy="22" r="1.2" fill="rgba(255,255,255,0.45)" />
            <circle cx="74" cy="34" r="1.5" fill="rgba(255,255,255,0.35)" />
            <circle cx="84" cy="20" r="1.8" fill="rgba(255,255,255,0.55)" />
          </svg>
        </div>

        {/* Shimmer / light sweep overlay */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
        >
          <div
            className="absolute"
            style={{
              width: "200%",
              height: "100%",
              top: 0,
              left: 0,
              background:
                "linear-gradient(90deg, transparent 0%, transparent 10%, rgba(255,255,255,0.18) 15%, transparent 20%, transparent 35%, rgba(255,255,255,0.12) 40%, transparent 45%, transparent 60%, rgba(255,255,255,0.22) 65%, transparent 70%, transparent 85%, rgba(255,255,255,0.1) 90%, transparent 95%)",
              animation: visible ? "disco-tile-scroll 2.5s linear infinite" : "none",
            }}
          />
        </div>

        {/* Static radial shading to maintain 3D sphere look */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.25) 100%)",
          }}
        />
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes disco-tile-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes disco-shimmer {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}