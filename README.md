# SV Bahrdorf – Webinfrastruktur

Dieses Repository enthält die komplette Webinfrastruktur für das Schützenfest Bahrdorf.

## Struktur
```
sv_bahrdorf/
├── website/                        # Schützenfest-Website (Figma Make / React + Vite)
│   ├── compose/prod/               # Docker Compose für Produktion
│   ├── services/website/           # Dockerfile & Nginx-Config
│   └── src/                        # Quellcode (Figma Make Export)
├── pretix/                         # Ticketshop (Pretix Self-Hosted)
│   ├── docker-compose.yml
│   ├── config/pretix.cfg
│   └── data/                       # Persistente Daten (nicht im Repo)
├── deploy.py                       # Deploy-Script (Python mit Rich)
├── requirements.txt                # Python-Dependencies
└── Makefile                        # Docker-Shortcuts
```

## Domains

| Domain | Beschreibung | Port |
|--------|-------------|------|
| `schuetzenfest.dawntale.eu` | Website | 7090 |
| `schuetzenfest-tickets.dawntale.eu` | Ticketshop (Pretix) | 7091 |

> Später: `schuetzenfest.svbahrdorf.de` & `schuetzenfest-tickets.svbahrdorf.de`

## Deployment

### Installation
Installiere zunächst die Python-Dependencies:
```bash
pip install -r requirements.txt
```

### Deployment ausführen
```bash
# Mit Python direkt
python3 deploy.py

# Oder mit Make
make deploy
```

Das Deploy-Script führt automatisch folgende Schritte aus:
- Git Pull (latest changes)
- Secrets aus `.env` laden
- Figma-Imports patchen
- Pretix-Konfiguration aktualisieren
- Verzeichnisse und Berechtigungen setzen
- Docker Container bauen und starten
- Health-Checks durchführen

### Makefile Shortcuts
```bash
make deploy       # Full Deployment
make prod-up      # Build & Start
make prod-down    # Stop
make status       # Container-Status
```

## Server

- **Host:** Hetzner Dedicated Server
- **OS:** Ubuntu 22.04
- **Reverse Proxy:** Nginx
- **SSL:** Let's Encrypt (Certbot, auto-renewal)

## Voraussetzungen

- Docker & Docker Compose
- Nginx (Host)
- Certbot