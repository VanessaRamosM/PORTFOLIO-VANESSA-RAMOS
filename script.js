// ====== TUS PROYECTOS ======
const projects = [
  {
    title: "NORMAL PEOPLE REMAKE",
    video: "MEDIA/NORMAL GENT.mov",
    page: "normal.html",
  },
  { title: "DELUSION", video: "MEDIA/SOUNDSCAPE.mov", page: "delusion.html" },
  { title: "IRENE", video: "MEDIA/VIDEOIRENE.mov", page: "irene.html" },
  { title: "SIMI", video: "MEDIA/VIDEOSIMI.mov", page: "simi.html" },
  { title: "SOUND", video: "MEDIA/VIDEOSOUND.mov", page: "sound.html" },
];

const contenedor = document.getElementById("proyectos");
const esMovil = window.matchMedia("(max-width: 800px)").matches;

// En ordenador la lista se repite 3 veces para el scroll infinito
const repeticiones = esMovil ? 1 : 3;

// ====== CREAR LAS TARJETAS ======
for (let i = 0; i < repeticiones; i++) {
  projects.forEach((p) => {
    const article = document.createElement("article");
    article.className = "project";

    const video = document.createElement("video");
    video.className = "project__video";
    video.src = encodeURI(p.video) + "#t=0.1";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";

    const titulo = document.createElement("h2");
    titulo.className = "project__title";
    titulo.textContent = p.title;

    article.append(video, titulo);
    // Si el proyecto tiene página propia, al pulsarlo se abre
    if (p.page) {
      article.classList.add("project--link");
      article.addEventListener("click", () => {
        window.location.href = p.page;
      });
    }
    contenedor.appendChild(article);
  });
}

// ====== REPRODUCIR TODOS LOS VÍDEOS QUE SE VEAN ======
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target.querySelector("video");
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  },
  { root: contenedor, threshold: 0 },
);

document.querySelectorAll(".project").forEach((el) => observer.observe(el));

// ====== SCROLL INFINITO ======
if (!esMovil) {
  let alturaLista = contenedor.scrollHeight / repeticiones;
  contenedor.scrollTop = alturaLista; // empezamos en la copia del medio

  contenedor.addEventListener("scroll", () => {
    if (contenedor.scrollTop >= alturaLista * 2) {
      contenedor.scrollTop -= alturaLista;
    } else if (contenedor.scrollTop < alturaLista) {
      contenedor.scrollTop += alturaLista;
    }
  });

  window.addEventListener("resize", () => {
    alturaLista = contenedor.scrollHeight / repeticiones;
  });
}

// ====== BOTÓN "PROYECTOS" ======
document.getElementById("btn-proyectos").addEventListener("click", (e) => {
  e.preventDefault();
  if (esMovil) {
    contenedor.scrollIntoView({ behavior: "smooth" });
  } else {
    contenedor.scrollTo({
      top: contenedor.scrollHeight / repeticiones,
      behavior: "smooth",
    });
  }
});
