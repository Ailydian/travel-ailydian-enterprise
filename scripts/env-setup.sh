#!/bin/bash

################################################################################
# AILYDIAN Environment Setup Script
# Production-Grade Secret Generator & Vercel Configuration Tool
#
# Purpose: Generate cryptographically secure secrets and prepare environment
#          variables for production deployment on Vercel
#
# Usage:
#   chmod +x scripts/env-setup.sh
#   ./scripts/env-setup.sh [--generate-only|--validate-only|--deploy]
#
# Features:
# - Cryptographically secure secret generation (32-64 byte random strings)
# - Vercel environment variable preparation
# - Automatic validation of existing .env files
# - Idempotent operations (safe to run multiple times)
# - Backup existing configuration before overwriting
################################################################################

set -eo pipefail
IFS=$'\n\t'

# Colors for terminal output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly MAGENTA='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m' # No Color

# Configuration
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
readonly ENV_OUTPUT_FILE="${PROJECT_ROOT}/.env.vercel.production"
readonly BACKUP_DIR="${PROJECT_ROOT}/.env-backups"
readonly TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_section() {
    echo -e "\n${MAGENTA}========================================${NC}"
    echo -e "${MAGENTA}$1${NC}"
    echo -e "${MAGENTA}========================================${NC}\n"
}

################################################################################
# Utility Functions
################################################################################

# Generate cryptographically secure random string
# Args: $1 = byte length
generate_secret() {
    local byte_length="${1:-32}"

    # Try openssl first (most common)
    if command -v openssl &> /dev/null; then
        openssl rand -base64 "$byte_length" | tr -d '\n'
        return 0
    fi

    # Fallback to /dev/urandom
    if [[ -r /dev/urandom ]]; then
        head -c "$byte_length" /dev/urandom | base64 | tr -d '\n' | head -c "$((byte_length * 4 / 3))"
        return 0
    fi

    log_error "No secure random source available. Install openssl or ensure /dev/urandom is readable."
    return 1
}

# Generate hex secret (for specific use cases)
generate_hex_secret() {
    local byte_length="${1:-32}"

    if command -v openssl &> /dev/null; then
        openssl rand -hex "$byte_length" | tr -d '\n'
        return 0
    fi

    if [[ -r /dev/urandom ]]; then
        head -c "$byte_length" /dev/urandom | xxd -p -c 256 | tr -d '\n'
        return 0
    fi

    log_error "No secure random source available."
    return 1
}

# Validate URL format
validate_url() {
    local url="$1"
    local url_pattern='^https?://[a-zA-Z0-9.-]+(:[0-9]+)?(/.*)?$'

    if [[ "$url" =~ $url_pattern ]]; then
        return 0
    else
        return 1
    fi
}

# Create backup of existing env file
backup_env_file() {
    if [[ -f "$ENV_OUTPUT_FILE" ]]; then
        mkdir -p "$BACKUP_DIR"
        local backup_file="${BACKUP_DIR}/.env.vercel.production.${TIMESTAMP}.backup"
        cp "$ENV_OUTPUT_FILE" "$backup_file"
        log_success "Backed up existing config to: ${backup_file}"
    fi
}

################################################################################
# Secret Generation
################################################################################

