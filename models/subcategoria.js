const { Schema, model } = require('mongoose');

const SubCategoriaSchema = Schema(
    {
        subcategoria: {
            type: String,
            required: true,
        },

        categoria: {
            type: Schema.Types.ObjectId,
            ref: 'Categoria',
        },
        cantidadProduc: {
            type: Number,
            default: 0,
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
        created: {type: Date, default: Date.now},


        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
        },
    },
    {
        collection: 'subcategoria',
    }
);

module.exports = model('Subcategoria', SubCategoriaSchema);
