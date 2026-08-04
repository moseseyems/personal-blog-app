const defaultBlogs = [
  {
    id: 1,
    title: "Why I Started This Personal Blog",
    category: "Lifestyle",
    author: "Moses Eyemonu",
    date: "2026-07-20",
    image: "images/image1.jpg",
    summary:
      "A short introduction to this blog and what I hope to share through it.",
    content:
      "Starting a personal blog gives me a place to document what I am learning, share my experiences and connect with other people. This blog will explore technology, business, personal growth and everyday life.",
    featured: true,
  },
  {
    id: 2,
    title: "Learning JavaScript One Project at a Time",
    category: "Learning",
    author: "Moses Eyemonu",
    date: "2026-07-22",
    image: "images/image2.jpg",
    summary:
      "How building practical projects can make JavaScript easier to understand.",
    content:
      "JavaScript can initially appear difficult because it contains many concepts. Building small projects helps connect those concepts to practical problems. Each project improves my understanding of functions, arrays, objects and the DOM.",
    featured: false,
  },
  {
    id: 3,
    title: "Building a Business While Working Full-Time",
    category: "Business",
    author: "Moses Eyemonu",
    date: "2026-07-24",
    image:"images/image3.jpg",
    summary:
      "Some lessons from balancing employment, family and a growing business.",
    content:
      "Building a business alongside full-time employment requires planning and consistency. Instead of trying to complete everything immediately, it is better to identify the most important task and make steady progress.",
    featured: false,
  },
];

let blogs = JSON.parse(localStorage.getItem("blogs"));

if (blogs === null) {
  blogs = defaultBlogs;

  localStorage.setItem(
    "blogs",
    JSON.stringify(defaultBlogs)
  );
}

const currentYearElement =
  document.getElementById("current-year");

if (currentYearElement !== null) {
  currentYearElement.textContent = new Date().getFullYear();
}

const blogList = document.getElementById("blog-list");

function displayBlogs(blogsToDisplay) {
  blogList.innerHTML = "";

  blogsToDisplay.forEach((blog) => {
    blogList.innerHTML += `
      <article class="blog-card">
        <img src="${blog.image}" alt="${blog.title}">
        <h2>${blog.title}</h2>
        <p><strong>By: </strong>${blog.author}</p>
        <p><strong>Published: </strong>${blog.date}</p>
        <p>${blog.summary}</p>
        <a href="view-post.html?id=${blog.id}">Read More →</a>
        <a href="edit-post.html?id=${blog.id}">Edit Post</a>

        <button
          type="button"
          class="delete-button"
          data-id="${blog.id}"
        >
          Delete Post
        </button>

        <p><strong>Category: </strong>${blog.category}</p>
      </article>
    `;
  });

  addDeleteEvents();
}

function addDeleteEvents() {
  const deleteButtons =
    document.querySelectorAll(".delete-button");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);

      const confirmed = confirm(
        "Are you sure you want to delete this post?"
      );

      if (!confirmed) {
        return;
      }

      const updatedBlogs = blogs.filter((blog) => {
        return blog.id !== id;
      });

      localStorage.setItem(
        "blogs",
        JSON.stringify(updatedBlogs)
      );

      location.reload();
    });
  });
}

const searchInput =
  document.getElementById("search-input");

const categoryFilter =
  document.getElementById("category-filter");

function filterBlogs() {
  const searchText =
    searchInput.value.toLowerCase().trim();

  const selectedCategory =
    categoryFilter.value;

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchText) ||
      blog.summary.toLowerCase().includes(searchText) ||
      blog.content.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  displayBlogs(filteredBlogs);
}

if (
  blogList !== null &&
  searchInput !== null &&
  categoryFilter !== null
) {
  displayBlogs(blogs);

  searchInput.addEventListener("input", function () {
    filterBlogs();
  });

  categoryFilter.addEventListener("change", function () {
    filterBlogs();
  });
}

