import { useState, useEffect } from "react";
import { MapPin, Calendar, Clock, Phone, Mail, PartyPopper, Star, Music, Beer, Users, Target, Trophy, X, Send, Menu } from "lucide-react";
import { Link, RouterProvider, createBrowserRouter } from "react-router";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Fireworks } from "./components/fireworks";
import { AGBPage } from "./components/agb-page";
import { DatenschutzPage } from "./components/datenschutz-page";
import { DiscoBall } from "./components/disco-ball";
import { TicketButton } from "./components/ticket-button";
import { TicketShop } from "./components/ticket-shop";
import { TicketCountdown } from "./components/ticket-countdown";
import { PennantsOverlay } from "./components/pennants";
import { CookieBanner } from "./components/cookie-banner";

const fireworksImg = "https://images.unsplash.com/photo-1657032178129-fedec8a0947a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJld29ya3MlMjBuaWdodCUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MjU3NTY2NHww&ixlib=rb-4.1.0&q=80&w=1080";
import autoscooterImg from "figma:asset/d301daf9d2eabbc76292ef3859a540092ad41a54.png";
import flohmarktImg from "figma:asset/007d1b1b9854f78d0ed6f06b96bfc41f9f1d9365.png";
import bandLogoImg from "figma:asset/b7411d8102f4f0584c50d780a32d14280b0c9b56.png";
import svLogoImg from "figma:asset/a6948e24712d25a24e428b9f548c9062c98a7718.png";
import svLogoBadge from "figma:asset/389f347f23d75ed31a109e0cf49ef599b9018841.png";
import tsnLogo from "figma:asset/75da564a456f2c18d5ed872e8a100b98e2e978c1.png";
import steinreinigerLogo from "figma:asset/74c787ff6e19b674cfef44c79ac626a2d71118e4.png";
import zilligenLogo from "figma:asset/028791d0287e0559cde433c400b1b65c27a48fce.png";
import wronowskiLogo from "figma:asset/001dea807a73fbfb68b019cea8221cef7e7c3715.png";
import beckmannLogo from "figma:asset/83785cb1614150ac6cba1406c52ecdd206e7955f.png";


/* ── Programm 2026 ── */
const programm = [
  {
    tag: "Freitag, 12.09.",
    events: [
      { zeit: "18:00", titel: "Andacht St.-Stephanus-Kirche" },
      { zeit: "19:00", titel: "Kranzniederlegung Friedhof" },
      { zeit: "19:15", titel: "Umzug zum Festzelt" },
      { zeit: "20:00", titel: "Zeltdisko mit DJ Bernd", hinweis: "(Eintritt frei)" },
      { zeit: "21:00", titel: "Feuerwerk" },
    ],
    hinweis: "(Ab 16 Jahre bis 24 Uhr, ab 18 Jahre Open End)",
  },
  {
    tag: "Samstag, 13.09.",
    events: [
      { zeit: "13:45", titel: "Umzug, Treffpunkt Domäne" },
      { zeit: "15:00", titel: "Flohmarkt Alte Turnhalle" },
      { zeit: "15:30", titel: "Kaffee & Kuchen Festzelt\n& Kinderfest/Familienfest", hinweis: "(Eintritt frei)" },
      { zeit: "19:30", titel: "Proklamation" },
      { zeit: "20:00", titel: "__partynacht__", hinweis: null },
    ],
    hinweis: null,
  },
  {
    tag: "Sonntag, 14.09.",
    events: [
      { zeit: "09:45", titel: "Grosser Umzug\nTreffpunkt Domäne" },
      { zeit: "11:30", titel: "Katerfrühstück" },
    ],
    hinweis: null,
  },
];

/* ── Highlights ── */
const highlights = [
  { label: "Kaffee & Kuchen", color: "#8b5c2d", icon: "☕" },
  { label: "Kinderkarussell", color: "#d4437a", icon: "🎠" },
  { label: "Flohmarkt", color: "#6b3fa0", icon: "🛍️" },
  { label: "Tombola", color: "#2d8b6f", icon: "🎰" },
  { label: "Autoscooter", color: "#e85d3a", icon: "🎢" },
  { label: "Hüpfburgen", color: "#f5a623", icon: "🏰" },
  { label: "Kinderspiele", color: "#3a7be8", icon: "🎮" },
  { label: "Volksmajestäten\u00adschiessen", color: "#c41e3a", icon: "🎯" },
];

