#!/bin/bash
################################################################################
# AILYDIAN PRISMA MIGRATION DEPLOYMENT SCRIPT
################################################################################
# Description: Safe, automated Prisma migration deployment with rollback support
# Author: Database Agent - LyDian Agent Ecosystem
# Version: 1.0.0
################################################################################

set -euo pipefail
IFS=$'\n\t'

################################################################################
# COLORS
################################################################################
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m'
readonly BOLD='\033[1m'

################################################################################
# CONFIGURATION
################################################################################
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
readonly LOG_DIR="${PROJECT_ROOT}/logs"
readonly BACKUP_DIR="${PROJECT_ROOT}/backups/database"
readonly MIGRATION_DIR="${PROJECT_ROOT}/prisma/migrations"

################################################################################
# LOGGING
################################################################################
log_info() {
    echo -e "${BLUE}ℹ ${NC}$*"
}

log_success() {
    echo -e "${GREEN}✓${NC} $*"
}

log_warn() {
    echo -e "${YELLOW}⚠ ${NC}$*"
}

log_error() {
    echo -e "${RED}✗${NC} $*"
}

banner() {
    echo -e "\n${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}${BOLD}  $*${NC}"
    echo -e "${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

################################################################################
# PRE-FLIGHT CHECKS
################################################################################
pre_flight_checks() {
    banner "PRE-FLIGHT CHECKS"

    # Check DATABASE_URL
    if [ -z "${DATABASE_URL:-}" ]; then
        log_error "DATABASE_URL environment variable not set"
        log_info "Please set DATABASE_URL in your environment or .env file"
        exit 1
    fi
    log_success "DATABASE_URL is set"

    # Check Prisma CLI
    if ! command -v npx &> /dev/null; then
        log_error "npx not found (required for Prisma)"
        exit 1
    fi
    log_success "Prisma CLI available"

    # Check migrations directory
    if [ ! -d "$MIGRATION_DIR" ]; then
        log_error "Migrations directory not found: ${MIGRATION_DIR}"
        exit 1
    fi

    local migration_count
    migration_count=$(find "$MIGRATION_DIR" -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')

    if [ "$migration_count" -eq 0 ]; then
        log_warn "No migrations found in ${MIGRATION_DIR}"
        exit 0
    fi

    log_success "Found ${migration_count} migrations"

    # Test database connection
    log_info "Testing database connection..."
    if npx prisma db execute --stdin <<< "SELECT 1;" &> /dev/null; then
        log_success "Database connection verified"
    else
        log_error "Cannot connect to database"
        exit 1
    fi
}

################################################################################
# CREATE DATABASE BACKUP
################################################################################
create_backup() {
    banner "CREATING DATABASE BACKUP"

    mkdir -p "$BACKUP_DIR"

    local backup_file
    backup_file="${BACKUP_DIR}/backup-$(date +%Y%m%d-%H%M%S).sql"

    log_info "Creating backup: ${backup_file}"

    # Extract connection details
    local db_host db_port db_name db_user db_password

    # Parse DATABASE_URL
    # Format: postgresql://user:password@host:port/database
    if [[ $DATABASE_URL =~ postgresql://([^:]+):([^@]+)@([^:]+):([^/]+)/([^\?]+) ]]; then
        db_user="${BASH_REMATCH[1]}"
        db_password="${BASH_REMATCH[2]}"
        db_host="${BASH_REMATCH[3]}"
        db_port="${BASH_REMATCH[4]}"
        db_name="${BASH_REMATCH[5]}"
    else
        log_error "Failed to parse DATABASE_URL"
        exit 1
    fi

    # Create backup using pg_dump
    if command -v pg_dump &> /dev/null; then
        PGPASSWORD="$db_password" pg_dump \
            -h "$db_host" \
            -p "$db_port" \
            -U "$db_user" \
            -d "$db_name" \
            --schema-only \
            --no-owner \
            --no-acl \
            > "$backup_file" 2>/dev/null || {
                log_warn "pg_dump not available or failed - skipping backup"
                return 0
            }

        log_success "Backup created: ${backup_file}"
        echo "$backup_file" > "${BACKUP_DIR}/latest-backup.txt"
    else
        log_warn "pg_dump not found - skipping backup"
        log_info "Install PostgreSQL client tools for backup support"
    fi
}

################################################################################
# SHOW MIGRATION STATUS
################################################################################
show_migration_status() {
    banner "MIGRATION STATUS"

    log_info "Checking migration status..."

    npx prisma migrate status || true

    echo ""
    read -p "Continue with migration deployment? (y/N): " -n 1 -r
    echo

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Migration deployment cancelled"
        exit 0
    fi
}

################################################################################
# DEPLOY MIGRATIONS
################################################################################
deploy_migrations() {
    banner "DEPLOYING MIGRATIONS"

    log_info "Starting migration deployment..."

    # Deploy migrations
    if npx prisma migrate deploy; then
        log_success "All migrations deployed successfully"
        return 0
    else
        log_error "Migration deployment failed"
        return 1
    fi
}

################################################################################
# VERIFY DEPLOYMENT
################################################################################
verify_deployment() {
    banner "VERIFYING DEPLOYMENT"

    log_info "Verifying database schema..."

    # Check if we can query the database
    if npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" &> /dev/null; then
        log_success "Database schema is accessible"
    else
        log_error "Database schema verification failed"
        return 1
    fi

    # Generate Prisma client to verify schema
    log_info "Regenerating Prisma client..."
    if npx prisma generate; then
        log_success "Prisma client generated successfully"
    else
        log_error "Prisma client generation failed"
        return 1
    fi

    log_success "Deployment verification complete"
}

################################################################################
# ROLLBACK (if needed)
################################################################################
rollback() {
    banner "ROLLBACK PROCEDURE"

    log_error "Migration deployment failed - rollback may be required"

    local latest_backup
    if [ -f "${BACKUP_DIR}/latest-backup.txt" ]; then
        latest_backup=$(cat "${BACKUP_DIR}/latest-backup.txt")

        if [ -f "$latest_backup" ]; then
            echo ""
            read -p "Restore from backup: ${latest_backup}? (y/N): " -n 1 -r
            echo

            if [[ $REPLY =~ ^[Yy]$ ]]; then
                log_info "Restoring from backup..."

                # Parse DATABASE_URL for psql
                local db_host db_port db_name db_user db_password

                if [[ $DATABASE_URL =~ postgresql://([^:]+):([^@]+)@([^:]+):([^/]+)/([^\?]+) ]]; then
                    db_user="${BASH_REMATCH[1]}"
                    db_password="${BASH_REMATCH[2]}"
                    db_host="${BASH_REMATCH[3]}"
                    db_port="${BASH_REMATCH[4]}"
                    db_name="${BASH_REMATCH[5]}"
                fi

                # Restore using psql
                if PGPASSWORD="$db_password" psql \
                    -h "$db_host" \
                    -p "$db_port" \
                    -U "$db_user" \
                    -d "$db_name" \
                    < "$latest_backup"; then
                    log_success "Database restored from backup"
                else
                    log_error "Restore failed"
                fi
            fi
        fi
    else
        log_warn "No backup available for rollback"
        log_info "Manual intervention may be required"
    fi
}

################################################################################
# CLEANUP OLD BACKUPS
################################################################################
cleanup_old_backups() {
    local keep_backups=10

    if [ -d "$BACKUP_DIR" ]; then
        local backup_count
        backup_count=$(find "$BACKUP_DIR" -name "backup-*.sql" | wc -l | tr -d ' ')

        if [ "$backup_count" -gt "$keep_backups" ]; then
            log_info "Cleaning up old backups (keeping ${keep_backups})..."

            find "$BACKUP_DIR" -name "backup-*.sql" -type f | \
                sort -r | \
                tail -n +$((keep_backups + 1)) | \
                xargs rm -f

            log_success "Old backups cleaned up"
        fi
    fi
}

################################################################################
# MAIN EXECUTION
################################################################################
main() {
    clear
    echo -e "${CYAN}${BOLD}"
    cat << "EOF"
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                   🔄 PRISMA MIGRATION DEPLOYMENT                          ║
║                                                                           ║
║                    Safe, Automated, Production-Ready                     ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}\n"

    # Load environment variables
    if [ -f "${PROJECT_ROOT}/.env" ]; then
        set -a
        source "${PROJECT_ROOT}/.env"
        set +a
    fi

    if [ -f "${PROJECT_ROOT}/.env.supabase" ]; then
        set -a
        source "${PROJECT_ROOT}/.env.supabase"
        set +a
    fi

    # Execute deployment steps
    pre_flight_checks
    create_backup
    show_migration_status

    if deploy_migrations && verify_deployment; then
        log_success "Migration deployment completed successfully"
        cleanup_old_backups
        exit 0
    else
        rollback
        exit 1
    fi
}

################################################################################
# ERROR HANDLING
################################################################################
trap 'log_error "Script failed at line $LINENO"' ERR

################################################################################
# ENTRY POINT
################################################################################
main "$@"
