const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({

    // inicio
    titulo: {
        type: String,
        required: true,
    },
    // categoria: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Categoria',
    //     required: true
    // },

    subcategoria: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategoria',
        required: true
    },

    codigo: {
        type: String,
        required: true
    },

    // primer pagina - información
    informacion: {
        marca: {
            type: String,
            required: true,
        },

        serie: {
            type: String,
            required: true,
        },

        colorstandar: {
            type: Schema.Types.ObjectId,
            ref: 'Color'
        },

        peso: {
            type: String,
        },

        volumen: {
            type: String,
        },

        stock: {
            type: String,
        },


    },

    // Segunda pagina - description
    descripcion: {
        type: String,
        // required: true

    },

    // descripcionResumen: {
    //     type: String,
    // },

//  Tercera pagina- Oferta

    /* 
    precio : {
        tipoMoneda: {
            type: String,
            required: true,
        },
        precio: {
            type: Number,
            required: true,
        }

    },

    oferta : {
        type : Boolean,
        required: true,
        default: false,
        ofertaProducto : {

            productoCodigo : {
                type: String,
                required: true,
                },
            lugarOrogen: {
                type: String,
                required: true,
            },
            precioOferta: {
                type: Number,
                required: true,
            },
            FechaInicioOferta: {
                type: Date,
                required: true,
            },
            FechaFinOferta: {
                type: Date,
                required: true,
            },
            FechaInicioDeVenta: {
                type: Date,
                required: true,
            }


    }
    },
*/
    
    //  Cuarta pagina -Imagenes
    imgs: {
        principal: {
            type: String,
            // required: true
        },
        segundo: {
            type: String
        },
        tercero: {
            type: String
        },
        cuarto: {
            type: String
        },
        quinto: {
            type: String
        },
        sexto: {
            type: String
        },
        septimo: {
            type: String
        },
        octavo: {
            type: String
        },
        noveno: {
            type: String
        },
    },
  //  Quinta pagina - Variantes
    variantes: {
        existe: {
            type: Boolean,
            default: false,
            required: true,
        },
        color: [{
                type: Schema.Types.ObjectId,
                ref: 'Color'
            }

        ],

    },


// Sexta pagina  - Palabras claves de busqueda
    etiquetas: {
        primero: {
            type: String
        },
        segundo: {
            type: String
        },
        tercero: {
            type: String
        },
        cuarto: {
            type: String
        },
        quinto: {
            type: String
        },

    },


    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },



    rating: {
        type: Number,
    },
    reviews: {
        type: Number,
    },


    comentario: [{
        type: Schema.Types.ObjectId,
        ref: 'ComentarioProducto',
    }],


    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    costEnvLocal: {
        type: String
    },

}, {
    collection: 'productos'
});

module.exports = model('Producto', ProductoSchema);