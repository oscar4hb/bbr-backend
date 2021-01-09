const { Schema, model } = require('mongoose');

const ComentarioProductoSchema = Schema({


    img: { type: String },
    postTitle: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    date: { type: String },
}, {
    collection: 'ComentarioProducto'
});

module.exports = model('ComentarioProducto', ComentarioProductoSchema);