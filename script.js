// ===== DEVOPS FLOATING ICONS ANIMATION =====
const canvas = document.getElementById("devopsBackground");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const logos = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
  ];
	// ===== BACKGROUND PARTICLE EFFECT =====
class BackgroundParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
}


  class Particle {
    constructor(x, y, image) {
      this.x = x;
      this.y = y;
      this.image = new Image();
      this.image.src = image;
      this.size = 35 + Math.random() * 10;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.glow = Math.random() * 0.5 + 0.5;
    }

    draw() {
      ctx.shadowBlur = 15;
      ctx.shadowColor = `rgba(0,180,216,${this.glow})`;
      ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
      ctx.shadowBlur = 0;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x + this.size > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y + this.size > canvas.height) this.speedY *= -1;
    }
  }

  const particles = [];
 const bgParticles = [];
for (let i = 0; i < 60; i++) {
  bgParticles.push(new BackgroundParticle());
}
 for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const logo = logos[Math.floor(Math.random() * logos.length)];
    particles.push(new Particle(x, y, logo));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bgParticles.forEach(p => { p.update(); p.draw(); });  // glowing particles
  particles.forEach(p => { p.update(); p.draw(); });    // DevOps icons
  
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
// ===== MOUSE INTERACTIVITY =====
let mouse = {
  x: null,
  y: null,
  radius: 100
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// optional: reset mouse when it leaves the window
window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});

// enhance particle motion
Particle.prototype.update = function() {
  this.x += this.speedX;
  this.y += this.speedY;

  // bounce off edges
  if (this.x < 0 || this.x + this.size > canvas.width) this.speedX *= -1;
  if (this.y < 0 || this.y + this.size > canvas.height) this.speedY *= -1;

  // gentle attraction to mouse
  if (mouse.x && mouse.y) {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      this.x -= dx / 30;
      this.y -= dy / 30;
    }
  }
};


// ===== FADE-IN ON SCROLL (fixed version) =====
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, footer");

  // ensure all hidden at start
  sections.forEach(section => section.classList.remove("visible"));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(section => observer.observe(section));
});

