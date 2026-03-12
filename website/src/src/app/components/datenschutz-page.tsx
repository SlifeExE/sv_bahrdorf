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
          Datenschutzerklärung
        </h1>

        <div
          className="space-y-8"
          style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, lineHeight: 1.8 }}
        >
          {/* 1. Verantwortlicher */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              1. Verantwortlicher
            </h2>
            <p className="text-white/70">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="text-white/70 mt-2 pl-4" style={{ borderLeft: "2px solid rgba(45,139,111,0.5)" }}>
              <p>Schützenverein Bahrdorf 1850 e.V.</p>
              <p className="mt-2">1. Vorsitzender Frederic Broistedt</p>
              <p>Helmstedter Straße 4</p>
              <p>38459 Bahrdorf</p>
              <p className="mt-2">Schützenheim (keine Postadresse)</p>
              <p>Schulstraße 2</p>
              <p>38459 Bahrdorf</p>
              <p className="mt-2">E-Mail: <a href="mailto:info@svbahrdorf.de" className="text-accent hover:underline">info@svbahrdorf.de</a></p>
            </div>
          </section>

          {/* 2. Hosting und technischer Betrieb */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              2. Hosting und technischer Betrieb
            </h2>
            <p className="text-white/70">
              Die Website wird technisch betrieben und administriert durch:
            </p>
            <div className="text-white/70 mt-2 pl-4" style={{ borderLeft: "2px solid rgba(45,139,111,0.5)" }}>
              <p>Kamil Szuba – IT &amp; Digital Solutions</p>
            </div>
            <p className="text-white/70 mt-3">
              Der technische Betreiber stellt die Infrastruktur für den Betrieb der Website sowie des Ticketshops bereit.
            </p>
            <p className="text-white/70 mt-3">
              Die Verarbeitung erfolgt ausschließlich im Auftrag des Verantwortlichen gemäß Art. 28 DSGVO (Auftragsverarbeitung).
            </p>
            <p className="text-white/70 mt-3">
              Der technische Betreiber verarbeitet personenbezogene Daten ausschließlich nach Weisung des Verantwortlichen und nur soweit dies für den technischen Betrieb der Website erforderlich ist.
            </p>
          </section>

          {/* 3. Zugriffsdaten und Server-Logfiles */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              3. Zugriffsdaten und Server-Logfiles
            </h2>
            <p className="text-white/70">
              Beim Besuch unserer Website werden automatisch Informationen durch den Browser übermittelt und in sogenannten Server-Logfiles gespeichert.
            </p>
            <p className="text-white/70 mt-3">
              Erfasst werden können insbesondere:
            </p>
            <ul className="text-white/70 mt-2 space-y-1 pl-5 list-disc">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer-URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Datum und Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="text-white/70 mt-3">
              Diese Daten dienen ausschließlich der technischen Überwachung, Sicherheit und Stabilität der Website.
            </p>
            <p className="text-white/70 mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          {/* 4. Ticketverkauf über Pretix */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              4. Ticketverkauf über Pretix
            </h2>
            <p className="text-white/70">
              Für den Ticketverkauf nutzen wir das Ticket-System Pretix.
            </p>
            <p className="text-white/70 mt-3">
              Pretix wird durch den technischen Betreiber dieser Website selbst gehostet und betrieben.
            </p>
            <p className="text-white/70 mt-3">
              Beim Kauf eines Tickets werden personenbezogene Daten verarbeitet, insbesondere:
            </p>
            <ul className="text-white/70 mt-2 space-y-1 pl-5 list-disc">
              <li>Name</li>
              <li>E-Mail-Adresse</li>
              <li>Ticketinformationen</li>
              <li>Zahlungsinformationen</li>
            </ul>
            <p className="text-white/70 mt-3">
              Die Verarbeitung erfolgt zur Abwicklung des Ticketkaufs und zur Durchführung der Veranstaltung.
            </p>
            <p className="text-white/70 mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
            </p>
          </section>

          {/* 5. Ticketkontrolle am Veranstaltungseingang */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              5. Ticketkontrolle am Veranstaltungseingang
            </h2>
            <p className="text-white/70">
              Beim Einlass zur Veranstaltung werden Tickets mittels eines QR-Codes durch mobile Endgeräte mit der Pretix-Scanner-App geprüft.
            </p>
            <p className="text-white/70 mt-3">
              Dabei werden ausschließlich Ticketinformationen verarbeitet, insbesondere:
            </p>
            <ul className="text-white/70 mt-2 space-y-1 pl-5 list-disc">
              <li>Ticket-ID bzw. QR-Code</li>
              <li>Ticketstatus (gültig / bereits eingelöst)</li>
              <li>ggf. der im Ticket hinterlegte Name</li>
            </ul>
            <p className="text-white/70 mt-3">
              Die Verarbeitung erfolgt ausschließlich zum Zweck der Überprüfung der Ticketgültigkeit sowie zur Verhinderung einer mehrfachen Nutzung eines Tickets.
            </p>
            <p className="text-white/70 mt-3">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
            </p>
          </section>

          {/* 6. Zahlungsabwicklung */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              6. Zahlungsabwicklung
            </h2>
            <p className="text-white/70">
              Für die Zahlungsabwicklung nutzen wir folgende Zahlungsarten:
            </p>
            <ul className="text-white/70 mt-2 space-y-1 pl-5 list-disc">
              <li>PayPal (inkl. Kredit- und Debitkartenzahlung über PayPal)</li>
              <li>Banküberweisung</li>
            </ul>
            <p className="text-white/70 mt-3">
              Bei Zahlung über PayPal werden Zahlungsdaten an PayPal (Europe) S.à r.l. et Cie, S.C.A. übermittelt.
            </p>
            <p className="text-white/70 mt-3">
              Weitere Informationen:{" "}
              <a href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                https://www.paypal.com/de/webapps/mpp/ua/privacy-full
              </a>
            </p>
          </section>

          {/* 7. Kontaktformulare (Sponsoren / Flohmarktstände) */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              7. Kontaktformulare (Sponsoren / Flohmarktstände)
            </h2>
            <p className="text-white/70">
              Auf unserer Website stehen Kontaktformulare zur Verfügung, über die sich Interessenten als Sponsoren oder für einen Flohmarktstand anmelden können.
            </p>
            <p className="text-white/70 mt-3">
              Wenn Sie uns über ein solches Formular kontaktieren, werden die von Ihnen eingegebenen Daten (z. B. Name, E-Mail-Adresse, Telefonnummer sowie weitere freiwillige Angaben) an die E-Mail-Adresse{" "}
              <a href="mailto:info@svbahrdorf.de" className="text-accent hover:underline">info@svbahrdorf.de</a>{" "}
              übermittelt und dort zur Bearbeitung der Anfrage gespeichert.
            </p>
            <p className="text-white/70 mt-3">
              Die Verarbeitung dieser Daten erfolgt ausschließlich zum Zweck der Bearbeitung Ihrer Anfrage sowie zur Organisation der jeweiligen Veranstaltung.
            </p>
            <p className="text-white/70 mt-3">
              Rechtsgrundlage der Verarbeitung ist:
            </p>
            <ul className="text-white/70 mt-2 space-y-1 pl-5 list-disc">
              <li>Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)</li>
              <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bearbeitung von Anfragen)</li>
            </ul>
            <p className="text-white/70 mt-3">
              Die übermittelten Daten werden nur so lange gespeichert, wie dies zur Bearbeitung der Anfrage erforderlich ist, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>
          </section>

          {/* 8. Cookies */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              8. Cookies
            </h2>
            <p className="text-white/70">
              Unsere Website verwendet keine eigenen Tracking-Cookies.
            </p>
            <p className="text-white/70 mt-3">
              Technisch notwendige Cookies können jedoch durch das Ticket-System Pretix gesetzt werden. Diese Cookies sind erforderlich, um die Funktion des Ticketshops sicherzustellen.
            </p>
            <p className="text-white/70 mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          {/* 9. Eingebundene Dienste */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              9. Eingebundene Dienste
            </h2>

            <h3 className="text-white/90 mt-4 mb-2" style={{ fontSize: 15, fontFamily: "'Fredoka', sans-serif" }}>
              Google Fonts
            </h3>
            <p className="text-white/70">
              Zur Darstellung von Schriftarten nutzt diese Website Google Fonts.
            </p>
            <p className="text-white/70 mt-3">
              Beim Aufruf der Website werden Schriftarten von Servern der Google Ireland Limited geladen. Dabei kann Ihre IP-Adresse an Google übermittelt werden.
            </p>
            <p className="text-white/70 mt-2">
              Weitere Informationen:{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                https://policies.google.com/privacy
              </a>
            </p>

            <h3 className="text-white/90 mt-6 mb-2" style={{ fontSize: 15, fontFamily: "'Fredoka', sans-serif" }}>
              Unsplash
            </h3>
            <p className="text-white/70">
              Für Bildmaterial verwenden wir Inhalte des Dienstes Unsplash.
            </p>
            <p className="text-white/70 mt-3">
              Beim Laden von Bildern können Verbindungen zu Servern von Unsplash hergestellt werden, wodurch Ihre IP-Adresse übertragen werden kann.
            </p>
            <p className="text-white/70 mt-2">
              Weitere Informationen:{" "}
              <a href="https://unsplash.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                https://unsplash.com/privacy
              </a>
            </p>
          </section>

          {/* 10. SSL- bzw. TLS-Verschlüsselung */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              10. SSL- bzw. TLS-Verschlüsselung
            </h2>
            <p className="text-white/70">
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.
            </p>
            <p className="text-white/70 mt-3">
              Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers mit https:// beginnt.
            </p>
          </section>

          {/* 11. Speicherdauer */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              11. Speicherdauer
            </h2>
            <p className="text-white/70">
              Personenbezogene Daten werden nur so lange gespeichert, wie dies zur Erfüllung der jeweiligen Zwecke erforderlich ist.
            </p>
            <p className="text-white/70 mt-3">
              Daten aus Ticketkäufen können aus steuer- und buchhalterischen Gründen bis zu 10 Jahre gespeichert werden.
            </p>
          </section>

          {/* 12. Ihre Rechte */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              12. Ihre Rechte
            </h2>
            <p className="text-white/70">
              Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:
            </p>
            <ul className="text-white/70 mt-3 space-y-1 pl-5 list-disc">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
            </ul>
            <p className="text-white/70 mt-3">
              Zur Ausübung Ihrer Rechte können Sie sich jederzeit an folgende Adresse wenden:{" "}
              <a href="mailto:info@svbahrdorf.de" className="text-accent hover:underline">info@svbahrdorf.de</a>
            </p>
          </section>

          {/* 13. Beschwerderecht */}
          <section>
            <h2 className="text-accent mb-4 tracking-wider uppercase" style={{ fontSize: 16, fontFamily: "'Fredoka', sans-serif" }}>
              13. Beschwerderecht
            </h2>
            <p className="text-white/70">
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
            </p>
            <p className="text-white/70 mt-3">
              Zuständige Aufsichtsbehörde:
            </p>
            <div className="text-white/70 mt-2 pl-4" style={{ borderLeft: "2px solid rgba(45,139,111,0.5)" }}>
              <p>Die Landesbeauftragte für den Datenschutz Niedersachsen</p>
              <p>Prinzenstraße 5</p>
              <p>30159 Hannover</p>
              <p className="mt-2">
                <a href="https://lfd.niedersachsen.de" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  https://lfd.niedersachsen.de
                </a>
              </p>
            </div>
          </section>

          <p className="text-white/40 mt-10" style={{ fontSize: 12 }}>
            Stand: März 2026
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