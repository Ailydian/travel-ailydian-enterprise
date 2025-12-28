#!/bin/bash

################################################################################
# AILYDIAN Environment Validator
# Enterprise-Grade Environment Variable Validation System
#
# Purpose: Comprehensive validation of environment variables for production
#          deployment with detailed reporting and security checks
#
# Usage:
#   chmod +x scripts/env-validator.sh
#   ./scripts/env-validator.sh [--file .env.path] [--strict] [--report]
#
# Features:
# - Format validation (URLs, secrets, API keys)
# - Security checks (placeholder detection, weak secrets)
# - Completeness verification (required vs optional vars)
# - Detailed HTML/JSON reports
# - CI/CD integration ready
################################################################################

set -euo pipefail
IFS=$'\n\t'

# Colors
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly MAGENTA='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m'

# Configuration
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ENV_FILE="${PROJECT_ROOT}/.env.vercel.production"
STRICT_MODE=false
GENERATE_REPORT=false
REPORT_DIR="${PROJECT_ROOT}/validation-reports"

# Validation counters
ERRORS=0
WARNINGS=0
PASSED=0
TOTAL=0

# Arrays to store validation results
declare -a VALIDATION_ERRORS=()
declare -a VALIDATION_WARNINGS=()
declare -a VALIDATION_PASSED=()

################################################################################
# Logging Functions
################################################################################

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[⚠]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; }
log_section() {
    echo -e "\n${MAGENTA}========================================${NC}"
    echo -e "${MAGENTA}$1${NC}"
    echo -e "${MAGENTA}========================================${NC}\n"
}

################################################################################
# Validation Rule Definitions
################################################################################

# Required environment variables (critical for app to function)
readonly REQUIRED_VARS=(
    "NODE_ENV"
    "NEXT_PUBLIC_APP_URL"
    "DATABASE_URL"
    "NEXTAUTH_SECRET"
    "JWT_SECRET"
    "STRIPE_SECRET_KEY"
    "RESEND_API_KEY"
)

# Highly recommended variables (app degradation without these)
readonly RECOMMENDED_VARS=(
    "GROQ_API_KEY"
    "UPSTASH_REDIS_REST_URL"
    "UPSTASH_REDIS_REST_TOKEN"
    "CLOUDINARY_CLOUD_NAME"
    "NEXT_PUBLIC_SENTRY_DSN"
)

# Optional variables (features work without these)
readonly OPTIONAL_VARS=(
    "AMADEUS_CLIENT_ID"
    "GOOGLE_PLACES_API_KEY"
    "WHATSAPP_ACCESS_TOKEN"
    "WEATHER_API_KEY"
    "TRIPADVISOR_API_KEY"
)

################################################################################
# Utility Functions
################################################################################

# Get variable value from env file
get_env_value() {
    local var_name="$1"
    local value

    # Extract value, removing quotes and comments
    value=$(grep "^${var_name}=" "$ENV_FILE" 2>/dev/null | cut -d'=' -f2- | sed 's/^["'\'']//' | sed 's/["'\'']$//' | sed 's/#.*//' | xargs)

    echo "$value"
}

# Check if variable exists and is non-empty
var_exists() {
    local var_name="$1"
    local value
    value=$(get_env_value "$var_name")

    [[ -n "$value" ]]
}

# Validate URL format
validate_url() {
    local url="$1"
    local url_pattern='^(https?|postgresql|redis|wss?)://[a-zA-Z0-9.-]+(:[0-9]+)?(/.*)?(\?.*)?$'

    [[ "$url" =~ $url_pattern ]]
}

# Validate email format
validate_email() {
    local email="$1"
    local email_pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    [[ "$email" =~ $email_pattern ]]
}

# Check if string is a placeholder
is_placeholder() {
    local value="$1"
    local placeholder_patterns=(
        "REPLACE_WITH"
        "your_.*_here"
        "your-.*-here"
        "YOUR_.*_HERE"
        "TODO"
        "CHANGEME"
        "password"
        "secret_key_here"
    )

    for pattern in "${placeholder_patterns[@]}"; do
        if [[ "$value" =~ $pattern ]]; then
            return 0
        fi
    done

    return 1
}

