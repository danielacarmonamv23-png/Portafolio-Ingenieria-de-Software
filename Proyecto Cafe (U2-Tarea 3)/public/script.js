
const formulario = document.getElementById("formPedido");
const mensaje = document.getElementById("mensaje");


formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    
    const pedido = {
        cliente: document.getElementById("cliente").value.trim(),
        producto: document.getElementById("producto").value.trim(),
        cantidad: Number(document.getElementById("cantidad").value),
        observaciones: document.getElementById("observaciones").value.trim()
    };

    
    if (!pedido.cliente || !pedido.producto || pedido.cantidad < 1) {
        mensaje.textContent = "Por favor, completa los campos obligatorios.";
        mensaje.style.color = "#79513B";
        return;
    }

    try {
        
        const respuesta = await fetch("/api/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pedido)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje || "No se pudo registrar el pedido.");
        }

        mensaje.textContent = "¡Pedido registrado correctamente!";
        mensaje.style.color = "#78815A";

        formulario.reset();

    } catch (error) {
        console.error("Error:", error);
        mensaje.textContent = "No se pudo registrar el pedido. Intenta nuevamente.";
        mensaje.style.color = "#79513B";
    }
});
