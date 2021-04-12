const { Schema, model } = require('mongoose');

const PesoSchema = Schema(
    {
        usuario : {
            type: Schema.Types.ObjectId, ref: 'Usuario', required: true 
        },

        unidad: {
            type: String,
            required: true,
        },

        nombre: {
            type: String,
            required: true,
        },

    },
    {
        collection: 'peso',
    }
);

module.exports = model('Peso', PesoSchema);
