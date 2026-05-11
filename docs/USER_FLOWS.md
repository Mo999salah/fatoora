# User Flows

## Purpose

This document defines the main user journeys inside the Fatoora MVP.

The goal is to make navigation and product behavior clear before writing application code.

## Primary User

The primary user is an Arab freelancer who wants to create and share professional invoices quickly from a mobile phone.

---

## Main Flow: Create and Share an Invoice

This is the most important flow in the MVP.

```txt
Open App
↓
Login or Register
↓
Complete Business Profile
↓
Go to Dashboard
↓
Create New Invoice
↓
Select or Add Client
↓
Add Invoice Items
↓
Review Calculated Totals
↓
Preview PDF
↓
Share PDF through WhatsApp or Email
↓
Return to Invoice Details
↓
Update Invoice Status Later
```

## Flow 1: First-time User Registration

### Goal

Allow a new user to create an account and prepare the app for invoice creation.

### Steps

1. User opens the app
2. User sees onboarding or welcome screen
3. User taps "Create Account"
4. User enters:
   - Full name
   - Email
   - Password
5. App validates the form
6. App sends registration request to the API
7. API creates the user account
8. App stores the authentication token
9. User is redirected to Business Profile Setup

### Success State

User is registered and ready to complete business information.

### Error States

- Email is already used
- Password is too short
- Invalid email format
- Network error
- API validation error

## Flow 2: Login

### Goal

Allow an existing user to access their account.

### Steps

1. User opens the app
2. User taps "Login"
3. User enters email and password
4. App validates the form
5. App sends login request to the API
6. API returns a JWT token
7. App stores the token securely
8. User is redirected to Dashboard

### Success State

User reaches the dashboard.

### Error States

- Wrong email or password
- Invalid email format
- Empty password
- Network error
- Server error

## Flow 3: Returning User

### Goal

Allow a previously logged-in user to enter the app without logging in again.

### Steps

1. User opens the app
2. App checks if an authentication token exists
3. App validates whether the token is usable
4. If the token is valid, user is redirected to Dashboard
5. If the token is missing or invalid, user is redirected to Login

### Success State

User reaches Dashboard without manually logging in again.

### Error States

- Token is expired
- Token is missing
- Token is invalid
- API validation fails
- Local secure storage fails

## Flow 4: Business Profile Setup

### Goal

Collect the freelancer's business information for invoices.

### Steps

1. User reaches Business Profile Setup after registration
2. User enters:
   - Freelancer name
   - Business name
   - Email
   - Phone number
   - Default currency
   - Default language
3. App validates required fields
4. App saves business profile through the API
5. User is redirected to Dashboard

### Success State

Business profile is saved and can be used in invoice PDFs.

### Error States

- Missing required fields
- Invalid phone number
- Invalid email
- API error

## Flow 5: Add Client

### Goal

Allow the user to save client information before creating invoices.

### Steps

1. User goes to Clients screen
2. User taps "Add Client"
3. User enters:
   - Client name
   - Email
   - Phone
   - Address
   - Notes
4. App validates required fields
5. App saves client through the API
6. User returns to Clients list

### Success State

Client appears in the client list and can be selected in invoice creation.

### Error States

- Missing client name
- Invalid email
- API error
- Network error

## Flow 6: Edit or Delete Client

### Goal

Allow the user to manage saved client information.

### Steps

1. User opens Clients screen
2. User selects a client
3. User taps "Edit" or "Delete"
4. If editing:
   - App opens client form with existing data
   - User updates fields
   - App validates the form
   - App saves changes through the API
5. If deleting:
   - App asks for confirmation
   - User confirms deletion
   - App deletes the client through the API

### Success State

Client information is updated or removed correctly.

### Error States

- Missing required fields
- Invalid email
- Client has linked invoices
- API error
- Network error

## Flow 7: Create Invoice

### Goal

Allow the user to create a professional invoice.

### Steps

