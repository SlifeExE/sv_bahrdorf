import { Link } from "react-router";

export function DatenschutzPage() {
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
            &larr; Zurueck zur Startseite
          </Link>
          <span
            className="text-white/60"
            style={{ fontSize: 12, fontFamily: "'Nunito', sans-serif" }}
          >
            Schuetzenverein Bahrdorf 1850 e.V.
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
          Datenschutzerklaerung
        </h1>

        <div
          className="space-y-8"
          style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, lineHeight: 1.8 }}
        >
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              1. Verantwortlicher
            </h2>
            <p className="text-white/70">
              Verantwortlich fuer die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="text-white/70 mt-2 pl-4" style={{ borderLeft: "2px solid rgba(45,139,111,0.5)" }}>
              <p>Schuetzenverein Bahrdorf 1850 e.V.</p>
              <p>1. Vorsitzender Frederic Broistedt</p>
              <p>Helmstedter Strasse 4</p>
              <p>38459 Bahrdorf</p>
            </div>
          </section>

          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              2. Erhebung und Speicherung personenbezogener Daten
            </h2>
            <p className="text-white/70">
              Beim Besuch unserer Website werden automatisch Informationen durch den Browser uebermittelt und
              in Server-Logfiles gespeichert. Dies umfasst Browsertyp und -version, verwendetes Betriebssystem,
              Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und die IP-Adresse.
              Eine Zusammenfuehrung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
            </p>
          </section>

          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              3. Ticketkauf ueber Pretix
            </h2>
            <p className="text-white/70">
              Fuer den Ticketverkauf nutzen wir den Dienst Pretix. Beim Kauf eines Tickets werden Sie auf das
              Pretix-System weitergeleitet. Die dort erhobenen Daten (Name, E-Mail-Adresse, Zahlungsdaten) werden
              gemaess der Datenschutzerklaerung von Pretix verarbeitet. Wir erhalten lediglich die fuer die
              Abwicklung der Veranstaltung notwendigen Daten (Name, Ticketart).
            </p>
          </section>

          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              4. Cookies
            </h2>
            <p className="text-white/70">
              Unsere Website verwendet keine eigenen Tracking-Cookies. Technisch notwendige Cookies koennen durch
              eingebundene Drittanbieter-Dienste (z.B. Pretix-Widget) gesetzt werden. Diese dienen ausschliesslich
              der technischen Funktionalitaet.
            </p>
          </section>

          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              5. Eingebundene Dienste
            </h2>
            <p className="text-white/70">
              <strong className="text-white/90">Google Fonts:</strong> Wir nutzen Google Fonts zur Darstellung von Schriftarten.
              Beim Aufruf der Seite werden Schriftarten von Google-Servern geladen, wobei Ihre IP-Adresse an
              Google uebermittelt wird. Weitere Informationen finden Sie in der Datenschutzerklaerung von Google.
            </p>
            <p className="text-white/70 mt-3">
              <strong className="text-white/90">Unsplash:</strong> Fuer Bildmaterial nutzen wir den Dienst Unsplash. Beim Laden der
              Bilder wird Ihre IP-Adresse an Unsplash uebermittelt.
            </p>
          </section>

          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              6. Ihre Rechte
            </h2>
            <p className="text-white/70">
              Sie haben gegenueber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:
            </p>
            <ul className="text-white/70 mt-3 space-y-1 pl-5 list-disc">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Loeschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschraenkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenuebertragbarkeit (Art. 20 DSGVO)</li>
              <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              7. Beschwerderecht
            </h2>
            <p className="text-white/70">
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehoerde ueber die Verarbeitung Ihrer
              personenbezogenen Daten zu beschweren. Die fuer Niedersachsen zustaendige Aufsichtsbehoerde ist
              die Landesbeauftragte fuer den Datenschutz Niedersachsen.
            </p>
          </section>

          <p className="text-white/40 mt-10" style={{ fontSize: 12 }}>
            Stand: Maerz 2026 — Diese Datenschutzerklaerung ist ein Platzhalter und muss vor Veroeffentlichung rechtlich geprueft werden.
          </p>
        </div>
      </main>

      {/* Mini-Footer */}
      <footer className="py-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <p className="text-white/40" style={{ fontSize: 12 }}>
          &copy; 2026 Schuetzenverein Bahrdorf 1850 e.V.
        </p>
      </footer>
    </div>
  );
}
