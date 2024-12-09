
var path;

function empezar(ruta) {
    //Divide la ruta en segmentos gracias a la barra "/":
    path = ruta.split("/");
    //Elimina el primer elemento vacío antes de la primera barra:
    path.shift();
}

function siguiente() {
    //Para obtener el siguiente segmento de la ruta:
    return path.shift();
}

module.exports = {
    empezar,
    siguiente,
};