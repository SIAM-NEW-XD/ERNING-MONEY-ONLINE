// Simulated user data
let user = {
  email: "user@example.com",
  name: "Siam",
  password: "123456",
  balance: 150,
  referLink: "https://earnweb.me/invite?code=SIAM123",
  referList: ["friend1@gmail.com", "friend2@gmail.com"]
};

// Show sections
function showSection(id) {
  document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Load dashboard data
window.onload = function() {
  document.getElementById('userEmail').innerText = user.email;
  document.getElementById('userName').innerText = user.name;
  document.getElementById('userPassword').innerText = user.password;
  document.getElementById('userBalance').innerText = user.balance;
  document.getElementById('referLink').innerText = user.referLink;

  let refList = document.getElementById('referList');
  user.referList.forEach(r => {
    let li = document.createElement('li');
    li.innerText = r;
    refList.appendChild(li);
  });

  // Load task list
  fetch("tasks.json")
    .then(res => res.json())
    .then(data => {
      let taskList = document.getElementById("taskList");
      data.tasks.forEach(task => {
        let div = document.createElement("div");
        div.innerHTML = `<a href="${task.link}" target="_blank">${task.title}</a>`;
        taskList.appendChild(div);
      });
    });
};

// Change password
function changePassword() {
  let newPass = document.getElementById("newPassword").value;
  if (newPass.length < 4) {
    alert("Password too short!");
    return;
  }
  user.password = newPass;
  document.getElementById('userPassword').innerText = newPass;
  alert("Password changed!");
}

// Toggle sidebar
document.getElementById("menuToggle").addEventListener("click", () => {
  let sidebar = document.getElementById("sidebar");
  sidebar.style.display = (sidebar.style.display === "none") ? "block" : "none";
});