generate_all_secrets() {
    log_section "Generating Cryptographically Secure Secrets"

    # Generate NEXTAUTH_SECRET (32 bytes)
    log_info "Generating NEXTAUTH_SECRET (32 bytes)..."
    GENERATED_NEXTAUTH_SECRET=$(generate_secret 32)
    if [[ -n "$GENERATED_NEXTAUTH_SECRET" ]]; then
        log_success "NEXTAUTH_SECRET: ${GENERATED_NEXTAUTH_SECRET:0:16}...${GENERATED_NEXTAUTH_SECRET: -8} (${#GENERATED_NEXTAUTH_SECRET} chars)"
    else
        log_error "Failed to generate NEXTAUTH_SECRET"
        return 1
    fi

    # Generate JWT_SECRET (64 bytes)
    log_info "Generating JWT_SECRET (64 bytes)..."
    GENERATED_JWT_SECRET=$(generate_secret 64)
    if [[ -n "$GENERATED_JWT_SECRET" ]]; then
        log_success "JWT_SECRET: ${GENERATED_JWT_SECRET:0:16}...${GENERATED_JWT_SECRET: -8} (${#GENERATED_JWT_SECRET} chars)"
    else
        log_error "Failed to generate JWT_SECRET"
        return 1
    fi

    # Generate REFRESH_SECRET (64 bytes)
    log_info "Generating REFRESH_SECRET (64 bytes)..."
    GENERATED_REFRESH_SECRET=$(generate_secret 64)
    if [[ -n "$GENERATED_REFRESH_SECRET" ]]; then
        log_success "REFRESH_SECRET: ${GENERATED_REFRESH_SECRET:0:16}...${GENERATED_REFRESH_SECRET: -8} (${#GENERATED_REFRESH_SECRET} chars)"
    else
        log_error "Failed to generate REFRESH_SECRET"
        return 1
    fi

    # Generate CRON_SECRET (32 bytes)
    log_info "Generating CRON_SECRET (32 bytes)..."
    GENERATED_CRON_SECRET=$(generate_secret 32)
    if [[ -n "$GENERATED_CRON_SECRET" ]]; then
        log_success "CRON_SECRET: ${GENERATED_CRON_SECRET:0:16}...${GENERATED_CRON_SECRET: -8} (${#GENERATED_CRON_SECRET} chars)"
    else
        log_error "Failed to generate CRON_SECRET"
        return 1
    fi

    # Generate IndexNow key (32 hex chars)
    log_info "Generating INDEXNOW_KEY (32 hex chars)..."
    GENERATED_INDEXNOW_KEY=$(generate_hex_secret 16)
    if [[ -n "$GENERATED_INDEXNOW_KEY" ]]; then
        log_success "INDEXNOW_KEY: ${GENERATED_INDEXNOW_KEY}"
    else
        log_error "Failed to generate INDEXNOW_KEY"
        return 1
    fi

    log_success "All secrets generated successfully!"
    return 0
}

################################################################################
# Environment File Creation
################################################################################

