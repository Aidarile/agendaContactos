var contactos = [
    { id: 1, nombre: "Aida Garcia", telefono: "123456789", foto: "1.jpg" },
    { id: 2, nombre: "Ruben Garcia", telefono: "987654321", foto: "2.jpg" },
  ];
  
  function listarContactos() {
    return contactos;
  }
  
  function agregarContacto(contacto) {
    contacto.id = contactos.length ? contactos[contactos.length - 1].id + 1 : 1;
    contactos.push(contacto);
  }
  
  function obtenerContactoPorId(id) {
    return contactos.find((contacto) => contacto.id === id);
  }
  
  module.exports = {
    listarContactos,
    agregarContacto,
    obtenerContactoPorId,
  };