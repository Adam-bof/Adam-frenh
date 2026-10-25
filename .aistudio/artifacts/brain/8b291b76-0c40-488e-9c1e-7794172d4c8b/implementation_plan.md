# LedgerChaser — Production Hardening & Lead Pipeline Plan

This plan outlines the rigorous hardening and leak-prevention phase for LedgerChaser, guaranteeing that every prospective accounting customer visiting `https://adam-frenh-kohl.vercel.app/` can successfully submit their reservation, have their details dispatched immediately to `frenkhood@gmail.com`, and test a realistic client magic link with real URLs and QR code scanning.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product decisions were confirmed during Phase 1 clarification:
> - **Lead Pipeline & Alerts**: Direct AJAX submission to `frenkhood@gmail.com` (via reliable FormSubmit API with zero redirects) combined with local backup persistence in `localStorage`.
> - **Magic Link Reality**: The "Copy Client Magic Link" button copies the real live site origin with a `?view=client-demo` query parameter and displays an interactive modal with a scannable QR code so accountants can test it on their real phones immediately.
> - **Tier Routing**: Distinguish between Founder ($19/mo), Solo ($29/mo), and Multi-Staff Firm ($59/mo) in the lead payload so you know exactly which tier each lead selected.
> - **Trust & Direct Founder Channel**: Embed direct contact channel (`frenkhood@gmail.com`) and explicit 256-bit SOC-2 compliant encryption guarantees in the footer.
> - **Social Share Card (OpenGraph)**: Add social metadata and SVG banner representation for rich link previews across LinkedIn, WhatsApp, and Reddit.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. Closes the lead data loop: Ensures no prospective customer submission is lost by routing submissions via asynchronous POST to `https://formsubmit.co/ajax/frenkhood@gmail.com`.
  2. Solves the dead link issue: Generates dynamic client URLs using `window.location.origin` and renders a clean SVG QR Code so accountants can point their phone camera and experience the mobile magic link instantly.
  3. Provides tier context: When a user clicks "Contact for Firm Tier ($59/mo)", the modal pre-selects the multi-staff tier and tailors the submission fields.
  4. Elevates trust: Displays verifiable bank-grade security badges (AES-256 encryption, zero data reselling, HIPAA & GDPR compliance alignment).
- **Target Audience / Persona**: Solo bookkeepers and boutique accounting firm owners testing the application on desktop or mobile.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Seamless Founder Reservation Flow**:
   - User clicks any CTA ("Claim Founder Spot" or "Contact for Firm Tier").
   - Modal opens with the corresponding tier pre-selected.
   - User enters Name, Work Email, Firm Name, Practice Size, and Current Chasing Method.
   - Upon clicking "Confirm My Founder Spot", an inline loading spinner indicates transmission.
   - Data is dispatched asynchronously to `frenkhood@gmail.com`.
   - On success, the modal displays the confirmed Reservation Pass (`#LC-00XX`), saves a backup in `localStorage`, and displays an instant confirmation state.
2. **Real Phone QR Code Testing Flow**:
   - In the Accountant Hub, the user clicks "Copy Client Magic Link" or "Scan on Phone".
   - A sleek drawer/modal opens with:
     - The exact live link (`https://adam-frenh-kohl.vercel.app/?view=client-demo`).
     - A crisp QR code.
     - The accountant points their smartphone camera at the screen and lands directly in the Client Mobile View on their actual phone.
3. **URL Parameter Handling**:
   - When any user loads the URL with `?view=client-demo`, the app automatically switches to the Client Mobile View and scrolls smoothly to the demo section.
4. **Direct Founder Channel & Trust Badges**:
   - In the footer, a direct link `mailto:frenkhood@gmail.com` is provided: *"Have questions about custom firm workflows? Talk directly to the founder: frenkhood@gmail.com"*.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: FormSubmit AJAX Endpoint instead of standard form action**
  - *Chosen Approach*: Send an asynchronous JSON payload using `fetch('https://formsubmit.co/ajax/frenkhood@gmail.com', ...)` with `_subject` and `_template: 'table'`.
  - *Why*: Prevents jarring page reloads or external Vercel navigation, keeping the user immersed in the high-converting modal state with immediate digital pass feedback.
- **Decision 2: Lightweight SVG-based QR Code generation**
  - *Chosen Approach*: Use a clean, native SVG QR code matrix generator without heavy external dependencies.
  - *Why*: Zero build overhead, instant rendering on any device, and 100% offline-compatible.

---

## 4. Technical Architecture & Data Strategy

### System Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LedgerChaser Application                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────────────┐                 ┌────────────────────────┐  │
│  │   Accountant Hub      │                 │   Founder Modal        │  │
│  │ - Dynamic URL builder │                 │ - Pre-selected tier    │  │
│  │ - QR Code Modal       │                 │ - Validation & State   │  │
│  └───────────┬───────────┘                 └───────────┬────────────┘  │
│              │                                         │               │
│              ▼                                         ▼               │
│  ┌───────────────────────┐                 ┌────────────────────────┐  │
│  │  QR Code / Phone Link │                 │ FormSubmit AJAX API    │  │
│  │  (window.origin link) │                 │ -> frenkhood@gmail.com │  │
│  └───────────────────────┘                 └───────────┬────────────┘  │
│                                                        │               │
│                                                        ▼               │
│                                            ┌────────────────────────┐  │
│                                            │  Local Storage Backup  │  │
│                                            │ (ledgerchaser_records) │  │
│                                            └────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### State & Field Specifications

1. **Lead Payload Sent to Email**:
   - `name`: Full Name of the practitioner.
   - `email`: Work email address.
   - `firmName`: Legal or brand name of the accounting practice.
   - `firmSize`: `Solo (1 person)` | `Boutique (2-5)` | `Growing (6+)`.
   - `selectedTier`: `Founder Tier ($19/mo)` | `Standard Solo ($29/mo)` | `Multi-Staff Firm ($59/mo)`.
   - `currentMethod`: How they currently chase client documents.
   - `submittedAt`: ISO timestamp + localized time.
2. **QR Code & Magic Link Generator**:
   - Generates valid dynamic URL: `${window.location.origin}/?view=client-demo`.
