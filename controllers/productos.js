const { response } = require( 'express' );
const Producto = require('../models/producto');
const Color = require('../models/models-share/colores');




const getProducto = async ( req, res = response ) => {


    const id = req.params.id;

    try {
        const producto = await Producto.findById( id );

        if ( !producto ) {
    
            console.log('No existe');
            res.json( {
                ok: true,
                msg: 'Producto no encontrado por ID',
            })
        }
      
    res.status(200).json({
           producto,
    });
        
    } catch (error) {
        
    }

}

const getProductos = async ( req, res = response ) => {


    const desde = Number(req.query.desde) || 0;

    const [ productos, total ] = await Promise.all([
     Producto
            .find({},{__v: 0 })
            .populate('usuario', 'nombre email')
            //.populate('subcategoria', 'subcategoria')
            .populate({path:'informacion', populate:{ path:'colorstandar', select:'color'}})
            .populate({path:'variantes', populate:{ path:'color', select: [] }})
            .populate({path:'subcategoria', populate:{ path:'categoria', select:'categoriaNombre'}, 
                                            //populate:{ path: 'usuario', select: 1 } // muestra todo los datos del usuario del Creador de subcategoria
                                        })
            .skip( desde )
            .limit( 10 ),

     Producto.countDocuments()

    ]);

    /**
     Project.find(query).populate({ path: 'pages', 
                                 populate:{ path: 'components', model: 'Component' } }) 
                                .exec(function(err, docs) {});
     */

    res.json({
            ok: true,
            productos,
            total
        });
}


const crearProducto = async ( req, res = response ) => {

    const uid = req.uid;
 
try {
    
    const cuerpoProducto = new Producto ({ usuario: uid  , ...req.body });
    const productoDB = await cuerpoProducto.save();
   
    res.json( {
            ok: true,
            productoDB
        } )
   


} catch (error) {
    res.status(500).json({
        ok: false,
        msg: 'Hubo un error comuniquese con administrador'
    })
    
}


}

const actualizarProducto =  async ( req, res = response ) => {

const id = req.params.id;
const uid = req.uid;    
try {

    const producto = await Producto.findById( id );
    
    if ( !producto ) {
        res.status(404).json( {
            ok: true,
            msg: 'Producto no encontrado por ID',
        })

    }

    const cambioProducto = {
        ...req.body,
        usuario: uid
    }

    const productoActualizado = await Producto.findByIdAndUpdate( id, cambioProducto, { new: true } );


    res.json( {
            ok: true,
            msg: 'actualizar Producto',
            productoActualizado
        })
    
} catch (error) {
    
    res.status(500).json({
        ok: false,
        msg: 'No se actualizo favor comuniquese con el administrador'
    })

}


}

const borrarProducto = async ( req, res = response ) => {

    const id = req.params.id;

       
    try {
    
        const producto = await Producto.findById( id );


        if ( !producto ) {
            res.status(404).json( {
                ok: true,
                msg: 'Producto no encontrado por ID',
            })
    
        }
    
  
    
        await Producto.findByIdAndDelete( id );
    
    
        res.json( {
                ok: true,
                msg: 'Producto Eliminado',

            })
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'No se elimino favor comuniquese con el administrador'
        })
    
    }
    
}

const agregarcolor = async (req, res = response) => {

    const { color } = req.body

    const colorDB = await Color.findOne( {color}, {_id: 0} );

    if (colorDB) {

        return res.status(500).json({
            ok: false,
            msg: `El color: ${colorDB.color} ya existe`
        })

    } else {
            const colorNuevo = new Color({ color });
            await colorNuevo.save();
    
        res.json({
            ok: true,
            msg: `El color ha sido agregado ${colorNuevo.color}`
        })
 
    }




}

const deleteColor = async ( req, res = response ) => {

    const { color } = req.body;

    const colorExiste = await Color.findOne({color});

    if ( !colorExiste ) {
        return res.status(500).json({
            ok: false,
            msg: `El color: ${ color } no existe`
        })
    } else {
        await Color.findOneAndDelete({color});
        
        res.json({
            ok: true,
            msg: `Se elimino el colo ${ color } `
        })

    }



}

module.exports = {
    getProducto,
    getProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto,
    agregarcolor,
    deleteColor
};