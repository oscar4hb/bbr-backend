/*
ruta : api/uploads/productos

*/

const multer = require( 'multer');
const { Router } = require( 'express' );
const { filesProduct, retornaImagenProduct } = require('../controllers/upload-productos');
const storage = require('../controllers/upload-productos')
const { validarJWT } = require( '../middlewares/validar-jwt');



const router = Router();



router.put('/imagen/:id', validarJWT,
            [ 
               multer(storage).array('imagenes',4)
            ], filesProduct 
                         );
router.get('/imagen/:foto',  retornaImagenProduct );

module.exports = router;
