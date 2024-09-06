document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("https://v2.api.noroff.dev/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const result = await response.json();
    const userData = result.data;

    localStorage.setItem("CreateBlog-user", JSON.stringify(userData));

    alert("Login successful!");
    location.reload();
  } else {
    alert("Login failed. Please check your credentials.");
  }
});

// Logout functionality
document.getElementById("logoutButton").addEventListener("click", function () {
  // Clear the user data from localStorage
  localStorage.removeItem("CreateBlog-user");

  // Clear the login form fields
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";

  // Alert the user about successful logout
  alert("You have logged out successfully!");

  // Optionally, reload the page to reset the state
  location.reload();
});
