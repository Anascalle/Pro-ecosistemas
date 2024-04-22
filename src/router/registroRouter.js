const express = require("express");
const registroRouter = express.Router();
const esquemaFormula = require('../schemas/formulaZod')
const { pacientes, doctores, farmacias } = require('../database/registros'); 

// Variable para generar IDs únicos
let idCounter = 1;

// Función para verificar si un correo electrónico está registrado en algún arreglo de usuarios
function correoRegistrado(correo) {
    return pacientes.some(user => user.correo === correo) ||
           doctores.some(user => user.correo === correo) ||
           farmacias.some(user => user.correo === correo);
}



registroRouter.route('/')
    .post( (req, res) => {
        // Extraer los datos del cuerpo de la solicitud
        const { rol, nombre, correo, contraseña, repetir_contraseña } = req.body;
        
        // Verificar que los campos estén llenos
        if (!nombre || !correo || !contraseña || !repetir_contraseña || !rol) {
            return res.status(400).send('Por favor, complete todos los campos.');
        }
    
        // Verificar que las contraseñas coincidan
        if (contraseña !== repetir_contraseña) {
            return res.status(400).send('<script>alert("Las contraseñas no coinciden."); window.location="/registro";</script>');
        }
    
        // Verificar que la contraseña tenga al menos 8 caracteres
        if (contraseña.length < 8) {
            return res.status(400).send('<script>alert("La contraseña debe tener al menos 8 caracteres."); window.location="/registro";</script>');
        }
    
        // Verificar si el correo electrónico ya está registrado
        if (correoRegistrado(correo)) {
            return res.send('<script>alert("El correo electrónico ya está registrado."); window.location="/registro";</script>');
        }
    
        // Verificar si el correo electrónico ya está registrado en el arreglo correspondiente según su rol
        let usuariosRegistrados;
        switch (rol) {
            case 'paciente':
                usuariosRegistrados = pacientes;
                break;
            case 'doctor':
                usuariosRegistrados = doctores;
                break;
            case 'farmacia':
                usuariosRegistrados = farmacias;
                break;
            default:
                return res.status(400).send('Tipo de usuario no válido');
        }
    
        // Crear un nuevo objeto de usuario con un ID único
        const nuevoUsuario = { id: idCounter++, nombre, contraseña, rol, correo };
    
        // Agregar el nuevo usuario al arreglo correspondiente según su rol
        usuariosRegistrados.push(nuevoUsuario);
    
        // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
        res.redirect('/iniciar-sesion');
 })
 
//  module.exports = { registroRouter, pacientes, doctores, farmacias };
module.exports =  registroRouter



