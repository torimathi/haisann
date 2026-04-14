// =============================================================
// PRODUCTS DATA – Chia sẻ chung giữa tất cả trang
// Trước khi load file này, set window._imgRoot:
//   Trang gốc (index, cam-nang...): window._imgRoot = '';
//   Trang trong danh-muc/:         window._imgRoot = '../';
// =============================================================
var _imgRoot = (typeof window._imgRoot !== 'undefined') ? window._imgRoot : '';

let products = [
    { id: 1, name: 'Ghẹ sữa ram giòn', price: 85000, category: 'Hải sản khô', image: 'https://i.pinimg.com/736x/bf/2e/5a/bf2e5aa1f08ad0d412530ab803861f7c.jpg', stock: 'Còn hàng', description: 'Ghẹ sữa rim vị cay ngọt, giòn rụm, giàu canxi, thích hợp làm món ăn vặt hấp dẫn.', note: '' },
    { id: 2, name: 'Cá bò rim me', price: 75000, category: 'Hải sản khô', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Cá bò lát mỏng dai ngon hòa quyện cùng nước sốt me chua cay đậm đà khó cưỡng.', note: '' },
    { id: 3, name: 'Mực hấp dừa', price: 95000, category: 'Hải sản khô', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Mực xé sợi hấp nước dừa giữ độ ngọt tự nhiên, thơm béo, sần sật cực kỳ bắt mồi.', note: '' },
    { id: 4, name: 'Mực cán nướng', price: 115000, category: 'Hải sản khô', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Mực tươi nướng thơm phức, cán mỏng tơi xốp, vị ngọt thanh tự nhiên từ biển Đà Nẵng.', note: '' },
    { id: 5, name: 'Cá chỉ vàng chua ngọt', price: 65000, category: 'Hải sản khô', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Cá chỉ vàng rim sốt chua ngọt, thịt cá chắc, thấm vị, dùng ăn cùng cơm rất ngon.', note: '' },
    { id: 6, name: 'Cá thiều nướng', price: 89000, category: 'Hải sản khô', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Cá thiều cắt sợi nướng vàng đều, mùi thơm đặc trưng, gia vị tẩm ướp rất vừa miệng.', note: '' },
    { id: 7, name: 'Xoài sấy dẻo', price: 55000, category: 'Trái cây sấy', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Xoài chín cây sấy dẻo tự nhiên, không đường, vị chua ngọt nhẹ nhàng, giàu vitamin.', note: '' },
    { id: 8, name: 'Xoài sấy dẻo muối ớt', price: 58000, category: 'Trái cây sấy', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Sự kết hợp độc đáo giữa xoài sấy dẻo và muối ớt cay nồng, kích thích vị giác.', note: '' },
    { id: 9, name: 'Mít sấy giòn', price: 45000, category: 'Trái cây sấy', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Mít thái sấy giòn tan, giữ nguyên hương vị thơm đặc trưng và độ ngọt lịm tự nhiên.', note: '' },
    { id: 10, name: 'Macca Đắk Lắk', price: 145000, category: 'Trái cây sấy', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Hạt Macca tuyển chọn từ Đắk Lắk, hạt to tròn, béo ngậy, giàu dinh dưỡng cho sức khỏe.', note: '' },
    { id: 11, name: 'Khô gà lá chanh', price: 65000, category: 'Khô bò', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Ức gà xé sợi sấy khô cùng lá chanh thơm ngát, vị cay cay mặn mặn cực ngon.', note: '' },
    { id: 12, name: 'Khô bò sợi', price: 125000, category: 'Khô bò', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Thịt bò tươi chế biến thành sợi, tẩm ướp ngũ vị hương đậm đà, chuẩn vị truyền thống.', note: '' },
    { id: 13, name: 'Mứt gừng dẻo tẩm mật ong', price: 70000, category: 'Mứt', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Gừng non thái lát dẻo thơm quyện cùng mật ong rừng, giúp làm ấm cơ thể hiệu quả.', note: '' },
    { id: 14, name: 'Táo sấy dẻo tẩm mật nho', price: 85000, category: 'Mứt', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Táo Ninh Thuận sấy dẻo hòa quyện mật nho nguyên chất, vị ngọt thanh và rất bổ dưỡng.', note: '' },
    { id: 15, name: 'Mứt mận xào gừng', price: 65000, category: 'Mứt', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Mận cơm chua ngọt xào cùng gừng tươi cay ấm, món ăn vặt tốt cho hệ tiêu hóa.', note: '' },
    { id: 16, name: 'Mứt mãng cầu', price: 75000, category: 'Mứt', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Mứt mãng cầu xiêm chua ngọt, dai dai, từng miếng mứt trắng ngần thơm lừng đặc trưng.', note: '' },
    { id: 17, name: 'Mứt rong sụn biển hữu cơ', price: 90000, category: 'Mứt', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Rong sụn thiên nhiên sấy cùng nước cốt trái cây, giòn sần sật, thanh mát cơ thể.', note: '' },
    { id: 18, name: 'Bánh dừa ngũ hạt', price: 50000, category: 'Mứt', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Bánh dừa nướng giòn tan kết hợp các loại hạt dinh dưỡng, thơm bùi, vị ngọt vừa.', note: '' },
    { id: 19, name: 'Trà sâm dứa hoa lài', price: 45000, category: 'Trà', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Trà sâm dứa đặc sản Đà Nẵng thơm hương lá dứa và hoa lài, giúp thanh nhiệt tốt.', note: '' },
    { id: 20, name: 'Trà hoa cúc cổ', price: 110000, category: 'Trà', image: _imgRoot + 'images/logo.png', stock: 'Còn hàng', description: 'Những nụ hoa cúc chi nhỏ xíu sấy khô, mang lại hương thơm thanh khiết, thư giãn.', note: '' }
];

