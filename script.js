let products = [
    {
        id: 1,
        name: 'Mực Câu Khô 3 Nắng - Đại 500G',
        price: 985000,
        category: 'Mực khô',
        image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400',
        stock: 'Hết hàng',
        description: 'Mực câu khô cao cấp, phơi 3 nắng tự nhiên, thơm ngon đặc biệt'
    },
    {
        id: 2,
        name: 'Mực Rim Me Truyền Thống - Hũ 180g',
        price: 105000,
        category: 'Hải sản ăn liền',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
        stock: 'Còn hàng',
        description: 'Mực rim me theo công thức truyền thống, vị ngọt đậm đà'
    },
    {
        id: 3,
        name: 'Chả Bò Đà Nẵng - 500g',
        price: 195000,
        category: 'Bò khô',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400',
        stock: 'Còn hàng',
        description: 'Chả bò Đà Nẵng đặc sản, thơm ngon, chất lượng cao'
    },
    {
        id: 4,
        name: 'Trà Sâm Dứa Hoa Lài - hũ 150G',
        price: 55000,
        category: 'Trà & Cà phê',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
        stock: 'Còn hàng',
        description: 'Trà sâm dứa hoa lài thơm mát, giải nhiệt tuyệt vời'
    },
    {
        id: 5,
        name: 'Mè Xửng Huế Thượng Hạng - 250g',
        price: 40000,
        category: 'Bánh kẹo',
        image: 'https://images.unsplash.com/photo-1599785209796-786432b228bc?w=400',
        stock: 'Còn hàng',
        description: 'Mè xửng Huế truyền thống, thơm ngon, giòn tan'
    },
    {
        id: 6,
        name: 'Cá Bò Khô - 400G',
        price: 170000,
        category: 'Mực khô',
        image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400',
        stock: 'Còn hàng',
        description: 'Cá bò khô thơm ngon, chất lượng cao'
    }
];

let currentCategory = 'all';
let currentProductId = null;

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
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = count;
    }
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

// Render products
function renderProducts(productsToRender = products) {
    const grid = document.getElementById('productsGrid');
    const empty = document.getElementById('emptyState');

    if (productsToRender.length === 0) {
        grid.style.display = 'none';
        empty.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    empty.style.display = 'none';

    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card" onclick="showDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-stock ${product.stock === 'Hết hàng' ? 'out-of-stock' : ''}">
                    ${product.stock === 'Hết hàng' ? '❌ Hết hàng' : '✅ Còn hàng'}
                </div>
            </div>
        </div>
    `).join('');
}

// Show product detail
function showDetail(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    currentProductId = id;
    document.getElementById('detailTitle').textContent = product.name;
    document.getElementById('detailImage').src = product.image;
    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailPrice').textContent = formatPrice(product.price);
    document.getElementById('detailCategory').textContent = product.category;
    document.getElementById('detailStock').innerHTML = `<span class="${product.stock === 'Hết hàng' ? 'out-of-stock' : ''}">${product.stock}</span>`;
    document.getElementById('detailDescription').textContent = product.description || 'Chưa có mô tả';
    document.getElementById('modalQuantity').value = 1;

    document.getElementById('detailModal').classList.add('active');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Change quantity in modal
function changeQuantity(change) {
    const input = document.getElementById('modalQuantity');
    let value = parseInt(input.value) + change;
    if (value < 1) value = 1;
    input.value = value;
}

// Add to cart from modal
function addToCartFromModal() {
    const product = products.find(p => p.id === currentProductId);
    if (!product || product.stock === 'Hết hàng') {
        showToast('Sản phẩm đã hết hàng!');
        return;
    }

    const quantity = parseInt(document.getElementById('modalQuantity').value);
    const cart = getCart();
    
    const existingItem = cart.find(item => item.id === currentProductId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);
    closeModal('detailModal');
    showToast(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
}

// Filter by category
function filterCategory(category, btn) {
    currentCategory = category;
    
    document.querySelectorAll('.category-btn').forEach(button => {
        button.classList.remove('active');
    });
    btn.classList.add('active');

    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Search products
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query) {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}

// Enter key for search
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
}

// Initial render
renderProducts();
updateCartCount();