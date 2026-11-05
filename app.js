/**
 * ============================================================================
 * L'AMONDA STORE - CLIENT APPLICATION & SECURITY ENGINE
 * Complete Algerian E-Commerce Solution with Maximum Security Protocols
 * ============================================================================
 */

'use strict';

// ============================================================================
// 1. GLOBAL STORE CONFIGURATION
// ============================================================================
const STORE_CONFIG = {
  name: "L'Amonda Store",
  phone: "0672434217",
  phoneIntl: "+213672434217",
  whatsappNumber: "213672434217",
  email: "gangasteralg@gmail.com",
  backupEmail: "lamandastore998@gmail.com",
  currency: "DA",
  formspreeEndpoint: "https://formspree.io/f/xlgyrgpg",
  sheetBestEndpoint: "https://api.sheetbest.com/sheets/30e3bc87-c617-4fdc-9923-d873060d3c46",
  freeShippingThreshold: 8000, // Free shipping if cart >= 8,000 DA
  initialStockPerItem: 10
};

// ============================================================================
// 2. COMPLETE ALGERIA 58 WILAYAS DATABASE WITH RATES
// ============================================================================
const ALGERIA_WILAYAS = [
  { code: "01", name: "01 - Adrar (أدرار)", desk: 650, home: 950 },
  { code: "02", name: "02 - Chlef (الشلف)", desk: 400, home: 600 },
  { code: "03", name: "03 - Laghouat (الأغواط)", desk: 500, home: 750 },
  { code: "04", name: "04 - Oum El Bouaghi (أم البواقي)", desk: 450, home: 650 },
  { code: "05", name: "05 - Batna (باتنة)", desk: 400, home: 600 },
  { code: "06", name: "06 - Béjaïa (بجاية)", desk: 400, home: 600 },
  { code: "07", name: "07 - Biskra (بسكرة)", desk: 500, home: 750 },
  { code: "08", name: "08 - Béchar (بشار)", desk: 650, home: 950 },
  { code: "09", name: "09 - Blida (البليدة)", desk: 350, home: 550 },
  { code: "10", name: "10 - Bouira (البويرة)", desk: 400, home: 600 },
  { code: "11", name: "11 - Tamanrasset (تمنراست)", desk: 800, home: 1200 },
  { code: "12", name: "12 - Tébessa (تبسة)", desk: 450, home: 700 },
  { code: "13", name: "13 - Tlemcen (تلمسان)", desk: 450, home: 650 },
  { code: "14", name: "14 - Tiaret (تيارت)", desk: 450, home: 650 },
  { code: "15", name: "15 - Tizi Ouzou (تيزي وزو)", desk: 400, home: 600 },
  { code: "16", name: "16 - Alger (الجزائر العاصمة)", desk: 300, home: 500 },
  { code: "17", name: "17 - Djelfa (الجلفة)", desk: 500, home: 750 },
  { code: "18", name: "18 - Jijel (جيجل)", desk: 450, home: 650 },
  { code: "19", name: "19 - Sétif (سطيف)", desk: 400, home: 600 },
  { code: "20", name: "20 - Saïda (سعيدة)", desk: 450, home: 700 },
  { code: "21", name: "21 - Skikda (سكيكدة)", desk: 450, home: 650 },
  { code: "22", name: "22 - Sidi Bel Abbès (سيدي بلعباس)", desk: 450, home: 650 },
  { code: "23", name: "23 - Annaba (عنابة)", desk: 400, home: 600 },
  { code: "24", name: "24 - Guelma (قالمة)", desk: 450, home: 650 },
  { code: "25", name: "25 - Constantine (قسنطينة)", desk: 400, home: 600 },
  { code: "26", name: "26 - Médéa (المدية)", desk: 400, home: 600 },
  { code: "27", name: "27 - Mostaganem (مستغانم)", desk: 400, home: 600 },
  { code: "28", name: "28 - M'Sila (المسيلة)", desk: 450, home: 650 },
  { code: "29", name: "29 - Mascara (معسكر)", desk: 450, home: 650 },
  { code: "30", name: "30 - Ouargla (ورقلة)", desk: 550, home: 800 },
  { code: "31", name: "31 - Oran (وهران)", desk: 350, home: 550 },
  { code: "32", name: "32 - El Bayadh (البيض)", desk: 600, home: 850 },
  { code: "33", name: "33 - Illizi (إيليزي)", desk: 800, home: 1200 },
  { code: "34", name: "34 - Bordj Bou Arréridj (برج بوعريريج)", desk: 400, home: 600 },
  { code: "35", name: "35 - Boumerdès (بومرداس)", desk: 350, home: 550 },
  { code: "36", name: "36 - El Tarf (الطارف)", desk: 450, home: 700 },
  { code: "37", name: "37 - Tindouf (تندوف)", desk: 800, home: 1200 },
  { code: "38", name: "38 - Tissemsilt (تيسمسيلت)", desk: 450, home: 700 },
  { code: "39", name: "39 - El Oued (الوادي)", desk: 550, home: 800 },
  { code: "40", name: "40 - Khenchela (خنشلة)", desk: 450, home: 700 },
  { code: "41", name: "41 - Souk Ahras (سوق أهراس)", desk: 450, home: 700 },
  { code: "42", name: "42 - Tipaza (تيبازة)", desk: 350, home: 550 },
  { code: "43", name: "43 - Mila (ميلة)", desk: 400, home: 600 },
  { code: "44", name: "44 - Aïn Defla (عين الدفلى)", desk: 400, home: 600 },
  { code: "45", name: "45 - Naâma (النعامة)", desk: 600, home: 850 },
  { code: "46", name: "46 - Aïn Témouchent (عين تموشنت)", desk: 400, home: 600 },
  { code: "47", name: "47 - Ghardaïa (غرداية)", desk: 550, home: 800 },
  { code: "48", name: "48 - Relizane (غليزان)", desk: 400, home: 600 },
  { code: "49", name: "49 - El M'Ghair (المغير)", desk: 550, home: 800 },
  { code: "50", name: "50 - El Menia (المنيعة)", desk: 600, home: 850 },
  { code: "51", name: "51 - Ouled Djellal (أولاد جلال)", desk: 500, home: 750 },
  { code: "52", name: "52 - Bordj Baji Mokhtar (برج باجي مختار)", desk: 900, home: 1300 },
  { code: "53", name: "53 - Béni Abbès (بني عباس)", desk: 700, home: 1000 },
  { code: "54", name: "54 - Timimoun (تيميمون)", desk: 700, home: 1000 },
  { code: "55", name: "55 - Touggourt (تقرت)", desk: 550, home: 800 },
  { code: "56", name: "56 - Djanet (جانت)", desk: 900, home: 1300 },
  { code: "57", name: "57 - In Salah (عين صالح)", desk: 750, home: 1100 },
  { code: "58", name: "58 - In Guezzam (عين قزام)", desk: 900, home: 1300 }
];

