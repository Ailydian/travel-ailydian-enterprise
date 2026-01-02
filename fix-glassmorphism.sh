#!/bin/bash

# Comprehensive glassmorphism fix script for all admin/owner pages
# This script replaces broken Lydian classes with proper glassmorphism

# List of files to fix (excluding backups)
FILES=(
"src/pages/admin/dashboard.tsx"
"src/pages/admin/locations.tsx"
"src/pages/admin/platforms.tsx"
"src/pages/admin/reviews.tsx"
"src/pages/admin/users.tsx"
"src/pages/admin/v2/all-products.tsx"
"src/pages/admin/v2/analytics.tsx"
"src/pages/admin/v2/b2b.tsx"
"src/pages/admin/v2/car-rentals.tsx"
"src/pages/admin/v2/car-rentals/[id]/edit.tsx"
"src/pages/admin/v2/content.tsx"
"src/pages/admin/v2/index.tsx"
"src/pages/admin/v2/navigation.tsx"
"src/pages/admin/v2/products.tsx"
"src/pages/admin/v2/rental-properties.tsx"
"src/pages/admin/v2/rental-properties/[id]/edit.tsx"
"src/pages/admin/v2/settings.tsx"
"src/pages/admin/v2/tours.tsx"
"src/pages/admin/v2/transfers.tsx"
"src/pages/adminv2/index.tsx"
"src/pages/adminv2/media.tsx"
"src/pages/adminv2/tours/index.tsx"
"src/pages/commercial-vehicle-owner/auth/login.tsx"
"src/pages/commercial-vehicle-owner/auth/register.tsx"
"src/pages/commercial-vehicle-owner/index.tsx"
"src/pages/transfer-owner/auth/login.tsx"
"src/pages/transfer-owner/auth/register.tsx"
"src/pages/transfer-owner/auth/terms.tsx"
"src/pages/transfer-owner/drivers.tsx"
"src/pages/transfer-owner/vehicles/new/index.tsx"
"src/pages/vehicle-owner/auth/login.tsx"
"src/pages/vehicle-owner/auth/register.tsx"
"src/pages/vehicle-owner/auth/terms.tsx"
"src/pages/vehicle-owner/index.tsx"
"src/pages/vehicle-owner/settings.tsx"
"src/pages/vehicle-owner/vehicles/new/index.tsx"
)

echo "Starting glassmorphism fix for ${#FILES[@]} files..."

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing: $file"

        # Background classes
        sed -i '' 's/className="bg-lydian-glass-dark"/className="bg-white\/10 backdrop-blur-xl border border-white\/20"/g' "$file"
        sed -i '' 's/className="bg-lydian-glass-dark /className="bg-white\/10 backdrop-blur-xl border border-white\/20 /g' "$file"
        sed -i '' 's/bg-lydian-glass-dark"/bg-white\/10 backdrop-blur-xl border border-white\/20"/g' "$file"
        sed -i '' 's/ bg-lydian-glass-dark / bg-white\/10 backdrop-blur-xl border border-white\/20 /g' "$file"

        sed -i '' 's/bg-lydian-bg-hover/bg-white\/10 backdrop-blur-xl border border-white\/20/g' "$file"
        sed -i '' 's/bg-lydian-bg-active/bg-white\/20/g' "$file"
        sed -i '' 's/bg-lydian-bg-surface-raised/bg-white\/5 backdrop-blur-xl/g' "$file"
        sed -i '' 's/bg-lydian-glass-dark-medium/bg-white\/5/g' "$file"

        # Text colors
        sed -i '' 's/text-lydian-text-inverse/text-white/g' "$file"
        sed -i '' 's/text-lydian-text-muted/text-gray-300/g' "$file"
        sed -i '' 's/text-lydian-text-dim/text-gray-400/g' "$file"
        sed -i '' 's/text-lydian-text-primary/text-white/g' "$file"
        sed -i '' 's/text-lydian-text-secondary/text-gray-300/g' "$file"

        # Border colors
        sed -i '' 's/border-lydian-border-light/border-white\/20/g' "$file"
        sed -i '' 's/border-lydian-border/border-white\/20/g' "$file"
        sed -i '' 's/focus:border-lydian-border/focus:border-purple-500/g' "$file"

        # Remove red colors - replace with blue/purple
        sed -i '' 's/text-red-600/text-purple-400/g' "$file"
        sed -i '' 's/text-red-500/text-purple-400/g' "$file"
        sed -i '' 's/text-red-400/text-purple-300/g' "$file"
        sed -i '' 's/bg-red-600/bg-purple-600/g' "$file"
        sed -i '' 's/bg-red-500/bg-purple-500/g' "$file"
        sed -i '' 's/bg-red-50/bg-purple-500\/20/g' "$file"
        sed -i '' 's/bg-red-100/bg-purple-500\/30/g' "$file"
        sed -i '' 's/border-red-600/border-purple-600/g' "$file"
        sed -i '' 's/border-red-500/border-purple-500/g' "$file"
        sed -i '' 's/border-red-200/border-purple-400/g' "$file"
        sed -i '' 's/from-red-600/from-purple-600/g' "$file"
        sed -i '' 's/to-red-600/to-purple-600/g' "$file"

        # Fix success/warning colors to blue/purple
        sed -i '' 's/text-lydian-success/text-purple-400/g' "$file"
        sed -i '' 's/text-lydian-warning/text-blue-400/g' "$file"
        sed -i '' 's/text-lydian-error/text-gray-400/g' "$file"
        sed -i '' 's/bg-lydian-success/bg-purple-500/g' "$file"
        sed -i '' 's/bg-lydian-warning/bg-blue-500/g' "$file"
        sed -i '' 's/bg-lydian-error/bg-gray-500/g' "$file"
        sed -i '' 's/bg-lydian-success-lighter/bg-purple-500\/20/g' "$file"

        # Fix green colors to purple/blue
        sed -i '' 's/text-green-600/text-purple-400/g' "$file"
        sed -i '' 's/text-green-500/text-purple-400/g' "$file"
        sed -i '' 's/text-green-800/text-purple-300/g' "$file"
        sed -i '' 's/bg-green-50/bg-purple-500\/20/g' "$file"
        sed -i '' 's/bg-green-100/bg-purple-500\/30/g' "$file"
        sed -i '' 's/border-green-200/border-purple-400/g' "$file"
        sed -i '' 's/from-green-600/from-blue-600/g' "$file"

        # Fix yellow colors to blue
        sed -i '' 's/bg-yellow-50/bg-blue-500\/20/g' "$file"
        sed -i '' 's/border-yellow-200/border-blue-400/g' "$file"

        echo "✓ Fixed: $file"
    else
        echo "✗ Not found: $file"
    fi
done

echo ""
echo "Glassmorphism fix complete!"
echo "Verifying no broken classes remain..."
echo ""

# Verify no broken classes remain
echo "=== Checking for remaining lydian classes ==="
grep -r "bg-lydian-glass-dark\|bg-lydian-bg-active\|bg-lydian-bg-surface-raised\|bg-lydian-bg-hover\|text-lydian-\|border-lydian-" "${FILES[@]}" 2>/dev/null || echo "✓ No broken lydian classes found"

echo ""
echo "=== Checking for red colors ==="
grep -r "text-red-\|bg-red-\|border-red-\|from-red-\|to-red-" "${FILES[@]}" 2>/dev/null || echo "✓ No red colors found"

echo ""
echo "All done! 🎨"
