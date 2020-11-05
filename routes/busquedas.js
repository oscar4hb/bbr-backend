const { Router } = require( 'express' );
const { busquedaAll, busquedaCategoria } = require( '../controllers/busqueda' )
const router = Router();

router.get('/:busqueda', busquedaAll );

router.get('/categoria/:categoria/:busqueda', busquedaCategoria );


module.exports = router;