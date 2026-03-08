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

/* ── Pretix Button ── */
/* Baut einen items-String aus den Mengen und erzeugt ein <pretix-button>-Element.
   Klick öffnet das Pretix-Checkout-Overlay (Modal/Lightbox). */
function PretixCheckoutButton({
  tickets,
  quantities,
}: {
  tickets: TicketType[];
  quantities: Record<string, number>;
}) {
  const btnRef = useRef<HTMLDivElement>(null);

  // Build items string: "item_3=2,item_2=1"
  const itemsStr = tickets
    .filter((t) => (quantities[t.id] || 0) > 0)
    .map((t) => `item_${t.pretixItemId}=${quantities[t.id]}`)
    .join(",");

  useEffect(() => {
    const container = btnRef.current;
    if (!container) return;

    // Clear previous button
    container.innerHTML = "";

    // Create <pretix-button> element
    const btn = document.createElement("pretix-button");
    btn.setAttribute(
      "event",
      "https://tickets.svbahrdorf.de/svbahrdorf/tickets/",
    );
    if (itemsStr) {
      btn.setAttribute("items", itemsStr);
    }

    // Style the button content
    const inner = document.createElement("span");
    inner.className = "pretix-button-inner";
    inner.style.cssText = `
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 32px;
      border-radius: 12px;
      color: white;
      font-size: 15px;
      font-weight: 600;
      font-family: 'Nunito', sans-serif;
      background: linear-gradient(135deg, #228B47 0%, #1a6b3c 100%);
      cursor: pointer;
      transition: transform 0.15s, box-shadow 0.15s;
      box-shadow: 0 4px 14px rgba(34,139,71,0.3);
    `;
    inner.innerHTML = `🎟️ Jetzt Tickets kaufen`;
    inner.onmouseenter = () => {
      inner.style.transform = "scale(1.05)";
      inner.style.boxShadow = "0 6px 20px rgba(34,139,71,0.4)";
    };
    inner.onmouseleave = () => {
      inner.style.transform = "scale(1)";
      inner.style.boxShadow = "0 4px 14px rgba(34,139,71,0.3)";
    };

    btn.appendChild(inner);
    container.appendChild(btn);

    // Trigger Pretix to pick up the new button
    const tryBuild = () => {
      if (typeof (window as any).PretixWidget !== "undefined") {
        try {
          (window as any).PretixWidget.buildWidgets();
        } catch (_) {
          // silently ignore
        }
      }
    };
    tryBuild();
    setTimeout(tryBuild, 300);
    setTimeout(tryBuild, 1000);
  }, [itemsStr]);

  return <div ref={btnRef} className="inline-block" />;
}

/* ════════════════════════════════════════════ */
export function TicketShop() {
  const [tickets, setTickets] = useState<TicketType[]>(TICKETS);
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [quantities, setQuantities] = useState<
    Record<string, number>
  >(Object.fromEntries(TICKETS.map((t) => [t.id, 0])));
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
    document
      .getElementById("cart-summary")
      ?.scrollIntoView({ behavior: "smooth" });
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
            id="cart-summary"
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
            <PretixCheckoutButton
              tickets={tickets}
              quantities={quantities}
            />
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