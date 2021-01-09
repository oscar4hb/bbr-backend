const { Schema, model } = require('mongoose');

const SlidesSchema = Schema({
   
    titilo: {
        type: String,
        required: true,
            },

    descripcion: {
        type: String,
        required: true,
            },
    precio: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    oferta: {
        type: String
    },
    nuevoprecio: {
        type: Number
    } ,

    created_at: { type: Date, required: true, default: Date.now },
   
    producto :{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true },

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },


}, {
    collection: 'slides'
});

module.exports = model('Slides', SlidesSchema );