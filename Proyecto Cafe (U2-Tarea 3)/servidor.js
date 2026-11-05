
const express = require("express");
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;


app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));


const conexion = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});


app.post("/api/pedidos", async (req, res) => {
    const { cliente, producto, cantidad, observaciones } = req.body;

    
    if (
        !cliente ||
        !producto ||
        !Number.isInteger(Number(cantidad)) ||
        Number(cantidad) < 1
    ) {
        return res.status(400).json({
            mensaje: "Verifica los datos del pedido."
        });
    }

    try {
        const cantidadPedido = Number(cantidad);

        
        await conexion.execute(
            `INSERT INTO pedidos
            (cliente, producto, cantidad, observaciones)
            VALUES (?, ?, ?, ?)`,
            [cliente, producto, cantidadPedido, observaciones || ""]
        );

        
        const archivoCSV = path.join(__dirname, "Datos.csv");

        if (!fs.existsSync(archivoCSV)) {
            fs.writeFileSync(
                archivoCSV,
                "Cliente,Producto,Cantidad,Observaciones\n",
                "utf8"
            );
        }

        const limpiarCSV = (valor) =>
            `"${String(valor || "").replace(/"/g, '""')}"`;

        const registro = [
            cliente,
            producto,
            cantidadPedido,
            observaciones || ""
        ].map(limpiarCSV).join(",") + "\n";

        fs.appendFileSync(archivoCSV, registro, "utf8");

        res.status(201).json({
            mensaje: "Pedido registrado correctamente."
        });

    } catch (error) {
        console.error("Error al registrar pedido:", error);

        res.status(500).json({
            mensaje: "Error al guardar el pedido."
        });
    }
});


app.listen(PORT, () => {
    console.log(`Proyecto Cafe disponible en http://localhost:${PORT}`);
});
