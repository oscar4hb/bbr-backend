
const { response } = require( 'express' );
const { v4: uuidv4 } = require('uuid');
const { upgradeImg , upgradeDeleteImg } = require('../helpers/upgrade-img');
const AWS = require('aws-sdk');
const {  s3 } = require("../aws/acceso.aws");


// tambien sierve para el PUT o actualizar
const subirFoto = async ( req, res= response ) => {
    
    const { orden } = req.body;
    


    const tipo = req.params.tipo;
    const id = req.params.id;

    // Evaluar imagen 
    const tipoValidos = [ 'usuarios', 'categorias', 'producto' ];

    if( !tipoValidos.includes(tipo) ) {

        return res.status(400).json({
            ok:false,
            msg: ` ${tipo} no pertenece ninguna carpeta de almacenamiento`
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
      const extensionValida = [ 'png', 'jpg', 'jpeg', 'gif', 'JPG' ];
      if ( !extensionValida.includes( extensionArchivo ) ) {
          return res.status(400).json({
              ok: false,
              msg: 'No es una extensión valida'
          });
      }

      //Generar el nombre del archivo
      const nombreArchivo = `${ uuidv4()  }.${ extensionArchivo }`


        // Almacenar imagen en AWS S3

        AWS.config.update({
         
            accessKeyId: process.env.AWS_ACCESS_KEY, 
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        })

        let albumPhotosKey = encodeURIComponent(tipo) + "/";

        let photoKey = albumPhotosKey + nombreArchivo;
    
        const upload = new AWS.S3.ManagedUpload({
            params:  {
    
                    Bucket: process.env.AWS_NAME_BUCKET,
                    Key: photoKey,
                    Body: file.data,
                    ACL: "public-read",


             }
        });

        const promise =  upload.promise();

        promise.then( (data) => {

            return res.json({
                ok: true,
                msg: `Successfull uploaded photo on ${tipo}`,
                data
            })
             // viewAlbum(albumName);
        },
             
            (err) =>  {
                return res.json({  
                    ok: false,
                    err   })           
              }         
            )

            urlImagen = (await promise).Location;
    
            upgradeImg ( tipo, id, urlImagen, orden )

        }
const deleteFoto = async (req, res = response) => {
 

            // Evaluar el nombre de la ruta de la imagen
            const albumName = req.params.tipo;
            const id = req.params.id;   
            const { photoKey } = req.body;
           
            if (!photoKey ) {
                return res.json({
                    ok: false,
                    msg: 'La foto no existe o ya fue eliminado'
                })
            }
 
            const deletePhoto = (albumName, photoKey) => {
                s3.deleteObject({ Key: photoKey }, (err, data) => {
        
                  if (err) {
                    return console.log("There was an error deleting your photo: ", err.message);
                  }
                  console.log("Successfully deleted photo.");
                  res.json({
                    ok: true,
                    msg: `Foto: ${photoKey} fue eliminado `
                })
                
                });
        
                // viewAlbum(albumName);
              }
        
              deletePhoto(albumName, photoKey );
              upgradeDeleteImg ( albumName, id)
        
        }


module.exports = {

    subirFoto,
    deleteFoto
}