create_vercel_env_file() {
    log_section "Creating Vercel Production Environment File"

    backup_env_file

    cat > "$ENV_OUTPUT_FILE" << 'ENVFILE'
################################################################################
# AILYDIAN TRAVEL PLATFORM - VERCEL PRODUCTION ENVIRONMENT
# Generated: AUTO_GENERATED_TIMESTAMP
#
# SECURITY:
# - All secrets are cryptographically generated
# - Never commit this file to version control
# - Rotate secrets every 90 days minimum
# - Use Vercel's encrypted environment variables feature
################################################################################

# ==========================================
# APPLICATION CONFIGURATION
# ==========================================
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://travel.ailydian.com
NEXT_PUBLIC_API_URL=https://travel.ailydian.com/api
NEXT_PUBLIC_BASE_URL=https://travel.ailydian.com
NEXT_PUBLIC_SITE_URL=https://travel.ailydian.com
NEXT_PUBLIC_APP_VERSION=2.0.0

# ==========================================
# DATABASE - PostgreSQL (REQUIRED)
# ==========================================
# Production database URL from Supabase/Neon/Railway
# TODO: Replace with your production database URL
DATABASE_URL=postgresql://user:password@host:5432/travel_ailydian_production?schema=public&connection_limit=20&pool_timeout=10

# ==========================================
# AUTHENTICATION & SECURITY (GENERATED)
# ==========================================
NEXTAUTH_SECRET=GENERATED_NEXTAUTH_SECRET_PLACEHOLDER
JWT_SECRET=GENERATED_JWT_SECRET_PLACEHOLDER
REFRESH_SECRET=GENERATED_REFRESH_SECRET_PLACEHOLDER

# ==========================================
# STRIPE PAYMENT GATEWAY (REQUIRED)
# ==========================================
# Get from: https://dashboard.stripe.com/apikeys
# TODO: Add your LIVE Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=sk_live_REPLACE_WITH_YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_REPLACE_WITH_YOUR_WEBHOOK_SECRET

# ==========================================
# EMAIL SERVICE - RESEND (REQUIRED)
# ==========================================
# Get from: https://resend.com/api-keys
# TODO: Add your Resend API key
RESEND_API_KEY=re_REPLACE_WITH_YOUR_RESEND_API_KEY
RESEND_FROM_EMAIL=Travel.Ailydian <noreply@travel.ailydian.com>
RESEND_SUPPORT_EMAIL=support@travel.ailydian.com

# ==========================================
# AI SERVICES - GROQ (REQUIRED)
# ==========================================
# Get from: https://console.groq.com/keys
# TODO: Add your Groq API key
GROQ_API_KEY=gsk_REPLACE_WITH_YOUR_GROQ_API_KEY
GROQ_PRIMARY_MODEL=llama-3.3-70b-versatile
GROQ_FAST_MODEL=llama-3.1-8b-instant

# AI Configuration (Obfuscated)
AI_INFERENCE_KEY=gsk_REPLACE_WITH_YOUR_GROQ_API_KEY
PRIMARY_AI_PROVIDER=groq
AI_PRIMARY_MODEL=llama-3.3-70b-versatile
AI_FAST_MODEL=llama-3.1-8b-instant
AI_HYBRID_MODEL=llama-3.1-70b-versatile
AI_LITE_MODEL=llama-3.1-8b-instant

# OpenAI Fallback (Optional)
OPENAI_API_KEY=sk-REPLACE_WITH_YOUR_OPENAI_API_KEY
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_FALLBACK_MODEL=gpt-3.5-turbo

# AI Vision & Embeddings
AI_VISION_MODEL=llama-3.2-90b-vision-preview
AI_EMBED_MODEL=text-embedding-3-small
SECONDARY_AI_PROVIDER=openai
TERTIARY_AI_PROVIDER=anthropic

# ==========================================
# REDIS CACHE - UPSTASH (RECOMMENDED)
# ==========================================
# Get from: https://console.upstash.com/
# TODO: Add your Upstash Redis credentials
UPSTASH_REDIS_REST_URL=https://REPLACE_WITH_YOUR_UPSTASH_URL.upstash.io
UPSTASH_REDIS_REST_TOKEN=REPLACE_WITH_YOUR_UPSTASH_TOKEN

# ==========================================
# CLOUDINARY - IMAGE CDN (REQUIRED)
# ==========================================
# Get from: https://cloudinary.com/console
# TODO: Add your Cloudinary credentials
CLOUDINARY_CLOUD_NAME=REPLACE_WITH_YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=REPLACE_WITH_YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=REPLACE_WITH_YOUR_CLOUDINARY_API_SECRET

# ==========================================
# TRAVEL APIs (REQUIRED)
# ==========================================

# Amadeus API - Flight & Hotel Search
# Get from: https://developers.amadeus.com/
# TODO: Add your Amadeus credentials
AMADEUS_CLIENT_ID=REPLACE_WITH_YOUR_AMADEUS_CLIENT_ID
AMADEUS_CLIENT_SECRET=REPLACE_WITH_YOUR_AMADEUS_CLIENT_SECRET
AMADEUS_API_BASE_URL=https://api.amadeus.com
NEXT_PUBLIC_AMADEUS_CLIENT_ID=REPLACE_WITH_YOUR_AMADEUS_CLIENT_ID

# Google Places API
# Get from: https://console.cloud.google.com/
# TODO: Add your Google API key
GOOGLE_PLACES_API_KEY=REPLACE_WITH_YOUR_GOOGLE_PLACES_API_KEY
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=REPLACE_WITH_YOUR_GOOGLE_PLACES_API_KEY

# ==========================================
# OPTIONAL THIRD-PARTY APIs
# ==========================================
WEATHER_API_KEY=REPLACE_WITH_YOUR_WEATHER_API_KEY
TRIPADVISOR_API_KEY=REPLACE_WITH_YOUR_TRIPADVISOR_API_KEY
NEXT_PUBLIC_TRIPADVISOR_API_KEY=REPLACE_WITH_YOUR_TRIPADVISOR_API_KEY
FOURSQUARE_API_KEY=REPLACE_WITH_YOUR_FOURSQUARE_API_KEY
RAPIDAPI_KEY=REPLACE_WITH_YOUR_RAPIDAPI_KEY

# ==========================================
# WHATSAPP BUSINESS API (OPTIONAL)
# ==========================================
WHATSAPP_ACCESS_TOKEN=REPLACE_WITH_YOUR_WHATSAPP_ACCESS_TOKEN
WHATSAPP_BUSINESS_ACCOUNT_ID=REPLACE_WITH_YOUR_BUSINESS_ACCOUNT_ID
WHATSAPP_PHONE_NUMBER_ID=REPLACE_WITH_YOUR_PHONE_NUMBER_ID
WHATSAPP_WEBHOOK_VERIFY_TOKEN=REPLACE_WITH_YOUR_WEBHOOK_VERIFY_TOKEN

# ==========================================
# MONITORING & ANALYTICS (REQUIRED)
# ==========================================

# Sentry Error Tracking
# Get from: https://sentry.io/
# TODO: Add your Sentry credentials
NEXT_PUBLIC_SENTRY_DSN=https://REPLACE_WITH_YOUR_SENTRY_DSN@sentry.io/project-id
SENTRY_AUTH_TOKEN=REPLACE_WITH_YOUR_SENTRY_AUTH_TOKEN

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# ==========================================
# SEO & INDEXING (GENERATED)
# ==========================================
INDEXNOW_KEY=GENERATED_INDEXNOW_KEY_PLACEHOLDER
SEO_API_KEY=REPLACE_WITH_YOUR_SEO_API_KEY

# ==========================================
# WEBSOCKET (OPTIONAL)
# ==========================================
NEXT_PUBLIC_WS_URL=wss://travel.ailydian.com

# ==========================================
# CRON JOBS & SCHEDULED TASKS (GENERATED)
# ==========================================
CRON_SECRET=GENERATED_CRON_SECRET_PLACEHOLDER

# ==========================================
# FEATURE FLAGS
# ==========================================
FEATURE_AI_DYNAMIC_PRICING=true
FEATURE_VECTOR_SEARCH=false
FEATURE_RAG_SYSTEM=false
FEATURE_REFERRAL_PROGRAM=true
FEATURE_PRICE_ALERTS=true

# ==========================================
# RATE LIMITING CONFIGURATION
# ==========================================
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# ==========================================
# CACHE CONFIGURATION
# ==========================================
API_CACHE_DURATION_MINUTES=60

# ==========================================
# SLACK NOTIFICATIONS (OPTIONAL)
# ==========================================
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/REPLACE_WITH_YOUR_SLACK_WEBHOOK

################################################################################
# END OF CONFIGURATION
################################################################################
ENVFILE

    # Replace placeholders with generated secrets using direct string replacement
    local timestamp
    timestamp=$(date -u +"%Y-%m-%d %H:%M:%S UTC")

    # Create temp file for replacements
    local temp_file="${ENV_OUTPUT_FILE}.temp"
    cp "$ENV_OUTPUT_FILE" "$temp_file"

    # Perform replacements using awk for safer handling
    awk -v ts="$timestamp" '{gsub(/AUTO_GENERATED_TIMESTAMP/, ts)}1' "$temp_file" > "${temp_file}.1" && mv "${temp_file}.1" "$temp_file"
    awk -v secret="$GENERATED_NEXTAUTH_SECRET" '{gsub(/GENERATED_NEXTAUTH_SECRET_PLACEHOLDER/, secret)}1' "$temp_file" > "${temp_file}.1" && mv "${temp_file}.1" "$temp_file"
    awk -v secret="$GENERATED_JWT_SECRET" '{gsub(/GENERATED_JWT_SECRET_PLACEHOLDER/, secret)}1' "$temp_file" > "${temp_file}.1" && mv "${temp_file}.1" "$temp_file"
    awk -v secret="$GENERATED_REFRESH_SECRET" '{gsub(/GENERATED_REFRESH_SECRET_PLACEHOLDER/, secret)}1' "$temp_file" > "${temp_file}.1" && mv "${temp_file}.1" "$temp_file"
    awk -v secret="$GENERATED_CRON_SECRET" '{gsub(/GENERATED_CRON_SECRET_PLACEHOLDER/, secret)}1' "$temp_file" > "${temp_file}.1" && mv "${temp_file}.1" "$temp_file"
    awk -v secret="$GENERATED_INDEXNOW_KEY" '{gsub(/GENERATED_INDEXNOW_KEY_PLACEHOLDER/, secret)}1' "$temp_file" > "${temp_file}.1" && mv "${temp_file}.1" "$temp_file"

    # Replace original file
    mv "$temp_file" "$ENV_OUTPUT_FILE"

    log_success "Created: ${ENV_OUTPUT_FILE}"
    log_info "File size: $(du -h "$ENV_OUTPUT_FILE" | cut -f1)"
}

