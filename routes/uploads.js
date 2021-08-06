/*
ruta : api/uploads

*/

const { Router } = require( 'express' );
const expressFileUpload = require('express-fileupload');
const { subirFoto, deleteFoto, putFoto } = require('../controllers/upload');
const { validarJWT } = require( '../middlewares/validar-jwt');


const router = Router();

router.use( expressFileUpload() );

router.post('/:tipo', validarJWT, subirFoto );

router.put('/:tipo/:id_img', validarJWT, putFoto );

router.delete( '/:tipo/:id', validarJWT, deleteFoto );

router.get('/:tipo/:foto',  );


module.exports = router;
