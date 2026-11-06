/**
 * ============================================================================
 * L'AMONDA STORE - SECURE ADMIN DASHBOARD ENGINE
 * Zero-Trust XSS Sanitization, PIN Gate & Live Order Operations
 * ============================================================================
 */

'use strict';

const DASHBOARD_CONFIG = {
  apiEndpoint: "https://api.sheetbest.com/sheets/30e3bc87-c617-4fdc-9923-d873060d3c46",
  defaultPin: "2026",
  sessionKey: "lamonda_admin_authenticated",
  maxAttempts: 5,
  lockoutTimeMs: 5 * 60 * 1000 // 5 minutes lockout
};

const Dashboard = {
  ordersData: [],
  filteredData: [],

  init() {
    this.checkAuthentication();
    this.setupEventListeners();
  },

  checkAuthentication() {
    const isAuth = sessionStorage.getItem(DASHBOARD_CONFIG.sessionKey);
    const authGate = document.getElementById('authGate');

    if (isAuth === 'true') {
      if (authGate) authGate.style.display = 'none';
      this.fetchLiveOrders();
    } else {
      if (authGate) authGate.style.display = 'flex';
      const pinInput = document.getElementById('adminPinInput');
      if (pinInput) pinInput.focus();
    }
  },

  verifyPin(enteredPin) {
    const lockoutUntil = localStorage.getItem('lamonda_lockout_until');
    if (lockoutUntil && Date.now() < parseInt(lockoutUntil)) {
      const remainingSec = Math.ceil((parseInt(lockoutUntil) - Date.now()) / 1000);
      this.showAuthError(`Trop d'essais erronés. Portail bloqué pendant ${remainingSec}s.`);
      return;
    }

    if (enteredPin === DASHBOARD_CONFIG.defaultPin) {
      sessionStorage.setItem(DASHBOARD_CONFIG.sessionKey, 'true');
      localStorage.removeItem('lamonda_pin_attempts');
      localStorage.removeItem('lamonda_lockout_until');
      
      const authGate = document.getElementById('authGate');
      if (authGate) authGate.style.display = 'none';
      this.fetchLiveOrders();
    } else {
      let attempts = parseInt(localStorage.getItem('lamonda_pin_attempts') || '0') + 1;
      localStorage.setItem('lamonda_pin_attempts', attempts);

      if (attempts >= DASHBOARD_CONFIG.maxAttempts) {
        localStorage.setItem('lamonda_lockout_until', Date.now() + DASHBOARD_CONFIG.lockoutTimeMs);
        this.showAuthError(`Sécurité activée : 5 tentatives échouées. Verrouillé 5 minutes.`);
      } else {
        const remaining = DASHBOARD_CONFIG.maxAttempts - attempts;
        this.showAuthError(`Code PIN incorrect. ${remaining} tentative(s) restante(s).`);
      }
    }
  },

  showAuthError(msg) {
    const errBox = document.getElementById('authErrorMsg');
    if (errBox) {
      errBox.textContent = msg;
      errBox.style.display = 'block';
    }
  },

  logout() {
    sessionStorage.removeItem(DASHBOARD_CONFIG.sessionKey);
    window.location.reload();
  },

  sanitize(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  sanitizePhoneForLink(phone) {
    const digits = String(phone).replace(/\D/g, '');
    if (digits.startsWith('0')) {
      return '213' + digits.slice(1);
    }
    if (digits.startsWith('213')) {
      return digits;
    }
    return digits;
  },

  async fetchLiveOrders() {
    const tbody = document.getElementById('ledgerTableBody');
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-state">
            <i class="fa-solid fa-spinner fa-spin" style="font-size:1.8rem; margin-bottom:10px; display:block;"></i>
            Actualisation des commandes en cours...
          </td>
        </tr>
      `;
    }

    try {
      const response = await fetch(DASHBOARD_CONFIG.apiEndpoint);
      if (!response.ok) throw new Error(`Code HTTP ${response.status}`);
      
      const rawData = await response.json();
      this.ordersData = Array.isArray(rawData) ? rawData : [];

      this.ordersData.reverse();
      this.filteredData = [...this.ordersData];

      this.renderTable();
      this.computeMetrics();

    } catch (err) {
      console.error('Fetch error:', err);
      if (tbody) {
        tbody.innerHTML = `
          <tr>
            <td colspan="8" class="empty-state" style="color:var(--danger);">
              <i class="fa-solid fa-circle-exclamation" style="font-size:2rem; margin-bottom:10px; display:block;"></i>
              Impossible d'accéder aux données en ligne (${this.sanitize(err.message)}).
            </td>
          </tr>
        `;
      }
    }
  },

  renderTable() {
    const tbody = document.getElementById('ledgerTableBody');
    if (!tbody) return;

    if (this.filteredData.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-state">
            <i class="fa-solid fa-inbox" style="font-size:2rem; margin-bottom:10px; display:block;"></i>
            Aucune commande trouvée.
          </td>
        </tr>
      `;
      return;
    }

    let rowsHTML = '';
    const savedStatuses = JSON.parse(localStorage.getItem('lamonda_order_statuses') || '{}');

    this.filteredData.forEach((row, index) => {
      const orderId = row["Order_ID"] || `CMD-${index + 1}`;
      const name = row["Client_Name"] || row["Customer Name"] || "Client";
      const phone = row["Client_Phone"] || row["Phone"] || "N/A";
      const size = row["Client_Size"] || row["Size"] || "L";
      const wilaya = row["Client_Wilaya"] || "";
      const address = row["Client_Address"] || row["Address"] || "N/A";
      const items = row["Items_Ordered"] || row["Items Ordered"] || "N/A";
      const totalRaw = row["Total_Price"] || row["Total Price"] || "0";
      const date = row["Order_Date"] || "Récemment";

      const numericPrice = parseInt(String(totalRaw).replace(/[^0-9]/g, '')) || 0;
      const cleanPhone = this.sanitizePhoneForLink(phone);

      const currentStatus = savedStatuses[orderId] || 'pending';
      const statusClass = `status-${currentStatus}`;

      rowsHTML += `
        <tr>
          <td>
            <strong>#${this.sanitize(orderId)}</strong><br>
            <small style="color:var(--muted);">${this.sanitize(date)}</small>
          </td>

          <td>
            <strong style="color:var(--text); font-size:0.95rem;">${this.sanitize(name)}</strong>
          </td>

          <td>
            <div>${this.sanitize(phone)}</div>
            <div style="display:flex; gap:6px; margin-top:6px;">
              <a href="https://wa.me/${cleanPhone}" target="_blank" rel="noopener noreferrer" class="btn-wa-call" title="Écrire sur WhatsApp">
                <i class="fa-brands fa-whatsapp"></i> WhatsApp
              </a>
              <a href="tel:${cleanPhone}" class="btn-print-slip" title="Appeler le client">
                <i class="fa-solid fa-phone"></i>
              </a>
            </div>
          </td>

          <td>
            <span class="badge-size" style="background:#eaf4ed; color:var(--primary); margin-bottom:4px; display:inline-block;">${this.sanitize(wilaya)}</span><br>
            <small style="color:var(--muted);">${this.sanitize(address)}</small>
          </td>

          <td>
            <span class="badge-size" style="margin-bottom:4px; display:inline-block;">${this.sanitize(size)}</span><br>
            <span class="badge-items">${this.sanitize(items)}</span>
          </td>

          <td>
            <span class="badge-price">${numericPrice.toLocaleString()} DA</span>
          </td>

          <td>
            <select class="status-select ${statusClass}" onchange="Dashboard.updateStatus('${this.sanitize(orderId)}', this.value, this)">
              <option value="pending" ${currentStatus === 'pending' ? 'selected' : ''}>En Attente</option>
              <option value="confirmed" ${currentStatus === 'confirmed' ? 'selected' : ''}>Confirmé</option>
              <option value="delivered" ${currentStatus === 'delivered' ? 'selected' : ''}>Livré</option>
            </select>
          </td>

          <td>
            <button type="button" class="btn-print-slip" onclick="Dashboard.printPackingSlip(${index})" title="Imprimer le bon de livraison">
              <i class="fa-solid fa-print"></i> Bon
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHTML;
  },

  updateStatus(orderId, newStatus, selectElement) {
    const saved = JSON.parse(localStorage.getItem('lamonda_order_statuses') || '{}');
    saved[orderId] = newStatus;
    localStorage.setItem('lamonda_order_statuses', JSON.stringify(saved));

    selectElement.className = `status-select status-${newStatus}`;
  },

  computeMetrics() {
    const totalOrders = this.ordersData.length;
    let totalRevenue = 0;

    this.ordersData.forEach(row => {
      const rawPrice = row["Total_Price"] || row["Total Price"] || "0";
      const val = parseInt(String(rawPrice).replace(/[^0-9]/g, '')) || 0;
      totalRevenue += val;
    });

    const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    const ordersEl = document.getElementById('kpiTotalOrders');
    const revenueEl = document.getElementById('kpiTotalRevenue');
    const aovEl = document.getElementById('kpiAOV');

    if (ordersEl) ordersEl.textContent = totalOrders.toLocaleString();
    if (revenueEl) revenueEl.textContent = `${totalRevenue.toLocaleString()} DA`;
    if (aovEl) aovEl.textContent = `${aov.toLocaleString()} DA`;
  },

  printPackingSlip(index) {
    const row = this.filteredData[index];
    if (!row) return;

    const orderId = row["Order_ID"] || `CMD-${index + 1}`;
    const name = row["Client_Name"] || "Client";
    const phone = row["Client_Phone"] || "N/A";
    const wilaya = row["Client_Wilaya"] || "";
    const address = row["Client_Address"] || "N/A";
    const items = row["Items_Ordered"] || "N/A";
    const size = row["Client_Size"] || "L";
    const total = row["Total_Price"] || "0 DA";
    const date = row["Order_Date"] || new Date().toLocaleDateString('fr-FR');

    const slipDiv = document.getElementById('printableSlip');
    if (!slipDiv) return;

    slipDiv.innerHTML = `
      <div style="max-width:650px; margin:0 auto; border:2px solid #1b4324; padding:30px; border-radius:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #1b4324; padding-bottom:16px;">
          <div>
            <h1 style="color:#1b4324; margin:0; font-size:24px;">L'AMONDA STORE</h1>
            <p style="margin:4px 0; color:#555; font-size:13px;">Bordereau de Livraison / Facture Colis</p>
          </div>
          <div style="text-align:right;">
            <h3 style="margin:0; color:#1b4324;">COMMANDE #${this.sanitize(orderId)}</h3>
            <p style="margin:4px 0; font-size:13px;">Date : ${this.sanitize(date)}</p>
          </div>
        </div>

        <div style="margin:24px 0; display:grid; grid-template-columns:1fr 1fr; gap:20px;">
          <div style="background:#f7fbf7; padding:16px; border-radius:8px; border:1px solid #ddd;">
            <h4 style="margin-top:0; color:#1b4324;">DESTINATAIRE :</h4>
            <p style="margin:4px 0;"><strong>Nom :</strong> ${this.sanitize(name)}</p>
            <p style="margin:4px 0;"><strong>Tél :</strong> ${this.sanitize(phone)}</p>
            <p style="margin:4px 0;"><strong>Wilaya :</strong> ${this.sanitize(wilaya)}</p>
            <p style="margin:4px 0;"><strong>Adresse :</strong> ${this.sanitize(address)}</p>
          </div>

          <div style="background:#f7fbf7; padding:16px; border-radius:8px; border:1px solid #ddd;">
            <h4 style="margin-top:0; color:#1b4324;">EXPÉDITEUR :</h4>
            <p style="margin:4px 0;"><strong>Boutique :</strong> L'Amonda Store Algérie</p>
            <p style="margin:4px 0;"><strong>Contact :</strong> 06 72 43 42 17</p>
            <p style="margin:4px 0;"><strong>Mode :</strong> Paiement à la Livraison (COD)</p>
          </div>
        </div>

        <div style="margin-bottom:24px;">
          <h4 style="color:#1b4324; margin-bottom:8px;">ARTICLES DANS LE COLIS :</h4>
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead>
              <tr style="background:#edf7ee;">
                <th style="padding:8px; border:1px solid #ddd;">Description</th>
                <th style="padding:8px; border:1px solid #ddd;">Taille(s)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;">${this.sanitize(items)}</td>
                <td style="padding:10px; border:1px solid #ddd; font-weight:bold;">${this.sanitize(size)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; background:#1b4324; color:#fff; padding:14px 20px; border-radius:8px;">
          <span style="font-size:16px; font-weight:bold;">TOTAL À RECOUVRER (ESPÈCES) :</span>
          <span style="font-size:22px; font-weight:800;">${this.sanitize(total)}</span>
        </div>

        <div style="margin-top:30px; text-align:center; font-size:12px; color:#777; border-top:1px dashed #ccc; padding-top:14px;">
          Merci pour votre commande chez L'Amonda Store. Le client a le droit d'ouvrir le colis avant de régler.
        </div>
      </div>
    `;

    window.print();
  },

  exportToCSV() {
    if (this.ordersData.length === 0) {
      alert("Aucune commande à exporter.");
      return;
    }

    const headers = ["Order_ID", "Date", "Client_Name", "Phone", "Wilaya", "Address", "Size", "Items_Ordered", "Total_Price"];
    let csvContent = "\uFEFF";

    csvContent += headers.join(";") + "\r\n";

    this.ordersData.forEach((row, idx) => {
      const orderId = row["Order_ID"] || `CMD-${idx + 1}`;
      const date = row["Order_Date"] || "";
      const name = (row["Client_Name"] || row["Customer Name"] || "").replace(/;/g, ',');
      const phone = (row["Client_Phone"] || row["Phone"] || "").replace(/;/g, ',');
      const wilaya = (row["Client_Wilaya"] || "").replace(/;/g, ',');
      const address = (row["Client_Address"] || row["Address"] || "").replace(/;/g, ',');
      const size = (row["Client_Size"] || row["Size"] || "").replace(/;/g, ',');
      const items = (row["Items_Ordered"] || row["Items Ordered"] || "").replace(/;/g, ',');
      const price = (row["Total_Price"] || row["Total Price"] || "").replace(/;/g, ',');

      const rowValues = [orderId, date, `"${name}"`, `"${phone}"`, `"${wilaya}"`, `"${address}"`, `"${size}"`, `"${items}"`, `"${price}"`];
      csvContent += rowValues.join(";") + "\r\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `lamonda_commandes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  setupEventListeners() {
    const pinForm = document.getElementById('adminPinForm');
    if (pinForm) {
      pinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pinInput = document.getElementById('adminPinInput');
        if (pinInput) this.verifyPin(pinInput.value.trim());
      });
    }

    const searchInput = document.getElementById('adminSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.filteredData = this.ordersData.filter(row => {
          const str = (
            (row["Client_Name"] || '') + ' ' +
            (row["Client_Phone"] || '') + ' ' +
            (row["Client_Wilaya"] || '') + ' ' +
            (row["Client_Address"] || '') + ' ' +
            (row["Items_Ordered"] || '')
          ).toLowerCase();
          return str.includes(query);
        });
        this.renderTable();
      });
    }

    let inactivityTimer;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (sessionStorage.getItem(DASHBOARD_CONFIG.sessionKey)) {
          alert('Session expirée pour inactivité.');
          Dashboard.logout();
        }
      }, 15 * 60 * 1000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Dashboard.init();
});