################################################################################
# Vercel CLI Commands Generation
################################################################################

generate_vercel_commands() {
    log_section "Generating Vercel CLI Deployment Commands"

    local vercel_script="${PROJECT_ROOT}/scripts/deploy-env-to-vercel.sh"

    cat > "$vercel_script" << 'VERCELSCRIPT'
#!/bin/bash
################################################################################
# Vercel Environment Variables Deployment Script
#
# Prerequisites:
#   1. Install Vercel CLI: npm i -g vercel
#   2. Login: vercel login
#   3. Link project: vercel link
#
# Usage:
#   chmod +x scripts/deploy-env-to-vercel.sh
#   ./scripts/deploy-env-to-vercel.sh
################################################################################

set -euo pipefail

readonly GREEN='\033[0;32m'
readonly BLUE='\033[0;34m'
readonly YELLOW='\033[1;33m'
readonly NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}VERCEL ENVIRONMENT SETUP${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm i -g vercel
fi

# Check if .env.vercel.production exists
if [[ ! -f ".env.vercel.production" ]]; then
    echo -e "${YELLOW}Error: .env.vercel.production not found!${NC}"
    echo -e "${YELLOW}Run: ./scripts/env-setup.sh first${NC}"
    exit 1
fi

echo -e "${GREEN}Reading environment variables from .env.vercel.production${NC}\n"

# Function to set Vercel environment variable
set_vercel_env() {
    local var_name="$1"
    local var_value="$2"
    local env_type="${3:-production}" # production, preview, development

    echo -e "${BLUE}Setting: ${var_name}${NC}"

    if vercel env add "$var_name" "$env_type" <<< "$var_value" &>/dev/null; then
        echo -e "${GREEN}✓ ${var_name} set successfully${NC}"
    else
        # Variable might exist, try to remove and re-add
        vercel env rm "$var_name" "$env_type" -y &>/dev/null || true
        vercel env add "$var_name" "$env_type" <<< "$var_value" &>/dev/null
        echo -e "${GREEN}✓ ${var_name} updated successfully${NC}"
    fi
}

echo -e "${YELLOW}================================================${NC}"
echo -e "${YELLOW}MANUAL DEPLOYMENT INSTRUCTIONS${NC}"
echo -e "${YELLOW}================================================${NC}\n"

echo "Option 1: Use Vercel Dashboard (Recommended)"
echo "  1. Go to: https://vercel.com/dashboard"
echo "  2. Select your project"
echo "  3. Navigate to Settings → Environment Variables"
echo "  4. Copy variables from: .env.vercel.production"
echo "  5. Set scope to: Production"
echo ""

echo "Option 2: Use Vercel CLI (Bulk Import)"
echo "  Run this command to import all variables:"
echo "  $ vercel env pull .env.vercel.production"
echo ""

echo "Option 3: Individual Variable Setting"
echo "  Example commands (copy and modify):"
echo ""
echo "  # Set a single variable"
echo "  $ vercel env add NEXTAUTH_SECRET production"
echo "  # Then paste the value when prompted"
echo ""
echo "  # Or use environment file"
echo "  $ while IFS='=' read -r key value; do"
echo "    [[ \$key =~ ^#.*$ || -z \$key ]] && continue"
echo "    vercel env add \"\$key\" production <<< \"\$value\""
echo "  done < .env.vercel.production"
echo ""

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}Next Steps:${NC}"
echo -e "${GREEN}================================================${NC}"
echo "1. Review .env.vercel.production"
echo "2. Replace all REPLACE_WITH_YOUR_* placeholders"
echo "3. Deploy environment variables to Vercel"
echo "4. Run: vercel --prod"
echo ""

