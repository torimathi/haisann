let currentCategory = 'all';
let currentProductId = null;

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
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

// Update cart count badge
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) cartCountEl.textContent = count;
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Render products grid (basic – used internally)
function renderProducts(productsToRender = products) {
    const grid = document.getElementById('productsGrid');
    const empty = document.getElementById('emptyState');
    if (!grid) return;

    if (productsToRender.length === 0) {
        grid.style.display = 'none';
        if (empty) empty.style.display = 'block';
        return;
    }
    grid.style.display = 'grid';
    if (empty) empty.style.display = 'none';

    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card" onclick="showDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-stock ${product.stock === 'Hết hàng' ? 'out-of-stock' : ''}">
                    ${product.stock === 'Hết hàng'
                        ? '<i class="fa-solid fa-circle-xmark"></i> Hết hàng'
                        : '<i class="fa-solid fa-circle-check"></i> Còn hàng'}
                </div>
            </div>
        </div>
    `).join('');
}

// Show product detail modal
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
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity });
    }
    saveCart(cart);
    closeModal('detailModal');
    showToast(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
}

// Filter by category (dùng ở index.html)
function filterCategory(category, event) {
    if (event) event.preventDefault();
    currentPage = 1;
    currentProductList = category === 'all' ? products : products.filter(p => p.category === category);
    renderProductsWithPagination(currentProductList);
}

// Search products (dùng ở index.html)
function searchProducts() {
    const query = document.getElementById('searchInput')?.value?.toLowerCase();
    currentPage = 1;
    if (!query) {
        currentProductList = products;
    } else {
        currentProductList = products.filter(p =>
            p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
        );
    }
    renderProductsWithPagination(currentProductList);
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
};

// Enter key for search
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') searchProducts();
    });
}

// Pagination
let currentPage = 1;
const itemsPerPage = 16;
let currentProductList = products;

function renderProductsWithPagination(list = products) {
    const grid = document.getElementById('productsGrid');
    const pagination = document.getElementById('pagination');
    const emptyState = document.getElementById('emptyState');
    if (!grid) return;

    if (!list.length) {
        grid.innerHTML = '';
        if (pagination) pagination.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    if (emptyState) emptyState.style.display = 'none';

    const totalPages = Math.ceil(list.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const pageItems = list.slice(start, start + itemsPerPage);

    grid.innerHTML = pageItems.map(product => `
        <div class="product-card" onclick="showDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-stock ${product.stock === 'Hết hàng' ? 'out-of-stock' : ''}">
                    ${product.stock === 'Hết hàng'
                        ? '<i class="fa-solid fa-circle-xmark"></i> Hết hàng'
                        : '<i class="fa-solid fa-circle-check"></i> Còn hàng'}
                </div>
            </div>
        </div>
    `).join('');

    if (pagination) {
        pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => `
            <button class="${currentPage === i + 1 ? 'active' : ''}" onclick="goToPage(${i + 1})">${i + 1}</button>
        `).join('');
    }
}

function goToPage(page) {
    currentPage = page;
    renderProductsWithPagination(currentProductList);
    document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =================== INIT ===================
// Nếu có pageCategoryFilter (set bởi trang danh mục), lọc trước khi render
if (typeof pageCategoryFilter !== 'undefined' && pageCategoryFilter) {
    currentProductList = pageCategoryFilter === 'all'
        ? products
        : products.filter(p => p.category === pageCategoryFilter);
} else {
    currentProductList = products;
}
renderProductsWithPagination(currentProductList);
updateCartCount();

// Hero Banner Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-banner .slide');
    if (slides.length <= 1) return;
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}
initHeroSlider();

// Dropdown click support
document.addEventListener('DOMContentLoaded', () => {
    const categoryTrigger = document.querySelector('.category-trigger');
    const categoryLink = document.querySelector('.category-trigger > a');
    if (categoryTrigger && categoryLink) {
        categoryLink.addEventListener('click', (e) => {
            e.preventDefault();
            categoryTrigger.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!categoryTrigger.contains(e.target)) {
                categoryTrigger.classList.remove('active');
            }
        });
    }
});
