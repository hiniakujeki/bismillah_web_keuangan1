# 📊 Aplikasi Pencatatan Keuangan Pribadi (Full-Stack)

Aplikasi web responsif berbasis **Node.js, Express, dan MySQL** untuk mencatat arus kas (Pemasukan & Pengeluaran) secara *real-time*. Aplikasi ini dilengkapi dengan sistem otentikasi (Login Sesi) yang aman dan integrasi grafik visual menggunakan Chart.js. Dirancang secara khusus agar kompatibel dengan lingkungan *Serverless* (Vercel) dan *Cloud Database* (Aiven).

---

## 👥 Tim Pengembang (Kelompok 13)

Proyek ini dikerjakan secara kolaboratif oleh mahasiswa **Kelas E**:

| No | Nama Lengkap | NIM |
|:---:|---|:---:|
| 1 | **Muhammad Bintang Adhipura** | 202451165 |
| 2 | **Aditya Wahyu Aji Pangestu** | 202451153 |
| 3 | **Adhita Chairul Adha** | 202451178 |
| 4 | **Dzakirul Favian Jiwani Zuhri** | 202451183 |

---
**Anggota 1 (Database & Project Manager):** Bertanggung jawab menyiapkan repositori GitHub, menginisialisasi proyek Node.js, dan merancang Database MySQL lokal.

**Anggota 2 (Backend Developer):** Bertanggung jawab penuh pada file server.js untuk mengelola API, keamanan (Sesi/Login), dan koneksi ke Database.

**Anggota 3 (Frontend UI/UX):** Bertanggung jawab pada tampilan antarmuka (HTML & Tailwind CSS) untuk memastikan web terlihat rapi dan modern.

**Anggota 4 (Frontend Logic):** Bertanggung jawab pada file app.js (JavaScript) untuk mengintegrasikan tampilan dari Anggota 3 dengan API dari Anggota 2, serta mengurus logika Chart.js.

---

## ✨ Fitur Utama

* **🔒 Sistem Keamanan Sesi:** Login otentikasi di mana data sesi disimpan langsung ke dalam MySQL (`express-mysql-session`), mencegah *auto-logout* pada arsitektur *serverless*.
* **📈 Dashboard Interaktif:** Menampilkan total saldo, pemasukan, pengeluaran, serta grafik batang (Chart.js) akumulasi per bulan.
* **📝 Manajemen Transaksi (CRUD):** Tambah, edit, hapus, dan lihat riwayat transaksi dengan mudah.
* **🔍 Filter Pintar:** Filter transaksi berdasarkan periode Harian, Mingguan, Bulanan, atau Semua Waktu.
* **📱 Desain Responsif:** Antarmuka modern dan rapi menggunakan **Tailwind CSS**.

---

## 🛠️ Teknologi yang Digunakan

**Frontend:**
* HTML5 & Vanilla JavaScript
* Tailwind CSS (via CDN)
* Chart.js (Visualisasi Data)

**Backend:**
* Node.js & Express.js
* `mysql2` (Koneksi Database)
* `express-session` & `express-mysql-session` (Manajemen Sesi)

**Infrastruktur / Deployment:**
* **Vercel** (Serverless Hosting)
* **Aiven** (Cloud MySQL Database)

---

