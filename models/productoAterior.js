const { Schema, model } = require('mongoose');

const ProductoSchema = Schema(
    {
        // inicio
        titulo: {
            type: String,
            //required: true,
        },
        categoria: {
            type: Schema.Types.ObjectId,
            ref: 'Categoria',
           // required: true
        },

        subcategoria: {
            type: Schema.Types.ObjectId,
            ref: 'Subcategoria',
            //required: true
        },  

        codigo: {
            type: String,
            //required: true
        },

        // primer pagina - información
        informacion: {
            marca: {
                type: String,
               // required: true,
            },

            serie: {
                type: String,
                // required: true,
            },

            colorstandar: {
                type: Schema.Types.ObjectId,
               ref: 'Color',
            },

            peso: {
                peso : { type: String},
                unidad: { type: String}
            },

            volumen: {
                unidad : { type: String},
                ancho : { type: String},
                alto : { type: String},
                largo : { type: String},
            },

            stock: {
                type: String,
            },
        },

        // Segunda pagina - description
        descripcion: {
            descripcion: {
                type: String,
                // required: true
            },
            descripcionResumen: {
                type: String,
                // required: true
            },
        },

        //  Tercera pagina- Precio

        precio: {
            tipoMoneda: {
                type: String,
                // required: true,
            },
            precio: {
                type: Number,
                // required: true,
            },
            oferta: {
                type: Boolean,
                // required: true,
                default: false,
                ofertaProducto: {
                    productoCodigo: {
                        type: String,
                      //  required: true,
                    },
                    lugarOrogen: {
                        type: String,
                     //   required: true,
                    },
                    precioOferta: {
                        type: Number,
                      //  required: true,
                    },
                    FechaInicioOferta: {
                        type: Date,
                      //  required: true,
                    },
                    FechaFinOferta: {
                        type: Date,
                     //   required: true,
                    },
                    FechaInicioDeVenta: {
                        type: Date,
                       //   required: true,
                    },
                },
            },
        },

        /* */

        //  Cuarta pagina -Imagenes
        imgs: {
            principal: {
                type: Schema.Types.ObjectId,
                ref: 'Imagenes',
            },
            segundo: {
                type: Schema.Types.ObjectId,
                ref: 'Imagenes',
            },
            tercero: {
                type: Schema.Types.ObjectId,
                ref: 'Imagenes',
            },
            cuarto: {
                type: Schema.Types.ObjectId,
                ref: 'Imagenes',
            },
            quinto: {
                type: Schema.Types.ObjectId,
                ref: 'Imagenes',
            },
            sexto: {
                type: Schema.Types.ObjectId,
                ref: 'Imagenes',
            },
            septimo: {
                type: Schema.Types.ObjectId,
                ref: 'Imagenes',
            },
        },
        //  Quinta pagina - Variantes
        variantes: {
            existe: {
                type: Boolean,
                default: false,
                //required: true,
            },
            color: [
                {
                    type: String
                },
            ],
        },

        // Sexta pagina  - Palabras claves de busqueda
        envios: {
            reconjoTienda: {
                dispomibilidad: {
                    type: String,
                },
                horarioAtencion:{
                    type: Object
                }
               
            },
            envios: {
                dispomibilidad: {
                    type: String,
                     
                },

                envioCostoGratis:{
                    type: String,
                },

                lugaresDisponibles:{
                    type: String
                },

                departaDisponibles:{
                    type: String
                },
                costoEnvio: {
                    type: String,
                },

                tipoTiempoEnvio: {
                    type: String,

                },

                tiempoDias: {
                    type: String,
                },

                tiempoSemnas: {
                    type: String,
                },

                contraentrega: {

                }
 
            },
       
        },

        video: {
            type: String,
        },
 
        usuario: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
        },
        
        date:{

            type: Date, default: Date.now

        } 
    },
    {
        collection: 'productos',
    }
);

module.exports = model('Producto', ProductoSchema);
