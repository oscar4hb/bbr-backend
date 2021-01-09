const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Categoria = require('../models/catagoria');

const { ordenarImg } = require('../helpers/ordenarImg')

const upgradeImg = async (tipo, id, urlImagen, orden) => {


    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }

            usuario.img = urlImagen;
            await usuario.save();
            return true;

            break;

        case 'producto':

            const producto = await Producto.findById(id);
            if (!producto) {
                return false;
            }

         // Ordenar las posiciones de las imagens
            ordenarImg(orden, producto)


            // producto.imgs.push(urlImagen);
            await producto.save();
            return true;

            break;


        case 'categorias':

            const categoria = await Categoria.findById(id);
            if (!categoria) {
                return false;
            }


            categoria.imag = nombreArchivo;
            await categoria.save();
            return true;

            break;


    }


}

const upgradeDeleteImg = async (tipo, id) => {

    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }

            usuario.img = ''
            await usuario.save()
            return true;

            break;

        case 'producto':

            const producto = await Producto.findById(id);
            if (!producto) {
                return false;
            }


            producto.imags.push(urlImagen);
            await producto.save();
            return true;

            break;


        case 'categorias':

            const categoria = await Categoria.findById(id);
            if (!categoria) {
                return false;
            }


            categoria.imag = '';
            await categoria.save();
            return true;

            break;

    }


}

module.exports = {
    upgradeImg,
    upgradeDeleteImg
}