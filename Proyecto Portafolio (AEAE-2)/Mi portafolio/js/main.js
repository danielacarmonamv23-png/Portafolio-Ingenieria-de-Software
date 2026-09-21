
// DATOS DE LOS PROYECTOS

const proyectos = [
    {
        numero: "01",
        titulo: "Calculadora Web",
        descripcion: "Calculadora sencilla creada con HTML, CSS y JavaScript.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        enlace: "#"
    },
    {
        numero: "02",
        titulo: "Mi Portafolio Web",
        descripcion: "Portafolio personal para presentar mi información, habilidades y proyectos.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        enlace: "#"
    },
    {
        numero: "03",
        titulo: "Página de Presentación",
        descripcion: "Página web sencilla para practicar estructura, estilos y diseño responsive.",
        tecnologias: ["HTML", "CSS"],
        enlace: "#"
    }
];



// MOSTRAR LOS PROYECTOS


function mostrarProyectos() {
    const contenedor = document.querySelector("#proyectos-grid");

    if (!contenedor) {
        return;
    }

    proyectos.forEach(function (proyecto) {
        const tarjeta = document.createElement("article");

        tarjeta.classList.add("project-card");

        tarjeta.innerHTML = `
            <p class="project-number">${proyecto.numero}</p>
            <h3>${proyecto.titulo}</h3>
            <p>${proyecto.descripcion}</p>

            <div class="project-tags">
                ${proyecto.tecnologias
                    .map(function (tecnologia) {
                        return `<span>${tecnologia}</span>`;
                    })
                    .join("")}
            </div>

            <a href="${proyecto.enlace}" class="btn">
                Ver proyecto
            </a>
        `;

        contenedor.appendChild(tarjeta);
    });
}


// FORMULARIO DE CONTACTO


function configurarFormulario() {
    const formulario = document.querySelector("#contactForm");
    const mensaje = document.querySelector("#formMessage");

    if (!formulario || !mensaje) {
        return;
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        mensaje.textContent =
            "¡Mensaje enviado correctamente! Este formulario es una simulación.";

        formulario.reset();
    });
}



// INICIAR LA PÁGINA


document.addEventListener("DOMContentLoaded", function () {
    mostrarProyectos();
    configurarFormulario();
});
