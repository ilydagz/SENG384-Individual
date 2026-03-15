const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware'ler
app.use(cors());
app.use(express.json());

// Temel test rotası
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Backend API çalışıyor!',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});