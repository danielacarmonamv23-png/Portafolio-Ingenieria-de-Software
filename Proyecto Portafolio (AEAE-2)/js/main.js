document.addEventListener("DOMContentLoaded", () => {
    // Menú responsive
    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // Cambio de tema
    const themeToggle = document.querySelector("#theme-toggle");

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent =
            document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    // Datos de proyectos
    const proyectos = [
        {
            titulo: "Sitio Web Personal",
            descripcion: "Portafolio web desarrollado utilizando HTML5, CSS3 y JavaScript.",
            tecnologias: ["HTML5", "CSS3", "JavaScript"],
            imagen: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
            enlace: "#"
        },
        {
            titulo: "Página de Restaurante",
            descripcion: "Página web responsive para mostrar información y productos de un restaurante.",
            tecnologias: ["HTML5", "CSS3", "Responsive Design"],
            imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            enlace: "#"
        },
        {
            titulo: "Aplicación de Tareas",
            descripcion: "Aplicación sencilla para organizar tareas utilizando JavaScript y manipulación del DOM.",
            tecnologias: ["HTML5", "CSS3", "JavaScript", "DOM"],
            imagen: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
            enlace: "#"
        }
    ];

    function renderizarProyectos() {
        const contenedor = document.querySelector("#proyectos-grid");

        proyectos.forEach(proyecto => {
            const card = document.createElement("article");
            card.className = "proyecto-card";

            card.innerHTML = `
                <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
                <h3>${proyecto.titulo}</h3>
                <p>${proyecto.descripcion}</p>
                <div class="tecnologias">
                    ${proyecto.tecnologias
                        .map(tecnologia => `<span>${tecnologia}</span>`)
                        .join("")}
                </div>
                <a href="${proyecto.enlace}" class="btn">Ver proyecto</a>
            `;

            contenedor.appendChild(card);
        });
    }

    renderizarProyectos();
});
