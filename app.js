(() => {
  const pageMap = { admin: 'admin.html', manager: 'manager.html', cashier: 'cashier.html' };
  const store = {
    get(key, fallback) {
      try { return JSON.parse(localStorage.getItem(`local-market-${key}`)) ?? fallback; } catch { return fallback; }
    },
    set(key, value) { localStorage.setItem(`local-market-${key}`, JSON.stringify(value)); }
  };

  const audit = store.get('audit', []);
  const recordAudit = (action, detail) => {
    audit.unshift({ action, detail, time: new Date().toLocaleString() });
    store.set('audit', audit.slice(0, 50));
  };

  document.querySelectorAll('[data-logout]').forEach((link) => {
    link.addEventListener('click', () => {
      recordAudit('Logout', 'User ended the current session');
      localStorage.removeItem('local-market-session');
    });
  });

  const loginForm = document.querySelector('[data-login-form]');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const role = new FormData(loginForm).get('role');
      const identity = new FormData(loginForm).get('identity');
      store.set('session', { role, identity, loggedInAt: new Date().toISOString() });
      recordAudit('Login', `${role} account signed in as ${identity}`);
      window.location.href = pageMap[role];
    });
  }

  const customerLoginForm = document.querySelector('[data-customer-login-form]');
  if (customerLoginForm) customerLoginForm.addEventListener('submit', (event) => { event.preventDefault(); const identity = new FormData(customerLoginForm).get('identity'); store.set('customer-mode', 'account'); store.set('customer-profile', { name: identity, email: identity, points: 0 }); recordAudit('Customer login', identity); window.location.href = 'customer.html?mode=account'; });

  const params = new URLSearchParams(window.location.search);
  if (document.body.dataset.customerPage === 'true') {
    const mode = params.get('mode') || store.get('customer-mode', 'guest');
    const guestNotice = document.querySelector('[data-guest-notice]');
    const pointsCards = document.querySelectorAll('[data-account-only]');
    if (guestNotice) guestNotice.hidden = mode !== 'guest';
    pointsCards.forEach((card) => { card.hidden = mode === 'guest'; });
    store.set('customer-mode', mode);
  }

  const modal = document.createElement('dialog');
  modal.className = 'action-modal';
  document.body.appendChild(modal);
  const openModal = (title, body, onSubmit) => {
    modal.innerHTML = `<form method="dialog" class="modal-card"><div class="panel-header"><h3>${title}</h3><button value="cancel" class="icon-btn" aria-label="Close">&times;</button></div>${body}<div class="button-row"><button value="cancel" class="secondary-btn">Cancel</button><button value="default" class="primary-btn">Save</button></div></form>`;
    modal.showModal();
    modal.querySelector('form').addEventListener('submit', (event) => {
      if (event.submitter?.value !== 'default') return;
      event.preventDefault();
      onSubmit(new FormData(event.currentTarget));
      modal.close();
    });
  };

  document.querySelectorAll('[data-action="create-account"]').forEach((button) => button.addEventListener('click', () => openModal('Create New Account', '<label>Full name<input name="name" required></label><label>Email<input name="email" type="email" required></label><label>Role<select name="role"><option>Admin</option><option>Manager</option><option>Cashier</option><option>Customer</option></select></label>', (data) => { const accounts = store.get('accounts', []); accounts.unshift({ name: data.get('name'), email: data.get('email'), role: data.get('role'), status: 'Under review' }); store.set('accounts', accounts); recordAudit('Account created', `${data.get('role')} account for ${data.get('name')}`); alert('Account submitted for review.'); })));

  document.querySelectorAll('[data-action="add-promo"]').forEach((button) => button.addEventListener('click', () => openModal('Add Promo', '<label>Product<input name="product" placeholder="e.g. Snack Combo" required></label><label>Discount percent<input name="discount" type="number" min="1" max="90" required></label><label>Promo note<input name="note" placeholder="Shown to customers"></label>', (data) => { const promos = store.get('promos', []); promos.unshift({ product: data.get('product'), discount: Number(data.get('discount')), note: data.get('note') || 'Limited-time offer', status: 'Active' }); store.set('promos', promos); recordAudit('Promo added', `${data.get('product')} at ${data.get('discount')}% off`); alert('Promo added and published to customer pages.'); })));

  document.querySelectorAll('[data-action="void-request"]').forEach((button) => button.addEventListener('click', () => openModal('Request Transaction Void', '<label>Receipt number<input name="receipt" placeholder="#3021" required></label><label>Reason<textarea name="reason" required></textarea></label><label>Manager on site<select name="manager"><option>Rafael Cruz</option><option>No manager nearby</option></select></label>', (data) => { const requests = store.get('void-requests', []); requests.unshift({ receipt: data.get('receipt'), reason: data.get('reason'), manager: data.get('manager'), status: 'Pending' }); store.set('void-requests', requests); recordAudit('Void requested', `${data.get('receipt')}: ${data.get('reason')}`); alert('Void request sent to the manager request queue.'); })));

  document.querySelectorAll('[data-action="checkout"]').forEach((button) => button.addEventListener('click', () => { if (!cart.length) { alert('Add an item before checkout.'); return; } openModal('Checkout permission', '<p class="modal-copy">We need permission to use your name, contact number, email, and address for order fulfillment.</p><label><input name="permission" type="checkbox" required> I consent to the use of my information for this order.</label><label>Contact number<input name="contact" required></label><label>Address<textarea name="address" required></textarea></label>', () => { recordAudit('Checkout started', `${cart.length} product type(s) in order`); store.set('cart', []); alert('Order placed for fulfillment.'); renderCart(); }); }));
  document.querySelectorAll('[data-action="online-payment"]').forEach((button) => button.addEventListener('click', () => openModal('Online payment', '<label>Payment method<select name="method"><option>GCash</option><option>Card</option><option>PayMaya</option></select></label><label>Reference number<input name="reference" required placeholder="Payment reference"></label>', (data) => { recordAudit('Online payment selected', data.get('method')); alert('Payment handoff recorded for integration.'); })));
  document.querySelectorAll('[data-action="find-list"]').forEach((button) => button.addEventListener('click', () => { const text = document.querySelector('[data-list-text]')?.value.toLowerCase() || ''; const matches = Object.entries(products).filter(([, product]) => text.includes(product.name.toLowerCase().split(' ')[0])); const result = document.querySelector('[data-list-result]'); if (result) result.innerHTML = matches.length ? matches.map(([key, product]) => `<div class="transaction-item"><div><strong>${product.name}</strong><small>${product.aisle}</small></div><button class="secondary-btn" data-product="${key}">Add</button></div>`).join('') : '<p class="empty-state">No known products matched. Try typing the product name.</p>'; result?.querySelectorAll('[data-product]').forEach((item) => item.addEventListener('click', () => addProduct(item.dataset.product))); }));
  const listPhoto = document.querySelector('[data-list-photo]');
  if (listPhoto) listPhoto.addEventListener('change', () => { const result = document.querySelector('[data-list-result]'); if (result) result.innerHTML = '<p class="empty-state">Photo selected. OCR service connection is the next integration step; type the visible items below for matching now.</p>'; });

  document.querySelectorAll('[data-action="signup"]').forEach((button) => button.addEventListener('click', () => openModal('Create Customer Account', '<p class="modal-copy">Please allow Local Market to use these details for orders and delivery.</p><label><input name="permission" type="checkbox" required> I consent to the use of my name, contact number, email, and address.</label><label>Full name<input name="name" required></label><label>Contact number<input name="contact" required></label><label>Email<input name="email" type="email" required></label><label>Address<textarea name="address" required></textarea></label>', (data) => { store.set('customer-profile', { name: data.get('name'), contact: data.get('contact'), email: data.get('email'), address: data.get('address'), points: 0 }); window.location.href = 'customer.html?mode=account'; })));

  const products = {
    'energy drink': { name: 'Energy Drink', price: 2.9, aisle: 'Aisle 2', promo: 0 },
    chips: { name: 'Chips', price: 1.8, aisle: 'Aisle 3', promo: 0.2 },
    water: { name: 'Mineral Water', price: 1.6, aisle: 'Aisle 1', promo: 0 },
    milk: { name: 'Fresh Milk', price: 4.2, aisle: 'Aisle 4', promo: 0 },
    rice: { name: 'Rice Pack', price: 7.5, aisle: 'Aisle 5', promo: 0.1 },
    soap: { name: 'Soap', price: 3.2, aisle: 'Aisle 6', promo: 0 }
  };
  const cart = store.get('cart', []);
  const addProduct = (key) => { const product = products[key]; if (!product) return; const found = cart.find((item) => item.name === product.name); if (found) found.quantity += 1; else cart.push({ ...product, quantity: 1 }); store.set('cart', cart); renderCart(); };
  const renderCart = () => {
    const list = document.querySelector('[data-cart-list]');
    if (!list) return;
    list.innerHTML = cart.length ? cart.map((item, index) => `<div class="sale-row"><span>${item.name}<small>${item.aisle}</small></span><span><button class="qty-btn" data-minus="${index}">-</button> ${item.quantity} <button class="qty-btn" data-plus="${index}">+</button></span><strong>$${((item.price * (1 - item.promo)) * item.quantity).toFixed(2)}</strong></div>`).join('') : '<p class="empty-state">No items yet. Search or scan a product.</p>';
    const total = cart.reduce((sum, item) => sum + item.price * (1 - item.promo) * item.quantity, 0);
    document.querySelectorAll('[data-total]').forEach((element) => { element.textContent = `$${total.toFixed(2)}`; });
    list.querySelectorAll('[data-minus], [data-plus]').forEach((button) => button.addEventListener('click', () => { const index = Number(button.dataset.minus ?? button.dataset.plus); cart[index].quantity += button.dataset.plus ? 1 : -1; if (cart[index].quantity < 1) cart.splice(index, 1); store.set('cart', cart); renderCart(); }));
  };
  document.querySelectorAll('[data-product]').forEach((button) => button.addEventListener('click', () => addProduct(button.dataset.product)));
  const productSearch = document.querySelector('[data-product-search]');
  if (productSearch) productSearch.addEventListener('input', () => { const query = productSearch.value.toLowerCase(); document.querySelectorAll('[data-product-card]').forEach((card) => { card.hidden = !card.textContent.toLowerCase().includes(query); }); });
  document.querySelectorAll('[data-quick-product]').forEach((button) => button.addEventListener('click', () => addProduct(button.dataset.quickProduct)));
  const cashierSearch = document.querySelector('[data-cashier-search]');
  if (cashierSearch) cashierSearch.addEventListener('input', () => { const query = cashierSearch.value.toLowerCase(); document.querySelectorAll('[data-cashier-suggestion]').forEach((item) => { item.hidden = !item.textContent.toLowerCase().includes(query); }); });
  document.querySelectorAll('[data-cashier-suggestion]').forEach((item) => item.addEventListener('click', () => addProduct(item.dataset.product)));
  renderCart();
})();
