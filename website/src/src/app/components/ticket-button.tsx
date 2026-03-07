import { useState } from "react";

export function TicketButton({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-5 no-underline group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "scale(1.07) rotate(-1deg)" : "scale(1) rotate(0deg)",
        transition: "transform 0.3s ease",
        filter: hovered
          ? "drop-shadow(0 6px 24px rgba(45,139,111,0.5))"
          : "drop-shadow(0 4px 16px rgba(45,139,111,0.35))",
      }}
    >
      <svg
        viewBox="0 0 260 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "clamp(220px, 50vw, 280px)", height: "auto" }}
      >
        <defs>
          {/* Ticket shape mask with notches */}
          <clipPath id="ticket-clip">
            {/* Main ticket rectangle */}
            <rect x="0" y="0" width="260" height="80" rx="10" />
          </clipPath>
          <mask id="ticket-mask">
            <rect x="0" y="0" width="260" height="80" rx="10" fill="white" />
            {/* Left notch */}
            <circle cx="0" cy="40" r="12" fill="black" />
            {/* Right notch */}
            <circle cx="260" cy="40" r="12" fill="black" />
            {/* Top perforation holes */}
            {[40, 52, 64, 76, 88, 100, 112, 124, 136, 148, 160, 172, 184, 196, 208, 220].map(
              (x) => (
                <circle key={`t-${x}`} cx={x} cy="0" r="2.5" fill="black" />
              )
            )}
            {/* Bottom perforation holes */}
            {[40, 52, 64, 76, 88, 100, 112, 124, 136, 148, 160, 172, 184, 196, 208, 220].map(
              (x) => (
                <circle key={`b-${x}`} cx={x} cy="80" r="2.5" fill="black" />
              )
            )}
          </mask>
          <linearGradient id="ticket-bg" x1="0" y1="0" x2="260" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2d8b6f" />
            <stop offset="100%" stopColor="#1a6b4a" />
          </linearGradient>
          <linearGradient id="ticket-shine" x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </linearGradient>
        </defs>

        {/* Ticket body */}
        <g mask="url(#ticket-mask)">
          <rect x="0" y="0" width="260" height="80" fill="url(#ticket-bg)" />
          {/* Shine overlay */}
          <rect x="0" y="0" width="260" height="80" fill="url(#ticket-shine)" />

          {/* Left stub area */}
          <rect x="0" y="0" width="42" height="80" fill="rgba(0,0,0,0.08)" />

          {/* Dashed perforation line */}
          <line
            x1="42"
            y1="6"
            x2="42"
            y2="74"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Star / ticket icon on left stub */}
          <text x="21" y="46" textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.6)" fontFamily="'Playfair Display', serif" fontWeight="700" letterSpacing="0.02em">
            ★
          </text>

          {/* Main text */}
          <text
            x="151"
            y="36"
            textAnchor="middle"
            fill="white"
            fontSize="17"
            fontFamily="'Playfair Display', serif"
            fontWeight="700"
            fontStyle="italic"
            letterSpacing="0.04em"
          >
            Tickets
          </text>
          <text
            x="151"
            y="56"
            textAnchor="middle"
            fill="white"
            fontSize="17"
            fontFamily="'Playfair Display', serif"
            fontWeight="700"
            fontStyle="italic"
            letterSpacing="0.04em"
          >
            sichern!
          </text>

          {/* Subtle pattern lines */}
          {[12, 24, 36, 48, 60, 68].map((y) => (
            <line
              key={`p-${y}`}
              x1="50"
              y1={y}
              x2="252"
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}
        </g>
      </svg>
    </a>
  );
}