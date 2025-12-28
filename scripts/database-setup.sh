#!/bin/bash
################################################################################
# AILYDIAN DATABASE AGENT - AUTOMATED SUPABASE DEPLOYMENT
################################################################################
# Description: Production-grade database provisioning and migration script
# Author: Database Agent - LyDian Agent Ecosystem
# Version: 1.0.0
# Dependencies: supabase-cli, node, npm, jq
################################################################################

set -euo pipefail  # Exit on error, undefined vars, pipe failures
IFS=$'\n\t'        # Safe Internal Field Separator

################################################################################
# ANSI COLOR CODES
################################################################################
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly MAGENTA='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m' # No Color
readonly BOLD='\033[1m'

################################################################################
# CONFIGURATION
################################################################################
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
readonly LOG_DIR="${PROJECT_ROOT}/logs"
readonly LOG_FILE="${LOG_DIR}/database-setup-$(date +%Y%m%d-%H%M%S).log"
readonly CONFIG_FILE="${PROJECT_ROOT}/.env.supabase"
readonly MIGRATION_DIR="${PROJECT_ROOT}/prisma/migrations"

# Supabase Configuration
readonly SUPABASE_ORG="${SUPABASE_ORG:-ailydian}"
readonly SUPABASE_REGION="${SUPABASE_REGION:-eu-central-1}"
readonly SUPABASE_PLAN="${SUPABASE_PLAN:-free}"
readonly DB_PASSWORD_LENGTH=32

# Timeouts
readonly CONNECTION_TIMEOUT=30
readonly MIGRATION_TIMEOUT=300

################################################################################
# LOGGING FUNCTIONS
################################################################################
log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp
    timestamp="$(date '+%Y-%m-%d %H:%M:%S')"

    echo -e "${timestamp} [${level}] ${message}" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}ℹ ${NC}$*" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}✓${NC} $*" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}⚠ ${NC}$*" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}✗${NC} $*" | tee -a "$LOG_FILE"
}

