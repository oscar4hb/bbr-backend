const { Schema, model } = require('mongoose');


const CategoriaSchema = Schema({
    categoria: {
        type: String,
        required: true,
            },

    subtituloCategoria: {
        type: String
            },

    cantidad: {
        type: Number
    },
    imagen: {
        type: String
    },

    children: [],

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
    }


}, {
    collection: 'categorias'
}); 



module.exports = model('Categoria', CategoriaSchema);