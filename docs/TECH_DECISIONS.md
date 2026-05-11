# Technical Decisions

## Purpose

This document explains the main technical decisions for the Fatoora MVP.

The goal is to keep the project architecture clear, practical, and suitable for a portfolio-grade production-style app.

---

## Project Type

Fatoora is a mobile-first full-stack application.

It includes:

- Mobile app
- Backend API
- Database
- PDF generation
- Authentication
- Sharing workflow

---

## Repository Structure Decision

### Decision

Use a monorepo.

Planned structure:

| Path | Purpose |
|---|---|
| apps/mobile | React Native Expo mobile app |
| apps/api | .NET Web API backend |
| docs | Product and technical documentation |

### Why

A monorepo keeps the mobile app, backend, and documentation in one place.

This is useful because:

- The project is easier to review on GitHub.
- The mobile app and API evolve together.
- Documentation stays close to implementation.
- It presents the project clearly as a full-stack portfolio project.

### Tradeoff

A monorepo can become messy if folder structure is not controlled.

To avoid this:

- Mobile code stays inside apps/mobile.
- Backend code stays inside apps/api.
- Documentation stays inside docs.
- Shared logic should only be introduced when needed.

---

## Mobile App Decision

### Decision

Use React Native with Expo and TypeScript.

### Why React Native

React Native allows building real mobile apps using React concepts.

This is useful because:

- The project is mobile-first.
- The target users are freelancers using phones.
- React Native is relevant for remote and Gulf market opportunities.
- It extends existing frontend skills into mobile development.

### Why Expo

Expo simplifies React Native development.

It helps with:

- Faster project setup
- Easier testing on real devices
- Access to mobile features
- Build and deployment workflows
- File sharing and native APIs

### Why TypeScript

TypeScript helps prevent common bugs by making data shapes explicit.

This is especially important for invoices because:

- Invoice data has many fields.
- Calculations must be reliable.
- API responses need clear types.
- Form data should be predictable.

---

## Navigation Decision

### Decision

Use Expo Router.

### Why

Expo Router provides file-based routing for React Native.

This is useful because:

- It feels familiar to Next.js developers.
- Screens are organized by file structure.
- Auth screens, tabs, and nested screens become easier to understand.
- It makes the app structure more visible in the repository.

---

## Styling Decision

### Decision

Use NativeWind for styling.

### Why

NativeWind brings Tailwind-like utility classes to React Native.

This is useful because:

- It is familiar for frontend development.
- It speeds up UI creation.
- It encourages consistent spacing and layout.
- It helps build a polished mobile UI quickly.

### Tradeoff

NativeWind should not be used randomly.

To keep UI consistent:

- Define reusable UI components.
- Avoid huge className strings when components become complex.
- Keep spacing, typography, and colors consistent.

---

## Form Handling Decision

### Decision

Use React Hook Form with Zod.

### Why React Hook Form

React Hook Form helps manage form state efficiently.

This is useful because the app has many forms:

- Register form
- Login form
- Business profile form
- Client form
- Invoice form
- Invoice item form

### Why Zod

Zod defines validation schemas.

This helps ensure:

- Email fields are valid.
- Required fields are not empty.
- Numbers are valid.
- Invoice items follow business rules.
- API payloads are predictable.

---

## Server State Decision

### Decision

Use TanStack Query for API data.

### Why

TanStack Query manages data fetched from the API.

It helps with:

- Loading states
- Error states
- Caching
- Refetching
- Avoiding repeated manual fetch logic

This is useful for:

- Clients list
- Invoices list
- Dashboard summary
- Invoice details
- Business profile

---

## Local State Decision

### Decision

Use Zustand for simple local app state.

### Why

Zustand is lightweight and simple.

It can be used for:

- Auth user state
- Selected app language
- Temporary invoice draft state
- UI preferences

### Rule

Do not put everything in Zustand.

API data should be managed by TanStack Query.  
Local UI or session state can be managed by Zustand.

---

## Backend Decision

### Decision

Use .NET Web API.

### Why

.NET is strong for backend APIs and is widely used in many companies, including Gulf-region companies.

It is a good choice for this project because:

- It demonstrates backend ability.
- It works well with PostgreSQL.
- It supports clean API architecture.
- It is suitable for business applications.
- It strengthens the portfolio beyond frontend-only work.

---

## Database Decision

### Decision

Use PostgreSQL.

### Why

PostgreSQL is a reliable relational database.

It is suitable because the app has structured relational data:

- Users
- Business profiles
- Clients
- Invoices
- Invoice items

These entities have clear relationships, so a relational database is a strong fit.

