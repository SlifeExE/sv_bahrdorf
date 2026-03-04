# SV Bahrdorf — Docker helpers
prod-up:
	@docker compose -f website/compose/prod/docker-compose.yml up -d --build
prod-down:
	@docker compose -f website/compose/prod/docker-compose.yml down
status:
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
