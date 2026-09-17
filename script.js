const roleData = {
  admin: {
    title: 'Admin Dashboard',
    stats: [
      { label: 'Total Sales', value: '$84.2K', trend: '+12.4%' },
      { label: 'Inventory', value: '94%', trend: '+3.1%' },
      { label: 'Active Cashiers', value: '18', trend: '+2' },
      { label: 'Net Profit', value: '$21.7K', trend: '+8.6%' }
    ],
    sales: [42, 68, 54, 78, 61, 85, 96],
    alerts: [
      { type: 'warning', title: 'Low stock', detail: 'Milk and bread below threshold', time: '12 min ago' },
      { type: 'danger', title: 'Expiry alert', detail: '8 products near expiry date', time: '30 min ago' },
      { type: 'success', title: 'Branch synced', detail: 'All stores updated successfully', time: '1 hr ago' }
    ],
    inventory: [
      ['Coconut Water', 'Beverage', '120', 'Good'],
      ['Rice Pack', 'Groceries', '72', 'Warn'],
      ['Fresh Milk', 'Dairy', '36', 'Low'],
      ['Instant Soup', 'Groceries', '90', 'Good'],
      ['Toothpaste', 'Essentials', '44', 'Warn']
    ],
    transactions: [
      { name: 'Cashier 03', amount: '$412.10' },
      { name: 'Cashier 07', amount: '$298.40' },
      { name: 'Cashier 11', amount: '$614.25' }
    ],
    features: [
      { icon: '📊', title: 'Sales Dashboard', text: 'Analytics and KPIs for branch performance.' },
      { icon: '📦', title: 'Inventory Control', text: 'Threshold alerts and stock restock suggestions.' },
      { icon: '🔒', title: 'Role Security', text: 'Admin-only access to reports and accounts.' },
      { icon: '🏬', title: 'Multi-Branch', text: 'Manage multiple store locations in one dashboard.' },
      { icon: '🧾', title: 'Audit Trails', text: 'Track transaction logs and cashier activity.' }
    ]
  },
  manager: {
    title: 'Manager Dashboard',
    stats: [
      { label: 'Supervisor Alerts', value: '14', trend: '+4' },
      { label: 'Promo Approvals', value: '6', trend: '+2' },
      { label: 'Low Stock', value: '11', trend: '-3' },
      { label: 'Cashier Score', value: '92%', trend: '+5%' }
    ],
    sales: [34, 46, 52, 63, 58, 70, 76],
    alerts: [
      { type: 'warning', title: 'Promo review', detail: 'Three discounts waiting for approval', time: '10 min ago' },
      { type: 'danger', title: 'Critical stock', detail: 'Rice and canned goods below threshold', time: '25 min ago' },
      { type: 'success', title: 'Shift update', detail: 'All staff tasks are on schedule', time: '1 hr ago' }
    ],
    inventory: [
      ['Rice Pack', 'Groceries', '28', 'Low'],
      ['Instant Noodles', 'Snacks', '184', 'Good'],
      ['Canned Tuna', 'Groceries', '52', 'Warn'],
      ['Soap', 'Essentials', '67', 'Good'],
      ['Coffee Beans', 'Beverage', '18', 'Low']
    ],
    transactions: [
      { name: 'Shift Summary', amount: '18 logs' },
      { name: 'Cashier 04', amount: '92% score' },
      { name: 'Promotions', amount: '5 pending' }
    ],
    features: [
      { icon: '✅', title: 'Promotion Approval', text: 'Review and approve limited-time discounts.' },
      { icon: '📉', title: 'Threshold Alerts', text: 'Monitor low stock and reorder actions.' },
      { icon: '👥', title: 'Employee Monitoring', text: 'Check cashier performance and sales flow.' },
      { icon: '🧾', title: 'Operational Reports', text: 'Review store performance and notifications.' },
      { icon: '🔔', title: 'Notifications', text: 'Receive alerts for warehouse and staff updates.' }
    ]
  },
  cashier: {
    title: 'Cashier Dashboard',
    stats: [
      { label: 'Today Sales', value: '$9.4K', trend: '+7.1%' },
      { label: 'Checkout Speed', value: '3.2 min', trend: '-0.6 min' },
      { label: 'Scan Accuracy', value: '98.7%', trend: '+1.2%' },
      { label: 'Transactions', value: '426', trend: '+28' }
    ],
    sales: [30, 44, 50, 67, 49, 72, 80],
    alerts: [
      { type: 'success', title: 'Queue moving', detail: 'Average queue time is under control', time: '5 min ago' },
      { type: 'warning', title: 'Barcode check', detail: '2 products requested manual verification', time: '18 min ago' },
      { type: 'danger', title: 'Payment issue', detail: 'One card reader needs review', time: '41 min ago' }
    ],
    inventory: [
      ['Energy Drink', 'Beverage', '142', 'Good'],
      ['Chips', 'Snacks', '201', 'Good'],
      ['Instant Noodles', 'Groceries', '74', 'Warn'],
      ['Toothpaste', 'Essentials', '61', 'Good'],
      ['Shampoo', 'Beauty', '32', 'Low']
    ],
    transactions: [
      { name: 'Customer #0132', amount: '$24.55' },
      { name: 'Customer #0189', amount: '$48.90' },
      { name: 'Customer #0217', amount: '$62.30' }
    ],
    features: [
      { icon: '🛒', title: 'Barcode Scanner', text: 'Quick item scanning for faster checkout.' },
      { icon: '🧾', title: 'Transaction Log', text: 'Capture each sale with audit records.' },
      { icon: '👤', title: 'Cashier Accounts', text: 'Separate identity and role-based access.' },
      { icon: '📱', title: 'Digital Receipts', text: 'Send sales receipts via email or app.' },
      { icon: '💳', title: 'Wallet Support', text: 'GCash, PayMaya, and other digital payments.' }
    ]
  },
  customer: {
    title: 'Customer Portal',
    stats: [
      { label: 'Loyalty Points', value: '8,440', trend: '+320' },
      { label: 'Saved Orders', value: '34', trend: '+6' },
      { label: 'Reservations', value: '12', trend: '+3' },
      { label: 'Redeemed', value: '522', trend: '+18%' }
    ],
    sales: [20, 38, 34, 52, 48, 57, 62],
    alerts: [
      { type: 'success', title: 'Welcome reward', detail: 'You have earned 200 points this week', time: 'Today' },
      { type: 'warning', title: 'Promo available', detail: '20% off on snack packs', time: '2 hrs ago' },
      { type: 'success', title: 'Order ready', detail: 'Your online order is prepared for pickup', time: 'Today' }
    ],
    inventory: [
      ['Organic Juice', 'Beverage', '39', 'Good'],
      ['Soda Mix', 'Beverage', '87', 'Good'],
      ['Protein Bar', 'Snacks', '22', 'Low'],
      ['Fresh Fruit', 'Produce', '56', 'Good'],
      ['Rice Bowl', 'Ready Meal', '12', 'Low']
    ],
    transactions: [
      { name: 'Loyalty reward', amount: '200 pts' },
      { name: 'Pickup order', amount: '$18.50' },
      { name: 'Reservation', amount: '2 items' }
    ],
    features: [
      { icon: '🎁', title: 'Loyalty Program', text: 'Earn points and redeem rewards on purchases.' },
      { icon: '🛍️', title: 'Online Orders', text: 'Browse items, reserve products, and order online.' },
      { icon: '🎤', title: 'Voice Search', text: 'Find products using voice commands.' },
      { icon: '🤖', title: 'Recommendations', text: 'Get suggested items based on purchase history.' },
      { icon: '🌐', title: 'Multi-language', text: 'Switch between English and Tagalog interfaces.' }
    ]
  }
};

