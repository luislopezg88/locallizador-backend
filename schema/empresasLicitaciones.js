const Mongoose = require("mongoose");

const EmpresasLicitacionesSchema = new Mongoose.Schema({
  id: { type: Object },
  licitaciones: { type: Array },
  id_empresa: { 
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Empresa' 
  }
});

module.exports = Mongoose.model("EmpresasLicitaciones", EmpresasLicitacionesSchema);