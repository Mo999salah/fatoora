# Fatoora

Fatoora is a mobile-first invoicing app for Arab freelancers.

The goal of the MVP is to help freelancers create professional Arabic or English invoices, generate PDF files, and share them with clients through WhatsApp or email.

## Current Status

The project is currently in the setup phase.

Completed:

- Product brief
- MVP scope
- User flows
- Screen map
- Data model
- Technical decisions
- Project checkpoint

Next:

- Initialize the Expo mobile app
- Initialize the .NET Web API
- Connect the mobile app to the backend API
- Implement authentication
- Build the invoice creation flow
- Generate and share invoice PDFs

## Planned Tech Stack

### Mobile

- React Native
- Expo
- TypeScript
- Expo Router
- NativeWind
- React Hook Form
- Zod
- TanStack Query
- Zustand

### Backend

- .NET Web API
- PostgreSQL
- Entity Framework Core
- JWT Authentication

## Repository Structure

```txt
apps/
  mobile/   # React Native Expo app
  api/      # .NET Web API backend
docs/       # Product and technical documentation
```

## MVP Core Flow

Register
↓
Business Profile Setup
↓
Add Client
↓
Create Invoice
↓
Generate PDF
↓
Share via WhatsApp

## Documentation

See the /docs folder for product and technical planning documents.
