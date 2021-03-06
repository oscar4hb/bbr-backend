const { Schema, model } = require('mongoose');

const ProductoSchema = Schema(
    {
        // inicio
        titulo: {
            type: String,
            //required: true,
        },
        categoria: {
            type: String,
           // required: true
        },

        subcategoria: {
            type: String,
            //required: true
        },
        
        subcategoriaId:{
    
            type: Schema.Types.ObjectId,
            ref: 'Subcategoria',
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

            color: {
                combinaciones: {  type: Number, },
                colorUno: { type: String, },
                colorDos: { type: String,},
                colorTres: { type: String,},
                colorCuatro: { type: String,},
                colorCinco: {type: String, },

               // colorCinco: { type: Schema.Types.ObjectId,  ref: 'Color' },
       
            },

            peso: {
                peso : { type: Number},
                unidad: { type: String}
            },

            volumen: {
                unidad : { type: String},
                ancho : { type: Number},
                alto : { type: Number},
                largo : { type: Number},
            },

            stock: {
                type: Number,
            },
        },

        // Segunda pagina - description
        descripcion: {
            descripcion: {
                type: String,
                // required: true
            },
            resumen: {
                type: String,
                // required: true
            },
        },

        //  Tercera pagina- Precio

        precio: {
            moneda: {
                type: String,
                // required: true,
            },
            precio: {
                type: Number,
                // required: true,
            },
            oferta: {
                type: Boolean,
                default: false
            },
            ofertaTrue: {
                    codigoProducto: {
                        type: String,
                      //  required: true,
                    },
            
                    precioOferta: {
                        type: Number,
                      //  required: true,
                    },
                    fechaInicio: {
                        type: Date,
                      //  required: true,
                    },
                    fechaFin: {
                        type: Date,
                     //   required: true,
                    },
                    fechaVenta: {
                        type: Date,
                       //   required: true,
                    },
                },
            },
        

        /* */

        //  Cuarta pagina -Imagenes
        imagenes: {
            principal: {
                type: Schema.Types.ObjectId,
                ref: 'Imagenes',
         
            },
            segundo: {
                type: Schema.Types.ObjectId,
                ref: 'Imagenes',
    
            },
            tercero: {
        
                type: Schema.Types.ObjectId ,
                ref: 'Imagenes' ,
                required: false,
            },
            cuarto: {
      
                type: Schema.Types.ObjectId ,
                ref: 'Imagenes' ,
                required: false,
            },
            quinto: {
          
                type: Schema.Types.ObjectId ,
                ref: 'Imagenes' ,
                required: false,
                
            },
            sexto: {
            
                type: Schema.Types.ObjectId ,
                ref: 'Imagenes' ,
                required: false,
            },
            septimo: {
         
                type: Schema.Types.ObjectId ,
                ref: 'Imagenes' ,
                required: false,
            },

            octavo: {
          
                type: Schema.Types.ObjectId,
                ref: 'Imagenes',
                required: false,
            },

            noveno: {
                
                type:  Schema.Types.ObjectId,
                ref: 'Imagenes',
                required: false,
            },


        },
        //  Quinta pagina - Variantes
        variantes: {
            variantes: {
                type: Number,
   
            },
            colorUno: { type: String },
            colorDos: { type: String },
            colorTres: { type: String },
            colorCuatro: { type: String },
            colorCinco: { type: String },
            colorSeis: { type: String },
            colorSiete: { type: String },
            colorOcho: { type: String },
            colorNueve: { type: String },
            colorDiez: { type: String },     
        },

        // Sexta pagina  - Palabras claves de busqueda
        envios: {
            recojoTienda: {
                disponibilidad: {
                    type: Boolean,
                },
                horarioDeAtencion:{
                    type: Object
                }
               
            },
            envios: {
                disponibilidad: {
                    type: Boolean,  
                },

                envioGratisCosto:{
                    type: String,
                },

                lugaresDisponibles:{
                    type: String,
                },

                departamentosDisponibles:[{
                    type: String,
                }],
                costoEnvio: {
                    type: Number,
                },

                tiempoEnvio: {
                    type: String,

                },

                tiempoExacto: {
                    type: Number,
                },

                tiempoRango: {
                    type: String,
                },

                contraentrega: {
                    type: Boolean,
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
