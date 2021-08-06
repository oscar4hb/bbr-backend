const { Router } = require( 'express' );
const {  getProducto, 
         getProductos,
         getProductosOfUserList, 
         crearProducto, 
         actualizarProducto, 
         borrarProducto } = require( '../controllers/productos' )
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/*
   referencia de Ruta : /api/productos
*/
const router = Router();

const { check } = require( 'express-validator');

router.get('/:id', validarCampos, getProducto );

router.get('/', getProductos );

router.get('/user/list',validarJWT, getProductosOfUserList);

 router.get('/width/:size', getProductos );
 
router.post('/', validarJWT, validarCampos, crearProducto  );
  
router.put('/:id', 
        validarJWT,
        [
         check('titulo', 'El titulo es obligatorio').not().isEmpty(),
         check( 'categoria', 'La categoria es obligatoria' ).not().isEmpty(),
         check( 'subcategoria', 'La Subcategoria es obligatoria' ).not().isEmpty(),
         check( 'codigo', 'El codigo es obligatoria' ).not().isEmpty(),

         validarCampos,
        ],
        actualizarProducto );

 router.put('/final/:id', validarJWT, validarCampos,  actualizarProducto );
 
 router.delete ( '/:id', validarJWT,  borrarProducto );
 



 module.exports = router;