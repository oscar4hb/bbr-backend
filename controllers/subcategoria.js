const { response } = require('express');
const Subcategoria = require('../models/subcategoria');
const Categoria = require('../models/catagoria');

// Muestra solo una subcatergoria por Id
const getSubcategoria  = async (req, res = response) => {

    const id = req.params.id;

    try {
        const subcategoria = await Subcategoria.findById(id);

        if (!subcategoria) {
  
            res.json({
                ok: true,
                msg: 'Subcategoria no encontrado por ID',
            });
        }

        res.status(200).json({
             ok: true,
            subcategoria,
        });

    } catch (error) { 
        res.status(500).json({
            ok: false,
            msg: 'No se elimino favor comuniquese con el administrador',
            error
        });
    }
};





// Muestra todas las subcategorias
const getSubcategorias = async (req, res = response) => {
    // const subcategorias = await Subcategoria.find({}, { __v: 0})
    //                         .populate('usuario', 'firstname')
    //                         .populate('categoria','categoriaNombre');

    const [subcategorias, total] = await Promise.all([
        Subcategoria.find({}, { __v: 0 })
            .populate('usuario', 'email')
            .populate('categoria', 'categoriaNombre'),

        Subcategoria.countDocuments(),
    ]);

    res.json({
        subcategorias,
        total,
    });
};

const postSubcategoria = async (req, res = response) => {
    const uid = req.uid;
    const { subcategoria, categoria } = req.body;
 

    try {
        const subcategoriaExiste = await Subcategoria.findOne({
            subcategoria,
        });

        const categoriaExiste = await Categoria.findById({ _id: categoria })

        if(!categoriaExiste){
            return res.status(201).json({
                ok: false,
                msg: `La categoria no existe en Base de datos `
            })
        }

        if (subcategoriaExiste) {
            return res.status(203).json({
                ok: false,
                msg: `${subcategoriaExiste.subcategoria} : ya existe`,
            });
        } else {
            const subcategoria = new Subcategoria({ usuario: uid, ...req.body }); 
            const subcategoriaDB = await subcategoria.save();
            const subcategoriaId = await Subcategoria.findById({_id: subcategoriaDB._id},{__v:0})
                                .populate('usuario', 'email');

            res.json({
                ok: true,
                id: subcategoriaDB._id,
                usuario: subcategoriaId.usuario.email,
                cantidadProduc: subcategoriaDB.cantidadProduc,
                created: subcategoriaDB.created,
                //subcategoriaDB,
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Error ${error}`,
        });
    }
};

const putSubcategoria = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const categoria = await Categoria.findById(id);

        if (!categoria) {
            res.status(404).json({
                ok: true,
                msg: 'Categoria no encontrado por ID',
            });
        }

        const cambioCategoria = {
            ...req.body,
            usuario: uid,
        };

        const categoriaActualizado = await Categoria.findByIdAndUpdate(
            id,
            cambioCategoria,
            {
                new: true,
            }
        );

        res.json({
            ok: true,
            msg: 'actualizar Categoria',
            categoriaActualizado,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se actualizo favor comuniquese con el administrador',
        });
    }
};

const deleteSubcategoria = async (req, res = response) => {
    const id = req.params.id;

    try {
        const subcategoria = await Subcategoria.findById(id);

        if (!subcategoria) {
            res.status(203).json({
                ok: true,
                msg: 'Subcategoria no encontrado por ID',
            });
        }

        await Subcategoria.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Subcategoria eliminado',
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se elimino favor comuniquese con el administrador',
        });
    }
};


//

module.exports = {
    getSubcategorias,
    postSubcategoria,
    putSubcategoria,
    deleteSubcategoria,
    getSubcategoria
};
