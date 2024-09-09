const user = JSON.parse(localStorage.getItem("CreateBlog-user"));
const { accessToken, name: userName } = user;

document.getElementById("blogForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Fetch form values
  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();
  const mediaUrl = document.getElementById("mediaUrl").value.trim();
  const mediaAlt = document.getElementById("mediaAlt").value.trim();
  const selectedTags = Array.from(document.querySelectorAll("input[name='tags']:checked")).map((tag) => tag.value);

  // Basic validation for title and body (you can extend this as needed)
  if (!title || !body) {
    alert("Title and body are required.");
    return;
  }

  const blogData = {
    title: title,
    body: body,
    tags: selectedTags,
    media: {
      url: mediaUrl || "",
      alt: mediaAlt || "",
    },
  };

  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(blogData),
    });

    if (response.ok) {
      console.log("Blog successfully processed");
      alert("Success! Your blog has been created.");
      event.target.reset(); // Resets the form after successful submission
    } else {
      const errorData = await response.json();
      console.error("Error processing blog:", errorData);
      alert(`Error: ${errorData.message || "Failed to process blog post."}`);
    }
  } catch (error) {
    console.error("Error during the request:", error);
    alert("An error occurred while submitting your blog. Please try again.");
  }
});
