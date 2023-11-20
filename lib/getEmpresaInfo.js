function getEmpresaInfo(empresa) {
    return {
      id: empresa.id || empresa._id,
      nombre: empresa.nombre,
      descripcion: empresa.descripcion,
      tipo: empresa.tipo,
      empleados: empresa.empleados,
      finalidad: empresa.finalidad,
      instrumento: empresa.instrumento,
      administracion: empresa.administracion,
      organo: empresa.organo,
      tags: empresa.tags,
      id_user: empresa.id_user
    };
  }
  
  module.exports = getEmpresaInfo;
  