const statsGrid = document.getElementById('statsGrid');
const salesChart = document.getElementById('salesChart');
const alertsList = document.getElementById('alertsList');
const inventoryTable = document.getElementById('inventoryTable');
const transactionsList = document.getElementById('transactionsList');
const featureGrid = document.getElementById('featureGrid');
const pageTitle = document.getElementById('pageTitle');
const searchInput = document.getElementById('searchInput');

function renderDashboard(role) {
  const data = roleData[role];
  pageTitle.textContent = data.title;

  statsGrid.innerHTML = data.stats
    .map(
      (stat) => `
        <div class="stat-card">
          <div class="stat-label">${stat.label}</div>
          <div class="stat-value">${stat.value}</div>
          <span class="stat-trend">${stat.trend}</span>
        </div>
      `
    )
    .join('');

  salesChart.innerHTML = data.sales
    .map(
      (value, index) => `
        <div class="bar-col">
          <div class="bar" style="height: ${value}%"></div>
          <span class="bar-label">${['M','T','W','T','F','S','S'][index]}</span>
        </div>
      `
    )
    .join('');

  alertsList.innerHTML = data.alerts
    .map(
      (alert) => `
        <li>
          <div class="alert-left">
            <span class="alert-icon ${alert.type}"></span>
            <div>
              <strong>${alert.title}</strong>
              <small>${alert.detail}</small>
            </div>
          </div>
          <small>${alert.time}</small>
        </li>
      `
    )
    .join('');

  inventoryTable.innerHTML = data.inventory
    .filter((row) => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return true;
      return row.some((cell) => cell.toLowerCase().includes(query));
    })
    .map(
      (row) => `
        <tr>
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td><span class="status-tag ${row[3].toLowerCase() === 'good' ? 'good' : row[3].toLowerCase() === 'warn' ? 'warn' : 'low'}">${row[3]}</span></td>
        </tr>
      `
    )
    .join('');

  transactionsList.innerHTML = data.transactions
    .map(
      (item) => `
        <div class="transaction-item">
          <div>
            <strong>${item.name}</strong>
            <small>Processed today</small>
          </div>
          <div class="transaction-amount">${item.amount}</div>
        </div>
      `
    )
    .join('');

  featureGrid.innerHTML = data.features
    .map(
      (feature) => `
        <div class="feature-card">
          <div class="feature-icon">${feature.icon}</div>
          <h4>${feature.title}</h4>
          <p>${feature.text}</p>
        </div>
      `
    )
    .join('');
}

document.querySelectorAll('.nav-item').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderDashboard(button.dataset.role);
  });
});

searchInput.addEventListener('input', () => {
  const activeRole = document.querySelector('.nav-item.active')?.dataset.role || 'admin';
  renderDashboard(activeRole);
});

renderDashboard('admin');
