require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Konfigurasi Database Lokal
const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};
const db = mysql.createPool(dbOptions);

// Konfigurasi Penyimpanan Sesi
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000, 
    expiration: 86400000 
}, db);

app.use(session({
    key: 'keuangan_session_cookie',
    secret: 'rahasia-keuangan-super-aman',
    store: sessionStore, 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 }
}));

// RUTE PUBLIK
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) {
            req.session.user = username; 
            res.json({ success: true, message: "Login Berhasil" });
        } else {
            res.status(401).json({ success: false, message: "Username atau password salah!" });
        }
    });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

const auth = (req, res, next) => {
    if (req.session.user) next();
    else res.status(403).json({ error: "Sesi habis atau belum login." });
};

// RUTE PRIVAT
app.get('/api/dashboard', auth, (req, res) => {
    const query = "SELECT jenis, SUM(jumlah) as total FROM transaksi GROUP BY jenis";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        let totalPemasukan = 0, totalPengeluaran = 0;
        results.forEach(row => {
            if (row.jenis === 'Pemasukan') totalPemasukan = Number(row.total);
            if (row.jenis === 'Pengeluaran') totalPengeluaran = Number(row.total);
        });
        res.json({ pemasukan: totalPemasukan, pengeluaran: totalPengeluaran, saldo: totalPemasukan - totalPengeluaran });
    });
});

app.post('/api/transaksi', auth, (req, res) => {
    const { jenis, jumlah, keterangan, tanggal } = req.body;
    const query = "INSERT INTO transaksi (jenis, jumlah, keterangan, tanggal) VALUES (?, ?, ?, ?)";
    db.query(query, [jenis, jumlah, keterangan, tanggal], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Transaksi ditambahkan!" });
    });
});

app.get('/api/transaksi', auth, (req, res) => {
    const { filter } = req.query;
    let query = "SELECT * FROM transaksi";
    if (filter === 'harian') query += " WHERE tanggal = CURDATE()";
    else if (filter === 'mingguan') query += " WHERE YEARWEEK(tanggal, 1) = YEARWEEK(CURDATE(), 1)";
    else if (filter === 'bulanan') query += " WHERE MONTH(tanggal) = MONTH(CURDATE()) AND YEAR(tanggal) = YEAR(CURDATE())";
    query += " ORDER BY tanggal DESC";

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.put('/api/transaksi/:id', auth, (req, res) => {
    const { id } = req.params;
    const { jenis, jumlah, keterangan, tanggal } = req.body;
    const query = "UPDATE transaksi SET jenis=?, jumlah=?, keterangan=?, tanggal=? WHERE id=?";
    db.query(query, [jenis, jumlah, keterangan, tanggal, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Transaksi diperbarui!" });
    });
});

app.delete('/api/transaksi/:id', auth, (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM transaksi WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Transaksi dihapus!" });
    });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server lokal berjalan di http://localhost:${PORT}`);
    });
}
module.exports = app;