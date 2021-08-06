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

        longitud: {
            type: String,
            required: true,
        },

        created:  {type: Date, default: Date.now}

    },
    {
        collection: 'longitud',
    }
);

module.exports = model('Longitud', LongitudSchema);
