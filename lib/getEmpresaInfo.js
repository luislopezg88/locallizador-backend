function getEmpresaInfo(empresa) {
    return {
      id: empresa.id || empresa._id,
      nombre: empresa.nombre,
      descripcion: empresa.descripcion,
      finalidad: empresa.finalidad,
      sector: empresa.sector,
      empleados: empresa.empleados,
      intereses: empresa.intereses,
      tags: empresa.tags,
      id_user: empresa.id_user
    };
  }
  
  module.exports = getEmpresaInfo;
  