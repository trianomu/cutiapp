# CutiApp - Aplikasi Manajemen Cuti Pegawai

Sebuah sistem manajemen cuti pegawai sederhana berbasis **Fullstack Web App** yang terdiri dari:

- ✨ **Frontend**: Next.js + Tailwind CSS
- ⚙️ **Backend**: Express + Prisma + PostgreSQL
- 🔐 **Auth**: Login dengan JWT Token

---

## 📁 Struktur Direktori

├── backend/ # Backend Express + Prisma
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ └── prisma/ # Prisma schema & client
│ └── .env
│
├── frontend/ # Frontend Next.js App Router
│ ├── src/app/
│ ├── src/components/
│ ├── src/api/
│ └── tailwind.config.js

---

## Cara Menjalankan Project

### 1. Clone project

```bash
git clone https://github.com/trianomu/cutiapp.git
cd cutiapp
```
---
### BACKEND SETUP (/backend)
### 1. Masuk ke direktori backend
```bash
cd backend
```

### 2. Install dependency
```bash
npm install
```
### 3. Konfigurasi .env
Buat file .env dan isi:
```bash
DATABASE_URL="mysql://user:password@localhost:3306/cuti_management"
JWT_SECRET="your_secret_key"
PORT=3001
```
### 4. Setup database
```bash
npx prisma migrate dev --name init
npx prisma db seed
npx prisma generate
```
Pastikan sudah memiliki file prisma/seed.ts dan script seed diset di package.json:
```bash
"prisma": {
  "seed": "ts-node prisma/seed.ts"}
```
Jika belum install ts-node:

```bash
npm install -D ts-node
```
### 5. Jalankan server
```bash
npm run dev
```
API akan berjalan di: http://localhost:3001/api
---

### FRONTEND SETUP (/frontend)
### 1. Masuk ke direktori frontend
```bash
cd ../frontend
```
### 2. Install dependencies
```bash
npm install
```
### 3. Jalankan server dev
```bash
npm run dev
```
Frontend akan berjalan di: http://localhost:3000

Pastikan backend http://localhost:3001 bisa diakses oleh frontend.
---

## Fitur
### Frontend
Halaman Login (JWT disimpan di localStorage)

Redirect otomatis jika belum login

CRUD Pegawai

CRUD Cuti

Tabel pegawai dan cuti

Format tanggal lokal

Komponen form reusable
---
---
### Backend
Autentikasi dengan JWT

Endpoint RESTful:

POST /login

GET /employees

POST /employees

PUT /employees/:id

DELETE /employees/:id

GET /leaves

POST /leaves

PUT /leaves/:id

DELETE /leaves/:id

Middleware JWT auth
---