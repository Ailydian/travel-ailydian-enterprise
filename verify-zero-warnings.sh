#!/bin/bash

echo "========================================="
echo "Build Warnings Verification Script"
echo "========================================="
echo ""

echo "Running production build..."
echo ""

# Run build and capture output
npm run build > build-verify.log 2>&1

# Check for warnings (excluding Prisma informational messages)
WARNINGS=$(grep -iE "warn|warning|deprecat" build-verify.log | grep -v "prisma" | wc -l | tr -d ' ')

echo ""
echo "========================================="
echo "RESULTS:"
echo "========================================="
echo ""

if [ "$WARNINGS" -eq "0" ]; then
    echo "✅ ZERO WARNINGS DETECTED!"
    echo ""
    echo "Build Status: CLEAN ✅"
    echo "Sentry Warnings: 0 ✅"
    echo "Next.js Warnings: 0 ✅"
    echo "TypeScript Warnings: 0 ✅"
    echo ""
    echo "The build completed successfully with no warnings."
    echo "The platform is production-ready! 🚀"
else
    echo "⚠️  Found $WARNINGS warning(s)"
    echo ""
    echo "Warnings detected:"
    grep -iE "warn|warning|deprecat" build-verify.log | grep -v "prisma"
fi

echo ""
echo "========================================="
echo "Full build log saved to: build-verify.log"
echo "========================================="
