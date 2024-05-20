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