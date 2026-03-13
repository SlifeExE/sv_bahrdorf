import { useState, useEffect } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies_accepted");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookies_accepted", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="max-w-2xl mx-auto rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center gap-4 shadow-2xl"
        style={{
          pointerEvents: "auto",
          background: "rgba(15, 15, 30, 0.95)",
          border: "1px solid rgba(45, 139, 111, 0.4)",
          backdropFilter: "blur(12px)",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <p className="text-white/80 text-center sm:text-left" style={{ fontSize: 14, lineHeight: 1.6 }}>
          Diese Website verwendet technisch notwendige Cookies
          zur Bereitstellung des Ticketshops.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/datenschutz"
            className="text-accent hover:underline whitespace-nowrap"
            style={{ fontSize: 13, fontFamily: "'Fredoka', sans-serif" }}
          >
            Datenschutzerklärung
          </a>
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-lg text-white cursor-pointer whitespace-nowrap transition-all hover:scale-105"
            style={{
              fontSize: 14,
              fontFamily: "'Fredoka', sans-serif",
              background: "linear-gradient(135deg, #2d8b6f, #1a7a5a)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}