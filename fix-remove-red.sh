#!/bin/bash

# Remove all red colors - replace with purple/blue

echo "Removing all red colors..."

# Fix all files
find src/pages -name "*.tsx" \( -path "*/admin/*" -o -path "*/*owner/*" \) ! -name "*.pathbak*" ! -name "*.backup" -exec sed -i '' \
    -e 's/text-red-900/text-purple-300/g' \
    -e 's/text-red-800/text-purple-300/g' \
    -e 's/text-red-700/text-purple-400/g' \
    -e 's/text-red-600/text-purple-400/g' \
    -e 's/text-red-500/text-purple-400/g' \
    -e 's/text-red-400/text-purple-300/g' \
    -e 's/text-red-300/text-purple-300/g' \
    -e 's/text-red-200/text-purple-200/g' \
    -e 's/bg-red-900\/50/bg-purple-900\/50/g' \
    -e 's/bg-red-900/bg-purple-600/g' \
    -e 's/bg-red-800/bg-purple-600/g' \
    -e 's/bg-red-700/bg-purple-600/g' \
    -e 's/bg-red-600/bg-purple-600/g' \
    -e 's/bg-red-500/bg-purple-500/g' \
    -e 's/bg-red-200/bg-purple-500\/20/g' \
    -e 's/bg-red-100/bg-purple-500\/10/g' \
    -e 's/bg-red-50/bg-purple-500\/5/g' \
    -e 's/border-red-800/border-purple-600/g' \
    -e 's/border-red-700/border-purple-500/g' \
    -e 's/border-red-600/border-purple-600/g' \
    -e 's/border-red-500/border-purple-500/g' \
    -e 's/from-red-500/from-purple-500/g' \
    -e 's/from-red-600/from-purple-600/g' \
    -e 's/from-red-700/from-purple-700/g' \
    -e 's/to-red-600/to-purple-600/g' \
    -e 's/to-red-700/to-purple-700/g' \
    -e 's/to-rose-600/to-purple-600/g' \
    -e 's/hover:from-red-700/hover:from-purple-700/g' \
    -e 's/hover:to-red-700/hover:to-purple-700/g' \
    -e 's/hover:text-red-800/hover:text-purple-400/g' \
    -e 's/hover:text-red-900/hover:text-purple-400/g' \
    -e 's/hover:bg-red-200/hover:bg-purple-500\/20/g' \
    {} \;

echo ""
echo "Verifying no red colors remain..."
if grep -r "text-red\|bg-red\|border-red\|from-red\|to-red" src/pages --include="*.tsx" | grep -E "(owner|admin)" | grep -v "pathbak\|backup" | head -5; then
    echo ""
    echo "⚠️  Some red colors still remain - review manually"
else
    echo "✅ All red colors removed!"
fi

echo ""
echo "Done! 🎨"
