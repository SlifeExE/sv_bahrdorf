import { useState } from "react";
import { MapPin, Calendar, Clock, Phone, Mail, ChevronDown, PartyPopper, Star, Music, Beer, Users, Target, Trophy } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

const fireworksImg = "https://images.unsplash.com/photo-1657032178129-fedec8a0947a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJld29ya3MlMjBuaWdodCUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MjU3NTY2NHww&ixlib=rb-4.1.0&q=80&w=1080";

/* ── Programm 2026 ── */
const programm = [
  {
    tag: "Freitag, 11.09.",
    events: [
      { zeit: "18:00", titel: "Andacht St.-Stephanus-Kirche", icon: "⛪" },
      { zeit: "19:00", titel: "Kranzniederlegung Friedhof", icon: "🕊️" },
      { zeit: "19:15", titel: "Umzug zum Festzelt", icon: "🚶" },
      { zeit: "20:00", titel: "Zeltdisko mit DJ (Eintritt frei!)", icon: "🎧" },
      { zeit: "21:00", titel: "Feuerwerk", icon: "🎆" },
    ],
    hinweis: "Ab 16 Jahre bis 24 Uhr, ab 18 Jahre Open End",
  },
  {
    tag: "Samstag, 12.09.",
    events: [
      { zeit: "13:45", titel: "Umzug, Treffpunkt Domäne", icon: "🚶" },
      { zeit: "15:00", titel: "Flohmarkt Alte Turnhalle", icon: "🛍️" },
      { zeit: "15:30", titel: "Kaffee & Kuchen im Festzelt", icon: "☕" },
      { zeit: "15:30", titel: "Kinderfest / Familienfest (Eintritt frei!)", icon: "🎠" },
      { zeit: "19:30", titel: "Proklamation", icon: "👑" },
      { zeit: "20:00", titel: "Partynacht mit der Coverband", icon: "🎸" },
    ],
    hinweis: "Kartenvorverkauf & Abendkasse",
  },
  {
    tag: "Sonntag, 13.09.",
    events: [
      { zeit: "09:45", titel: "Großer Umzug – Treffpunkt Domäne", icon: "🎺" },
      { zeit: "11:30", titel: "Katerfrühstück", icon: "🍳" },
    ],
    hinweis: null,
  },
];

/* ── Highlights ── */
const highlights = [
  { label: "Autoscooter", color: "#e85d3a", icon: "🎢" },
  { label: "Kinderkarussell", color: "#d4437a", icon: "🎠" },
  { label: "Hüpfburgen", color: "#f5a623", icon: "🏰" },
  { label: "Tombola", color: "#2d8b6f", icon: "🎰" },
  { label: "Kaffee & Kuchen", color: "#8b5c2d", icon: "☕" },
  { label: "Flohmarkt", color: "#6b3fa0", icon: "🛍️" },
  { label: "Kinderspiele", color: "#3a7be8", icon: "🎮" },
  { label: "Volksmajestäten\u00adschiessen", color: "#c41e3a", icon: "🎯" },
];

/* ── Sponsoren: 2 Kategorien ── */
const hauptsponsoren = [
  { name: "Brauerei Müller", farbe: "#2d8b6f" },
  { name: "Autohaus Schmidt", farbe: "#2d5f8a" },
  { name: "Sparkasse Bahrdorf", farbe: "#c41e3a" },
  { name: "Bäckerei Krause", farbe: "#6b4c2a" },
  { name: "Elektro Weber", farbe: "#2a6b5c" },
  { name: "Gasthof Zum Hirsch", farbe: "#8b6914" },
];

const sponsoren = [
  { name: "Dachdeckerei Berger", farbe: "#4a4a6a" },
  { name: "Blumen Meier", farbe: "#7a3b5c" },
  { name: "Friseur Schick", farbe: "#5c3b7a" },
  { name: "Metzgerei Hoffmann", farbe: "#7a5c3b" },
  { name: "Schreinerei Lang", farbe: "#3b5c7a" },
  { name: "Apotheke am Markt", farbe: "#5c7a3b" },
  { name: "Getränke König", farbe: "#7a3b3b" },
  { name: "Reisebüro Sonntag", farbe: "#3b7a5c" },
];

