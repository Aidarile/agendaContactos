
require("dotenv").config();

const http = require("http");

const moduloRutas = require("./analizarRutas");

const moduloContactos = require("./contactos/contactos");

const moduloFotos = require("./fotos/fotos");

// Crear el servidor:
const miServidor = http.createServer((req, res) => {
  try {
    const miUrl = new URL(req.url || "/", "http://localhost");
    
    moduloRutas.empezar(miUrl.pathname);

    const apiPedida = moduloRutas.siguiente();


    switch (apiPedida) {
      case "contactos":
        moduloContactos.procesarPeticion(req, res, moduloRutas);
        break;

      case "fotos":
        moduloFotos.procesarPeticion(req, res, moduloRutas);
        break;

      default:
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(
          JSON.stringify({
            status: "error",
            error: "ruta no válida",
          })
        );
        res.end();
        break;
    }
  } catch (error) {
    console.error("Error procesando la petición:", error.message);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.write(
      JSON.stringify({
        status: "error",
        error: "Error interno del servidor",
      })
    );
    res.end();
  }
});

miServidor.listen(process.env.PORT, () => {
  console.log("Servidor iniciado en el puerto", process.env.PORT, "...");
});