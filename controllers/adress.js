const { response } = require('express');
const Adress = require('../models/adress');
const Usuario = require('../models/usuario');

// adresss de un solo usuario
const getAdress = async (req, res = response) => {
    const id = req.params.id;

    const desde = Number(req.query.desde) || 0;

    const [adress, total] = await Promise.all([
        Adress.find().skip(desde).populate('usuario', 'nombre email phone'),

        Adress.countDocuments(),
    ]);

    res.json({
        ok: true,
        adress,
        total,
    });
};

// adresss total
const getAdressAll = async (req, res = response) => {
    const id = req.params.id;

    const desde = Number(req.query.desde) || 0;

    const [adress, total] = await Promise.all([
        Adress.find().populate('usuario', 'nombre email phone'),

        Adress.countDocuments(),
    ]);

    res.json({
        ok: true,
        adress,
        total,
    });
};

const crearAdress = async (req, res = response) => {
    try {
        const id = req.params.id;
        const usuarioBD = await Usuario.findById(id);

        if (!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'no se encontro id',
            });
        }

        const adress = new Adress({
            usuario: id,
            ...req.body,
        });

        await adress.save();

        res.json({
            ok: true,
            msg: 'Se ha guardado correctamente',
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inespedaro',
        });
    }
};

const putAdress = async (req, res = response) => {};

const deleteAdress = async (req, res = response) => {};

module.exports = {
    getAdress,
    crearAdress,
    getAdressAll,
    putAdress,
    deleteAdress,
};
