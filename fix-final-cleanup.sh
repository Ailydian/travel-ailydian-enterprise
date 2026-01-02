#!/bin/bash

# Final cleanup: Fix remaining lydian-bg and other classes

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

echo "Final cleanup: Fixing remaining lydian classes..."

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        # Fix bg-lydian-bg variations
        sed -i '' 's/bg-lydian-bg\/95/bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900/g' "$file"
        sed -i '' 's/bg-lydian-bg\/90/bg-white\/10 backdrop-blur-xl border border-white\/20/g' "$file"
        sed -i '' 's/bg-lydian-bg\/80/bg-white\/10 backdrop-blur-xl/g' "$file"
        sed -i '' 's/bg-lydian-bg\/10/bg-white\/5/g' "$file"
        sed -i '' 's/bg-lydian-bg\/20/bg-white\/10/g' "$file"
        sed -i '' 's/bg-lydian-bg-surface/bg-white\/5/g' "$file"
        sed -i '' 's/hover:bg-lydian-bg-surface/hover:bg-white\/10/g' "$file"
        sed -i '' 's/ bg-lydian-bg/ bg-white\/5/g' "$file"

        # Fix lydian-glass variations
        sed -i '' 's/bg-lydian-glass-light\/60/bg-white\/15 backdrop-blur-xl/g' "$file"
        sed -i '' 's/bg-lydian-glass-light\/40/bg-white\/10 backdrop-blur-xl/g' "$file"
        sed -i '' 's/bg-lydian-glass-light\/20/bg-white\/5 backdrop-blur-xl/g' "$file"
        sed -i '' 's/hover:bg-lydian-glass-light\/60/hover:bg-white\/15/g' "$file"
        sed -i '' 's/hover:bg-lydian-glass-light\/40/hover:bg-white\/10/g' "$file"
        sed -i '' 's/bg-lydian-glass-dark\/30/bg-white\/5 backdrop-blur-xl/g' "$file"
        sed -i '' 's/bg-lydian-glass-dark\/50/bg-white\/10/g' "$file"

        # Fix lydian-accent
        sed -i '' 's/text-lydian-accent/text-blue-400/g' "$file"
        sed -i '' 's/hover:bg-lydian-accent/hover:bg-blue-500\/20/g' "$file"

        # Fix placeholder colors
        sed -i '' 's/placeholder-lydian-text-muted/placeholder-gray-400/g' "$file"

        # Fix focus ring colors
        sed -i '' 's/focus:ring-lydian-primary\/50/focus:ring-purple-500/g' "$file"

        # Fix shadow colors
        sed -i '' 's/hover:shadow-lydian-primary\/10/hover:shadow-purple-500\/10/g' "$file"

        # Fix border duplicates
        sed -i '' 's/border border-white\/20\/20/border border-white\/20/g' "$file"
        sed -i '' 's/border border-white\/20\/10/border border-white\/10/g' "$file"
        sed -i '' 's/border-white\/20 border-b border-white\/20/border-b border-white\/20/g' "$file"
        sed -i '' 's/bg-white\/10 backdrop-blur-xl border border-white\/20 border border-white\/20/bg-white\/10 backdrop-blur-xl border border-white\/20/g' "$file"
        sed -i '' 's/border-2 border-white\/20/border border-white\/20/g' "$file"

        echo "✓ $file"
    fi
done

echo ""
echo "Verifying final fixes..."
grep -r "lydian-" "${FILES[@]}" 2>/dev/null || echo "✓ All lydian classes removed!"

echo ""
echo "Complete! 🎉"
