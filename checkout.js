// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Calculate totals
function calculateTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 30000;
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total };
}

// Generate order code
function generateOrderCode() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `DH${timestamp}${random}`;
}

// Render order summary
function renderOrderSummary() {
    const cart = getCart();
    
    // Update header badge
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) cartCountEl.textContent = count;
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    const { subtotal, shipping, total } = calculateTotals();
    const orderItems = document.getElementById('orderItems');
    
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <div>
                <strong>${item.name}</strong>
                <div style="font-size: 13px; color: #666;">SL: ${item.quantity}</div>
            </div>
            <div>${formatPrice(item.price * item.quantity)}</div>
        </div>
    `).join('');

    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = formatPrice(shipping);
    document.getElementById('finalTotal').textContent = formatPrice(total);

    // Set transfer content
    const orderCode = generateOrderCode();
    document.getElementById('transferContent').textContent = orderCode;
}

// Toggle QR section
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const qrSection = document.getElementById('qrCodeSection');
        if (this.value === 'qr') {
            qrSection.style.display = 'block';
        } else {
            qrSection.style.display = 'none';
        }
    });
});

// Handle form submission
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    const note = document.getElementById('note').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    if (!fullName || !phone || !address || !city || !district) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    // Generate order code
    const orderCode = generateOrderCode();

    // Save order info (in real app, send to server)
    const order = {
        code: orderCode,
        customer: { fullName, phone, address, city, district, note },
        items: getCart(),
        payment: payment,
        total: calculateTotals().total,
        date: new Date().toISOString()
    };

    console.log('Order placed:', order);

    // Clear cart
    localStorage.removeItem('cart');

    // Show success modal
    document.getElementById('orderCode').textContent = orderCode;
    document.getElementById('successModal').classList.add('active');
});

// Initial render
renderOrderSummary();