const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = Number(params.get("id"));

const blog = blogs.find((blog) => {
  return blog.id === id;
});

const postDetail = document.getElementById("post-detail");

if (blog === undefined) {
  postDetail.innerHTML = `
    <h1>Blog post not found</h1>
    <p>The blog post you requested does not exist.</p>
  `;
} else {
  postDetail.innerHTML = `
    <img src="${blog.image}" alt="${blog.title}">
    <h1>${blog.title}</h1>
    <p><strong>By: </strong>${blog.author}</p>
    <p><strong>Published: </strong>${blog.date}</p>
    <p><strong>Category: </strong>${blog.category}</p>
    <p>${blog.content}</p>
  `;
}
