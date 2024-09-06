const user = JSON.parse(localStorage.getItem("CreateBlog-user"));
const { accessToken, name: userName } = user;

document.getElementById("blogForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const mediaUrl = document.getElementById("mediaUrl").value;
  const mediaAlt = document.getElementById("mediaAlt").value;
  const selectedTags = Array.from(document.querySelectorAll("input[name='tags']:checked")).map((tag) => tag.value);

  const blogData = {
    title: title,
    body: body,
    tags: selectedTags,
  };

  if (mediaUrl || mediaAlt) {
    blogData.media = {
      url: mediaUrl || "",
      alt: mediaAlt || "",
    };
  }

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
      blogForm.reset();
    } else {
      console.error("Error processing blog:", await response.json());
    }
  } catch (error) {
    console.error("Error during the request:", error);
  }
});
