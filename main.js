// Bootstrap modal logic
const authModal = document.getElementById('auth-modal');
const signUpBtn = document.querySelector('.btn-signup');
const signInBtn = document.querySelector('.btn-signin');

if (signUpBtn) signUpBtn.addEventListener('click', () => showAuthModal('signup'));
if (signInBtn) signInBtn.addEventListener('click', () => showAuthModal('signin'));

document.addEventListener('click', (e) => {
  if (e.target === authModal) {
    hideAuthModal();
  }
});

function showAuthModal(type) {
  authModal.classList.remove('hidden');
  authModal.innerHTML = `
    <div class="modal-content bg-white p-4 rounded">
      <button class="close-modal btn btn-sm btn-secondary float-end">&times;</button>
      <h3 class="mb-3">${type === 'signup' ? 'Kayıt Ol' : 'Giriş Yap'}</h3>
      <form>
        <div class="mb-3">
          <label>E-posta</label>
          <input type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label>Şifre</label>
          <input type="password" class="form-control" required />
        </div>
        ${type === 'signup' ? '<div class="mb-3"><label>Ad Soyad</label><input type="text" class="form-control" required /></div>' : ''}
        <button type="submit" class="btn btn-primary w-100">${type === 'signup' ? 'Kayıt Ol' : 'Giriş Yap'}</button>
      </form>
    </div>
  `;
  document.querySelector('.close-modal').onclick = hideAuthModal;
}

function hideAuthModal() {
  authModal.classList.add('hidden');
  authModal.innerHTML = '';
}

// Simulate fetching featured items from backend
function fetchFeaturedItems() {
  // Simulated data with local images
  return [
    { title: 'Vintage Çiçekli Elbise', desc: 'Özel günler için mükemmel', price: 35, img: 'images/wj-dress.jpg', detay: 'Beden: M, Renk: Mavi, Kumaş: Pamuk' },
    { title: 'Vintage Kot Ceket', desc: 'Her kombine uygun zamansız stil', price: 45, img: 'images/wj-mens-jacket.jpg', detay: 'Beden: L, Renk: Açık Mavi, Kumaş: Kot' },
    { title: '4\'lü Şarap Kadehi Seti', desc: 'Şık sofralar için ideal', price: 20, img: 'images/wj-glasses.jpg', detay: 'Adet: 4, Malzeme: Cam, Yükseklik: 18cm' },
  ];
}

// --- SEPET LOCALSTORAGE YÖNETİMİ ---
function getCartLS() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCartLS(cartArr) {
  localStorage.setItem('cart', JSON.stringify(cartArr));
}

function addToCart(item) {
  let cartArr = getCartLS();
  cartArr.push(item);
  setCartLS(cartArr);
  showCartFabBadge();
  window.location.href = 'sepet.html';
}

function showCartFabBadge() {
  const fab = document.getElementById('cart-fab');
  if (!fab) return;
  let cartArr = getCartLS();
  let badge = fab.querySelector('.cart-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning';
    badge.style.fontSize = '0.8rem';
    badge.style.zIndex = '1';
    fab.appendChild(badge);
  }
  badge.textContent = cartArr.length;
  badge.style.display = cartArr.length ? 'inline' : 'none';
}

// --- SEPET SAYFASI LOGİĞİ ---
function renderCartPage() {
  if (!window.location.pathname.includes('sepet.html')) return;
  const cartList = document.getElementById('cart-list');
  let cartArr = getCartLS();
  if (!cartArr.length) {
    cartList.innerHTML = `<div class='alert alert-warning text-center'><i class="bi bi-cart-x"></i> Sepetiniz boş.</div>`;
    document.getElementById('pay-btn').style.display = 'none';
    return;
  }
  let toplam = cartArr.reduce((acc, urun) => acc + urun.price, 0);
  cartList.innerHTML = `
    <ul class="list-group mb-3">
      ${cartArr.map((urun, i) => `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span><img src="${urun.img}" style="width:40px;height:40px;object-fit:cover;border-radius:8px;margin-right:10px;">${urun.title}</span>
        <span>${urun.price} TL <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCartLS(${i})"><i class='bi bi-trash'></i></button></span>
      </li>`).join('')}
    </ul>
    <div class="mb-3 text-end fw-bold">Toplam: <span style="color:#e3121c;">${toplam} TL</span></div>
  `;
  document.getElementById('pay-btn').style.display = 'inline-block';
}

