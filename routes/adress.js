const { Router } = require( 'express' );
const { getAdress, crearAdress, putAdress, deleteAdress, getAdressAll } = require( '../controllers/adress' )
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/*
   referencia de Ruta : /api/adress
*/
const router = Router();

const { check } = require( 'express-validator');


router.get('/:id', validarJWT , getAdress);

router.get('/', validarJWT , getAdressAll);

router.post('/:id', validarJWT, [

   check('address1', 'La dirección principal es obligatorio').not().isEmpty(),
   check('country', 'La dirección principal es obligatorio').not().isEmpty(),
   check('departamento', 'El departamento es obligatorio').not().isEmpty(),
   check('distrito', 'El distrito es obligatorio').not().isEmpty(),
   check('email', 'El email es obligatorio').isEmail(),
   check('phone', 'Telefono es obligatorio').not().isEmpty(),
   validarCampos,
],
crearAdress );

router.put('/' );


 router.delete ( '/' );

module.exports = router;