// ====== BOTÓN "SIGUIENTE PROYECTO" ======
// Lista de proyectos: vídeo que se ve en el cuadrado y página a la que lleva
// "youtube" es el código del vídeo en YouTube; "video" es un archivo de la carpeta MEDIA
const proyectos = [
  { youtube: "DAgaAtifDA4", page: "simi.html" },
  { youtube: "C-TypY9lSqY", page: "delusion.html" },
  { video: "MEDIA/VIDEOIRENE.mov", page: "irene.html" },
  { video: "MEDIA/VIDEOSOUND.mov", page: "sound.html" },
  { youtube: "yI6a0_YDJGU", page: "normal.html" },
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
  let video;
  if (p.youtube) {
    // Vídeo alojado en YouTube
    video = document.createElement("iframe");
    video.className = "siguiente__video yt";
    video.src = urlYoutube(p.youtube);
    video.allow = "autoplay";
  } else {
    // Vídeo de la carpeta MEDIA
    video = document.createElement("video");
    video.className = "siguiente__video";
    video.src = encodeURI(p.video) + "#t=0.1";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
  }
  caja.appendChild(video);
  return video;
});

const texto = document.createElement("span");
texto.className = "siguiente__texto";
texto.textContent = "SIGUIENTE PROYECTO";

boton.append(caja, texto);
document.querySelector(".pagina").appendChild(boton);

// ====== CAMBIAR DE VÍDEO CADA 2 SEGUNDOS ======
// Los vídeos de YouTube van solos; solo hay que pausar y reproducir los de MEDIA
let indice = 0;
videos[0].classList.add("activo");
if (otros[0].video) videos[0].play().catch(() => {});

setInterval(() => {
  videos[indice].classList.remove("activo");
  if (otros[indice].video) videos[indice].pause();

  indice = (indice + 1) % videos.length;

  videos[indice].classList.add("activo");
  if (otros[indice].video) videos[indice].play().catch(() => {});
  boton.href = otros[indice].page; // al pulsar, va al proyecto que se está viendo
}, 2000);
