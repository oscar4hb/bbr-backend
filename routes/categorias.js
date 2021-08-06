const { Router } = require( 'express' );
const { getCategorias, 
        getCategoria, 
        postCategoria, 
        editCategoria, 
        deleteCategoria } = require( '../controllers/categorias' );
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
            ],postCategoria
             );

router.put('/:id', 
        validarJWT,
        [
         check('categoriaNombre', 'La categoría es obligatorio').not().isEmpty(),
         validarCampos,
        ],
        editCategoria );


 router.delete ( '/:id', validarJWT,  deleteCategoria );

module.exports = router;