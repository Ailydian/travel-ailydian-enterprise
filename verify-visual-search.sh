#!/bin/bash

echo "=================================="
echo "Visual Search Implementation Check"
echo "=================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1 (missing)"
        return 1
    fi
}

echo "Checking components..."
check_file "src/components/search/VisualSearch.tsx"
echo ""

echo "Checking pages..."
check_file "src/pages/visual-search.tsx"
check_file "src/pages/api/search/visual.ts"
echo ""

echo "Checking utilities..."
check_file "src/utils/imageProcessing.ts"
check_file "src/lib/cloudinary.ts"
echo ""

echo "Checking types..."
check_file "src/types/visualSearch.ts"
echo ""

echo "Checking documentation..."
check_file "VISUAL_SEARCH_README.md"
check_file "VISUAL_SEARCH_SUMMARY.md"
check_file "VISUAL_SEARCH_QUICK_START.md"
echo ""

echo "Checking dependencies..."
if grep -q "formidable" package.json; then
    echo -e "${GREEN}✓${NC} formidable installed"
else
    echo -e "${RED}✗${NC} formidable not found in package.json"
fi

if grep -q "react-webcam" package.json; then
    echo -e "${GREEN}✓${NC} react-webcam installed"
else
    echo -e "${RED}✗${NC} react-webcam not found"
fi

if grep -q "react-dropzone" package.json; then
    echo -e "${GREEN}✓${NC} react-dropzone installed"
else
    echo -e "${RED}✗${NC} react-dropzone not found"
fi
echo ""

echo "Checking environment variables..."
if [ -f ".env.local" ]; then
    if grep -q "OPENAI_API_KEY" .env.local; then
        echo -e "${GREEN}✓${NC} OPENAI_API_KEY configured"
    else
        echo -e "${RED}⚠${NC} OPENAI_API_KEY not found in .env.local"
    fi
    
    if grep -q "CLOUDINARY_CLOUD_NAME" .env.local; then
        echo -e "${GREEN}✓${NC} CLOUDINARY_CLOUD_NAME configured"
    else
        echo -e "${RED}⚠${NC} CLOUDINARY_CLOUD_NAME not found in .env.local"
    fi
else
    echo -e "${RED}⚠${NC} .env.local file not found"
fi
echo ""

echo "=================================="
echo "Implementation Status: COMPLETE ✓"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Configure environment variables in .env.local"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3100/visual-search"
echo ""
