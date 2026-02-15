# Specification

## Summary
**Goal:** Build a responsive, premium dark-themed marketing website for PixelNova Studio with Internet Identity authentication, Stripe checkout, a one-time free trial flow, portfolio, funnel pages, a scripted FAQ/chat widget, and a post-login dashboard backed by persisted user data.

**Planned changes:**
- Create core responsive pages (Home, Services, Pricing, Portfolio, Legal, Funnel, Dashboard) with a consistent dark + electric-blue visual system, typography, spacing, and smooth reveal animations.
- Add site navigation (header/footer) with links to all pages, auth controls (sign in/out), and basic SEO metadata (titles/descriptions).
- Implement Internet Identity–only authentication; gate claiming the free trial and submitting orders/leads behind login; redirect to Dashboard after login and support logout to a public page.
- Build backend models/APIs (single-actor Motoko) to persist per-user free-trial claim status, orders (service/package, notes, timestamp, payment status, optional uploads), and captured leads (name/email/phone).
- Implement Pricing with Standard and highlighted Premium packages and a Stripe checkout action for paid offerings, including a clear runtime “Stripe not configured” UI state.
- Add a one-time “Free Website Trial” claim flow for authenticated users; persist claim and show an upgrade prompt to Premium to remove watermark after claiming.
- Create an order/request flow for authenticated users with service/package selection, project notes, optional file uploads, and validation for manual-payment screenshot when manual payment is chosen; store and display orders in Dashboard.
- Display manual payment number “9911553387” as copyable informational text with “Work will begin only after payment confirmation.” on relevant pages (Pricing/Order), without UPI processing.
- Build Portfolio with filter buttons (All/Websites/Logos/Presentations/Business Cards), example items, hover interaction, and “Get Similar Design” + CTA routing into the order flow.
- Add Legal pages (Terms & Conditions, Refund Policy, Privacy Policy) including the exact statement “No refunds once design work has started.”
- Add funnel flow pages (CTA → lead capture form → thank-you page) that persist leads in the backend.
- Add a bottom-right scripted (non-AI) chatbot/FAQ widget (“Nova AI Assistant”) with deterministic qualification, budget-based package suggestion rules, free-trial upsell, payment reminder, and lead capture stored to backend.
- Implement Dashboard to show Internet Identity info available, free-trial status, user orders list (with timestamps/status), and user-submitted leads list with empty states.

**User-visible outcome:** Visitors can browse a cohesive PixelNova Studio marketing site, and after signing in with Internet Identity can claim a one-time free trial, submit orders (including Stripe checkout or manual payment screenshot), submit leads via funnel/chat widget, and view their trial status, orders, and leads in a Dashboard.
