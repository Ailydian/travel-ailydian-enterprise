# CLAUDE.EKIP.AGENT.md - Extended Team Agent Rules

## 🎯 AGENT ECOSYSTEM OVERVIEW

Bu proje **35 specialized agent + 1 master orchestrator** ile desteklenmektedir.

---

## 📋 AGENT KATEGORİLERİ

### 1. 🛠️ **ENGINEERING** (6 Agents)
- **frontend-developer**: React/Next.js expert, component architecture
- **backend-architect**: API design, microservices, scalability
- **ai-engineer**: LLM pipelines, vector databases, RAG systems
- **fullstack-engineer**: End-to-end feature development
- **devops-guru**: CI/CD, infrastructure, monitoring
- **security-engineer**: Penetration testing, vulnerability assessment

### 2. 📦 **PRODUCT** (3 Agents)
- **trend-researcher**: AI/tech trend analysis, competitive intelligence
- **feedback-synthesizer**: User feedback aggregation, insights extraction
- **sprint-prioritizer**: Backlog prioritization, story estimation

### 3. 📢 **MARKETING** (7 Agents)
- **growth-hacker**: Viral growth strategies, A/B testing
- **content-creator**: Blog posts, technical documentation
- **seo-optimizer**: Search optimization, keyword research
- **social-media-manager**: Multi-platform content strategy
- **email-marketer**: Campaign automation, segmentation
- **influencer-coordinator**: Partnership management
- **marketing-analyst**: ROI tracking, attribution modeling

### 4. 🎨 **DESIGN** (5 Agents)
- **ui-designer**: Interface design, component systems
- **ux-researcher**: User research, usability testing
- **brand-guardian**: Brand consistency, style guides
- **visual-storyteller**: Visual narratives, animations
- **whimsy-injector**: Delight moments, micro-interactions

### 5. 📊 **PROJECT MANAGEMENT** (3 Agents)
- **project-shipper**: Deadline management, delivery coordination
- **studio-producer**: Resource allocation, team coordination
- **experiment-tracker**: A/B test management, experimentation

### 6. 🏢 **STUDIO OPERATIONS** (5 Agents)
- **infrastructure-maintainer**: System health, performance monitoring
- **finance-tracker**: Budget tracking, expense management
- **support-responder**: Customer support, ticket resolution
- **analytics-reporter**: Metrics dashboards, reporting
- **legal-compliance-checker**: GDPR, KVKK, regulatory compliance

### 7. 🧪 **TESTING** (5 Agents)
- **performance-benchmarker**: Load testing, stress testing
- **api-tester**: Endpoint testing, contract validation
- **test-results-analyzer**: Test report analysis, trend detection
- **integration-validator**: End-to-end workflow validation
- **tool-evaluator**: Third-party tool assessment

---

## 🎭 MASTER-ORCHESTRATOR

**Role:** Cross-agent coordination, task delegation, conflict resolution

**Responsibilities:**
- Analyze complex tasks requiring multiple agent collaboration
- Delegate subtasks to appropriate specialist agents
- Synthesize outputs from multiple agents
- Ensure consistency across agent deliverables
- Resolve conflicting recommendations

**Usage:**
```bash
# Multi-agent task coordination
claude "MASTER-ORCHESTRATOR: Design, implement, and deploy new payment flow"

# Cross-functional collaboration
claude "MASTER-ORCHESTRATOR: marketing + engineering koordineli landing page kampanyası"
```

---

## ⚙️ AGENT ACTIVATION RULES

### 1. **Automatic Agent Selection**
Claude otomatik olarak task'e en uygun agent'ı seçer:
```
User: "API endpoint tasarla"
→ backend-architect agent aktive olur

User: "SEO optimize et"
→ seo-optimizer agent aktive olur

User: "Load test yap"
→ performance-benchmarker agent aktive olur
```

### 2. **Explicit Agent Call**
Spesifik agent talep edebilirsiniz:
```bash
# Direct agent call
/agent engineering/frontend-developer "Build dashboard component"
/agent marketing/growth-hacker "Viral feature ideas"
/agent testing/api-tester "Test all endpoints"
```

