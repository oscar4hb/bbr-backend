const {    response } = require('express');
const Categoria = require('../models/catagoria');
const Subcategoria = require('../models/subcategoria');


const getCategorias = async (req, res = response) => {

    const categorias = await Categoria.find().populate('usuario', 'firstname');
    const cantidad = await Categoria.countDocuments();



    res.json({
        ok: true,
        categorias,
        cantidad
    });
}

// se obtiene la lista de subategorias de una categoria
const getCategoria = async (req, res = response) => {

    const categoriaid = req.params.id;

    const desde = Number(req.query.desde) || 0;


    try {
        

        const [subcategorias, total] = await Promise.all([
            Subcategoria
            .find({categoria: categoriaid })
            .skip(desde)
            .limit(5),
    
            Subcategoria.find({categoria: categoriaid }).countDocuments()
    
        ]);
 

        res.json({
            ok: true,
            subcategorias,
            total,
           
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'No existe Id de categoria'
        })
    }


}


const crearCategoria = async (req, res = response) => {

    const uid = req.uid;

    const {
        categoriaNombre
    } = req.body;


    try {

        const categoriaExiste = await Categoria.findOne({       categoriaNombre     });
        if (categoriaExiste) {

            return res.status(400).json({
                ok: false,
                msg: `${ categoriaExiste.categoriaNombre } : ya existe`
            })
        } else {

            const categoria = new Categoria({ usuario: uid, ...req.body });

            const categoriaDB = await categoria.save();

            res.json({
                ok: true,
                categoriaDB
            });

        }



    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error comuniquese con administrador'
        })

    }

}

const actualizarCategoria = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {

        const categoria = await Categoria.findById(id);

        if (!categoria) {
            res.status(404).json({
                ok: true,
                msg: 'Categoria no encontrado por ID',
            })

        }

        const cambioCategoria = {
            ...req.body,
            usuario: uid
        }

        const categoriaActualizado = await Categoria.findByIdAndUpdate(id, cambioCategoria, {
            new: true
        });


        res.json({
            ok: true,
            msg: 'actualizar Categoria',
            categoriaActualizado
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'No se actualizo favor comuniquese con el administrador'
        })

    }

}

const borrarCategoria = async (req, res = response) => {

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

        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'No se elimino favor comuniquese con el administrador'
        })

    }

}

module.exports = {
    getCategoria,
    getCategorias,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
};