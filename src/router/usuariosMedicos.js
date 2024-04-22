const express = require("express");
const routerMedicos = express.Router();
const esquemaUsuario = require('../schemas/userZod')

routerMedicos.route('/')
    .get((req, res) => {
        res.send("Hola esta es la seccion de Medicos")
    })

module.exports = routerMedicos