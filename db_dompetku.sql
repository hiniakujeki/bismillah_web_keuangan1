CREATE DATABASE db_dompetku;
USE db_dompetku;

CREATE TABLE transaksi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jenis ENUM('Pemasukan', 'Pengeluaran') NOT NULL,
    jumlah INT NOT NULL,
    keterangan VARCHAR(255) NOT NULL,
    tanggal DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password) VALUES ('admin', 'password123');
