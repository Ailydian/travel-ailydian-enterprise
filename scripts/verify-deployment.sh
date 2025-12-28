#!/bin/bash

# ====================================================
# VERCEL DEPLOYMENT VERIFICATION SCRIPT
# ====================================================
# Usage: ./scripts/verify-deployment.sh

set -e

echo "🔍 Starting Deployment Verification..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if site is running
SITE_URL="${1:-https://travel.ailydian.com}"

echo "📡 Checking site availability: $SITE_URL"
if curl -s --head "$SITE_URL" | head -n 1 | grep "HTTP" > /dev/null; then
  echo -e "${GREEN}✅ Site is accessible${NC}"
else
  echo -e "${RED}❌ Site is not accessible${NC}"
  exit 1
fi

echo ""
echo "🏥 Checking API health endpoint..."
HEALTH_RESPONSE=$(curl -s "$SITE_URL/api/health" || echo "{}")
if echo "$HEALTH_RESPONSE" | grep -q "healthy\|ok\|success"; then
  echo -e "${GREEN}✅ API health check passed${NC}"
  echo "   Response: $HEALTH_RESPONSE"
else
  echo -e "${YELLOW}⚠️  API health check failed or not available${NC}"
  echo "   Response: $HEALTH_RESPONSE"
fi

echo ""
echo "🗄️ Checking database health..."
DB_HEALTH=$(curl -s "$SITE_URL/api/health/db" 2>/dev/null || echo "{}")
if echo "$DB_HEALTH" | grep -q "connected.*true\|healthy"; then
  echo -e "${GREEN}✅ Database connection healthy${NC}"
  echo "   Response: $DB_HEALTH"
else
  echo -e "${YELLOW}⚠️  Database check failed or not available${NC}"
  echo "   Response: $DB_HEALTH"
fi

echo ""
echo "🔐 Checking SSL certificate..."
if curl -s --head "$SITE_URL" | grep -q "HTTP/2\|HTTP/1.1"; then
  echo -e "${GREEN}✅ SSL certificate is valid${NC}"
else
  echo -e "${RED}❌ SSL certificate issue${NC}"
fi

echo ""
echo "📊 Checking critical pages..."

PAGES=(
  "/"
  "/tours"
  "/hotels"
  "/car-rentals"
  "/transfers"
)

for PAGE in "${PAGES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL$PAGE")
  if [ "$STATUS" -eq 200 ] || [ "$STATUS" -eq 301 ] || [ "$STATUS" -eq 302 ]; then
    echo -e "${GREEN}✅ $PAGE - HTTP $STATUS${NC}"
  else
    echo -e "${RED}❌ $PAGE - HTTP $STATUS${NC}"
  fi
done

echo ""
echo "🎯 Checking DNS resolution..."
if nslookup travel.ailydian.com > /dev/null 2>&1; then
  echo -e "${GREEN}✅ DNS resolution successful${NC}"
  nslookup travel.ailydian.com | grep -A 2 "Name:"
else
  echo -e "${YELLOW}⚠️  DNS resolution issue${NC}"
fi

echo ""
echo "📝 Summary:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Site URL: $SITE_URL"
echo "Timestamp: $(date)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo -e "${GREEN}🎉 Verification completed!${NC}"
echo ""
echo "Next steps:"
echo "1. Check Vercel logs: vercel logs"
echo "2. Monitor Sentry for errors"
echo "3. Test key user flows manually"
echo "4. Check Google Analytics tracking"
echo ""
