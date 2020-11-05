const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: true,
            },

    descripcion: {
        type: String
            },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number
    },
    imagenes: [ {
        type: String
    } ],

    etiquetas: [],

    rating: {
        type: Number,
    },
    reviews: {
        type: Number,
    },
    disponibilidad: {
        type: String
    },

    marca: {
        type: String
    },

    created_at: { type: Date, required: true, default: Date.now },
   
    categoria :{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true },

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    // caracteristicasProducto: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'CaracteristicaProducto',
    //     required: true,
    // }

}, {
    collection: 'productos'
});

module.exports = model('Producto', ProductoSchema);