# Screen Map

## Purpose

This document defines the screens required for the Fatoora MVP.

Each screen includes its purpose, main content, actions, required data, and navigation behavior.

The goal is to make the mobile app structure clear before writing React Native code.

---

## Screen Groups

The MVP screens are grouped into five main areas:

1. Auth Screens
2. Onboarding Screens
3. Main App Tabs
4. Client Screens
5. Invoice Screens
6. Settings Screens

---

# 1. Auth Screens

Auth screens are used before the user enters the protected app area.

---

## 1.1 Welcome Screen

### Purpose

Introduce the app and guide the user to login or registration.

### Main Content

- App name or logo
- Short value proposition
- Primary action: Create Account
- Secondary action: Login

### Actions

- Tap "Create Account" → Register Screen
- Tap "Login" → Login Screen

### Required Data

None.

### Notes

This screen should be simple and fast. The user should immediately understand that the app helps create and share invoices.

---

## 1.2 Register Screen

### Purpose

Allow a new user to create an account.

### Main Content

- Full name input
- Email input
- Password input
- Create Account button
- Link to Login Screen

### Actions

- Submit registration form
- Navigate to Login
- Navigate to Business Profile Setup after successful registration

### Required Data

User enters:

- Full name
- Email
- Password

### Validation

- Full name is required
- Email must be valid
- Password must meet minimum length rules

### API Interaction

- `POST /api/auth/register`

### Success Navigation

- Business Profile Setup Screen

### Error States

- Email already used
- Invalid email
- Weak password
- Network error
- Server validation error

---

## 1.3 Login Screen

### Purpose

Allow an existing user to access their account.

### Main Content

- Email input
- Password input
- Login button
- Link to Register Screen

### Actions

- Submit login form
- Navigate to Register

### Required Data

User enters:

- Email
- Password

### Validation

- Email must be valid
- Password is required

### API Interaction

- `POST /api/auth/login`

### Success Navigation

- Dashboard Screen

### Error States

- Wrong email or password
- Invalid email
- Network error
- Server error

---

# 2. Onboarding Screens

Onboarding screens are shown after registration when required business information is missing.

---

## 2.1 Business Profile Setup Screen

### Purpose

Collect freelancer/business information used in invoice PDFs.

### Main Content

- Freelancer name input
- Business name input
- Business email input
- Phone number input
- Default currency selector
- Default language selector
- Save button

### Actions

- Save business profile
- Continue to Dashboard

### Required Data

User enters:

- Freelancer name
- Business name
- Email
- Phone number
- Default currency
- Default language

### Validation

- Freelancer name is required
- Business name is required
- Email must be valid
- Default currency is required
- Default language is required

### API Interaction

- `POST /api/business-profile`
- or `PUT /api/business-profile`

### Success Navigation

- Dashboard Screen

### Error States

- Missing required fields
- Invalid email
- Invalid phone number
- Network error
- Server validation error

---

# 3. Main App Tabs

Main tabs are the primary navigation area after authentication.

---

## 3.1 Dashboard Screen

### Purpose

Give the user a quick overview of invoice activity.

### Main Content

- Total invoices count
- Paid invoices count
- Unpaid invoices count
- Overdue invoices count
- Recent invoices list
- Create Invoice button

### Actions

- Tap "Create Invoice" → Create Invoice Screen
- Tap recent invoice → Invoice Details Screen
- Navigate to Clients tab
- Navigate to Invoices tab
- Navigate to Settings tab

### Required Data

From API:

- Invoice summary counts
- Recent invoices

### API Interaction

- `GET /api/dashboard/summary`
- `GET /api/invoices?limit=5`

### Empty State

Shown when there are no invoices yet.

Message:

> Start by creating your first invoice.

Primary action:

> Create Invoice

### Error States

- Dashboard data failed to load
- Network error
- API error

---

## 3.2 Clients List Screen

### Purpose

Show all saved clients and allow the user to manage them.

### Main Content

- Client list
- Search input optional for later
- Add Client button

### Actions

