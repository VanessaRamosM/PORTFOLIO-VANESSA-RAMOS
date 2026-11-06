// ====== TUS PROYECTOS ======
// "youtube" es el código del vídeo en YouTube; "video" es un archivo de la carpeta MEDIA
const projects = [
  {
    title: "NORMAL PEOPLE REMAKE",
    youtube: "yI6a0_YDJGU",
    page: "normal.html",
  },
  { title: "DELUSION", youtube: "C-TypY9lSqY", page: "delusion.html" },
  { title: "IRENE", video: "MEDIA/VIDEOIRENE.mov", page: "irene.html" },
  { title: "SIMI", youtube: "DAgaAtifDA4", page: "simi.html" },
  { title: "SOUND", video: "MEDIA/VIDEOSOUND.mov", page: "sound.html" },
];

// Dirección del reproductor de YouTube: silenciado, en bucle y sin controles
function urlYoutube(id) {
  return (
    "https://www.youtube.com/embed/" +
    id +
    "?autoplay=1&mute=1&loop=1&playlist=" +
    id +
    "&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1"
  );
}

const contenedor = document.getElementById("proyectos");
const esMovil = window.matchMedia("(max-width: 800px)").matches;

// En ordenador la lista se repite 3 veces para el scroll infinito
const repeticiones = esMovil ? 1 : 3;

// ====== CREAR LAS TARJETAS ======
for (let i = 0; i < repeticiones; i++) {
  projects.forEach((p) => {
    const article = document.createElement("article");
    article.className = "project";

    let video;
    if (p.youtube) {
      // Vídeo alojado en YouTube
      video = document.createElement("iframe");
      video.className = "project__video yt";
      video.dataset.src = urlYoutube(p.youtube);
      video.allow = "autoplay";
      video.title = p.title;
    } else {
      // Vídeo de la carpeta MEDIA
      video = document.createElement("video");
      video.className = "project__video";
      video.src = encodeURI(p.video) + "#t=0.1";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
    }

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

// ====== REPRODUCIR SOLO LOS VÍDEOS QUE SE VEAN ======
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target.querySelector("video, iframe");
      if (video.tagName === "IFRAME") {
        // YouTube: se carga al aparecer y se vacía al salir de la pantalla
        video.src = entry.isIntersecting ? video.dataset.src : "about:blank";
      } else if (entry.isIntersecting) {
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
