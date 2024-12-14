var contactos = [
    { id: 1, nombre: "Aida Garcia", telefono: "123456789", foto: "1.jpeg" },
    { id: 2, nombre: "Ruben Garcia", telefono: "987654321", foto: "2.jpg" },
    { id: 3, nombre: "Andrea Valentina Gomes", telefono: "24234322", foto: "3.jpg" },
    { id: 4, nombre: "Dori Merino", telefono: "768923423", foto: "4.jpg" },
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

  function actualizarContacto(id, nuevosDatos) {
    const contacto = contactos.find((c) => c.id === id);
    if (contacto) {
      Object.assign(contacto, nuevosDatos); 
    } else {
      throw new Error(`Contacto con ID ${id} no encontrado`);
    }
  }
  
  function eliminarContacto(id) {
    const indice = contactos.findIndex((c) => c.id === id);
    if (indice !== -1) {
      contactos.splice(indice, 1); 
    } else {
      throw new Error(`Contacto con ID ${id} no encontrado`);
    }
  }
  
  module.exports = {
    listarContactos,
    agregarContacto,
    obtenerContactoPorId,
    actualizarContacto,
    eliminarContacto
  };