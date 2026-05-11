# Data Model

## Purpose

This document defines the core data model for the Fatoora MVP.

The goal is to describe the main entities, their fields, and their relationships before implementing the database or API.

---

## Data Model Overview

The MVP uses the following core entities:

1. User
2. BusinessProfile
3. Client
4. Invoice
5. InvoiceItem

Relationship summary:

User owns one BusinessProfile.  
User owns many Clients.  
User owns many Invoices.  
Each Invoice belongs to one Client.  
Each Invoice has many InvoiceItems.

---

## Entity: User

### Purpose

Represents the authenticated account owner.

Each freelancer who uses the app has one user account.

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | Unique user identifier |
| fullName | string | Yes | User's personal name |
| email | string | Yes | Must be unique |
| passwordHash | string | Yes | Stored hashed password, never plain text |
| createdAt | datetime | Yes | Account creation time |
| updatedAt | datetime | Yes | Last update time |

### Rules

- Email must be unique.
- Password must never be stored as plain text.
- User data should only be accessible by the authenticated user.

---

## Entity: BusinessProfile

### Purpose

Stores freelancer or business information used in invoice PDFs.

A user should have one business profile.

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | Unique profile identifier |
| userId | UUID | Yes | Owner user |
| freelancerName | string | Yes | Name shown on invoice |
| businessName | string | Yes | Business or brand name |
| email | string | Yes | Business email |
| phone | string | No | Business phone number |
| defaultCurrency | string | Yes | Example: USD, TRY, SAR |
| defaultLanguage | string | Yes | Example: ar or en |
| createdAt | datetime | Yes | Creation time |
| updatedAt | datetime | Yes | Last update time |

### Rules

- Each user has one business profile.
- Business profile data is used when generating invoice PDFs.
- Default currency and language can be changed later from settings.

---

## Entity: Client

### Purpose

Stores client information for invoice creation.

A user can have many clients.

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | Unique client identifier |
| userId | UUID | Yes | Owner user |
| name | string | Yes | Client name |
| email | string | No | Client email |
| phone | string | No | Client phone number |
| address | string | No | Client address |
| notes | string | No | Internal notes |
| createdAt | datetime | Yes | Creation time |
| updatedAt | datetime | Yes | Last update time |

### Rules

- Client name is required.
- Email is optional but must be valid if provided.
- A client belongs to one user.
- Users cannot access clients owned by other users.
- If a client has invoices, deletion may be restricted or handled carefully.

---

## Entity: Invoice

### Purpose

Represents an invoice created by a freelancer for a client.

A user can have many invoices.

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | Unique invoice identifier |
| userId | UUID | Yes | Owner user |
| clientId | UUID | Yes | Related client |
| invoiceNumber | string | Yes | Human-readable invoice number |
| issueDate | date | Yes | Invoice creation/issue date |
| dueDate | date | Yes | Payment due date |
| status | enum | Yes | Draft, Unpaid, Paid, Overdue |
| currency | string | Yes | Example: USD, TRY, SAR |
| language | string | Yes | ar or en |
| subtotal | decimal | Yes | Sum of item totals |
| discount | decimal | No | Optional discount |
| tax | decimal | No | Optional tax |
| total | decimal | Yes | Final total |
| notes | string | No | Notes shown on invoice |
| createdAt | datetime | Yes | Creation time |
| updatedAt | datetime | Yes | Last update time |

### Invoice Status Values

| Status | Meaning |
|---|---|
| Draft | Invoice is not finalized yet |
| Unpaid | Invoice was created and sent but not paid |
| Paid | Client paid the invoice |
| Overdue | Due date passed and invoice is still unpaid |

### Rules

- Invoice must belong to one user.
- Invoice must belong to one client.
- Invoice must have at least one item.
- Due date should not be before issue date.
- Total should be calculated from invoice items, discount, and tax.
- Draft invoices can be edited.
- Non-draft invoices may have limited editing rules.

---

## Entity: InvoiceItem

### Purpose

Represents a single line item inside an invoice.

Each invoice can have multiple invoice items.

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | Unique item identifier |
| invoiceId | UUID | Yes | Parent invoice |
| description | string | Yes | Service or product description |
| quantity | decimal | Yes | Must be greater than 0 |
| unitPrice | decimal | Yes | Must be 0 or greater |
| total | decimal | Yes | quantity × unitPrice |
| createdAt | datetime | Yes | Creation time |
| updatedAt | datetime | Yes | Last update time |

### Rules

- Description is required.
- Quantity must be greater than zero.
- Unit price cannot be negative.
- Item total should be calculated automatically.
- Invoice subtotal is the sum of all item totals.

---

## Relationships

### User to BusinessProfile

One user has one business profile.

User → BusinessProfile  
1 → 1

### User to Client

One user can have many clients.

User → Clients  
1 → Many

### User to Invoice

One user can have many invoices.

User → Invoices  
1 → Many

### Client to Invoice

One client can have many invoices.

Client → Invoices  
1 → Many

### Invoice to InvoiceItem

One invoice can have many invoice items.

Invoice → InvoiceItems  
1 → Many

---

## Calculation Rules

### Item Total

Item total is calculated as:

quantity × unitPrice

### Subtotal

Subtotal is calculated as:

sum of all invoice item totals

### Final Total

Final total is calculated as:

subtotal - discount + tax

### MVP Notes

For the MVP:

- Discount can default to 0.
- Tax can default to 0.
- Advanced tax rules are not included.
- Currency conversion is not included.
- Online payment status syncing is not included.

---

## Security and Ownership Rules

Every protected entity should be connected to a userId.

This includes:

- BusinessProfile
- Client
- Invoice

The API must ensure that authenticated users can only access their own data.

Example:

A user should not be able to fetch, edit, or delete another user's invoice by guessing an invoice ID.

---

## Future Data Model Ideas

These are not part of the MVP:

- Payment records
- Invoice templates
- Recurring invoices
- Multi-business profiles
- Team members
- Client portal
- Tax compliance fields
- Online payment provider data
- File attachments