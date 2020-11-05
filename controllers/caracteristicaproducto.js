const CaracteristicaProducto = require('../models/caracteristicaproducto');

const { response } = require( 'express' );



const getCaracteristicaproducto = async ( req, res = response ) => {

        res.json({
            ok: true,
            msg: 'get Caracteristica'
        })

}

const crearCaracteristicaproducto = async ( req, res = response ) => {
    
    const caractpro = new CaracteristicaProducto ( req.body );

    try {
    
        await caractpro.save();
      
          res.json({
                  ok: true,
                  caractpro 
              });
      
      
      } catch (error) {
          res.status(500).json({
              ok: false,
              msg: 'Hubo un error comuniquese con administrador'
          })
          
      }



}

const actualizarCaracteristicaproducto = async ( req, res = response ) => {

}

const borrarCaracteristicaproducto = async ( req, res = response ) => {

}


module.exports = {
    getCaracteristicaproducto,
    crearCaracteristicaproducto,
    actualizarCaracteristicaproducto,
    borrarCaracteristicaproducto

}