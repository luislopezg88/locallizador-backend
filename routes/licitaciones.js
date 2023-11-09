const express = require("express");
const router = express.Router();
const Licitacion = require("../schema/licitaciones");

router.get("/", async (req, res) => {
  try {
    const items = await Licitacion.find({ id_user: req.user.id, id_empresa: req.body.id_empresa });
    return res.json(items);
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ error: "Error al obtener los todos" });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.titulo) {
    //return res.status(400).json({ error: "Título es obligatorio" });
    return res.status(409).json(
      jsonResponse(409, {
        error: "Título es obligatorio",
      })
    );
  }

  try {
    const licitacion = new Licitacion();
    const licitacionExists = await licitacion.nameExists(req.body.titulo);

    if (licitacionExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Licitación ya existe",
        })
      );
      //return next(new Error("Licitación ya existe"));
    } else {
      const licitacion = new Licitacion({
        id_user: req.user.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        inicio: req.body.inicio,
        fin: req.body.fin,
        presupuesto: req.body.presupuesto
      });
  
      const LicitacionInfo = await licitacion.save();
      //console.log({ LicitacionInfo });
      //res.json(LicitacionInfo);
      res.json(
        jsonResponse(200, {
          LicitacionInfo
        })
      );
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({ error: "Error al crear la licitación" });
  }
});

router.get("/:id", async function (req, res) {
  const licitacionId = req.params.id;
  //console.log(licitacionId)
  try {
    const licitacion = await Licitacion.findById({ _id: licitacionId });

    res.json(
      jsonResponse(200, {
        licitacion,
      })
    );
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error al obtener la licitación",
      })
    );
  }
});

module.exports = router;
