# Toko Bunga Indo - Flower Shop Website

Website toko bunga modern dengan Next.js, TypeScript, Tailwind CSS, dan MySQL (RumahWeb).

## Fitur

### Untuk Pelanggan
- **Landing Page** - Hero section, produkUnggulan, dan keunggulan
- **Katalog Produk** - Tampilan grid semua bunga dengan filter kategori
- **Detail Produk** - Gambar, deskripsi, dan harga
- **Keranjang Belanja** - localStorage untuk persistensi data
- **Checkout WhatsApp** - Integrasi langsung ke WhatsApp untuk pemesanan

### Untuk Admin
- **Login Admin** - Sistem autentikasi berbasis MySQL
- **Dashboard** - Overview semua produk
- **Tambah Produk** - Form tambah produk dengan upload gambar
- **Edit Produk** - Update informasi produk
- **Hapus Produk** - Hapus produk dari katalog

### Teknis
- **Responsive Design** - Mobile-first dengan Tailwind CSS
- **TypeScript** - Type-safe code
- **Server-Side Rendering** - Next.js App Router
- **REST API** - Backend menggunakan MySQL + Node.js API routes

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: MySQL (RumahWeb)
- **Authentication**: MySQL + bcrypt
- **File Upload**: Local storage (/public/uploads)

## Struktur Project

```
toko-bunga/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── layout.tsx               # Root layout
│   │   ├── globals.css               # Global styles
│   │   ├── katalog/
│   │   │   └── page.tsx              # Katalog produk
│   │   ├── produk/[id]/
│   │   │   └── page.tsx              # Detail produk
│   │   ├── keranjang/
│   │   │   └── page.tsx              # Keranjang belanja
│   │   ├── checkout/
│   │   │   └── page.tsx              # Checkout
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Login admin
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Dashboard admin
│   │   │   ├── tambah/
│   │   │   │   └── page.tsx          # Tambah produk
│   │   │   └── edit/[id]/
│   │   │       └── page.tsx          # Edit produk
│   │   └── api/                      # API Routes
│   │       ├── products/
│   │       ├── categories/
│   │       ├── auth/
│   │       └── upload/
│   ├── components/                   # Komponen UI
│   ├── lib/
│   │   ├── db.ts                     # MySQL connection
│   │   ├── auth.ts                   # Auth utilities
│   │   └── utils.ts                  # Utility functions
│   └── types/                        # TypeScript types
├── public/
│   └── uploads/                      # Gambar produk
├── mysql-schema.sql                  # Schema database
└── package.json
```

## Cara Install & Deploy ke RumahWeb

### Langkah 1: Clone Project

```bash
git clone https://github.com/username/toko-bunga.git
cd toko-bunga
```

### Langkah 2: Install Dependencies

```bash
npm install
```

### Langkah 3: Setup Database MySQL (di cPanel RumahWeb)

1. Login ke cPanel RumahWeb
2. Buka **MySQL Database Wizard** atau **phpMyAdmin**
3. Buat database baru (contoh: `tokobunga_db`)
4. Buat user database dan password
5. Import schema SQL:

Buka **phpMyAdmin** → Pilih database → Klik tab **Import** → Pilih file `mysql-schema.sql` → Klik **Go**

### Langkah 4: Konfigurasi Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` dengan credentials RumahWeb:

```env
MYSQL_HOST=localhost
MYSQL_USER=username_database_kamu
MYSQL_PASSWORD=password_database_kamu
MYSQL_DATABASE=tokobunga_db
ADMIN_TOKEN=rahasia_admin_123456
```

### Langkah 5: Buat User Admin

Setelah import schema SQL, insert user admin manual di phpMyAdmin:

```sql
INSERT INTO users (email, password, name) 
VALUES ('admin@tokobunga.com', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Admin');
```

Password: `admin123` (atau hash bcrypt yang baru)

Generate password hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
```

### Langkah 6: Build Project

```bash
npm run build
```

### Langkah 7: Deploy ke RumahWeb

**Opsi A: Gunakan Node.js Selector (rekomendasi)**

1. Login cPanel RumahWeb
2. Buka **Setup Node.js App**
3. Klik **Create Application**:
   - Node.js version: `18` atau `20`
   - Application mode: `Production`
   - Application root: `/home/username/toko-bunga`
   - Application URL: pilih domain/subdomain
   - Startup file: `npm start` (setelah build)
4. Klik **Create**
5. Di bagian **Run NPM Install**, klik tombol untuk install dependencies
6. Buat file `.env` di root folder dengan credentials database
7. Buat folder `public/uploads` dengan permission 755

**Opsi B: Upload Manual**

1. Build dulu: `npm run build`
2. Upload folder `.next`, `public`, `src` ke server
3. Upload file: `package.json`, `package-lock.json`, `next.config.js`, `.env.local`
4. Di terminal server: `npm install && npm start`

## Halaman Website

| Route | Deskripsi |
|-------|-----------|
| `/` | Landing page dengan hero dan produkUnggulan |
| `/katalog` | Katalog lengkap semua produk |
| `/produk/[id]` | Detail produk individual |
| `/keranjang` | Keranjang dengan quantity control |
| `/checkout` | Checkout dengan generate pesan WhatsApp |
| `/admin/login` | Login admin |
| `/admin/dashboard` | Dashboard manajemen produk |
| `/admin/tambah` | Form tambah produk baru |
| `/admin/edit/[id]` | Edit produk yang ada |

## API Reference

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/products` | GET | Ambil semua produk |
| `/api/products?available=true` | GET | Produk yang tersedia saja |
| `/api/products` | POST | Tambah produk (admin) |
| `/api/products/[id]` | GET | Ambil satu produk |
| `/api/products/[id]` | PUT | Update produk (admin) |
| `/api/products/[id]` | DELETE | Hapus produk (admin) |
| `/api/categories` | GET | Ambil semua kategori |
| `/api/auth/login` | POST | Login admin |
| `/api/auth/logout` | POST | Logout admin |
| `/api/auth/session` | GET | Cek session |
| `/api/upload` | POST | Upload gambar (admin) |

## Troubleshooting

### Error: Can't connect to MySQL
- Cek credentials di `.env`
- Pastikan user memiliki akses ke database
- Host MySQL biasanya `localhost` di RumahWeb

### Error: Upload folder not writable
```bash
chmod 755 public/uploads
```

### Error: bcrypt hash error
Pastikan sudah install `bcryptjs` (bukan `bcrypt` yang butuh native compilation)

### Page not found setelah deploy
- Pastikan sudah run `npm run build`
- Cek file `.htaccess` untuk konfigurasi Next.js

## Lisensi

Project ini untuk keperluan edukasi. Modifikasi sesuai kebutuhan toko bunga kamu.

## Credit

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [MySQL Documentation](https://dev.mysql.com/doc/)
