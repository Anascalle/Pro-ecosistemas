const express = require("express");
const routerFarmacos = express.Router();
const esquemaMedicamento = require('../schemas/drugZod')

routerFarmacos.route('/')
    .get((req, res) => {
        res.send("Hola esta es la seccion de medicamentos")
    })

module.exports = routerFarmacos