// ============================================================================
// 3. PRODUCT CATALOG
// ============================================================================
const PRODUCTS = [
  {
    id: "mexico",
    name: "Mexico Jersey 2024/26",
    category: "national",
    price: 3000,
    originalPrice: 3800,
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=600&q=80",
    badge: "Best-Seller",
    badgeClass: "badge-bestseller",
    description: "Maillot officiel Mexique Coupe du Monde. Tissu Dry-Fit ultra respirant avec blason thermocollé de haute précision.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "barcelona",
    name: "FC Barcelona Home Jersey",
    category: "clubs",
    price: 3000,
    originalPrice: 4000,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    badge: "Classique",
    badgeClass: "badge-bestseller",
    description: "Le mythique maillot Blaugrana du FC Barcelone. Confort athlétique d'élite, finitions professionnelles certifiées.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: "manchester",
    name: "Manchester United Full Kit",
    category: "kits",
    price: 2500,
    originalPrice: 3500,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80",
    badge: "Ensemble Complet",
    badgeClass: "badge-new",
    description: "Pack complet Manchester United : Maillot officiel + Short de match assorti. Idéal pour l'entraînement ou les sorties sportives.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: "madrid",
    name: "Real Madrid Home Royal",
    category: "clubs",
    price: 3000,
    originalPrice: 3900,
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
    badge: "Top Vente",
    badgeClass: "badge-bestseller",
    description: "Édition Blanche Royale Real Madrid. Tissu premium anti-transpiration avec détails dorés subtils et écusson brodé.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "vintage",
    name: "Vintage Retro Classic Jersey",
    category: "retro",
    price: 2800,
    originalPrice: 3600,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80",
    badge: "Édition Rétro",
    badgeClass: "badge-retro",
    description: "Pièce de collection Vintage des années 90/2000. Col polo rétro travaillé, matière satinée fidèle aux originaux de légende.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: "algeria",
    name: "Algeria Fennecs National Jersey",
    category: "national",
    price: 3200,
    originalPrice: 4200,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80",
    badge: "Édition Spéciale",
    badgeClass: "badge-new",
    description: "Maillot des Fennecs d'Algérie aux deux étoiles dorées. Tissu respirant vert et blanc, coupe moderne ajustée.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  }
];

// ============================================================================
// 4. MAXIMUM SECURITY PROTOCOLS & SANITIZATION
// ============================================================================
const Security = {
  // Prevent Cross-Site Scripting (XSS)
  escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  // Validate Algerian Phone Number: 05, 06, 07 followed by 8 digits, or +213 format
  isValidAlgerianPhone(phone) {
    const cleaned = phone.replace(/[\s\-\.]/g, '');
    const regex = /^(0|\+213|00213)?[567][0-9]{8}$/;
    return regex.test(cleaned);
  },

  // Format phone cleanly: 06 72 43 42 17
  formatAlgerianPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10 && cleaned.startsWith('0')) {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }
    return phone;
  },

  // Validate Full Name (2 to 60 valid characters, no code injection)
  isValidName(name) {
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed.length > 60) return false;
    // Allow unicode letters, spaces, hyphens, and apostrophes
    const regex = /^[\p{L}\s\-\'\.]{2,60}$/u;
    return regex.test(trimmed);
  },

  // Anti-Spam Bot Honeypot Check + Timestamp Check
  isHumanSubmission(formElement, pageLoadTime) {
    const honey = formElement.querySelector('input[name="_website_botcheck"]');
    if (honey && honey.value.trim() !== '') {
      console.warn('Bot submission blocked: honeypot filled');
      return false;
    }
    // Form must take at least 2.5 seconds to fill out (prevents automated instant scripts)
    const elapsed = Date.now() - pageLoadTime;
    if (elapsed < 2500) {
      console.warn('Bot submission blocked: too fast (' + elapsed + 'ms)');
      return false;
    }
    return true;
  }
};

