// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const OrangHilang = require('./models/OrangHilang');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/pendaftaran_orang_hilang_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Terkoneksi ke MongoDB'))
.catch((err) => console.error('Error koneksi ke MongoDB:', err));

// Route untuk menambah orang hilang
app.post('/orang-hilang', async (req, res) => {
  try {
    const orang = new OrangHilang(req.body);
    await orang.save();
    res.status(201).json(orang);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat menambah orang hilang' });
  }
});

// Route untuk mengambil daftar orang hilang
app.get('/orang-hilang', async (req, res) => {
  try {
    const orang = await OrangHilang.find();
    res.status(200).json(orang);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data orang hilang' });
  }
});

// Route untuk memperbarui status orang hilang menjadi "ditemukan"
app.put('/orang-hilang/:id', async (req, res) => {
  try {
    const orangId = req.params.id;
    const orangDitemukan = await OrangHilang.findByIdAndUpdate(
      orangId,
      { status: 'ditemukan' },  // Update status jadi "ditemukan"
      { new: true }  // Mengembalikan data yang sudah di-update
    );
    
    if (!orangDitemukan) {
      return res.status(404).json({ error: 'Orang hilang tidak ditemukan' });
    }

    res.status(200).json(orangDitemukan);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui status' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