VERCELSCRIPT

    chmod +x "$vercel_script"

    log_success "Created Vercel deployment script: ${vercel_script}"
    log_info "Run: ./scripts/deploy-env-to-vercel.sh for deployment instructions"
}

################################################################################
# Validation
################################################################################

validate_env_file() {
    log_section "Validating Environment Configuration"

    if [[ ! -f "$ENV_OUTPUT_FILE" ]]; then
        log_error "Environment file not found: ${ENV_OUTPUT_FILE}"
        return 1
    fi

    local errors=0
    local warnings=0

    # Check for unreplaced placeholders
    log_info "Checking for placeholder values..."

    local placeholders=(
        "REPLACE_WITH_YOUR"
        "your_api_key_here"
        "postgresql://user:password@host"
    )

    for placeholder in "${placeholders[@]}"; do
        local count
        count=$(grep -c "$placeholder" "$ENV_OUTPUT_FILE" || true)
        if [[ "$count" -gt 0 ]]; then
            log_warning "Found ${count} unreplaced placeholder(s): ${placeholder}"
            ((warnings++))
        fi
    done

    # Validate generated secrets are present
    log_info "Validating generated secrets..."

    local required_secrets=(
        "NEXTAUTH_SECRET"
        "JWT_SECRET"
        "REFRESH_SECRET"
        "CRON_SECRET"
        "INDEXNOW_KEY"
    )

    for secret in "${required_secrets[@]}"; do
        if grep -q "^${secret}=.\{32,\}" "$ENV_OUTPUT_FILE"; then
            log_success "${secret} is present and appears valid"
        else
            log_error "${secret} is missing or too short!"
            ((errors++))
        fi
    done

    # Validate URLs
    log_info "Validating URL formats..."

    local url_vars=(
        "NEXT_PUBLIC_APP_URL"
        "NEXT_PUBLIC_API_URL"
        "DATABASE_URL"
    )

    for url_var in "${url_vars[@]}"; do
        local url_value
        url_value=$(grep "^${url_var}=" "$ENV_OUTPUT_FILE" | cut -d'=' -f2-)

        if [[ -n "$url_value" ]] && validate_url "$url_value"; then
            log_success "${url_var} format is valid"
        else
            log_warning "${url_var} may have invalid format: ${url_value}"
            ((warnings++))
        fi
    done

    echo ""
    if [[ "$errors" -eq 0 && "$warnings" -eq 0 ]]; then
        log_success "Validation passed with no errors or warnings!"
        return 0
    elif [[ "$errors" -eq 0 ]]; then
        log_warning "Validation passed with ${warnings} warning(s)"
        log_warning "Please review and replace placeholder values before deployment"
        return 0
    else
        log_error "Validation failed with ${errors} error(s) and ${warnings} warning(s)"
        return 1
    fi
}

