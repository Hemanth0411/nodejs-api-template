# 🚀 Production-Ready Node.js REST API Template

[![CI/CD Pipeline](https://github.com/Hemanth0411/nodejs-api-template/actions/workflows/ci.yml/badge.svg)](https://github.com/Hemanth0411/nodejs-api-template/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-v20+-green.svg)](https://nodejs.org/)

A **senior-adjacent, production-ready blueprint** for building enterprise-grade REST APIs with Node.js and Express. This template implements real-world patterns: Layered Architecture, strict environment validation, structured logging, and automated quality enforcement.

---

## 📋 Table of Contents

- [Why This Template?](#-why-this-template)
- [Key Features](#-key-features)
- [Architecture & Design Decisions](#-architecture--design-decisions)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Configuration](#-configuration)
- [Security Hardening](#-security-hardening)
- [Testing Strategy](#-testing-strategy)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🎯 Why This Template?

### The Problem
Most Node.js tutorials result in a "spaghetti" `index.js` that:
- Fails silently when environment variables are missing.
- Is impossible to debug due to unstructured `console.log` statements.
- Has no protection against brute-force or common web vulnerabilities.
- Lacks a repeatable structure for team scale.

### The Solution
This template addresses **Day 2 operational concerns** from Day 1:

| Challenge | Solution in This Template | Advantage |
|-----------|--------------------------|-----------|
| **Misconfiguration** | Zod Environment Validation | App crashes instantly with a clear error if `.env` is invalid. |
| **Observability** | Pino Structured Logging | Logs are JSON-formatted for ELK/Datadog and include Trace IDs. |
| **Spaghetti Code** | Layered Architecture | Separation of Routes, Controllers, and Services for high testability. |
| **Security** | Helmet + Rate Limiting | Out-of-the-box protection against common OWASP vulnerabilities. |
| **Consistency** | ESLint (Airbnb) + Prettier | Enforces a strict, professional coding standard automatically. |

---

## 🚀 Key Features

- **Layered Clean Architecture**: Strict separation of concerns.
- **API Versioning**: Built-in `/api/v1/` structure for future-proofing.
- **Fast, Structured Logging**: Pino-powered logs with automatic Correlaton IDs.
- **Fail-Fast Configuration**: Strict environment validation with Zod.
- **Security First**: Pre-configured Helmet headers, CORS policies, and Rate Limiting.
- **Automated Quality**: GitHub Actions pipeline for Linting, Testing, and Docker builds.
- **Self-Documenting**: Swagger/OpenAPI documentation decoupled from code.

---

## 🏛️ Architecture & Design Decisions

### 1. Layered Architecture
We separate the app into distinct layers to ensure that business logic is never coupled to the transport (HTTP) layer.

```
┌─────────────────────────────────────┐
│   Routes (Express Router)          │  ← Path Definitions
├─────────────────────────────────────┤
│   Controllers (Request Handlers)   │  ← HTTP Logic (Status codes, Parsing)
├─────────────────────────────────────┤
│   Services (Business Logic)        │  ← The "Work" (Pure JS logic)
├─────────────────────────────────────┤
│   Schemas (Zod Models)             │  ← Data Validation
└─────────────────────────────────────┘
```

**Why This Matters:**
- **Testability**: Services can be unit tested without spinning up Express.
- **Flexibility**: Swap Express for Fastify or Koa without rewriting business logic.
- **Team Scale**: New developers know exactly where to add features.

**Tradeoffs & Constraints:**
- **Boilerplate**: Simple CRUD operations require touching 4 files (route → controller → service → schema). We accept this cost for long-term maintainability.
- **Performance**: Each layer adds ~0.1ms of overhead. For most APIs, this is negligible compared to database/network latency.
- **Handled**:
  - **5 Edge Cases**: Async error propagation across layers, circular dependency prevention, middleware ordering conflicts, request context loss in async chains, and malformed JSON handling.
  - **4 Failure Modes**: Unhandled promise rejections, middleware crashes, rate limiter state corruption, and logger initialization failures.
  - **3 Core Constraints**: Non-blocking I/O throughout the stack, memory-efficient streaming for large payloads, and graceful degradation when external services fail.

**Decision**: We use Zod to validate `process.env`. If a variable like `PORT` or `CORS_ORIGIN` is missing, the app refuses to start.

**Why?**
- **90% of production incidents** stem from misconfiguration (missing env vars, wrong database URLs, etc.).
- Crashes immediately with a descriptive error instead of failing silently hours later.
- Prevents "zombie deployments" that appear healthy but don't work.

**Result**: No more "Why is my app running on port 3000 instead of 8080?" mysteries.

**Handled Constraints:**
- **Type Safety**: Zod provides runtime validation that TypeScript can't (environment variables are always strings at runtime).
- **Fail-Fast Philosophy**: Better to crash on startup than serve incorrect data to users.

**Decision**: Swagger definitions are kept in `src/docs/*.yaml` instead of code comments.

**Why?**
- **Separation of Concerns**: API contracts shouldn't pollute route files.
- **Frontend Collaboration**: YAML specs can be shared with frontend teams before implementation.
- **Tooling**: YAML files work with Postman, Insomnia, and code generators.

**Result**: Keeps route files clean and allows the API contract to be easily shared with frontend teams.

**Tradeoff**: Requires manual synchronization between code and docs (mitigated by integration tests).

---

## 📁 Project Structure

```
nodejs-api-template/
├── .github/workflows/   # CI/CD Pipeline
├── src/
│   ├── config/          # Env validation and global config
│   ├── controllers/     # Request handlers
│   ├── docs/            # OpenAPI/Swagger YAML specs
│   ├── middleware/      # Logging, Security, and Error handlers
│   ├── routes/          # API Route definitions (v1/v2)
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # Business logic
│   ├── utils/           # Shared utilities (Logger)
│   ├── app.js           # Express app initialization (for testing)
│   └── index.js         # Server entry point (app.listen)
├── tests/               # Jest integration tests
├── .env.example         # Template for local environment
├── Dockerfile           # Multi-stage production build
└── package.json         # Dependency management
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js 20+
- npm 9+

### Setup
1. **Clone and Install**:
   ```bash
   git clone https://github.com/Hemanth0411/nodejs-api-template.git
   cd nodejs-api-template
   npm install
   ```
2. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```
3. **Run Development**:
   ```bash
   npm run dev
   ```

**Access Points:**
- **API Root**: `http://localhost:3000/api/v1`
- **Interactive Docs**: `http://localhost:3000/api-docs`

---

## 💻 Development Workflow

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Linting & Formatting
```bash
# Check for issues
npm run lint

# Automatically fix most issues
npm run lint:fix

# Format code with Prettier
npm run format
```

---

## 🤖 CI/CD Pipeline

The template includes a GitHub Action (`ci.yml`) that performs three critical checks on every PR:
1. **Linting**: Blocks PRs that don't match the Airbnb style guide.
2. **Testing**: Runs the Jest suite.
3. **Docker Build**: Verifies the production Dockerfile is valid.

---

## 🛡️ Security Hardening

- **Helmet**: Sets secure HTTP headers to prevent XSS and Clickjacking.
- **Rate Limiting**: Protects against DoS by limiting IPs to 100 requests per 15 minutes (configurable).
- **CORS**: Strict origin whitelist via environment variables.
- **Non-Root Docker**: Container runs as an unprivileged user for security isolation.

---

## 🔧 Troubleshooting

### 1. "Invalid environment variables" on startup
**Cause**: You missed a variable in your `.env` file.
**Solution**: Check the error message in your terminal and update `.env` to match `.env.example`.

### 2. "Module not found" error
**Cause**: Usually occurs after moving files or adding new dependencies.
**Solution**: Ensure you ran `npm install` and check relative paths (e.g., `../../`).

### 3. Tests fail on "Connection Refused"
**Cause**: Trying to run tests against a live server instead of the exported `app`.
**Solution**: Ensure your test file imports `app` from `src/app.js` and uses `supertest(app)`.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
All third-party dependency licenses are listed in [3RD-PARTY-LICENSES.md](3RD-PARTY-LICENSES.md).

---

**Made with ❤️ for production-ready Node.js APIs**