# Claude Code Configuration - Travel.Ailydian.com

## 🎯 Active Directives

This project has the following Claude Code directives **permanently active**:

### 1. **CLAUDE.md** - Core Engineering Standards
📍 Location: `/CLAUDE.md`

**Purpose:** Production-grade code standards, zero tolerance for mediocrity

**Key Rules:**
- 100% real code policy (no placeholders)
- Algorithmic excellence (optimal Big-O)
- SOLID principles mandatory
- Type-safe everywhere
- Enterprise-level security

**Always Active:** ✅ Yes

---

### 2. **CLAUDE.EKIP.AGENT.md** - Agent Ecosystem
📍 Location: `/CLAUDE.EKIP.AGENT.md`

**Purpose:** 35 specialized agents + 1 master orchestrator for complex tasks

**Agent Categories:**
- Engineering (6 agents)
- Product (3 agents)
- Marketing (7 agents)
- Design (5 agents)
- Project Management (3 agents)
- Studio Operations (5 agents)
- Testing (5 agents)

**Always Active:** ✅ Yes

---

### 3. **Global Agent Files**
📍 Location: `~/.claude/agents/`

**Purpose:** Detailed agent specifications for each specialist

**Structure:**
```
~/.claude/agents/
├── MASTER-ORCHESTRATOR.md
├── engineering/
├── product/
├── marketing/
├── design/
├── project-management/
├── studio-operations/
└── testing/
```

**Always Active:** ✅ Yes (loaded from global directory)

---

## 🚀 How It Works

### Automatic Activation

When you start Claude Code in this project:

1. **Claude reads `/CLAUDE.md`** → Core standards loaded
2. **Claude reads `/CLAUDE.EKIP.AGENT.md`** → Agent system loaded
3. **Claude scans `~/.claude/agents/`** → Specialist agents available

**Result:** All directives are **automatically active**, no manual activation needed.

---

## 🎭 Using Agents

### Automatic Agent Selection
```bash
# Claude auto-selects best agent
claude "API endpoint tasarla"  # → backend-architect
claude "UI component yap"       # → frontend-developer
claude "SEO optimize et"        # → seo-optimizer
```

### Explicit Agent Call
```bash
# Direct agent invocation
/agent engineering/frontend-developer "Dashboard component"
/agent testing/performance-benchmarker "Load test API"
/agent marketing/growth-hacker "Viral campaign ideas"
```

### Multi-Agent Coordination
```bash
# Complex tasks requiring multiple agents
"MASTER-ORCHESTRATOR: Design, implement, and test new payment flow"
"MASTER-ORCHESTRATOR: Marketing + Design koordineli landing page kampanyası"
```

---

## 📋 Project Standards (Always Enforced)

### Code Quality
- ✅ Zero placeholders/TODOs in production code
- ✅ TypeScript strict mode
- ✅ ESLint compliance (design system rules active)
- ✅ Tailwind design tokens (`lydian-*` only)

### Testing
- ✅ Build must pass (0 errors)
- ✅ Performance: <100ms API responses
- ✅ Bundle optimization
- ✅ Lighthouse 95+ scores

### Security
- ✅ No hardcoded secrets
- ✅ Input validation mandatory
- ✅ SQL injection prevention
- ✅ XSS protection

### Documentation
- ✅ JSDoc for public APIs
- ✅ README updates when needed
- ✅ Architecture decision records
- ✅ Inline comments for complex logic

---

## 🔄 Directive Hierarchy

```
Level 1: CLAUDE.md (Core Standards)
   ↓
Level 2: CLAUDE.EKIP.AGENT.md (Agent System)
   ↓
Level 3: ~/.claude/agents/* (Specialist Agents)
   ↓
Level 4: Project-specific docs (Implementation)
```

**All levels are complementary, not conflicting.**

---

## 🛡️ Enforcement Guarantees

### Build-Time Enforcement
- ESLint blocks raw Tailwind colors
- TypeScript enforces type safety
- Git hooks prevent broken commits

### Runtime Guarantees
- Error boundaries for React components
- Retry mechanisms for APIs
- Circuit breakers for external services

### Agent Enforcement
- All agents follow CLAUDE.md standards
- Cross-agent consistency validated
- MASTER-ORCHESTRATOR resolves conflicts

---

## 📊 Success Metrics

### Code Quality
- Build success rate: **100%**
- Test coverage: **>90%**
- Design token compliance: **100%**

### Performance
- API response time: **<100ms (p95)**
- Bundle size: **Optimized**
- Lighthouse score: **95+**

### Developer Experience
- Agent response time: **Instant**
- Documentation clarity: **High**
- Onboarding time: **<1 hour**

---

## 🎯 Quick Reference

### Most Used Agents
```bash
# Development
/agent engineering/frontend-developer
/agent engineering/backend-architect
/agent engineering/fullstack-engineer

# Testing
/agent testing/performance-benchmarker
/agent testing/api-tester

# Design
/agent design/ui-designer
/agent design/ux-researcher

# Marketing
/agent marketing/growth-hacker
/agent marketing/seo-optimizer
```

### Emergency Protocols
```bash
# Production issues
"MASTER-ORCHESTRATOR: Production down - immediate response"

# Security incidents
"MASTER-ORCHESTRATOR: Security breach - incident response"

# Critical bugs
"MASTER-ORCHESTRATOR: Critical bug - hotfix needed"
```

---

## 📚 Documentation Files

**In Project Root:**
- `/CLAUDE.md` - Core standards ✅
- `/CLAUDE.EKIP.AGENT.md` - Agent system ✅
- `/DESIGN_SYSTEM.md` - Design tokens (1,650 lines) ✅
- `/DESIGN_SYSTEM_REPORTS.md` - Sprint reports ✅
- `/.github/PULL_REQUEST_TEMPLATE.md` - PR checklist ✅

**Global:**
- `~/.claude/agents/` - All 36 agents ✅

---

## ✨ Auto-Activation Checklist

When you open this project, Claude Code automatically:

- ✅ Loads core engineering standards (CLAUDE.md)
- ✅ Activates agent ecosystem (CLAUDE.EKIP.AGENT.md)
- ✅ Connects to 36 specialist agents (~/.claude/agents/)
- ✅ Enforces design system tokens (ESLint rules)
- ✅ Applies security standards
- ✅ Monitors performance thresholds

**No manual setup needed. Everything is automatic.**

---

**Last Updated:** 2025-12-27
**Status:** ✅ All directives active and enforced
**Agent Count:** 36 (35 specialists + 1 orchestrator)

🤖 **Claude Code - Production Ready with Full Agent Ecosystem!**