- Tap "Add Client" → Add Client Screen
- Tap client → Edit Client Screen or Client Details Screen
- Delete client after confirmation

### Required Data

From API:

- List of clients

### API Interaction

- `GET /api/clients`

### Empty State

Shown when there are no clients.

Message:

> No clients yet. Add your first client to create invoices faster.

Primary action:

> Add Client

### Error States

- Clients failed to load
- Network error
- API error

---

## 3.3 Invoices List Screen

### Purpose

Show all invoices and their current status.

### Main Content

- Invoice list
- Invoice number
- Client name
- Total amount
- Status badge
- Due date
- Create Invoice button

### Actions

- Tap "Create Invoice" → Create Invoice Screen
- Tap invoice → Invoice Details Screen

### Required Data

From API:

- List of invoices

### API Interaction

- `GET /api/invoices`

### Empty State

Shown when there are no invoices.

Message:

> No invoices yet. Create your first invoice and share it with your client.

Primary action:

> Create Invoice

### Error States

- Invoices failed to load
- Network error
- API error

---

## 3.4 Settings Screen

### Purpose

Allow the user to manage account, app preferences, and logout.

### Main Content

- Business profile shortcut
- Default language
- Default currency
- Logout button

### Actions

- Open Business Profile Setup/Edit
- Change default language
- Change default currency
- Logout

### Required Data

From API or local state:

- Current user
- Business profile
- App preferences

### API Interaction

- `GET /api/me`
- `GET /api/business-profile`

### Error States

- Settings failed to load
- Logout failed
- Secure storage error

---

# 4. Client Screens

Client screens handle creating and editing client records.

---

## 4.1 Add Client Screen

### Purpose

Allow the user to save a new client.

### Main Content

- Client name input
- Email input
- Phone input
- Address input
- Notes input
- Save button

### Actions

- Save client
- Cancel and return to Clients List

### Required Data

User enters:

- Client name
- Email
- Phone
- Address
- Notes

### Validation

- Client name is required
- Email must be valid if provided
- Phone should be valid if provided

### API Interaction

- `POST /api/clients`

### Success Navigation

- Clients List Screen
- or return to Create Invoice Screen if user added client during invoice creation

### Error States

- Missing client name
- Invalid email
- Invalid phone
- Network error
- API validation error

---

## 4.2 Edit Client Screen

### Purpose

Allow the user to update or delete an existing client.

### Main Content

- Client form with existing data
- Save Changes button
- Delete Client button

### Actions

- Save client changes
- Delete client after confirmation
- Return to Clients List

### Required Data

From API:

- Existing client details

User may update:

- Client name
- Email
- Phone
- Address
- Notes

### Validation

- Client name is required
- Email must be valid if provided
- Phone should be valid if provided

### API Interaction

- `GET /api/clients/{clientId}`
- `PUT /api/clients/{clientId}`
- `DELETE /api/clients/{clientId}`

### Success Navigation

- Clients List Screen

### Error States

- Client failed to load
- Missing client name
- Invalid email
- Client cannot be deleted because invoices are linked
- Network error
- API error

---

# 5. Invoice Screens

Invoice screens handle creating, viewing, editing, generating, and sharing invoices.

---

## 5.1 Create Invoice Screen

### Purpose

Allow the user to create a new invoice.

### Main Content

- Client selector
- Add new client shortcut
- Issue date input
- Due date input
- Currency selector
- Language selector
- Invoice items section
- Notes input
- Totals summary
- Save as Draft button
- Save as Unpaid button

### Actions

- Select client
- Add client
- Add invoice item
- Remove invoice item
- Edit quantity and unit price
- Save invoice

### Required Data

From API:

- Clients list

User enters:

- Client
- Issue date
- Due date
- Currency
- Language
- Items
- Notes

### Validation

- Client is required
- At least one invoice item is required
- Item description is required
- Quantity must be greater than zero
- Unit price must be greater than or equal to zero
- Due date should not be before issue date

### Calculations

The app calculates:

- Item total = quantity × unit price
- Subtotal = sum of item totals
- Discount if available
- Tax if available
- Final total

