
//Para cargar las variables de enotrno desde el archivo .env:
require("dotenv").config();
//Esto crea el servidor HTTP:
const http = require("http");
//Modulo para analizar las rutas:
const moduloRutas = require("./analizarRutas");
//Modulo para utilizar los contactos:
const moduloContactos = require("./contactos/contactos");
//Modulo para utilizar las fotos:
const moduloFotos = require("./fotos/fotos");

//Crear el servidor:
const miServidor = http.createServer((req, res) => {
  const miUrl = new URL(req.url, "http://localhost"); //-> Analiza la URL de la peticion
  moduloRutas.empezar(miUrl.parthname); //-> Inicia el analisis de la ruta

  //Para obtener el primer segmento de la ruta:
  const apiPedida = modeloRutas.siguiente();
  switch (apiPedida) {
    case "contactos":
      //Delegar la petición al modulo de contactos:
      moduloContactos.procesarPeticion(req, res, moduloRutas);
      break;

    case "fotos":
      moduloFotos.procesarPeticion(req, res, moduloRutas);
      break;
    
    default:
        //Cuando la ruta NO sea valida:
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(
            JSON.stringify({
                status: "error",
                error: "ruta no valida",
            })
        );
        res.end();
        break;
  }
});

//Inicia el Servidor y hace que escuche:
miServidor.listen(process.env.PORT, () => {
    console.log("Servidor iniciado en el puerto", process.env.PORT, "...");
});
