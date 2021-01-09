const { Schema, model } = require('mongoose');


const OrderSchema = Schema({
    codigoCompra: {
        type: Number,
        required: true,
            },

    producto :{
                type: Schema.Types.ObjectId,
                ref: 'Producto',
                required: true },


    fechadeOrden: {
        type: String,
        required: true
    },

    precio: { type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true },

    statusEnvio: {
        type: String,
        required: true,
    },

    imgs: {
        type: String
    },

    cantidad : { type: Number},

    costototal: {
        type: String,
    },
    reviews: {
        type: Number,
    },
    disponibilidad: {
        type: String
    },


    stuatusProducto: {
        type: String
    },

    direccion: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },


}, {
    collection: 'Pedido'
});

module.exports = model('Pedido', OrderSchema);