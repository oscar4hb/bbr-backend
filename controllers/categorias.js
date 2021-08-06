const { response } = require('express');
const Categoria = require('../models/catagoria');
const Subcategoria = require('../models/subcategoria');
const Producto = require('../models/producto');

const getCategorias = async (req, res = response) => {

 // Obtener categorias  
    const [ categorias, cantidad ] = await Promise.all([
                Categoria.find({}, {__v:0}).populate('usuario', 'email'),
                Categoria.countDocuments()
            ]);
    res.json({
        ok: true,
        categorias,
        cantidad
    });
}

const cantSubcatPorCategorias = async( req, res= response ) =>{
 
        const { nameCategoria, nameSubcategoria } = req.body;

        const cantidadSubcatePorId = 
                        Producto.find({ categoria : catId}).countDocuments();

        const cantidadProductosPorSubcategoria = 
                        Producto.find({ subcategoria: nameSubcategoria})

}

// se obtiene la lista de subategorias de una categoria
const getCategoria = async (req, res = response) => {

    const categoriaid = req.params.id;
    const desde = Number(req.query.desde) || 0;
 
    try {
        const [subcategorias, total] = await Promise.all([
            Subcategoria
                .find({categoria: categoriaid },{ __v: 0 })
                .populate('usuario', 'email')
                .populate('categoria', 'categoriaNombre')
                .skip(desde)
                .limit(10),
    
            Subcategoria
                .find({categoria: categoriaid }).countDocuments()
    
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


const postCategoria = async (req, res = response) => {

    const uid = req.uid;
    const { categoriaNombre } = req.body;

    try {

        const categoriaExiste = await Categoria.findOne({ categoriaNombre });
        if (categoriaExiste) {

            return res.status(201).json({
                ok: false,
                msg: `${ categoriaExiste.categoriaNombre } : ya existe`
            })
        } else {

            const categoria = new Categoria({ usuario: uid, ...req.body });
            const categoriaDB = await categoria.save();
            const categoriaId = await Categoria.findById({_id: categoriaDB._id},{__v:0})
            .populate('usuario', 'email' );
            res.json({
                ok: true,
                //categoriaDB,
                id: categoriaDB._id,
                usuario: categoriaId.usuario.email,
                cantidadSubcat: categoriaDB.cantidadSubcat,
                cantidadProduc: categoriaDB.cantidadProduc,
                created: categoriaDB.created
            });
        }
  
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Error ${error}`
        })

    }

}

const deleteCategoria = async (req, res = response) => {

    const id = req.params.id;

    try {

        const categoriaExiste = await Categoria.findById({_id: id});

        if (!categoriaExiste) {
            res.status(500).json({
                ok: false,
                msg: 'Categoria no encontrado por ID',
            });

        }else {

            await Categoria.findByIdAndDelete({_id: id});

            res.json({
                ok: true,
                msg: `Categoria "${ categoriaExiste.categoriaNombre }" eliminado`,
            });
        } 
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: `Error: ${error}`
        })

    }

}

const editCategoria = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {

        const categoria = await Categoria.findById(id);

        if (!categoria) {
            res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrado por ID',
            })

        }

        const cambioCategoria = {
            ...req.body,
            usuario: uid
        }

        const categoriaUpdated = await Categoria.findByIdAndUpdate(id, cambioCategoria, {
            new: true
        });


        res.json({
            ok: true,
            msg: 'actualizar Categoria',
            categoriaUpdated
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'No se actualizo favor comuniquese con el administrador'
        })

    }

}



module.exports = {
    getCategoria,
    getCategorias,
    postCategoria,
    editCategoria,
    deleteCategoria
};