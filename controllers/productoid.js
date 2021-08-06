const { response } = require('express');
const Producto = require('../models/producto')

// const getProductoId = async (req, res = response) => {
//     // const subcategorias = await Subcategoria.find({}, { __v: 0})
//     //                         .populate('usuario', 'firstname')
//     //                         .populate('categoria','categoriaNombre');

//     const [subcategorias, total] = await Promise.all([
//         Subcategoria.find({}, { __v: 0 })
//             .populate('usuario', 'firstname')
//             .populate('categoria', 'categoriaNombre'),

//         Subcategoria.countDocuments(),
//     ]);

//     res.json({
//         subcategorias,
//         total,
//     });
// };

const crearProductId = async (req, res = response) => {

     
    const uid = req.uid;

// console.log(req._consuming)

            const productoid = new Producto({
                usuario: uid });

            const productoBD = await productoid.save();

            res.json({
                ok: true,
                productoBD,
                uid
            });
      

};
 
 
const putProductoId = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;    
 
    try {
        const productoBD = await Producto.findById(id);

        if (!productoBD) {
            res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por ID',
            });
        }

        const cambioProducto= {
            ...req.body,
            usuario: uid,
        };

        const pActualizado = await Producto.findByIdAndUpdate(
            id,
            cambioProducto,
            {
                new: true,
            }
        );

        res.json({
            ok: true,
            msg: 'actualizar producto',
            pActualizado,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se actualizo favor comuniquese con el administrador',
        });
    }
};

// const deleteProductoId = async (req, res = response) => {
//     const id = req.params.id;

//     try {
//         const categoria = await Categoria.findById(id);

//         if (!categoria) {
//             res.status(404).json({
//                 ok: true,
//                 msg: 'Categoria no encontrado por ID',
//             });
//         }

//         await Categoria.findByIdAndDelete(id);

//         res.json({
//             ok: true,
//             msg: 'Categoria Eliminado',
//         });
//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             msg: 'No se elimino favor comuniquese con el administrador',
//         });
//     }
// };


module.exports = {
 
    crearProductId,
    putProductoId

};

 