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
function renderProducts(productsToRender = (typeof products !== 'undefined' ? products : [])) {
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
let currentProductList = typeof products !== 'undefined' ? products : [];

function renderProductsWithPagination(list = (typeof products !== 'undefined' ? products : [])) {
    const grid = document.getElementById('productsGrid');
    const pagination = document.getElementById('pagination');
    const emptyState = document.getElementById('emptyState');
    if (!grid) return;

    if (!list.length) {
        grid.innerHTML = '';
        if (pagination) pagination.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        const countInd = document.getElementById('resultCountIndicator');
        if(countInd) countInd.textContent = 'Không có sản phẩm nào';
        return;
    }
    if (emptyState) emptyState.style.display = 'none';

    const totalPages = Math.ceil(list.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const pageItems = list.slice(start, start + itemsPerPage);

    const countInd = document.getElementById('resultCountIndicator');
    if(countInd) {
        let end = start + itemsPerPage;
        if(end > list.length) end = list.length;
        countInd.textContent = `Hiển thị ${start + 1}–${end} của ${list.length} kết quả`;
    }

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
if (typeof products !== 'undefined') {
    if (typeof pageCategoryFilter !== 'undefined' && pageCategoryFilter) {
        currentProductList = pageCategoryFilter === 'all'
            ? products
            : products.filter(p => p.category === pageCategoryFilter);
    } else {
        currentProductList = products;
    }
    renderProductsWithPagination(currentProductList);
}
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

    // Initialize shop page logic if present
    if (typeof isShopPage !== 'undefined' && isShopPage) {
        initShopPage();
    }
});

// ================= SHOP PAGE ADVANCED LOGIC =================
function initShopPage() {
    renderFavoriteSidebar();
    
    const maxPrice = Math.max(...products.map(p => p.price));
    const minPriceSlider = document.getElementById('minPriceRange');
    const maxPriceSlider = document.getElementById('maxPriceRange');
    const priceDisplay = document.getElementById('priceRangeDisplay');
    const sliderTrack = document.getElementById('sliderTrack');
    
    if (minPriceSlider && maxPriceSlider) {
        minPriceSlider.max = maxPrice;
        maxPriceSlider.max = maxPrice;
        maxPriceSlider.value = maxPrice;
        minPriceSlider.value = 0;
        
        function updateSlider() {
            let minVal = parseInt(minPriceSlider.value);
            let maxVal = parseInt(maxPriceSlider.value);
            
            // Prevent crossing
            if (this.id === 'minPriceRange' && minVal > maxVal) {
                minPriceSlider.value = maxVal;
                minVal = maxVal;
            }
            if (this.id === 'maxPriceRange' && maxVal < minVal) {
                maxPriceSlider.value = minVal;
                maxVal = minVal;
            }
            
            if (priceDisplay) {
                priceDisplay.textContent = formatPrice(minVal) + ' – ' + formatPrice(maxVal);
            }
            
            // Adjust track background
            const percent1 = (maxPrice === 0) ? 0 : (minVal / maxPrice) * 100;
            const percent2 = (maxPrice === 0) ? 100 : (maxVal / maxPrice) * 100;
            if (sliderTrack) {
                sliderTrack.style.background = `linear-gradient(to right, #e0e0e0 ${percent1}%, var(--red-main) ${percent1}%, var(--red-main) ${percent2}%, #e0e0e0 ${percent2}%)`;
            }
        }
        
        minPriceSlider.addEventListener('input', updateSlider);
        maxPriceSlider.addEventListener('input', updateSlider);
        updateSlider.call(maxPriceSlider); // Initial call
    }
    
    applyAdvancedFilters();
}

function applyAdvancedFilters() {
    currentPage = 1;
    let filtered = [...products];

    // Search Box Logic
    const query = document.getElementById('searchInput')?.value?.toLowerCase();
    if (query) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    }

    // Category Filter
    const catCheckboxes = document.querySelectorAll('#categoryFilterList input:checked');
    if (catCheckboxes.length > 0) {
        const allowedCats = Array.from(catCheckboxes).map(cb => cb.value);
        filtered = filtered.filter(p => allowedCats.includes(p.category));
    }

    // Price Filter
    const minPriceVal = parseInt(document.getElementById('minPriceRange')?.value || 0);
    const maxPriceVal = parseInt(document.getElementById('maxPriceRange')?.value || Number.MAX_SAFE_INTEGER);
    filtered = filtered.filter(p => p.price >= minPriceVal && p.price <= maxPriceVal);

    // Sorting
    const sortVal = document.getElementById('sortSelect')?.value || 'default';
    if (sortVal === 'price-asc') {
        filtered.sort((a,b) => a.price - b.price);
    } else if (sortVal === 'price-desc') {
        filtered.sort((a,b) => b.price - a.price);
    } else if (sortVal === 'newest') {
        filtered.sort((a,b) => b.id - a.id);
    } else if (sortVal === 'popular') {
        // Just simulate sorting by a secondary attribute if available, or fake "popular" using id modulo
        filtered.sort((a,b) => ((a.id * 7) % 10) - ((b.id * 7) % 10));
    }

    currentProductList = filtered;
    renderProductsWithPagination(currentProductList);
}

// Intercept search products on shop page to not break advanced filters
const originalSearchProducts = searchProducts;
window.searchProducts = function() {
    if (typeof isShopPage !== 'undefined' && isShopPage) {
        applyAdvancedFilters();
    } else {
        originalSearchProducts();
    }
};
const originalSearchInputHandler = searchInput;
if (searchInput && typeof isShopPage !== 'undefined' && isShopPage) {
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') applyAdvancedFilters();
    });
}

function resetAllFilters() {
    const checkboxes = document.querySelectorAll('.shop-sidebar input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    const minPriceSlider = document.getElementById('minPriceRange');
    const maxPriceSlider = document.getElementById('maxPriceRange');
    if(minPriceSlider && maxPriceSlider) {
        minPriceSlider.value = 0;
        maxPriceSlider.value = maxPriceSlider.max;
        minPriceSlider.dispatchEvent(new Event('input'));
    }
    
    document.getElementById('sortSelect').value = 'default';
    document.getElementById('searchInput').value = '';
    
    applyAdvancedFilters();
}

function toggleMobileFilter() {
    const sidebar = document.getElementById('shopSidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

function renderFavoriteSidebar() {
    const container = document.getElementById('sidebarFavorites');
    if (!container) return;
    
    // Pick 4 random or top products for "favorites"
    const favs = products.slice(0, 4); // For demonstration, just taking the first 4
    
    container.innerHTML = favs.map(p => `
        <div class="sidebar-fav-item" onclick="showDetail(${p.id})">
            <img src="${p.image}" alt="${p.name}">
            <div class="sidebar-fav-info">
                <h4>${p.name}</h4>
                <div class="price">${formatPrice(p.price)}</div>
            </div>
        </div>
    `).join('');
}