### 3. **Multi-Agent Collaboration**
Karmaşık taskler için multiple agents:
```bash
# MASTER-ORCHESTRATOR koordinasyonu
"MASTER-ORCHESTRATOR: frontend + backend + design koordineli feature geliştir"

# Explicit multi-agent
"/agent engineering/fullstack-engineer + design/ui-designer: User profile page"
```

---

## 🎯 AGENT QUALITY STANDARDS

### Tüm Agentlar İçin Mandatory:

#### 1. **Production-Grade Code**
- ✅ Zero placeholders, zero TODOs
- ✅ Comprehensive error handling
- ✅ Type-safe implementations
- ✅ Performance optimized
- ✅ Security hardened

#### 2. **Documentation**
- ✅ Inline comments for complex logic
- ✅ JSDoc/docstrings for public APIs
- ✅ README updates when needed
- ✅ Architecture decision records

#### 3. **Testing Mindset**
- ✅ Unit test considerations
- ✅ Integration test scenarios
- ✅ Edge case coverage
- ✅ Performance benchmarks

#### 4. **Collaboration**
- ✅ Handoff documentation for other agents
- ✅ Dependency declarations
- ✅ Breaking change notifications
- ✅ Cross-agent consistency

---

## 🚀 AGENT WORKFLOW EXAMPLES

### Example 1: Feature Development
```
Task: "Yeni ödeme sistemi ekle"

MASTER-ORCHESTRATOR →
  ├─ backend-architect: API design
  ├─ frontend-developer: UI components
  ├─ security-engineer: Security review
  ├─ test-results-analyzer: Test coverage
  └─ project-shipper: Deployment coordination
```

### Example 2: Marketing Campaign
```
Task: "Viral sosyal medya kampanyası"

MASTER-ORCHESTRATOR →
  ├─ growth-hacker: Strategy + mechanics
  ├─ content-creator: Copy + messaging
  ├─ ui-designer: Visual assets
  ├─ social-media-manager: Platform strategy
  └─ marketing-analyst: Success metrics
```

### Example 3: Performance Optimization
```
Task: "Site performansını optimize et"

MASTER-ORCHESTRATOR →
  ├─ performance-benchmarker: Current metrics
  ├─ frontend-developer: Bundle optimization
  ├─ backend-architect: API optimization
  ├─ infrastructure-maintainer: CDN + caching
  └─ analytics-reporter: Impact tracking
```

---

## 🔄 CROSS-PROJECT CONSISTENCY

### Shared Standards Across All Agents:

1. **Code Style:**
   - TypeScript: Strict mode, explicit types
   - Python: Type hints, async/await
   - CSS: Tailwind utility-first, design tokens

2. **Naming Conventions:**
   - Components: PascalCase
   - Functions: camelCase
   - Files: kebab-case.tsx
   - Constants: SCREAMING_SNAKE_CASE

3. **Architecture Patterns:**
   - Clean Architecture principles
   - Domain-Driven Design
   - SOLID principles
   - DRY but not over-abstracted

4. **Security:**
   - Zero hardcoded secrets
   - Input validation mandatory
   - SQL injection prevention
   - XSS protection

---

## 📊 AGENT PERFORMANCE METRICS

### KPIs Per Agent Category:

**Engineering:**
- Build success rate: 100%
- Test coverage: >90%
- Performance: <100ms API response

**Product:**
- User satisfaction: >4.5/5
- Feature adoption: >60%
- Churn reduction: measurable

**Marketing:**
- Conversion rate: >3%
- CAC: optimized
- Viral coefficient: >1.1

**Design:**
- Accessibility: WCAG AA
- Consistency: Design system compliance
- User delight: measurable

---

## ⚡ EMERGENCY PROTOCOLS

### High-Priority Issues:

1. **Production Down:**
   ```
   MASTER-ORCHESTRATOR →
     ├─ devops-guru: Incident response
     ├─ infrastructure-maintainer: System diagnosis
     └─ support-responder: User communication
   ```

