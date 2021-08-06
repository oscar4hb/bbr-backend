const { Schema, model } = require('mongoose');

const CarouselSchema = Schema(
    {
        desktopImage: {
            type: String,
            default: null
        },

        mobileImage: {
            type: String,
            default:null
        },

        title: {
            type: String,
            required
        },
        details: {
            type: String,
            required
        },

        url: {
            type: String,
            required
        },

        offer: {
            type: String,
        },

        sequence: {

            type: String,
            required
        },

        buttonLabel:{
            type: String
        },

        status:{
            type: String,
            default: 'ACTIVO',
            required
        },

        created: {type: Date, default: Date.now},

        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
        },
    },
    {
        collection: 'carousels',
    }
);

module.exports = model( 'Carousel', CarouselSchema );