// Split sponsors into left/right
const hauptLeft = hauptsponsoren.filter((_, i) => i % 2 === 0);
const hauptRight = hauptsponsoren.filter((_, i) => i % 2 === 1);
const sponsorenLeft = sponsoren.filter((_, i) => i % 2 === 0);
const sponsorenRight = sponsoren.filter((_, i) => i % 2 === 1);

/* ── Wimpelkette ── */
function Pennants() {
  const colors = ["#2d8b6f", "#1f6b52", "#3aad8a", "#247a5f", "#2d8b6f", "#1a5e47", "#3aad8a", "#2d8b6f", "#1f6b52", "#3aad8a", "#247a5f", "#2d8b6f"];
  return (
    <svg viewBox="0 0 1200 90" className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
      <path d="M0,10 Q600,50 1200,10" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
      {colors.map((c, i) => {
        const x = i * 100 + 50;
        const baseY = 10 + Math.sin((i / colors.length) * Math.PI) * 20;
        return (
          <polygon key={i} points={`${x - 18},${baseY} ${x + 18},${baseY} ${x},${baseY + 55}`} fill={c} opacity={0.85} />
        );
      })}
    </svg>
  );
}

/* ── Konfetti ── */
function ConfettiDots() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 6,
    color: ["#f5c542", "#e85d3a", "#2d8b6f", "#d4437a", "#3a7be8", "#ffffff"][Math.floor(Math.random() * 6)],
    opacity: 0.2 + Math.random() * 0.4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, backgroundColor: d.color, opacity: d.opacity }}
        />
      ))}
    </div>
  );
}

/* ── Sponsor-Kachel ── */
function SponsorTile({ name, farbe, size }: { name: string; farbe: string; size: "lg" | "md" }) {
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 3);
  const isLg = size === "lg";
  return (
    <div
      className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-1.5 p-3 transition-transform hover:scale-105"
      style={{ width: isLg ? 150 : 120, height: isLg ? 90 : 72 }}
    >
      <div
        className="rounded-lg flex items-center justify-center px-3 py-1 text-white tracking-wider"
        style={{ backgroundColor: farbe, fontSize: isLg ? 18 : 14 }}
      >
        {initials}
      </div>
      <span className="text-center text-white/70 leading-tight" style={{ fontSize: isLg ? 10 : 9 }}>
        {name}
      </span>
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
      className={`hidden xl:flex flex-col items-center justify-evenly absolute top-0 bottom-0 z-40`}
      style={{
        width: 190,
        [side === "left" ? "left" : "right"]: "calc((100vw - 56rem) / 4 - 95px)",
      }}
    >
      {/* Hauptsponsoren – groß */}
      {hauptItems.map((s) => (
        <SponsorTile key={s.name} name={s.name} farbe={s.farbe} size="lg" />
      ))}

      {/* Sponsoren – mittel */}
      {items.map((s) => (
        <SponsorTile key={s.name} name={s.name} farbe={s.farbe} size="md" />
      ))}
    </div>
  );
}

/* ══════════ MAIN APP ══════════ */