### API Interaction

- `GET /api/clients`
- `POST /api/invoices`

### Success Navigation

- Invoice Details Screen

### Error States

- No client selected
- Invalid item
- Invalid date
- Calculation error
- Network error
- API validation error

---

## 5.2 Edit Draft Invoice Screen

### Purpose

Allow the user to edit an invoice while it is still in Draft status.

### Main Content

Same as Create Invoice Screen, but pre-filled with existing invoice data.

### Actions

- Update client
- Update invoice details
- Add/remove invoice items
- Save changes

### Required Data

From API:

- Existing invoice details
- Clients list

### Validation

Same as Create Invoice Screen.

### API Interaction

- `GET /api/invoices/{invoiceId}`
- `GET /api/clients`
- `PUT /api/invoices/{invoiceId}`

### Success Navigation

- Invoice Details Screen

### Error States

- Invoice failed to load
- Invoice is not editable
- Invalid item
- Invalid date
- Network error
- API validation error

---

## 5.3 Invoice Details Screen

### Purpose

Show a complete invoice and allow actions like preview, share, edit draft, and update status.

### Main Content

- Invoice number
- Client information
- Invoice status
- Issue date
- Due date
- Items list
- Totals
- Notes
- Preview PDF button
- Share button
- Edit button if Draft
- Status update control

### Actions

- Preview PDF
- Share invoice
- Edit invoice if Draft
- Update invoice status
- Delete draft invoice optional

### Required Data

From API:

- Invoice details

### API Interaction

- `GET /api/invoices/{invoiceId}`
- `PATCH /api/invoices/{invoiceId}/status`

### Success Navigation

- PDF Preview Screen
- Edit Draft Invoice Screen
- Share sheet

### Error States

- Invoice failed to load
- Status update failed
- Network error
- API error

---

## 5.4 PDF Preview Screen

### Purpose

Allow the user to preview the generated invoice PDF before sharing.

### Main Content

- PDF preview
- Share button
- Regenerate PDF button optional

### Actions

- Generate PDF
- Preview PDF
- Share PDF
- Return to Invoice Details

### Required Data

From API or local navigation:

- Invoice details
- Business profile
- Client details
- Invoice items

### PDF Requirements

- Arabic RTL layout
- English LTR layout
- Clear invoice number
- Freelancer/business information
- Client information
- Items table
- Totals
- Notes
- Clean typography

### API Interaction

For MVP, PDF may be generated on the mobile app from invoice data.

Possible API:

- `GET /api/invoices/{invoiceId}`

### Error States

- Missing invoice data
- PDF generation failed
- RTL layout issue
- File system error
- Share file unavailable

---

# 6. Settings Screens

---

## 6.1 Business Profile Edit Screen

### Purpose

Allow the user to update freelancer/business details used in invoice PDFs.

### Main Content

- Freelancer name input
- Business name input
- Email input
- Phone input
- Default currency selector
- Default language selector
- Save button

### Actions

- Save business profile changes
- Return to Settings

### Required Data

From API:

- Current business profile

### API Interaction

- `GET /api/business-profile`
- `PUT /api/business-profile`

### Error States

- Profile failed to load
- Missing required fields
- Invalid email
- Network error
- API validation error

---

## Final MVP Screen List

The MVP requires the following screens:

1. Welcome Screen
2. Register Screen
3. Login Screen
4. Business Profile Setup Screen
5. Dashboard Screen
6. Clients List Screen
7. Add Client Screen
8. Edit Client Screen
9. Invoices List Screen
10. Create Invoice Screen
11. Edit Draft Invoice Screen
12. Invoice Details Screen
13. PDF Preview Screen
14. Settings Screen
15. Business Profile Edit Screen

---

## Most Important Screens

The most important screens for the MVP are:

1. Register Screen
2. Business Profile Setup Screen
3. Dashboard Screen
4. Add Client Screen
5. Create Invoice Screen
6. Invoice Details Screen
7. PDF Preview Screen

If these screens work well, the MVP delivers real value.