const { response } = require('express');
const Subcategoria = require('../models/subcategoria');

const getSubcategoria = async (req, res = response) => {
    // const subcategorias = await Subcategoria.find({}, { __v: 0})
    //                         .populate('usuario', 'firstname')
    //                         .populate('categoria','categoriaNombre');

    const [subcategorias, total] = await Promise.all([
        Subcategoria.find({}, { __v: 0 })
            .populate('usuario', 'firstname')
            .populate('categoria', 'categoriaNombre'),

        Subcategoria.countDocuments(),
    ]);

    res.json({
        subcategorias,
        total,
    });
};

const crearSubcategoria = async (req, res = response) => {
    const uid = req.uid;
    const { subcategoria } = req.body;

    try {
        const subcategoriaExiste = await Subcategoria.findOne({
            subcategoria,
        });

        if (subcategoriaExiste) {
            return res.status(400).json({
                ok: false,
                msg: `${subcategoriaExiste.subcategoria} : ya existe`,
            });
        } else {
            const subcategoria = new Subcategoria({
                usuario: uid,
                ...req.body,
            });

            const subcategoriaDB = await subcategoria.save();

            res.json({
                ok: true,
                subcategoriaDB,
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error comuniquese con administrador',
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
        const categoria = await Categoria.findById(id);

        if (!categoria) {
            res.status(404).json({
                ok: true,
                msg: 'Categoria no encontrado por ID',
            });
        }

        await Categoria.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Categoria Eliminado',
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No se elimino favor comuniquese con el administrador',
        });
    }
};

module.exports = {
    getSubcategoria,
    crearSubcategoria,
    putSubcategoria,
    deleteSubcategoria,
};
