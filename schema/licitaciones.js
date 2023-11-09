const Mongoose = require("mongoose");

const LicitacionSchema = new Mongoose.Schema({
  id: { type: Object },
  nombre: { type: String },
  descripcion: { type: String },
  inicio: { type: Date },
  fin: { type: Date },
  presupuesto: { type: String },
  id_user: { 
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }
});

module.exports = Mongoose.model("Licitaciones", LicitacionSchema);
