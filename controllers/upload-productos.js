const path = require('path');
const { response } = require('express');
const {  updateImgProduct } = require('../helpers/update-img');
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');



const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/product'),
    filename: (req, file, cb ) => {
           nombreImagen = uuidv4() + path.extname(file.originalname);
            cb( null, nombreImagen );  
            return nombreImagen
    }
});




const retornaImagenProduct = (req, res = response ) => {

   
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/product/${ foto }`);


    //Imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../assets/img/no-img.jpg`);
        res.sendFile(pathImg);
    }

}


const filesProduct = async (req, res = response) => {

    const img = req.files;
    const id = req.params.id;


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg:'No se recibio ningun archivo'
        })
      } else {

        

        res.json({
            ok: true,
            msg: 'Subio el archivo',
        });
      };

        updateImgProduct(id , nombreImagen );


    }



module.exports = {
    
    storage,
    retornaImagenProduct,
    filesProduct,
    
}