window.removeFromCartLS = function(idx) {
  let cartArr = getCartLS();
  cartArr.splice(idx, 1);
  setCartLS(cartArr);
  renderCartPage();
  showCartFabBadge();
}

// --- ÖDEME MODALI ---
function setupPaymentModal() {
  if (!window.location.pathname.includes('sepet.html')) return;
  document.getElementById('pay-btn').onclick = function() {
    let toplam = getCartLS().reduce((acc, urun) => acc + urun.price, 0);
    const modal = document.getElementById('payment-modal');
    modal.innerHTML = `
      <div style="background:#fff;border-radius:16px;box-shadow:0 4px 32px rgba(0,0,0,0.18);max-width:400px;width:90vw;padding:2rem;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2100;color:#171212;">
        <button style="position:absolute;top:10px;right:16px;font-size:1.5rem;background:none;border:none;color:#ebc4c7;" onclick="document.getElementById('payment-modal').style.display='none'">&times;</button>
        <h5><i class="bi bi-credit-card"></i> Güvenli Ödeme</h5>
        <form id="odeme-form">
          <div class="mb-3">
            <label>Kart Numarası</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-credit-card-2-front"></i></span>
              <input type="text" class="form-control" maxlength="19" required placeholder="0000 0000 0000 0000" />
            </div>
          </div>
          <div class="mb-3 d-flex gap-2">
            <div style="flex:1;">
              <label>SKT</label>
              <input type="text" class="form-control" maxlength="5" required placeholder="AA/YY" />
            </div>
            <div style="flex:1;">
              <label>CVC</label>
              <input type="text" class="form-control" maxlength="3" required placeholder="123" />
            </div>
          </div>
          <div class="mb-3">
            <label>E-posta (onay için)</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-envelope-at"></i></span>
              <input type="email" class="form-control" required placeholder="ornek@mail.com" id="odeme-email" />
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100"><i class="bi bi-lock"></i> Ödemeyi Tamamla</button>
        </form>
      </div>
      <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.3);z-index:2099;" onclick="document.getElementById('payment-modal').style.display='none'"></div>
    `;
    modal.style.display = 'block';
    document.getElementById('odeme-form').onsubmit = function(e) {
      e.preventDefault();
      setTimeout(() => {
        // Simulate email sending
        const email = document.getElementById('odeme-email').value;
        alert('Alışverişiniz onaylandı! Onay e-postası gönderildi: ' + email);
        // Backend entegrasyonu için örnek fetch:
        // fetch('/api/send-confirmation', {method:'POST',body:JSON.stringify({email}),headers:{'Content-Type':'application/json'}})
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
      }, 1000);
    };
  };
}

