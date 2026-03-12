import { Link } from "react-router";

export function AGBPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0f0f1e", color: "#e0e0e0" }}>
      {/* Header */}
      <nav className="py-4 px-6" style={{ background: "rgba(26,58,46,0.95)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
            style={{ fontSize: 14, fontFamily: "'Fredoka', sans-serif" }}
          >
            &larr; Zurück zur Startseite
          </Link>
          <span
            className="text-white/60"
            style={{ fontSize: 12, fontFamily: "'Nunito', sans-serif" }}
          >
            Schützenverein Bahrdorf 1850 e.V.
          </span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1
          className="text-white mb-8"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(28px, 5vw, 42px)",
            lineHeight: 1.2,
          }}
        >
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>

        <div
          className="space-y-8"
          style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, lineHeight: 1.8 }}
        >
          {/* 1. Geltungsbereich */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              1. Geltungsbereich
            </h2>
            <p className="text-white/70">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Bestellungen von Eintrittskarten über den Online-Ticketshop des Schützenvereins Bahrdorf 1850 e.V. für das Schützenfest Bahrdorf 2026.
            </p>
            <p className="text-white/70 mt-3">
              Mit dem Erwerb eines Tickets erkennt der Käufer diese AGB an.
            </p>
          </section>

          {/* 2. Veranstalter / Vertragspartner */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              2. Veranstalter / Vertragspartner
            </h2>
            <div className="text-white/70 pl-4" style={{ borderLeft: "2px solid rgba(45,139,111,0.5)" }}>
              <p>Schützenverein Bahrdorf 1850 e.V.</p>
              <p className="mt-2">1. Vorsitzender Frederic Broistedt</p>
              <p>Helmstedter Straße 4</p>
              <p>38459 Bahrdorf</p>
              <p className="mt-2">Schützenheim (keine Postadresse)</p>
              <p>Schulstraße 2</p>
              <p>38459 Bahrdorf</p>
            </div>
          </section>

          {/* 3. Vertragsschluss */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              3. Vertragsschluss
            </h2>
            <p className="text-white/70">
              Die Darstellung der Tickets im Online-Shop stellt kein rechtlich bindendes Angebot dar, sondern eine Aufforderung zur Abgabe einer Bestellung.
            </p>
            <p className="text-white/70 mt-3">
              Mit Abschluss des Bestellvorgangs gibt der Käufer ein verbindliches Angebot zum Kauf der ausgewählten Tickets ab.
            </p>
            <p className="text-white/70 mt-3">
              Der Vertrag kommt erst mit ausdrücklicher Annahme durch den Veranstalter zustande. Die Annahme erfolgt durch Versand der Bestellbestätigung oder durch Bereitstellung der Tickets per E-Mail.
            </p>
          </section>

          {/* 4. Preise und Mehrwertsteuer */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              4. Preise und Mehrwertsteuer
            </h2>
            <p className="text-white/70">
              Alle im Ticketshop angegebenen Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer von derzeit 19 %.
            </p>
            <p className="text-white/70 mt-3">
              Zusätzliche Gebühren von Zahlungsdienstleistern werden, sofern vorhanden, im Bestellprozess gesondert ausgewiesen.
            </p>
          </section>

          {/* 5. Zahlungsarten */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              5. Zahlungsarten
            </h2>
            <p className="text-white/70">
              Die Bezahlung der Tickets erfolgt über folgende Zahlungsmethoden:
            </p>
            <ul className="text-white/70 mt-3 space-y-1 pl-5 list-disc">
              <li>PayPal (inkl. Zahlung per Kredit- oder Debitkarte über PayPal)</li>
              <li>Überweisung</li>
            </ul>
            <p className="text-white/70 mt-3">
              Der Versand bzw. die Bereitstellung der Tickets erfolgt nach erfolgreicher Zahlung.
            </p>
          </section>

          {/* 6. Zahlung per Überweisung */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              6. Zahlung per Überweisung
            </h2>
            <p className="text-white/70">
              Bei Auswahl der Zahlungsart Überweisung verpflichtet sich der Käufer, den Rechnungsbetrag innerhalb von 7 Tagen nach Bestellung auf das angegebene Konto des Schützenvereins zu überweisen.
            </p>
            <p className="text-white/70 mt-3">
              Maßgeblich ist der tatsächliche Zahlungseingang auf dem Konto des Veranstalters.
            </p>
            <p className="text-white/70 mt-3">
              Geht innerhalb dieser Frist kein Zahlungseingang ein, behält sich der Veranstalter vor, die Bestellung automatisch zu stornieren und die reservierten Tickets wieder freizugeben.
            </p>
            <p className="text-white/70 mt-3">
              Die Tickets werden erst nach erfolgreichem Zahlungseingang und anschließender Zahlungsprüfung freigeschaltet und versendet.
            </p>
          </section>

          {/* 7. Vorverkaufsfrist */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              7. Vorverkaufsfrist
            </h2>
            <p className="text-white/70">
              Der Online-Vorverkauf endet am 03.09.2026.
            </p>
            <p className="text-white/70 mt-3">
              Bei Bestellungen mit der Zahlungsart Überweisung muss der vollständige Zahlungseingang spätestens bis zum 10.09.2026 auf dem Konto des Veranstalters eingegangen sein.
            </p>
            <p className="text-white/70 mt-3">
              Nach diesem Zeitpunkt kann eine Bearbeitung oder Freigabe der Tickets nicht mehr garantiert werden.
            </p>
          </section>

          {/* 8. Ticketbereitstellung */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              8. Ticketbereitstellung
            </h2>
            <p className="text-white/70">
              Die Tickets werden digital (z. B. als PDF oder QR-Code) per E-Mail bereitgestellt.
            </p>
            <p className="text-white/70 mt-3">
              Bei Zahlung über PayPal erfolgt der Versand automatisch nach erfolgreicher Zahlung.
            </p>
            <p className="text-white/70 mt-3">
              Bei Zahlung per Überweisung erfolgt der Versand erst nach Zahlungseingang und manueller Zahlungsprüfung.
            </p>
          </section>

          {/* 9. Gültigkeit der Tickets */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              9. Gültigkeit der Tickets
            </h2>
            <p className="text-white/70">
              Die Tickets gelten ausschließlich für die auf dem Ticket angegebene Veranstaltung.
            </p>
            <ul className="text-white/70 mt-3 space-y-1 pl-5 list-disc">
              <li>Samstagsticket: gültig am 12.09.2026</li>
              <li>Katerfrühstück-Ticket: gültig am 13.09.2026</li>
            </ul>
            <p className="text-white/70 mt-3">
              Veranstaltungsort, Datum und Uhrzeit sind auf dem jeweiligen Ticket angegeben.
            </p>
          </section>

          {/* 10. Einlass und Ticketentwertung */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              10. Einlass und Ticketentwertung
            </h2>
            <p className="text-white/70">
              Beim Betreten des Veranstaltungsgeländes wird das Ticket digital gescannt und entwertet.
            </p>
            <p className="text-white/70 mt-3">
              Nach erfolgreichem Einlass erhält der Besucher ein Einlassbändchen, welches zum Aufenthalt auf dem Veranstaltungsgelände berechtigt.
            </p>
            <p className="text-white/70 mt-3">
              Ein bereits entwertetes Ticket verliert seine Gültigkeit und kann nicht erneut verwendet werden.
            </p>
          </section>

          {/* 11. Verlust von Tickets */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              11. Verlust von Tickets
            </h2>
            <p className="text-white/70">
              Tickets sind wie Bargeld zu behandeln.
            </p>
            <p className="text-white/70 mt-3">
              Bei Verlust, Diebstahl oder Beschädigung eines Tickets besteht kein Anspruch auf Ersatz oder Erstattung.
            </p>
          </section>

          {/* 12. Weiterverkauf von Tickets */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              12. Weiterverkauf von Tickets
            </h2>
            <p className="text-white/70">
              Der gewerbliche Weiterverkauf der Tickets ist untersagt.
            </p>
            <p className="text-white/70 mt-3">
              Der Veranstalter behält sich vor, Tickets bei missbräuchlicher Nutzung zu sperren.
            </p>
          </section>

          {/* 13. Einlass und Verhalten auf dem Veranstaltungsgelände */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              13. Einlass und Verhalten auf dem Veranstaltungsgelände
            </h2>
            <p className="text-white/70">
              Der Veranstalter übt auf dem gesamten Veranstaltungsgelände das Hausrecht aus.
            </p>
            <p className="text-white/70 mt-3">
              Personen kann der Zutritt verweigert oder sie können des Geländes verwiesen werden, insbesondere bei:
            </p>
            <ul className="text-white/70 mt-2 space-y-1 pl-5 list-disc">
              <li>Verstößen gegen gesetzliche Vorschriften</li>
              <li>Gefährdung anderer Besucher</li>
              <li>Nichtbefolgen von Anweisungen des Veranstalters oder des Sicherheitspersonals</li>
            </ul>
            <p className="text-white/70 mt-3">
              In diesen Fällen erfolgt keine Erstattung des Ticketpreises.
            </p>
          </section>

          {/* 14. Absage oder Änderung der Veranstaltung */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              14. Absage oder Änderung der Veranstaltung
            </h2>
            <p className="text-white/70">
              Wird die Veranstaltung abgesagt, wird der Ticketpreis vollständig erstattet.
            </p>
            <p className="text-white/70 mt-3">
              Bei Terminverschiebungen behalten die Tickets grundsätzlich ihre Gültigkeit für den Ersatztermin.
            </p>
          </section>

          {/* 15. Stornierung und Ausschluss des Widerrufsrechts */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              15. Stornierung und Ausschluss des Widerrufsrechts
            </h2>
            <p className="text-white/70">
              Eine Stornierung oder Rückgabe von Tickets nach dem Kauf ist grundsätzlich ausgeschlossen, sofern die Veranstaltung planmäßig stattfindet.
            </p>
            <p className="text-white/70 mt-3">
              Ein Widerrufsrecht besteht nicht, da es sich um einen Vertrag zur Erbringung von Dienstleistungen im Zusammenhang mit Freizeitbetätigungen handelt, der einen spezifischen Termin vorsieht.
            </p>
            <p className="text-white/70 mt-3">
              Rechtsgrundlage: § 312g Abs. 2 Nr. 9 Bürgerliches Gesetzbuch (BGB)
            </p>
            <p className="text-white/70 mt-3">
              Aus diesem Grund besteht beim Kauf von Tickets für das Schützenfest Bahrdorf 2026 kein Widerrufsrecht.
            </p>
          </section>

          {/* 16. Haftung */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              16. Haftung
            </h2>
            <p className="text-white/70">
              Der Veranstalter haftet nur für Schäden:
            </p>
            <ul className="text-white/70 mt-2 space-y-1 pl-5 list-disc">
              <li>aus der Verletzung des Lebens, des Körpers oder der Gesundheit</li>
              <li>aus vorsätzlicher oder grob fahrlässiger Pflichtverletzung</li>
            </ul>
            <p className="text-white/70 mt-3">
              Für sonstige Schäden haftet der Veranstalter nur bei vorsätzlicher oder grob fahrlässiger Pflichtverletzung sowie bei fahrlässiger Verletzung wesentlicher Vertragspflichten. In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
            </p>
          </section>

          <p className="text-white/40 mt-10" style={{ fontSize: 12 }}>
            Stand: 11. März 2026
          </p>
        </div>
      </main>

      {/* Mini-Footer */}
      <footer className="py-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <p className="text-white/40" style={{ fontSize: 12 }}>
          &copy; 2026 Schützenverein Bahrdorf 1850 e.V.
        </p>
      </footer>
    </div>
  );
}