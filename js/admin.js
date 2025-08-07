document.addEventListener("DOMContentLoaded", () => {
  const userList = JSON.parse(localStorage.getItem("users")) || [];
  const withdraws = JSON.parse(localStorage.getItem("withdraws")) || [];

  const userTable = document.getElementById("userTable");
  const withdrawList = document.getElementById("withdraw-list");

  userList.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.email}</td>
      <td>${user.name}</td>
      <td>${user.balance}</td>
      <td>${user.accounts || 1}</td>
      <td>${user.device || "unknown"}</td>
      <td>
        <button onclick="banUser('${user.email}')">Ban</button>
        <button onclick="blacklistUser('${user.email}')">Blacklist</button>
        <button onclick="removeUser('${user.email}')">Remove</button>
      </td>
    `;
    userTable.appendChild(row);
  });

  withdraws.forEach(w => {
    const li = document.createElement("li");
    li.textContent = `${w.email} requested ${w.amount}৳`;
    withdrawList.appendChild(li);
  });
});

function banUser(email) {
  alert(`User ${email} has been BANNED`);
}

function blacklistUser(email) {
  alert(`User ${email} is BLACKLISTED`);
}

function removeUser(email) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter(user => user.email !== email);
  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
}
