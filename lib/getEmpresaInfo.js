function getEmpresaInfo(empresa) {
    return {
      id: empresa.id || empresa._id,
      id_user: empresa.id_user,
      nombre: empresa.nombre,
      descripcion: empresa.descripcion,
      finalidad: empresa.finalidad,
      sector: empresa.sector,
      empleados: empresa.empleados,
      intereses: empresa.intereses
    };
  }
  
  module.exports = getEmpresaInfo;
  