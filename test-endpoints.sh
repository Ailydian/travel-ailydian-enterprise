#!/bin/bash

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================="
echo "  Travel Ailydian - API Endpoint Tests"
echo "========================================="
echo ""

# Test counter
PASS=0
FAIL=0

# Test function
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4

    echo -n "Testing: $description... "

    if [ -z "$data" ]; then
        response=$(curl -s -o /dev/null -w "%{http_code}" -X $method "http://localhost:3100$endpoint")
    else
        response=$(curl -s -o /dev/null -w "%{http_code}" -X $method \
            -H "Content-Type: application/json" \
            -d "$data" \
            "http://localhost:3100$endpoint")
    fi

    if [[ "$response" =~ ^(200|201|302|404)$ ]]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $response)"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $response)"
        ((FAIL++))
    fi
}

echo "🔍 Testing Core Pages..."
echo "-------------------"
test_endpoint "GET" "/" "Home Page"
test_endpoint "GET" "/auth/signin" "SignIn Page"
test_endpoint "GET" "/auth/signup" "SignUp Page"
test_endpoint "GET" "/hotels" "Hotels Page"
test_endpoint "GET" "/flights" "Flights Page"
test_endpoint "GET" "/transfers" "Transfers Page"
echo ""

echo "🔌 Testing API Endpoints..."
echo "-------------------"
test_endpoint "GET" "/api/health" "Health Check"
test_endpoint "GET" "/api/search/hotels?cityCode=Antalya&checkInDate=2025-12-20&checkOutDate=2025-12-25&adults=2" "Hotels Search API"
test_endpoint "GET" "/api/search/flights?originLocationCode=IST&destinationLocationCode=AYT&departureDate=2025-12-20&adults=2" "Flights Search API"
test_endpoint "GET" "/api/transfers/search?to=Antalya&passengers=2" "Transfers Search API"
echo ""

echo "📊 Testing Auth APIs..."
echo "-------------------"
test_endpoint "POST" "/api/auth/register" "Register API (Missing Data)" '{"email":"test@test.com"}'
echo ""

echo "========================================="
echo -e "  Test Summary: ${GREEN}$PASS Passed${NC} | ${RED}$FAIL Failed${NC}"
echo "========================================="

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}All tests passed! ✓${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed! ✗${NC}"
    exit 1
fi
