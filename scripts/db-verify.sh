#!/bin/bash
################################################################################
# AILYDIAN DATABASE VERIFICATION SCRIPT
################################################################################
# Description: Comprehensive database health check and verification
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

################################################################################
# LOGGING
################################################################################
log_info() { echo -e "${BLUE}ℹ ${NC}$*"; }
log_success() { echo -e "${GREEN}✓${NC} $*"; }
log_warn() { echo -e "${YELLOW}⚠ ${NC}$*"; }
log_error() { echo -e "${RED}✗${NC} $*"; }

banner() {
    echo -e "\n${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}${BOLD}  $*${NC}"
    echo -e "${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

################################################################################
# VERIFY DATABASE CONNECTION
################################################################################
verify_connection() {
    banner "DATABASE CONNECTION TEST"

    if [ -z "${DATABASE_URL:-}" ]; then
        log_error "DATABASE_URL not set"
        return 1
    fi

    log_info "Testing connection..."

    if npx prisma db execute --stdin <<< "SELECT 1;" &> /dev/null; then
        log_success "Database connection successful"
        return 0
    else
        log_error "Database connection failed"
        return 1
    fi
}

################################################################################
# CHECK SCHEMA SYNC
################################################################################
check_schema_sync() {
    banner "SCHEMA SYNCHRONIZATION CHECK"

    log_info "Checking if database schema is in sync with Prisma schema..."

    local status_output
    status_output=$(npx prisma migrate status 2>&1 || true)

    if echo "$status_output" | grep -q "Database schema is up to date"; then
        log_success "Database schema is synchronized"
        return 0
    elif echo "$status_output" | grep -q "pending migration"; then
        log_warn "There are pending migrations"
        echo "$status_output"
        return 1
    else
        log_warn "Schema status unclear"
        echo "$status_output"
        return 1
    fi
}

################################################################################
# VERIFY TABLES
################################################################################
verify_tables() {
    banner "TABLE VERIFICATION"

    log_info "Checking essential tables..."

    local tables=(
        "users"
        "bookings"
        "hotels"
        "flights"
        "tour_packages"
        "airport_transfers"
        "car_rentals"
        "rental_properties"
    )

    local missing_tables=()

    for table in "${tables[@]}"; do
        if npx prisma db execute --stdin <<< "SELECT 1 FROM \"${table}\" LIMIT 1;" &> /dev/null; then
            log_success "Table exists: ${table}"
        else
            log_error "Table missing: ${table}"
            missing_tables+=("$table")
        fi
    done

    if [ ${#missing_tables[@]} -eq 0 ]; then
        log_success "All essential tables exist"
        return 0
    else
        log_error "Missing tables: ${missing_tables[*]}"
        return 1
    fi
}

################################################################################
# CHECK INDEXES
################################################################################
check_indexes() {
    banner "INDEX VERIFICATION"

    log_info "Checking database indexes..."

    local index_count
    index_count=$(npx prisma db execute --stdin <<< \
        "SELECT COUNT(*) as count FROM pg_indexes WHERE schemaname = 'public';" \
        2>/dev/null | grep -oP '\d+' | head -1 || echo "0")

    if [ "$index_count" -gt 0 ]; then
        log_success "Found ${index_count} indexes"
        return 0
    else
        log_warn "No indexes found - performance may be impacted"
        return 1
    fi
}

################################################################################
# CHECK CONSTRAINTS
################################################################################
check_constraints() {
    banner "CONSTRAINT VERIFICATION"

    log_info "Checking foreign key constraints..."

    local constraint_count
    constraint_count=$(npx prisma db execute --stdin <<< \
        "SELECT COUNT(*) FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY' AND table_schema = 'public';" \
        2>/dev/null | grep -oP '\d+' | head -1 || echo "0")

    if [ "$constraint_count" -gt 0 ]; then
        log_success "Found ${constraint_count} foreign key constraints"
        return 0
    else
        log_warn "No foreign key constraints found"
        return 1
    fi
}

################################################################################
# DATABASE SIZE
################################################################################
check_database_size() {
    banner "DATABASE SIZE"

    log_info "Calculating database size..."

    local db_size
    db_size=$(npx prisma db execute --stdin <<< \
        "SELECT pg_size_pretty(pg_database_size(current_database())) as size;" \
        2>/dev/null | tail -1 || echo "Unknown")

    log_info "Database size: ${db_size}"

    # Check table sizes
    log_info "Top 5 largest tables:"

    npx prisma db execute --stdin <<< \
        "SELECT
            schemaname,
            tablename,
            pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
        FROM pg_tables
        WHERE schemaname = 'public'
        ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
        LIMIT 5;" 2>/dev/null || log_warn "Could not retrieve table sizes"
}

################################################################################
# PERFORMANCE CHECK
################################################################################
check_performance() {
    banner "PERFORMANCE METRICS"

    log_info "Testing query performance..."

    # Simple query performance test
    local start_time end_time duration

    start_time=$(date +%s%N)
    npx prisma db execute --stdin <<< "SELECT 1;" &> /dev/null
    end_time=$(date +%s%N)

    duration=$(( (end_time - start_time) / 1000000 ))

    if [ "$duration" -lt 100 ]; then
        log_success "Query response time: ${duration}ms (Excellent)"
    elif [ "$duration" -lt 500 ]; then
        log_success "Query response time: ${duration}ms (Good)"
    else
        log_warn "Query response time: ${duration}ms (Needs optimization)"
    fi
}

################################################################################
# GENERATE REPORT
################################################################################
generate_report() {
    banner "VERIFICATION SUMMARY"

    local checks_passed=0
    local checks_failed=0
    local checks_warned=0

    # Run all checks and count results
    verify_connection && ((checks_passed++)) || ((checks_failed++))
    check_schema_sync && ((checks_passed++)) || ((checks_warned++))
    verify_tables && ((checks_passed++)) || ((checks_failed++))
    check_indexes && ((checks_passed++)) || ((checks_warned++))
    check_constraints && ((checks_passed++)) || ((checks_warned++))
    check_database_size
    check_performance && ((checks_passed++)) || ((checks_warned++))

    echo ""
    echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}RESULTS:${NC}"
    echo -e "  ${GREEN}✓ Passed:${NC}  ${checks_passed}"
    echo -e "  ${YELLOW}⚠ Warnings:${NC} ${checks_warned}"
    echo -e "  ${RED}✗ Failed:${NC}  ${checks_failed}"
    echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

    if [ "$checks_failed" -eq 0 ]; then
        echo -e "\n${GREEN}${BOLD}✓ Database is healthy and ready for production${NC}\n"
        return 0
    else
        echo -e "\n${RED}${BOLD}✗ Database has critical issues that need attention${NC}\n"
        return 1
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
║                   🔍 DATABASE VERIFICATION SYSTEM                         ║
║                                                                           ║
║                    Comprehensive Health Check                            ║
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

    # Run verification
    generate_report
}

################################################################################
# ENTRY POINT
################################################################################
main "$@"