export default function App() {
  const [openDay, setOpenDay] = useState<number>(0);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Fredoka', sans-serif" }}>
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: "rgba(26,26,46,0.9)" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            <span className="text-white tracking-wider" style={{ fontSize: 14 }}>
              SV Bahrdorf 1850 e.V.
            </span>
          </div>
          <div className="hidden md:flex gap-6" style={{ fontSize: 14 }}>
            <a href="#programm" className="text-white/80 hover:text-accent transition-colors">Programm</a>
            <a href="#highlights" className="text-white/80 hover:text-accent transition-colors">Highlights</a>
            <a href="#sponsoren" className="text-white/80 hover:text-accent transition-colors">Sponsoren</a>
            <a href="#kontakt" className="text-white/80 hover:text-accent transition-colors">Kontakt</a>
          </div>
        </div>
      </nav>

      {/* ── Wrapper für Sidebar-Bereich (relative) – ab Hero bis Partynacht ── */}
      <div className="relative">
        {/* ── Sponsor-Sidebars (xl only, absolut im Wrapper) ── */}
        <SponsorSidebar hauptItems={hauptLeft} items={sponsorenLeft} side="left" />
        <SponsorSidebar hauptItems={hauptRight} items={sponsorenRight} side="right" />

        {/* ─── Hero ─── */}
        <header className="relative overflow-hidden pt-12" style={{ background: "linear-gradient(180deg, #1a3a2e 0%, #2d8b6f 15%, #e85d3a 50%, #d4437a 75%, #1a1a2e 100%)" }}>
          <ConfettiDots />
          <div className="relative z-10 mt-2">
            <Pennants />
          </div>
          <div className="relative z-10 text-center px-4 pb-16 pt-4">
            <div className="inline-block mb-4">
              <span className="text-accent tracking-[0.2em] uppercase" style={{ fontSize: 14 }}>Jubiläum</span>
            </div>
            <h1
              className="text-white mb-2 drop-shadow-lg"
              style={{ fontSize: "clamp(42px, 8vw, 80px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1.1 }}
            >
              176 Jahre
            </h1>
            <h2 className="text-white/90 uppercase tracking-[0.15em] mb-6 drop-shadow" style={{ fontSize: "clamp(16px, 3vw, 26px)" }}>
              Schützenverein Bahrdorf
            </h2>
            <div className="inline-flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-5 border border-white/20 mb-6">
              <Target className="w-10 h-10 text-white mb-1" />
              <span className="text-white tracking-wider" style={{ fontSize: 13 }}>Schützenverein</span>
              <span className="text-accent tracking-[0.2em] uppercase" style={{ fontSize: 18 }}>BAHRDORF</span>
              <span className="text-white/60" style={{ fontSize: 11 }}>1850 e.V.</span>
            </div>
            <div className="mb-6">
              <h2
                className="text-accent uppercase tracking-wider mb-2"
                style={{ fontSize: "clamp(20px, 4vw, 36px)", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
              >
                Jubiläums-Schützenfest
              </h2>
              <div className="flex items-center justify-center gap-3 text-white">
                <span style={{ fontSize: 22 }}>»</span>
                <span style={{ fontSize: "clamp(18px, 3.5vw, 30px)" }}>11. – 13.09.2026</span>
                <span style={{ fontSize: 22 }}>«</span>
              </div>
            </div>
            <h3 className="text-white uppercase tracking-[0.15em]" style={{ fontSize: "clamp(20px, 4vw, 34px)", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Familienfest
            </h3>
            <p className="text-accent mt-4" style={{ fontSize: 16 }}>🎉 Eintritt frei! 🎉</p>
            <a
              href="https://schuetzenfest-tickets.dawntale.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 px-8 py-3 rounded-full text-white transition-all hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #2d8b6f, #1f6b52)",
                fontSize: 16,
                letterSpacing: "0.05em",
                boxShadow: "0 4px 20px rgba(45,139,111,0.4)",
              }}
            >
              🎟️ Tickets sichern
            </a>
          </div>
          <svg viewBox="0 0 1440 80" className="w-full -mb-1 relative z-10" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#1a1a2e" />
          </svg>
        </header>

        {/* ─── Happy Hour Banner ─── */}
        <section className="bg-[#1a1a2e] py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-3 bg-accent/20 border border-accent/40 rounded-xl px-6 py-3">
                <Beer className="w-6 h-6 text-accent" />
                <div>
                  <p className="text-accent" style={{ fontSize: 18 }}>Happy Hour</p>
                  <p className="text-white/70" style={{ fontSize: 13 }}>Freitag 21:15 Uhr · Samstag 20:00 Uhr</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-primary/20 border border-primary/40 rounded-xl px-6 py-3">
                <PartyPopper className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-primary" style={{ fontSize: 18 }}>Fahrgeschäft-Chips</p>
                  <p className="text-white/70" style={{ fontSize: 13 }}>zu gewinnen!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Highlights Bubbles ─── */}
        <section id="highlights" className="relative py-16 overflow-hidden" style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #2a1a3e 100%)" }}>
          <ConfettiDots />
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-white mb-2" style={{ fontSize: "clamp(22px, 4vw, 32px)", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                Das erwartet euch!
              </h2>
              <div className="w-16 h-[3px] bg-accent mx-auto rounded-full" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex flex-col items-center justify-center rounded-full text-white text-center shadow-lg"
                  style={{
                    width: "clamp(110px, 18vw, 150px)",
                    height: "clamp(110px, 18vw, 150px)",
                    background: `radial-gradient(circle at 30% 30%, ${h.color}cc, ${h.color}88)`,
                    border: `2px solid ${h.color}`,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{h.icon}</span>
                  <span style={{ fontSize: "clamp(11px, 1.5vw, 14px)", lineHeight: 1.3 }} className="px-2 mt-1">{h.label}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-accent mt-8" style={{ fontSize: 16 }}>
              … und viele weitere Überraschungen! 🎊
            </p>
          </div>
        </section>

        {/* ─── Programm ─── */}
        <section id="programm" className="py-16 relative" style={{ background: "linear-gradient(180deg, #2a1a3e 0%, #1a2a3e 100%)" }}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-white mb-2" style={{ fontSize: "clamp(22px, 4vw, 32px)", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                Festprogramm 2026
              </h2>
              <div className="w-16 h-[3px] bg-accent mx-auto rounded-full mb-3" />
              <p className="text-white/60" style={{ fontSize: 14 }}>Drei Tage voller Programm – für jeden etwas dabei!</p>
            </div>
            <div className="space-y-4">
              {programm.map((tag, i) => (
                <div key={tag.tag} className="rounded-xl overflow-hidden border border-white/15" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}>
                  <button
                    onClick={() => setOpenDay(openDay === i ? -1 : i)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span className="text-white" style={{ fontSize: 18 }}>{tag.tag}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-white/50 transition-transform duration-300 ${openDay === i ? "rotate-180" : ""}`} />
                  </button>
                  {openDay === i && (
                    <div className="px-5 pb-5">
                      <div className="border-t border-white/10 pt-4 space-y-4">
                        {tag.events.map((event) => (
                          <div key={event.zeit + event.titel} className="flex items-start gap-4">
                            <span style={{ fontSize: 22 }}>{event.icon}</span>
                            <div>
                              <span className="text-accent" style={{ fontSize: 14 }}>{event.zeit} Uhr</span>
                              <p className="text-white" style={{ fontSize: 15 }}>{event.titel}</p>
                            </div>
                          </div>
                        ))}
                        {tag.hinweis && (
                          <p className="text-white/40 mt-2 border-t border-white/10 pt-3" style={{ fontSize: 12 }}>{tag.hinweis}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Feuerwerk Banner ─── */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <ImageWithFallback src={fireworksImg} alt="Feuerwerk" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
            <Music className="w-8 h-8 text-accent mb-3" />
            <h2 className="text-white mb-1" style={{ fontSize: "clamp(20px, 4vw, 30px)", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              Partynacht mit Live-Band
            </h2>
            <p className="text-white/80" style={{ fontSize: 15 }}>Samstag ab 20:00 Uhr im Festzelt</p>
            <p className="text-accent mt-2" style={{ fontSize: 13 }}>Kartenvorverkauf & Abendkasse</p>
          </div>
        </section>
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
                <SponsorTile key={s.name} name={s.name} farbe={s.farbe} size="lg" />
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
              <h3 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 15 }}>Kontakt</h3>
              <div className="space-y-3" style={{ fontSize: 14 }}>
                <p className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />Schützenhaus, 38379 Bahrdorf
                </p>
                <p className="flex items-center gap-2 text-white/80">
                  <Phone className="w-4 h-4 text-accent shrink-0" />01234 / 567890
                </p>
                <p className="flex items-center gap-2 text-white/80">
                  <Mail className="w-4 h-4 text-accent shrink-0" />info@sv-bahrdorf.de
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 15 }}>Auf einen Blick</h3>
              <ul className="space-y-2 text-white/80" style={{ fontSize: 14 }}>
                <li>📅 11. – 13. September 2026</li>
                <li>📍 Festplatz am Schützenhaus</li>
                <li>🎯 176 Jahre Schützenverein</li>
                <li>🎉 Eintritt frei (Familienfest)</li>
                <li>🎆 Feuerwerk Freitag 21 Uhr</li>
              </ul>
            </div>
            <div>
              <h3 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 15 }}>Sponsor werden?</h3>
              <p className="text-white/80" style={{ fontSize: 14, lineHeight: 1.7 }}>
                Sie möchten unser Jubiläums-Schützenfest unterstützen und Ihr Unternehmen präsentieren?
                Melden Sie sich gerne bei uns!
              </p>
              <div className="mt-4">
                <Users className="w-5 h-5 text-accent inline mr-2" />
                <span className="text-accent" style={{ fontSize: 14 }}>Jetzt mitmachen!</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40" style={{ fontSize: 12 }}>
            <p>© 2026 Schützenverein Bahrdorf 1850 e.V. — 176 Jahre Tradition — Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}