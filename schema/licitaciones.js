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

LicitacionSchema.methods.nameExists = async function (titulo) {
  const result = await Mongoose.model("Licitaciones").find({ titulo: titulo });
  return result.length > 0;
};

module.exports = Mongoose.model("Licitaciones", LicitacionSchema);
