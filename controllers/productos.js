const { response } = require('express');
const Producto = require('../models/producto');
 
const { deleteFoto } = require('./upload');

const getProducto = async (req, res = response) => {
    const id = req.params.id;

    try {
        const producto = await Producto.findById(id);

        if (!producto) {
            res.json({
                ok: true,
                msg: 'Producto no encontrado por ID',
            });
        }

        res.json({
            producto,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se puedo obtener el producto por ID comuniquese con el administrador',
            error,
        });
    }
};

// get de todo los datos del producto
const getProductos = async (req, res = response) => {
    let imageSize = '';
    let sizeScreen = Number(req.params.size);

    if (sizeScreen <= 400) {
        imageSize = 'quality5';
    } else if (sizeScreen <= 1200) {
        imageSize = 'quality4';
    } else if (sizeScreen >= 1200) {
        imageSize = 'quality3';
    }

    const desde = Number(req.query.desde) || 0;

    const [productos, total] = await Promise.all([
        Producto.find({}, { __v: 0 })
            .populate('usuario', 'nombre email')

            .populate({
                path: 'informacion',
                populate: { path: 'color', select: 'combinaciones' },
            })
            .populate({
                path: 'imgs',
                populate: { path: 'principal', select: imageSize },
            })
            .populate({
                path: 'variantes',
                populate: { path: 'color', select: [] },
            })
            // .populate({
            //     path: 'subcategoria',
            //     populate: { path: 'categoria', select: 'categoriaNombre' },
            //     //populate:{ path: 'usuario', select: 1 } // muestra todo los datos del usuario del Creador de subcategoria
            // })
            .skip(desde)
            .limit(10),

        Producto.countDocuments(),
    ]);

    res.json({
        ok: true,
        productos,
        total,
    });
};

// Solo el registro de productos
const getProductosOfUserList = async (req, res = response) => {
    const uid = req.uid;
    console.log(uid);

    const desde = Number(req.query.desde) || 0;

    const [productos, total] = await Promise.all([
        Producto.find(
            { usuario: uid },
            {
                titulo: 1,
                //usuario: 1,
                imagenes: 1,
                codigo: 1,
                'precio.precio': 1,
                'precio.moneda': 1,
                'informacion.stock': 1,

                'imagenes.principal': 1,
            }
        )
           // .populate('usuario', 'firstname lastname -_id')

            .populate({
                path: 'imagenes',
                populate: { path: 'principal', select: 'quality7 -_id' },
            })
            .skip(desde)
            .limit(10),

        Producto.find({ usuario: uid }).countDocuments(),
    ]);

    res.json({
        ok: true,
        productos,
        total,
    });
};

const crearProducto = async (req, res = response) => {
    const uid = req.uid;

    try {
        const cuerpoProducto = new Producto({ usuario: uid, ...req.body });
        const productoDB = await cuerpoProducto.save();

        res.json({
            ok: true,
            productoDB,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error comuniquese con administrador',
        });
    }
};

const actualizarProducto = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const producto = await Producto.findById(id);

        if (!producto) {
            res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por ID',
            });
        }

        const cambioProducto = {
            ...req.body,
            usuario: uid,
        };

        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            cambioProducto,
            { new: true }
        );

        res.json({
            ok: true,
            msg: 'Producto actualizado',
            productoActualizado,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se actualizo favor comuniquese con el administrador',
            error,
        });
    }
};

const borrarProducto = async (req, res = response) => {
    const id = req.params.id;

    try {
        const producto = await Producto.findById(id);

        if (!producto) {
            res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por ID',
            });
        }

        await Producto.findByIdAndDelete(id);

        //Elimina todas las imagenes

        await Promise.all([
            await producto.imagenes.principal,
            await producto.imagenes.segundo,
            await producto.imagenes.tercero,
            await producto.imagenes.cuarto,
            await producto.imagenes.quinto,
            await producto.imagenes.sexto,
            await producto.imagenes.septimo,
            await producto.imagenes.octavo,
            await producto.imagenes.noveno,
        ]).then((id_imagen) => {

            if(!id_imagen){
                return 
            }
          
            if (id_imagen[0]) {
             
                deleteFoto(id_imagen[0]);
            }
            if (id_imagen[1]) {
                deleteFoto(id_imagen[1]);
            }
            if(id_imagen[2]){
                deleteFoto(id_imagen[2]);
            }
            if(id_imagen[3]){
                deleteFoto(id_imagen[3]);
            }
            if(id_imagen[4]){
                deleteFoto(id_imagen[4]);
            }
            if(id_imagen[5]){
                deleteFoto(id_imagen[5]);
            }
            if(id_imagen[6]){
                deleteFoto(id_imagen[6]);
            }
            if(id_imagen[7]){
                deleteFoto(id_imagen[7]);
            }
            if(id_imagen[8]){
                  
                deleteFoto(id_imagen[8]);
            }
             
        });
        

        res.json({
            ok: true,
            msg: `Producto eliminado: ${id}`,
            producto,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se elimino favor comuniquese con el administrador',
        });
    }
};

 

module.exports = {
    getProducto,
    getProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto,

    getProductosOfUserList,

    // getColor,
    // agregarcolor,
    // deleteColor,
};
