let products = [
    {
        id: 1,
        name: 'Cá bò ò ò',
        price: 89000,
        category: 'Bò khô',
        image: 'images/cabo1.png',
        stock: 'Hết hàng',
        description: 'Bò khô ngon vkl'
    },
    {
        id: 2,
        name: 'Mực Rim Me Truyền Thống - Hũ 180g',
        price: 105000,
        category: 'Hải sản ăn liền',
        image: 'https://vigift.vn/wp-content/uploads/2021/06/muc-rim-me-da-nang-2-min-1.png',
        stock: 'Còn hàng',
        description: 'Mực rim me theo công thức truyền thống, vị ngọt đậm đà'
    },
    {
        id: 3,
        name: 'Chả Bò Đà Nẵng - 500g',
        price: 195000,
        category: 'Quà Lưu Niệm',
        image: 'https://dacsanlamqua.com/wp-content/uploads/2017/05/cha-bo-da-nang.jpg',
        stock: 'Còn hàng',
        description: 'Chả bò Đà Nẵng đặc sản, thơm ngon, chất lượng cao'
    },
    {
        id: 4,
        name: 'Trà Sâm Dứa Hoa Lài - Hũ 150g',
        price: 55000,
        category: 'Trà & Cà phê',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
        stock: 'Còn hàng',
        description: 'Trà sâm dứa hoa lài thơm mát, giải nhiệt'
    },
    {
        id: 5,
        name: 'Mè Xửng Huế Thượng Hạng - 250g',
        price: 40000,
        category: 'Bánh kẹo',
        image: 'https://quahueonline.com/wp-content/uploads/2019/12/%C4%90%E1%BA%B7c-s%E1%BA%A3n-Hu%E1%BA%BF-M%C3%A8-x%E1%BB%ADng-Thi%C3%AAn-H%C6%B0%C6%A1ng-th%C6%B0%E1%BB%A3ng-h%E1%BA%A1ng-T%C3%BAi-450gr-4.jpg',
        stock: 'Còn hàng',
        description: 'Mè xửng Huế truyền thống'
    },
    {
        id: 6,
        name: 'Cá Bò Khô - 400g',
        price: 170000,
        category: 'Mực khô',
        image: 'https://quabinhdinh.vn/wp-content/uploads/2021/03/ca-bo.jpg',
        stock: 'Còn hàng',
        description: 'Cá bò khô đậm vị biển'
    },
    // Thêm 20 sản phẩm tiếp theo
    {
        id: 7,
        name: 'Tôm Khô Cà Mau - 300g',
        price: 285000,
        category: 'Mực khô',
        image: 'https://vietair.com.vn/Media/Images/tom-kho-ca-mau.jpg',
        stock: 'Còn hàng',
        description: 'Tôm khô Cà Mau ngọt thịt, phơi nắng tự nhiên'
    },
    {
        id: 8,
        name: 'Mực Một Nắng Phan Thiết - 500g',
        price: 365000,
        category: 'Mực khô',
        image: 'https://danviet-24h.ex-cdn.com/files/upload/1-2021/images/2021-03-22/4-1616396732-810-width629height377.jpg',
        stock: 'Còn hàng',
        description: 'Mực một nắng dày thịt, nướng than cực ngon'
    },
    {
        id: 9,
        name: 'Khô Gà Lá Chanh - Hũ 200g',
        price: 89000,
        category: 'Bò khô',
        image: 'https://traicaysaynutfarm.com/wp-content/uploads/2021/03/z3382733374647_5728c51392b3a008fa33c289d2f396ae.jpg',
        stock: 'Còn hàng',
        description: 'Khô gà xé sợi, vị cay nhẹ, thơm lá chanh'
    },
    {
        id: 10,
        name: 'Cá Thiều Que Cay - 250g',
        price: 75000,
        category: 'Mực khô',
        image: 'https://vigift.vn/wp-content/uploads/2021/12/ca-thieu-que-dac-san-da-nang-lam-qua-1.png',
        stock: 'Còn hàng',
        description: 'Cá thiều tẩm gia vị cay mặn ngọt hấp dẫn'
    },
    {
        id: 11,
        name: 'Trà Sen Tây Hồ - Hộp 100g',
        price: 120000,
        category: 'Trà & Cà phê',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuSAtcGFU5kgl3UMFshZk-9OKhMIGijLLng&s',
        stock: 'Còn hàng',
        description: 'Trà sen ướp hoa sen tự nhiên, hương thơm thanh tao'
    },
    {
        id: 12,
        name: 'Cà Phê Rang Xay Đà Lạt - 500g',
        price: 165000,
        category: 'Trà & Cà phê',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC0H5EcBCqSBqUoBTTnwa6gQWdhnvFCc7Sqg&s',
        stock: 'Còn hàng',
        description: 'Cà phê rang mộc, vị đậm đà, hậu ngọt'
    },
    {
        id: 13,
        name: 'Bánh Dừa Nướng Bến Tre - 300g',
        price: 45000,
        category: 'Bánh kẹo',
        image: 'https://minhcaumart.vn//media/com_eshop/products/resized/8936063781025-500x500.webp',
        stock: 'Còn hàng',
        description: 'Bánh dừa nướng giòn rụm, thơm béo'
    },
    {
        id: 14,
        name: 'Kẹo Dừa Non Bến Tre - 250g',
        price: 38000,
        category: 'Bánh kẹo',
        image: 'https://dacsanxudua.com/wp-content/uploads/2014/08/keo-dua-non.png?4f7732&4f7732',
        stock: 'Còn hàng',
        description: 'Kẹo dừa mềm, ít ngọt, không dính răng'
    },
    {
        id: 15,
        name: 'Khô Bò Sợi Cay - 200g',
        price: 135000,
        category: 'Bò khô',
        image: 'https://file.hstatic.net/200000700229/article/cach-lam-bo-kho-soi-thumb_685640ffe3114211a9e0b9caf36e510d.jpg',
        stock: 'Còn hàng',
        description: 'Bò khô sợi mềm, vị cay ngọt đậm đà'
    },
    {
        id: 16,
        name: 'Bò Khô Miếng Lớn - 300g',
        price: 215000,
        category: 'Bò khô',
        image: 'https://ann.com.vn/wp-content/uploads/22742_bo-kho-da-nang-01-1629271455_20241113154310-5.jpg',
        stock: 'Còn hàng',
        description: 'Bò khô miếng lớn, dai mềm vừa phải'
    },
    {
        id: 17,
        name: 'Cá Chỉ Vàng Khô - 400g',
        price: 125000,
        category: 'Mực khô',
        image: 'https://quabinhdinh.vn/wp-content/uploads/2021/03/ca-chi-vang.jpg',
        stock: 'Còn hàng',
        description: 'Cá chỉ vàng khô, nướng ăn cực bắt bia'
    },
    {
        id: 18,
        name: 'Khô Mực Tẩm Gia Vị - 250g',
        price: 155000,
        category: 'Mực khô',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlsxXu2VZAv-aRNSAdncU3eaWOAOVpbLtrUw&s',
        stock: 'Còn hàng',
        description: 'Mực tẩm gia vị cay ngọt, ăn liền tiện lợi'
    },
    {
        id: 19,
        name: 'Hạt Điều Rang Muối Bình Phước - 500g',
        price: 185000,
        category: 'Bánh kẹo',
        image: 'https://quaqueviet.vn/upload/imgproduct/hat-dieu-rang-muoi-1-min.jpg',
        stock: 'Còn hàng',
        description: 'Hạt điều rang muối béo bùi, giàu dinh dưỡng'
    },
    {
        id: 20,
        name: 'Mít Sấy Giòn - 200g',
        price: 55000,
        category: 'Bánh kẹo',
        image: 'https://traicaysaynutfarm.com/wp-content/uploads/2021/03/mit-1.jpg',
        stock: 'Còn hàng',
        description: 'Mít sấy giòn rụm, giữ vị ngọt tự nhiên'
    },
    {
        id: 21,
        name: 'Chuối Sấy Dẻo - 250g',
        price: 48000,
        category: 'Bánh kẹo',
        image: 'https://traicayhatsay.com/kcfinder/upload/images/chuoi-say-deo-dac-biet-trai-cay-hat-say-com-1.jpg',
        stock: 'Còn hàng',
        description: 'Chuối sấy dẻo, ít đường, ăn vặt healthy'
    },
    {
        id: 22,
        name: 'Khô Cá Lóc Đồng - 500g',
        price: 295000,
        category: 'Mực khô',
        image: 'https://dacsanmuicamau.com/static/product/2023/0701/kho-ca-loc-cung-43-236.jpg',
        stock: 'Còn hàng',
        description: 'Cá lóc đồng phơi nắng tự nhiên, thơm ngon'
    },
    {
        id: 23,
        name: 'Trà Gừng Mật Ong - Hộp 20 gói',
        price: 75000,
        category: 'Trà & Cà phê',
        image: 'https://goldenfarm.com.vn/wp-content/uploads/2024/02/tra-gung-mat-ong-vi-a-450g-scaled.webp',
        stock: 'Còn hàng',
        description: 'Trà gừng mật ong giúp ấm bụng, dễ uống'
    },
    {
        id: 24,
        name: 'Cà Phê Sữa Hòa Tan - Hộp 20 gói',
        price: 69000,
        category: 'Trà & Cà phê',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4lP42RLqZRsypuS-9in2AgWkvesk4SPkuw&s',
        stock: 'Còn hàng',
        description: 'Cà phê sữa hòa tan tiện lợi, vị đậm đà'
    },
    {
        id: 25,
        name: 'Khô Heo Cháy Tỏi - 200g',
        price: 99000,
        category: 'Hải sản ăn liền',
        image: 'https://cdn.tgdd.vn/2021/03/CookRecipe/Avatar/kho-heo-chay-toi-thumbnail.jpg',
        stock: 'Còn hàng',
        description: 'Khô heo cháy tỏi thơm nồng, ăn vặt cực cuốn'
    },
    {
        id: 26,
        name: 'Cá Mai Tẩm Mè - 250g',
        price: 115000,
        category: 'Hải sản ăn liền',
        image: 'https://dacsandananghongocha.com/wp-content/uploads/2018/11/C%C3%81-MAI-T%E1%BA%A8M-M%C3%88-3.jpg',
        stock: 'Còn hàng',
        description: 'Cá mai tẩm mè rang, giòn ngon, đậm vị'
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
${product.stock === 'Hết hàng'
            ? '<i class="fa-solid fa-circle-xmark"></i> Hết hàng'
            : '<i class="fa-solid fa-circle-check"></i> Còn hàng'}
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
function filterCategory(category, event) {
    if (event) event.preventDefault();
    currentPage = 1;

    if (category === 'all') {
        currentProductList = products;
    } else {
        currentProductList = products.filter(p => p.category === category);
    }

    renderProductsWithPagination(currentProductList);
}


// Search products
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    currentPage = 1;

    if (!query) {
        currentProductList = products;
    } else {
        currentProductList = products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    }

    renderProductsWithPagination(currentProductList);
}


// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}

// Enter key for search
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
}
let currentPage = 1;
const itemsPerPage = 16; // mỗi trang 8 sản phẩm cho đẹp layout
let currentProductList = products; // products = mảng sản phẩm của bạn

