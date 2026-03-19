const WHATSAPP_NUMBER = "5511999999999";

const products = [
    // IPHONES - Imagens Certinhas e Estáveis
    { id: 1, cat: 'IPHONE', nome: "iPhone 14 128GB Blue", preco: 570, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-blue?wid=1000" },
    { id: 2, cat: 'IPHONE', nome: "iPhone 15 128GB Black", preco: 625, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=1000" },
    { id: 5, cat: 'IPHONE', nome: "iPhone 16 128GB Teal", preco: 745, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1000" },
    { id: 14, cat: 'IPHONE', nome: "iPhone 16 Pro 128GB Natural", preco: 958, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-naturaltitanium?wid=1000" },
    { id: 17, cat: 'IPHONE', nome: "iPhone 17 Pro Max 256GB Solar", preco: 1470, img: "https://vancitycomputech.com/wp-content/uploads/2024/09/iphone-16-pro-max-desert-titanium.png" },
    
    // WATCHES
    { id: 19, cat: 'WATCH', nome: "Apple Watch SE 2 44mm Starlight", preco: 223, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT9N3ref_VW_34FR+watch-44-alum-starlight-nc-se_VW_34FR_WF_CO?wid=1000" },
    { id: 23, cat: 'WATCH', nome: "Apple Watch Ultra 2 49mm", preco: 800, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT2C3ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR_WF_CO?wid=1000" },

    // TABLETS / MACS
    { id: 24, cat: 'APPLE', nome: "Macbook Air M3 13.6\"", preco: 1010, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-202402?wid=1000" },
    { id: 25, cat: 'APPLE', nome: "iPad Pro 11 M4 256GB", preco: 950, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-model-select-gallery-2-202405?wid=1000" },

    // XIAOMI / POCO
    { id: 28, cat: 'XIAOMI', nome: "Xiaomi Note 13 Pro 5G", preco: 238, img: "https://i03.appmifile.com/264_operator_sg/29/01/2024/76c6695b2938a9e7018d097d8cf129a0.png" },
    { id: 31, cat: 'POCO', nome: "Poco F6 Pro 256GB", preco: 575, img: "https://i03.appmifile.com/833_operator_sg/16/05/2024/d8702b3394b9f33b1e8e84128532f4a4.png" }
];

let cart = [];

// RENDERIZAR VITRINE
function render(category = 'TUDO') {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    const filtered = category === 'TUDO' ? products : products.filter(p => p.cat === category);

    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}" alt="${p.nome}" onerror="this.src='https://placehold.co/400x400/000/fff?text=Apple+Product'">
                <h3>${p.nome}</h3>
                <div class="price">U$ ${p.preco.toFixed(2)}</div>
                <button class="btn-buy" onclick="addToCart(${p.id})">ADICIONAR À BOLSA</button>
            </div>
        `;
    });
}

// LOGICA DO CARRINHO (AGORA COM QUANTIDADE)
function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }
    updateUI();
    if(window.innerWidth > 768) toggleCart();
}

function updateUI() {
    const count = document.getElementById('cart-count');
    const headerTotal = document.getElementById('cart-total-header');
    const finalTotal = document.getElementById('cart-total-final');
    const list = document.getElementById('cart-list');
    
    count.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
    list.innerHTML = '';
    
    let totalSum = 0;
    cart.forEach((item, index) => {
        const subtotal = item.preco * item.qty;
        totalSum += subtotal;
        list.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div style="flex:1">
                    <p style="font-weight:700; font-size:14px">${item.nome}</p>
                    <p style="color:var(--accent)">U$ ${item.preco.toFixed(2)}</p>
                    <div class="qty-ctrl">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>
                </div>
                <i class="fas fa-trash" style="color:red; cursor:pointer" onclick="removeItem(${index})"></i>
            </div>
        `;
    });

    const formatted = `U$ ${totalSum.toFixed(2)}`;
    headerTotal.innerText = formatted;
    finalTotal.innerText = formatted;
}

function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty < 1) return removeItem(index);
    updateUI();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateUI();
}

function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('active');
    const overlay = document.getElementById('cart-overlay');
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
}

function liveSearch() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.nome.toLowerCase().includes(term));
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h3>${p.nome}</h3>
                <div class="price">U$ ${p.preco.toFixed(2)}</div>
                <button class="btn-buy" onclick="addToCart(${p.id})">ADICIONAR À BOLSA</button>
            </div>
        `;
    });
}

function setActiveFilter(btn) {
    document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function sendToWhatsApp() {
    if(cart.length === 0) return alert("Sua bolsa está vazia!");
    let msg = "🚀 *NOVA TRANSMISSÃO BLACKHOLE TECH*\n\n";
    cart.forEach(item => {
        msg += `▪️ *${item.qty}x ${item.nome}* - U$ ${item.preco.toFixed(2)}\n`;
    });
    msg += `\n💰 *INVESTIMENTO TOTAL: ${document.getElementById('cart-total-final').innerText}*`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
}

render();