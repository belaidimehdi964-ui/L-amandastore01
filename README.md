# ASLLA Boutique - Women's Apparel E-Commerce Storefront

A modern, high-conversion single-page electronic marketplace designed specifically for an upscale women's fashion boutique. Built with semantic **HTML5**, modern **CSS3**, and modular **vanilla JavaScript**.

---

## 🌟 Key Features Included

1. **Branding & Header:**
   - Dedicated placeholder blocks in `index.html` and `app.js` for store name, logo image, and typography.
   - Sticky navigation bar with mobile hamburger drawer, quick live search, category links, and a persistent shopping bag trigger showing a live item counter badge.

2. **Modular Product Catalog & Ordering:**
   - Pre-populated with curated women's styles (dresses, co-ord sets, blouses, outerwear).
   - Each card displays high-resolution imagery, name, category, fabric description, unit price, bundle eligibility tag, and quick "Order / Add to Cart" buttons.
   - Easily add, update, or remove products directly in `app.js` under `PRODUCTS`.

3. **Automated Bundle Offers (Pricing Logic):**
   - Configured with an automatic **"Buy any 2 for $75.00"** capsule deal.
   - No coupons needed: when qualifying bundle-marked items are added to the bag, the pricing engine automatically pairs them and deducts the difference.
   - Interactive cart progress bar informs the shopper when they are 1 item away from unlocking the deal.

4. **Shopping Bag & Checkout Drawer:**
   - Smooth slide-over drawer showing item thumbnails, quantities, unit prices, remove buttons, and automatic bundle discount line items.
   - **Delivery Location & Cost Calculation:** Dynamic dropdown containing regional delivery zones (e.g., Free Pick-up, Local Standard $5.00, Same-Day Express $9.50, Nationwide $14.00) that automatically adjusts the final order total.
   - **Complete Checkout Form:**
     - First Name
     - Last Name
     - Phone / WhatsApp Number
     - Delivery Address ("Where you live")
     - Preferred Delivery Date/Time ("When you live")
     - Special delivery instructions (optional)
   - **Order Submission:**
     - Automatically generates an itemized, professional order summary and triggers a pre-filled `mailto:` email action to your store email (`[INSERT_YOUR_EMAIL_HERE]`).
     - Includes a direct **"Order via WhatsApp"** button for instant boutique chat ordering.
     - Displays an on-screen **Order Confirmation Modal** with a printable invoice receipt.

5. **Footer & Contact Links:**
   - Clickable Instagram link placeholder: `[INSERT_INSTAGRAM_LINK_HERE]`
   - Clickable WhatsApp direct chat: `[INSERT_WHATSAPP_NUMBER_HERE]`
   - Store order email link: `[INSERT_YOUR_EMAIL_HERE]`

---

## 🚀 How to Launch the Site

You can run the storefront immediately in any modern browser:

### Option 1: Direct File Open
Simply double-click `index.html` in your file explorer, or right-click `index.html` and choose **Open with > Chrome / Edge / Safari / Firefox**.

### Option 2: Local HTTP Server (Recommended)
If you have Python installed, open PowerShell or Terminal in this folder and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 📝 Customization Guide (Where to Insert Your Details)

All placeholders are clearly marked with comments in the codebase. Here is your quick checklist:

### 1. Store Name & Logo Image
- **In `index.html` (Lines ~42–59):**
  - To use text: Change `"ASLLA"` and `"ATELIER & BOUTIQUE"` to your brand name.
  - To use an image logo: Uncomment the `<img src="path/to/your-logo.png" ...>` tag.
- **In `app.js` (Line ~20):**
  - Update `storeName: "ASLLA BRAND"`

### 2. Store Order Email
- **In `app.js` (Line ~24):**
  - Replace `ownerEmail: "[INSERT_YOUR_EMAIL_HERE]"` with your actual address (e.g. `ownerEmail: "orders@myboutique.com"`).
- **In `index.html` (Footer section, Line ~390):**
  - Replace `[INSERT_YOUR_EMAIL_HERE]` in the `mailto:` link.

### 3. WhatsApp Number
- **In `app.js` (Line ~28):**
  - Replace `whatsappNumber: "[INSERT_WHATSAPP_NUMBER_HERE]"` with your phone number in international format without symbols (e.g., `whatsappNumber: "15551234567"`).
- **In `index.html` (Footer section, Line ~375):**
  - Replace `[INSERT_WHATSAPP_NUMBER_HERE]` in `href="https://wa.me/..."`.

### 4. Instagram Profile
- **In `index.html` (Footer section, Line ~360):**
  - Replace `[INSERT_INSTAGRAM_LINK_HERE]` with your Instagram URL (e.g., `https://instagram.com/myboutique`).
  - Replace `[INSERT_INSTAGRAM_HANDLE]` with your username (e.g., `@myboutique`).

---

## 👗 How to Add or Edit Products

Open [app.js](file:///c:/Users/pc%20dell/Documents/aslla_brand/app.js) and locate the `PRODUCTS` array (around line 75). Each item follows this clean format:

```javascript
{
  id: "prod-9",
  name: "Your New Dress Name",
  category: "dresses", // 'dresses' | 'sets' | 'tops' | 'outerwear'
  price: 49.00,
  description: "Description of fabric, cut, and fit.",
  image: "https://your-image-url-here.jpg",
  isBundleEligible: true, // true to include in 2-for-$75 bundle
  badge: "New Arrival"    // optional tag
}
```

---

## 🎁 How to Configure Bundle Offers

In [app.js](file:///c:/Users/pc%20dell/Documents/aslla_brand/app.js), look at `bundleOffer` inside `STORE_CONFIG`:

```javascript
bundleOffer: {
  enabled: true,
  title: "Capsule Bundle: 2 for $75.00",
  qualifyingCount: 2, // change to 3 for a 3-item bundle
  bundlePrice: 75.00, // change bundle target price
  badgeText: "2 for $75 Deal"
}
```

---

## 🚚 How to Modify Delivery Locations & Rates

In [app.js](file:///c:/Users/pc%20dell/Documents/aslla_brand/app.js), look at `DELIVERY_ZONES`:

```javascript
const DELIVERY_ZONES = [
  {
    id: "zone-pickup",
    name: "Boutique Atelier Pick-up (Free)",
    fee: 0.00,
    eta: "Ready in 2 hours at store"
  },
  {
    id: "zone-local-standard",
    name: "Local Standard Delivery (City Metro)",
    fee: 5.00,
    eta: "1 - 2 business days"
  }
  // Add more zones as needed!
];
```
Whenever a shopper picks a zone from the dropdown in the cart, the fee is recalculated in real time.
