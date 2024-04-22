const z = require('zod')

const esquemaMedicamento = z.object({
    nombre: z.string(),
    codigo: z.string(),
    tipo: z.string(),
    cantidad: z.number(),
    precio_unitario: z.number(),
});

module.exports = esquemaMedicamento