# Validate secret strength (minimum length)
validate_secret_strength() {
    local secret="$1"
    local min_length="${2:-32}"

    [[ ${#secret} -ge $min_length ]]
}

# Check API key format
validate_api_key_format() {
    local key="$1"
    local prefix="$2"

    if [[ -n "$prefix" ]]; then
        [[ "$key" =~ ^${prefix}_ ]]
    else
        # Generic API key validation (at least 20 chars, alphanumeric)
        [[ ${#key} -ge 20 && "$key" =~ ^[a-zA-Z0-9_-]+$ ]]
    fi
}

################################################################################
# Validation Rules
################################################################################

# Rule 1: Check required variables exist
validate_required_vars() {
    log_section "Validating Required Variables"

    for var in "${REQUIRED_VARS[@]}"; do
        ((TOTAL++))

        if var_exists "$var"; then
            local value
            value=$(get_env_value "$var")

            if is_placeholder "$value"; then
                log_error "${var}: Contains placeholder value"
                VALIDATION_ERRORS+=("${var}: Placeholder value detected: ${value:0:50}...")
                ((ERRORS++))
            else
                log_success "${var}: Present and valid"
                VALIDATION_PASSED+=("${var}: Present")
                ((PASSED++))
            fi
        else
            log_error "${var}: MISSING (REQUIRED)"
            VALIDATION_ERRORS+=("${var}: Required variable is missing")
            ((ERRORS++))
        fi
    done
}

# Rule 2: Validate URL formats
validate_urls() {
    log_section "Validating URL Formats"

    local url_vars=(
        "NEXT_PUBLIC_APP_URL"
        "NEXT_PUBLIC_API_URL"
        "DATABASE_URL"
        "UPSTASH_REDIS_REST_URL"
        "AMADEUS_API_BASE_URL"
    )

    for var in "${url_vars[@]}"; do
        if var_exists "$var"; then
            ((TOTAL++))
            local url
            url=$(get_env_value "$var")

            if validate_url "$url"; then
                log_success "${var}: Valid URL format"
                VALIDATION_PASSED+=("${var}: Valid URL")
                ((PASSED++))
            else
                log_error "${var}: Invalid URL format: ${url}"
                VALIDATION_ERRORS+=("${var}: Invalid URL format")
                ((ERRORS++))
            fi
        fi
    done
}

# Rule 3: Validate email addresses
validate_emails() {
    log_section "Validating Email Addresses"

    local email_vars=(
        "RESEND_SUPPORT_EMAIL"
    )

    for var in "${email_vars[@]}"; do
        if var_exists "$var"; then
            ((TOTAL++))
            local email
            email=$(get_env_value "$var")

            # Extract email from "Name <email>" format
            email=$(echo "$email" | grep -oP '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' || echo "$email")

            if validate_email "$email"; then
                log_success "${var}: Valid email format"
                VALIDATION_PASSED+=("${var}: Valid email")
                ((PASSED++))
            else
                log_error "${var}: Invalid email format: ${email}"
                VALIDATION_ERRORS+=("${var}: Invalid email format")
                ((ERRORS++))
            fi
        fi
    done
}

# Rule 4: Validate secret strength
validate_secrets() {
    log_section "Validating Secret Strength"

    local secret_vars=(
        "NEXTAUTH_SECRET:32"
        "JWT_SECRET:64"
        "REFRESH_SECRET:64"
        "CRON_SECRET:32"
    )

    for entry in "${secret_vars[@]}"; do
        local var="${entry%%:*}"
        local min_length="${entry##*:}"

        if var_exists "$var"; then
            ((TOTAL++))
            local secret
            secret=$(get_env_value "$var")

            if ! is_placeholder "$secret" && validate_secret_strength "$secret" "$min_length"; then
                log_success "${var}: Strong secret (${#secret} chars >= ${min_length})"
                VALIDATION_PASSED+=("${var}: Strong secret")
                ((PASSED++))
            else
                if is_placeholder "$secret"; then
                    log_error "${var}: Placeholder detected"
                    VALIDATION_ERRORS+=("${var}: Secret is a placeholder")
                    ((ERRORS++))
                else
                    log_warning "${var}: Weak secret (${#secret} chars < ${min_length})"
                    VALIDATION_WARNINGS+=("${var}: Secret too short")
                    ((WARNINGS++))
                fi
            fi
        fi
    done
}

# Rule 5: Validate API key formats
validate_api_keys() {
    log_section "Validating API Key Formats"

    local api_keys=(
        "STRIPE_SECRET_KEY:sk_"
        "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:pk_"
        "RESEND_API_KEY:re_"
        "GROQ_API_KEY:gsk_"
        "OPENAI_API_KEY:sk-"
    )

    for entry in "${api_keys[@]}"; do
        local var="${entry%%:*}"
        local prefix="${entry##*:}"

        if var_exists "$var"; then
            ((TOTAL++))
            local key
            key=$(get_env_value "$var")

            if ! is_placeholder "$key" && validate_api_key_format "$key" "$prefix"; then
                log_success "${var}: Valid API key format"
                VALIDATION_PASSED+=("${var}: Valid API key")
                ((PASSED++))
            else
                if is_placeholder "$key"; then
                    log_warning "${var}: Placeholder value (expected in initial setup)"
                    VALIDATION_WARNINGS+=("${var}: API key is placeholder")
                    ((WARNINGS++))
                else
                    log_error "${var}: Invalid API key format (expected prefix: ${prefix})"
                    VALIDATION_ERRORS+=("${var}: Invalid API key format")
                    ((ERRORS++))
                fi
            fi
        fi
    done
}

# Rule 6: Validate recommended variables
validate_recommended_vars() {
    log_section "Checking Recommended Variables"

    for var in "${RECOMMENDED_VARS[@]}"; do
        ((TOTAL++))

        if var_exists "$var"; then
            local value
            value=$(get_env_value "$var")

            if ! is_placeholder "$value"; then
                log_success "${var}: Configured"
                VALIDATION_PASSED+=("${var}: Recommended var present")
                ((PASSED++))
            else
                log_warning "${var}: Present but contains placeholder"
                VALIDATION_WARNINGS+=("${var}: Recommended var has placeholder")
                ((WARNINGS++))
            fi
        else
            log_warning "${var}: Not configured (recommended for production)"
            VALIDATION_WARNINGS+=("${var}: Recommended var missing")
            ((WARNINGS++))
        fi
    done
}

# Rule 7: Security checks
validate_security() {
    log_section "Security Validation"

    # Check NODE_ENV is production
    ((TOTAL++))
    if [[ "$(get_env_value 'NODE_ENV')" == "production" ]]; then
        log_success "NODE_ENV: Correctly set to 'production'"
        VALIDATION_PASSED+=("NODE_ENV: Set to production")
        ((PASSED++))
    else
        log_error "NODE_ENV: Must be 'production' (currently: $(get_env_value 'NODE_ENV'))"
        VALIDATION_ERRORS+=("NODE_ENV: Not set to production")
        ((ERRORS++))
    fi

    # Check for test/development API keys in production
    local test_patterns=("test" "dev" "sandbox" "demo")

    for var in "STRIPE_SECRET_KEY" "STRIPE_WEBHOOK_SECRET"; do
        if var_exists "$var"; then
            ((TOTAL++))
            local value
            value=$(get_env_value "$var")

            local is_test=false
            for pattern in "${test_patterns[@]}"; do
                if [[ "$value" =~ $pattern ]]; then
                    is_test=true
                    break
                fi
            done

            if [[ "$is_test" == true ]]; then
                log_error "${var}: Using test/sandbox credentials in production!"
                VALIDATION_ERRORS+=("${var}: Test credentials detected in production")
                ((ERRORS++))
            else
                log_success "${var}: Production credentials detected"
                VALIDATION_PASSED+=("${var}: Production credentials")
                ((PASSED++))
            fi
        fi
    done

    # Check Stripe live mode
    ((TOTAL++))
    if var_exists "STRIPE_SECRET_KEY"; then
        local stripe_key
        stripe_key=$(get_env_value "STRIPE_SECRET_KEY")

        if [[ "$stripe_key" =~ ^sk_live_ ]]; then
            log_success "STRIPE_SECRET_KEY: Using LIVE mode (correct for production)"
            VALIDATION_PASSED+=("Stripe: Live mode enabled")
            ((PASSED++))
        else
            log_error "STRIPE_SECRET_KEY: Not using LIVE mode! (starts with: ${stripe_key:0:7})"
            VALIDATION_ERRORS+=("Stripe: Not in live mode")
            ((ERRORS++))
        fi
    fi
}

################################################################################
# Report Generation
################################################################################

generate_html_report() {
    local report_file="${REPORT_DIR}/validation-report-$(date +%Y%m%d_%H%M%S).html"

    mkdir -p "$REPORT_DIR"

    cat > "$report_file" << HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AILYDIAN Environment Validation Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2rem;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .timestamp { opacity: 0.9; font-size: 0.9rem; }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            padding: 2rem;
            background: #f8f9fa;
        }
        .metric {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .metric-value {
            font-size: 3rem;
            font-weight: bold;
            margin: 0.5rem 0;
        }
        .metric-label { color: #666; font-size: 0.9rem; text-transform: uppercase; }
        .passed .metric-value { color: #10b981; }
        .warnings .metric-value { color: #f59e0b; }
        .errors .metric-value { color: #ef4444; }
        .total .metric-value { color: #6366f1; }
        .section {
            padding: 2rem;
            border-top: 1px solid #e5e7eb;
        }
        h2 {
            color: #1f2937;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        .item {
            padding: 1rem;
            margin: 0.5rem 0;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .item.success {
            background: #d1fae5;
            border-left: 4px solid #10b981;
        }
        .item.warning {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
        }
        .item.error {
            background: #fee2e2;
            border-left: 4px solid #ef4444;
        }
        .icon {
            font-size: 1.2rem;
            font-weight: bold;
        }
        .icon.success { color: #10b981; }
        .icon.warning { color: #f59e0b; }
        .icon.error { color: #ef4444; }
        footer {
            background: #f8f9fa;
            padding: 1.5rem;
            text-align: center;
            color: #666;
            font-size: 0.9rem;
        }
        .status-badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 1rem;
        }
        .status-pass { background: #10b981; color: white; }
        .status-warn { background: #f59e0b; color: white; }
        .status-fail { background: #ef4444; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Environment Validation Report</h1>
            <p class="timestamp">Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")</p>
            <p class="timestamp">File: ${ENV_FILE}</p>
HTML

    # Determine overall status
    local status_badge=""
    if [[ $ERRORS -eq 0 && $WARNINGS -eq 0 ]]; then
        status_badge='<span class="status-badge status-pass">✓ ALL CHECKS PASSED</span>'
    elif [[ $ERRORS -eq 0 ]]; then
        status_badge='<span class="status-badge status-warn">⚠ PASSED WITH WARNINGS</span>'
    else
        status_badge='<span class="status-badge status-fail">✗ VALIDATION FAILED</span>'
    fi

    cat >> "$report_file" << HTML
            ${status_badge}
        </header>

        <div class="summary">
            <div class="metric total">
                <div class="metric-label">Total Checks</div>
                <div class="metric-value">${TOTAL}</div>
            </div>
            <div class="metric passed">
                <div class="metric-label">Passed</div>
                <div class="metric-value">${PASSED}</div>
            </div>
            <div class="metric warnings">
                <div class="metric-label">Warnings</div>
                <div class="metric-value">${WARNINGS}</div>
            </div>
            <div class="metric errors">
                <div class="metric-label">Errors</div>
                <div class="metric-value">${ERRORS}</div>
            </div>
        </div>
HTML

    # Errors section
    if [[ ${#VALIDATION_ERRORS[@]} -gt 0 ]]; then
        cat >> "$report_file" << HTML
        <div class="section">
            <h2>Errors (${#VALIDATION_ERRORS[@]})</h2>
HTML
        for error in "${VALIDATION_ERRORS[@]}"; do
            echo "            <div class=\"item error\"><span class=\"icon error\">✗</span><span>${error}</span></div>" >> "$report_file"
        done
        echo "        </div>" >> "$report_file"
    fi

    # Warnings section
    if [[ ${#VALIDATION_WARNINGS[@]} -gt 0 ]]; then
        cat >> "$report_file" << HTML
        <div class="section">
            <h2>Warnings (${#VALIDATION_WARNINGS[@]})</h2>
HTML
        for warning in "${VALIDATION_WARNINGS[@]}"; do
            echo "            <div class=\"item warning\"><span class=\"icon warning\">⚠</span><span>${warning}</span></div>" >> "$report_file"
        done
        echo "        </div>" >> "$report_file"
    fi

    # Passed section
    if [[ ${#VALIDATION_PASSED[@]} -gt 0 ]]; then
        cat >> "$report_file" << HTML
        <div class="section">
            <h2>Passed Checks (${#VALIDATION_PASSED[@]})</h2>
HTML
        for passed in "${VALIDATION_PASSED[@]}"; do
            echo "            <div class=\"item success\"><span class=\"icon success\">✓</span><span>${passed}</span></div>" >> "$report_file"
        done
        echo "        </div>" >> "$report_file"
    fi

    cat >> "$report_file" << HTML
        <footer>
            <p>AILYDIAN Travel Platform - Environment Validation System</p>
            <p>© $(date +%Y) - Enterprise-Grade Production Deployment</p>
        </footer>
    </div>
</body>
</html>
HTML

    log_success "HTML Report generated: ${report_file}"
    echo "$report_file"
}

################################################################################
# Main Execution
################################################################################

main() {
    log_section "AILYDIAN Environment Validator v2.0"

    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --file)
                ENV_FILE="$2"
                shift 2
                ;;
            --strict)
                STRICT_MODE=true
                shift
                ;;
            --report)
                GENERATE_REPORT=true
                shift
                ;;
            --help|-h)
                echo "Usage: $0 [OPTIONS]"
                echo ""
                echo "Options:"
                echo "  --file PATH        Path to .env file (default: .env.vercel.production)"
                echo "  --strict           Fail on warnings (exit code 1)"
                echo "  --report           Generate HTML report"
                echo "  --help, -h         Show this help message"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done

    # Check if env file exists
    if [[ ! -f "$ENV_FILE" ]]; then
        log_error "Environment file not found: ${ENV_FILE}"
        log_info "Run: ./scripts/env-setup.sh to generate it"
        exit 1
    fi

    log_info "Validating: ${ENV_FILE}"
    echo ""

    # Run all validation rules
    validate_required_vars
    validate_urls
    validate_emails
    validate_secrets
    validate_api_keys
    validate_recommended_vars
    validate_security

    # Display summary
    log_section "Validation Summary"

    echo -e "${CYAN}Total Checks:${NC} $TOTAL"
    echo -e "${GREEN}Passed:${NC}       $PASSED"
    echo -e "${YELLOW}Warnings:${NC}     $WARNINGS"
    echo -e "${RED}Errors:${NC}       $ERRORS"
    echo ""

    # Calculate pass percentage
    local pass_percentage=$((PASSED * 100 / TOTAL))
    echo -e "${CYAN}Pass Rate:${NC}    ${pass_percentage}%"
    echo ""

    # Generate report if requested
    if [[ "$GENERATE_REPORT" == true ]]; then
        local report_path
        report_path=$(generate_html_report)
        log_info "Open report: file://${report_path}"
    fi

    # Determine exit code
    if [[ $ERRORS -gt 0 ]]; then
        log_error "Validation FAILED with ${ERRORS} error(s)"
        exit 1
    elif [[ $WARNINGS -gt 0 ]]; then
        log_warning "Validation PASSED with ${WARNINGS} warning(s)"
        if [[ "$STRICT_MODE" == true ]]; then
            log_error "Strict mode enabled: Warnings treated as errors"
            exit 1
        fi
        exit 0
    else
        log_success "Validation PASSED - All checks successful!"
        exit 0
    fi
}

# Run main function
main "$@"
