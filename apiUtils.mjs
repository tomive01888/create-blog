// apiUtils.mjs
export async function createBlogPost(user, payload) {
  const { accessToken, name: userName } = user;

  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Error response from API:", responseData);
      throw new Error(responseData.message || "Unknown error from API");
    }

    return responseData;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
}
