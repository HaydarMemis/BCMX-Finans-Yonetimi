// BCMX Akıllı Finans Yönetimi Uygulaması

// Gerekli modülleri içe aktar
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Express uygulamasını oluştur
const app = express();

// Middleware'leri ayarla
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB bağlantısını kur
mongoose.connect('mongodb://localhost/bcmx_db', { useNewUrlParser: true, useUnifiedTopology: true });

// Kullanıcı şemasını tanımla
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

// Kullanıcı modelini oluştur
const User = mongoose.model('User', userSchema);

// Ana sayfa rotası
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Kullanıcı kaydı rotası
app.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
  } catch (error) {
    res.status(400).json({ error: 'Kullanıcı kaydı başarısız oldu.' });
  }
});

// Giriş rotası
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ message: 'Giriş başarılı.' });
    } else {
      res.status(401).json({ error: 'Geçersiz kimlik bilgileri.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Giriş işlemi başarısız oldu.' });
  }
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
