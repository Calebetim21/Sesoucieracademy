// Smooth Scroll for Navigation Links
document.querySelectorAll("a.nav-link").forEach(link => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href").replace("/", "#");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Add hover effect to enhance sections
const sections = document.querySelectorAll("section");
sections.forEach(section => {
  section.style.transition = "transform 0.3s ease, background-color 0.3s ease";
  section.addEventListener("mouseenter", () => {
    section.style.transform = "scale(1.02)";
    section.style.backgroundColor = "#f9f9f9";
  });
  section.addEventListener("mouseleave", () => {
    section.style.transform = "scale(1)";
    section.style.backgroundColor = "transparent";
  });
})

  // Add hover effect to program cards
const programCards = document.querySelectorAll(".program-card");
programCards.forEach(card => {
  card.style.transition = "transform 0.3s ease, background-color 0.3s ease";
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05)";
    card.style.backgroundColor = "#f9f9f9";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
    card.style.backgroundColor = "transparent";
  });
});

// Training programs data with unique class names
const trainingPrograms = [
  {
    title: "Housekeeping Mastery",
    description: "Learn efficient and professional cleaning techniques to maintain pristine environments.",
    className: "housekeeping-card"
  },
  {
    title: "Event Planning Mastery",
    description: "From intimate gatherings to grand celebrations, learn to orchestrate memorable events.",
    className: "event-card"
  },
  {
    title: "Culinary Skills",
    description: "Develop your cooking skills to create culinary delights for diverse occasions.", 
    className: "culinary-card"
  },
  {
    title: "Childcare Basics",
    description: "Understand the essentials of childcare and how to provide a nurturing environment.",
    className: "childcare-card"
  },
  {
    title: "Laundry Care",
    description: "Master efficient laundry techniques, including fabric care, stain removal, and ironing.",
    className: "laundry-card"
  }
];

function renderTrainingPrograms() {
  const programContainer = document.getElementById("program-container");
  
  if (!programContainer) {
    console.error("Program container not found.");
    return;
  }
  programContainer.innerHTML = ""; // Proceed if the element exists

  trainingPrograms.forEach((program) => {
    const programDiv = document.createElement("div");
    programDiv.classList.add("col-md-4", "mb-4", program.className);
    programDiv.innerHTML = `
      <div class="program-card">
        <h3>${program.title}</h3>
        <p>${program.description}</p>
      </div>`;
    programContainer.appendChild(programDiv);
  });
}

document.addEventListener("DOMContentLoaded", renderTrainingPrograms);


document.addEventListener("DOMContentLoaded", function () {
  const blogForm = document.querySelector("#blog-form");
  const blogPostsContainer = document.querySelector(".blog-posts");

  async function makeRequest(url, method, body = null, options = {}) {
    try {
      const headers = options.isFormData
        ? {}
        : { "Content-Type": "application/json" };
      const fetchOptions = { method, headers };
      if (body) fetchOptions.body = options.isFormData ? body : JSON.stringify(body);

      const response = await fetch(url, fetchOptions);
      if (!response.ok) throw new Error("Request failed");
      return await response.json();
    } catch (error) {
      console.error(`Error with ${method} request to ${url}:`, error);
      throw error;
    }
  }

  async function fetchPosts() {
    try {
      const posts = await makeRequest("/api/blog", "GET");
      renderPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  function renderPosts(posts) {
    if (!blogPostsContainer) return;
    blogPostsContainer.innerHTML = ""; // Clear previous posts
    posts.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("blog-post");

      if (post.images && Array.isArray(post.images)) {
        post.images.forEach((imagePath) => {
          const img = document.createElement("img");
          img.src = imagePath;
          img.alt = "Blog Post Image";
          img.classList.add("blog-image"); // Ensure this class is applied
          postDiv.appendChild(img);

      const title = document.createElement("h4");
      title.textContent = post.title;

      const content = document.createElement("p");
      content.textContent = post.content;

      const author = document.createElement("p");
      author.classList.add("blog-author");
      author.textContent = post.author || "Admin";

      postDiv.append(title, content, author);

        });
      }

      blogPostsContainer.appendChild(postDiv);
    });
  }

  if (blogForm) {
    blogForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(blogForm);
      try {
        const response = await makeRequest("/api/blog", "POST", formData, { isFormData: true });
        Swal.fire("Success", "Post created successfully!", "success");
        blogForm.reset();
        fetchPosts();
      } catch (error) {
        Swal.fire("Error", "Failed to create post.", "error");
      }
    });
  }

  // Fetch posts on load
  fetchPosts();
});
 

  // Contact Form Submission
  const contactForm = document.querySelector("form[action*='submit-contact']");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const message = document.querySelector("#message").value.trim();

      if (name && email && message) {
        try {
          const data = await makeRequest("/api/contact/submit-contact", "POST", {
            name,
            email,
            message,
          });
          Swal.fire("Thank you!", data.message, "success");
          contactForm.reset();
        } catch (error) {
          Swal.fire("Error", "Failed to submit your message. Please try again.", "error");
        }
      } else {
        Swal.fire("Warning", "All fields are required.", "warning");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        Swal.fire("Warning", "Please enter a valid email address.", "warning");
        return;
      }
      if (message.length < 10) {
        Swal.fire("Warning", "Message should be at least 10 characters long.", "warning");
        return;
      }
      
    });
  }

  // Social Media Icon Hover Effects with CSS Transitions
  const socialIcons = document.querySelectorAll("img[alt='Facebook'], img[alt='Instagram']");
  socialIcons.forEach((icon) => {
    icon.style.transition = "transform 0.3s ease";
    icon.addEventListener("mouseenter", () => (icon.style.transform = "scale(1.1)"));
    icon.addEventListener("mouseleave", () => (icon.style.transform = "scale(1)"));
  });

  // Newsletter Form Submission
    const newsletterForm = document.querySelector("form[action='/api/newsletter/subscribe']");
  
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", async (event) => {
        event.preventDefault();
  
        const email = document.querySelector("#email").value.trim();
        if (!email || !email.includes("@")) {
          Swal.fire("Warning", "Please enter a valid email address.", "warning");
          return;
        }
  
        try {
          const response = await fetch("/api/newsletter/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
  
          if (response.ok) {
            const data = await response.json();
            Swal.fire("Thank you!", data.message, "success");
            newsletterForm.reset();
          } else {
            const errorData = await response.json();
            Swal.fire("Error", errorData.message || "Subscription failed. Try again.", "error");
          }
        } catch (error) {
          Swal.fire("Error", "Unable to process your subscription. Please try again later.", "error");
        }
      });
    }

  