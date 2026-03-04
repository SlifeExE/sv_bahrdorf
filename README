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
├── deploy.sh                       # Deploy-Script
└── Makefile                        # Docker-Shortcuts
```

## Domains

| Domain | Beschreibung | Port |
|--------|-------------|------|
| `schuetzenfest.dawntale.eu` | Website | 7090 |
| `schuetzenfest-tickets.dawntale.eu` | Ticketshop (Pretix) | 7091 |

> Später: `schuetzenfest.svbahrdorf.de` & `schuetzenfest-tickets.svbahrdorf.de`

## Deployment

### Website
```bash
./deploy.sh
```

### Makefile Shortcuts
```bash
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