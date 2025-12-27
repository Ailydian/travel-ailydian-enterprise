# Pull Request

## 📝 Description

<!-- Brief description of the changes -->

## 🎯 Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🎨 Design system change (token addition, component update)
- [ ] ♻️ Refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] 🔧 Configuration change

## 🎨 Design System Compliance (MANDATORY)

### Color Usage
- [ ] ✅ No raw Tailwind colors used (`text-gray-*`, `bg-blue-*`, etc.)
- [ ] ✅ Only `lydian-*` tokens used for all colors
- [ ] ✅ No inline styles (`style={{...}}`)
- [ ] ✅ Gradients use lydian tokens (`from-lydian-primary`, etc.)

### Component Usage
- [ ] ✅ Uses existing components where applicable (Button, Card, etc.)
- [ ] ✅ No duplicate component implementations
- [ ] ✅ Component props are properly typed

### Build Status
- [ ] ✅ `npm run build` passes without ESLint violations
- [ ] ✅ No TypeScript errors
- [ ] ✅ No console warnings

## 🧪 Testing

- [ ] Tested on Chrome
- [ ] Tested on Safari
- [ ] Tested on Firefox
- [ ] Tested on mobile (responsive)
- [ ] Tested hover states
- [ ] Tested loading states
- [ ] Tested error states

## 📱 Screenshots

<!-- Add screenshots of UI changes if applicable -->

**Before:**


**After:**


## 🔗 Related Issues

<!-- Link related issues here -->
Closes #

## ✅ Checklist for All PRs

### Code Quality
- [ ] Code follows project style guidelines
- [ ] No `any` types in TypeScript
- [ ] Meaningful variable/function names
- [ ] Comments added for complex logic
- [ ] No commented-out code
- [ ] No unnecessary console.logs

### Accessibility
- [ ] Proper semantic HTML elements
- [ ] ARIA attributes where needed
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA

### Performance
- [ ] Images optimized (WebP format preferred)
- [ ] No unnecessary re-renders
- [ ] Lazy loading implemented where applicable
- [ ] No blocking operations

### Security
- [ ] No hardcoded secrets/API keys
- [ ] Input validation implemented
- [ ] XSS protection considered
- [ ] No SQL injection vulnerabilities

## 📋 Additional Checklist for New Components

- [ ] Component uses design tokens exclusively
- [ ] Component has JSDoc documentation
- [ ] Component has proper TypeScript interface
- [ ] Component supports variants (size, color, etc.)
- [ ] Component is reusable (not page-specific)
- [ ] Component has proper prop validation
- [ ] Component handles error cases gracefully

## 📋 Additional Checklist for Token Changes

- [ ] Token has semantic name (not color-based)
- [ ] Token is used in 3+ locations
- [ ] Token has JSDoc documentation
- [ ] All variants included (hover, active, light, etc.)
- [ ] `flattenColorTokens()` function updated
- [ ] `DESIGN_SYSTEM.md` documentation updated
- [ ] Token addition proposal issue created (#)

## 📋 Additional Checklist for New Pages

- [ ] Page uses design tokens exclusively
- [ ] Page is responsive (mobile, tablet, desktop)
- [ ] Page has proper SEO metadata (title, description)
- [ ] Page has proper i18n support (if applicable)
- [ ] Page loading states implemented
- [ ] Page error states implemented
- [ ] Page follows existing page structure

## 🚀 Deployment Notes

<!-- Any special deployment considerations -->

## 📖 Documentation

- [ ] README updated (if needed)
- [ ] DESIGN_SYSTEM.md updated (if tokens/components changed)
- [ ] API documentation updated (if API changed)
- [ ] Comments added for complex logic

## 🎓 Reviewer Notes

<!-- Any specific areas you want reviewers to focus on -->

---

## 🔍 For Reviewers

### Design System Review
1. Verify no raw Tailwind colors (`text-gray-*`, `bg-blue-*`)
2. Verify only `lydian-*` tokens used
3. Verify no inline styles
4. Run `npm run build` to check ESLint compliance

### Code Review
1. Check TypeScript types (no `any`)
2. Check for proper error handling
3. Check for accessibility (ARIA, semantic HTML)
4. Check for performance issues

### UI Review
1. Visual consistency with existing pages
2. Responsive design (mobile, tablet, desktop)
3. Hover/focus states
4. Loading/error states

---

**Note:** PRs that violate design system rules will be blocked until fixed. Build must pass ESLint checks for merge.
