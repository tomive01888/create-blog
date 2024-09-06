// Check if the user is logged in by checking localStorage
const user = JSON.parse(localStorage.getItem("CreateBlog-user"));

if (user) {
  document.querySelector(".username").textContent = user.name;

  // Fetch blog posts for the logged-in user
  fetch(`https://v2.api.noroff.dev/blog/posts/${user.name}`)
    .then((response) => response.json())
    .then((data) => {
      const blogCount = data.meta && data.meta.totalCount ? data.meta.totalCount : 0;
      document.getElementById("count").textContent = blogCount;
    })
    .catch((error) => {
      console.error("Error fetching blog posts:", error);
      document.getElementById("count").textContent = "0";
    });
} else {
  document.querySelector(".username").textContent = "Not logged in";
  document.getElementById("count").textContent = "0";
}
