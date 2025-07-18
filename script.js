(function(){
    emailjs.init("E5BtfVnep1OK-lV_A");
})();

const form=document.querySelector(".contact-form");
const messageDiv=document.getElementById("form-message");
form.addEventListener("submit",function(e){
    e.preventDefault();
    const emailInput=form.querySelector('input[name="email"]');
    form.querySelector('input[name="reply_to"]').value=emailInput.value;

    messageDiv.textContent="⏳Sending...";
    messageDiv.style.color="blue";

    emailjs.sendForm("service_ftofwvb","template_74zpfz1",this).then(function(){
        messageDiv.textContent = "✅ Message sent successfully!";
        messageDiv.style.color = "green";
        form.reset();

        setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);

},function(error){
    messageDiv.textContent = "❌ Failed to send. Try again.";
      messageDiv.style.color = "red";
      console.error("EmailJS Error:", error);

      setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
    });
});


const toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "☀️ Light Mode";
  } else {
    toggleButton.textContent = "🌙 Dark Mode";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "☀️ Light Mode";
  } else {
    toggleButton.textContent = "🌙 Dark Mode";
  }
});



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

card.setAttribute('data-aos', 'fade-up');
const card = document.createElement('div');
card.classList.add('project-card');
card.setAttribute('data-aos', 'fade-up'); // 👈 ADD THIS
