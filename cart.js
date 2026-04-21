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

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Calculate totals
function calculateTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 30000 : 0;
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total };
}

// Update quantity
function updateQuantity(id, change) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;
        saveCart(cart);
        showToast('Đã cập nhật số lượng!');
    }
}

// Remove from cart
function removeFromCart(id) {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== id);
        saveCart(cart);
        showToast('Đã xóa sản phẩm khỏi giỏ hàng!');
    }
}

// Render cart
function renderCart() {
    const cart = getCart();
    const cartContent = document.getElementById('cartContent');
    const emptyCart = document.getElementById('emptyCart');

    // Update header badge
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) cartCountEl.textContent = count;

    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    cartContent.style.display = 'grid';
    emptyCart.style.display = 'none';

    const { subtotal, shipping, total } = calculateTotals();

    cartContent.innerHTML = `
        <div class="cart-items">
            <h2 style="margin-bottom: 20px;">Sản phẩm trong giỏ hàng</h2>
            ${cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${formatPrice(item.price)}</div>
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                            <input type="number" value="${item.quantity}" readonly>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            <button class="btn-remove" onclick="removeFromCart(${item.id})">Xóa</button>
                        </div>
                        <div style="margin-top: 10px; font-weight: 600; color: #333;">
                            Thành tiền: ${formatPrice(item.price * item.quantity)}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="cart-summary">
            <h2>Tóm tắt đơn hàng</h2>
            <div class="summary-row">
                <span>Tạm tính:</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Phí vận chuyển:</span>
                <span>${formatPrice(shipping)}</span>
            </div>
            <div class="summary-row summary-total">
                <span>Tổng cộng:</span>
                <span>${formatPrice(total)}</span>
            </div>
            <a href="checkout.html" class="btn btn-checkout">Tiến hành thanh toán</a>
        </div>
    `;
}

// Initial render
renderCart();