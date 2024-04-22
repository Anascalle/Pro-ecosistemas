const z = require('zod')

const esquemaUsuario = z.object({
    nombre: z.string(),
    correo: z.string().email(), 
    contraseña: z.string(),
    tipoUsuario: z.string(),
});

module.exports = esquemaUsuario