// ============================================================================
// 5. INVENTORY & LOCAL STORAGE PERSISTENCE
// ============================================================================
const Inventory = {
  getInventory() {
    try {
      const stored = localStorage.getItem('lamonda_inventory');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading inventory', e);
    }
    // Initialize default inventory
    const initial = {};
    PRODUCTS.forEach(p => {
      initial[p.name] = STORE_CONFIG.initialStockPerItem;
    });
    localStorage.setItem('lamonda_inventory', JSON.stringify(initial));
    return initial;
  },

  saveInventory(inventory) {
    try {
      localStorage.setItem('lamonda_inventory', JSON.stringify(inventory));
    } catch (e) {
      console.error('Error saving inventory', e);
    }
  },

  getStock(productName) {
    const inv = this.getInventory();
    return inv[productName] !== undefined ? inv[productName] : STORE_CONFIG.initialStockPerItem;
  },

  decrementStock(productName, quantity = 1) {
    const inv = this.getInventory();
    if (inv[productName] !== undefined) {
      inv[productName] = Math.max(0, inv[productName] - quantity);
      this.saveInventory(inv);
    }
  }
};

// ============================================================================
// 6. SHOPPING CART ENGINE
// ============================================================================
class CartEngine {
  constructor() {
    this.items = this.loadCart();
    this.selectedWilaya = null;
    this.deliveryType = 'home'; // 'home' or 'desk'
    this.appliedCoupon = null;
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('lamonda_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('lamonda_cart', JSON.stringify(this.items));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }

  addItem(productId, size = 'L', quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return false;

    const availableStock = Inventory.getStock(product.name);
    const existingIndex = this.items.findIndex(
      item => item.id === productId && item.size === size
    );

    const currentQtyInCart = existingIndex >= 0 ? this.items[existingIndex].qty : 0;
    if (currentQtyInCart + quantity > availableStock) {
      UI.showToast(`Désolé, il ne reste que ${availableStock} exemplaire(s) en stock !`, 'danger');
      return false;
    }

    if (existingIndex >= 0) {
      this.items[existingIndex].qty += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: size,
        image: product.image,
        qty: quantity
      });
    }

    this.saveCart();
    this.updateUI();
    UI.showToast(`✓ ${product.name} (Taille ${size}) ajouté au panier !`, 'success');
    return true;
  }

  updateQuantity(index, newQty) {
    if (index < 0 || index >= this.items.length) return;
    const item = this.items[index];
    const availableStock = Inventory.getStock(item.name);

    if (newQty <= 0) {
      this.removeItem(index);
      return;
    }

    if (newQty > availableStock) {
      UI.showToast(`Quantité maximale disponible atteinte (${availableStock})`, 'warning');
      return;
    }

    item.qty = newQty;
    this.saveCart();
    this.updateUI();
  }

