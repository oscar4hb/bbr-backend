const AuthenticationClient = require('auth0'). AuthenticationClient;
const {  auth } = require('express-openid-connect')

//conexion con Auth0
const auth0 = new AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    secret: process.env.AUTH0_CLIENT_SECRET,
 
  } );





module.exports ={
     auth0,
 
}