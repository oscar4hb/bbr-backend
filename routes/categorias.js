const { Router } = require( 'express' );
const { getCategorias, getCategoria, crearCategoria, actualizarCategoria, borrarCategoria } = require( '../controllers/categorias' );
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/*
   referencia de Ruta : /api/categorias
*/
const router = Router();

const { check } = require( 'express-validator');


router.get('/:id',  getCategoria );

router.get('/',  getCategorias );

router.post('/',
            validarJWT,
            [ 
              check('categoriaNombre', 'La nombre de la categoria es obligatorio').not().isEmpty(),
           
              validarCampos,
            ],crearCategoria
             );

router.put('/:id', 
        validarJWT,
        [
         check('categoria', 'La categoría es obligatorio').not().isEmpty(),
         validarCampos,
        ],
        actualizarCategoria );


 router.delete ( '/:id', validarJWT,  borrarCategoria );

module.exports = router;