const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const log = require("../lib/trace");
const router = express.Router();
const Empresa = require("../schema/empresas");
const axios = require('axios');

router.get("/", async (req, res) => {
  console.log(req.query)
  try {
    const items = await Empresa.find({ id_user: req.query.user });
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
    const empresaExists = await empresa.empresaExists(req.body.nombre);

    if (empresaExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "Empresa ya existe",
        })
      );
      //return next(new Error("Licitación ya existe"));
    } else {
      const empresa = new Empresa({
        id_user: req.body.id_user,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        empleados: req.body.empleados,
        finalidad: req.body.finalidad,
        instrumento: req.body.instrumento,
        administracion: req.body.administracion,
        organo: req.body.organo,
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
    console.log(error);
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
  const { nombre, descripcion, tipo, empleados, finalidad, instrumento, administracion, organo, tags } = req.body;
  try {
    const empresa = await Empresa.findOne({ _id: id })
    if (!empresa) {
      const nuevaEmpresa = new Empresa({ nombre, descripcion, tipo, empleados, finalidad, instrumento, administracion, organo, tags, user });
      await nuevaEmpresa.save();
      res.json(
        jsonResponse(200, {
          message: "Empresa actualizada satisfactoriamente",
        })
      );
    } else {
      empresa.nombre = nombre;
      empresa.descripcion = descripcion;
      empresa.tipo = tipo;
      empresa.empleados = empleados;
      empresa.finalidad = finalidad;
      empresa.instrumento = instrumento;
      empresa.administracion = administracion;
      empresa.organo = organo;
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
