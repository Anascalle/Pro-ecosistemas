const express = require("express");
const routerPacientes = express.Router();
const esquemaUsuario = require('../schemas/userZod')

routerPacientes.route('/')
    .get((req, res) => {
        res.send("Hola esta es la seccion de Pacientes")
    })

module.exports = routerPacientes