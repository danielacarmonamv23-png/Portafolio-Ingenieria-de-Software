document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("#contact-form");
    const mensaje = document.querySelector("#form-message");

    formulario.addEventListener("submit", event => {
        event.preventDefault();

        const nombre = document.querySelector("#nombre").value.trim();
        const email = document.querySelector("#email").value.trim();
        const texto = document.querySelector("#mensaje").value.trim();

        if (nombre === "") {
            mensaje.textContent = "Por favor, escribe tu nombre.";
            return;
        }

        if (email === "") {
            mensaje.textContent = "Por favor, escribe tu correo.";
            return;
        }

        if (!email.includes("@")) {
            mensaje.textContent = "Por favor, escribe un correo válido.";
            return;
        }

        if (texto === "") {
            mensaje.textContent = "Por favor, escribe un mensaje.";
            return;
        }

        mensaje.textContent = "¡Mensaje enviado correctamente!";
        formulario.reset();
    });
});