  removeItem(index) {
    if (index < 0 || index >= this.items.length) return;
    const removed = this.items.splice(index, 1);
    this.saveCart();
    this.updateUI();
    if (removed[0]) {
      UI.showToast(`${removed[0].name} retiré du panier`, 'info');
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateUI();
  }

  getItemsCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  getDeliveryFee() {
    if (this.items.length === 0) return 0;
    const subtotal = this.getSubtotal();
    
    // Free shipping threshold qualification
    if (subtotal >= STORE_CONFIG.freeShippingThreshold) {
      return 0;
    }

    if (!this.selectedWilaya) {
      // Default delivery fee if wilaya not selected yet
      return this.deliveryType === 'home' ? 600 : 400;
    }

    return this.deliveryType === 'home' ? this.selectedWilaya.home : this.selectedWilaya.desk;
  }

  getDiscountAmount() {
    if (!this.appliedCoupon) return 0;
    const subtotal = this.getSubtotal();
    if (this.appliedCoupon.code === 'AMONDA10') {
      return Math.round(subtotal * 0.10);
    }
    return 0;
  }

  getGrandTotal() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    const fee = this.getDeliveryFee();
    const discount = this.getDiscountAmount();
    return Math.max(0, subtotal - discount + fee);
  }

  updateUI() {
    // 1. Update Navigation Cart Badge with pop animation
    const badge = document.getElementById('cartNavCount');
    if (badge) {
      const count = this.getItemsCount();
      badge.textContent = count;
      badge.classList.remove('cart-bounce');
      void badge.offsetWidth; // Trigger reflow
      badge.classList.add('cart-bounce');
    }

    // 2. Render Checkout Summary
    this.renderSummaryList();

    // 3. Render Slide-out Drawer
    this.renderDrawerList();
  }

  renderSummaryList() {
    const container = document.getElementById('checkoutItemsList');
    const emptyState = document.getElementById('checkoutEmptyState');
    const subtotalEl = document.getElementById('summarySubtotal');
    const deliveryEl = document.getElementById('summaryDelivery');
    const totalEl = document.getElementById('summaryGrandTotal');

    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (subtotalEl) subtotalEl.textContent = `0 ${STORE_CONFIG.currency}`;
      if (deliveryEl) deliveryEl.textContent = `0 ${STORE_CONFIG.currency}`;
      if (totalEl) totalEl.textContent = `0 ${STORE_CONFIG.currency}`;
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    let html = '';
    this.items.forEach((item, index) => {
      const safeName = Security.escapeHTML(item.name);
      const safeSize = Security.escapeHTML(item.size);
      const itemTotal = (item.price * item.qty).toLocaleString();

      html += `
        <li class="summary-item">
          <img src="${item.image}" alt="${safeName}" class="summary-item-img" onerror="this.src='logo.svg'">
          <div class="summary-item-info">
            <div class="summary-item-title">${safeName}</div>
            <span class="summary-item-size">Taille : ${safeSize}</span>
            <div class="summary-item-qty">Qté : ${item.qty} × ${item.price.toLocaleString()} ${STORE_CONFIG.currency}</div>
          </div>
          <div class="summary-item-price">${itemTotal} ${STORE_CONFIG.currency}</div>
          <button type="button" class="summary-item-remove" onclick="cart.removeItem(${index})" title="Supprimer">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </li>
      `;
    });

    container.innerHTML = html;

    const subtotal = this.getSubtotal();
    const delivery = this.getDeliveryFee();
    const total = this.getGrandTotal();

    if (subtotalEl) subtotalEl.textContent = `${subtotal.toLocaleString()} ${STORE_CONFIG.currency}`;
    
    if (deliveryEl) {
      if (delivery === 0 && subtotal >= STORE_CONFIG.freeShippingThreshold) {
        deliveryEl.innerHTML = `<span class="free-shipping-tag"><i class="fa-solid fa-gift"></i> Offerte (Gratuit)</span>`;
      } else {
        deliveryEl.textContent = `${delivery.toLocaleString()} ${STORE_CONFIG.currency}`;
      }
    }

    if (totalEl) totalEl.textContent = `${total.toLocaleString()} ${STORE_CONFIG.currency}`;
  }

