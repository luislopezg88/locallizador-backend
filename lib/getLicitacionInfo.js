function getLicitacionInfo(licitacion) {
    return {
      id: licitacion.id || licitacion._id,
      id_user: licitacion.id_user,
      nombre: licitacion.nombre,
      descripcion: licitacion.descripcion,
      inicio: licitacion.inicio,
      fin: licitacion.fin,
      presupuesto: licitacion.presupuesto
    };
  }
  
  module.exports = getLicitacionInfo;
  