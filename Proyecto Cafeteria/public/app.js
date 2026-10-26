
const formulario = document.getElementById("formularioPedido");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const producto = document.getElementById("producto").value.trim();
    const cantidad = Number(document.getElementById("cantidad").value);
    const correo = document.getElementById("correo").value.trim();

    
    if (!nombre || !producto || !correo) {
        mensaje.textContent = "Por favor, completa todos los campos.";
        return;
    }

    if (!Number.isInteger(cantidad) || cantidad < 1) {
        mensaje.textContent = "La cantidad debe ser un número entero mayor que cero.";
        return;
    }

    const boton = formulario.querySelector("button");
    boton.disabled = true;
    mensaje.textContent = "Registrando pedido...";

    try {
        const respuesta = await fetch("/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                producto,
                cantidad,
                correo
            })
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje || "No se pudo registrar el pedido.");
        }

        mensaje.textContent = resultado.mensaje;
        formulario.reset();
    } catch (error) {
        mensaje.textContent =
            "No se pudo registrar el pedido. " + error.message;
    } finally {
        boton.disabled = false;
    }
});
