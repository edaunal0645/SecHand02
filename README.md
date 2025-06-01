# Gardırop Canlandır - İkinci El Ürün Yönetim Sistemi

## Proje Hakkında
Bu proje, ikinci el ürünlerin listelendiği, kullanıcıların alışveriş yapabildiği ve yöneticinin ürün ekleyip silebildiği modern bir web uygulamasıdır. Hem kullanıcılar hem de yöneticiler için kolay ve güvenli bir alışveriş deneyimi sunar.

## Kullanılan Teknolojiler
- **Django** (Backend)
- **Django REST Framework** (API)
- **CKEditor 5** (Zengin metin editörü)
- **React** (Admin Panel)
- **Chart.js** (Grafikler)
- **Bootstrap** (Tasarım)
- **Axios** (API ile veri alışverişi için)

## Kurulum Adımları

### 1. Python ve Node.js Kurulumu
- Python 3.8+ ve Node.js 16+ kurulu olmalı.
- Linux için:
  ```bash
  sudo apt install python3 python3-pip nodejs npm
  ```

### 2. Backend (Django) Kurulumu
```bash
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework pillow django-ckeditor
```

#### Django Projesi ve Uygulaması Oluştur
```bash
django-admin startproject secondhandportal backend
cd backend
python manage.py startapp shop
```

#### Ayarları Yap
- `backend/settings.py` dosyasında aşağıdaki satırları ekle:
  ```python
  INSTALLED_APPS = [
      # ...
      'rest_framework',
      'ckeditor',
      'shop',
  ]
  MEDIA_URL = '/media/'
  MEDIA_ROOT = BASE_DIR / 'media'
  ```

#### Modelleri ve Admin Panelini Ayarla
- `shop/models.py` ve `shop/admin.py` dosyalarını dökümantasyondaki gibi doldur.

#### Veritabanını Oluştur
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

#### Sunucuyu Başlat
```bash
python manage.py runserver
```
- Admin paneline git: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

### 3. Frontend (React) Kurulumu
```bash
cd ..
npx create-react-app admin-panel
cd admin-panel
npm install axios react-router-dom @ckeditor/ckeditor5-react ckeditor5 chart.js react-chartjs-2 bootstrap bootstrap-icons
npm start
```
- Panel açılır: [http://localhost:3000](http://localhost:3000)

### 4. GitHub'a Yükleme
```bash
git init
git add .
git commit -m "İlk yükleme"
```
- GitHub'da yeni bir repo oluştur.
- Komut satırında:
  ```bash
  git remote add origin https://github.com/KULLANICI_ADIN/REPO_ADI.git
  git branch -M main
  git push -u origin main
  ```

## Kullanım
- Django admin panelinden ürün ve kullanıcı yönetimi.
- React admin panelinden ürün ekleme, silme, güncelleme ve satış grafikleri.
- Kullanıcılar için modern, güvenli ve hızlı alışveriş deneyimi.

## Sıkça Sorulanlar
- **Kodları kopyalayıp yapıştırınca çalışmazsa:** Hata mesajını dikkatlice oku, eksik paketleri yükle, dosya yollarını ve Python/Node sürümünü kontrol et.
- **Panelde Türkçe karakterler bozuk çıkarsa:** Dosyaların kodlaması UTF-8 olmalı.
- **Resim yükleyemiyorum:** Django'da `MEDIA_URL` ve `MEDIA_ROOT` ayarlarını ve url yönlendirmesini kontrol et.

## Lisans
MIT 