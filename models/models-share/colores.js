const { Schema, model } = require('mongoose');

const ColoresSchema = Schema({

    usuario : {
        type: Schema.Types.ObjectId, ref: 'Usuario', required: true 
    },

    color :{
        type: String,
        required: true
    }

}, {
    collection: 'colores'
});

module.exports = model('Color', ColoresSchema );