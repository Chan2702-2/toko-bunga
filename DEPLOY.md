# Cara Deploy ke RumahWeb

Panduan deploy website Toko Bunga ke RumahWeb dengan MySQL.

---

## Bagian 1: Setup Database MySQL

### 1.1 Buat Database

1. Login ke cPanel RumahWeb
2. Buka **MySQL Database Wizard**
3. Buat database baru: `tokobunga`
4. Buat user database dan password
5. Tambahkan user ke database (授予所有权限)

### 1.2 Import Schema

1. Buka **phpMyAdmin** dari cPanel
2. Klik database `tokobunga` yang baru dibuat
3. Klik tab **Import**
4. Klik **Choose File** → pilih `mysql-schema.sql`
5. Scroll ke bawah → klik **Go**

---

## Bagian 2: Setup Admin User

### 2.1 Generate Password Hash

Buka terminal di komputer lokal:

```bash
node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
```

Copy hasil hash (ada sekitar 60 karakter).

### 2.2 Insert User Admin

1. Di phpMyAdmin, klik tabel `users`
2. Klik tab **Insert**
3. Isi data:
   - email: `admin@tokobunga.com`
   - password: (paste hash dari langkah 2.1)
   - name: `Admin`
4. Klik **Go**

---

## Bagian 3: Konfigurasi Project

### 3.1 Install Dependencies

```bash
npm install
```

### 3.2 Setup Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
MYSQL_HOST=localhost
MYSQL_USER=nama_user_database
MYSQL_PASSWORD=password_database
MYMYSQL_DATABASE=toko_bunga
ADMIN_TOKEN=rahasia_token_untuk_admin
```

### 3.3 Test Lokal

```bash
npm run dev
```

Buka `http://localhost:3000` untuk test.

---

## Bagian 4: Build Project

```bash
npm run build
```

---

## Bagian 5: Deploy ke RumahWeb

### Opsi A: Menggunakan Node.js Selector (Disarankan)

1. Login cPanel → **Setup Node.js App**
2. Klik **Create Application**
3. Isi formulir:
   - **Node.js Version**: `18` atau `20`
   - **Application Mode**: `Production`
   - **Application Root**: `tokobunga` (atau nama folder)
   - **Application URL**: Pilih domain/subdomain
4. Klik **Create**
5. Di halaman berikutnya:
   - Scroll ke **Run NPM Install** → klik tombol
   - Tunggu proses selesai
6. Buat file `.env` di folder project:
   
   Buka **File Manager** → public_html → tokobunga → buat file `.env` dengan isi:
   ```
   MYSQL_HOST=localhost
   MYSQL_USER=nama_user_database
   MYSQL_PASSWORD=password_database
   MYSQL_DATABASE=toko_bunga
   ADMIN_TOKEN=rahasia_token_untuk_admin
   ```
7. Setup folder uploads:
   - Buka **File Manager** → public_html → tokobunga → public
   - Buat folder `uploads`
   - Klik folder → **Change Permissions** → `755`

### Opsi B: Upload Manual

1. Build project: `npm run build`
2. Upload via File Manager atau FTP:
   - `.next/`
   - `public/`
   - `src/`
   - `node_modules/`
   - `package.json`
   - `package-lock.json`
   - `next.config.js`
   - `.env.local` → rename jadi `.env`
3. Buka **Setup Node.js App** → Buat app baru pointing ke folder
4. Klik **Run NPM Install**

---

## Bagian 6: Verifikasi

### Checklist

- [ ] Website muncul di domain
- [ ] Landing page menampilkan produk
- [ ] Katalog produk muncul
- [ ] Detail produk bisa dibuka
- [ ] Keranjang belanja berfungsi
- [ ] Checkout generate pesan WhatsApp
- [ ] Admin login accessible di `/admin/login`
- [ ] Admin bisa login dengan `admin@tokobunga.com` / `admin123`
- [ ] Dashboard menampilkan produk
- [ ] Tambah produk berhasil
- [ ] Edit produk berhasil
- [ ] Hapus produk berhasil
- [ ] Upload gambar berhasil

---

## Troubleshooting

### Error: Can't connect to MySQL
- Cek credentials di `.env` — pastikan MYSQL_USER dan MYSQL_PASSWORD benar
- MYSQL_HOST biasanya `localhost` di RumahWeb

### Error: ENOENT: no such file or directory, open '.../uploads/...'
```bash
chmod 755 public/uploads
```

### Error: bcrypt is not a function
Pakai `bcryptjs`, bukan `bcrypt`:
```bash
npm uninstall bcrypt
npm install bcryptjs
```

### 502 Bad Gateway
- Cek Node.js app sudah running
- Cek logs di **Setup Node.js App** → **Logs**

### Gambar tidak muncul
- Cek folder `public/uploads` ada dan permission benar
- Cek path gambar di database (seharusnya `/uploads/nama-file.jpg`)

---

## Custom Domain (Opsional)

1. Di cPanel → **Domains** → **Create A Domain Alias**
2. Atau di RumahWeb panel → Setup subdomain
3. Di **Setup Node.js App** → ubah Application URL ke domain baru

---

## Update Project di RumahWeb

Setiap kali ada perubahan:

```bash
# Local
npm run build

# Upload ulang folder:
# - .next/
# - src/app/api/
# - public/

# Atau gunakan git dan pull
```

---

## Support

Jika ada masalah:

1. Cek logs di cPanel → **Setup Node.js App** → **Logs**
2. Cek error logs di **Errors** section cPanel
3. Pastikan Node.js version sesuai (18 atau 20)