  renderDrawerList() {
    const drawerList = document.getElementById('drawerItemsList');
    const drawerTotal = document.getElementById('drawerTotalAmount');
    if (!drawerList) return;

    if (this.items.length === 0) {
      drawerList.innerHTML = `
        <div class="empty-cart-state">
          <i class="fa-solid fa-bag-shopping"></i>
          <p>Votre panier est actuellement vide.</p>
        </div>
      `;
      if (drawerTotal) drawerTotal.textContent = `0 ${STORE_CONFIG.currency}`;
      return;
    }

    let html = '';
    this.items.forEach((item, index) => {
      const safeName = Security.escapeHTML(item.name);
      const safeSize = Security.escapeHTML(item.size);

      html += `
        <div class="summary-item" style="border-bottom: 1px solid var(--border-light); padding: 12px 0;">
          <img src="${item.image}" alt="${safeName}" class="summary-item-img">
          <div class="summary-item-info">
            <div class="summary-item-title">${safeName}</div>
            <span class="summary-item-size">Taille : ${safeSize}</span>
            <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
              <button type="button" style="padding:2px 8px; border:1px solid #ccc; border-radius:4px;" onclick="cart.updateQuantity(${index}, ${item.qty - 1})">-</button>
              <span style="font-weight:700;">${item.qty}</span>
              <button type="button" style="padding:2px 8px; border:1px solid #ccc; border-radius:4px;" onclick="cart.updateQuantity(${index}, ${item.qty + 1})">+</button>
            </div>
          </div>
          <div style="text-align:right;">
            <div class="summary-item-price">${(item.price * item.qty).toLocaleString()} ${STORE_CONFIG.currency}</div>
            <button type="button" class="summary-item-remove" onclick="cart.removeItem(${index})"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      `;
    });

    drawerList.innerHTML = html;
    if (drawerTotal) drawerTotal.textContent = `${this.getSubtotal().toLocaleString()} ${STORE_CONFIG.currency}`;
  }
}

// Global Cart Instance
const cart = new CartEngine();

