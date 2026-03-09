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
} from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "pretix-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        event?: string;
        items?: string;
        voucher?: string;
        "skip-ssl-check"?: boolean;
      };
    }
  }
}

interface TicketType {
  id: string;
  name: string;
  dateShort: string;
  weekday: string;
  description: string;
  features: string[];
  timeInfo: string;
  maxPerOrder: number;
  pretixItemId: number;
}

const PRETIX_EVENT_URL =
  "https://tickets.svbahrdorf.de/svbahrdorf/tickets/";

const TICKETS: TicketType[] = [
  {
    id: "samstag-ticket",
    name: "Samstags-Ticket",
    dateShort: "13.09.2026",
    weekday: "Samstag",
    description:
      "Eintritt zur großen Partynacht mit Coverband im Festzelt. Der Samstag ist DAS Highlight des Schützenfests!",
    pretixItemId: 3,
    features: [
      "Eintritt ins Festzelt ab 19:30 Uhr",
      "Proklamation der Majestäten",
      "Live-Musik: Coverband Das Fiasko",
      "Party bis Open End",
    ],
    timeInfo: "Einlass ab 19:30 Uhr",
    maxPerOrder: 10,
  },
  {
    id: "katerfruehstueck",
    name: "Katerfrühstück",
    dateShort: "14.09.2026",
    weekday: "Sonntag",
    description:
      "Gemütliches Katerfrühstück am Sonntagmorgen im Festzelt – der perfekte Ausklang des Schützenfest-Wochenendes.",
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

/* ── Pretix Button Wrapper ── */
function PretixCheckoutButton({
  itemsStr,
  label,
}: {
  itemsStr: string;
  label: string;
}) {
  const btnRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Element NUR EINMAL beim Mount erstellen – Pretix initialisiert es dann
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const btn = document.createElement(
      "pretix-button",
    ) as HTMLElement;
    btn.setAttribute("event", PRETIX_EVENT_URL);
    btn.setAttribute("items", itemsStr);
    btn.style.cssText = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 32px;
      border-radius: 12px;
      background: linear-gradient(135deg, #228B47 0%, #1a6b3c 100%);
      color: white;
      font-size: 15px;
      font-weight: 600;
      font-family: 'Nunito', sans-serif;
      cursor: pointer;
      border: none;
      box-shadow: 0 4px 20px rgba(34,139,71,0.3);
      transition: transform 0.15s, box-shadow 0.15s;
      white-space: nowrap;
    `;
    btn.textContent = label;
    btn.onmouseenter = () => {
      btn.style.transform = "scale(1.03)";
      btn.style.boxShadow = "0 6px 24px rgba(34,139,71,0.4)";
    };
    btn.onmouseleave = () => {
      btn.style.transform = "scale(1)";
      btn.style.boxShadow = "0 4px 20px rgba(34,139,71,0.3)";
    };

    container.appendChild(btn);
    btnRef.current = btn;

    // Bei SPA-Navigation (React Router) läuft Pretix nicht neu –
    // customElements.upgrade() initialisiert das Element manuell
    if (window.customElements) {
      window.customElements.upgrade(btn);
    }
  }, []); // <-- leeres Array: nur EINMAL beim Mount

  // items + label nur per setAttribute updaten – kein neu-Erstellen
  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.setAttribute("items", itemsStr);
      btnRef.current.textContent = label;
    }
  }, [itemsStr, label]);

  return <div ref={containerRef} />;
}

export function TicketShop() {
  const [quantities, setQuantities] = useState<
    Record<string, number>
  >(Object.fromEntries(TICKETS.map((t) => [t.id, 0])));
  const [expandedFaq, setExpandedFaq] = useState<string | null>(
    null,
  );

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const ticket = TICKETS.find((t) => t.id === id);
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

  // e.g. "item_3=2,item_2=1"
  const checkoutItemsStr = TICKETS.filter(
    (t) => (quantities[t.id] || 0) > 0,
  )
    .map((t) => `item_${t.pretixItemId}=${quantities[t.id]}`)
    .join(",");

  const faqs = [
    {
      id: "age",
      q: "Gibt es eine Altersbeschränkung?",
      a: "Samstag Partynacht: Ab 16 Jahre bis 24 Uhr, ab 18 Jahre Open End. Beim Katerfrühstück gibt es keine Altersbeschränkung.",
    },
    {
      id: "payment",
      q: "Welche Zahlungsmethoden werden akzeptiert?",
      a: "Online-Zahlung per Kreditkarte, PayPal, Sofortüberweisung und Giropay. Tickets sind auch an der Abendkasse (nur Barzahlung) erhältlich.",
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
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-sm"
                style={{ background: "#228B47" }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{totalItems}</span>
              </div>
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
          {TICKETS.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-2xl overflow-hidden transition-shadow hover:shadow-xl"
              style={{
                background: "#ffffff",
                boxShadow:
                  "0 2px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.06)",
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
              <div className="px-6 py-5">
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
                <div
                  className="mt-4 flex items-center gap-2 text-gray-500"
                  style={{ fontSize: 13 }}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{ticket.timeInfo}</span>
                </div>
                <div
                  className="my-5 border-t border-dashed"
                  style={{ borderColor: "rgba(0,0,0,0.1)" }}
                />
                {/* Quantity selector */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-gray-500"
                    style={{ fontSize: 14 }}
                  >
                    Anzahl wählen
                  </span>
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

        {/* ─── Warenkorb / Checkout ─── */}
        {/* display:none statt conditional render – Pretix initialisiert Button beim Seitenstart */}
        <div
          className="mt-8 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "#ffffff",
            boxShadow:
              "0 2px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.06)",
            display: totalItems > 0 ? "flex" : "none",
          }}
        >
          <div>
            <span
              className="text-gray-400"
              style={{ fontSize: 13 }}
            >
              Deine Auswahl
            </span>
            <div className="flex flex-wrap items-baseline gap-3 mt-1">
              {TICKETS.filter((t) => quantities[t.id] > 0).map(
                (t) => (
                  <span
                    key={t.id}
                    className="text-gray-700"
                    style={{ fontSize: 14 }}
                  >
                    {quantities[t.id]}× {t.name}
                  </span>
                ),
              )}
            </div>
          </div>
          <PretixCheckoutButton
            itemsStr={
              checkoutItemsStr ||
              `item_${TICKETS[0].pretixItemId}=1`
            }
            label={
              totalItems > 0
                ? `🛒 Zur Kasse (${totalItems} Ticket${totalItems !== 1 ? "s" : ""})`
                : "Zur Kasse"
            }
          />
        </div>

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