################################################################################
# Display Summary
################################################################################

display_summary() {
    log_section "Environment Setup Summary"

    echo -e "${CYAN}Generated Files:${NC}"
    echo "  - ${ENV_OUTPUT_FILE}"
    echo "  - ${PROJECT_ROOT}/scripts/deploy-env-to-vercel.sh"
    echo ""

    echo -e "${CYAN}Generated Secrets:${NC}"
    echo "  - NEXTAUTH_SECRET (32 bytes)"
    echo "  - JWT_SECRET (64 bytes)"
    echo "  - REFRESH_SECRET (64 bytes)"
    echo "  - CRON_SECRET (32 bytes)"
    echo "  - INDEXNOW_KEY (32 hex chars)"
    echo ""

    echo -e "${YELLOW}Next Steps:${NC}"
    echo "  1. Review: ${ENV_OUTPUT_FILE}"
    echo "  2. Replace all 'REPLACE_WITH_YOUR_*' placeholders with actual API keys"
    echo "  3. Update DATABASE_URL with your production database"
    echo "  4. Run validation: ./scripts/env-setup.sh --validate-only"
    echo "  5. Deploy to Vercel: ./scripts/deploy-env-to-vercel.sh"
    echo ""

    echo -e "${GREEN}Security Reminder:${NC}"
    echo "  - Never commit .env.vercel.production to git"
    echo "  - Rotate secrets every 90 days"
    echo "  - Use separate keys for staging and production"
    echo "  - Store backups in secure password manager"
    echo ""
}

################################################################################
# Main Execution
################################################################################

main() {
    local mode="${1:-full}"

    log_section "AILYDIAN Environment Setup Script v2.0"

    case "$mode" in
        --generate-only)
            generate_all_secrets
            ;;
        --validate-only)
            validate_env_file
            ;;
        --deploy)
            generate_vercel_commands
            log_info "Review deployment instructions in: scripts/deploy-env-to-vercel.sh"
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --generate-only     Generate secrets only"
            echo "  --validate-only     Validate existing .env file"
            echo "  --deploy           Generate Vercel deployment script"
            echo "  --help, -h         Show this help message"
            echo ""
            echo "Default (no options): Full setup (generate + create + validate)"
            exit 0
            ;;
        *)
            # Full setup
            generate_all_secrets || {
                log_error "Secret generation failed!"
                exit 1
            }

            create_vercel_env_file || {
                log_error "Environment file creation failed!"
                exit 1
            }

            validate_env_file || {
                log_warning "Validation completed with warnings"
            }

            generate_vercel_commands

            display_summary

            log_success "Environment setup completed successfully!"
            ;;
    esac
}

# Run main function
main "$@"
