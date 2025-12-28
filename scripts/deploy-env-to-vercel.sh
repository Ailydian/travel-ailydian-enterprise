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

