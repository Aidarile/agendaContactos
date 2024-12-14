
const datos = require("./datos");

function procesarPeticion(req, res, moduloRutas) {
  const id = moduloRutas.siguiente();

  if (id) {
    procesarRecurso(req, res, parseInt(id));
  } else {
    procesarColeccion(req, res);
  }
}

function procesarColeccion(req, res) {
  console.log("Contactos procesando coleccion (sin parametros)");

  switch (req.method) {
    case "GET":
      const contactos = datos.listarContactos();
      respuestaOK(res, contactos);
      break;

    case "POST":
      let body = [];
      req.on("data", (datito) => {
        body.push(datito);
      });
      req.on("end", () => {
        try {
          const nuevoContacto = JSON.parse(Buffer.concat(body).toString());
          datos.agregarContacto(nuevoContacto);
          respuestaOK(res, "Contacto agregado correctamente");
        } catch (err) {
          respuestaError(res, "Error al procesar la solicitud", 400);
        }
      });
      break;

    default:
      respuestaError(res, "Metodo no soportado", 405);
      break;
  }
}

function procesarRecurso(req, res, id) {
  console.log("Contactos procesando recurso (Contacto = " + id + ")");

  const contacto = datos.obtenerContactoPorId(id);

  if (contacto) {
    switch (req.method) {
      case "GET":
        respuestaOK(res, contacto);
        break;

        case "PUT":
            let body = [];
            req.on("data", (datito) => {
              body.push(datito);
            });
            req.on("end", () => {
              try {
                const datosActualizados = JSON.parse(Buffer.concat(body).toString());
                datos.actualizarContacto(id, datosActualizados);
                respuestaOK(res, `Contacto con ID ${id} actualizado`);
              } catch (err) {
                respuestaError(res, "Error procesando el cuerpo de la solicitud", 400);
              }
            });
            break;
    
          case "DELETE":
            datos.eliminarContacto(id);
            respuestaOK(res, `Contacto con ID ${id} eliminado`);
            break;

      default:
        respuestaError(res, "Metodo no soportado", 405);
        break;
    }
  } else {
    respuestaError(res, `Contacto con ID ${id} no encontrado`, 404);
  }
}

function respuestaOK(res, datos) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ 
    status: "ok", 
    data: datos }));
}

function respuestaError(res, mensaje, codigo) {
  res.statusCode = codigo;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ 
    status: "error", 
    error: mensaje }));
}

module.exports = { procesarPeticion };