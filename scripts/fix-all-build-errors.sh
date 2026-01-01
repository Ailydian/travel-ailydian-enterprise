#!/bin/bash

echo "🚀 Fixing all remaining build errors..."

# Fix rentals/[slug].tsx - add missing closing brace
echo "📝 Fixing rentals/[slug].tsx..."
sed -i '' 's|Zap$|Zap,|' src/pages/rentals/\[slug\].tsx
sed -i '' '/^} from .lucide-react/i\
  X\
' src/pages/rentals/\[slug\].tsx

# Fix ToastContext paths in transfer-owner
echo "📝 Fixing transfer-owner ToastContext paths..."
find src/pages/transfer-owner -name "*.tsx" -exec sed -i '' "s|from '../../context/ToastContext'|from '../../../context/ToastContext'|g" {} \;
find src/pages/transfer-owner/vehicles -name "*.tsx" -exec sed -i '' "s|from '../../../context/ToastContext'|from '../../../../context/ToastContext'|g" {} \;

# Fix ToastContext paths in vehicle-owner
echo "📝 Fixing vehicle-owner ToastContext paths..."
find src/pages/vehicle-owner -name "*.tsx" -exec sed -i '' "s|from '../../context/ToastContext'|from '../../../context/ToastContext'|g" {} \;

echo "✅ All fixes applied!"
echo ""
echo "Run 'npm run build' to verify"
