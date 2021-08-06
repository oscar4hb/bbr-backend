const { response } = require('express');
const Longitud = require('../models/unidades/longitud');
const Peso = require('../models/unidades/peso');
const Color = require('../models/unidades/colores');

//ver todas la unidades Longitud de un solo usuario
const getLogitud = async (req, res = response) => {
    const [longitud, cantidad] = await Promise.all([
        Longitud.find({}, { __v: 0 }).populate('usuario', 'email'),
        Longitud.countDocuments(),
    ]);
    
    res.json({
        ok: true,
        longitud,
        cantidad,
    });
};

// add de un solo usuario
const postLogitud = async (req, res = response) => {
    const uid = req.uid;
    const { longitud } = req.body;

    try {
        const longitudDB = await Longitud.findOne({ longitud });

        if (longitudDB) {
            return res.status(201).json({
                ok: false,
                msg: `${longitudDB.Longitud} ya existe`,
            });
        } else {
            const longitud = new Longitud({ usuario: uid, ...req.body });
            const longitudDB = await longitud.save();
            const longitudId = await Longitud.findById({ _id: longitudDB._id })
            .populate('usuario', 'email' );

            res.json({
                ok: true,
                usuario: longitudId.usuario.email,
                id: longitudDB._id,
                created: longitudDB.created,
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Error : ${error} `,
        });
    }
};

// delete Longitud

const deleteLongitud = async (req, res = response) => {
    const id = req.params.id;

    try {
        const longitudExiste = await Longitud.findById({_id: id});

        if (!longitudExiste) {
            res.status(500).json({
                ok: false,
                msg: 'No existe o ya fue eliminado'
            });
        }

       else {
            await Longitud.findByIdAndDelete({_id: id});

            res.json({
                ok: true,
                msg: `Se eliminó la longitud: ${longitudExiste.longitud}`,
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Hubo un error : ${error} `,
        });
    }
};

// Peso
const getPeso = async (req, res = response) => {
    const [pesos, cantidad] = await Promise.all([
        Peso.find({}, { __v: 0 }).populate('usuario', 'email'),

        Peso.countDocuments(),
    ]);

    res.json({
        ok: true,
        pesos,
        cantidad,
    });
};

const postPeso = async (req, res = response) => {
    const uid = req.uid;
    const { peso } = req.body;

    try {
        const unidadPesoExiste = await Peso.findOne({ peso });

        if (unidadPesoExiste) {
            return res.status(201).json({
                ok: false,
                msg: `${unidadPesoExiste.peso} : ya existe`,
            });
        } else {
            const peso = new Peso({ usuario: uid, ...req.body });
            const pesoDB = await peso.save();
            const pesoId = await Peso.findById({ _id: pesoDB._id }).populate(
                'usuario',
                'email'
            );

            res.json({
                ok: true,
                usuario: pesoId.usuario.email,
                id: pesoDB._id,
                created: pesoDB.created,
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Hubo un en la catch : ${error} `,
        });
    }
};

const deletePeso = async (req, res = response) => {
    const id = req.params.id;

    try {
        const pesoExiste = await Peso.findById({ _id: id });
        if (!pesoExiste) {
            return res.status(200).json({
                ok: false,
                msg: `Unidad de peso no existe o ya fue eliminado`,
            });
        }

        if (pesoExiste) {
            await Peso.findOneAndDelete({ _id: id });

            res.json({
                ok: true,
                msg: `${pesoExiste.peso}: ha sido eliminado`,
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Hubo un error: ${error} `,
        });
    }
};

// Color
const getColor = async (req, res = response) => {
    const [colores, cantidad] = await Promise.all([

                            Color.find({},{ __v: 0 }).populate('usuario', 'email'),

                            Color.countDocuments()
    ]);

 
    res.json({
        ok: true,      
        colores,
        cantidad,
    });
};

const postColor = async (req, res = response) => {
    const uid = req.uid;
    const { color } = req.body;

    const colorDB = await Color.findOne({ color });

    if (colorDB) {
        return res.status(201).json({
            ok: false,
            msg: `El color: ${colorDB.color} ya existe`,
        });
    } else {
        const color = new Color({ usuario: uid, ...req.body });
        const colorBD = await color.save();

        const colorId = await Color.findById({ _id: colorBD._id })
                    .populate('usuario', 'email' );

        res.json({
            ok: true,
            usuario: colorId.usuario.email,
            id: colorBD._id,
            created: colorBD.created,
        });
    }
};

const deleteColor = async (req, res = response) => {
    const id = req.params.id;

    try {
        const colorExiste = await Color.findById({ _id: id });

        if (!colorExiste) {
            return res.status(500).json({
                ok: false,
                msg: `El color no existe o ya fue eliminado`,
            });
        } else {
            await Color.findOneAndDelete({ _id: id });

            res.json({
                ok: true,
                msg: `Se elimino el color ${colorExiste.color} `,
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Hubo un error : ${error} `,
        });
    }
};

module.exports = {
    getLogitud,
    postLogitud,
    deleteLongitud,

    getPeso,
    postPeso,
    deletePeso,

    getColor,
    postColor,
    deleteColor,
};
