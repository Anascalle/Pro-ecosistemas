const express = require("express");
const loginRouter = express.Router();
const registros = require('../database/registros'); 
console.log(registros.pacientes)

loginRouter.route('/')
    .post((req, res) => {
        const { correo, contraseña } = req.body;

        // Verificar si las credenciales coinciden con algún usuario registrado en alguno de los arreglos según su rol
        let usuario;
        [registros.pacientes, registros.doctores, registros.farmacias].some(usuariosRegistrados => {
            usuario = usuariosRegistrados.find(user => user.correo === correo && user.contraseña === contraseña);
            return usuario;
        });

        if (!usuario) {
            return res.status(401).send('<script>alert("Credenciales incorrectas. Inténtelo de nuevo."); window.location="/iniciar-sesion";</script>');
        }

        // Redirigir al usuario a la página correspondiente según su tipo de usuario
        switch (usuario.rol) {
            case 'paciente':
                res.redirect(`/recibidor/paciente?id=${usuario.id}&nombre=${usuario.nombre}`);
                break;
            case 'doctor':
                res.redirect(`/recibidor/doctor?id=${usuario.id}&nombre=${usuario.nombre}`); // Pasar también el nombre del doctor
                break;
            case 'farmacia':
                res.redirect(`/recibidor/farmacia?id=${usuario.id}&nombre=${usuario.nombre}`);
                break;
            default:
                res.status(500).send('Error interno del servidor');
        }
    });

module.exports = loginRouter;
