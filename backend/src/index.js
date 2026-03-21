const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// PostgreSQL Connection Pool
// DB_HOST will be 'db' when running via Docker Compose, it can be 'localhost' for local tests.
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'healthai_dev',
    password: process.env.DB_PASSWORD || 'yourpassword',
    port: process.env.DB_PORT || 5432,
});

// Database connection test
pool.connect((err, client, release) => {
    if (err) {
        console.error('Veritabanına bağlanılamadı:', err.stack);
    } else {
        console.log('PostgreSQL veritabanına başarıyla bağlanıldı!');
        release();
    }
});

// ==========================================
// API ENDPOINTS (CRUD OPERATIONS)
// ==========================================

// 1. GET /api/people - Get all people
app.get('/api/people', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM people ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'SERVER_ERROR', message: 'Sunucu hatası oluştu.' });
    }
});

// 2. GET /api/people/:id - Get a single person
app.get('/api/people/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM people WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'NOT_FOUND', message: 'Kişi bulunamadı.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'SERVER_ERROR' });
    }
});

// 3. POST /api/people - Add new person
app.post('/api/people', async (req, res) => {
    try {
        const { fullName, email } = req.body;

        // Backend Validation (Assignment requirement)
        if (!fullName || !email) {
            return res.status(400).json({ error: 'VALIDATION_ERROR', message: 'Ad Soyad ve E-posta zorunludur.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'VALIDATION_ERROR', message: 'Geçersiz e-posta formatı.' });
        }

        const newPerson = await pool.query(
            'INSERT INTO people (full_name, email) VALUES ($1, $2) RETURNING *',
            [fullName, email]
        );

        res.status(201).json(newPerson.rows[0]);
    } catch (err) {
        // Catch email uniqueness (UNIQUE) error (PostgreSQL error code: 23505)
        if (err.code === '23505') {
            return res.status(409).json({ error: 'EMAIL_ALREADY_EXISTS', message: 'Bu e-posta adresi zaten kayıtlı.' });
        }
        res.status(500).json({ error: 'SERVER_ERROR' });
    }
});

// 4. PUT /api/people/:id - Update person
app.put('/api/people/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email } = req.body;

        if (!fullName || !email) {
            return res.status(400).json({ error: 'VALIDATION_ERROR' });
        }

        const updatePerson = await pool.query(
            'UPDATE people SET full_name = $1, email = $2 WHERE id = $3 RETURNING *',
            [fullName, email, id]
        );

        if (updatePerson.rows.length === 0) {
            return res.status(404).json({ error: 'NOT_FOUND' });
        }

        res.status(200).json(updatePerson.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'EMAIL_ALREADY_EXISTS' });
        }
        res.status(500).json({ error: 'SERVER_ERROR' });
    }
});

// 5. DELETE /api/people/:id - Delete person
app.delete('/api/people/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletePerson = await pool.query('DELETE FROM people WHERE id = $1 RETURNING *', [id]);

        if (deletePerson.rows.length === 0) {
            return res.status(404).json({ error: 'NOT_FOUND' });
        }

        res.status(200).json({ message: 'Kişi başarıyla silindi.' });
    } catch (err) {
        res.status(500).json({ error: 'SERVER_ERROR' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend sunucusu ${PORT} portunda çalışıyor...`);
});