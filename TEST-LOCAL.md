# Cara Test Local dengan Laragon

Panduan menjalankan website Toko Bunga secara local menggunakan Laragon.

---

## Bagian 1: Install Laragon

### 1.1 Download Laragon

1. Buka https://laragon.org/download/
2. Download Laragon Full (包含了 Node.js)
3. Install seperti biasa

### 1.2 Start Laragon

1. Buka Laragon
2. Klik **Start All**
3. Pastikan status:
   - Apache: Running (hijau)
   - MySQL: Running (hijau)
   - Node.js: Running (hijau)

---

## Bagian 2: Setup Database MySQL

### 2.1 Buka phpMyAdmin

1. Klik tombol **phpMyAdmin** di Laragon
2. Akan membuka `http://localhost/phpmyadmin`
3. Login dengan user: `root`, password: (kosong)

### 2.2 Buat Database

1. Klik tab **Databases**
2. Di input **Create database**:
   - Nama: `toko_bunga`
   - Collation: `utf8mb4_unicode_ci`
3. Klik **Create**

### 2.3 Import Schema

1. Klik database `toko_bunga` di sidebar kiri
2. Klik tab **Import**
3. Klik **Choose File**
4. Pilih file `mysql-schema.sql` di folder project
5. Scroll ke bawah, klik **Go**

### 2.4 Insert Admin User

1. Di sidebar kiri, klik tabel `users`
2. Klik tab **Insert**
3. Isi data berikut:

| Column | Value |
|--------|-------|
| email | admin@tokobunga.com |
| password | $2a$10$rQZ8kHxMBOx3GHOz0l5KxOGxNMJ8Kz3YvVx3qz3qz3qz3qz3qz3q |
| name | Admin |

4. Klik **Go**

> **Note**: Password di atas adalah hash dari `admin123`. Kalau mau buat yang baru, jalankan:
> ```bash
> node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
> ```
> Copy hasilnya ke kolom password.

---

## Bagian 3: Konfigurasi Project

### 3.1 Buka Folder Project

1. Copy folder project ke folder Laragon:
   ```
   C:\laragon\www\toko-bunga
   ```

   Atau buat symlink/shortcut.

### 3.2 Setup Environment Variables

1. Copy file `.env.example` jadi `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

2. Edit `.env.local`:

   ```env
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=
   MYSQL_DATABASE=toko_bunga
   ADMIN_TOKEN=rahasia_token_12345
   ```

### 3.3 Install Dependencies

Buka terminal di folder project:

```bash
npm install
```

---

## Bagian 4: Jalankan Project

### 4.1 Cara 1: Pakai Laragon (Recommended)

1. Klik kanan di area kosong Laragon → **Quick Add**
2. Ketik: `tokobunga`
3. Klik **OK**
4. Buka `http://tokobunga.test` di browser

Laragon akan otomatis running `npm run dev`.

### 4.2 Cara 2: Manual

```bash
cd C:\laragon\www\toko-bunga
npm run dev
```

Buka `http://localhost:3000` di browser.

---

## Bagian 5: Testing

### Checklist Testing

| Fitur | Cara Test |
|-------|-----------|
| Landing Page | Buka `http://tokobunga.test` - harus muncul hero dan produk |
| Katalog | Klik menu Katalog - harus muncul grid produk |
| Detail Produk | Klik produk - harus muncul detail dan harga |
| Tambah Keranjang | Klik tombol "Tambah ke Keranjang" |
| Keranjang | Klik menu Keranjang - harus muncul produk yang ditambah |
| Checkout | Klik checkout - harus muncul form dan tombol WhatsApp |
| Login Admin | Buka `http://tokobunga.test/admin/login` |
| Dashboard | Login dengan admin@tokobunga.com / admin123 |

### Testing Admin

1. Buka `http://tokobunga.test/admin/login`
2. Login:
   - Email: `admin@tokobunga.com`
   - Password: `admin123`
3. Test tambah produk baru
4. Test edit produk
5. Test hapus produk
6. Test upload gambar

---

## Troubleshooting

### Error: Access denied for user 'root'@'localhost'

Cek password MySQL:
1. Klik icon MySQL di Laragon → **Root password**
2. Set password atau kosongkan
3. Update `.env.local` sesuai

### Error: Database 'toko_bunga' doesn't exist

1. Buka phpMyAdmin
2. Cek apakah database `toko_bunga` sudah dibuat
3. Kalau belum, buat ulang (lihat Bagian 2)

### Error: Cannot find module 'mysql2'

```bash
npm install mysql2
```

### Error: Port 3000 already used

```bash
# Cek apa yang pake port 3000
netstat -ano | findstr :3000

# Kill proses
taskkill /PID <PID> /F
```

### Error: bcrypt not defined

Pastikan pakai `bcryptjs`:
```bash
npm uninstall bcrypt
npm install bcryptjs
```

---

## Catatan Penting

1. **Menggunakan Laragon**: Project akan running di `http://tokobunga.test`
2. **Hot Reload**: Perubahan code akan langsung ter-refresh
3. **Database Reset**: Kalau mau reset database, drop tables dan import ulang `mysql-schema.sql`
4. **Upload Gambar**: Gambar akan tersimpan di `public/uploads/`

---

## Setelah Testing Selesai

Kalau sudah berhasil test di local, lanjut ke deploy ke RumahWeb sesuai panduan di **DEPLOY.md**.
