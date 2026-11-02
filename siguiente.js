// ====== BOTÓN "SIGUIENTE PROYECTO" ======
// Lista de proyectos: vídeo que se ve en el cuadrado y página a la que lleva
const proyectos = [
  { video: "MEDIA/VIDEOSIMI.mov", page: "simi.html" },
  { video: "MEDIA/SOUNDSCAPE.mov", page: "delusion.html" },
  { video: "MEDIA/VIDEOIRENE.mov", page: "irene.html" },
  { video: "MEDIA/VIDEOSOUND.mov", page: "sound.html" },
  { video: "MEDIA/NORMAL GENT.mov", page: "normal.html" },
];

// Quitamos el proyecto de la página en la que estamos
const paginaActual = location.pathname.split("/").pop().toLowerCase();
const otros = proyectos.filter((p) => p.page !== paginaActual);

// ====== CREAR EL BOTÓN ======
const boton = document.createElement("a");
boton.className = "siguiente";
boton.href = otros[0].page;

const caja = document.createElement("span");
caja.className = "siguiente__caja";

const videos = otros.map((p, i) => {
  const video = document.createElement("video");
  video.className = "siguiente__video";
  video.src = encodeURI(p.video) + "#t=0.1";
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "auto";
  caja.appendChild(video);
  return video;
});

const texto = document.createElement("span");
texto.className = "siguiente__texto";
texto.textContent = "SIGUIENTE PROYECTO";

boton.append(caja, texto);
document.querySelector(".pagina").appendChild(boton);

// ====== CAMBIAR DE VÍDEO CADA 2 SEGUNDOS ======
let indice = 0;
videos[0].classList.add("activo");
videos[0].play().catch(() => {});

setInterval(() => {
  videos[indice].classList.remove("activo");
  videos[indice].pause();

  indice = (indice + 1) % videos.length;

  videos[indice].classList.add("activo");
  videos[indice].play().catch(() => {});
  boton.href = otros[indice].page; // al pulsar, va al proyecto que se está viendo
}, 2000);
