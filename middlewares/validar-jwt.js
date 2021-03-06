const validarJWT = ( req, res, next) => {
    const jwt = require('jsonwebtoken' )
// leer el token

// console.log('Token', req.body.headers)
const token = req.header( 'x-token' );


if( !token ) {

    return res.status( 401 ).json({
        ok: false,
        msg: 'No hay token en la pretición'
    })
}

try {

    const { uid } = jwt.verify( token, process.env.JWT_SECRET );
     req.uid = uid;
 
     next();
    
} catch (error) {
    return res.status(401).json({
        ok: false,
        msg: 'Token no valido'
    })
}

}

module.exports = {

    validarJWT
}