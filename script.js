
"use strict";

// ========================================
// DIETÓ - CUIDA TU SALUD MENTAL
// Creado por Duvan Felipe Riascos Manyoma
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  const respirarBtn = document.getElementById("respirarBtn");
  const detenerBtn = document.getElementById("detenerBtn");
  const respiracion = document.getElementById("respiracion");
  const circulo = document.getElementById("circulo");
  const instruccion = document.getElementById("instruccion");
  const contador = document.getElementById("contador");

  const diario = document.getElementById("diario");
  const guardarBtn = document.getElementById("guardarBtn");
  const mensajeDiario = document.getElementById("mensajeDiario");

  // ========================================
  // EJERCICIO DE RESPIRACIÓN
  // ========================================

  let intervaloRespiracion = null;
  let tiempoRespiracion = 0;

  function detenerRespiracion() {
    if (intervaloRespiracion !== null) {
      clearInterval(intervaloRespiracion);
      intervaloRespiracion = null;
    }

    if (respiracion) respiracion.hidden = true;
    if (respirarBtn) respirarBtn.hidden = false;
    if (circulo) circulo.classList.remove("inhalar");
    if (contador) contador.textContent = "";
  }

  if (respirarBtn && respiracion) {
    respirarBtn.addEventListener("click", () => {
      detenerRespiracion();

      respirarBtn.hidden = true;
      respiracion.hidden = false;
      tiempoRespiracion = 0;

      function actualizarRespiracion() {
        if (tiempoRespiracion >= 60) {
          detenerRespiracion();

          if (instruccion) {
            instruccion.textContent =
              "¡Muy bien! Has completado tu pausa 🌿";
          }

          const mensaje = document.getElementById("mensajeDiario");
          if (mensaje) {
            mensaje.textContent =
              "¡Bien hecho! Dedicarse un momento también es cuidarse. 💚";
          }

          return;
        }

        const fase = tiempoRespiracion % 10;

        if (fase < 4) {
          instruccion.textContent = "Inhala suavemente";
          circulo.classList.add("inhalar");
        } else if (fase < 6) {
          instruccion.textContent = "Haz una pausa cómoda";
          circulo.classList.remove("inhalar");
        } else {
          instruccion.textContent = "Exhala suavemente";
          circulo.classList.remove("inhalar");
        }

        contador.textContent =
          "Ejercicio guiado: " + tiempoRespiracion + " segundos";

        tiempoRespiracion++;
      }

      actualizarRespiracion();
      intervaloRespiracion = setInterval(
        actualizarRespiracion,
        1000
      );
    });
  }

  if (detenerBtn) {
    detenerBtn.addEventListener("click", detenerRespiracion);
  }

  // ========================================
  // DIARIO EMOCIONAL
  // ========================================

  if (guardarBtn && diario && mensajeDiario) {
    guardarBtn.addEventListener("click", () => {
      const texto = diario.value.trim();

      if (!texto) {
        mensajeDiario.textContent =
          "Escribe una reflexión antes de continuar. 💚";
        diario.focus();
        return;
      }

      mensajeDiario.textContent =
        "Tu reflexión está escrita en esta página. " +
        "Si quieres conservarla, cópiala en un lugar seguro. 🌿";
    });
  }

  // ========================================
  // NAVEGACIÓN SUAVE
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
      const destino = enlace.getAttribute("href");

      if (!destino || destino === "#") return;

      const seccion = document.querySelector(destino);

      if (seccion) {
        evento.preventDefault();
        seccion.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches ? "auto" : "smooth",
          block: "start"
        });
      }
    });
  });

  // ========================================
  // ANIMACIÓN DE LAS TARJETAS
  // ========================================

  document.querySelectorAll(".tarjeta").forEach((tarjeta) => {
    tarjeta.setAttribute("tabindex", "0");
  });

  console.log("DIETÓ está listo. ¡Cuida tu mente! 💚");
});