// --- TÜM SAYFALARDA ÜRÜN KARTLARI ---
function getPageProducts() {
  const path = window.location.pathname;
  if (path.includes('womens-clothes')) {
    return [
      { title: 'Vintage Çiçekli Elbise', desc: 'Özel günler için mükemmel', price: 35, img: 'images/wj-dress.jpg', detay: 'Beden: M, Renk: Mavi, Kumaş: Pamuk' },
      { title: 'Deri Bilek Botu', desc: 'Şık ve rahat', price: 60, img: 'images/wj-jacket.jpg', detay: 'Beden: 38, Renk: Siyah, Materyal: Deri' },
      { title: 'Kaşmir Kazak', desc: 'Sıcak tutar, yumuşak doku', price: 45, img: 'images/wj-sweater.jpg', detay: 'Beden: S, Renk: Krem, Kumaş: Kaşmir' },
    ];
  } else if (path.includes('mens-clothes')) {
    return [
      { title: 'Vintage Kot Ceket', desc: 'Her kombine uygun zamansız stil', price: 45, img: 'images/wj-mens-jacket.jpg', detay: 'Beden: L, Renk: Açık Mavi, Kumaş: Kot' },
      { title: 'Çizgili Pamuklu Gömlek', desc: 'Günlük kullanım için ideal', price: 30, img: 'images/wj-mens-shirt.jpg', detay: 'Beden: M, Renk: Beyaz/Mavi, Kumaş: Pamuk' },
      { title: 'Süet Loafer', desc: 'Şık ve rahat ayakkabı', price: 55, img: 'images/wj-mens-shoes.jpg', detay: 'Numara: 43, Renk: Kahverengi, Materyal: Süet' },
    ];
  } else if (path.includes('household-goods')) {
    return [
      { title: 'Vintage Seramik Vazo', desc: 'Dekoratif el yapımı vazo', price: 25, img: 'images/wj-vase.jpg', detay: 'Yükseklik: 22cm, Renk: Beyaz, Materyal: Seramik' },
      { title: 'El Dokuma Battaniye', desc: 'Sıcak ve yumuşak', price: 35, img: 'images/wj-blanket.jpg', detay: 'Ebat: 150x200cm, Renk: Gri, Materyal: Yün' },
      { title: '4\'lü Şarap Kadehi Seti', desc: 'Şık sofralar için ideal', price: 20, img: 'images/wj-glasses.jpg', detay: 'Adet: 4, Malzeme: Cam, Yükseklik: 18cm' },
    ];
  } else {
    // Anasayfa
    return fetchFeaturedItems();
  }
}

function renderFeaturedItems() {
  const items = getPageProducts();
  const grid = document.querySelector('.items-grid, #urunler-listesi');
  if (!grid) return;
  grid.innerHTML = items.map((item, idx) => `
    <div class="card h-100 shadow-sm">
      <img src="${item.img}" class="card-img-top" alt="${item.title}">
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.desc}</p>
        <div class="d-flex justify-content-between align-items-center">
          <span class="fw-bold">${item.price} TL</span>
          <div>
            <button class="btn btn-outline-primary btn-sm me-2" data-detay="${idx}"><i class="bi bi-info-circle"></i> Detay</button>
            <button class="btn btn-outline-success btn-sm" data-sepet="${idx}"><i class="bi bi-cart-plus"></i> Sepete Ekle</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Detay butonları için event ekle
  document.querySelectorAll('[data-detay]').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.getAttribute('data-detay');
      showProductDetail(items[idx]);
    });
  });
  // Sepete ekle butonları için event ekle
  document.querySelectorAll('[data-sepet]').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.getAttribute('data-sepet');
      addToCart(items[idx]);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedItems();
  setupDynamicMenu();
  showCartFabBadge();
  renderCartPage();
  setupPaymentModal();
});

// Ürün detay popup
function showProductDetail(item) {
  let popup = document.getElementById('product-detail-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'product-detail-popup';
    document.body.appendChild(popup);
  }
  popup.innerHTML = `
    <div style="background: #fff; border-radius: 16px; box-shadow: 0 4px 32px rgba(0,0,0,0.18); max-width: 400px; width: 90vw; padding: 2rem; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2000; color: #171212;">
      <button style="position:absolute;top:10px;right:16px;font-size:1.5rem;background:none;border:none;color:#ebc4c7;" onclick="document.getElementById('product-detail-popup').style.display='none'">&times;</button>
      <img src="${item.img}" alt="${item.title}" style="width:100%;border-radius:12px;margin-bottom:1rem;">
      <h4 style="color:#382929;">${item.title}</h4>
      <p style="color:#171212;">${item.desc}</p>
      <p style="color:#ba9e9e;"><b>Detaylar:</b> ${item.detay}</p>
      <div style="font-weight:bold;font-size:1.2rem;color:#e3121c;">${item.price} TL</div>
    </div>
    <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.3);z-index:1999;" onclick="document.getElementById('product-detail-popup').style.display='none'"></div>
  `;
  popup.style.display = 'block';
}

// Dinamik menü geçişi (SPA benzeri)
function setupDynamicMenu() {
  document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
} 