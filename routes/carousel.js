const { Router, response } = require( 'express' );
const { getCarousels, postCarousel, getCarousel, editCarousel, deleteCarousel } = require('../controllers/carousel');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/*
   referencia de Ruta : /api/carousel
*/
const router = Router();

const { check } = require( 'express-validator');


router.get('/:id',  getCarousel );

router.get('/', getCarousels );

router.post('/', postCarousel  );

router.put('/:id', editCarousel
         );


 router.delete ( '/:id', validarJWT, deleteCarousel       );

module.exports = router;