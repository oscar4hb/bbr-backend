/*
path: 'api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {
    login,
    googleSignIn,
    renewToken,
    auth0SignIn,
} = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    login
);

router.post(
    '/google',
    [check('token', 'El token es obligatorio').not().isEmpty(),
     validarCampos],
    googleSignIn
);
    
router.post(
    '/auth0',
    [check('sub', 'El sub es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(), 
    validarCampos],
    auth0SignIn
);

router.get('/renew', validarJWT, renewToken);

module.exports = router;
