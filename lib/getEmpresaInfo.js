function getEmpresaInfo(empresa) {
    return {
      id: empresa.id || empresa._id,
      nombre: empresa.nombre,
      descripcion: empresa.descripcion,
      finalidad: empresa.finalidad,
      tipo: empresa.tipo,
      empleados: empresa.empleados,
      instrumento: empresa.instrumento,
      tags: empresa.tags,
      id_user: empresa.id_user
    };
  }
  
  module.exports = getEmpresaInfo;
  