const { Schema, model } = require('mongoose');

const LongitudSchema = Schema(
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
        collection: 'longitud',
    }
);

module.exports = model('Longitud', LongitudSchema);
