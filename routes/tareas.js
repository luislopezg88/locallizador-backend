const express = require("express");
const moment = require('moment');
const { jsonResponse } = require("../lib/jsonResponse");
const log = require("../lib/trace");
const router = express.Router();
const Tarea = require("../schema/tarea");
const tarea = require("../schema/tarea");

const today = moment().startOf('day')


router.get("/byUser/:userId", async function (req, res) {
  const userId = req.params.userId;
  try {
    const tareas = await Tarea.find({ user: userId }).populate('user');
    res.json(
      jsonResponse(200, {
        tareas,
      })
    );
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error al obtener la lista de empleados",
      })
    );
  }
});

router.get("/today/:userId/date/:date", async function (req, res) {
  const userId = req.params.userId;
  const date = req.params.date;
  try {
    const tareas = await Tarea.find({ 
      user: userId,
      created: {
        $gte: `${date} 00:00:00`,
        $lte: `${date} 23:59:59`
      }
   }).populate('user');
    res.json(
      jsonResponse(200, {
        tareas,
      })
    );
  } catch (err) {
    console.log(err)
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error al obtener la lista de empleados",
      })
    );
  }
});

router.post("/save/:userId", async function (req, res, next) {
  const user = req.params.userId;
  const { name, description } = req.body;
  try {
    const newTarea = new Tarea({ name, description, created: new Date(), completed: false, user });
    await newTarea.save();
    res.json(
      jsonResponse(200, {
        message: "Tarea creada satisfactoriamente",
      })
    );
  } catch (err) {
    console.log(err)
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando el empleado",
      })
    );
  }
});

router.put("/update/:id", async function (req, res, next) {
  const id = req.params.id;
  const { name, description, completed } = req.body;
  try {
    const tarea = Tarea.findById({ _id: id });
    tarea.name = name;
    tarea.description = description;
    tarea.completed = completed;
    await newTarea.save();
    res.json(
      jsonResponse(200, {
        message: "Tarea actualizada satisfactoriamente",
      })
    );
  } catch (err) {
    console.log(err)
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando el empleado",
      })
    );
  }
});

module.exports = router;