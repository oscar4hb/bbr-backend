const { Router } = require( 'express' );
const { getSubcategoria,  crearSubcategoria,  putSubcategoria, deleteSubcategoria } = require( '../controllers/subcategoria' );
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/*
   referencia de Ruta : /api/categorias
*/
const router = Router();

const { check } = require( 'express-validator');


router.get('/', getSubcategoria);

router.post('/',
                validarJWT,
            [ 
              check('subcategoria', 'La nombre es obligatorio').not().isEmpty(),
              check('categoria', 'El ID de la categoria no es valido').isMongoId(),
              validarCampos,
            ], crearSubcategoria
             );

router.put('/:id', 
         validarJWT,
        [
         check('nombre', 'El nombre de la subcategoria es obligatorio').not().isEmpty(),
        validarCampos,
        ], putSubcategoria
         );


 router.delete ( '/:id', deleteSubcategoria  );

module.exports = router;