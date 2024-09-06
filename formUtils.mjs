export function getInputValues() {
  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();
  const tags = document
    .getElementById("tags")
    .value.split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag); // Split, trim, and filter tags
  const mediaUrl = document.getElementById("mediaUrl").value.trim();
  const mediaAlt = document.getElementById("mediaAlt").value.trim();

  return { title, body, tags, media: { url: mediaUrl, alt: mediaAlt } };
}
