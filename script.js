
const audio = document.getElementById("radioAudio");
const playButton = document.getElementById("playButton");
const playerStatus = document.getElementById("playerStatus");
const trackStatus = document.getElementById("trackStatus");
const playerMessage = document.getElementById("playerMessage");

const volume = document.getElementById("volume");
const volumeValue = document.getElementById("volumeValue");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const currentYear = document.getElementById("currentYear");

// Año del pie de página
currentYear.textContent = new Date().getFullYear();

// VOLUMEN
audio.volume = Number(volume.value);

volume.addEventListener("input", () => {
  audio.volume = Number(volume.value);
  volumeValue.textContent = `${Math.round(audio.volume * 100)}%`;
});

// REPRODUCTOR
async function togglePlayback() {
  if (!audio.paused) {
    audio.pause();
    return;
  }

  playerMessage.textContent = "Conectando con Leza Radio...";
  trackStatus.textContent = "Intentando conectar...";

  try {
    await audio.play();
  } catch (error) {
    playerMessage.textContent =
      "No pudimos iniciar la reproducción. Revisá tu conexión e intentá nuevamente.";
    trackStatus.textContent = "No se pudo reproducir";
    playerStatus.textContent = "Sin conexión";
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Reintentar reproducción");
  }
}

playButton.addEventListener("click", togglePlayback);

audio.addEventListener("playing", () => {
  playButton.textContent = "Ⅱ";
  playButton.setAttribute("aria-label", "Pausar radio");
  playerStatus.textContent = "Reproduciendo";
  trackStatus.textContent = "Estás escuchando la transmisión";
  playerMessage.textContent = "¡Gracias por escuchar Leza Radio!";
});

audio.addEventListener("pause", () => {
  playButton.textContent = "▶";
  playButton.setAttribute("aria-label", "Reproducir radio");
  playerStatus.textContent = "Radio online";
  trackStatus.textContent = "Transmisión pausada";
  playerMessage.textContent = "Presioná reproducir cuando quieras volver a escuchar.";
});

audio.addEventListener("waiting", () => {
  playerMessage.textContent = "Esperando la señal de audio...";
  trackStatus.textContent = "Conectando...";
});

audio.addEventListener("error", () => {
  playButton.textContent = "▶";
  playButton.setAttribute("aria-label", "Reintentar reproducción");
  playerStatus.textContent = "Señal no disponible";
  trackStatus.textContent = "No se pudo recibir el audio";
  playerMessage.textContent =
    "La transmisión no está disponible en este momento. Probá de nuevo más tarde.";
});

// MENÚ PARA CELULARES
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Cerrar el menú después de seleccionar una sección
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  });
});

// Si la ventana vuelve a tamaño de escritorio, cerrar el menú móvil
window.addEventListener("resize", () => {
  if (window.innerWidth > 620) {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  }
});
