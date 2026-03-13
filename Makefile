# SV Bahrdorf — Docker helpers

deploy:
	@python3 -c "import rich" 2>/dev/null || pip install -q -r requirements.txt
	@python3 deploy.py

prod-up:
	@docker compose -f website/compose/prod/docker-compose.yml up -d --build
prod-down:
	@docker compose -f website/compose/prod/docker-compose.yml down
status:
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
