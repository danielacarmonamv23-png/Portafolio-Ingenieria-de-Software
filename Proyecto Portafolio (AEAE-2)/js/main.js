// ========================================
// PROYECTOS
// ========================================

// Lista de proyectos del portafolio.
const proyectos = [
    {
        titulo: "Calculadora Web",
        descripcion: "Calculadora sencilla realizada con HTML, CSS y JavaScript.",
        tecnologia: "HTML, CSS y JavaScript"
    },
    {
        titulo: "Mi Portafolio Web",
        descripcion: "Página personal para presentar mi información y mis trabajos.",
        tecnologia: "HTML, CSS y JavaScript"
    },
    {
        titulo: "Página de Presentación",
        descripcion: "Página web sencilla para mostrar información personal.",
        tecnologia: "HTML y CSS"
    }
];

// Buscamos el lugar donde se mostrarán los proyectos.
const contenedorProyectos = document.getElementById("proyectos-grid");

// Mostramos cada proyecto en la página.
function mostrarProyectos() {
    if (!contenedorProyectos) {
        return;
    }

    contenedorProyectos.innerHTML = "";

    proyectos.forEach(function (proyecto) {
        const tarjeta = document.createElement("article");

        tarjeta.className = "project-card";

        tarjeta.innerHTML = `
            <h3>${proyecto.titulo}</h3>
            <p>${proyecto.descripcion}</p>
            <small>${proyecto.tecnologia}</small>
        `;

        contenedorProyectos.appendChild(tarjeta);
    });
}

// ========================================
// FORMULARIO
// ========================================

// Validación y simulación del envío del formulario.
const formulario = document.getElementById("contactForm");
const mensajeFormulario = document.getElementById("formMessage");

if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (formulario.checkValidity()) {
            if (mensajeFormulario) {
                mensajeFormulario.textContent =
                    "Mensaje enviado correctamente. ¡Gracias por contactarme!";
            }

            formulario.reset();
        }
    });
}

// ========================================
// INICIO
// ========================================

mostrarProyectos();