1. User taps "Create Invoice"
2. User selects an existing client or adds a new one
3. User enters invoice details:
   - Issue date
   - Due date
   - Currency
   - Language
   - Notes
4. User adds invoice items:
   - Description
   - Quantity
   - Unit price
5. App calculates:
   - Item total
   - Subtotal
   - Discount if available
   - Tax if available
   - Final total
6. User saves invoice as draft or unpaid

### Success State

Invoice is created and appears in the invoice list.

### Error States

- No client selected
- Empty invoice items
- Invalid quantity
- Invalid unit price
- Calculation error
- API error

## Flow 8: Edit Draft Invoice

### Goal

Allow the user to update an invoice before it is finalized or shared.

### Steps

1. User opens Invoice Details
2. If invoice status is Draft, user taps "Edit"
3. App opens invoice form with existing data
4. User updates client, invoice details, or invoice items
5. App recalculates totals
6. User saves the updated invoice

### Success State

Draft invoice is updated correctly.

### Error States

- Invoice is not editable
- Invalid invoice item data
- No client selected
- API error
- Network error

## Flow 9: Generate PDF

### Goal

Generate a clean Arabic or English invoice PDF.

### Steps

1. User opens Invoice Details
2. User taps "Preview PDF"
3. App loads invoice data
4. App renders invoice template
5. App generates PDF
6. User previews the PDF

### Success State

A readable PDF invoice is generated with correct layout, totals, and language direction.

### Error States

- Missing invoice data
- PDF generation failed
- RTL layout issue
- File system permission error

## Flow 10: Share Invoice

### Goal

Allow the user to send the invoice to a client.

### Steps

1. User previews or opens invoice PDF
2. User taps "Share"
3. App opens native mobile share sheet
4. User selects WhatsApp, email, or another app
5. User sends the invoice

### Success State

The invoice PDF is shared through the selected app.

### Error States

- PDF file does not exist
- Share sheet fails to open
- WhatsApp or email app is not installed
- File permission error

## Flow 11: Update Invoice Status

### Goal

Allow the user to track payment state.

### Steps

1. User opens Invoice Details
2. User taps status control
3. User selects:
   - Draft
   - Unpaid
   - Paid
   - Overdue
4. App updates invoice status through the API
5. UI reflects the new status

### Success State

Invoice status is updated correctly.

### Error States

- API error
- Network error
- Invalid status transition

## Flow 12: Empty States

### Goal

Make the app understandable when there is no data yet.

### Clients Empty State

Shown when the user has no clients.

**Recommended message:**
No clients yet. Add your first client to create invoices faster.

**Primary action:**
Add Client

### Invoices Empty State

Shown when the user has no invoices.

**Recommended message:**
No invoices yet. Create your first invoice and share it with your client.

**Primary action:**
Create Invoice

### Dashboard Empty State

Shown when the user has no invoice data yet.

**Recommended message:**
Start by creating your first invoice.

**Primary action:**
Create Invoice


## Flow 13: Logout

### Goal

Allow the user to safely leave their account on the device.

### Steps

1. User opens Settings
2. User taps "Logout"
3. App asks for confirmation
4. User confirms
5. App removes stored authentication token
6. App redirects user to Login

### Success State

User is logged out and cannot access protected screens without logging in again.

### Error States

- Secure storage fails
- App fails to clear local state
- Navigation error

## Navigation Summary

```txt
Auth Stack
├── Welcome
├── Login
└── Register

Onboarding Stack
└── Business Profile Setup

Main App Tabs
├── Dashboard
├── Clients
├── Invoices
└── Settings

Client Stack
├── Clients List
├── Add Client
└── Edit Client

Invoice Stack
├── Invoices List
├── Create Invoice
├── Edit Draft Invoice
├── Invoice Details
├── PDF Preview
└── Share
```

## Most Important MVP Flow

The most important MVP flow is:

```txt
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
```

If this flow works smoothly, the MVP is valuable