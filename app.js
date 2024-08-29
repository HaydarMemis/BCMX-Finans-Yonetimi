<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
  // Gelir ekleme işlemleri
  const incomeForm = document.getElementById('income-form');
  const incomeTableBody = document.getElementById('income-table').querySelector('tbody');

  incomeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('income-name').value;
      const amount = document.getElementById('income-amount').value;
      const currency = document.getElementById('income-currency').value;

      addTableRow(incomeTableBody, [name, amount, currency]);
      incomeForm.reset();
  });

  // Gider ekleme işlemleri
  const expenseForm = document.getElementById('expense-form');
  const expenseTableBody = document.getElementById('expense-table').querySelector('tbody');

  expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('expense-name').value;
      const amount = document.getElementById('expense-amount').value;
      const currency = document.getElementById('expense-currency').value;

      addTableRow(expenseTableBody, [name, amount, currency]);
      expenseForm.reset();
  });

  // Portföy ekleme işlemleri
  const portfolioForm = document.getElementById('portfolio-form');
  const portfolioTableBody = document.getElementById('portfolio-table').querySelector('tbody');

  portfolioForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('portfolio-name').value;
      const quantity = document.getElementById('portfolio-quantity').value;
      const price = document.getElementById('portfolio-price').value;
      const currency = document.getElementById('portfolio-currency').value;

      addTableRow(portfolioTableBody, [name, quantity, price, currency]);
      portfolioForm.reset();
  });

  // Satır ekleme fonksiyonu
  function addTableRow(tableBody, data) {
      const row = document.createElement('tr');

      data.forEach(item => {
          const cell = document.createElement('td');
          cell.textContent = item;
          row.appendChild(cell);
      });

      const actionCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Düzenle';
      editButton.addEventListener('click', () => editTableRow(row));

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Sil';
      deleteButton.addEventListener('click', () => deleteTableRow(row));

      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      tableBody.appendChild(row);
  }

  // Satır düzenleme fonksiyonu
  function editTableRow(row) {
      const cells = row.querySelectorAll('td');
      cells.forEach((cell, index) => {
          if (index < cells.length - 1) {
              const input = document.createElement('input');
              input.value = cell.textContent;
              cell.textContent = '';
              cell.appendChild(input);
          }
      });

      const actionCell = cells[cells.length - 1];
      actionCell.innerHTML = '';
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Kaydet';
      saveButton.addEventListener('click', () => saveTableRow(row));

      actionCell.appendChild(saveButton);
  }

  // Satır kaydetme fonksiyonu
  function saveTableRow(row) {
      const inputs = row.querySelectorAll('input');
      inputs.forEach(input => {
          const cell = input.parentElement;
          cell.textContent = input.value;
      });

      const actionCell = row.querySelectorAll('td')[inputs.length];
      actionCell.innerHTML = '';
      const editButton = document.createElement('button');
      editButton.textContent = 'Düzenle';
      editButton.addEventListener('click', () => editTableRow(row));

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Sil';
      deleteButton.addEventListener('click', () => deleteTableRow(row));

      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);
  }

  // Satır silme fonksiyonu
  function deleteTableRow(row) {
      row.remove();
  }
});
=======
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
>>>>>>> main-old
