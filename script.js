document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");

  // Keep the preloader visible for at least 1.5s
  setTimeout(() => {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500); // fade-out duration
  }, 3000); // minimum display time
});

const typingElement = document.querySelector(".typing-text");
const typingPhrases = [
  "I'm a Web Developer 💻",
  "I love building UI/UX designs 🎨",
  "I create modern, user-friendly apps 🚀"
];
let phraseIndex = 0;
let charIndex = 0;
let currentPhrase = "";
let isDeleting = false;

function typeEffect() {
  currentPhrase = typingPhrases[phraseIndex];
  if (!isDeleting) {
    typingElement.textContent = currentPhrase.slice(0, ++charIndex);
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500); // Pause after typing complete
      return;
    }
  } else {
    typingElement.textContent = currentPhrase.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 70 : 120);
}

document.addEventListener("DOMContentLoaded", typeEffect);



// ✅ EmailJS Initialization
(function () {
  emailjs.init("E5BtfVnep1OK-lV_A");
})();

// ✅ Contact Form Submission
const form = document.querySelector(".contact-form");
const messageDiv = document.getElementById("form-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailInput = form.querySelector('input[name="email"]');
  form.querySelector('input[name="reply_to"]').value = emailInput.value;

  messageDiv.textContent = "⏳ Sending...";
  messageDiv.style.color = "blue";

  emailjs.sendForm("service_ftofwvb", "template_74zpfz1", this).then(
    function () {
      messageDiv.textContent = "✅ Message sent successfully!";
      messageDiv.style.color = "green";
      form.reset();

      setTimeout(() => {
        messageDiv.textContent = "";
      }, 3000);
    },
    function (error) {
      messageDiv.textContent = "❌ Failed to send. Try again.";
      messageDiv.style.color = "red";
      console.error("EmailJS Error:", error);

      setTimeout(() => {
        messageDiv.textContent = "";
      }, 3000);
    }
  );
});



// ✅ Projects Data + Filter Logic
let allProjects = [];

function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML = "<p>No projects found.</p>";
    return;
  }

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.setAttribute("data-aos", "fade-up"); // ✅ Animation attribute

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <small><strong>Category:</strong> ${project.category}</small><br>
      <a href="${project.link}" class="btn" target="_blank">View Project</a>
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const searchTerm = document.getElementById("project-search").value.toLowerCase();
  const selectedCategory = document.getElementById("category-filter").value;

  const filtered = allProjects.filter(project =>
    (selectedCategory === "all" || project.category === selectedCategory) &&
    (project.title.toLowerCase().includes(searchTerm) ||
      project.category.toLowerCase().includes(searchTerm))
  );

  renderProjects(filtered);
}

fetch("projects.json")
  .then(res => res.json())
  .then(data => {
    allProjects = data;
    renderProjects(allProjects);
  });

document.getElementById("project-search").addEventListener("input", applyFilters);
document.getElementById("category-filter").addEventListener("change", applyFilters);

// ✅ AOS (Animate on Scroll) Initialization
AOS.init();


document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typing", {
    strings: ["Web Developer", "UI/UX Learner", "Game Enthusiast", "Cybersecurity Explorer"],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true
  });
});

function animateCount(id, endValue, duration = 1000) {
  const element = document.getElementById(id);
  if (!element) return;

  let start = 0;
  const increment = endValue / (duration / 16); // approx. 60fps
  const step = () => {
    start += increment;
    if (start < endValue) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(step);
    } else {
      element.textContent = endValue;
    }
  };
  requestAnimationFrame(step);
}

function updateVisitorCount() {
  const today = new Date().toISOString().split('T')[0];

  const totalKey = 'swapnil-vichare-portfolio-total';
  const todayKey = `swapnil-vichare-portfolio-${today}`;

  // Total Visitors
  fetch(`https://api.countapi.xyz/update/${totalKey}/visits/?amount=1`)
    .then(res => res.json())
    .then(data => {
      animateCount('total-visitors', data.value);
    })
    .catch(() => {
      const el = document.getElementById('total-visitors');
      if (el) el.textContent = 'N/A';
    });

  // Today's Visitors
  fetch(`https://api.countapi.xyz/update/${todayKey}/visits/?amount=1`)
    .then(res => res.json())
    .then(data => {
      animateCount('today-visitors', data.value);
    })
    .catch(() => {
      const el = document.getElementById('today-visitors');
      if (el) el.textContent = 'N/A';
    });
}

// Call on load
updateVisitorCount();

// ✅ Portfolio Project Modal Viewer JS (script.js)

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalImage = document.getElementById("modal-image");
  const modalDemo = document.getElementById("modal-demo");
  const modalCode = document.getElementById("modal-code");
  const closeModal = document.querySelector(".modal-close");

  // Global function to open modal
  window.openProjectModal = function (project) {
    modalTitle.innerText = project.title;
    modalDesc.innerText = project.description;
    modalImage.src = project.image;
    modalDemo.href = project.demo;
    modalCode.href = project.code;
    modal.style.display = "block";
  };

  // Close on X click
  closeModal.onclick = () => modal.style.display = "none";

  // Close on outside click
  window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
  };
});

// Typed.js animation
new Typed("#typed-text", {
  strings: ["Welcome to Swap's Portfolio", "Building Modern Apps & Websites"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true
});

// AOS Init
AOS.init();
