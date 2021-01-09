const { Schema, model } = require('mongoose');

const ColoresSchema = Schema({


    color :{
        type: String,
        required: true
    }

}, {
    collection: 'colores'
});

module.exports = model('Color', ColoresSchema );