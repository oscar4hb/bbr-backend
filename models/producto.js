const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({

// primer pagina 
    titulo: {
        type: String,
        required: true,
            },

    codigo : {  
                type: String,
                required: true 
            },

    subcategoria :{
        type: Schema.Types.ObjectId,
        ref: 'Subcategoria',
        required: true 
    },

// Segunda pagina
    
    informacion : {
        marca: {
            type: String,
            required: true,
        },

        serie : {
            type: String,
            required: true,
        },

        colorstandar : {
            type: Schema.Types.ObjectId,
            ref: 'Color'
        },

        peso : {
            type: String,
        },

        volumen : {
            type: String,
        },

        stock : {
            type: String,
        },


    },

// Tercera pagina

    variantes : {
             existe : { type: Boolean,
                        default: false,
                        required: true,
                        },
             color : [
                 {  type: Schema.Types.ObjectId,
                    ref: 'Color'}
                     
                    ],

        
            },
// Cuarta pagina 
    imgs : {
            principal: { 
                type : String, 
               // required: true
             },
            segundo: { type : String },
            tercero: { type : String },
            cuarto: { type : String },
            quinto: { type : String },
            sexto: { type : String },
            septimo: { type : String },
            octavo: { type : String },
            noveno: { type : String },
            },
// quinta pagina
    descripcion : {

                type: String,
               // required: true
        
    },
    
    etiquetas : {
        primero: { type : String },
        segundo: { type : String },
        tercero: { type : String },
        cuarto: { type : String },
        quinto: { type : String },

    },
    created_at: { type: Date, required: true, default: Date.now },

// otras paginas

    rating: {
        type: Number,
    },
    reviews: {
        type: Number,
    },


    comentario :[{
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