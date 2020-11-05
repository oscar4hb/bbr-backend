const { response } = require( 'express' );
const Producto = require('../models/producto');



const getProductos = async ( req, res = response ) => {
    // const uid = req.uid;
    // console.log(uid)
    // const productos = await Producto.find().populate('usuario', 'nombre email');

    const desde = Number(req.query.desde) || 0;

    const [ productos, total ] = await Promise.all([
     Producto
            .find()
            .populate('usuario', 'nombre email')
            .populate('categoria', 'categoria')
            .skip( desde )
            .limit( 10 ),

     Producto.countDocuments()

    ]);

    

    res.json({
            ok: true,
            productos,
            total
        });
}


const crearProducto = async ( req, res = response ) => {

    const uid = req.uid;

    const cuerpoProducto = new Producto ({ usuario: uid  , ...req.body });


try {
    

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

module.exports = {

    getProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto,
};