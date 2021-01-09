const { Router } = require( 'express' );
const { getAlbum, listarAlbuem, createAlbum, putAlbum, deleteAlbum } = require( '../controllers/album' );
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

/*
   referencia de Ruta : /api/album
*/

const router = Router();


router.get('/listar', listarAlbuem );  // Listas Albunes


router.get('/',validarJWT, getAlbum ); //ver album


const { check } = require( 'express-validator');

// Crear albune
router.post('/', 
                  validarJWT,
                  [ 
                  check('nombreAlbum', 'El nombre del album es olbligatorio').not().isEmpty(),
                  validarCampos,
                  ], 
                  
                   createAlbum  );

// Crear albunee
router.put('/', validarJWT, putAlbum   );

// Eliminar album
router.delete ( '/', validarJWT, deleteAlbum);

module.exports = router;