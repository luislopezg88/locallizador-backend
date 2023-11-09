function getLicitacionInfo(licitacion) {
    return {
      id: licitacion.id || licitacion._id,
      nombre: licitacion.nombre,
      descripcion: licitacion.descripcion,
      inicio: licitacion.inicio,
      fin: licitacion.fin,
      presupuesto: licitacion.presupuesto,
      id_user: licitacion.id_user
    };
  }
  
  module.exports = getLicitacionInfo;
  