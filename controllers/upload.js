const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { upgradeImg, upgradeDeleteImg } = require('../helpers/upgrade-img');
const {
    funcQuality1,
    funcQuality2,
    funcQuality3,
    funcQuality4,
    funcQuality5,
    funcQuality6,
    funcQuality7,
} = require('../helpers/sharp-img');
const { upImgModel } = require('../helpers/upImg-mongo');
const AWS = require('aws-sdk');
const { s3 } = require('../aws/acceso.aws');
const { ordenarImg } = require('../helpers/ordenarImg');
const Producto = require('../models/producto');
const Imagenes = require('../models/imagenes/imagenes');
const ObjectID = require('mongodb').ObjectID;

// Get Imagenes

const getFoto = async (req, res = response) => {};

// tambien sierve para el PUT o actualizar
const subirFoto = async (req, res = response) => {
    const { orden } = req.body;
    const tipo = req.params.tipo;
    //const id = req.params.id;

    //const producto = await Producto.findById(id);

    // if (!producto) {
    //     res.json({
    //         ok: true,
    //         msg: 'Producto no encontrado por ID',
    //     });
    // }

    //Validacion de extensión
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    const extensionValida = ['png', 'jpg', 'jpeg', 'gif', 'JPG', 'JPEG', 'webp'];
    if (!extensionValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Tipo de archivo no valido',
        });
    }

    // Evaluar imagen
    const tipoValidos = ['usuarios', 'categorias', 'producto'];

    if (!tipoValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: ` ${tipo} no pertenece ninguna carpeta de almacenamiento`,
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No cargo la imagen',
        });
    }

    // Almacenar imagen en AWS S3 - Acceso
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    // Sharp clone y reduce tamaño
    const resizedImage1 = funcQuality1(file);
    const resizedImage2 = funcQuality2(file);
    const resizedImage3 = funcQuality3(file);
    const resizedImage4 = funcQuality4(file);
    const resizedImage5 = funcQuality5(file);
    const resizedImage6 = funcQuality6(file);
    const resizedImage7 = funcQuality7(file);

    //Generar el nombre del archivo
    // const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    const nombreArchivo1 = `${uuidv4()}.${resizedImage1.options.formatOut}`;
    const nombreArchivo2 = `${uuidv4()}.${resizedImage2.options.formatOut}`;
    const nombreArchivo3 = `${uuidv4()}.${resizedImage3.options.formatOut}`;
    const nombreArchivo4 = `${uuidv4()}.${resizedImage4.options.formatOut}`;
    const nombreArchivo5 = `${uuidv4()}.${resizedImage5.options.formatOut}`;
    const nombreArchivo6 = `${uuidv4()}.${resizedImage6.options.formatOut}`;
    const nombreArchivo7 = `${uuidv4()}.${resizedImage7.options.formatOut}`;

    let albumPhotosKey = encodeURIComponent(tipo) + '/';
    let photoKey1 = albumPhotosKey + nombreArchivo1;
    let photoKey2 = albumPhotosKey + nombreArchivo2;
    let photoKey3 = albumPhotosKey + nombreArchivo3;
    let photoKey4 = albumPhotosKey + nombreArchivo4;
    let photoKey5 = albumPhotosKey + nombreArchivo5;
    let photoKey6 = albumPhotosKey + nombreArchivo6;
    let photoKey7 = albumPhotosKey + nombreArchivo7;

    console.log(photoKey1);

    const upload1 = new AWS.S3.ManagedUpload({
        params: {
            Bucket: process.env.AWS_NAME_BUCKET,
            Key: photoKey1,
            Body: resizedImage1,
            ACL: 'public-read',
        },
    });
    const upload2 = new AWS.S3.ManagedUpload({
        params: {
            Bucket: process.env.AWS_NAME_BUCKET,
            Key: photoKey2,
            Body: resizedImage2,
            ACL: 'public-read',
        },
    });
    const upload3 = new AWS.S3.ManagedUpload({
        params: {
            Bucket: process.env.AWS_NAME_BUCKET,
            Key: photoKey3,
            Body: resizedImage3,
            ACL: 'public-read',
        },
    });
    const upload4 = new AWS.S3.ManagedUpload({
        params: {
            Bucket: process.env.AWS_NAME_BUCKET,
            Key: photoKey4,
            Body: resizedImage4,
            ACL: 'public-read',
        },
    });
    const upload5 = new AWS.S3.ManagedUpload({
        params: {
            Bucket: process.env.AWS_NAME_BUCKET,
            Key: photoKey5,
            Body: resizedImage5,
            ACL: 'public-read',
        },
    });
    const upload6 = new AWS.S3.ManagedUpload({
        params: {
            Bucket: process.env.AWS_NAME_BUCKET,
            Key: photoKey6,
            Body: resizedImage6,
            ACL: 'public-read',
        },
    });
    const upload7 = new AWS.S3.ManagedUpload({
        params: {
            Bucket: process.env.AWS_NAME_BUCKET,
            Key: photoKey7,
            Body: resizedImage7,
            ACL: 'public-read',
        },
    });

    const promise1 = upload1.promise();
    const promise2 = upload2.promise();
    const promise3 = upload3.promise();
    const promise4 = upload4.promise();
    const promise5 = upload5.promise();
    const promise6 = upload6.promise();
    const promise7 = upload7.promise();

    // Url de la img en s3
    urlImagen1 = (await promise1).Location;
    urlImagen2 = (await promise2).Location;
    urlImagen3 = (await promise3).Location;
    urlImagen4 = (await promise4).Location;
    urlImagen5 = (await promise5).Location;
    urlImagen6 = (await promise6).Location;
    urlImagen7 = (await promise7).Location;

    try {
        if (
            urlImagen1 &&
            urlImagen2 &&
            urlImagen3 &&
            urlImagen4 &&
            urlImagen5 &&
            urlImagen6 &&
            urlImagen7
        ) {
            const id_img = await upImgModel(
                urlImagen1,
                urlImagen2,
                urlImagen3,
                urlImagen4,
                urlImagen5,
                urlImagen6,
                urlImagen7
            );

            res.json({
                ok: true,
                msg: `La ${orden} imagen ha sido subido correctamente`,
                urlImagen1,
                urlImagen2,
                urlImagen3,
                urlImagen4,
                urlImagen5,
                urlImagen6,
                urlImagen7,

                id_img,
            });
        }
    } catch (error) {
        res.status(408).json({
            ok: false,
            msg: 'Algo solió mal, favor de volver a cargar la imagen',
            error,
        });
    }

    // Esta funcion add al producto id
    // upgradeImg(tipo, id, urlImagen1,orden, id_img);
};

