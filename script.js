const canvas = document.getElementById("devopsBackground");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const logos = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
];

class Particle {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = image;
    this.size = 40 + Math.random() * 15;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
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
for (let i = 0; i < 15; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const logo = logos[Math.floor(Math.random() * logos.length)];
  particles.push(new Particle(x, y, logo));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

