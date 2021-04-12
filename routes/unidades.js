const { Router } = require( 'express' );
const {  getLogitud, 
         postLogitud, 
         deleteLongitud, 
         getPeso,
         postPeso,
         deletePeso } = require( '../controllers/unidades' );
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/*
   referencia de Ruta : /api/unidades
*/
const router = Router();

// const { check } = require( 'express-validator');

// Obtener unidades de longitud
router.get('/longitud', getLogitud );

router.post('/longitud', validarJWT, postLogitud );

router.delete ( '/longitud/:id', validarJWT, deleteLongitud );


router.get('/peso', getPeso );
router.post('/peso', validarJWT, postPeso );
router.delete ('/peso/:id', validarJWT, deletePeso );

module.exports = router;