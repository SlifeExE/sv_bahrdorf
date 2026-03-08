import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Minus,
  Plus,
  ShoppingCart,
  Ticket,
  Star,
  ChevronDown,
  Loader2,
} from "lucide-react";

/* ── Pretix Config ── */
const PRETIX_BASE_URL = "https://tickets.svbahrdorf.de";
const PRETIX_ORGANIZER = "svbahrdorf";
const PRETIX_EVENT = "tickets";
// API calls laufen über Nginx-Proxy → kein Token im Frontend nötig
const PRETIX_PROXY_URL = "/pretix-api";

/* ── Ticket types ── */
interface TicketType {
  id: string;
  name: string;
  date: string;
  dateShort: string;
  weekday: string;
  description: string;
  price: number | null;
  currency: string;
  available: boolean;
  pretixItemId: number;
  features: string[];
  timeInfo: string;
  startTime?: string;
  maxPerOrder: number;
}

const TICKETS: TicketType[] = [
  {
    id: "samstag-ticket",
    name: "Samstags-Ticket",
    date: "2026-09-12",
    dateShort: "12.09.2026",
    weekday: "Samstag",
    description:
      "Eintritt zur großen Partynacht mit Coverband im Festzelt. Der Samstag ist DAS Highlight des Schützenfests!",
    price: null,
    currency: "EUR",
    available: true,
    pretixItemId: 3,
    features: [
      "Eintritt ins Festzelt ab 19:30 Uhr",
      "Proklamation der Majestäten",
      "Live-Musik: Coverband",
      "Party bis Open End",
    ],
    timeInfo: "Ab 20:00 Uhr",
    maxPerOrder: 10,
  },
  {
    id: "katerfruehstueck",
    name: "Katerfrühstück",
    date: "2026-09-13",
    dateShort: "13.09.2026",
    weekday: "Sonntag",
    description:
      "Gemütliches Katerfrühstück am Sonntagmorgen im Festzelt – der perfekte Ausklang des Schützenfest-Wochenendes.",
    price: null,
    currency: "EUR",
    available: true,
    pretixItemId: 2,
    features: [
      "Reichhaltiges Frühstücksbuffet",
      "Gemütliche Atmosphäre im Festzelt",
      "Der perfekte Ausklang",
    ],
    timeInfo: "Ab 11:30 Uhr",
    maxPerOrder: 10,
  },
];

/* ── Pretix API: Preise + Verfügbarkeit laden (via Nginx-Proxy) ── */
async function fetchPretixItems(): Promise<Record<
  number,
  { price: number; available: boolean }
> | null> {
  const res = await fetch(
    `${PRETIX_PROXY_URL}/organizers/${PRETIX_ORGANIZER}/events/${PRETIX_EVENT}/items/`,
  );
  if (!res.ok)
    throw new Error(`Pretix API error: ${res.status}`);
  const data = await res.json();

  const result: Record<
    number,
    { price: number; available: boolean }
  > = {};
  for (const item of data.results ?? []) {
    result[item.id] = {
      price: parseFloat(item.default_price),
      available: item.active && !item.has_variations,
    };
  }
  return result;
}

/* ── Format price ── */
function formatPrice(price: number | null): string {
  if (price === null) return "...";
  if (price === 0) return "Preis folgt";
  return `${price.toFixed(2).replace(".", ",")} €`;
}

