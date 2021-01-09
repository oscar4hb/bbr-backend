/*
ruta : api/uploads

*/

const { Router } = require( 'express' );
const expressFileUpload = require('express-fileupload');
const { subirFoto, deleteFoto } = require('../controllers/upload');
const { validarJWT } = require( '../middlewares/validar-jwt');


const router = Router();

router.use( expressFileUpload() );

router.post('/:tipo/:id', validarJWT, subirFoto );

router.delete( '/:tipo/:id', validarJWT, deleteFoto );

router.get('/:tipo/:foto',  );


module.exports = router;
