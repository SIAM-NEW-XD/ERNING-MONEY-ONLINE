function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

let users = JSON.parse(localStorage.getItem("users") || "[]");
let withdraws = JSON.parse(localStorage.getItem("withdraws") || "[]");
let minWithdraw = localStorage.getItem("minWithdraw") || 20;

document.getElementById("minWithdraw").value = minWithdraw;

// Load users
function loadUsers() {
  const list = document.getElementById("userList");
  list.innerHTML = "";
  users.forEach((u, i) => {
    list.innerHTML += `
      <div>
        <b>${u.email}</b> (Balance: ${u.balance}) - Device: ${u.device}
        <button onclick="banUser(${i})">Ban</button>
        <button onclick="removeUser(${i})">Remove</button>
      </div>
    `;
  });
}

function banUser(i) {
  users[i].status = "banned";
  saveUsers();
  alert("User banned");
}

function removeUser(i) {
  users.splice(i, 1);
  saveUsers();
  alert("User removed");
}

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

// Load withdraw requests
function loadWithdrawRequests() {
  const list = document.getElementById("requestList");
  list.innerHTML = "";
  withdraws.filter(w => w.status === "pending").forEach((w, i) => {
    list.innerHTML += `
      <div>
        ${w.email} wants ৳${w.amount}
        <button onclick="approveWithdraw(${i})">Approve</button>
        <button onclick="rejectWithdraw(${i})">Reject</button>
      </div>
    `;
  });
}

function approveWithdraw(i) {
  const w = withdraws[i];
  const user = users.find(u => u.email === w.email);
  if (user && user.balance >= w.amount) {
    user.balance -= w.amount;
    w.status = "success";
    w.time = new Date().toLocaleString();
    saveAll();
    alert("Withdraw approved");
  } else {
    alert("Not enough balance");
  }
}

function rejectWithdraw(i) {
  withdraws[i].status = "rejected";
  withdraws[i].time = new Date().toLocaleString();
  saveAll();
  alert("Withdraw rejected");
}

// Load success
function loadSuccess() {
  const list = document.getElementById("successList");
  list.innerHTML = "";
  withdraws.filter(w => w.status === "success").forEach(w => {
    list.innerHTML += `<div>${w.email} - ৳${w.amount} at ${w.time}</div>`;
  });
}

// Load rejected
function loadRejects() {
  const list = document.getElementById("rejectList");
  list.innerHTML = "";
  withdraws.filter(w => w.status === "rejected").forEach(w => {
    list.innerHTML += `<div>${w.email} - ৳${w.amount} at ${w.time}</div>`;
  });
}

// Save withdraw settings
function saveMinWithdraw() {
  minWithdraw = document.getElementById("minWithdraw").value;
  localStorage.setItem("minWithdraw", minWithdraw);
  alert("Saved");
}

function saveAll() {
  saveUsers();
  localStorage.setItem("withdraws", JSON.stringify(withdraws));
  loadWithdrawRequests();
  loadSuccess();
  loadRejects();
}

// Initial load
loadUsers();
loadWithdrawRequests();
loadSuccess();
loadRejects();
