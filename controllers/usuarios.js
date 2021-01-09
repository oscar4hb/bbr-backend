const Usuario = require( '../models/usuario' )
const { response } = require ( 'express' );
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ usuario, total ] = await Promise.all([
     Usuario
            .find({}, 'firstname lastname email phone img google terminos role ')
            .skip( desde )
            .limit( 5 ),

     Usuario.countDocuments()
  
]);

    res.json({
        ok: true, 
        usuario,
        total
    })

}

const crearUsuarios = async (req, res = response) => {

    const { password, email } =  req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: ' El correo ya está registrado'
            });
        }
    
        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        // Guardar usuario
        await usuario.save();

        // Generar token 
        const token = await generarJWT( usuario.id );

 
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });

    }


}

const actualizarUsuario = async ( req, res = response ) => {
        //TODO validat token y comprobar usuario correcto

    const uid = req.params.id;


    try {

        const usuarioBD = await Usuario.findById( uid );
   

        if( !usuarioBD ) {
            return res.status(404).json(        
                {
                    ok: false,
                    msg: 'no se encontro id'
                }
            )
        }
       // Actualizar de campos -- no tomara en cuenta el google
    
        const { password, google, email, ...campos } = req.body;
    
        if( usuarioBD.email !== email ) {

            const existeEmail = await Usuario.findOne( { email } );
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya esta registrado el Email'
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        } )

    }catch (error) {

        res.status(500).json( {
            ok: false,
            msg: 'Error inespedaro'
        })
    }
}  

const borrarUsuario = async ( req, res = response )  => {
    const uid = req.params.id;


try {
    const usuarioBD = await Usuario.findById( uid );
    if ( !usuarioBD ) {

        return res.status(404).json(
            {
                ok: false,
                msg: 'No existe el usuario'
            }
        )}

    await Usuario.findByIdAndDelete( uid );       
        res.json({
            ok: true,
            msg: ' Usuario eliminado'
        })

} catch (error) {
    console.log(error);
    res.status(500).json({ 
        ok: false,
        msg: 'No se ha podido eliminar el usuario'
    })
}


}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}