/* ── Pretix Widget Container ── */
function PretixWidgetContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const injectedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const inject = () => {
      // Only inject once – don't destroy an already-initialized widget
      if (injectedRef.current) return;
      injectedRef.current = true;

      // Kompatibilitätsmodus: normales <div> statt Custom Element
      const widget = document.createElement("div");
      widget.className = "pretix-widget-compat";
      widget.setAttribute(
        "event",
        "https://tickets.svbahrdorf.de/svbahrdorf/tickets/",
      );
      container.appendChild(widget);

      // noscript fallback
      const noscript = document.createElement("noscript");
      noscript.innerHTML = `
        <div class="pretix-widget">
          <div class="pretix-widget-info-message">
            JavaScript ist in Ihrem Browser deaktiviert. Um unseren Ticketshop ohne JavaScript aufzurufen, klicken Sie bitte
            <a target="_blank" rel="noopener" href="https://tickets.svbahrdorf.de/svbahrdorf/tickets/">hier</a>.
          </div>
        </div>
      `;
      container.appendChild(noscript);

      // Give Pretix a moment to register, then trigger widget build
      const tryBuild = () => {
        if (typeof (window as any).PretixWidget !== "undefined") {
          try {
            (window as any).PretixWidget.buildWidgets();
          } catch (_) {
            // silently ignore
          }
        }
      };
      // Try immediately + with delays as fallback
      tryBuild();
      setTimeout(tryBuild, 200);
      setTimeout(tryBuild, 1000);
      setTimeout(tryBuild, 3000);
    };

    // Check if the pretix script is already in the DOM
    const scriptEl = document.getElementById("pretix-widget-js") as HTMLScriptElement | null;

    if (!scriptEl) {
      // Script not in DOM – inject CSS + JS ourselves
      if (!document.getElementById("pretix-widget-css")) {
        const link = document.createElement("link");
        link.id = "pretix-widget-css";
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://tickets.svbahrdorf.de/svbahrdorf/tickets/widget/v2.css";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      }

      const script = document.createElement("script");
      script.id = "pretix-widget-js";
      script.type = "text/javascript";
      script.src = "https://tickets.svbahrdorf.de/widget/v2.de.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => inject();
      document.head.appendChild(script);
      return;
    }

    // Script element exists – inject widget div
    // If script already loaded, inject now; also listen for load as backup
    inject();
    const onLoad = () => inject();
    scriptEl.addEventListener("load", onLoad);
    return () => scriptEl.removeEventListener("load", onLoad);
  }, []);

  return <div ref={containerRef} style={{ minHeight: 300 }} />;
}

