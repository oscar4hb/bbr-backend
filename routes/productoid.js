const { Router } = require( 'express' );
const { crearProductId, putProductoId } = require( '../controllers/productoid' );
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/*
   referencia de Ruta : /api/productoid
*/
const router = Router();

const { check } = require( 'express-validator');



router.post('/', validarJWT , crearProductId );

router.put('/:id', 
        validarJWT,  validarCampos , putProductoId );


//  router.delete ( '/:id', validarJWT,  borrarCategoria );

module.exports = router;