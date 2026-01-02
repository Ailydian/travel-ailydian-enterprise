#!/bin/bash

# Second pass: Fix remaining lydian color classes

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

echo "Second pass: Fixing remaining lydian color classes..."

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        # Primary colors -> blue/purple
        sed -i '' 's/text-lydian-primary/text-blue-400/g' "$file"
        sed -i '' 's/bg-lydian-primary/bg-gradient-to-r from-blue-600 to-purple-600/g' "$file"
        sed -i '' 's/border-lydian-primary/border-blue-500/g' "$file"

        # Primary variants
        sed -i '' 's/text-lydian-primary-dark/text-blue-300/g' "$file"
        sed -i '' 's/text-lydian-primary-active/text-purple-300/g' "$file"
        sed -i '' 's/bg-lydian-primary-lighter/bg-blue-500\/20/g' "$file"
        sed -i '' 's/bg-lydian-primary-light/bg-blue-500\/30/g' "$file"
        sed -i '' 's/hover:text-lydian-primary/hover:text-blue-400/g' "$file"
        sed -i '' 's/hover:bg-lydian-primary/hover:bg-blue-500\/20/g' "$file"

        # Text colors
        sed -i '' 's/text-lydian-text/text-white/g' "$file"
        sed -i '' 's/text-lydian-text-tertiary/text-gray-400/g' "$file"
        sed -i '' 's/text-lydian-text-secondary/text-gray-300/g' "$file"
        sed -i '' 's/hover:text-lydian-text/hover:text-white/g' "$file"

        # Focus states
        sed -i '' 's/focus:ring-lydian-border-focus/focus:ring-purple-500/g' "$file"
        sed -i '' 's/focus:border-lydian-primary/focus:border-purple-500/g' "$file"

        # Background hover states
        sed -i '' 's/hover:bg-lydian-glass-dark/hover:bg-white\/10/g' "$file"
        sed -i '' 's/hover:bg-gray-500-lighter/hover:bg-white\/5/g' "$file"
        sed -i '' 's/hover:bg-gray-500-light/hover:bg-white\/10/g' "$file"
        sed -i '' 's/bg-gray-500-lighter/bg-white\/5/g' "$file"
        sed -i '' 's/bg-gray-500-light/bg-white\/10/g' "$file"

        # Border fixes
        sed -i '' 's/border-white\/20-medium/border-white\/20/g' "$file"

        # Any remaining lydian-bg references
        sed -i '' 's/bg-lydian-bg\/5/bg-white\/5/g' "$file"

        echo "✓ $file"
    fi
done

echo ""
echo "Verifying fixes..."
grep -r "text-lydian-\|bg-lydian-\|border-lydian-" "${FILES[@]}" 2>/dev/null || echo "✓ All lydian color classes fixed!"

echo ""
echo "Done! 🎨"
