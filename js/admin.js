function showSection(id) {
  document.querySelectorAll('.admin-section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Dummy example for loading account info
document.addEventListener('DOMContentLoaded', () => {
  // Load from localStorage or backend
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const accountTable = document.querySelector('#accountTable tbody');
  accountTable.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.email}</td>
      <td>${user.balance}</td>
      <td>${user.deviceCount || 1}</td>
      <td>
        <button onclick="banUser('${user.email}')">Ban</button>
        <button onclick="blackUser('${user.email}')">Black</button>
        <button onclick="removeUser('${user.email}')">Remove</button>
      </td>
    `;
    accountTable.appendChild(row);
  });

  // Load withdraw requests
  const requests = JSON.parse(localStorage.getItem('withdrawRequests')) || [];
  const requestTable = document.querySelector('#withdrawRequests tbody');
  requestTable.innerHTML = '';
  requests.forEach((req, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${req.email}</td>
      <td>${req.amount}</td>
      <td>
        <button onclick="approveWithdraw(${index})">Approve</button>
        <button onclick="rejectWithdraw(${index})">Reject</button>
      </td>
    `;
    requestTable.appendChild(row);
  });
});

function banUser(email) {
  alert(`User ${email} banned!`);
}
function blackUser(email) {
  alert(`User ${email} blacklisted!`);
}
function removeUser(email) {
  alert(`User ${email} removed!`);
}

function approveWithdraw(index) {
  const requests = JSON.parse(localStorage.getItem('withdrawRequests')) || [];
  const req = requests.splice(index, 1)[0];
  localStorage.setItem('withdrawRequests', JSON.stringify(requests));

  let successList = JSON.parse(localStorage.getItem('withdrawSuccess')) || [];
  successList.push(req);
  localStorage.setItem('withdrawSuccess', JSON.stringify(successList));
  alert(`Approved ${req.email} for ৳${req.amount}`);
  location.reload();
}

function rejectWithdraw(index) {
  const requests = JSON.parse(localStorage.getItem('withdrawRequests')) || [];
  const req = requests.splice(index, 1)[0];
  localStorage.setItem('withdrawRequests', JSON.stringify(requests));

  let rejectList = JSON.parse(localStorage.getItem('withdrawReject')) || [];
  rejectList.push(req);
  localStorage.setItem('withdrawReject', JSON.stringify(rejectList));
  alert(`Rejected ${req.email}`);
  location.reload();
}
