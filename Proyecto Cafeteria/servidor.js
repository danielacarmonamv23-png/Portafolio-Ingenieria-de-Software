
require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PUERTO = 3000;
const archivoCSV = path.join(__dirname, "Datos.csv");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const conexion = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 10
});

class RegistroPedido {
    constructor(nombre, producto, cantidad, correo) {
        this.nombre = nombre;
        this.producto = producto;
        this.cantidad = cantidad;
        this.correo = correo;
    }

    convertirCSV() {
        const campos = [
            this.nombre,
            this.producto,
            this.cantidad,
            this.correo
        ];

        return campos.map(valor =>
            `"${String(valor).replace(/"/g, '""')}"`
        ).join(",");
    }
}

async function guardarCSV(pedido) {
    try {
        try {
            await fs.access(archivoCSV);
        } catch {
            await fs.writeFile(
                archivoCSV,
                "nombre_cliente,producto,cantidad,correo\n",
                "utf8"
            );
        }

        await fs.appendFile(
            archivoCSV,
            pedido.convertirCSV() + "\n",
            "utf8"
        );
    } catch (error) {
        throw new Error("No se pudo guardar el archivo CSV.");
    }
}

app.post("/registrar", async (req, res) => {
    try {
        const { nombre, producto, cantidad, correo } = req.body;

        if (
            typeof nombre !== "string" ||
            typeof producto !== "string" ||
            typeof correo !== "string" ||
            !nombre.trim() ||
            !producto.trim() ||
            !correo.trim()
        ) {
            return res.status(400).json({
                mensaje: "Completa todos los campos correctamente."
            });
        }

        const cantidadNumero = Number(cantidad);

        if (
            !Number.isInteger(cantidadNumero) ||
            cantidadNumero < 1
        ) {
            return res.status(400).json({
                mensaje: "La cantidad debe ser un entero mayor que cero."
            });
        }

        if (
            nombre.trim().length > 100 ||
            producto.trim().length > 100 ||
            correo.trim().length > 150 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
        ) {
            return res.status(400).json({
                mensaje: "Revisa el nombre, producto o correo electrónico."
            });
        }

        const pedido = new RegistroPedido(
            nombre.trim(),
            producto.trim(),
            cantidadNumero,
            correo.trim()
        );

        await conexion.execute(
            `INSERT INTO registros
            (nombre_cliente, producto, cantidad, correo)
            VALUES (?, ?, ?, ?)`,
            [
                pedido.nombre,
                pedido.producto,
                pedido.cantidad,
                pedido.correo
            ]
        );

        await guardarCSV(pedido);

        return res.status(201).json({
            mensaje: "¡Pedido registrado correctamente!"
        });

    } catch (error) {
        console.error("Error al registrar el pedido:", error.message);

        return res.status(500).json({
            mensaje: "Ocurrió un error al guardar el pedido."
        });
    }
});

async function iniciarServidor() {
    try {
        const prueba = await conexion.getConnection();
        console.log("Conexión con MySQL exitosa.");
        prueba.release();

        app.listen(PUERTO, () => {
            console.log(
                `Servidor activo en http://localhost:${PUERTO}/index.html`
            );
        });
    } catch (error) {
        console.error("Error de conexión con MySQL:", error.message);
    }
}

iniciarServidor();
