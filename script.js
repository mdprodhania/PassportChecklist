let entries = JSON.parse(localStorage.getItem('passportEntries')) || [];

const form = document.getElementById('passportForm');
const checklist = document.getElementById('checklist');

function displayEntries() {
  checklist.innerHTML = '';

  entries.forEach((entry, i) => {
    const block = document.createElement('div');
    block.innerHTML = `
      <p><strong>Client:</strong> ${entry.clientName}</p>
      <p><strong>Passport #:</strong> ${entry.passportNumber}</p>
      <p><strong>Expires:</strong> ${entry.expiryDate}</p>
      <div class="action-buttons">
        <button class="edit-btn" data-index="${i}">Modify</button>
        <button class="delete-btn" data-index="${i}">Remove</button>
      </div>
    `;
    checklist.appendChild(block);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const clientName = document.getElementById('clientName').value.trim();
  const passportNumber = document.getElementById('passportNumber').value.trim();
  const expiryDate = document.getElementById('expiryDate').value.trim();

  if (!clientName || !passportNumber || !expiryDate) return;

  entries.push({ clientName, passportNumber, expiryDate });
  localStorage.setItem('passportEntries', JSON.stringify(entries));
  displayEntries();
  form.reset();
});

checklist.addEventListener('click', e => {
  if (e.target.classList.contains('edit-btn')) {
    const i = e.target.getAttribute('data-index');
    const item = entries[i];

    document.getElementById('clientName').value = item.clientName;
    document.getElementById('passportNumber').value = item.passportNumber;
    document.getElementById('expiryDate').value = item.expiryDate;

    entries.splice(i, 1);
    localStorage.setItem('passportEntries', JSON.stringify(entries));
    displayEntries();
  }

  if (e.target.classList.contains('delete-btn')) {
    const i = e.target.getAttribute('data-index');
    entries.splice(i, 1);
    localStorage.setItem('passportEntries', JSON.stringify(entries));
    displayEntries();
  }
});

displayEntries();