const deleteFoto = async (req, res = response) => {
    // Evaluar el nombre de la ruta de la imagen
    //const albumName = req.params.tipo;

    let id_imagen = '';
 

    if (ObjectID.isValid(req)) {
         id_imagen = req;
     
    } else {
         id_imagen = req.params.id;
 
         console.log('Esto no funciono!! bien')
    }

    if (!id_imagen) {
        return res.status(303).json({
            msg: 'No hay id'
        });
    }

    const imgDB = await Imagenes.findById(id_imagen);
 
    if (!imgDB) {
        console.log('No se encontró la imagen  por ID')
    }

    await Promise.all([
        imgDB.quality1.substr(54, 103),
        imgDB.quality2.substr(54, 103),
        imgDB.quality3.substr(54, 103),
        imgDB.quality4.substr(54, 103),
        imgDB.quality5.substr(54, 103),
        imgDB.quality6.substr(54, 103),
        imgDB.quality7.substr(54, 103),
    ])
        .then(
            ([
                photoKey1,
                photoKey2,
                photoKey3,
                photoKey4,
                photoKey5,
                photoKey6,
                photoKey7,
                
            ]) => {
                console.log('fdf',photoKey1,'fdf');
                // El photoKey debe ser del tipo: producto/baee660a-aa30-47fe-a716-39c8faf26831.webp
                // const deletePhoto = (albumName, photoKey1) => {
                s3.deleteObject({ Key: photoKey1 }, (err, data) => {
                    if (err) {
                        return console.log(
                            'There was an error deleting your photo: ',
                            err.message
                        );
                    }
                    console.log('Successfully deleted photo.', photoKey1);
                });

                s3.deleteObject({ Key: photoKey2 }, (err, data) => {
                    if (err) {
                        return console.log(
                            'There was an error deleting your photo: ',
                            err.message
                        );
                    }
                    console.log('Successfully deleted photo.', photoKey2);
                });

                s3.deleteObject({ Key: photoKey3 }, (err, data) => {
                    if (err) {
                        return console.log(
                            'There was an error deleting your photo: ',
                            err.message
                        );
                    }
                    console.log('Successfully deleted photo.', photoKey3);
                });

                s3.deleteObject({ Key: photoKey4 }, (err, data) => {
                    if (err) {
                        return console.log(
                            'There was an error deleting your photo: ',
                            err.message
                        );
                    }
                    console.log('Successfully deleted photo.', photoKey4);
                });

                s3.deleteObject({ Key: photoKey5 }, (err, data) => {
                    if (err) {
                        return console.log(
                            'There was an error deleting your photo: ',
                            err.message
                        );
                    }
                    console.log('Successfully deleted photo.', photoKey5);
                });

                s3.deleteObject({ Key: photoKey6 }, (err, data) => {
                    if (err) {
                        return console.log(
                            'There was an error deleting your photo: ',
                            err.message
                        );
                    }
                    console.log('Successfully deleted photo.', photoKey6);
                });

                s3.deleteObject({ Key: photoKey7 }, (err, data) => {
                    if (err) {
                        return console.log(
                            'There was an error deleting your photo: ',
                            err.message
                        );
                    }
                    console.log('Successfully deleted photo.', photoKey7);
                });

                // viewAlbum(albumName);
            }
        )
         .then(() => {
 
            if( ObjectID.isValid(req) ){
                console.log('Se elimino con todo el producto')
            }else{
                res.json({
                    ok: true,
                    msg: `La imagen ha sido eliminado correctamente `,
                });
            }
      
       });

    await Imagenes.findByIdAndDelete(id_imagen);

    // deletePhoto(albumName, photoKey);
    //upgradeDeleteImg(albumName, id);
};

const putFoto = async (req, res = response) => {
    const idimg = req.params.id_img;

    console.log(req.files);

    const idExiste = await Imagenes.findById(idimg);
    console.log('existe', idimg);

    if (!idExiste) {
        res.status(404).json({
            ok: false,
            msg: 'Imagen no encontrado por ID',
        });
    } else {
        const fotoActualizar = await Imagenes.findByIdAndUpdate(idimg, req.body, {
            new: true,
        });

        res.json({
            ok: true,
            msg: 'Funciona la actulizacion de la imagen',
            idimg,
            fotoActualizar,
        });
    }
};

module.exports = {
    subirFoto,
    deleteFoto,
    putFoto,
};
