/**
 * Wimpelkette als Overlay-Container
 * Kann unabhängig von anderen Elementen positioniert werden
 */

export function PennantsOverlay() {
  const count = 12;
  const green = "#006B3F";
  const white = "#ffffff";
  
  // Bezier: M0,10 Q600,50 1200,10 → y(t)=10+80t(1-t), x(t)=1200t
  const getY = (x: number) => { 
    const t = x / 1200; 
    return 10 + 80 * t * (1 - t); 
  };
  
  const getAngle = (x: number) => {
    const t = x / 1200;
    return Math.atan2(80 - 160 * t, 1200) * (180 / Math.PI);
  };

  return (
    <div 
      className="relative z-10 mt-2 md:-mt-4 w-full"
      style={{ 
        pointerEvents: 'none' 
      }}
    >
      <svg 
        viewBox="0 0 1200 90" 
        className="w-full" 
        preserveAspectRatio="none" 
        style={{ display: "block" }}
      >
        <path 
          d="M0,10 Q600,50 1200,10" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="2" 
          fill="none" 
        />
        {Array.from({ length: count }).map((_, i) => {
          const x = i * 100 + 50;
          const ropeY = getY(x);
          const angle = getAngle(x);
          const fill = i % 2 === 0 ? green : white;
          return (
            <polygon
              key={i}
              points="-18,0 18,0 0,55"
              fill={fill}
              opacity={0.85}
              transform={`translate(${x},${ropeY}) rotate(${angle})`}
            />
          );
        })}
      </svg>
    </div>
  );
}