fetch('data/users.json')
  .then(res => res.json())
  .then(users => {
    const tableBody = document.querySelector("#userTable tbody");
    const phoneCount = {};

    users.forEach(user => {
      // Count how many accounts from same device
      phoneCount[user.deviceId] = (phoneCount[user.deviceId] || 0) + 1;
    });

    users.forEach(user => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.email}</td>
        <td>${user.deviceId}</td>
        <td>${user.balance || 0} ৳</td>
        <td>${phoneCount[user.deviceId]}</td>
        <td>
          <button onclick="banUser('${user.email}')">Ban</button>
          <button onclick="blockUser('${user.email}')">Block</button>
          <button onclick="removeUser('${user.email}')">Remove</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  });

function banUser(email) {
  alert(`🔴 User ${email} has been banned`);
  // Backend or JSON update logic here
}
function blockUser(email) {
  alert(`⛔ User ${email} has been blocked`);
  // Backend or JSON update logic here
}
function removeUser(email) {
  alert(`❌ User ${email} has been removed`);
  // Backend or JSON update logic here
}
