// DOM Elements
const helloBtn = document.getElementById("helloBtn");
const getUsersBtn = document.getElementById("getUsersBtn");
const userForm = document.getElementById("userForm");
const helloResponse = document.getElementById("helloResponse");
const usersResponse = document.getElementById("usersResponse");
const addUserResponse = document.getElementById("addUserResponse");

// Utility function to display responses
function displayResponse(element, data, isError = false) {
  element.style.display = "block";
  element.style.color = isError ? "#e53e3e" : "#2d3748";
  element.style.backgroundColor = isError ? "#fed7d7" : "#f7fafc";
  element.style.borderLeftColor = isError ? "#e53e3e" : "#667eea";

  if (typeof data === "object") {
    element.textContent = JSON.stringify(data, null, 2);
  } else {
    element.textContent = data;
  }
}

// Utility function to create user list HTML
function createUsersList(users) {
  if (!users || users.length === 0) {
    return "<p>No users found.</p>";
  }

  let html = '<ul class="users-list">';
  users.forEach((user) => {
    html += `
            <li class="user-item">
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                </div>
                <div class="user-id">ID: ${user.id}</div>
            </li>
        `;
  });
  html += "</ul>";
  return html;
}

// Get Hello Message
helloBtn.addEventListener("click", async () => {
  try {
    helloBtn.textContent = "Loading...";
    helloBtn.disabled = true;

    const response = await fetch("/api/hello");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    displayResponse(helloResponse, data);
  } catch (error) {
    displayResponse(helloResponse, `Error: ${error.message}`, true);
    console.error("Error fetching hello message:", error);
  } finally {
    helloBtn.textContent = "Get Hello Message";
    helloBtn.disabled = false;
  }
});

// Get All Users
getUsersBtn.addEventListener("click", async () => {
  try {
    getUsersBtn.textContent = "Loading...";
    getUsersBtn.disabled = true;

    const response = await fetch("/api/users");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Display users in a formatted list
    usersResponse.style.display = "block";
    usersResponse.innerHTML = createUsersList(data);
    usersResponse.style.backgroundColor = "white";
    usersResponse.style.borderLeftColor = "#48bb78";
  } catch (error) {
    displayResponse(usersResponse, `Error: ${error.message}`, true);
    console.error("Error fetching users:", error);
  } finally {
    getUsersBtn.textContent = "Get All Users";
    getUsersBtn.disabled = false;
  }
});

// Add New User
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const submitBtn = userForm.querySelector('button[type="submit"]');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    displayResponse(addUserResponse, "Please fill in all fields", true);
    return;
  }

  try {
    submitBtn.textContent = "Adding...";
    submitBtn.disabled = true;

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    displayResponse(addUserResponse, data);

    // Clear form
    nameInput.value = "";
    emailInput.value = "";

    // Show success message
    setTimeout(() => {
      addUserResponse.style.backgroundColor = "#c6f6d5";
      addUserResponse.style.borderLeftColor = "#48bb78";
      addUserResponse.style.color = "#2f855a";
    }, 100);
  } catch (error) {
    displayResponse(addUserResponse, `Error: ${error.message}`, true);
    console.error("Error adding user:", error);
  } finally {
    submitBtn.textContent = "Add User";
    submitBtn.disabled = false;
  }
});

// Add some interactive feedback
document.addEventListener("DOMContentLoaded", () => {
  console.log("Simple Node.js App loaded successfully!");

  // Add click animation to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.style.transform = "scale(0.95)";
      setTimeout(() => {
        btn.style.transform = "";
      }, 150);
    });
  });

  // Add focus effects to inputs
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
    });

    input.addEventListener("blur", () => {
      input.style.boxShadow = "";
    });
  });
});