function renderProductsWithPagination(list = products) {
    const grid = document.getElementById('productsGrid');
    const pagination = document.getElementById('pagination');
    const emptyState = document.getElementById('emptyState');

    if (!list.length) {
        grid.innerHTML = '';
        pagination.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    const totalPages = Math.ceil(list.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = list.slice(start, end);

    // Render sản phẩm
    grid.innerHTML = pageItems.map(product => `
        <div class="product-card" onclick="showDetail(${product.id})">
            <img src="${product.image}" class="product-image">
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

    // Render pagination
    pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => `
        <button 
            class="${currentPage === i + 1 ? 'active' : ''}" 
            onclick="goToPage(${i + 1})">
            ${i + 1}
        </button>
    `).join('');
}

function goToPage(page) {
    currentPage = page;
    renderProductsWithPagination(currentProductList);
    document.querySelector('.products-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}


renderProductsWithPagination(products);

// Hero Banner Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-banner .slide');
    if (slides.length <= 1) return;

    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000); // 5000ms = 5s
}
initHeroSlider();

// Dropdown click for mobile/desktop support
document.addEventListener('DOMContentLoaded', () => {
    const categoryTrigger = document.querySelector('.category-trigger');
    const categoryLink = document.querySelector('.category-trigger > a');

    if (categoryTrigger && categoryLink) {
        // Toggle on click
        categoryLink.addEventListener('click', (e) => {
            e.preventDefault();
            categoryTrigger.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!categoryTrigger.contains(e.target)) {
                categoryTrigger.classList.remove('active');
            }
        });
    }
});