---

## ORM Decision

### Decision

Use Entity Framework Core.

### Why

Entity Framework Core connects .NET classes to database tables.

It helps with:

- Defining models in C#
- Creating database migrations
- Querying data
- Managing relationships
- Reducing manual SQL in the MVP

### Tradeoff

Entity Framework should be used carefully.

The API should avoid:

- Loading unnecessary related data
- Returning database entities directly when DTOs are better
- Mixing database logic inside controllers

---

## Authentication Decision

### Decision

Use email/password authentication with JWT.

### Why

JWT authentication is common for mobile apps and APIs.

The flow is:

1. User logs in
2. API validates credentials
3. API returns a token
4. Mobile app stores the token securely
5. Mobile app sends the token with protected API requests

### Security Notes

- Passwords must be hashed.
- JWT secret must not be committed to GitHub.
- Tokens should be stored securely on the mobile device.
- Protected API routes must verify the authenticated user.
- Users must only access their own data.

### Not Included in MVP

- Social login
- Two-factor authentication
- Magic links
- Full password reset flow

---

## PDF Generation Decision

### Decision

Generate invoice PDFs from invoice data using an HTML-based template.

### Why

HTML-based PDF templates make it easier to design professional invoices.

This is useful because:

- Invoice layout matters visually.
- Arabic RTL support needs careful layout.
- English LTR support is also required.
- The PDF is a key part of the product experience.

### MVP Direction

For the MVP, PDF generation may happen on the mobile app if it is practical.

If mobile PDF generation becomes unreliable, the backend can generate PDFs later.

### PDF Requirements

The PDF should include:

- Invoice number
- Business information
- Client information
- Issue date
- Due date
- Invoice items
- Subtotal
- Total
- Notes
- Arabic RTL layout
- English LTR layout

---

## Sharing Decision

### Decision

Use the native mobile share sheet.

### Why

The native share sheet lets the user share the generated PDF through apps already installed on the phone.

This supports:

- WhatsApp
- Email
- Telegram
- Other sharing apps

### Why Not Direct WhatsApp API

Direct WhatsApp Business API integration is not part of the MVP.

It would add complexity and may require business verification or external setup.

The native share sheet is simpler and better for the first version.

---

## API Design Decision

### Decision

Use REST API endpoints.

### Why

REST is simple, clear, and suitable for the MVP.

Example endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/me | Get current user |
| GET | /api/business-profile | Get business profile |
| PUT | /api/business-profile | Update business profile |
| GET | /api/clients | List clients |
| POST | /api/clients | Create client |
| PUT | /api/clients/{clientId} | Update client |
| DELETE | /api/clients/{clientId} | Delete client |
| GET | /api/invoices | List invoices |
| POST | /api/invoices | Create invoice |
| GET | /api/invoices/{invoiceId} | Get invoice details |
| PUT | /api/invoices/{invoiceId} | Update draft invoice |
| PATCH | /api/invoices/{invoiceId}/status | Update invoice status |

---

## Validation Decision

### Decision

Use validation on both mobile and backend.

### Why

Mobile validation improves user experience.

Backend validation protects data integrity.

Both are needed because users can bypass mobile validation, but they cannot bypass backend rules if the API is implemented correctly.

Validation should happen in:

- React Native forms
- API request DTOs
- Backend business rules

---

## Error Handling Decision

### Decision

Use clear user-facing errors and structured API errors.

### Why

The app should not show confusing technical errors to the user.

Good errors help users understand what went wrong.

Examples:

- Invalid email address
- Client name is required
- Invoice must have at least one item
- Network error, please try again
- Unable to generate PDF

---

## Environment Variables Decision

### Decision

Use environment variables for secrets and configuration.

### Why

Secrets must never be committed to GitHub.

Examples:

- Database connection string
- JWT secret
- API base URL
- Hosting-specific configuration

### Rule

Use example environment files only.

For example:

- .env.example is allowed
- .env is not committed

---

## MVP Non-Decisions

The following are intentionally not decided or implemented yet:

- Payment provider
- Subscription system
- Web dashboard
- AI invoice generation
- ZATCA compliance
- Team accounts
- Multi-business support
- Advanced accounting reports

These can be explored after the MVP works smoothly.

---

## Guiding Principle

Build a small, polished, understandable product.

The goal is not to create a huge accounting system.

The goal is to create a professional mobile invoicing app that clearly demonstrates:

- Product thinking
- Mobile UI skills
- RTL/LTR support
- API integration
- Backend development
- Database modeling
- PDF generation
- Real-world workflow design