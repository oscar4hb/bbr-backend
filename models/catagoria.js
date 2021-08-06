const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema(
    {
        categoriaNombre: {
            type: String,
            required: true,
        },

        cantidadSubcat: {
            type: Number,
            default:0
        },

        cantidadProduc: {
            type: Number,
            default:0
        },
        img: {
            type: String,
            default: null
        },

        rating: {
            type: Number,
        },
        reviews: {
            type: Number,
        },

        created: {type: Date, default: Date.now},

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
