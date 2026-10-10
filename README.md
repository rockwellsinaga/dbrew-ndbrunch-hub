# D'Brew N D'Brunch Hub

A responsive full-stack cafe portfolio project rebuilt from a collaborative RevoU Kampus Merdeka capstone. The refactor preserves the original concept and assets while redesigning the customer journey, repairing frontend/backend integration, and strengthening configuration and password handling.

![D'Brew responsive storefront](docs/desktop-home.png)

## Portfolio highlights

- Responsive landing page and product catalog built with semantic HTML, modern CSS, and vanilla JavaScript.
- Working category filters, persistent local cart, demo-checkout guardrail, mobile navigation, and accessible dialogs.
- Contact, registration, and login forms integrated with an Express and MySQL API.
- Passwords hashed with Node.js `scrypt`; responses never expose password material.
- Same-origin static frontend and API, environment-based MySQL/CORS configuration, request-size limits, and predictable HTTP errors.
- Automated API and portfolio-entry checks using Node's built-in test runner.

## Attribution and scope

- Original frontend: [Kampus-Merdeka-Software-Engineering/FE-2-Jakarta-23](https://github.com/Kampus-Merdeka-Software-Engineering/FE-2-Jakarta-23)
- Original backend: [Kampus-Merdeka-Software-Engineering/BE-2-Jakarta-23](https://github.com/Kampus-Merdeka-Software-Engineering/BE-2-Jakarta-23)
- Original work was created collaboratively by the respective project teams. Commit history in those repositories is the authoritative record of individual contributions.
- This repository is a separate personal refactor. It does not modify or claim sole authorship of the original team work.

## Run locally

Requirements: Node.js 18+, npm, and either MySQL 8+ or Docker.

1. Run `docker compose up -d` from the repository root, or create an equivalent MySQL database manually.
2. In `server`, copy `.env.example` to `.env`. For the included Docker service, use `MYSQL_URI=mysql://dbrew:dbrew-local@localhost:3306/dbrew`.
3. Run `npm install` inside `server`.
4. Run `npm test`.
5. Run `npm start`, then open `http://localhost:3000`.

The Sequelize models create missing tables for local demonstration. A production release should replace synchronization with migrations.

## Architecture

```text
Browser
  ├─ responsive catalog + local cart
  └─ contact/account forms
          │ JSON over same origin
Express API
  ├─ validation and HTTP error handling
  ├─ scrypt password hashing
  └─ Sequelize models
          │
        MySQL
```

## Tested scope

The automated suite covers the health endpoint, framework-header removal, request validation, weak-password rejection, and presence of the core portfolio journeys. Checkout is deliberately non-transactional and collects no payment data.

For production commerce, add authenticated sessions, rate limiting, CSRF protection, database migrations, payment integration, and database-backed browser tests.
