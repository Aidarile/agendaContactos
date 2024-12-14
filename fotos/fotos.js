
const fs = require("fs");
const path = require("path");

const rutaImagenes = path.join(__dirname, "imagenes");

function procesarPeticion(req, res, moduloRutas) {
  const id = moduloRutas.siguiente();

  if (id) {
    procesarVisualizacion(req, res, id);
  } else {
    respuestaError(res, 404, "Imagen no encontrada");
  }
}

function procesarVisualizacion(req, res, id) {
  const fotoPath = path.join(rutaImagenes, id);

  if (req.method === "GET") {
    fs.access(fotoPath, fs.constants.F_OK, (err) => {
      if (err) {
        respuestaError(res, 404, "Imagen no encontrada");
      } else {
        const extname = path.extname(fotoPath).toLowerCase();
        let contentType = 'application/octet-stream';

        switch (extname) {
          case '.jpg':
          case '.jpeg':
            contentType = 'image/jpeg';
            break;
          case '.png':
            contentType = 'image/png';
            break;
          case '.gif':
            contentType = 'image/gif';
            break;
          default:
            contentType = 'application/octet-stream';
            break;
        }

        res.setHeader("Content-Type", contentType);
        const readStream = fs.createReadStream(fotoPath);
        readStream.pipe(res);
        readStream.on("error", (err) => {
          respuestaError(res, 500, "Error al leer la imagen");
        });
      }
    });
  } else {
    respuestaError(res, 405, "Metodo no permitido");
  }
}

function respuestaError(res, codigo, mensaje) {
  res.statusCode = codigo;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ 
    status: "error", 
    error: mensaje 
})
);
}

module.exports = { procesarPeticion };
