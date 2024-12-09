
//Importar el modulo de "datos":
const datos = require("./datos");

function procesarPeticion(res, res, restoRuta) {
    //Para obtener el ID del contacto si está en la ruta:
    const id = restoRuta.siguiente();

    if (id) {
        //Procesa un recurso especifico (por el ID del contacto):
        procesarRecurso(req, res, id);
    } else {
        //Procesa la colección completa (todos los contactos):
        procesarColeccion(req, res);
    }
}
function procesarColeccion(req, res) {
    console.log("Contactos procesando coleccion (sin parametros)");
    switch(req.method) {
        case "GET":
        //Devolver la lista completa de contactos:
        const contactos = datos.listaContactos();
        respuestaOK(res, contactos);
        break;

        case "POST":
        //Añade un nuevo contacto:
        const nuevoContacto = [];
        req.on("data", (data) => {
            nuevoContacto.push(data);
        });
        req.on("end", () => {
            const objetoContacto = JSON.parse(Buffer.concat(nuevoContacto).toString());
            datos.agregarContacto(objetoContacto);
            respuestaOK(res, "Contacto añadido correctamente");   
        });
        break;

        default:
            respuestaError(res, "Metodo no disponible", 405);
            break;
    }
}

function procesarRecurso(req, res, id) {
    console.log("Contactos procesando recurso (Contacto = " + id + ")");
    //Buscar contacto por su ID:
    const contacto = datos.obtenerContactoPorId(Number(id));

    if (contacto) {
        switch(req.method) {
            case "GET":
            //Devuelve los detalles del contacto:
            respuestaOK(res, contacto);
            break;

            case "PUT":
            //Modifica un contacto existente:
            let datosActualizados = [];
            req.on("data", (data) => {
                datosActualizados.push(data);
            });
            break;

            case "DELETE":
            //Eliminar un contacto:
            datos.eliminarContacto(Number(id));
            respuestaOK(res, "Contacto eliminado correctamente");
            break;

            default:
            respuestaError(res, "Metodo no disponible", 405);
        }
    } else {
        respuestaError(res, "Contacto no encontrado", 404);
    }
}

module.exports = {
    procesarPeticion,
};

//Funciones para las respuestas de OK y ERROR:

function respuestaOK(res, respuesta) {
    console.log(respuesta)
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(
      JSON.stringify({
        "status": "ok",
        "data": respuesta,
      })
    );
    res.end();
  }
  
  function respuestaError(res, mensajeError, codigo) {
    res.statusCode = codigo;
    res.setHeader("Content-Type", "application/json");
    res.write(
      JSON.stringify({
        "status": "error",
        "error": mensajeError,
      })
    );
    res.end();
  }

