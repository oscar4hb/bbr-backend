const { Router } = require( 'express' );
const { getProductos, crearProducto, actualizarProducto, borrarProducto, agregarcolor } = require( '../controllers/productos' )
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/*
   referencia de Ruta : /api/productos
*/
const router = Router();

const { check } = require( 'express-validator');


router.get('/',  getProductos );


router.post('/color',validarJWT, agregarcolor  )
router.post('/',
            validarJWT,
            [ 
              check('titulo', 'El titulo es obligatorio').not().isEmpty(),
              check('subcategoria', 'El id de subcategoria debe ser valido').isMongoId(),
              
              validarCampos,
            ],
            crearProducto );

router.put('/:id', 
        validarJWT,
        [
         check('nombre', 'El nombre es obligatorio').not().isEmpty(),
         validarCampos,
        ],
        actualizarProducto );


 router.delete ( '/:id', validarJWT,  borrarProducto );

module.exports = router;