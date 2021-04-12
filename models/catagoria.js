const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema(
    {
        categoriaNombre: {
            type: String,
            required: true,
        },

        cantidad: {
            type: Number,
        },
        img: {
            type: String,
        },

        rating: {
            type: Number,
        },
        reviews: {
            type: Number,
        },

        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
        },
    },
    {
        collection: 'categorias',
    }
);

module.exports = model('Categoria', CategoriaSchema);
