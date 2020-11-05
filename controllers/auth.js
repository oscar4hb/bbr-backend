/*
path: 'api/login'
*/

const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const usuario = require("../models/usuario");


const login = async (req, res = response) => {

    const { email, password  } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({
            email
        });

        // verificar Email

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email o contraseña no encontrado '
            })
        }

        // verificar contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar token 
        const token = await generarJWT( usuarioDB.id );
        
        res.json({
            ok: true,
            token,  
            msg: 'Se ha ingresado'
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
}

const googleSignIn = async( req, res = response ) => {

    // Importante de poner la clave despues del body para obtener solo el codigo
    const googleToken = req.body.token;
 console.log(googleToken)
    try {
        
        const { name, family_name, email, picture } = await googleVerify( googleToken );

        //
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if( !usuarioDB ){
            // Si no existe el usuario 
            usuario = new Usuario({
                firstname: name,
                lastname: family_name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }


        // Guardar el usuario
        await usuario.save();

        // Generar token 
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
      
        });

    } catch (error) {
        
        res.status(401).json({
            ok: false,
            msg:'Token no es valido'
        });
    
    }


}

const renewToken = async ( req, res= response ) => {
    
    const uid = req.uid;

    // Generar token 
    const token = await generarJWT(uid);
    
    // Obtener datos del Usuario
    const usuario = await Usuario.findById(uid)
                    .populate( 'usuario ', 'firstname lastname email img role google')
   

    res.json({
        ok: true,
        token,
        usuario

    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}