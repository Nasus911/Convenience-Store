# Local Market Convenience Store System

Static front-end prototype for a role-based convenience store management system.

## Run locally

Open `index.html` directly, or serve the folder with any static web server:

```text
python -m http.server 3000
```

Then open `http://localhost:3000/index.html`.

## Access flows

- `login.html`: Admin, Manager, and Cashier login preview.
- `customer-auth.html`: Customer login and account creation.
- `customer.html?mode=guest`: Customer guest browsing and checkout.
- `admin.html`: Dashboard analytics, account creation, and audit trail.
- `manager.html`: Promotions, stock monitoring, void requests, schedules, and aisles.
- `cashier.html`: POS cart, manual barcode/product search, quantity controls, discounts, void requests, and payment handoff.

## Included prototype behavior

- Shared role navigation and logout routing.
- Customer guest/account modes with loyalty visibility controlled by mode.
- Product search, aisle labels, cart persistence, quantity changes, and promotional pricing.
- Account, promotion, checkout, void-request, and payment forms.
- Audit, account, promotion, void-request, and cart demo state stored in browser `localStorage`.
- Shopping-list text matching and image upload entry point.

## Next integrations

This is currently a browser-only prototype. A production version still needs a backend for authentication, role authorization, account approval, inventory, synchronized audit trails, orders, and payments. The handwritten-list image upload also needs an OCR service or library before it can convert photos into searchable text automatically.