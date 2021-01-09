const { Schema, model } = require ( 'mongoose' );


const UsuarioSchema = Schema ( {
    firstname: {
            type: String,
            required: true,
    },
    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    phone: {
        type: String,

    },
    img: {
        type: String,

    },

    google: {
        type: Boolean,
        default: false
    },

    countsesion: { type : Number},
    
    terminos: {
        type: Boolean
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
} );

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Usuario', UsuarioSchema );