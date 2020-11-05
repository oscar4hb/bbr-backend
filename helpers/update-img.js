const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Categoria = require('../models/catagoria');
const fs = require('fs');



const borrarImagen = ( path ) => {

    if( fs.existsSync( path ) ) {
        //borrar la imagen
        fs.unlinkSync( path );
    }
}

const updateImg = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if( !usuario ) {
                 return false;   
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;


        // case 'productos':

        //     const producto = await Producto.findById(id);
        //     if( !producto ) {
        //          return false;      
        //     }

        //     pathViejo = `./uploads/productos/${ producto.imgenes }`;
        //     borrarImagen( pathViejo );

        //     producto.imagenes = nombreArchivo;
        //     await producto.save();
        //     return true;
        //     break;

        case 'categorias':

            const categoria = await Categoria.findById(id);
            if( !categoria ) {
                 return false;   
            }

            pathViejo = `./uploads/categorias/${ categoria.imagen }`;
            borrarImagen( pathViejo );

            categoria.imagen = nombreArchivo;
            await categoria.save();
            return true;


            break;

    }




}

const updateImgProduct = async ( id, nombreImagen) => {

    let pathViejo = '';

    const producto = await Producto.findById(id);
    if( !producto ) {
         return false;      
    }

    pathViejo = `./uploads/product/${ producto.imgenes }`;
   // borrarImagen( pathViejo );

    producto.imagenes = await nombreImagen;
    await producto.save()
    return true;


}

module.exports = {
    updateImg,
    updateImgProduct
}