2. **Security Breach:**
   ```
   MASTER-ORCHESTRATOR →
     ├─ security-engineer: Threat assessment
     ├─ backend-architect: Patch development
     ├─ legal-compliance-checker: Regulatory response
     └─ support-responder: User notification
   ```

3. **Critical Bug:**
   ```
   MASTER-ORCHESTRATOR →
     ├─ fullstack-engineer: Hotfix
     ├─ test-results-analyzer: Regression check
     └─ project-shipper: Emergency deployment
   ```

---

## 🎓 AGENT LEARNING & EVOLUTION

### Continuous Improvement:

1. **Retrospectives:**
   - Weekly agent performance review
   - Cross-agent feedback sessions
   - Pattern library updates

2. **Knowledge Sharing:**
   - Agent handbooks (living documents)
   - Best practice repositories
   - Anti-pattern catalogs

3. **Capability Expansion:**
   - New tool integrations
   - Framework updates
   - Architecture pattern adoption

---

## 📝 AGENT HANDOFF PROTOCOL

### When Agent A Hands Off to Agent B:

1. **Context Document:**
   - Task objectives
   - Completed work summary
   - Outstanding dependencies
   - Known issues/blockers

2. **Deliverables:**
   - Code changes (with tests)
   - Documentation updates
   - Configuration changes
   - Migration scripts (if any)

3. **Validation:**
   - Build passing
   - Tests green
   - Linting clean
   - Performance benchmarks met

---

## 🌟 SUCCESS CRITERIA

### Project-Level Goals:

- ✅ **Code Quality:** Maintainable, readable, performant
- ✅ **User Experience:** Delightful, accessible, fast
- ✅ **Business Impact:** Measurable ROI, growth metrics
- ✅ **Team Velocity:** Sustainable pace, low churn
- ✅ **Technical Debt:** Actively managed, never neglected

---

## 🔗 INTEGRATION WITH MAIN CLAUDE.MD

Bu dosya `/CLAUDE.md`'yi **extends** eder, **replace etmez**.

**Hierarchy:**
1. `CLAUDE.md` - Core engineering principles
2. `CLAUDE.EKIP.AGENT.md` (this file) - Agent-specific workflows
3. Project-specific docs - Implementation details

---

## 📚 AGENT FILE LOCATIONS

**Global Agents:** `~/.claude/agents/`
```
~/.claude/agents/
├── MASTER-ORCHESTRATOR.md
├── engineering/
│   ├── frontend-developer.md
│   ├── backend-architect.md
│   ├── ai-engineer.md
│   ├── fullstack-engineer.md
│   ├── devops-guru.md
│   └── security-engineer.md
├── product/
│   ├── trend-researcher.md
│   ├── feedback-synthesizer.md
│   └── sprint-prioritizer.md
├── marketing/
│   ├── growth-hacker.md
│   ├── content-creator.md
│   ├── seo-optimizer.md
│   ├── social-media-manager.md
│   ├── email-marketer.md
│   ├── influencer-coordinator.md
│   └── marketing-analyst.md
├── design/
│   ├── ui-designer.md
│   ├── ux-researcher.md
│   ├── brand-guardian.md
│   ├── visual-storyteller.md
│   └── whimsy-injector.md
├── project-management/
│   ├── project-shipper.md
│   ├── studio-producer.md
│   └── experiment-tracker.md
├── studio-operations/
│   ├── infrastructure-maintainer.md
│   ├── finance-tracker.md
│   ├── support-responder.md
│   ├── analytics-reporter.md
│   └── legal-compliance-checker.md
└── testing/
    ├── performance-benchmarker.md
    ├── api-tester.md
    ├── test-results-analyzer.md
    ├── integration-validator.md
    └── tool-evaluator.md
```

---

## 💡 QUICK REFERENCE

### Most Common Agent Calls:

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

# Coordination
"MASTER-ORCHESTRATOR: [complex multi-agent task]"
```

---

**Last Updated:** 2025-12-27
**Agent Ecosystem Version:** 1.0.0
**Total Agents:** 35 specialists + 1 orchestrator

🤖 **Claude Ekip Agent Sistemi Aktif - Production Ready!**
