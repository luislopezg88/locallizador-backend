const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const log = require("../lib/trace");
const router = express.Router();
const Empresa = require("../schema/empresas");
const EmpresasLicitaciones = require("../schema/empresasLicitaciones");
const axios = require('axios');

router.get("/", async (req, res) => {
  try {
    const items = await EmpresasLicitaciones.find({ id_empresa: req.query.id_empresa });
    return res.json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener las licitaciones" });
  }
});

// Agregar ruta para consultar licitaciones
router.get("/:id_user", async (req, res) => {
  try {
    const id_user = req.params.id_user;
    const empresa = await Empresa.findOne({ id_user });
    console.log('empresa', empresa)

    if (!empresa) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }
    const { _id, finalidad, instrumento, administracion, organo } = empresa;
  
    const apiResults = await conectarAPI(finalidad, instrumento, administracion, organo);
    console.log('apiResults', apiResults)

    if (Array.isArray(apiResults) && apiResults.length > 0) {
      const nuevasLicitaciones = new EmpresasLicitaciones({ id_empresa: _id, licitaciones: apiResults });
      await nuevasLicitaciones.save();
      return res.json({ success: true, resultados: apiResults });
    } else {
      return res.json({ success: false, resultados: apiResults });
    }
  } catch (error) {
    console.error('error en el endpoint', error);
    return res.status(500).json({ error: "Error al consultar licitaciones" });
  }
});

// Función para conectar a la API y obtener resultados
const conectarAPI = async (finalidad, instrumento, administracion, organo) => {
  let apiUrl = `https://www.infosubvenciones.es/bdnstrans/GE/es/api/v2.1/listadoconvocatoria`;

  if (organo !== '') {
    apiUrl = apiUrl + `?organo=${organo}`;
  }

  if (finalidad !== '') {
    apiUrl = apiUrl + (apiUrl.includes('?') ? `&finalidad=${finalidad}` : `?finalidad=${finalidad}`);
  }

  if (instrumento !== '') {
    apiUrl = apiUrl + (apiUrl.includes('?') || apiUrl.includes('&') ? `&instrumento=${instrumento}` : `?instrumento=${instrumento}`);
  }

  console.log('apiUrl', apiUrl);
  try {
    const response = await axios.get(apiUrl);
    const { data } = response;
    console.log('data', data)
    for (const property in data[0].convocatorias) {
      console.log(`${property}: ${data[0].convocatorias[property]}`);
    }    
    if (Array.isArray(data) && data.length > 0) {
      const primerElemento = data[0];

      if (primerElemento.convocatorias) {
        const convocatoriasArray = Object.entries(primerElemento.convocatorias).map(([id, convocatoria]) => ({
          id,
          ...convocatoria,
        }));
        console.log('convocatoriasArray', convocatoriasArray)
        return convocatoriasArray;
      } else {
        
        console.error('La propiedad convocatorias no existe en el primer elemento del array.');
        return 'La propiedad convocatorias no existe en el primer elemento del array'
      }
    } else {
      console.error('La propiedad data no es un array o no contiene elementos.');
      return 'La propiedad data no es un array o no contiene elementos'
    }
  } catch (error) {
    console.log('error al conectar el api externa', error.response)
    if (error.response && error.response.status === 404) {
      console.error('No se encontraron convocatorias para los parámetros proporcionados.');
      return 'No se encontraron convocatorias para los parámetros proporcionados.';
    } else {
      console.error("Error al conectar a la API:", error.message);
      return 'Error al conectar a la API';
    }
    throw error;
  }
}

module.exports = router;