/* ── Mini-Kinderspiele (Bauklötze, Ball, Würfel) ── */
function MiniKinderspiele() {
  return (
    <div className="relative" style={{ width: 140, height: 130 }}>
      {/* Bauklötze-Turm links */}
      <div className="absolute" style={{ left: 10, bottom: 18 }}>
        <div style={{ width: 26, height: 18, background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)", borderRadius: 3, boxShadow: "0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)" }} />
        <div style={{ width: 22, height: 18, marginLeft: 2, marginTop: -1, background: "linear-gradient(135deg, #f1c40f 0%, #d4a30e 100%)", borderRadius: 3, boxShadow: "0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)", animation: "block-wobble 3s ease-in-out infinite" }} />
        <div style={{ width: 18, height: 18, marginLeft: 4, marginTop: -1, background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)", borderRadius: 3, boxShadow: "0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)", animation: "block-wobble 3s 0.3s ease-in-out infinite" }} />
      </div>

      {/* Hüpfender Ball mitte */}
      <div className="absolute" style={{ left: "50%", bottom: 18, transform: "translateX(-50%)", animation: "ball-bounce 1.8s ease-in-out infinite" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #ff6b9d, #e74c8b 50%, #c2185b 100%)", boxShadow: "0 4px 10px rgba(231,76,139,0.4), inset 0 -3px 6px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)" }}>
          <div className="absolute rounded-full" style={{ top: 5, left: 3, width: 22, height: 6, background: "rgba(255,255,255,0.25)", borderRadius: "50%", transform: "rotate(-15deg)" }} />
          <div className="absolute" style={{ top: 8, left: 9, fontSize: 10, opacity: 0.5 }}>★</div>
        </div>
        <div className="absolute" style={{ bottom: -5, left: "50%", transform: "translateX(-50%)", width: 22, height: 6, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)", animation: "ball-shadow 1.8s ease-in-out infinite" }} />
      </div>

      {/* Würfel rechts */}
      <div className="absolute" style={{ right: 10, bottom: 20, animation: "dice-roll 4s ease-in-out infinite" }}>
        <div className="relative" style={{ width: 28, height: 28 }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #fff 0%, #e8e8e8 100%)", borderRadius: 4, border: "1.5px solid #ccc", boxShadow: "2px 2px 0 #bbb, 4px 4px 0 #aaa, 0 4px 12px rgba(0,0,0,0.15)" }}>
            {[[4,4],[4,11],[4,18],[16,4],[16,11],[16,18]].map(([t,l],j)=>(
              <div key={`dot${j}`} className="absolute rounded-full" style={{ top: t, left: l, width: 5, height: 5, background: "radial-gradient(circle at 40% 40%, #444, #111)" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Kreisel oben */}
      <div className="absolute" style={{ left: "50%", top: 2, transform: "translateX(-50%)", animation: "spin-top 2.5s linear infinite" }}>
        <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "14px solid #9b59b6" }} />
        <div className="absolute -top-[2px] left-1/2 -translate-x-1/2" style={{ width: 16, height: 5, background: "#8e44ad", borderRadius: "50%" }} />
      </div>

      {/* Deko */}
      {["🌟","🎈","🎪","✨"].map((e, j) => (
        <div key={`kd${j}`} className="absolute" style={{ fontSize: 11, top: [0, 5, 85, 95][j], left: [100, 125, 5, 120][j], animation: `kid-sparkle 2s ${j * 0.5}s ease-in-out infinite` }}>{e}</div>
      ))}
    </div>
  );
}

/* ── Mini-Schießstand (animierte Zielscheibe & Gewehr) ── */
function MiniSchiesstand() {
  return (
    <div className="relative" style={{ width: 150, height: 145 }}>
      {/* Krone oben */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-[2px]" style={{
        fontSize: 22,
        filter: "drop-shadow(0 2px 6px rgba(196,30,58,0.5))",
        animation: "crown-float 3s ease-in-out infinite",
      }}>👑</div>

      {/* Zielscheibe */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[26px]" style={{ width: 80, height: 80 }}>
        {/* Äußerer Ring */}
        <div className="absolute inset-0 rounded-full" style={{
          background: "radial-gradient(circle, #fff 0%, #f0ece4 100%)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 2px 8px rgba(0,0,0,0.08)",
          border: "2px solid #d4c8b8",
        }} />
        <div className="absolute rounded-full" style={{ inset: 8, background: "#222", boxShadow: "inset 0 1px 4px rgba(255,255,255,0.1)" }} />
        <div className="absolute rounded-full" style={{ inset: 16, background: "#2a6ab8", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)" }} />
        <div className="absolute rounded-full" style={{ inset: 24, background: "#c41e3a", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)" }} />
        <div className="absolute rounded-full" style={{ inset: 30, background: "radial-gradient(circle at 40% 35%, #ffd700, #daa520)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
        <div className="absolute rounded-full" style={{ inset: 35, background: "radial-gradient(circle at 40% 35%, #fff 0%, #ffd700 100%)", boxShadow: "0 0 8px rgba(255,215,0,0.6)" }} />

        {/* Fadenkreuz */}
        <div className="absolute inset-0" style={{ animation: "crosshair-aim 3.5s ease-in-out infinite" }}>
          <div className="absolute left-1/2 -translate-x-1/2 top-[2px]" style={{ width: 1.5, height: 76, background: "rgba(0,0,0,0.3)" }} />
          <div className="absolute top-1/2 -translate-y-1/2 left-[2px]" style={{ width: 76, height: 1.5, background: "rgba(0,0,0,0.3)" }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 5, height: 5, background: "rgba(196,30,58,0.7)", boxShadow: "0 0 6px rgba(196,30,58,0.5)" }} />
        </div>

        {/* Einschusslöcher */}
        {[{ x: 34, y: 32, d: "0s" }, { x: 42, y: 38, d: "1.2s" }, { x: 37, y: 42, d: "2.4s" }].map((h, j) => (
          <div key={`hole${j}`} className="absolute rounded-full" style={{ left: h.x, top: h.y, width: 5, height: 5, background: "radial-gradient(circle, #111 40%, transparent 70%)", animation: `shot-appear 3.5s ${h.d} ease-out infinite`, opacity: 0 }} />
        ))}
      </div>

      {/* Gewehr */}
      <div className="absolute" style={{ right: 8, bottom: 14, transform: "rotate(55deg)", animation: "rifle-recoil 3.5s ease-out infinite" }}>
        <div style={{ width: 38, height: 5, background: "linear-gradient(180deg, #666 0%, #444 100%)", borderRadius: "2px 1px 1px 2px", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
        <div className="absolute -right-[14px] top-[-3px]" style={{ width: 20, height: 11, background: "linear-gradient(180deg, #8b5c2d 0%, #6b4226 100%)", borderRadius: "2px 6px 6px 2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
        <div className="absolute -left-[8px] top-[-2px]" style={{ width: 10, height: 10, background: "radial-gradient(circle, rgba(255,200,50,0.9) 0%, transparent 70%)", borderRadius: "50%", animation: "muzzle-flash 3.5s ease-out infinite", opacity: 0 }} />
      </div>

      {/* Deko */}
      {["⭐", "✨", "🏆"].map((emoji, j) => (
        <div key={`sdeco${j}`} className="absolute" style={{ fontSize: 10, top: j === 0 ? 22 : j === 1 ? 90 : 60, left: j === 0 ? 6 : j === 1 ? 140 : 2, animation: `deco-twinkle 2.5s ${j * 0.8}s ease-in-out infinite`, opacity: 0 }}>{emoji}</div>
      ))}
    </div>
  );
}

/* ── Mini-Flohmarkt (animierter Stand) ── */
function MiniFlohmarkt() {
  return (
    <div className="relative" style={{ width: 150, height: 140 }}>
      {/* Sonnenschirm-Stange */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[32px]" style={{
        width: 4, height: 80,
        background: "linear-gradient(180deg, #b8860b, #8b6914)",
        borderRadius: 2,
      }} />
      {/* Sonnenschirm */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[2px]" style={{
        width: 110, height: 30,
        background: "repeating-conic-gradient(#c41e3a 0deg 30deg, #fff8dc 30deg 60deg)",
        clipPath: "ellipse(50% 100% at 50% 100%)",
        borderRadius: "50%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        transform: "scaleY(0.9)",
      }} />
      {/* Tisch */}
      <div className="absolute bottom-[18px] left-[10px]" style={{
        width: 130, height: 14,
        background: "linear-gradient(180deg, #c4873b 0%, #a0692e 100%)",
        borderRadius: "3px 3px 0 0",
        boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
      }} />
      {/* Tischbeine */}
      {[18, 128].map((x, j) => (
        <div key={`leg${j}`} className="absolute" style={{
          left: x, bottom: 4, width: 5, height: 16,
          background: "linear-gradient(180deg, #a0692e, #7a4f20)",
          borderRadius: "0 0 2px 2px",
        }} />
      ))}
      {/* Vase */}
      <div className="absolute" style={{
        left: 22, bottom: 32, width: 16, height: 28,
        background: "linear-gradient(180deg, #4a90d9, #2a6ab8)",
        borderRadius: "6px 6px 4px 4px",
        clipPath: "polygon(20% 0%, 80% 0%, 100% 30%, 90% 100%, 10% 100%, 0% 30%)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        animation: "floh-wobble 3s 0.2s ease-in-out infinite",
      }}>
        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2" style={{ fontSize: 10 }}>🌸</div>
      </div>
      {/* Buch-Stapel */}
      <div className="absolute" style={{ left: 45, bottom: 32 }}>
        {[
          { w: 20, h: 5, bg: "#e85d3a", rot: -2 },
          { w: 22, h: 5, bg: "#2d8b6f", rot: 1 },
          { w: 18, h: 5, bg: "#f5c542", rot: -1 },
        ].map((b, j) => (
          <div key={`book${j}`} className="relative" style={{
            width: b.w, height: b.h, background: b.bg,
            borderRadius: "1px 3px 3px 1px",
            transform: `rotate(${b.rot}deg)`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            marginBottom: -1,
          }} />
        ))}
      </div>
      {/* Teddy */}
      <div className="absolute" style={{
        left: 74, bottom: 32,
        animation: "floh-wobble 2.8s 0.6s ease-in-out infinite",
      }}>
        <div style={{ fontSize: 22, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>🧸</div>
      </div>
      {/* Lampe */}
      <div className="absolute" style={{
        left: 100, bottom: 32,
        animation: "floh-wobble 3.2s 1s ease-in-out infinite",
      }}>
        <div style={{ fontSize: 18, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>🪔</div>
      </div>
      {/* Schallplatte */}
      <div className="absolute" style={{
        left: 118, bottom: 30, width: 18, height: 18,
        background: "radial-gradient(circle, #333 30%, #111 70%)",
        borderRadius: "50%",
        border: "1px solid #555",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        animation: "floh-spin 4s linear infinite",
      }}>
        <div className="absolute inset-0 flex items-center justify-center" style={{
          width: 6, height: 6, background: "#e85d3a",
          borderRadius: "50%", margin: "auto",
        }} />
      </div>
      {/* Preisschilder */}
      {[
        { x: 18, y: 22, price: "2€", rot: -12 },
        { x: 70, y: 18, price: "1€", rot: 8 },
        { x: 108, y: 24, price: "3€", rot: -5 },
      ].map((tag, j) => (
        <div key={`tag${j}`} className="absolute" style={{
          left: tag.x, top: tag.y,
          animation: `floh-tag ${2.5 + j * 0.3}s ${j * 0.5}s ease-in-out infinite`,
        }}>
          <div style={{
            background: "#fffbe6",
            border: "1px solid #d4c070",
            borderRadius: 3,
            padding: "1px 4px",
            fontSize: 7,
            color: "#8b6914",
            fontFamily: "'Fredoka', sans-serif",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            transform: `rotate(${tag.rot}deg)`,
          }}>{tag.price}</div>
        </div>
      ))}
      {/* Deko */}
      {["✨", "💰"].map((emoji, j) => (
        <div key={`fdeco${j}`} className="absolute" style={{
          fontSize: 10,
          top: j === 0 ? 8 : 45,
          left: j === 0 ? 2 : 140,
          animation: `deco-twinkle 2.5s ${j * 1.2}s ease-in-out infinite`,
          opacity: 0,
        }}>{emoji}</div>
      ))}
    </div>
  );
}

/* ── Mini Kaffee & Kuchen (animiert) ── */
function MiniCoffeeAndCake() {
  return (
    <div className="relative" style={{ width: 160, height: 140 }}>
      {/* ═══ Untertasse ═══ */}
      <div className="absolute bottom-[8px] left-[18px]" style={{
        width: 70, height: 18, borderRadius: "50%",
        background: "linear-gradient(180deg, #f5f0e8 0%, #e8ddd0 100%)",
        boxShadow: "0 3px 8px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.6)",
        border: "1px solid #d4c8b8",
      }} />

      {/* ═══ Kaffeetasse ═══ */}
      <div className="absolute bottom-[16px] left-[24px]" style={{ animation: "cup-wobble 4s ease-in-out infinite" }}>
        {/* Tassenkörper */}
        <div className="relative" style={{
          width: 52, height: 40,
          background: "linear-gradient(135deg, #f5f0e8 0%, #e8ddd0 50%, #ddd0c0 100%)",
          borderRadius: "4px 4px 18px 18px",
          border: "2px solid #c8b8a0",
          boxShadow: "0 4px 12px rgba(139,92,45,0.25), inset 0 -8px 16px rgba(139,92,45,0.1)",
          overflow: "hidden",
        }}>
          {/* Kaffee-Oberfläche */}
          <div className="absolute top-[4px] left-[3px] right-[3px]" style={{
            height: 14,
            background: "linear-gradient(180deg, #5c3a1e 0%, #7a4f2e 40%, #6b4428 100%)",
            borderRadius: "2px 2px 50% 50%",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.3)",
          }}>
            {/* Kaffee-Glanz */}
            <div className="absolute top-[2px] left-[4px]" style={{
              width: 16, height: 6, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
            }} />
          </div>
          {/* Herzchen-Latte-Art */}
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2" style={{
            fontSize: 7, opacity: 0.4, filter: "blur(0.3px)",
          }}>🤍</div>
        </div>
        {/* Henkel */}
        <div className="absolute top-[6px] -right-[10px]" style={{
          width: 14, height: 22,
          border: "3px solid #c8b8a0",
          borderLeft: "none",
          borderRadius: "0 12px 12px 0",
        }} />
      </div>

      {/* ═══ Dampf-Schwaden ═══ */}
      {[0, 1, 2].map((s) => (
        <div key={s} className="absolute" style={{
          left: 36 + s * 10,
          bottom: 58,
          width: 8,
          height: 30,
          animation: `steam-rise 2.4s ${s * 0.6}s ease-out infinite`,
          opacity: 0,
        }}>
          <svg width="8" height="30" viewBox="0 0 8 30">
            <path
              d={s === 1
                ? "M4,30 Q1,22 5,16 Q8,10 3,4 Q2,1 4,0"
                : "M4,30 Q7,22 3,16 Q0,10 5,4 Q6,1 4,0"
              }
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
      {/* Dampf-Partikel (kleine Kreise) */}
      {[0, 1, 2, 3].map((p) => (
        <div key={`p${p}`} className="absolute rounded-full" style={{
          width: 4, height: 4,
          left: 34 + p * 8,
          bottom: 62,
          background: "rgba(255,255,255,0.5)",
          boxShadow: "0 0 4px rgba(255,255,255,0.3)",
          animation: `steam-dot ${2 + p * 0.3}s ${p * 0.5}s ease-out infinite`,
          opacity: 0,
        }} />
      ))}

      {/* ═══ Kuchenstück ═══ */}
      <div className="absolute bottom-[10px] right-[12px]" style={{ animation: "cake-bounce 3s ease-in-out infinite" }}>
        {/* Teller */}
        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2" style={{
          width: 52, height: 12, borderRadius: "50%",
          background: "linear-gradient(180deg, #f5f0e8 0%, #e0d5c8 100%)",
          border: "1px solid #d4c8b8",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }} />
        {/* Kuchen-Körper (Dreiecks-Stück) */}
        <div className="relative" style={{ width: 40, height: 36 }}>
          {/* Untere Schicht - Teig */}
          <div className="absolute bottom-0 left-0" style={{
            width: 40, height: 28,
            background: "linear-gradient(180deg, #f0d4a0 0%, #e8c488 50%, #d4a86a 100%)",
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0 0 4px 4px",
          }} />
          {/* Erdbeer-Schicht (Mitte) */}
          <div className="absolute bottom-[6px] left-[4px]" style={{
            width: 32, height: 4,
            background: "linear-gradient(90deg, #e85d5d, #d44a4a, #e85d5d)",
            clipPath: "polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)",
          }} />
          {/* Sahne-Schicht oben */}
          <div className="absolute bottom-[14px] left-[6px]" style={{
            width: 28, height: 5,
            background: "linear-gradient(180deg, #fffef5 0%, #f5eed8 100%)",
            clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
            borderRadius: "2px",
          }} />
          {/* Sahne-Häubchen oben */}
          <div className="absolute top-[2px] left-1/2 -translate-x-1/2" style={{
            width: 14, height: 10,
            background: "radial-gradient(ellipse, #fffef8 0%, #f5eed8 100%)",
            borderRadius: "50% 50% 30% 30%",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }} />
          {/* Erdbeere oben drauf */}
          <div className="absolute -top-[6px] left-1/2 -translate-x-1/2" style={{
            fontSize: 11,
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
            animation: "strawberry-wiggle 3s ease-in-out infinite",
          }}>🍓</div>
        </div>
      </div>

      {/* ═══ Kleine Deko-Herzen / Sterne ═══ */}
      {["✨", "💛", "✨"].map((emoji, j) => (
        <div key={`deco${j}`} className="absolute" style={{
          fontSize: 8,
          top: 20 + j * 25,
          left: j === 1 ? 78 : (j === 0 ? 10 : 120),
          animation: `deco-twinkle 2.5s ${j * 0.8}s ease-in-out infinite`,
          opacity: 0,
        }}>{emoji}</div>
      ))}
    </div>
  );
}

/* ── Mini-Tombola (Losbehälter) ── */
function MiniTombola() {
  const lose = [
    { x: 14, rot: -18, color: "#f5c542", h: 30 },
    { x: 28, rot: 8, color: "#3a7be8", h: 26 },
    { x: 42, rot: -6, color: "#ff6b6b", h: 32 },
    { x: 56, rot: 14, color: "#2d8b6f", h: 24 },
    { x: 70, rot: -10, color: "#d4437a", h: 28 },
    { x: 84, rot: 5, color: "#f5a623", h: 22 },
  ];
  return (
    <div className="relative" style={{ width: 140, height: 130 }}>
      <div className="absolute left-1/2 -translate-x-1/2" style={{
        top: 4, width: 16, zIndex: 10,
        animation: "ticket-pull 3s ease-in-out infinite",
      }}>
        <div className="relative" style={{
          width: 16, height: 40,
          background: "linear-gradient(180deg, #fffbe6 0%, #f5e6a3 100%)",
          borderRadius: "3px 3px 1px 1px",
          border: "1px solid #d4c070",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}>
          <div className="absolute -bottom-[2px] left-0 right-0" style={{
            height: 4,
            background: "repeating-linear-gradient(90deg, transparent 0px, transparent 2px, #d4c070 2px, #d4c070 3px)",
            opacity: 0.5,
          }} />
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 text-center" style={{ fontSize: 7, color: "#8b6914" }}>
            <div>🍀</div>
            <div style={{ fontSize: 6 }}>42</div>
          </div>
        </div>
        <div className="absolute -top-[14px] left-1/2 -translate-x-1/2" style={{ fontSize: 16 }}>🤞</div>
      </div>
      <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2" style={{ width: 110, height: 75 }}>
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, #c41e3a 0%, #a01830 60%, #8b1228 100%)",
          clipPath: "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 6px 20px rgba(196,30,58,0.4), inset 0 4px 10px rgba(255,255,255,0.1)",
        }}>
          <div className="absolute left-[8px] top-0 bottom-0" style={{
            width: 8, background: "linear-gradient(180deg, rgba(255,255,255,0.2), transparent)", borderRadius: 4,
          }} />
        </div>
        <div className="absolute -top-[3px] left-[6px] right-[6px]" style={{
          height: 7, background: "linear-gradient(180deg, #f5d462 0%, #c4942d 100%)",
          borderRadius: "4px 4px 0 0", border: "1px solid #a07a20",
          boxShadow: "0 2px 6px rgba(196,148,45,0.4)",
        }} />
        {lose.map((los, j) => (
          <div key={`los${j}`} className="absolute" style={{
            left: los.x, top: -los.h + 10, width: 12, height: los.h,
            background: `linear-gradient(180deg, ${los.color}, ${los.color}cc)`,
            borderRadius: "2px 2px 0 0", transform: `rotate(${los.rot}deg)`,
            transformOrigin: "bottom center", border: `1px solid ${los.color}88`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            animation: `ticket-peek ${2 + j * 0.3}s ${j * 0.4}s ease-in-out infinite`,
          }}>
            <div className="absolute bottom-0 left-0 right-0" style={{
              height: 3, background: "repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px)",
            }} />
          </div>
        ))}
        <div className="absolute top-[22px] left-1/2 -translate-x-1/2 text-center" style={{
          fontSize: 9, color: "#f5d462", fontFamily: "'Fredoka', sans-serif",
          textShadow: "0 1px 3px rgba(0,0,0,0.4)", letterSpacing: "0.1em",
        }}>TOMBOLA</div>
      </div>
      {["✨", "🎉", "⭐"].map((emoji, j) => (
        <div key={`deco${j}`} className="absolute" style={{
          fontSize: 10, top: j === 0 ? 2 : (j === 1 ? 50 : 20),
          left: j === 0 ? 8 : (j === 1 ? 120 : 125),
          animation: `deco-twinkle 2.5s ${j * 0.8}s ease-in-out infinite`, opacity: 0,
        }}>{emoji}</div>
      ))}
    </div>
  );
}

/* ── Mini-Karussell (animiert, 3D) ── */
function MiniCarousel() {
  const horses = [
    { emoji: "🐴", color: "#d4437a" },
    { emoji: "🦄", color: "#f5a623" },
    { emoji: "��", color: "#3a7be8" },
    { emoji: "🦄", color: "#2d8b6f" },
    { emoji: "🐴", color: "#e85d3a" },
    { emoji: "🦄", color: "#6b3fa0" },
  ];
  const r = 40;
  return (
    <div className="relative" style={{ width: 160, height: 170 }}>
      {/* Dachspitze */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-1 z-30"
        style={{
          width: 0, height: 0,
          borderLeft: "50px solid transparent",
          borderRight: "50px solid transparent",
          borderBottom: "38px solid #d4437a",
          filter: "drop-shadow(0 -3px 8px rgba(212,67,122,0.5))",
        }}
      />
      {/* Dach-Streifen */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[30px] z-30"
        style={{
          width: 130, height: 18,
          background: "repeating-conic-gradient(#f5a623 0% 8.33%, #d4437a 8.33% 16.66%)",
          borderRadius: "0 0 65px 65px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      />
      {/* Flagge */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-40" style={{ width: 10, height: 14 }}>
        <div style={{ width: 12, height: 10, backgroundColor: "#f5c542", clipPath: "polygon(0 0, 100% 30%, 0 100%)", marginLeft: -1 }} />
      </div>
      {/* Mittelsäule */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-0"
        style={{ top: 16, width: 6, height: 110, background: "linear-gradient(180deg, #f5c542, #c4942d)", borderRadius: 3 }}
      />
      {/* 3D-Karussell */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: 48, width: r * 2, height: 70, perspective: 300 }}>
        <div style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d", animation: "carousel-spin 5s linear infinite" }}>
          {horses.map((horse, idx) => {
            const angle = (idx / horses.length) * 360;
            return (
              <div
                key={idx}
                className="absolute flex flex-col items-center"
                style={{ left: "50%", top: 0, marginLeft: -12, transform: `rotateY(${angle}deg) translateZ(${r}px)`, backfaceVisibility: "visible" }}
              >
                <div style={{ width: 3, height: 22, background: "linear-gradient(180deg, #f5c542, #c4942d)", borderRadius: 2 }} />
                <span style={{ fontSize: 20, filter: `drop-shadow(0 2px 4px ${horse.color}88)`, animation: `horse-bob 0.8s ${idx * 0.13}s ease-in-out infinite`, display: "block" }}>
                  {horse.emoji}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Bodenplatte */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[30px] z-10"
        style={{ width: 120, height: 14, background: "linear-gradient(180deg, #d4437a, #a8305f)", borderRadius: "50%", boxShadow: "0 4px 16px rgba(212,67,122,0.4)" }}
      />
    </div>
  );
}

/* ── Mini-Hüpfburg (animiert) ── */
function MiniBouncy() {
  return (
    <div className="relative" style={{ width: 150, height: 140, animation: "bounce-castle 2s ease-in-out infinite", transformOrigin: "bottom center" }}>
      {/* Schatten am Boden */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: 130,
          height: 10,
          background: "radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      {/* Basis / Boden der Burg */}
      <div
        className="absolute bottom-[6px] left-1/2 -translate-x-1/2"
        style={{
          width: 130,
          height: 30,
          background: "linear-gradient(180deg, #f5a623, #e8941a)",
          borderRadius: "0 0 18px 18px",
          border: "3px solid #d4850f",
          borderTop: "none",
        }}
      />
      {/* Hauptkörper – aufgeblasene Form */}
      <div
        className="absolute bottom-[30px] left-1/2 -translate-x-1/2"
        style={{
          width: 120,
          height: 60,
          background: "linear-gradient(180deg, #ff6b6b 0%, #ee5a24 50%, #f5a623 100%)",
          borderRadius: "20px 20px 6px 6px",
          border: "3px solid #d4850f",
          boxShadow: "inset 0 8px 20px rgba(255,255,255,0.3), inset 0 -4px 10px rgba(0,0,0,0.15)",
        }}
      >
        {/* Nähte / Streifen */}
        <div className="absolute inset-0 flex justify-around items-stretch overflow-hidden" style={{ borderRadius: "17px 17px 3px 3px" }}>
          {[0, 1, 2].map((j) => (
            <div key={j} style={{ width: 2, background: "rgba(255,255,255,0.25)", margin: "6px 0" }} />
          ))}
        </div>
        {/* Eingangsöffnung */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: 28,
            height: 30,
            background: "linear-gradient(180deg, #1a1a2e 0%, #2a1a3e 100%)",
            borderRadius: "14px 14px 0 0",
            border: "2px solid #d4850f",
            borderBottom: "none",
          }}
        />
      </div>
      {/* Linker Turm */}
      <div
        className="absolute bottom-[82px] left-[12px]"
        style={{
          width: 26,
          height: 40,
          background: "linear-gradient(180deg, #ff6b6b, #ee5a24)",
          borderRadius: "10px 10px 4px 4px",
          border: "2px solid #d4850f",
          boxShadow: "inset 0 6px 12px rgba(255,255,255,0.3)",
        }}
      >
        {/* Turmspitze */}
        <div
          className="absolute -top-[14px] left-1/2 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderBottom: "16px solid #ff6b6b",
            filter: "drop-shadow(0 -2px 4px rgba(255,107,107,0.4))",
          }}
        />
        {/* Flagge */}
        <div className="absolute -top-[20px] left-1/2 -translate-x-1/2" style={{ width: 2, height: 10, background: "#d4850f" }}>
          <div style={{ width: 8, height: 6, background: "#f5c542", clipPath: "polygon(0 0, 100% 30%, 0 100%)", marginLeft: 2, marginTop: -1 }} />
        </div>
      </div>
      {/* Rechter Turm */}
      <div
        className="absolute bottom-[82px] right-[12px]"
        style={{
          width: 26,
          height: 40,
          background: "linear-gradient(180deg, #ff6b6b, #ee5a24)",
          borderRadius: "10px 10px 4px 4px",
          border: "2px solid #d4850f",
          boxShadow: "inset 0 6px 12px rgba(255,255,255,0.3)",
        }}
      >
        <div
          className="absolute -top-[14px] left-1/2 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderBottom: "16px solid #ff6b6b",
            filter: "drop-shadow(0 -2px 4px rgba(255,107,107,0.4))",
          }}
        />
        <div className="absolute -top-[20px] left-1/2 -translate-x-1/2" style={{ width: 2, height: 10, background: "#d4850f" }}>
          <div style={{ width: 8, height: 6, background: "#f5c542", clipPath: "polygon(0 0, 100% 30%, 0 100%)", marginLeft: 2, marginTop: -1 }} />
        </div>
      </div>
      {/* Mittlerer Turm (größer) */}
      <div
        className="absolute bottom-[82px] left-1/2 -translate-x-1/2"
        style={{
          width: 30,
          height: 48,
          background: "linear-gradient(180deg, #ff6b6b, #ee5a24)",
          borderRadius: "12px 12px 4px 4px",
          border: "2px solid #d4850f",
          boxShadow: "inset 0 6px 12px rgba(255,255,255,0.3)",
        }}
      >
        <div
          className="absolute -top-[16px] left-1/2 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            borderBottom: "18px solid #ff6b6b",
            filter: "drop-shadow(0 -2px 4px rgba(255,107,107,0.4))",
          }}
        />
        <div className="absolute -top-[24px] left-1/2 -translate-x-1/2" style={{ width: 2, height: 12, background: "#d4850f" }}>
          <div style={{ width: 10, height: 7, background: "#f5c542", clipPath: "polygon(0 0, 100% 30%, 0 100%)", marginLeft: 2, marginTop: -2 }} />
        </div>
      </div>
      {/* Hüpfende Kinder-Emojis */}
      <span
        className="absolute"
        style={{
          bottom: 40,
          left: 22,
          fontSize: 16,
          animation: "kid-jump 0.7s 0s ease-in-out infinite",
        }}
      >
        🧒
      </span>
      <span
        className="absolute"
        style={{
          bottom: 42,
          right: 24,
          fontSize: 16,
          animation: "kid-jump 0.7s 0.35s ease-in-out infinite",
        }}
      >
        👧
      </span>
    </div>
  );
}

/* ── Sponsoren: 2 Kategorien ── */
const hauptsponsoren = [
  { name: "Brauerei Müller", farbe: "#2d8b6f", logo: beckmannLogo },
  { name: "TSN Rohstoffe", farbe: "#cc0a1a", logo: tsnLogo },
  { name: "Sparkasse Bahrdorf", farbe: "#c41e3a", logo: zilligenLogo },
  { name: "Bäckerei Krause", farbe: "#6b4c2a", logo: wronowskiLogo },
  { name: "Elektro Weber", farbe: "#2a6b5c", logo: steinreinigerLogo },
  { name: "Gasthof Zum Hirsch", farbe: "#8b6914" },
];

const sponsoren = [
  { name: "Dachdeckerei Berger", farbe: "#4a4a6a", logo: steinreinigerLogo },
  { name: "Blumen Meier", farbe: "#7a3b5c", logo: tsnLogo },
  { name: "Friseur Schick", farbe: "#5c3b7a", logo: wronowskiLogo },
  { name: "Metzgerei Hoffmann", farbe: "#7a5c3b", logo: zilligenLogo },
  { name: "Schreinerei Lang", farbe: "#3b5c7a" },
  { name: "Apotheke am Markt", farbe: "#5c7a3b", logo: beckmannLogo },
  { name: "Getränke König", farbe: "#7a3b3b" },
  { name: "Reisebüro Sonntag", farbe: "#3b7a5c" },
];

// Split sponsors into left/right
const hauptLeft = hauptsponsoren.filter((_, i) => i % 2 === 0);
const hauptRight = hauptsponsoren.filter((_, i) => i % 2 === 1);
const sponsorenLeft = sponsoren.filter((_, i) => i % 2 === 0);
const sponsorenRight = sponsoren.filter((_, i) => i % 2 === 1);

/* ── Wimpelkette ── (jetzt in /src/app/components/pennants.tsx) */

/* ── Konfetti ── */
const confettiKeyframes = `
@keyframes confetti-fall {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
  2% { opacity: 1; }
  88% { opacity: 0.8; }
  95% { opacity: 0.2; }
  100% { transform: translate(var(--drift), var(--fall-dist)) rotate(var(--spin)); opacity: 0; }
}
@keyframes confetti-sway {
  0%, 100% { margin-left: 0; }
  25% { margin-left: 15px; }
  75% { margin-left: -15px; }
}
@keyframes carousel-spin {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}
@keyframes horse-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
@keyframes bounce-castle {
  0%, 100% { transform: scaleY(1) scaleX(1) translateY(0); }
  15% { transform: scaleY(0.92) scaleX(1.05) translateY(4px); }
  30% { transform: scaleY(1.06) scaleX(0.97) translateY(-8px); }
  50% { transform: scaleY(0.95) scaleX(1.03) translateY(2px); }
  70% { transform: scaleY(1.03) scaleX(0.98) translateY(-4px); }
  85% { transform: scaleY(0.97) scaleX(1.01) translateY(1px); }
}
@keyframes kid-jump {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(1.1); }
}
@keyframes floh-btn-pulse {
  0%, 100% { box-shadow: 0 3px 15px rgba(107,63,160,0.5), 0 0 20px rgba(155,89,182,0.3); }
  50% { box-shadow: 0 3px 25px rgba(107,63,160,0.8), 0 0 35px rgba(155,89,182,0.5); }
}
@keyframes floh-btn-wiggle {
  0%, 100% { transform: rotate(0deg); }
  15% { transform: rotate(-3deg); }
  30% { transform: rotate(3deg); }
  45% { transform: rotate(-2deg); }
  60% { transform: rotate(0deg); }
}
@keyframes floh-badge-bounce {
  0%, 100% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.15) translateY(-2px); }
}
@keyframes float-bob {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
}
@keyframes cup-wobble {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  50% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
}
@keyframes steam-rise {
  0% { transform: translateY(0) scaleX(1); opacity: 0; }
  15% { opacity: 0.7; }
  50% { transform: translateY(-20px) scaleX(1.3); opacity: 0.5; }
  100% { transform: translateY(-40px) scaleX(1.8); opacity: 0; }
}
@keyframes steam-dot {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  20% { opacity: 0.6; }
  50% { transform: translateY(-18px) scale(1.5); opacity: 0.4; }
  100% { transform: translateY(-35px) scale(2); opacity: 0; }
}
@keyframes cake-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
@keyframes strawberry-wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  50% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
}
@keyframes deco-twinkle {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
@keyframes ticket-pull {
  0%, 100% { transform: translate(-50%, 0); }
  30% { transform: translate(-50%, -18px); }
  50% { transform: translate(-50%, -22px) rotate(3deg); }
  70% { transform: translate(-50%, -16px) rotate(-2deg); }
}
@keyframes ticket-peek {
  0%, 100% { transform: rotate(var(--r, 0deg)) translateY(0); }
  50% { transform: rotate(var(--r, 0deg)) translateY(-3px); }
}
@keyframes block-wobble {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  75% { transform: rotate(-2deg); }
}
@keyframes ball-bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-20px); }
}
@keyframes ball-shadow {
  0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.3; }
  50% { transform: translateX(-50%) scale(0.5); opacity: 0.1; }
}
@keyframes dice-roll {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(8deg) translateY(-3px); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-8deg) translateY(-3px); }
}
@keyframes spin-top {
  0% { transform: translateX(-50%) rotate(0deg); }
  100% { transform: translateX(-50%) rotate(360deg); }
}
@keyframes kid-sparkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
@keyframes crown-float {
  0%, 100% { transform: translateX(-50%) translateY(0) rotate(0deg); }
  50% { transform: translateX(-50%) translateY(-4px) rotate(5deg); }
}
@keyframes crosshair-aim {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(3px, -2px); }
  40% { transform: translate(-2px, 3px); }
  60% { transform: translate(1px, 1px); }
  78% { transform: translate(0, 0); }
  80% { transform: translate(0, 0) scale(0.97); }
  85% { transform: translate(0, 0) scale(1); }
}
@keyframes shot-appear {
  0%, 22% { opacity: 0; transform: scale(0); }
  25% { opacity: 1; transform: scale(1.5); }
  30%, 100% { opacity: 0.8; transform: scale(1); }
}
@keyframes rifle-recoil {
  0%, 78% { transform: rotate(55deg) translateX(0); }
  80% { transform: rotate(55deg) translateX(5px); }
  85% { transform: rotate(55deg) translateX(0); }
  100% { transform: rotate(55deg) translateX(0); }
}
@keyframes muzzle-flash {
  0%, 78% { opacity: 0; transform: scale(0.5); }
  80% { opacity: 1; transform: scale(1.8); }
  84% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 0; }
}
@keyframes floh-wobble {
  0%, 100% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-3deg) translateY(-2px); }
  75% { transform: rotate(3deg) translateY(-1px); }
}
@keyframes floh-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes floh-tag {
  0%, 100% { transform: translateY(0); opacity: 0.85; }
  50% { transform: translateY(-4px); opacity: 1; }
}
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; text-shadow: 0 0 7px #ff2d95, 0 0 20px #ff2d95aa, 0 0 40px #ff2d9566, 0 0 80px #ff2d9533; }
  20%, 24%, 55% { opacity: 0.85; text-shadow: 0 0 4px #ff2d9588, 0 0 10px #ff2d9544; }
}
@keyframes neon-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes stage-light {
  0%, 100% { transform: rotate(-15deg); opacity: 0.3; }
  25% { transform: rotate(10deg); opacity: 0.6; }
  50% { transform: rotate(-5deg); opacity: 0.4; }
  75% { transform: rotate(12deg); opacity: 0.55; }
}
@keyframes band-glow-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1.5); }
  50% { opacity: 1; transform: scale(1.7); }
}
`;

function ConfettiDots() {
  const dots = Array.from({ length: 50 }, (_, i) => {
    const duration = 14 + Math.random() * 18;
    const delay = Math.random() * -30;
    const drift = (Math.random() - 0.5) * 250;
    const spin = 360 + Math.random() * 720;
    const swayDur = 2 + Math.random() * 3;
    return {
      id: i,
      x: Math.random() * 100,
      size: 4 + Math.random() * 8,
      color: ["#f5c542", "#e85d3a", "#2d8b6f", "#d4437a", "#3a7be8", "#ffffff"][Math.floor(Math.random() * 6)],
      opacity: 0.4 + Math.random() * 0.5,
      duration,
      delay,
      drift,
      spin,
      swayDur,
      shape: Math.random() > 0.5 ? "50%" : `${Math.random() * 30}%`,
    };
  });
  return (
    <div className="absolute inset-0 pointer-events-none z-50" style={{ overflow: "visible" }}>
      <style>{confettiKeyframes}</style>
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute"
          style={{
            left: `${d.x}%`,
            top: "-2%",
            width: d.size,
            height: d.size * (0.6 + Math.random() * 0.8),
            backgroundColor: d.color,
            opacity: d.opacity,
            borderRadius: d.shape,
            ["--drift" as string]: `${d.drift}px`,
            ["--spin" as string]: `${d.spin}deg`,
            ["--fall-dist" as string]: `500vh`,
            animation: `confetti-fall ${d.duration}s ${d.delay}s linear infinite, confetti-sway ${d.swayDur}s ${d.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Sponsor-Kachel ── */
function SponsorTile(
  { name, farbe, size, logo }: { name: string; farbe: string; size: "lg" | "md"; logo?: string }
) {
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 3);
  const isLg = size === "lg";
  return (
    <div
      className="flex flex-col items-center justify-center gap-1.5 p-3 transition-transform hover:scale-105"
      style={{ width: isLg ? 150 : 120, height: isLg ? 90 : 72 }}
    >
      {logo ? (
        <img src={logo} alt={name} className="object-contain" style={{ maxHeight: isLg ? 70 : 50, maxWidth: isLg ? 130 : 100, filter: "drop-shadow(0 0 3px rgba(255,255,255,0.7)) drop-shadow(0 0 6px rgba(255,255,255,0.3))" }} />
      ) : (
        <div
          className="rounded-lg flex items-center justify-center px-3 py-1 text-white tracking-wider"
          style={{ backgroundColor: farbe, fontSize: isLg ? 18 : 14 }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}

/* ── Sidebar-Spalte (links oder rechts) ── */
function SponsorSidebar({
  hauptItems,
  items,
  side,
}: {
  hauptItems: typeof hauptsponsoren;
  items: typeof sponsoren;
  side: "left" | "right";
}) {
  return (
    <div
      className={`hidden xl:flex flex-col items-center justify-evenly absolute top-16 bottom-0 z-40`}
      style={{
        width: 190,
        [side === "left" ? "left" : "right"]: "calc((100vw - 56rem) / 4 - 95px)",
      }}
    >
      {/* Hauptsponsoren – groß */}
      {hauptItems.map((s) => (
        <SponsorTile key={s.name} name={s.name} farbe={s.farbe} size="lg" logo={(s as any).logo} />
      ))}

      {/* Sponsoren – mittel */}
      {items.map((s) => (
        <SponsorTile key={s.name} name={s.name} farbe={s.farbe} size="md" logo={(s as any).logo} />
      ))}
    </div>
  );
}

/* ── Sponsor-Kontakt-Modal ── */
function SponsorContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", firma: "", email: "", nachricht: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const handleSend = async () => {
    setSending(true);
    const subject = `Sponsoring-Anfrage Schützenfest 2026 – ${form.firma || form.name}`;
    const body = `Name: ${form.name}\nFirma: ${form.firma}\nE-Mail: ${form.email}\n\nNachricht:\n${form.nachricht}`;
    try {
      const a = document.createElement("a");
      a.href = `mailto:info@svbahrdorf.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch { /* ignore */ }
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", firma: "", email: "", nachricht: "" });
      onClose();
    }, 3500);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #1e2040 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(45,139,111,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-white" style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Vielen Dank!
            </h3>
            <p className="text-white/60 mt-2" style={{ fontSize: 14 }}>
              Ihre Sponsoring-Anfrage wurde erfolgreich übermittelt. Wir melden uns zeitnah bei Ihnen!
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-white mb-1" style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              🤝 Sponsor werden
            </h3>
            <p className="text-white/50 mb-5" style={{ fontSize: 13 }}>
              Füllen Sie das Formular aus – wir freuen uns auf Ihre Anfrage!
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ihr Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-accent/50"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14 }}
              />
              <input
                type="text"
                placeholder="Firma / Unternehmen"
                value={form.firma}
                onChange={(e) => setForm({ ...form, firma: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-accent/50"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14 }}
              />
              <input
                type="email"
                placeholder="Ihre E-Mail-Adresse *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-accent/50"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14 }}
              />
              <textarea
                placeholder="Ihre Nachricht *"
                rows={4}
                value={form.nachricht}
                onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14 }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!form.name || !form.email || !form.nachricht || sending}
              className="w-full mt-4 py-3 rounded-full text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #2d8b6f, #1f6b52)",
                fontSize: 15,
                boxShadow: "0 4px 20px rgba(45,139,111,0.4)",
              }}
            >
              {sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Wird gesendet…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Anfrage absenden
                </>
              )}
            </button>
            <p className="text-white/30 text-center mt-3" style={{ fontSize: 11, lineHeight: 1.5 }}>
              Mit dem Absenden des Formulars stimmen Sie der Verarbeitung Ihrer Angaben
              zur Bearbeitung Ihrer Anfrage zu. Weitere Informationen finden Sie in unserer{" "}
              <Link to="/datenschutz" className="text-accent/60 hover:text-accent underline" onClick={onClose}>
                Datenschutzerklärung
              </Link>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Flohmarkt-Anmelde-Modal ── */
function FlohmarktAnmeldeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", telefon: "", anzahlTische: "1", nachricht: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const handleSend = async () => {
    setSending(true);
    const subject = `Flohmarkt-Anmeldung Schützenfest 2026 – ${form.name}`;
    const body = `Name: ${form.name}\nE-Mail: ${form.email}\nTelefon: ${form.telefon || "–"}\nAnzahl Tische/Stände: ${form.anzahlTische}\n\nAnmerkungen:\n${form.nachricht || "–"}`;
    try {
      const a = document.createElement("a");
      a.href = `mailto:info@svbahrdorf.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch { /* ignore */ }
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", telefon: "", anzahlTische: "1", nachricht: "" });
      onClose();
    }, 3500);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #2a1840 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(107,63,160,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🛍️</div>
            <h3 className="text-white" style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Anmeldung gesendet!
            </h3>
            <p className="text-white/60 mt-2" style={{ fontSize: 14 }}>
              Ihre Anmeldung wurde erfolgreich übermittelt. Wir prüfen die Verfügbarkeit und melden uns zeitnah bei Ihnen!
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-white mb-1" style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              🛍️ Flohmarkt-Anmeldung
            </h3>
            <p className="text-white/50 mb-1" style={{ fontSize: 13 }}>
              Samstag, 13. Juni 2026 · Alte Turnhalle
            </p>
            <p className="text-white/40 mb-3" style={{ fontSize: 12 }}>
              Melden Sie sich jetzt an und sichern Sie sich Ihren Standplatz!
            </p>
            <div className="mb-5 px-3 py-2.5 rounded-lg" style={{ background: "rgba(45,139,111,0.12)", border: "1px solid rgba(45,139,111,0.25)" }}>
              <p className="text-white/60" style={{ fontSize: 11, lineHeight: 1.6 }}>
                📋 Die Standplätze sind begrenzt – eine Zuteilung kann leider nicht garantiert werden. Wir melden uns zeitnah bei Ihnen zurück.
              </p>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ihr Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-400/50"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14 }}
              />
              <input
                type="email"
                placeholder="Ihre E-Mail-Adresse *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-400/50"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14 }}
              />
              <input
                type="tel"
                placeholder="Telefonnummer (optional)"
                value={form.telefon}
                onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-400/50"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14 }}
              />
              <div className="flex items-center gap-3">
                <label className="text-white/50 whitespace-nowrap" style={{ fontSize: 13 }}>Anzahl Tische:</label>
                <select
                  value={form.anzahlTische}
                  onChange={(e) => setForm({ ...form, anzahlTische: e.target.value })}
                  className="flex-1 px-4 py-2.5 rounded-lg text-white outline-none focus:ring-2 focus:ring-purple-400/50"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14 }}
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n} style={{ background: "#1a1a2e" }}>{n}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Anmerkungen / Was verkaufen Sie? (optional)"
                rows={3}
                value={form.nachricht}
                onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-400/50 resize-none"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14 }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!form.name || !form.email || sending}
              className="w-full mt-4 py-3 rounded-full text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #2d8b6f, #1a7a5a)",
                fontSize: 15,
                boxShadow: "0 4px 20px rgba(45,139,111,0.4)",
              }}
            >
              {sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Wird gesendet…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Anmeldung absenden
                </>
              )}
            </button>
            <p className="text-white/30 text-center mt-3" style={{ fontSize: 11, lineHeight: 1.5 }}>
              Mit dem Absenden des Formulars stimmen Sie der Verarbeitung Ihrer Angaben
              zur Bearbeitung Ihrer Anfrage zu. Weitere Informationen finden Sie in unserer{" "}
              <Link to="/datenschutz" className="text-accent/60 hover:text-accent underline" onClick={onClose}>
                Datenschutzerklärung
              </Link>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ══════════ HOME PAGE ══════════ */

export function HomePage() {
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [flohmarktModalOpen, setFlohmarktModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Fredoka', sans-serif" }}>
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: "rgba(26,26,46,0.9)" }}>
        <div className="w-full px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={svLogoBadge}
              alt="SV Bahrdorf"
              className="w-12 h-12 object-contain"
            />
            <span className="text-white tracking-wider" style={{ fontSize: 14 }}>
              SV Bahrdorf 1850 e.V.
            </span>
          </div>
          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8" style={{ fontSize: 14 }}>
            <a href="#programm" onClick={scrollTo("programm")} className="text-white/80 hover:text-accent transition-colors">Programm</a>
            <Link to="/vorverkauf" className="text-white/80 hover:text-accent transition-colors">Tickets</Link>
            <a href="#highlights" onClick={scrollTo("highlights")} className="text-white/80 hover:text-accent transition-colors">Highlights</a>
            <a href="#sponsoren" onClick={scrollTo("sponsoren")} className="text-white/80 hover:text-accent transition-colors">Sponsoren</a>
            <a href="#kontakt" onClick={scrollTo("kontakt")} className="text-white/80 hover:text-accent transition-colors">Kontakt</a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-white/80 hover:text-accent transition-colors p-1"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4" style={{ fontSize: 15, background: "rgba(26,26,46,0.95)" }}>
            <a href="#programm" onClick={(e) => { scrollTo("programm")(e); setMobileMenuOpen(false); }} className="text-white/80 hover:text-accent transition-colors">Programm</a>
            <Link to="/vorverkauf" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-accent transition-colors">Tickets</Link>
            <a href="#highlights" onClick={(e) => { scrollTo("highlights")(e); setMobileMenuOpen(false); }} className="text-white/80 hover:text-accent transition-colors">Highlights</a>
            <a href="#sponsoren" onClick={(e) => { scrollTo("sponsoren")(e); setMobileMenuOpen(false); }} className="text-white/80 hover:text-accent transition-colors">Sponsoren</a>
            <a href="#kontakt" onClick={(e) => { scrollTo("kontakt")(e); setMobileMenuOpen(false); }} className="text-white/80 hover:text-accent transition-colors">Kontakt</a>
          </div>
        )}
      </nav>

      <DiscoBall />

      {/* ─── Sponsor-CTA-Banner ─── */}
      <div
        className="pt-[68px]"
        style={{
          background: "linear-gradient(90deg, #1a6b3c, #228B47, #1a6b3c)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 flex-wrap">
          <span className="text-white text-center" style={{ fontSize: 14, fontFamily: "'Nunito', sans-serif", letterSpacing: 0.3 }}>
            🌟 <strong>Sponsor werden</strong> – Präsentieren Sie Ihr Unternehmen beim Schützenfest 2026!
          </span>
          <button
            onClick={() => setSponsorModalOpen(true)}
            className="px-5 py-1.5 rounded-full flex items-center gap-1.5 transition-all hover:scale-105 shrink-0"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#1a6b3c",
              fontSize: 12,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            Interesse? Jetzt mitmachen!
          </button>
        </div>
      </div>

      {/* ── Wrapper für Sidebar-Bereich (relative) – ab Hero bis Partynacht ── */}
      <div className="relative overflow-hidden">
        <ConfettiDots />
        {/* Sponsor-Sidebars moved to after Hero */}

        {/* ─── Hero ─── */}
        <header className="relative pt-2" style={{ background: "linear-gradient(180deg, #1a3a2e 0%, #2d8b6f 15%, #e85d3a 50%, #d4437a 75%, #1a1a2e 100%)", overflow: "visible" }}>
          <Fireworks />
          {/* ConfettiDots removed - now in outer wrapper */}

          {/* ── Container Left: Kaffee, Karussell, Flohmarkt, Tombola ── */}
          {/* ▼ Ganzen linken Container hoch/runter: top-Wert ändern (z.B. top: "0%") */}
          <div
            className="hidden lg:block absolute left-0 w-1/2 z-20 pointer-events-none"
            style={{ top: "-12%", bottom: 0 }}
          >
            {/* ── Kaffee & Kuchen ── */}
            <div
              className="flex absolute flex-col items-center z-20 pointer-events-auto"
              style={{ top: "14%", left: "8%" }}
            >
              <MiniCoffeeAndCake />
              <p
                className="text-white whitespace-nowrap drop-shadow-lg mt-1"
                style={{
                  fontSize: 14,
                  fontFamily: "'Fredoka', sans-serif",
                  textShadow: "0 2px 12px rgba(139,92,45,0.8), 0 0 30px rgba(139,92,45,0.4)",
                }}
              >
                Kaffee & Kuchen
              </p>
            </div>

            {/* ── Kinderkarussell ── */}
            <div
              className="flex absolute flex-col items-center z-20 pointer-events-auto"
              style={{ top: "32%", left: "14%" }}
            >
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: "radial-gradient(circle, rgba(212,67,122,0.4) 0%, transparent 70%)",
                  filter: "blur(18px)",
                  transform: "scale(1.4)",
                }}
              />
              <MiniCarousel />
              <p
                className="text-white whitespace-nowrap drop-shadow-lg mt-1"
                style={{
                  fontSize: 14,
                  fontFamily: "'Fredoka', sans-serif",
                  textShadow: "0 2px 12px rgba(212,67,122,0.8), 0 0 30px rgba(212,67,122,0.4)",
                }}
              >
                Kinderkarussell
              </p>
            </div>

            {/* ── Flohmarkt ── */}
            <div
              className="flex absolute items-center z-20 pointer-events-auto"
              style={{ top: "52%", left: "2%", animation: "float-bob 4.5s ease-in-out infinite" }}
            >
              {/* Flohmarkt-Logo + Label (links) */}
              <div className="flex flex-col items-center">
                <div className="relative" style={{ width: 130, height: 130 }}>
                  <div className="absolute inset-0 rounded-2xl opacity-50" style={{
                    background: "radial-gradient(circle, rgba(107,63,160,0.5) 0%, transparent 70%)",
                    filter: "blur(16px)",
                    transform: "scale(1.4)",
                  }} />
                  <img
                    src={flohmarktImg}
                    alt="Flohmarkt"
                    className="relative w-full h-full object-contain drop-shadow-lg"
                    style={{ filter: "drop-shadow(0 4px 12px rgba(107,63,160,0.5))" }}
                  />
                </div>
                <p
                  className="text-white whitespace-nowrap drop-shadow-lg mt-1"
                  style={{
                    fontSize: 14,
                    fontFamily: "'Fredoka', sans-serif",
                    textShadow: "0 2px 12px rgba(107,63,160,0.8), 0 0 30px rgba(107,63,160,0.4)",
                  }}
                >
                  Flohmarkt
                </p>
              </div>

              {/* Pfeil-Button + Text (rechts vom Logo, Pfeil zeigt nach links) */}
              <button
                onClick={() => setFlohmarktModalOpen(true)}
                className="relative flex items-center gap-3 transition-all hover:scale-105 cursor-pointer group ml-3"
                style={{
                  animation: "floh-btn-wiggle 3s 1s ease-in-out infinite",
                }}
              >
                {/* Animierter Pfeil-Kreis ← zeigt auf Logo */}
                <div
                  className="relative flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 46,
                    height: 46,
                    background: "linear-gradient(135deg, #2d8b6f, #1a7a5a)",
                    border: "2px solid rgba(255,255,255,0.5)",
                    boxShadow: "0 3px 20px rgba(45,139,111,0.6), 0 0 30px rgba(26,122,90,0.3)",
                    animation: "floh-btn-pulse 2s ease-in-out infinite",
                  }}
                >
                  <span className="absolute inset-0 rounded-full" style={{
                    background: "linear-gradient(135deg, rgba(107,63,160,0.3), rgba(232,93,58,0.3))",
                    filter: "blur(8px)",
                    transform: "scale(1.4)",
                    animation: "floh-btn-pulse 2s ease-in-out infinite",
                  }} />
                  {/* Pfeil zeigt nach LINKS auf das Flohmarkt-Logo */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10 transition-transform group-hover:-translate-x-0.5"
                    style={{ width: 22, height: 22 }}
                  >
                    <path d="M19 12H5M11 19l-7-7 7-7" />
                  </svg>

                </div>
                {/* Text-Block */}
                <div className="flex flex-col items-start">
                  <span
                    className="whitespace-nowrap"
                    style={{
                      fontSize: 18,
                      fontFamily: "'Fredoka', sans-serif",
                      color: "#fff",
                      textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.7), 0 0 25px rgba(0,0,0,0.4)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Stand anmelden!
                  </span>
                  <span
                    className="whitespace-nowrap"
                    style={{
                      fontSize: 11,
                      fontFamily: "'Nunito', sans-serif",
                      color: "rgba(255,255,255,0.85)",
                      textShadow: "0 1px 4px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.5)",
                    }}
                  >
                    Sa. 13.09. · Alte Turnhalle
                  </span>
                </div>
              </button>
            </div>

            {/* ── Tombola ── */}
            <div
              className="flex absolute flex-col items-center z-20 pointer-events-auto"
              style={{ top: "72%", left: "16%" }}
            >
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: "radial-gradient(circle, rgba(45,139,111,0.4) 0%, transparent 70%)",
                  filter: "blur(18px)",
                  transform: "scale(1.4)",
                }}
              />
              <MiniTombola />
              <p
                className="text-white whitespace-nowrap drop-shadow-lg mt-1"
                style={{
                  fontSize: 14,
                  fontFamily: "'Fredoka', sans-serif",
                  textShadow: "0 2px 12px rgba(45,139,111,0.8), 0 0 30px rgba(45,139,111,0.4)",
                }}
              >
                Tombola
              </p>
            </div>
          </div>

          {/* ── Container Right: Autoscooter, Hüpfburg, Kinderspiele, Schießen ── */}
          {/* ▼ Ganzen rechten Container hoch/runter: top-Wert ändern (z.B. top: "0%") */}
          <div
            className="hidden lg:block absolute right-0 w-1/2 z-20 pointer-events-none"
            style={{ top: "-12%", bottom: 0 }}
          >
            {/* ── Autoscooter ── */}
            <div
              className="flex absolute flex-col items-center z-20 pointer-events-auto"
              style={{ top: "18%", right: "9%", animation: "float-bob 4s ease-in-out infinite" }}
            >
              <div
                className="relative"
                style={{ width: 200, height: 160 }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-60"
                  style={{
                    background: "radial-gradient(circle, rgba(232,93,58,0.5) 0%, transparent 70%)",
                    filter: "blur(20px)",
                    transform: "scale(1.3)",
                  }}
                />
                <img
                  src={autoscooterImg}
                  alt="Autoscooter"
                  className="relative w-full h-full object-contain drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 8px 24px rgba(232,93,58,0.6))" }}
                />
                <p
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-white whitespace-nowrap drop-shadow-lg"
                  style={{
                    fontSize: 15,
                    fontFamily: "'Fredoka', sans-serif",
                    textShadow: "0 2px 12px rgba(232,93,58,0.8), 0 0 30px rgba(232,93,58,0.4)",
                  }}
                >
                  Autoscooter
                </p>
              </div>
            </div>

            {/* ── Hüpfburg ── */}
            <div
              className="flex absolute flex-col items-center z-20 pointer-events-auto"
              style={{ top: "38%", right: "15%" }}
            >
              <MiniBouncy />
              <p
                className="text-white whitespace-nowrap drop-shadow-lg mt-1"
                style={{
                  fontSize: 14,
                  fontFamily: "'Fredoka', sans-serif",
                  textShadow: "0 2px 12px rgba(245,166,35,0.8), 0 0 30px rgba(245,166,35,0.4)",
                }}
              >
                Hüpfburg
              </p>
            </div>

            {/* ── Kinderspiele ── */}
            <div
              className="flex absolute flex-col items-center z-20 pointer-events-auto"
              style={{ top: "56%", right: "7%" }}
            >
              <MiniKinderspiele />
              <p
                className="text-white whitespace-nowrap drop-shadow-lg mt-1"
                style={{
                  fontSize: 13,
                  fontFamily: "'Fredoka', sans-serif",
                  textShadow: "0 2px 12px rgba(58,123,232,0.8), 0 0 30px rgba(58,123,232,0.4)",
                }}
              >
                Kinderspiele
              </p>
            </div>

            {/* ── Volksmajestätenschießen ── */}
            <div
              className="flex absolute flex-col items-center z-20 pointer-events-auto"
              style={{ top: "73%", right: "13%" }}
            >
              <MiniSchiesstand />
              <p
                className="text-white whitespace-nowrap drop-shadow-lg mt-1"
                style={{
                  fontSize: 13,
                  fontFamily: "'Fredoka', sans-serif",
                  textShadow: "0 2px 12px rgba(196,30,58,0.8), 0 0 30px rgba(196,30,58,0.4)",
                }}
              >
                Volksmajestäten&shy;schiessen
              </p>
            </div>
          </div>



          {/* ▼ Wimpelkette: mobil mt-4 (weiter unten), Desktop -mt-16 (wie vorher -4rem) ── Zeile ~1493 */}
          <PennantsOverlay />
          <div className="relative z-10 text-center px-4 pb-4" style={{ marginTop: "2rem" }}>
            <h1
              className="text-white mb-2 drop-shadow-lg -mt-8 md:-mt-8"
              style={{ fontSize: "clamp(42px, 8vw, 80px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1.1 }}
            >
              176 Jahre
            </h1>
            <div className="flex items-center justify-center mt-4">
              <img
                src={svLogoBadge}
                alt="Schützenverein Bahrdorf 1850 e.V."
                className="w-64 h-64 md:w-96 md:h-96 object-contain drop-shadow-2xl pointer-events-none"
                style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))" }}
              />
            </div>
            {/* ── Hero-Info Container ── */}
            <div className="flex flex-col items-center text-center mt-6">
              <h2
                className="text-accent uppercase tracking-wider mb-2"
                style={{ fontSize: "clamp(20px, 4vw, 36px)", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
              >
                Schützenfest
              </h2>
              <div className="flex items-center justify-center gap-3 text-white">
                <span style={{ fontSize: 22 }}>»</span>
                <span style={{ fontSize: "clamp(18px, 3.5vw, 30px)" }}>11. – 13.09.2026</span>
                <span style={{ fontSize: 22 }}>«</span>
              </div>
            <h3 className="text-white uppercase tracking-[0.15em] mt-3" style={{ fontSize: "clamp(20px, 4vw, 34px)", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Familienfest
            </h3>
              <p className="text-accent mt-3" style={{ fontSize: 16 }}>🎉 Eintritt frei! 🎉</p>
              <TicketButton />
            </div>
          </div>
          <svg viewBox="0 0 1440 80" className="w-full -mb-1 relative z-10" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#1a1a2e" />
          </svg>
        </header>

        {/* ── Wrapper für Sponsor-Sidebars (ab unter Hero bis Partynacht) ── */}
        <div className="relative">
          <SponsorSidebar hauptItems={hauptLeft} items={sponsorenLeft} side="left" />
          <SponsorSidebar hauptItems={hauptRight} items={sponsorenRight} side="right" />

          {/* ─── Happy Hour Neon Banner ─── */}
          <section className="py-10 overflow-hidden">
            <div className="flex flex-col items-center">
              {/* Neon Sign */}
              <div
                className="relative inline-block px-10 pt-5 pb-12 rounded-2xl border-2 overflow-hidden"
                style={{
                  borderColor: "#ff2d95",
                  boxShadow: "0 0 10px #ff2d95, 0 0 30px #ff2d9588, 0 0 60px #ff2d9544, inset 0 0 20px #ff2d9522",
                  background: "rgba(255,45,149,0.04)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: "radial-gradient(ellipse at center, rgba(255,45,149,0.12) 0%, transparent 70%)" }}
                />
                <div className="flex items-center gap-4 relative z-10 justify-center">
                  <Beer className="w-8 h-8" style={{ color: "#00e5ff", filter: "drop-shadow(0 0 8px #00e5ff) drop-shadow(0 0 20px #00e5ff88)" }} />
                  <h3
                    className="uppercase tracking-[0.15em]"
                    style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: "clamp(28px, 5vw, 48px)",
                      color: "#ff2d95",
                      textShadow: "0 0 7px #ff2d95, 0 0 20px #ff2d95aa, 0 0 40px #ff2d9566, 0 0 80px #ff2d9533",
                      animation: "neon-flicker 3s ease-in-out infinite",
                    }}
                  >
                    Happy Hour
                  </h3>
                  <Beer className="w-8 h-8" style={{ color: "#00e5ff", filter: "drop-shadow(0 0 8px #00e5ff) drop-shadow(0 0 20px #00e5ff88)" }} />
                </div>
                {/* Scrolling Marquee inside the sign */}
                <div className="absolute z-10 bottom-3 left-0 right-0 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
                  <div
                    className="whitespace-nowrap"
                    style={{
                      animation: "neon-marquee 12s linear infinite",
                      color: "#00e5ff",
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "clamp(13px, 2vw, 18px)",
                      textShadow: "0 0 5px #00e5ff, 0 0 15px #00e5ff88",
                    }}
                  >
                    {"Freitag 21:15 Uhr \u00a0\u00a0\u00a0 \u2726 \u00a0\u00a0\u00a0 Samstag 20:00 Uhr \u00a0\u00a0\u00a0 \u2726 \u00a0\u00a0\u00a0 Freitag 21:15 Uhr \u00a0\u00a0\u00a0 \u2726 \u00a0\u00a0\u00a0 Samstag 20:00 Uhr \u00a0\u00a0\u00a0 \u2726 \u00a0\u00a0\u00a0 "}
                  </div>
                </div>
                <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full" style={{ background: "#ff2d95", boxShadow: "0 0 6px #ff2d95, 0 0 12px #ff2d95" }} />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ background: "#ff2d95", boxShadow: "0 0 6px #ff2d95, 0 0 12px #ff2d95" }} />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full" style={{ background: "#ff2d95", boxShadow: "0 0 6px #ff2d95, 0 0 12px #ff2d95" }} />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full" style={{ background: "#ff2d95", boxShadow: "0 0 6px #ff2d95, 0 0 12px #ff2d95" }} />
              </div>
            </div>
          </section>



          {/* ─── Highlights Mobile Fallback ─── */}
          <section id="highlights" className="lg:hidden py-10" style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #2a1a3e 100%)" }}>
            <div className="max-w-md mx-auto px-4">
              <h2 className="text-white text-center mb-6" style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                Das erwartet euch!
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {highlights.map((h) => (
                  <div
                    key={h.label}
                    className="flex flex-col items-center justify-center rounded-full text-white text-center shadow-lg"
                    style={{
                      width: 100,
                      height: 100,
                      background: `radial-gradient(circle at 30% 30%, ${h.color}cc, ${h.color}88)`,
                      border: `2px solid ${h.color}`,
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{h.icon}</span>
                    <span style={{ fontSize: 10, lineHeight: 1.3 }} className="px-2 mt-1">{h.label}</span>
                  </div>
                ))}
              </div>

              {/* ── Flohmarkt-Anmeldung Mobile CTA ── */}
              <div className="mt-8 mx-auto max-w-sm">
                <div
                  className="relative rounded-2xl p-4 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(107,63,160,0.25) 0%, rgba(155,89,182,0.15) 50%, rgba(232,93,58,0.15) 100%)",
                    border: "1px solid rgba(107,63,160,0.4)",
                    boxShadow: "0 4px 30px rgba(107,63,160,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Sparkle decorations */}
                  <span className="absolute top-2 right-3" style={{ fontSize: 16, animation: "deco-twinkle 2s ease-in-out infinite", opacity: 0 }}>✨</span>
                  <span className="absolute bottom-2 left-3" style={{ fontSize: 14, animation: "deco-twinkle 2s 0.7s ease-in-out infinite", opacity: 0 }}>🛍️</span>

                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{
                      background: "linear-gradient(135deg, #6b3fa0, #9b59b6)",
                      boxShadow: "0 3px 12px rgba(107,63,160,0.5)",
                    }}>
                      <span style={{ fontSize: 22 }}>🛍️</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white" style={{ fontSize: 14, fontFamily: "'Fredoka', sans-serif" }}>
                        Flohmarkt-Stand sichern!
                      </p>
                      <p className="text-white/50" style={{ fontSize: 11 }}>
                        Sa. 13. Juni · Alte Turnhalle
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFlohmarktModalOpen(true)}
                    className="w-full mt-3 py-2.5 rounded-full text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #2d8b6f, #1a7a5a, #247a5a)",
                      fontSize: 13,
                      fontFamily: "'Fredoka', sans-serif",
                      boxShadow: "0 4px 20px rgba(45,139,111,0.5), 0 0 25px rgba(26,122,90,0.2)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      animation: "floh-btn-pulse 2s ease-in-out infinite",
                    }}
                  >
                    ✍️ Jetzt Stand anmelden!
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Programm (flach, wie auf dem Flyer) ─── */}
          <section id="programm" className="py-16 relative" style={{ background: "linear-gradient(180deg, #2a1a3e 0%, #1a2a3e 100%)" }}>
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-white mb-2" style={{ fontSize: "clamp(22px, 4vw, 32px)", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                  Festprogramm 2026
                </h2>
                <div className="w-16 h-[3px] bg-accent mx-auto rounded-full mb-3" />
                <p className="text-white/60" style={{ fontSize: 14 }}>Drei Tage voller Programm – für jeden etwas dabei!</p>
              </div>

              <div className="space-y-10">
                {programm.map((tag) => (
                  <div key={tag.tag}>
                    {/* Tag-Überschrift */}
                    <h3
                      className="text-accent uppercase tracking-wider mb-5 pb-2 border-b-2 border-accent/40"
                      style={{ fontSize: "clamp(18px, 3.5vw, 26px)", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontStyle: "italic" }}
                    >
                      {tag.tag}
                    </h3>

                    {/* Events */}
                    <div className="space-y-3 pl-2">
                      {tag.events.map((event) =>
                        event.titel === "__partynacht__" ? (
                          /* ─── Partynacht inline card ─── */
                          <div key="partynacht" className="mt-4">
                            <div className="flex items-baseline gap-3 mb-3">
                              <span
                                className="text-white/70 shrink-0 tabular-nums"
                                style={{ fontSize: "clamp(14px, 2.5vw, 18px)", fontFamily: "'Nunito', sans-serif", minWidth: 80 }}
                              >
                                20:00 Uhr
                              </span>
                              <span
                                className="text-white uppercase tracking-wide"
                                style={{ fontSize: "clamp(15px, 2.5vw, 20px)", fontFamily: "'Fredoka', sans-serif" }}
                              >
                                Die große Partynacht
                              </span>
                            </div>
                            <div
                              className="rounded-2xl overflow-hidden ml-0 md:ml-[calc(80px+0.75rem)]"
                              style={{
                                background: "linear-gradient(135deg, rgba(245,197,66,0.08) 0%, rgba(139,10,46,0.1) 100%)",
                                border: "1px solid rgba(245,197,66,0.2)",
                              }}
                            >
                              <div className="flex flex-col sm:flex-row items-center gap-5 p-5">
                                {/* Band Logo */}
                                <div className="relative flex-shrink-0">
                                  <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                      background: "radial-gradient(circle, rgba(245,197,66,0.25) 0%, transparent 70%)",
                                      filter: "blur(14px)",
                                      transform: "scale(1.4)",
                                      animation: "band-glow-pulse 3s ease-in-out infinite",
                                    }}
                                  />
                                  <img
                                    src={bandLogoImg}
                                    alt="Das Fiasko – Coverband"
                                    className="relative w-28 h-28 md:w-36 md:h-36 object-contain"
                                    style={{ filter: "drop-shadow(0 0 16px rgba(245,197,66,0.35)) drop-shadow(0 6px 18px rgba(0,0,0,0.4))" }}
                                  />
                                </div>
                                {/* Band Info */}
                                <div className="flex-1 text-center sm:text-left">
                                  <span className="text-white/40 uppercase tracking-[0.2em] block mb-1" style={{ fontSize: 10 }}>
                                    Coverband
                                  </span>
                                  <h4
                                    className="mb-2"
                                    style={{
                                      fontSize: "clamp(22px, 3.5vw, 34px)",
                                      fontFamily: "'Playfair Display', serif",
                                      fontWeight: 900,
                                      lineHeight: 1.1,
                                      color: "#f5c542",
                                      textShadow: "0 0 24px rgba(245,197,66,0.3)",
                                    }}
                                  >
                                    Das Fiasko
                                  </h4>
                                  <p className="text-white/55 mb-4" style={{ fontSize: "clamp(12px, 2vw, 14px)", lineHeight: 1.6, fontFamily: "'Nunito', sans-serif" }}>
                                    Hits aus Rock, Pop & Partyklassikern – live auf der Bühne im Festzelt. Stimmung garantiert!
                                  </p>
                                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
                                    {[
                                      { icon: <Music className="w-3 h-3" />, text: "Live im Festzelt" },
                                      { icon: <span style={{ fontSize: 12 }}>🎫</span>, text: "KVV & Abendkasse" },
                                    ].map((d, i) => (
                                      <span
                                        key={i}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white/65"
                                        style={{ fontSize: 11, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                                      >
                                        {d.icon}
                                        {d.text}
                                      </span>
                                    ))}
                                  </div>
                                  <p className="text-white/30" style={{ fontSize: 11, fontFamily: "'Nunito', sans-serif" }}>
                                    Ab 16 Jahre bis 24 Uhr · Ab 18 Jahre Open End
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div key={event.zeit + event.titel}>
                            <div className="flex items-baseline gap-3">
                              <span
                                className="text-white/70 shrink-0 tabular-nums"
                                style={{ fontSize: "clamp(14px, 2.5vw, 18px)", fontFamily: "'Nunito', sans-serif", minWidth: 80 }}
                              >
                                {event.zeit} Uhr
                              </span>
                              <span
                                className="text-white uppercase tracking-wide whitespace-pre-line"
                                style={{ fontSize: "clamp(15px, 2.5vw, 20px)", fontFamily: "'Fredoka', sans-serif" }}
                              >
                                {event.titel}
                                {(event as any).hinweis && (
                                  <span className="text-accent/80 normal-case tracking-normal ml-2" style={{ fontSize: "clamp(11px, 2vw, 14px)" }}>
                                    {(event as any).hinweis}
                                  </span>
                                )}
                              </span>
                              {event.titel.includes("Flohmarkt") && (
                                <button
                                  onClick={() => setFlohmarktModalOpen(true)}
                                  className="ml-2 shrink-0 px-2.5 py-1 rounded-full text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                                  style={{
                                    background: "linear-gradient(135deg, #6b3fa0, #9b59b6)",
                                    fontSize: "clamp(9px, 1.5vw, 11px)",
                                    fontFamily: "'Fredoka', sans-serif",
                                    boxShadow: "0 2px 10px rgba(107,63,160,0.4)",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    animation: "floh-btn-pulse 2s ease-in-out infinite",
                                  }}
                                >
                                  ✍️ Anmelden
                                </button>
                              )}
                            </div>
                            {(event as any).sub && (
                              <p className="text-white/40 pl-[calc(80px+0.75rem)] whitespace-pre-line" style={{ fontSize: "clamp(11px, 2vw, 13px)" }}>
                                {(event as any).sub}
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>

                    {/* Hinweis am Tag-Ende */}
                    {tag.hinweis && (
                      <p className="text-white/40 mt-3 pl-2" style={{ fontSize: "clamp(11px, 2vw, 13px)" }}>
                        {tag.hinweis}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>{/* Ende Sponsor-Sidebar-Wrapper */}
      </div>

      {/* ══════ Sponsoren-Übersicht ══════ */}
      <section id="sponsoren" className="py-16" style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-white mb-2" style={{ fontSize: "clamp(22px, 4vw, 32px)", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Unsere Sponsoren
            </h2>
            <div className="w-16 h-[3px] bg-accent mx-auto rounded-full mb-3" />
            <p className="text-white/60" style={{ fontSize: 14 }}>Herzlichen Dank für die großzügige Unterstützung!</p>
          </div>

          {/* Hauptsponsoren */}
          <div className="mb-10">
            <div className="flex items-center gap-2 justify-center mb-5">
              <Trophy className="w-5 h-5 text-accent" />
              <h3 className="text-accent tracking-wider uppercase" style={{ fontSize: 16 }}>Hauptsponsoren</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {hauptsponsoren.map((s) => (
                <SponsorTile key={s.name} name={s.name} farbe={s.farbe} size="lg" logo={(s as any).logo} />
              ))}
            </div>
          </div>

          {/* Sponsoren */}
          <div>
            <div className="flex items-center gap-2 justify-center mb-5">
              <Star className="w-5 h-5 text-white/60" />
              <h3 className="text-white/60 tracking-wider uppercase" style={{ fontSize: 14 }}>Sponsoren</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {sponsoren.map((s) => (
                <SponsorTile key={s.name} name={s.name} farbe={s.farbe} size="md" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sponsoren-Leiste ─── */}
      <div className="py-6 border-y border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-white/40 mb-4" style={{ fontSize: 12 }}>Unterstützt von</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {[...hauptsponsoren, ...sponsoren].map((s) => (
              <span key={s.name} className="px-3 py-1 rounded-md text-white/90" style={{ backgroundColor: s.farbe, fontSize: 11 }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Footer / Kontakt ─── */}
      <footer id="kontakt" className="py-12" style={{ background: "#0f0f1e" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 15 }}>Impressum</h3>
              <div className="space-y-1 text-white/80" style={{ fontSize: 14 }}>
                <p className="text-white" style={{ fontWeight: 600 }}>Schützenverein Bahrdorf</p>
                <p>1. Vorsitzender Frederic Broistedt</p>
                <p className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />Helmstedter Straße 4
                </p>
                <p className="pl-6">38459 Bahrdorf</p>
                <div className="pt-3">
                  <p className="text-white/50" style={{ fontSize: 12 }}>Schützenheim (keine Postadresse)</p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent shrink-0" />Schulstraße 2
                  </p>
                  <p className="pl-6">38459 Bahrdorf</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 15 }}>Auf einen Blick</h3>
              <ul className="space-y-2 text-white/80" style={{ fontSize: 14 }}>
                <li>📅 12. – 14. September 2026</li>
                <li>📍 Festplatz am Schützenhaus</li>
                <li>🎯 Schützenverein seit 1850</li>
                <li>🎉 Eintritt frei (Familienfest)</li>
                <li>🎆 Feuerwerk Freitag 21 Uhr</li>
              </ul>
            </div>
            <div>
              <h3 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 15 }}>Sponsor werden?</h3>
              <p className="text-white/80" style={{ fontSize: 14, lineHeight: 1.7 }}>
                Sie möchten unser Schützenfest unterstützen und Ihr Unternehmen präsentieren?
                Melden Sie sich gerne bei uns!
              </p>
              <button
                onClick={() => setSponsorModalOpen(true)}
                className="mt-4 px-6 py-2.5 rounded-full text-white flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #2d8b6f, #1f6b52)",
                  fontSize: 14,
                  boxShadow: "0 4px 20px rgba(45,139,111,0.4)",
                }}
              >
                <Users className="w-4 h-4" />
                Jetzt mitmachen!
              </button>
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40" style={{ fontSize: 12 }}>
            <p>© 2026 Schützenverein Bahrdorf 1850 e.V. — Alle Rechte vorbehalten.</p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <Link to="/agb" className="text-white/40 hover:text-accent transition-colors underline underline-offset-2">
                AGB & Widerrufsbelehrung
              </Link>
              <span className="text-white/20">|</span>
              <Link to="/datenschutz" className="text-white/40 hover:text-accent transition-colors underline underline-offset-2">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <SponsorContactModal open={sponsorModalOpen} onClose={() => setSponsorModalOpen(false)} />
      <FlohmarktAnmeldeModal open={flohmarktModalOpen} onClose={() => setFlohmarktModalOpen(false)} />
    </div>
  );
}

/* ══════════ LAYOUT ══════════ */

import { Outlet } from "react-router";

function RootLayout() {
  useEffect(() => {
    // Pretix Widget Scripts vorladen
    if (!document.getElementById("pretix-widget-css")) {
      const link = document.createElement("link");
      link.id = "pretix-widget-css";
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "https://tickets.svbahrdorf.de/svbahrdorf/tickets/widget/v2.css";
      document.head.appendChild(link);
    }

    if (!document.getElementById("pretix-widget-js")) {
      const script = document.createElement("script");
      script.id = "pretix-widget-js";
      script.type = "text/javascript";
      script.src = "https://tickets.svbahrdorf.de/widget/v2.de.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      <Outlet />
      <CookieBanner />
    </>
  );
}

/* ══════════ ROUTER ══════════ */

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "vorverkauf", Component: TicketCountdown },
      { path: "tickets", Component: TicketShop },
      { path: "agb", Component: AGBPage },
      { path: "datenschutz", Component: DatenschutzPage },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}