// Importación de los módulos necesarios
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); // Importar el módulo path
const { pacientes, doctores, farmacias } = require('./database/registros'); 

// Middleware para analizar cuerpos de solicitudes de formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(__dirname + "/src/pages"));

// Definir rutas
const registroRouter = require('./router/registroRouter');
const loginRouter = require('./router/iniciosesionRouter');
const routerFarmacos = require('./router/farmacosRouter');
const routerFormulas = require('./router/formulasRouter');
const routerMedicos = require('./router/usuariosDefaultRouter');
const routerPacientes = require('./router/usuariosDefaultRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Enrutamientos
app.use('/Farmacos', routerFarmacos);
app.use('/Formulas', routerFormulas);
app.use('/Medicos', routerMedicos);
app.use('/Pacientes', routerPacientes);
app.use('/registro', registroRouter);
app.use('/iniciar-sesion', loginRouter);

app.get('/api/usuarios', (req, res) => {
    const registros = {
        pacientes: pacientes,
        doctores: doctores,
        farmacias: farmacias
    };
    res.json(registros);
});


// Enrutamiento de las páginas estáticas
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "pages/logo.html")));
app.get("/acerca", (req, res) => res.sendFile(path.join(__dirname, "pages/about.html")));
app.get("/registro", (req, res) => res.sendFile(path.join(__dirname, "pages/register.html")));
app.get("/iniciar-sesion", (req, res) => res.sendFile(path.join(__dirname, "pages/login.html")));
app.get("/recibidor/doctor", (req, res) => res.sendFile(path.join(__dirname, "pages/recibidordoc.html")));
app.get("/recibidor/paciente", (req, res) => res.sendFile(path.join(__dirname, "pages/recibidorpac.html")));
app.get("/recibidor/farmacia", (req, res) => res.sendFile(path.join(__dirname, "pages/recibidorfar.html")));
app.get("/pacientes", (req, res) => res.sendFile(path.join(__dirname, "pages/pacientesdeldoc.html")));
app.get("/historial-formulas", (req, res) => res.sendFile(path.join(__dirname, "pages/historial-formulas.html")));

// Exportar el módulo
module.exports = app;
