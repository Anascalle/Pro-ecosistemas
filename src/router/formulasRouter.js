const express = require("express");
const routerFormulas = express.Router();
const esquemaFormula = require('../schemas/formulaZod')

routerFormulas.route('/')
    .get((req, res) => {
        res.send("Hola esta es la seccion de Formulas")
    })

module.exports = routerFormulas




