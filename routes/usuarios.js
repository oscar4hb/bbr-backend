const { Router } = require( 'express' );
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require( '../controllers/usuarios' )
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/*
   referencia de Ruta : /api/usuarios
*/
const router = Router();
const { check } = require( 'express-validator');


router.get('/', validarJWT, getUsuarios );

router.post('/',
            
            [ 
              check('firstname', 'El nombre es obligatorio').not().isEmpty(),
              check('lastname', 'Los apellidos son obligatorios').not().isEmpty(),
              check('email', 'El Email es obligatorio').isEmail(),
              check('password', 'El password es obligatorio').not().isEmpty(),
              validarCampos,
            ],
            crearUsuarios );

router.put('/:id', 
        validarJWT,
        [
         check('firstname', 'El nombre es obligatorio').not().isEmpty(),
         check('email', 'El Email es obligatorio').isEmail(),
         check('role', 'El rol es abligatorio').not().isEmpty(),
         validarCampos,  
        ],
        actualizarUsuario );


 router.delete ( '/:id', validarJWT, borrarUsuario );

module.exports = router;