#!/usr/bin/env python3
"""
SV Bahrdorf Deployment Script
Deploys website and Pretix ticketing system with beautiful rich output
"""

import os
import sys
import subprocess
import time
import re
from pathlib import Path
from typing import Optional

# Auto-install dependencies if missing
try:
    from rich.console import Console
    from rich.panel import Panel
    from rich.progress import Progress, SpinnerColumn, TextColumn
    from rich.prompt import Confirm
    from rich.table import Table
    from rich import box
except ImportError:
    print("📦 Installing required dependencies...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "rich>=13.0.0"])
    print("✓ Dependencies installed")
    # Import again after installation
    from rich.console import Console
    from rich.panel import Panel
    from rich.progress import Progress, SpinnerColumn, TextColumn
    from rich.prompt import Confirm
    from rich.table import Table
    from rich import box

console = Console()

# Constants
BASE_DIR = Path("/opt/sv_bahrdorf")
PRETIX_ENV_FILE = BASE_DIR / "pretix/secrets/.env"
PRETIX_CFG = BASE_DIR / "pretix/config/pretix.cfg"
PRETIX_DB_DIR = BASE_DIR / "pretix/data/db"
PRETIX_DATA_DIR = BASE_DIR / "pretix/data/pretix"
PRETIX_LOG_DIR = PRETIX_DATA_DIR / "logs"
WEBSITE_SRC = BASE_DIR / "website/src/src"


def run_command(cmd: list[str], cwd: Optional[Path] = None, check: bool = True) -> subprocess.CompletedProcess:
    """Run a shell command and return the result."""
    try:
        result = subprocess.run(
            cmd,
            cwd=cwd,
            capture_output=True,
            text=True,
            check=check
        )
        return result
    except subprocess.CalledProcessError as e:
        console.print(f"[red]✗[/red] Command failed: {' '.join(cmd)}")
        console.print(f"[dim]{e.stderr}[/dim]")
        if check:
            raise
        return e


def load_env_file(env_file: Path) -> dict[str, str]:
    """Load environment variables from .env file."""
    env_vars = {}
    with open(env_file) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                env_vars[key] = value
    return env_vars


def patch_ini_section(cfg_file: Path, section: str, key: str, value: str) -> None:
    """Patch a specific key in an INI file section."""
    with open(cfg_file) as f:
        lines = f.readlines()
    
    in_section = False
    patched_lines = []
    
    for line in lines:
        if line.strip().startswith(f'[{section}]'):
            in_section = True
            patched_lines.append(line)
        elif line.strip().startswith('[') and not line.strip().startswith(f'[{section}]'):
            in_section = False
            patched_lines.append(line)
        elif in_section and line.strip().startswith(f'{key}='):
            patched_lines.append(f'{key}={value}\n')
        else:
            patched_lines.append(line)
    
    with open(cfg_file, 'w') as f:
        f.writelines(patched_lines)


def fix_figma_imports() -> None:
    """Fix figma:asset imports in TypeScript files."""
    with console.status("[cyan]Fixing figma:asset imports...", spinner="dots"):
        # Fix imports in components directory
        components_dir = WEBSITE_SRC / "app/components"
        if components_dir.exists():
            for ts_file in components_dir.rglob("*.ts*"):
                if ts_file.is_file():
                    content = ts_file.read_text()
                    content = re.sub(r'from ["\']figma:asset/', 'from "../../assets/', content)
                    content = re.sub(r'from ["\']../assets/', 'from "../../assets/', content)
                    ts_file.write_text(content)
        
        # Fix imports in other source files
        for ts_file in WEBSITE_SRC.rglob("*.ts*"):
            if ts_file.is_file() and not str(ts_file).startswith(str(components_dir)):
                content = ts_file.read_text()
                content = re.sub(r'from ["\']figma:asset/', 'from "../assets/', content)
                ts_file.write_text(content)
    
    console.print("[green]✓[/green] Figma imports fixed")


def deploy() -> None:
    """Main deployment function."""
    # Header
    console.print()
    console.print(
        Panel.fit(
            "[bold cyan]SV Bahrdorf Deployment Script[/bold cyan]\n"
            "[dim]Website & Pretix Ticketing System[/dim]",
            border_style="cyan",
            box=box.DOUBLE
        )
    )
    console.print()
    
    # Step 1: Confirmation
    if not Confirm.ask(
        "[yellow]⚠[/yellow]  This will overwrite local changes. Continue?",
        default=False
    ):
        console.print("[dim]Deployment cancelled.[/dim]")
        sys.exit(0)
    
    console.print()
    
    # Step 2: Git pull
    with console.status("[cyan]Pulling latest changes from git...", spinner="dots"):
        run_command(["git", "-C", str(BASE_DIR), "fetch", "origin"])
        run_command(["git", "-C", str(BASE_DIR), "reset", "--hard", "origin/main"])
    console.print("[green]✓[/green] Code updated from git")
    
    # Step 3: Load secrets
    with console.status("[cyan]Loading Pretix secrets...", spinner="dots"):
        if not PRETIX_ENV_FILE.exists():
            console.print(f"[red]✗[/red] Secrets file not found: {PRETIX_ENV_FILE}")
            sys.exit(1)
        
        env_vars = load_env_file(PRETIX_ENV_FILE)
        
        required_vars = ["PRETIX_DB_PASSWORD", "PRETIX_SECRET_KEY"]
        for var in required_vars:
            if var not in env_vars:
                console.print(f"[red]✗[/red] {var} not found in {PRETIX_ENV_FILE}")
                sys.exit(1)
        
        db_password = env_vars["PRETIX_DB_PASSWORD"]
        secret_key = env_vars["PRETIX_SECRET_KEY"]
        smtp_host = env_vars.get("PRETIX_SMTP_HOST", "")
        smtp_user = env_vars.get("PRETIX_SMTP_USER", "")
        smtp_password = env_vars.get("PRETIX_SMTP_PASSWORD", "")
    
    console.print("[green]✓[/green] Secrets loaded")
    
    # Step 4: Fix imports
    fix_figma_imports()
    
    # Step 5: Patch config
    with console.status("[cyan]Patching pretix.cfg with secrets...", spinner="dots"):
        patch_ini_section(PRETIX_CFG, "database", "password", db_password)
        
        if smtp_host:
            patch_ini_section(PRETIX_CFG, "mail", "host", smtp_host)
        if smtp_user:
            patch_ini_section(PRETIX_CFG, "mail", "user", smtp_user)
        if smtp_password:
            patch_ini_section(PRETIX_CFG, "mail", "password", smtp_password)
    
    console.print("[green]✓[/green] Configuration patched")
    
    # Step 6: Prepare directories
    with console.status("[cyan]Preparing data directories...", spinner="dots"):
        # Create directories
        PRETIX_DB_DIR.mkdir(parents=True, exist_ok=True)
        PRETIX_LOG_DIR.mkdir(parents=True, exist_ok=True)
        
        # PostgreSQL permissions (user 999 in container)
        run_command(["sudo", "chown", "-R", "999:999", str(PRETIX_DB_DIR)])
        run_command(["sudo", "chmod", "700", str(PRETIX_DB_DIR)])
        run_command(["sudo", "find", str(PRETIX_DB_DIR), "-type", "d", "-exec", "chmod", "700", "{}", "+"])
        run_command(["sudo", "find", str(PRETIX_DB_DIR), "-type", "f", "-exec", "chmod", "600", "{}", "+"])
        
        # Pretix data permissions
        run_command(["sudo", "chown", "-R", "admin:admin", str(PRETIX_DATA_DIR)])
        PRETIX_DATA_DIR.chmod(0o755)
        PRETIX_LOG_DIR.chmod(0o777)
        
        # Write secret file
        secret_file = PRETIX_DATA_DIR / ".secret"
        secret_file.write_text(secret_key + "\n")
        secret_file.chmod(0o644)
        
        # Create log files
        pretix_log = PRETIX_LOG_DIR / "pretix.log"
        csp_log = PRETIX_LOG_DIR / "csp.log"
        pretix_log.touch()
        csp_log.touch()
        pretix_log.chmod(0o666)
        csp_log.chmod(0o666)
    
    console.print("[green]✓[/green] Data directories prepared")
    
    # Step 7: Deploy Pretix
    console.print()
    console.print("[bold cyan]→[/bold cyan] Deploying Pretix...")
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:
        task = progress.add_task("Building and starting containers...", total=None)
        
        run_command(
            ["docker", "compose", "--env-file", str(PRETIX_ENV_FILE), "up", "-d", "--build"],
            cwd=BASE_DIR / "pretix"
        )
        
        progress.update(task, description="Restarting services...")
        run_command(["docker", "restart", "sv_bahrdorf_pretix_db"])
        run_command(["docker", "restart", "sv_bahrdorf_pretix_redis"])
        run_command(["docker", "restart", "sv_bahrdorf_pretix"])
    
    console.print("[green]✓[/green] Pretix deployed")
    
    # Step 8: Deploy Website
    console.print()
    console.print("[bold cyan]→[/bold cyan] Deploying Website...")
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:
        task = progress.add_task("Building and starting containers...", total=None)
        
        run_command(
            ["docker", "compose", "-f", "compose/prod/docker-compose.yml", "up", "-d", "--build"],
            cwd=BASE_DIR / "website"
        )
    
    console.print("[green]✓[/green] Website deployed")
    
    # Step 9: Wait for containers
    with console.status("[cyan]Waiting for containers to stabilize...", spinner="dots"):
        time.sleep(10)
    
    # Step 10: Health checks
    console.print()
    console.print("[bold cyan]→[/bold cyan] Running health checks...")
    
    health_table = Table(show_header=True, header_style="bold cyan", box=box.SIMPLE)
    health_table.add_column("Service")
    health_table.add_column("Status")
    health_table.add_column("URL")
    
    # Website health check
    website_result = run_command(
        ["curl", "-sf", "http://127.0.0.1:7090/health"],
        check=False
    )
    website_status = "[green]✓ Online[/green]" if website_result.returncode == 0 else "[red]✗ Failed[/red]"
    health_table.add_row("Website", website_status, "http://127.0.0.1:7090/health")
    
    # Pretix health check
    pretix_result = run_command(
        ["curl", "-sf", "-H", "Host: tickets.svbahrdorf.de", "http://127.0.0.1:7091/svbahrdorf/", "-o", "/dev/null"],
        check=False
    )
    pretix_status = "[green]✓ Online[/green]" if pretix_result.returncode == 0 else "[red]✗ Failed[/red]"
    health_table.add_row("Pretix", pretix_status, "http://127.0.0.1:7091/svbahrdorf/")
    
    console.print(health_table)
    
    # Step 11: Show logs
    console.print()
    console.print(Panel("[bold]Recent Pretix Logs[/bold]", border_style="cyan"))
    pretix_logs = run_command(["docker", "logs", "--tail", "40", "sv_bahrdorf_pretix"], check=False)
    if pretix_logs.returncode == 0 and pretix_logs.stdout:
        console.print(f"[dim]{pretix_logs.stdout}[/dim]")
    
    console.print()
    console.print(Panel("[bold]Recent PostgreSQL Logs[/bold]", border_style="cyan"))
    db_logs = run_command(["docker", "logs", "--tail", "20", "sv_bahrdorf_pretix_db"], check=False)
    if db_logs.returncode == 0 and db_logs.stdout:
        console.print(f"[dim]{db_logs.stdout}[/dim]")
    
    # Final summary
    console.print()
    console.print(
        Panel.fit(
            "[bold green]✓ Deployment Complete![/bold green]",
            border_style="green",
            box=box.DOUBLE
        )
    )
    console.print()


if __name__ == "__main__":
    try:
        os.chdir(BASE_DIR)
        deploy()
    except KeyboardInterrupt:
        console.print("\n[yellow]⚠[/yellow]  Deployment interrupted by user")
        sys.exit(1)
    except Exception as e:
        console.print(f"\n[red]✗ Error:[/red] {e}")
        console.print_exception()
        sys.exit(1)