banner() {
    echo -e "\n${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}${BOLD}  $*${NC}"
    echo -e "${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

################################################################################
# DEPENDENCY CHECKS
################################################################################
check_dependencies() {
    banner "CHECKING DEPENDENCIES"

    local missing_deps=()

    # Check Supabase CLI
    if ! command -v supabase &> /dev/null; then
        missing_deps+=("supabase-cli")
        error "Supabase CLI not found"
    else
        local version
        version=$(supabase --version | head -1 | awk '{print $NF}')
        success "Supabase CLI: ${version}"
    fi

    # Check Node.js
    if ! command -v node &> /dev/null; then
        missing_deps+=("node")
        error "Node.js not found"
    else
        local version
        version=$(node --version)
        success "Node.js: ${version}"
    fi

    # Check npm
    if ! command -v npm &> /dev/null; then
        missing_deps+=("npm")
        error "npm not found"
    else
        local version
        version=$(npm --version)
        success "npm: v${version}"
    fi

    # Check jq (for JSON parsing)
    if ! command -v jq &> /dev/null; then
        warn "jq not found (recommended for JSON parsing)"
        info "Install with: brew install jq"
    else
        success "jq: $(jq --version)"
    fi

    # Check Prisma
    if ! command -v npx &> /dev/null; then
        error "npx not found (required for Prisma)"
        missing_deps+=("npx")
    else
        success "npx available"
    fi

    if [ ${#missing_deps[@]} -ne 0 ]; then
        error "Missing dependencies: ${missing_deps[*]}"
        error "Please install missing dependencies and try again"
        exit 1
    fi

    success "All dependencies satisfied"
}

################################################################################
# AUTHENTICATION CHECK
################################################################################
check_supabase_auth() {
    banner "VERIFYING SUPABASE AUTHENTICATION"

    if supabase auth status &> /dev/null; then
        success "Already authenticated to Supabase"
        return 0
    fi

    warn "Not authenticated to Supabase"
    info "Please log in to Supabase CLI"

    if ! supabase login; then
        error "Supabase authentication failed"
        error "Please run: supabase login"
        exit 1
    fi

    success "Supabase authentication successful"
}

################################################################################
# PROJECT CREATION
################################################################################
create_supabase_project() {
    banner "CREATING SUPABASE PROJECT"

    local project_name="${1:-travel-ailydian-production}"
    local db_password

    info "Project Name: ${project_name}"
    info "Region: ${SUPABASE_REGION}"
    info "Plan: ${SUPABASE_PLAN}"

    # Generate secure database password
    db_password=$(openssl rand -base64 "$DB_PASSWORD_LENGTH" | tr -d "=+/" | cut -c1-"$DB_PASSWORD_LENGTH")

    # Create project
    info "Creating Supabase project (this may take 2-3 minutes)..."

    local project_ref
    if project_ref=$(supabase projects create "$project_name" \
        --org-id "$SUPABASE_ORG" \
        --db-password "$db_password" \
        --region "$SUPABASE_REGION" \
        --plan "$SUPABASE_PLAN" 2>&1); then

        success "Supabase project created successfully"

        # Extract project reference (e.g., xyzabc123)
        project_ref=$(echo "$project_ref" | grep -oE '[a-z0-9]{20}' | head -1)

        if [ -z "$project_ref" ]; then
            error "Failed to extract project reference"
            exit 1
        fi

        success "Project Reference: ${project_ref}"

        # Save credentials securely
        save_database_credentials "$project_ref" "$db_password"

        # Wait for project to be fully ready
        wait_for_project_ready "$project_ref"

        return 0
    else
        error "Failed to create Supabase project"
        error "$project_ref"
        exit 1
    fi
}

################################################################################
# USE EXISTING PROJECT
################################################################################
use_existing_project() {
    banner "USING EXISTING SUPABASE PROJECT"

    info "Listing available projects..."
    supabase projects list

    echo ""
    read -p "Enter Project Reference ID: " project_ref
    read -sp "Enter Database Password: " db_password
    echo ""

    if [ -z "$project_ref" ] || [ -z "$db_password" ]; then
        error "Project reference and password are required"
        exit 1
    fi

    # Verify project exists
    if ! supabase projects api-keys --project-ref "$project_ref" &> /dev/null; then
        error "Invalid project reference or access denied"
        exit 1
    fi

    success "Project verified"
    save_database_credentials "$project_ref" "$db_password"
}

################################################################################
# SAVE DATABASE CREDENTIALS
################################################################################
save_database_credentials() {
    local project_ref="$1"
    local db_password="$2"

    banner "GENERATING CONNECTION STRINGS"

    # Connection string with PgBouncer (for serverless)
    local database_url="postgresql://postgres:${db_password}@db.${project_ref}.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"

    # Direct connection (for migrations)
    local direct_url="postgresql://postgres:${db_password}@db.${project_ref}.supabase.co:5432/postgres"

    # Supabase configuration
    cat > "$CONFIG_FILE" <<EOF
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SUPABASE DATABASE CONFIGURATION
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Generated: $(date '+%Y-%m-%d %H:%M:%S')
# Project Reference: ${project_ref}
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Pooled Connection (use in production - connection pooling via PgBouncer)
DATABASE_URL="${database_url}"

# Direct Connection (use for migrations only)
DIRECT_URL="${direct_url}"

# Supabase Project
SUPABASE_PROJECT_REF="${project_ref}"
SUPABASE_URL="https://${project_ref}.supabase.co"
SUPABASE_ANON_KEY="[Get from Supabase Dashboard]"
SUPABASE_SERVICE_ROLE_KEY="[Get from Supabase Dashboard]"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# IMPORTANT:
# 1. Add DATABASE_URL and DIRECT_URL to Vercel Environment Variables
# 2. Never commit this file to version control
# 3. Get API keys from: https://supabase.com/dashboard/project/${project_ref}/settings/api
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EOF

    chmod 600 "$CONFIG_FILE"
    success "Configuration saved to: ${CONFIG_FILE}"

    # Also update .env file if it exists
    if [ -f "${PROJECT_ROOT}/.env" ]; then
        update_env_file "$database_url" "$direct_url"
    fi

    info "Connection Strings Generated:"
    echo -e "${CYAN}DATABASE_URL:${NC}"
    echo "  $database_url"
    echo ""
    echo -e "${CYAN}DIRECT_URL:${NC}"
    echo "  $direct_url"
    echo ""

    # Export for current session
    export DATABASE_URL="$database_url"
    export DIRECT_URL="$direct_url"
}

################################################################################
# UPDATE ENV FILE
################################################################################
update_env_file() {
    local database_url="$1"
    local direct_url="$2"

    local env_file="${PROJECT_ROOT}/.env"

    if grep -q "^DATABASE_URL=" "$env_file" 2>/dev/null; then
        sed -i.bak "s|^DATABASE_URL=.*|DATABASE_URL=\"${database_url}\"|" "$env_file"
    else
        echo "DATABASE_URL=\"${database_url}\"" >> "$env_file"
    fi

    if grep -q "^DIRECT_URL=" "$env_file" 2>/dev/null; then
        sed -i.bak "s|^DIRECT_URL=.*|DIRECT_URL=\"${direct_url}\"|" "$env_file"
    else
        echo "DIRECT_URL=\"${direct_url}\"" >> "$env_file"
    fi

    success "Updated ${env_file}"
}

################################################################################
# WAIT FOR PROJECT READY
################################################################################
wait_for_project_ready() {
    local project_ref="$1"
    local max_attempts=60
    local attempt=0

    info "Waiting for project to be fully ready..."

    while [ $attempt -lt $max_attempts ]; do
        if supabase projects api-keys --project-ref "$project_ref" &> /dev/null; then
            success "Project is ready"
            return 0
        fi

        attempt=$((attempt + 1))
        echo -n "."
        sleep 5
    done

    error "Project did not become ready in time"
    exit 1
}

################################################################################
# VERIFY DATABASE CONNECTION
################################################################################
verify_connection() {
    banner "VERIFYING DATABASE CONNECTION"

    if [ -z "${DATABASE_URL:-}" ]; then
        error "DATABASE_URL not set"
        exit 1
    fi

    info "Testing connection to database..."

    # Use Node.js to test connection
    if node -e "
        const { Client } = require('pg');
        const client = new Client({ connectionString: process.env.DATABASE_URL });
        client.connect()
            .then(() => client.query('SELECT version()'))
            .then(result => {
                console.log('✓ Connection successful');
                console.log('PostgreSQL Version:', result.rows[0].version.split(' ')[1]);
                return client.end();
            })
            .catch(err => {
                console.error('✗ Connection failed:', err.message);
                process.exit(1);
            });
    " 2>&1; then
        success "Database connection verified"
    else
        error "Database connection failed"
        exit 1
    fi
}

################################################################################
# INSTALL DEPENDENCIES
################################################################################
install_dependencies() {
    banner "INSTALLING PROJECT DEPENDENCIES"

    cd "$PROJECT_ROOT" || exit 1

    if [ -f "package-lock.json" ]; then
        info "Running npm ci for reproducible build..."
        npm ci --silent
    else
        info "Running npm install..."
        npm install --silent
    fi

    success "Dependencies installed"
}

################################################################################
# GENERATE PRISMA CLIENT
################################################################################
generate_prisma_client() {
    banner "GENERATING PRISMA CLIENT"

    cd "$PROJECT_ROOT" || exit 1

    info "Running: npx prisma generate"
    npx prisma generate

    success "Prisma client generated"
}

################################################################################
# RUN MIGRATIONS
################################################################################
run_migrations() {
    banner "DEPLOYING PRISMA MIGRATIONS"

    cd "$PROJECT_ROOT" || exit 1

    # Check if migrations directory exists
    if [ ! -d "$MIGRATION_DIR" ]; then
        error "Migrations directory not found: ${MIGRATION_DIR}"
        exit 1
    fi

    # Count migrations
    local migration_count
    migration_count=$(find "$MIGRATION_DIR" -mindepth 1 -maxdepth 1 -type d | wc -l)
    info "Found ${migration_count} migrations"

    if [ "$migration_count" -eq 0 ]; then
        warn "No migrations to apply"
        return 0
    fi

    # Deploy migrations
    info "Deploying migrations to production database..."

    if npx prisma migrate deploy; then
        success "All migrations applied successfully"
    else
        error "Migration deployment failed"
        error "Rolling back may be required"
        exit 1
    fi
}

################################################################################
# SEED DATABASE
################################################################################
seed_database() {
    banner "SEEDING DATABASE (OPTIONAL)"

    read -p "Do you want to seed the database with initial data? (y/N): " -n 1 -r
    echo

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        info "Skipping database seeding"
        return 0
    fi

    local seed_script="${PROJECT_ROOT}/prisma/seed.ts"

    if [ ! -f "$seed_script" ]; then
        warn "Seed script not found: ${seed_script}"
        return 0
    fi

    info "Running seed script..."

    if npx tsx "$seed_script"; then
        success "Database seeded successfully"
    else
        error "Database seeding failed"
        warn "This is not critical - continuing..."
    fi
}

################################################################################
# SETUP COMPLETE
################################################################################
display_completion_summary() {
    banner "DATABASE SETUP COMPLETE"

    echo -e "${GREEN}${BOLD}✓ Database successfully provisioned and configured${NC}\n"

    echo -e "${CYAN}${BOLD}📋 NEXT STEPS:${NC}\n"

    echo "1. ${BOLD}Add Environment Variables to Vercel:${NC}"
    echo "   → Go to: https://vercel.com/your-team/travel-ailydian-enterprise/settings/environment-variables"
    echo "   → Add the following variables:"
    echo "     • DATABASE_URL (from ${CONFIG_FILE})"
    echo "     • DIRECT_URL (from ${CONFIG_FILE})"
    echo ""

    echo "2. ${BOLD}Get Supabase API Keys:${NC}"
    echo "   → Go to: https://supabase.com/dashboard/project/[YOUR_PROJECT_REF]/settings/api"
    echo "   → Add to Vercel:"
    echo "     • NEXT_PUBLIC_SUPABASE_URL"
    echo "     • NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "     • SUPABASE_SERVICE_ROLE_KEY"
    echo ""

    echo "3. ${BOLD}Deploy to Production:${NC}"
    echo "   → Run: vercel --prod"
    echo "   → Or commit and push to trigger automatic deployment"
    echo ""

    echo "4. ${BOLD}Verify Deployment:${NC}"
    echo "   → Run: ./scripts/verify-deployment.sh"
    echo ""

    echo -e "${CYAN}${BOLD}📁 FILES CREATED:${NC}"
    echo "   • ${CONFIG_FILE}"
    echo "   • ${LOG_FILE}"
    echo ""

    echo -e "${YELLOW}${BOLD}⚠  IMPORTANT SECURITY NOTES:${NC}"
    echo "   • Never commit ${CONFIG_FILE} to version control"
    echo "   • Store credentials in a secure password manager"
    echo "   • Rotate database password regularly"
    echo "   • Enable database backups in Supabase dashboard"
    echo ""

    success "Setup completed at $(date '+%Y-%m-%d %H:%M:%S')"
}

################################################################################
# MAIN EXECUTION
################################################################################
main() {
    # Create log directory
    mkdir -p "$LOG_DIR"

    # Display banner
    clear
    echo -e "${MAGENTA}${BOLD}"
    cat << "EOF"
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║               🗄️  AILYDIAN DATABASE AGENT - AUTOMATED SETUP              ║
║                                                                           ║
║                     Production-Grade Database Deployment                 ║
║                         Supabase + PostgreSQL + Prisma                   ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}\n"

    log "INFO" "Starting database setup process"

    # Execute setup steps
    check_dependencies
    check_supabase_auth

    # Project creation or selection
    echo ""
    read -p "Do you want to create a new Supabase project? (y/N): " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter project name (default: travel-ailydian-production): " project_name
        project_name="${project_name:-travel-ailydian-production}"
        create_supabase_project "$project_name"
    else
        use_existing_project
    fi

    # Database setup
    verify_connection
    install_dependencies
    generate_prisma_client
    run_migrations
    seed_database

    # Completion
    display_completion_summary

    log "INFO" "Database setup completed successfully"
}

################################################################################
# ERROR HANDLING
################################################################################
trap 'error "Script failed at line $LINENO"; exit 1' ERR

################################################################################
# ENTRY POINT
################################################################################
main "$@"
