const { response } = require( 'express' );
const Producto = require('../models/producto');

const busquedaAll = async ( req, res = response ) => {

    const ojo = req.params.busqueda;
    const regex = new RegExp( ojo, 'i' );

     const productos = await Producto.find({ nombre: regex });
     const total =  await Producto.countDocuments({ nombre: regex });

    res.json({
        ok: true,
        productos,
        total
    });
    
} 
const busquedaCategoria = async ( req, res = response ) => {
    
    const categoriaB = req.params.categoria;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const resultB = await Producto.find( { nombre: regex} )
                                        .populate('categoria', 'categoria');

  
    res.json({
        ok: true,
        resultB
        
    });
    
} 

module.exports = {
    busquedaAll,
    busquedaCategoria
}