// ============================================================================
// 7. USER INTERFACE & RENDERING MODULE
// ============================================================================
const UI = {
  activeCategory: 'all',
  searchQuery: '',
  pageLoadTimestamp: Date.now(),

  init() {
    this.renderProducts();
    this.populateWilayasDropdown();
    this.setupEventListeners();
    cart.updateUI();
  },

  renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    let filtered = PRODUCTS.filter(p => {
      const matchCategory = this.activeCategory === 'all' || p.category === this.activeCategory;
      const matchSearch = p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="catalog-empty">
          <i class="fa-solid fa-shirt"></i>
          <h3>Aucun maillot trouvé</h3>
          <p>Essayez de modifier votre recherche ou filtre.</p>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(p => {
      const stock = Inventory.getStock(p.name);
      const isOutOfStock = stock <= 0;
      const isLowStock = stock > 0 && stock <= 3;
      
      let stockMarkup = `<span class="stock-pill stock-in"><span class="stock-dot"></span>En stock (${stock})</span>`;
      if (isOutOfStock) {
        stockMarkup = `<span class="stock-pill stock-out"><span class="stock-dot"></span>Rupture de stock</span>`;
      } else if (isLowStock) {
        stockMarkup = `<span class="stock-pill stock-low"><span class="stock-dot"></span>Dernières pièces (${stock}) !</span>`;
      }

      // Sizes Radio options
      let sizesMarkup = '';
      p.sizes.forEach((s, idx) => {
        const checked = idx === 0 ? 'checked' : '';
        sizesMarkup += `
          <label class="size-radio-label">
            <input type="radio" name="size_${p.id}" value="${s}" ${checked}>
            <span class="size-radio-tile">${s}</span>
          </label>
        `;
      });

      html += `
        <article class="product-card" id="card-${p.id}">
          <div class="card-top-badges">
            <span class="badge-tag ${p.badgeClass}">${p.badge}</span>
          </div>

          <div class="product-img-wrap">
            <img src="${p.image}" alt="${Security.escapeHTML(p.name)}" loading="lazy" onerror="this.src='logo.svg'">
            <button type="button" class="btn-quick-preview" onclick="UI.openQuickView('${p.id}')">
              <i class="fa-solid fa-eye"></i> Aperçu Détails
            </button>
          </div>

          <div class="product-meta">
            <div class="product-category">${p.category === 'clubs' ? 'Club Européen' : p.category === 'national' ? 'Équipe Nationale' : p.category === 'kits' ? 'Kit Complet' : 'Collection Rétro'}</div>
            <h3 class="product-title">${Security.escapeHTML(p.name)}</h3>
            
            <div class="product-pricing">
              <span class="current-price">${p.price.toLocaleString()} ${STORE_CONFIG.currency}</span>
              <span class="original-price">${p.originalPrice.toLocaleString()} ${STORE_CONFIG.currency}</span>
            </div>

            <!-- Size Picker on each card -->
            <div class="size-picker-section">
              <div class="size-picker-label">
                <span>Sélectionnez votre taille :</span>
                <span class="size-guide-btn" onclick="UI.openSizeGuide()">Guide des tailles</span>
              </div>
              <div class="size-options-grid">
                ${sizesMarkup}
              </div>
            </div>

            ${stockMarkup}
          </div>

          <div class="card-actions">
            <button type="button" class="btn-card btn-quick-buy" 
                    ${isOutOfStock ? 'disabled' : ''} 
                    onclick="UI.handleBuyNow('${p.id}')">
              <i class="fa-solid fa-bolt"></i> Acheter Direct
            </button>
            <button type="button" class="btn-card btn-add-basket" 
                    ${isOutOfStock ? 'disabled' : ''} 
                    onclick="UI.handleAddToCart('${p.id}')">
              <i class="fa-solid fa-cart-plus"></i> Au Panier
            </button>
          </div>
        </article>
      `;
    });

    grid.innerHTML = html;
  },

  populateWilayasDropdown() {
    const select = document.getElementById('clientWilaya');
    if (!select) return;

    let options = '<option value="" disabled selected>Choisissez votre Wilaya (58 Wilayas)...</option>';
    ALGERIA_WILAYAS.forEach(w => {
      options += `<option value="${w.code}">${w.name}</option>`;
    });

    select.innerHTML = options;
  },

  handleAddToCart(productId) {
    const selectedSizeRadio = document.querySelector(`input[name="size_${productId}"]:checked`);
    const size = selectedSizeRadio ? selectedSizeRadio.value : 'L';
    cart.addItem(productId, size, 1);
  },

  handleBuyNow(productId) {
    const added = this.handleAddToCart(productId);
    if (added !== false) {
      const checkoutEl = document.getElementById('checkoutSection');
      if (checkoutEl) {
        checkoutEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },

  openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    const body = document.getElementById('quickViewModalBody');
    if (!modal || !body) return;

    const stock = Inventory.getStock(product.name);

    body.innerHTML = `
      <div style="display:flex; gap:24px; flex-wrap:wrap; align-items:center;">
        <div style="flex:1; min-width:240px; text-align:center; background:#f7faf7; padding:20px; border-radius:12px;">
          <img src="${product.image}" alt="${Security.escapeHTML(product.name)}" style="max-height:260px; margin:0 auto; object-fit:contain;">
        </div>
        <div style="flex:1.2; min-width:260px;">
          <span class="badge-tag ${product.badgeClass}" style="margin-bottom:8px; display:inline-block;">${product.badge}</span>
          <h2 style="font-family:var(--font-display); font-size:1.6rem; color:var(--primary);">${Security.escapeHTML(product.name)}</h2>
          <div style="font-size:1.5rem; font-weight:800; color:var(--primary); margin:10px 0;">${product.price.toLocaleString()} ${STORE_CONFIG.currency}</div>
          <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:16px;">${Security.escapeHTML(product.description)}</p>
          <div style="background:#eaf6ea; color:#2e7d32; padding:8px 12px; border-radius:8px; font-weight:700; font-size:0.85rem; margin-bottom:20px;">
            ✓ Tissu Dri-FIT 100% Respirant &amp; Écussons de Haute Qualité
          </div>
          <button class="btn-submit-order" onclick="UI.handleBuyNow('${product.id}'); UI.closeModal('quickViewModal');">
            Commander ce modèle
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  },

  openSizeGuide() {
    const modal = document.getElementById('sizeGuideModal');
    if (modal) modal.classList.add('active');
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  },

  openCartDrawer() {
    const drawer = document.getElementById('cartDrawerBackdrop');
    if (drawer) drawer.classList.add('active');
  },

  closeCartDrawer() {
    const drawer = document.getElementById('cartDrawerBackdrop');
    if (drawer) drawer.classList.remove('active');
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'danger') icon = 'circle-exclamation';
    if (type === 'warning') icon = 'triangle-exclamation';

    toast.innerHTML = `<i class="fa-solid fa-${icon}"></i> <span>${Security.escapeHTML(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  },

  setupEventListeners() {
    // 1. Category Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeCategory = e.currentTarget.dataset.category;
        this.renderProducts();
      });
    });

    // 2. Search Input Filter
    const searchInput = document.getElementById('jerseySearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        this.renderProducts();
      });
    }

    // 3. Wilaya Selection Change Listener
    const wilayaSelect = document.getElementById('clientWilaya');
    if (wilayaSelect) {
      wilayaSelect.addEventListener('change', (e) => {
        const found = ALGERIA_WILAYAS.find(w => w.code === e.target.value);
        if (found) {
          cart.selectedWilaya = found;
          cart.updateUI();
          this.showToast(`Wilaya sélectionnée : ${found.name}`, 'info');
        }
      });
    }

    // 4. Delivery Type Radios (Home vs Desk)
    document.querySelectorAll('input[name="delivery_type"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        cart.deliveryType = e.target.value;
        cart.updateUI();
      });
    });

    // 5. Phone Input Formatting on the fly
    const phoneInput = document.getElementById('clientPhone');
    if (phoneInput) {
      phoneInput.addEventListener('blur', (e) => {
        e.target.value = Security.formatAlgerianPhone(e.target.value);
      });
    }

    // 6. Coupon Application
    const applyCouponBtn = document.getElementById('btnApplyCoupon');
    const couponInput = document.getElementById('couponCodeInput');
    if (applyCouponBtn && couponInput) {
      applyCouponBtn.addEventListener('click', () => {
        const code = couponInput.value.trim().toUpperCase();
        if (code === 'AMONDA10') {
          cart.appliedCoupon = { code: 'AMONDA10', percent: 10 };
          cart.updateUI();
          this.showToast('🎉 Code AMONDA10 activé ! 10% de réduction appliqués.', 'success');
        } else if (code === 'LIVRAISON') {
          cart.appliedCoupon = { code: 'LIVRAISON', freeShip: true };
          cart.updateUI();
          this.showToast('🎉 Code LIVRAISON activé ! Livraison offerte.', 'success');
        } else {
          this.showToast('Code promo invalide ou expiré', 'warning');
        }
      });
    }

    // 7. Secure Checkout Form Submission Handler
    const checkoutForm = document.getElementById('orderForm');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => this.handleOrderSubmission(e));
    }
  },

  // ==========================================================================
  // 8. HIGH-SECURITY TRIPLE-ORDER SUBMISSION ENGINE
  // ==========================================================================
  async handleOrderSubmission(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = document.getElementById('btnSubmitOrder');

    // Security Gate 1: Check if cart has items
    if (cart.items.length === 0) {
      this.showToast('Votre panier est vide ! Veuillez ajouter au moins un maillot.', 'danger');
      return;
    }

    // Security Gate 2: Honeypot & Timing Verification against spambots
    if (!Security.isHumanSubmission(form, this.pageLoadTimestamp)) {
      this.showToast('Validation de sécurité échouée. Veuillez réessayer.', 'danger');
      return;
    }

    // Security Gate 3: Extract & Validate Inputs
    const clientName = form.elements['client_name'].value.trim();
    const clientPhone = form.elements['client_phone'].value.trim();
    const clientWilayaCode = form.elements['client_wilaya'].value;
    const clientAddress = form.elements['client_address'].value.trim();
    const clientNotes = form.elements['client_notes'] ? form.elements['client_notes'].value.trim() : '';

    if (!Security.isValidName(clientName)) {
      this.showToast('Veuillez saisir un nom et prénom valide (lettres uniquement)', 'danger');
      form.elements['client_name'].focus();
      return;
    }

    if (!Security.isValidAlgerianPhone(clientPhone)) {
      this.showToast('Numéro de téléphone algérien invalide (ex: 06 72 43 42 17)', 'danger');
      form.elements['client_phone'].focus();
      return;
    }

    if (!clientWilayaCode) {
      this.showToast('Veuillez sélectionner votre Wilaya de livraison', 'danger');
      form.elements['client_wilaya'].focus();
      return;
    }

    if (clientAddress.length < 5) {
      this.showToast('Veuillez préciser votre adresse de livraison complète', 'danger');
      form.elements['client_address'].focus();
      return;
    }

    const selectedWilayaObj = ALGERIA_WILAYAS.find(w => w.code === clientWilayaCode);
    const wilayaName = selectedWilayaObj ? selectedWilayaObj.name : clientWilayaCode;

    // Generate Order ID & Timestamps
    const orderId = 'AMD-' + Math.floor(100000 + Math.random() * 900000);
    const orderTimestamp = new Date().toLocaleString('fr-FR');
    const grandTotal = cart.getGrandTotal();
    const deliveryFee = cart.getDeliveryFee();

    // Prepare Items Summary String
    let itemsSummaryText = cart.items.map(it => 
      `${it.name} (Taille: ${it.size}) × ${it.qty}`
    ).join(' | ');

    // Prepare Sizes List String
    let sizesSummaryText = cart.items.map(it => 
      `${it.name}: ${it.size} (Qté: ${it.qty})`
    ).join('; ');

    // UI Loading State
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Transmission Sécurisée...`;
    }

    // ------------------------------------------------------------------------
    // CHANNEL 1 & 2: Background Submission to Formspree + SheetBest API
    // ------------------------------------------------------------------------
    const payload = {
      Order_ID: orderId,
      Client_Name: clientName,
      Client_Phone: clientPhone,
      Client_Wilaya: wilayaName,
      Client_Address: clientAddress,
      Client_Size: sizesSummaryText,
      Items_Ordered: itemsSummaryText,
      Delivery_Type: cart.deliveryType === 'home' ? 'À Domicile' : 'Stop Desk / Bureau',
      Delivery_Fee: `${deliveryFee} DA`,
      Total_Price: `${grandTotal} DA`,
      Order_Notes: clientNotes,
      Order_Date: orderTimestamp
    };

    let formspreeSuccess = false;

    try {
      // 1. Post to Formspree via AJAX
      const formspreePromise = fetch(STORE_CONFIG.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // 2. Post to SheetBest Google Sheets in parallel
      const sheetBestPromise = fetch(STORE_CONFIG.sheetBestEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch(err => console.warn('SheetBest async notice:', err));

      const response = await formspreePromise;
      if (response.ok) {
        formspreeSuccess = true;
      }
    } catch (networkErr) {
      console.warn('Direct network post fallback:', networkErr);
    }

    // Decrement stock in local inventory
    cart.items.forEach(item => {
      Inventory.decrementStock(item.name, item.qty);
    });

    // ------------------------------------------------------------------------
    // CHANNEL 3: Prepare Direct 1-Click WhatsApp Confirmation
    // ------------------------------------------------------------------------
    const whatsappMessage = encodeURIComponent(
      `*NOUVELLE COMMANDE L'AMONDA STORE*\n` +
      `--------------------------------\n` +
      `*N° Commande :* ${orderId}\n` +
      `*Client :* ${clientName}\n` +
      `*Téléphone :* ${clientPhone}\n` +
      `*Wilaya :* ${wilayaName}\n` +
      `*Adresse :* ${clientAddress}\n` +
      `*Livraison :* ${cart.deliveryType === 'home' ? 'À Domicile' : 'Stop Desk'}\n\n` +
      `*Articles Commandés :*\n` +
      cart.items.map(it => `• ${it.name} (Taille ${it.size}) × ${it.qty} = ${(it.price * it.qty).toLocaleString()} DA`).join('\n') +
      `\n\n*Frais de Livraison :* ${deliveryFee === 0 ? 'GRATUITE' : deliveryFee + ' DA'}\n` +
      `*TOTAL À PAYER (À la livraison) :* *${grandTotal.toLocaleString()} DA*\n` +
      (clientNotes ? `*Note client :* ${clientNotes}\n` : '') +
      `--------------------------------\n` +
      `Merci de confirmer la commande pour expédition rapide !`
    );

    const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

    // Show Confirmation Modal
    this.displayOrderSuccessModal({
      orderId,
      clientName,
      clientPhone,
      wilayaName,
      grandTotal,
      whatsappUrl,
      items: [...cart.items]
    });

    // Reset Form & Clear Cart
    form.reset();
    cart.clearCart();

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fa-solid fa-lock"></i> Confirmer Ma Commande (Paiement à la livraison)`;
    }
  },

  displayOrderSuccessModal({ orderId, clientName, clientPhone, wilayaName, grandTotal, whatsappUrl, items }) {
    const modal = document.getElementById('orderSuccessModal');
    const receiptBox = document.getElementById('orderReceiptBox');
    const waBtn = document.getElementById('btnModalWhatsAppConfirm');

    if (!modal || !receiptBox) return;

    let itemsHtml = items.map(it => `
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span><strong>${it.name}</strong> (Taille ${it.size}) × ${it.qty}</span>
        <span>${(it.price * it.qty).toLocaleString()} DA</span>
      </div>
    `).join('');

    receiptBox.innerHTML = `
      <div style="text-align:center; margin-bottom:14px; border-bottom:1px solid #ddd; padding-bottom:10px;">
        <h4 style="color:var(--primary); margin:0;">Reçu de Commande #${orderId}</h4>
        <small style="color:#666;">Date : ${new Date().toLocaleString('fr-FR')}</small>
      </div>
      <div style="margin-bottom:12px; font-size:0.92rem;">
        <div><strong>Client :</strong> ${Security.escapeHTML(clientName)}</div>
        <div><strong>Téléphone :</strong> ${Security.escapeHTML(clientPhone)}</div>
        <div><strong>Wilaya :</strong> ${Security.escapeHTML(wilayaName)}</div>
        <div><strong>Mode de Paiement :</strong> Paiement en espèces à la livraison (COD)</div>
      </div>
      <div style="background:#fff; padding:10px; border-radius:6px; margin-bottom:12px;">
        ${itemsHtml}
      </div>
      <div style="display:flex; justify-content:space-between; font-size:1.15rem; font-weight:800; color:var(--primary); border-top:1px solid #ddd; padding-top:10px;">
        <span>Montant Total :</span>
        <span>${grandTotal.toLocaleString()} DA</span>
      </div>
    `;

    if (waBtn) {
      waBtn.href = whatsappUrl;
    }

    modal.classList.add('active');
  }
};

// Initialize Application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  UI.init();
});
