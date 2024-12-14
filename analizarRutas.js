
var path; 

function empezar(ruta) {

    if (typeof ruta !== "string") {
        throw new Error("El parámetro 'ruta' debe ser una cadena válida.");
    }


    path = ruta.split("/");

 
    path.shift();

    console.log("Ruta procesada:", path); 
}

function siguiente() {
    if (!path || path.length === 0) {
        console.warn("No quedan más segmentos en la ruta.");
        return null;
    }

 
    return path.shift();
}

module.exports = {
    empezar,
    siguiente,
};