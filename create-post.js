const form = document.getElementById("create-post-form");

const title = document.getElementById("title");
const author = document.getElementById("author");
const date = document.getElementById("date");
const category = document.getElementById("category");
const image = document.getElementById("image");
const summary = document.getElementById("summary");
const content = document.getElementById("content");

const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const imageFile = image.files[0];

  if (!imageFile) {
    alert("Please upload an image.");
    return;
  }

  const maximumImageSize = 1024 * 1024;

  if (imageFile.size > maximumImageSize) {
    alert("Please choose an image smaller than 1 MB.");
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", function () {
    const newId =
      blogs.length > 0
        ? Math.max(...blogs.map((blog) => blog.id)) + 1
        : 1;

    const newBlog = {
      id: newId,
      title: title.value,
      author: author.value,
      date: date.value,
      category: category.value,
      image: reader.result,
      summary: summary.value,
      content: content.value,
    };

    blogs.push(newBlog);

    localStorage.setItem("blogs", JSON.stringify(blogs));

    window.location.href = "index.html";
  });

  reader.readAsDataURL(imageFile);
});




