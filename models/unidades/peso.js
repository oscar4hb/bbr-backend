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

        peso: {
            type: String,
            required: true,
        },

        created:  {type: Date, default: Date.now}

    },
    {
        collection: 'peso',
    }
);

module.exports = model('Peso', PesoSchema);
