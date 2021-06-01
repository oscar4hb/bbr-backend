const { Schema, model } = require('mongoose');

const ImagenesSchema = Schema(
    {
        quality1: {
            type: String,
            required: true,
        },

        quality2: {
            type: String,
            required: true,
        },
        quality3: {
            type: String,
            required: true,
        },
        quality4: {
            type: String,
            required: true,
        },
        quality5: {
            type: String,
            required: true,
        },
        quality6: {
            type: String,
            required: true,
        },
        quality7: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'imagenes',
    }
);

module.exports = model('Imagenes', ImagenesSchema);
