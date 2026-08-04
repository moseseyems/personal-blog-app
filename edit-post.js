const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = Number(params.get("id"));

const blog = blogs.find((blog) => blog.id === id);

const form = document.getElementById("edit-post-form");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");
const imageInput = document.getElementById("image");
const currentImage = document.getElementById("current-image");
const summaryInput = document.getElementById("summary");
const contentInput = document.getElementById("content");

if (blog === undefined) {
  alert("Blog post not found.");
  window.location.href = "index.html";
} else {
  titleInput.value = blog.title;
  authorInput.value = blog.author;
  dateInput.value = blog.date;
  categoryInput.value = blog.category;
  summaryInput.value = blog.summary;
  contentInput.value = blog.content;

  currentImage.src = blog.image;
  currentImage.alt = blog.title;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  blog.title = titleInput.value;
  blog.author = authorInput.value;
  blog.date = dateInput.value;
  blog.category = categoryInput.value;
  blog.summary = summaryInput.value;
  blog.content = contentInput.value;

  const newImageFile = imageInput.files[0];

  if (!newImageFile) {
    saveUpdatedBlogs();
    return;
  }

  const maximumImageSize = 1024 * 1024;

  if (newImageFile.size > maximumImageSize) {
    alert("Please choose an image smaller than 1 MB.");
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", function () {
    blog.image = reader.result;
    saveUpdatedBlogs();
  });

  reader.readAsDataURL(newImageFile);
});

function saveUpdatedBlogs() {
  try {
    localStorage.setItem("blogs", JSON.stringify(blogs));
    window.location.href = `view-post.html?id=${blog.id}`;
  } catch (error) {
    console.error(error);
    alert("The post could not be updated. Please use a smaller image.");
  }
}
