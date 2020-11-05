const path = require('path');
const { response } = require( 'express' );
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require('../helpers/update-img');
const fs = require('fs');

const fileUpload = ( req, res= response ) => {


    const tipo = req.params.tipo;
    const id = req.params.id;

    const tipoValidos = [ 'usuarios', 'categorias' ];

    if( !tipoValidos.includes(tipo) ) {

        return res.status(400).json({
            ok:false,
            msg: 'No pertenece algun seleccion'
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg:'No se recibio ningun archivo'
        })
      }

      // procesar la imagen 
      const file = req.files.imagen;
      
      const nombreCortado = file.name.split('.');
      const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

      //Validacion de extensión 
      const extensionValida = [ 'png', 'jpg', 'jpeg', 'gif' ];
      if ( !extensionValida.includes( extensionArchivo ) ) {
          return res.status(400).json({
              ok: false,
              msg: 'No es una extensión valida'
          });
      }

      //Generar el nombre del archivo
      const nombreArchivo = `${ uuidv4()  }.${ extensionArchivo }`

      //path para mover la imagen
      const path = `./uploads/${ tipo }/${ nombreArchivo }`;

      //Mover la imagen

      file.mv( path, (err) => {
          if(err) {
              console.log(err);
              return res.status(500).json({
                  ok: false,
                  msg: 'No se movio el file'
              });
          }

      // Actualizar base de datos

      updateImg( tipo, id, nombreArchivo );

          res.json({
              ok: true,
              msg: 'File subido',
              nombreArchivo
          });
      } )


}

const retornaImagen =  ( req, res ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );


    //Imagen por defecto
    if( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../assets/img/no-img.jpg`);
        res.sendFile( pathImg );
    }

}


module.exports = {

    fileUpload,
    retornaImagen
}