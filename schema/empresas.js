const Mongoose = require("mongoose");

const EmpresaSchema = new Mongoose.Schema({
  id: { type: Object },
  nombre: { type: String },
  descripcion: { type: String },
  finalidad: { type: String },
  tipo: { type: String },
  empleados: { type: Number },
  instrumento: { type: Array },
  tags: { type: String },
  id_user: { 
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }
});

module.exports = Mongoose.model("Empresas", EmpresaSchema);