# Sistema de Registro de Pedidos — ÁUREA CAFÉ

## 1. Descripción del proyecto

Este proyecto consiste en una aplicación web para registrar los pedidos de clientes de la empresa ficticia ÁUREA CAFÉ.

El sistema permite ingresar los datos de cada pedido mediante un formulario web y almacenar la información en una base de datos MySQL y en un archivo CSV.

## 2. Objetivo

Desarrollar una aplicación web que facilite el registro y almacenamiento de pedidos, utilizando tecnologías de desarrollo frontend y backend.

## 3. Tecnologías utilizadas

- **HTML5:** estructura del formulario.
- **CSS3:** diseño y estilos visuales.
- **JavaScript:** validación y envío de los datos del formulario.
- **Node.js:** ejecución del servidor.
- **Express:** gestión de las rutas del servidor.
- **MySQL:** almacenamiento de los pedidos en una base de datos relacional.
- **mysql2:** conexión entre Node.js y MySQL.
- **CSV:** almacenamiento adicional de los registros en un archivo de texto separado por comas.

## 4. Datos registrados

El formulario permite registrar los siguientes campos:

- Nombre del cliente.
- Producto solicitado.
- Cantidad.
- Correo electrónico.

El sistema también registra automáticamente un identificador y la fecha del registro en la base de datos, de acuerdo con la estructura de la tabla.

## 5. Estructura del proyecto

```text
Proyecto Cafeteria/
├── servidor.js
├── package.json
├── package-lock.json
├── README.md
├── Datos.csv
└── public/
    ├── index.html
    ├── estilos.css
    └── app.js
```

## 6. Configuración de la base de datos

La base de datos utilizada se llama `ÁUREA CAFÉ` y contiene una tabla llamada `registros`.

La tabla almacena el nombre del cliente, el producto, la cantidad, el correo electrónico y la fecha de registro.

El script SQL para crear la base de datos y la tabla se entrega por separado.

## 7. Instalación y ejecución

### Requisitos

- Node.js instalado.
- MySQL instalado y en funcionamiento.
- Visual Studio Code u otro editor de código.

### Instalar las dependencias

Desde la terminal, ubicarse en la carpeta del proyecto y ejecutar:

```bash
npm install
```

### Configurar la conexión a MySQL

Antes de iniciar el servidor, verificar que los datos de conexión a MySQL estén configurados correctamente en `servidor.js`.

No publicar contraseñas ni credenciales personales en este archivo de documentación.

### Iniciar el servidor

Desde la terminal, ejecutar:

```bash
node servidor.js
```

Cuando el servidor esté activo, abrir la siguiente dirección en el navegador:

http://localhost:3000/index.html

## 8. Funcionamiento

1. El usuario abre el formulario web.
2. Ingresa el nombre del cliente, el producto, la cantidad y el correo electrónico.
3. El sistema valida los datos ingresados.
4. El formulario envía la información al servidor Node.js.
5. El servidor almacena el pedido en MySQL y en el archivo `Datos.csv`.
6. La aplicación muestra un mensaje indicando el resultado de la operación.

## 9. Pruebas

Se deben realizar al menos cinco pruebas de registro con datos de ejemplo para comprobar el funcionamiento del formulario y el almacenamiento de la información.

También se debe verificar que los registros aparezcan tanto en MySQL como en `Datos.csv`.

## 10. Conclusión

El desarrollo de este proyecto permite aplicar conceptos de desarrollo web, programación con JavaScript, manejo de un servidor backend, programación orientada a objetos, validación de datos y persistencia de información mediante MySQL y archivos CSV.