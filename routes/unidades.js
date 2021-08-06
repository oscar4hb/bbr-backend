const { Router } = require( 'express' );
//const { agregarcolor, getColor, deleteColor } = require('../controllers/productos');
const {  getLogitud, 
         postLogitud, 
         deleteLongitud, 
         getPeso,
         postPeso,
         deletePeso, postColor, getColor, deleteColor } = require( '../controllers/unidades' );
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

// Unidad de Peso
router.get('/peso', getPeso );
router.post('/peso', validarJWT, postPeso );
router.delete ('/peso/:id', validarJWT, deletePeso );


// Unidad de color
router.get('/colores', getColor);
router.post('/colores',validarJWT, postColor  );
router.delete ( '/colores/:id',validarJWT, deleteColor );

module.exports = router;