/* ════════════════════════════════════════════ */
export function TicketShop() {
  const [tickets, setTickets] = useState<TicketType[]>(TICKETS);
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [quantities, setQuantities] = useState<
    Record<string, number>
  >(Object.fromEntries(TICKETS.map((t) => [t.id, 0])));
  const [showWidget, setShowWidget] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(
    null,
  );

  /* Preise beim Laden von Pretix holen */
  useEffect(() => {
    fetchPretixItems()
      .then((itemData) => {
        if (!itemData) return;
        setTickets((prev) =>
          prev.map((t) => {
            const live = itemData[t.pretixItemId];
            if (!live) return t;
            return {
              ...t,
              price: live.price,
              available: live.available,
            };
          }),
        );
      })
      .catch((err) => {
        console.info(
          "Pretix API nicht erreichbar, zeige Fallback-Preise.",
          err?.message,
        );
      })
      .finally(() => setLoadingPrices(false));
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const ticket = tickets.find((t) => t.id === id);
      const max = ticket?.maxPerOrder ?? 10;
      const next = Math.max(
        0,
        Math.min(max, (prev[id] || 0) + delta),
      );
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(quantities).reduce(
    (a, b) => a + b,
    0,
  );
  const totalPrice = tickets.reduce(
    (sum, t) => sum + (t.price ?? 0) * (quantities[t.id] || 0),
    0,
  );

  const handleCheckout = () => {
    const hasItems = tickets.some(
      (t) => (quantities[t.id] || 0) > 0,
    );
    if (!hasItems) return;
    setShowWidget(true);
    setTimeout(() => {
      document
        .getElementById("pretix-widget-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const faqs = [
    {
      id: "age",
      q: "Gibt es eine Altersbeschränkung?",
      a: "Samstag Partynacht: Ab 16 Jahre bis 24 Uhr, ab 18 Jahre Open End. Beim Katerfrühstück gibt es keine Altersbeschränkung.",
    },
    {
      id: "payment",
      q: "Welche Zahlungsmethoden werden akzeptiert?",
      a: "Online-Zahlung per PayPal oder Überweisung. Tickets sind auch an der Abendkasse (nur Barzahlung) erhältlich.",
    },
    {
      id: "cancel",
      q: "Kann ich mein Ticket stornieren?",
      a: "Eine Stornierung ist bis 7 Tage vor der Veranstaltung möglich. Bitte kontaktiere uns unter info@svbahrdorf.de.",
    },
    {
      id: "kvv",
      q: "Was ist ein KVV-Ticket?",
      a: "KVV steht für Kartenvorverkauf. Diese Tickets sind günstiger als an der Abendkasse und sichern dir garantiert Einlass.",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Nunito', sans-serif",
        background:
          "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)",
        color: "#1a1a2e",
      }}
    >
      {/* ─── Header ─── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          background: "rgba(255,255,255,0.92)",
          borderColor: "rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm transition-colors hover:opacity-70"
            style={{ color: "#228B47" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Übersicht</span>
          </Link>
          <div className="flex items-center gap-2">
            <Ticket
              className="w-5 h-5"
              style={{ color: "#228B47" }}
            />
            <span
              className="tracking-wider"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(14px, 2vw, 18px)",
                color: "#1a1a2e",
              }}
            >
              Ticketshop
            </span>
          </div>
          <div className="w-[120px] flex justify-end">
            {totalItems > 0 && (
              <button
                onClick={handleCheckout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-sm transition-all hover:scale-105"
                style={{ background: "#228B47" }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{totalItems}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─── Hero Banner ─── */}
      <section
        className="py-12 md:py-16 text-center"
        style={{
          background:
            "linear-gradient(135deg, #228B47 0%, #1a6b3c 40%, #1a4a2e 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="w-4 h-4 text-yellow-300" />
            <span
              className="text-white/80 uppercase tracking-[0.2em]"
              style={{ fontSize: "clamp(11px, 1.5vw, 13px)" }}
            >
              Schützenfest Bahrdorf 2026
            </span>
            <Star className="w-4 h-4 text-yellow-300" />
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 48px)",
              color: "#ffffff",
              lineHeight: 1.15,
            }}
          >
            Tickets sichern
          </h1>
          <p
            className="mt-3 text-white/75 max-w-lg mx-auto"
            style={{
              fontSize: "clamp(14px, 2vw, 16px)",
              lineHeight: 1.6,
            }}
          >
            12. – 14. September 2026 · Festzelt am Schützenheim
          </p>
          <div
            className="flex items-center justify-center gap-4 mt-4 text-white/60"
            style={{ fontSize: 13 }}
          >
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Bahrdorf
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> 12.–14.09.
            </span>
          </div>
        </div>
      </section>

      {/* ─── Ticket Cards ─── */}
      <section className="max-w-5xl mx-auto px-4 -mt-6 relative z-10 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-2xl overflow-hidden transition-shadow hover:shadow-xl"
              style={{
                background: "#ffffff",
                boxShadow:
                  "0 2px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Card Header */}
              <div
                className="px-6 py-5"
                style={{
                  background:
                    ticket.id === "samstag-ticket"
                      ? "linear-gradient(135deg, #e85d3a 0%, #d44a28 100%)"
                      : "linear-gradient(135deg, #f5a623 0%, #e8951a 100%)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className="text-white/80 uppercase tracking-[0.15em]"
                      style={{ fontSize: 11 }}
                    >
                      {ticket.weekday}
                    </span>
                    <h2
                      className="text-white mt-1"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(22px, 3vw, 28px)",
                        lineHeight: 1.2,
                      }}
                    >
                      {ticket.name}
                    </h2>
                  </div>
                  <div
                    className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1.5"
                    style={{ fontSize: 13 }}
                  >
                    <Calendar className="w-3.5 h-3.5 text-white" />
                    <span className="text-white">
                      {ticket.dateShort}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 py-5 flex flex-col flex-1">
                <p
                  className="text-gray-600"
                  style={{ fontSize: 14, lineHeight: 1.6 }}
                >
                  {ticket.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {ticket.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2"
                      style={{ fontSize: 14 }}
                    >
                      <span
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "#228B47" }}
                      >
                        ✓
                      </span>
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex-1" />

                <div
                  className="mt-4 flex items-center gap-2 text-gray-500"
                  style={{ fontSize: 13 }}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{ticket.timeInfo}</span>
                  {ticket.startTime && (
                    <>
                      <span className="text-gray-300">·</span>
                      <span>{ticket.startTime}</span>
                    </>
                  )}
                </div>

                <div
                  className="my-5 border-t border-dashed"
                  style={{ borderColor: "rgba(0,0,0,0.1)" }}
                />

                {/* Price & Quantity */}
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="text-gray-400 block"
                      style={{ fontSize: 12 }}
                    >
                      Preis pro Ticket
                    </span>
                    <span
                      className="mt-0.5 flex items-center gap-2"
                      style={{
                        fontSize:
                          ticket.price === null ||
                          ticket.price === 0
                            ? 16
                            : 24,
                        color:
                          ticket.price === null ||
                          ticket.price === 0
                            ? "#999"
                            : "#1a1a2e",
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      {loadingPrices &&
                        ticket.price === null && (
                          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                        )}
                      {formatPrice(ticket.price)}
                    </span>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateQuantity(ticket.id, -1)
                      }
                      disabled={!quantities[ticket.id]}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
                      style={{
                        border: "1.5px solid rgba(0,0,0,0.15)",
                        background: quantities[ticket.id]
                          ? "#fff"
                          : "transparent",
                      }}
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span
                      className="w-8 text-center tabular-nums"
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#1a1a2e",
                      }}
                    >
                      {quantities[ticket.id] || 0}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(ticket.id, 1)
                      }
                      disabled={
                        !ticket.available ||
                        (quantities[ticket.id] || 0) >=
                          ticket.maxPerOrder
                      }
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-30 hover:scale-105"
                      style={{ background: "#228B47" }}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Cart Summary / Checkout ─── */}
        {totalItems > 0 && (
          <div
            className="mt-8 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              background: "#ffffff",
              boxShadow:
                "0 2px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div>
              <span
                className="text-gray-400"
                style={{ fontSize: 13 }}
              >
                Deine Auswahl
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                {tickets
                  .filter((t) => quantities[t.id] > 0)
                  .map((t) => (
                    <span
                      key={t.id}
                      className="text-gray-700"
                      style={{ fontSize: 14 }}
                    >
                      {quantities[t.id]}× {t.name}
                    </span>
                  ))}
              </div>
              {totalPrice > 0 && (
                <p
                  className="mt-1"
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1a1a2e",
                  }}
                >
                  Gesamt: {formatPrice(totalPrice)}
                </p>
              )}
            </div>
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl text-white transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
              style={{
                background:
                  "linear-gradient(135deg, #228B47 0%, #1a6b3c 100%)",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              {isSubmitting ? "Wird geladen..." : "Zur Kasse"}
            </button>
          </div>
        )}

        {/* ─── Pretix Widget Checkout ─── */}
        {showWidget && (
          <div
            id="pretix-widget-section"
            className="mt-8 rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{
                background:
                  "linear-gradient(135deg, #228B47 0%, #1a6b3c 100%)",
              }}
            >
              <span
                className="text-white font-semibold"
                style={{ fontSize: 16 }}
              >
                🎟️ Tickets kaufen
              </span>
              <button
                onClick={() => setShowWidget(false)}
                className="text-white/70 hover:text-white text-sm"
              >
                ✕ Schließen
              </button>
            </div>
            <div className="p-4" style={{ background: "#fff" }}>
              <PretixWidgetContainer />
            </div>
          </div>
        )}

        {/* ─── Info Hinweise ─── */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Users className="w-5 h-5" />,
              title: "Abendkasse",
              text: "Tickets auch vor Ort erhältlich (Barzahlung)",
            },
            {
              icon: <Ticket className="w-5 h-5" />,
              title: "KVV-Vorteil",
              text: "Im Vorverkauf günstiger als an der Abendkasse",
            },
            {
              icon: <Calendar className="w-5 h-5" />,
              title: "Freier Eintritt",
              text: "Freitag Zeltdisko & Samstag Kinderfest sind kostenlos",
            },
          ].map((info, i) => (
            <div
              key={i}
              className="rounded-xl px-5 py-4 flex items-start gap-3"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(34,139,71,0.08)",
                  color: "#228B47",
                }}
              >
                {info.icon}
              </div>
              <div>
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#1a1a2e",
                  }}
                >
                  {info.title}
                </h4>
                <p
                  className="text-gray-500 mt-0.5"
                  style={{ fontSize: 13, lineHeight: 1.5 }}
                >
                  {info.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ─── FAQ ─── */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h2
            className="text-center mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              color: "#1a1a2e",
            }}
          >
            Häufige Fragen
          </h2>
          <div className="space-y-2">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <button
                  onClick={() =>
                    setExpandedFaq(
                      expandedFaq === faq.id ? null : faq.id,
                    )
                  }
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1a1a2e",
                    }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className="w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-3"
                    style={{
                      transform:
                        expandedFaq === faq.id
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  />
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-5 pb-4">
                    <p
                      className="text-gray-600"
                      style={{ fontSize: 14, lineHeight: 1.7 }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Footer note ─── */}
        <div className="mt-12 text-center pb-8">
          <p
            className="text-gray-400"
            style={{ fontSize: 12, lineHeight: 1.6 }}
          >
            Veranstalter: Schützenverein Bahrdorf 1850 e.V. ·
            Helmstedter Straße 4 · 38459 Bahrdorf
          </p>
          <p
            className="text-gray-400 mt-1"
            style={{ fontSize: 12 }}
          >
            Bei Fragen:{" "}
            <a
              href="mailto:info@svbahrdorf.de"
              className="underline hover:text-gray-600"
            >
              info@svbahrdorf.de
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}