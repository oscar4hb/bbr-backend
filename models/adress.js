const { Schema, model } = require('mongoose');

const AddressSchema = Schema({

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },  
    address1: { type: String, required : true  },
    address2:{ type: String },
    country: { type: String, required : true  },
    departamento: { type: String, required : true  },
    distrito: { type: String, required : true  },
    postcode: { type: String },
    email: { type: String , required : true },
    phone: { type: String , required : true},
 

}, {
    collection: 'addressUser'
});

module.exports = model('Address', AddressSchema );