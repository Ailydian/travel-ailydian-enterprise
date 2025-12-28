#!/bin/bash

# ============================================
# VERCEL ENVIRONMENT AUTO-DEPLOYMENT SCRIPT
# ============================================
# MONITORING AGENT: AUTO-FIX FOR MISSING DIRECT_URL
# This script automatically deploys the missing DIRECT_URL to Vercel
# ============================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  VERCEL ENVIRONMENT AUTO-DEPLOYMENT (MONITORING AGENT) ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI not found${NC}"
    echo -e "${YELLOW}Installing Vercel CLI globally...${NC}"
    npm install -g vercel
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
fi

# Check if user is logged in to Vercel
echo -e "${BLUE}🔍 Checking Vercel authentication...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Vercel${NC}"
    echo -e "${BLUE}Please login to Vercel:${NC}"
    vercel login
fi

echo -e "${GREEN}✅ Vercel authentication verified${NC}"
echo ""

# Get project information
echo -e "${BLUE}📦 Fetching project information...${NC}"
PROJECT_NAME="travel-lydian-enterprise"

# Function to add/update environment variable
add_env_var() {
    local key=$1
    local value=$2
    local target=$3  # production, preview, or development

    echo -e "${BLUE}Setting ${key} for ${target}...${NC}"

    # Use Vercel CLI to add environment variable
    echo "$value" | vercel env add "$key" "$target" --force

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ ${key} set successfully for ${target}${NC}"
    else
        echo -e "${RED}❌ Failed to set ${key} for ${target}${NC}"
        return 1
    fi
}

# ============================================
# CRITICAL FIX: ADD DIRECT_URL
# ============================================

echo -e "${YELLOW}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${YELLOW}║  CRITICAL FIX: Adding DIRECT_URL                    ║${NC}"
echo -e "${YELLOW}╚════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo -e "${RED}❌ .env.production not found${NC}"
    echo -e "${YELLOW}Creating .env.production template...${NC}"
    cat > .env.production <<EOF
# Supabase Database URLs
# Replace with your actual Supabase connection strings
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres
EOF
    echo -e "${GREEN}✅ .env.production template created${NC}"
fi

# Read environment variables to deploy
echo -e "${BLUE}📝 Reading environment variables from .env.production...${NC}"

# Temporary workaround: Use same DATABASE_URL for DIRECT_URL if not set
if grep -q "DIRECT_URL=" .env.production; then
    DIRECT_URL_VALUE=$(grep "^DIRECT_URL=" .env.production | cut -d'=' -f2- | tr -d '"' | tr -d "'")
else
    # Extract DATABASE_URL and convert port from 6543 to 5432, remove pgbouncer
    DATABASE_URL_VALUE=$(grep "^DATABASE_URL=" .env.production | cut -d'=' -f2- | tr -d '"' | tr -d "'")
    DIRECT_URL_VALUE=$(echo "$DATABASE_URL_VALUE" | sed 's/:6543\//:5432\//g' | sed 's/?pgbouncer=true//g')
fi

# Check if DIRECT_URL looks valid (contains postgresql://)
if [[ "$DIRECT_URL_VALUE" == *"postgresql://"* ]]; then
    echo -e "${GREEN}✅ DIRECT_URL found in .env.production${NC}"
    echo -e "${BLUE}Value: ${DIRECT_URL_VALUE:0:50}...${NC}"
else
    echo -e "${YELLOW}⚠️  DIRECT_URL not properly configured in .env.production${NC}"
    echo -e "${YELLOW}Please configure your Supabase database first:${NC}"
    echo -e "${BLUE}1. Go to: https://supabase.com/dashboard${NC}"
    echo -e "${BLUE}2. Create/select your project${NC}"
    echo -e "${BLUE}3. Go to Settings > Database${NC}"
    echo -e "${BLUE}4. Copy the connection string (port 5432 for DIRECT_URL)${NC}"
    echo ""

    # Provide interactive prompt
    read -p "Do you want to enter DIRECT_URL manually now? (y/n): " choice
    if [[ $choice == "y" || $choice == "Y" ]]; then
        echo -e "${BLUE}Enter your DIRECT_URL (Supabase direct connection - port 5432):${NC}"
        read -r DIRECT_URL_VALUE
    else
        echo -e "${YELLOW}Skipping DIRECT_URL deployment. Please configure manually:${NC}"
        echo -e "${BLUE}Run: vercel env add DIRECT_URL production${NC}"
        exit 0
    fi
fi

# Deploy DIRECT_URL to Vercel for all environments
echo ""
echo -e "${BLUE}🚀 Deploying DIRECT_URL to Vercel...${NC}"
echo ""

# Production
add_env_var "DIRECT_URL" "$DIRECT_URL_VALUE" "production"

# Preview (optional)
echo ""
read -p "Also deploy to Preview environment? (y/n): " deploy_preview
if [[ $deploy_preview == "y" || $deploy_preview == "Y" ]]; then
    add_env_var "DIRECT_URL" "$DIRECT_URL_VALUE" "preview"
fi

# Development (optional)
echo ""
read -p "Also deploy to Development environment? (y/n): " deploy_dev
if [[ $deploy_dev == "y" || $deploy_dev == "Y" ]]; then
    add_env_var "DIRECT_URL" "$DIRECT_URL_VALUE" "development"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ DIRECT_URL DEPLOYED SUCCESSFULLY                ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════╝${NC}"
echo ""

# ============================================
# TRIGGER VERCEL REDEPLOY
# ============================================

echo -e "${BLUE}🔄 Triggering Vercel re-deployment...${NC}"
echo ""

read -p "Trigger production deployment now? (y/n): " trigger_deploy
if [[ $trigger_deploy == "y" || $trigger_deploy == "Y" ]]; then
    echo -e "${BLUE}Deploying to production...${NC}"
    vercel --prod
    echo -e "${GREEN}✅ Deployment triggered${NC}"
else
    echo -e "${YELLOW}ℹ️  Skipping deployment. You can trigger manually:${NC}"
    echo -e "${BLUE}   git push origin main${NC}"
    echo -e "${BLUE}   or${NC}"
    echo -e "${BLUE}   vercel --prod${NC}"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  🎉 MONITORING AGENT: AUTO-FIX COMPLETE             ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Monitor deployment: ${YELLOW}https://vercel.com/dashboard${NC}"
echo -e "2. Verify build succeeds with new DIRECT_URL"
echo -e "3. Check production site: ${YELLOW}https://travel.ailydian.com${NC}"
echo ""

echo -e "${GREEN}✅ Auto-fix script completed successfully${NC}"
