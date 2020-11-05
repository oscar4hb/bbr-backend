const { Router } = require( 'express' );
const {     getCaracteristicaproducto, 
            crearCaracteristicaproducto, 
            actualizarCaracteristicaproducto, 
            borrarCaracteristicaproducto } = require( '../controllers/caracteristicaproducto' );

/*
   referencia de Ruta : /api/caracteristicaproducto
*/
const router = Router();



router.get('/',  getCaracteristicaproducto );

router.post('/',[],  crearCaracteristicaproducto);

router.put('/:id',  [], actualizarCaracteristicaproducto );


 router.delete ( '/:id',  borrarCaracteristicaproducto );

module.exports = router;