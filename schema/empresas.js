const Mongoose = require("mongoose");

const EmpresaSchema = new Mongoose.Schema({
  id: { type: Object },
  nombre: { type: String },
  descripcion: { type: String },
  tipo: { type: String },
  empleados: { type: Number },
  finalidad: { type: String },
  instrumento: { type: String },
  administracion: { type: String },
  organo: { type: String },
  tags: { type: String },
  id_user: { 
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }
});

EmpresaSchema.methods.empresaExists = async function (nombre) {
  const result = await Mongoose.model("Empresas").find({ nombre: nombre });
  return result.length > 0;
};


module.exports = Mongoose.model("Empresas", EmpresaSchema);