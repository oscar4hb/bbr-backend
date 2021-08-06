const { response } = require('express');
// const Categoria = require('../models/catagoria');
// const Subcategoria = require('../models/subcategoria');
// const Producto = require('../models/producto');

const getCarousels = async (req, res = response) => {

   


 // Obtener categorias  
    // const [ categorias, cantidad ] = await Promise.all([
    //             Categoria.find({}, {__v:0}).populate('usuario', 'email'),
    //             Categoria.countDocuments()
    //         ]);
    res.json({
    
        ok: true,
        msg:'Funciona Get Carousels'

    });
}

const getCarousel = async (req, res = response) => {
    const id = req.params.id;

    // Obtener categorias  
    //    const [ categorias, cantidad ] = await Promise.all([
    //                Categoria.find({}, {__v:0}).populate('usuario', 'email'),
    //                Categoria.countDocuments()
    //            ]);

       res.json({
           ok: true,
           msg: 'Funciona get Carousel',
           id,
        
       });
   }

  

const postCarousel = async (req, res = response) => {

    const uid = req.uid;

    res.json({
        ok: true,
        msg: `Funciona post`
    })
    
/*  
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
               // categoriaDB,
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

    }*/

}

const deleteCarousel = async (req, res = response) => {

    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'Fuinconal delete'
    })

}

const editCarousel  = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    res.json({
        id,
        uid,
        ok: true,
        msg: 'Fuinconal edit'
    })


}



module.exports = {
    getCarousel, 
    getCarousels, 
    postCarousel,
    editCarousel,
    deleteCarousel
};