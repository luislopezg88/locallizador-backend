const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const log = require("../lib/trace");
const router = express.Router();
const Empresa = require("../schema/empresas");

router.get("/", async (req, res) => {
  try {
    const items = await Empresa.find({ id_user: req.user.id });
    return res.json(items);
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ error: "Error al obtener los todos" });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.nombre) {
    //return res.status(400).json({ error: "El nombre es obligatorio" });
    return res.status(409).json(
      jsonResponse(409, {
        error: "El nombre es obligatorio",
      })
    );
  }

  try {
    const empresa = new Empresa();
    const empresaExists = await empresa.nameExists(req.body.titulo);

    if (empresaExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Empresa ya existe",
        })
      );
      //return next(new Error("Licitación ya existe"));
    } else {
      const empresa = new Empresa({
        id_user: req.user.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        finalidad: req.body.finalidad,
        tipo: req.body.tipo,
        empleados: req.body.empleados,
        instrumento: req.body.instrumento,
        tags: req.body.tags
      });
  
      const empresaInfo = await empresa.save();
      //console.log({ empresaInfo });
      //res.json(empresaInfo);
      res.json(
        jsonResponse(200, {
          empresaInfo
        })
      );
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({ error: "Error al crear la empresa" });
  }
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const empresa = await Empresa.findOne({ id }).populate('user');

    res.json(
      jsonResponse(200, {
        empresa,
      })
    );
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error al obtener la lista de empresas",
      })
    );
  }
});

router.post("/save/:id", async function (req, res, next) {
  const id = req.params.id;
  const { nombre, descripcion, finalidad, tipo, empleados, instrumento, tags } = req.body;
  try {
    const empresa = await Empresa.findOne({ id })
    if (!empresa) {
      const nuevaEmpresa = new Empresa({ nombre, descripcion, finalidad, tipo, empleados, instrumento, tags, user });
      await nuevaEmpresa.save();
      res.json(
        jsonResponse(200, {
          message: "Empresa actualizada satisfactoriamente",
        })
      );
    } else {
      empresa.nombre = nombre;
      empresa.descripcion = descripcion;
      empresa.finalidad = finalidad;
      empresa.tipo = tipo;
      empresa.empleados = empleados;
      empresa.instrumento = instrumento;
      empresa.tags = tags;
      await empresa.save();
      res.json(
        jsonResponse(200, {
          message: "Empresa actualizada satisfactoriamente",
        })
      );
    }
  } catch (err) {
    //console.log(err)
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando la empresa",
      })
    );
  }
});

module.exports = router;
