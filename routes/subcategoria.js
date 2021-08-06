const { Router } = require( 'express' );
const { getSubcategorias,  
        postSubcategoria,  
        putSubcategoria, 
        deleteSubcategoria, 
        getSubcategoria } = require( '../controllers/subcategoria' );
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/*
   referencia de Ruta : /api/subcategorias
*/
const router = Router();

const { check } = require( 'express-validator');



router.get('/:id', getSubcategoria);

router.get('/', getSubcategorias);

router.post('/',
                validarJWT,
            [ 
              check('subcategoria', 'La nombre es obligatorio').not().isEmpty(),
              check('categoria', 'El ID de la categoria no es valido').isMongoId(),
              validarCampos,
            ], postSubcategoria
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