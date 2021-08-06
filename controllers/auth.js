/*
path: 'api/login'
*/

const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
// const { auth0 } = require('../helpers/auth0SingIn');
 
// const { auth } = require('express-openid-connect');
// const express = require( 'express');
// const app = express();

var options = { method: 'POST',
url: 'https://oscar4hb.us.auth0.com/oauth/token',
headers: { 'content-type': 'application/json' },
body: '{"client_id":"Ua7BKO5h2M4zQVWOLcdnh1vGJ3wJM4Dn","client_secret":"OoW-hoZtDva4yMXD5CR-Ufkzuu-soGN7D3T5alrIeoSmbhC0XGpF4agthSk2CPX1","audience":"https://oscar4hb.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };


const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({
            email,
        });

        // verificar Email

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email o contraseña no encontrado ',
            });
        }

        // verificar contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida',
            });
        }

        // Generar token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            msg: 'Se ha ingresado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador',
        });
    }
};

const googleSignIn = async (req, res = response) => {
    // Importante de poner la clave despues del body para obtener solo el codigo
    const googleToken = req.body.token;

    try {
        const { name, family_name, email, picture } = await googleVerify(
            googleToken
        );

        //
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            // Si no existe el usuario
            usuario = new Usuario({
                firstname: name,
                lastname: family_name,
                email,
                password: '@@@',
                img: picture,
                google: true,
            });
        } else {
            // Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar el usuario
        await usuario.save();

        // Generar token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
          
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es valido',
        });
    }
};

const auth0SignIn = async (  req, res = response, ) => {


    const { sub, email, nickname, picture } = req.body;

 

    try {

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            // Si no existe el usuario
            usuario = new Usuario({
                firstname: nickname,
                lastname: 'lastname_Auth0',
                email,
                password: '@@@Auth0',
                img: picture,
                google: false,
                role: 'administrador'
            });
        } else {
            // Existe usuario
            usuario = usuarioDB;
            usuario.google = false;
        }
         // Guardar el usuario
         await usuario.save();

         // Generar token
        const token = await generarJWT(usuarioDB.id);
 
        res.json({
            ok: true,
            token,
       
        });


 
    } catch (error) {
        res.status(401).json({
            ok: false,
            
            error,
        });
    }
};

const renewToken = async (req, res = response) => {
    const uid = req.uid;

    // Generar token
    const token = await generarJWT(uid);

    // Obtener datos del Usuario
    const usuario = await Usuario.findById(uid).populate(
        'usuario ',
        'firstname lastname email phone img google terminos role'
    );

    res.json({
        ok: true,
        token,
        usuario,
    });
};

module.exports = {
    login,
    googleSignIn,
    auth0SignIn,
    renewToken,
};



       //Coneccion de Auth0 y protege todas las rutas

        // const use = app.use(
        //     auth({
        //         issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
        //         baseURL: process.env.AUTH0_BASE_URL,
        //         clientID: process.env.AUTH0_CLIENT_ID,
        //         secret: process.env.SESSION_SECRET,
        //     })
        // );

        //  var request = require("request");
 
    //     var request = require("request");
 
    // request(options, function (error,  body) {
 
    //   if (error) throw new Error(error);

    //   res.json({
    //     ok: true,
    //    // msg: 'Funciona sing auth0',
    //    //  auth,
    //    body
  
//    });

//       console.log(body.body );
//     });



        // var request = require("request");

        // var options = { method: 'GET',
        //   url: 'http://localhost:3010/api/login/auth0',
        //   headers: { authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJjV2htbm1zNFV4T3d6UVJFY1hOMiJ9.eyJpc3MiOiJodHRwczovL29zY2FyNGhiLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJVYTdCS081aDJNNHpRVldPTGNkbmgxdkdKM3dKTTREbkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9vc2NhcjRoYi51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTYyNzM1MjcyMywiZXhwIjoxNjI3NDM5MTIzLCJhenAiOiJVYTdCS081aDJNNHpRVldPTGNkbmgxdkdKM3dKTTREbiIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.fnFhIbiuaDWZlTwPHF_IC978tdgWZGpyNo5njH289eAVLPIitIdWETuU9ce5kBn-BFj67Y6RSyR_3-EqeIVZl3SxJRWP11IKE0wh-fGm7D4EuucMlgnBLzyeT__bJn4TK1VwTSTtl-q1N_cMPG4k2lABrkZYc7fqeYllHpzGW8f0Up15UpvBxnICgeYj8AvBZS0sRY36UF43dvQrJeBZdIxnSMmA6cVvT3XKXG09YQw6g6pQFD8NlPbq52JE6H3zDHlbD3racv69PTr_zBFOfkK0sOuDC3HprMl4emLfwptBwBlK5ZOdan70VqtikMm7f0fahWveMBVGgmRet-cJWg' } };

        // request(options, function (error, response, body) {
        //   if (error) throw new Error(error);

        //   res.status(401).json({
        //       ok: false,
        //       error
        //   })

        // });