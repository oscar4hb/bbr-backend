const { response } = require('express');
const Longitud = require('../models/unidades/longitud');
const Peso = require('../models/unidades/peso')

//ver todas la unidades Longitud de un solo usuario
const getLogitud = async (req, res = response) => {
    const unidadesLongitud = await Longitud.find({}, { __v: 0 });

    res.json({
        ok: true,
        unidadesLongitud,
    });
};

// add de un solo usuario
const postLogitud = async (req, res = response) => {
    const uid = req.uid;
    const { nombre } = req.body;

    try {
        const unidadLongExiste = await Longitud.findOne({ nombre });

        if (unidadLongExiste) {
            return res.status(400).json({
                ok: false,
                msg: `${unidadLongExiste.nombre} : ya existe`,
            });
        } else {
            const longitud = new Longitud({ usuario: uid, ...req.body });

            const unidadLongitudDB = await longitud.save();

            res.json({
                ok: true,
                unidadLongitudDB,
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Hubo un en la catch : ${error} `,
        });
    }
};

// delete Longitud

const deleteLongitud = async (req, res = response) => {

    const id = req.params.id;

    try {

        const longitudExiste = await Longitud.findById(id);

    
        if (!longitudExiste) {
            res.status(200).json({
                ok: false,
                msg: `${id}: No existe o ya fue eliminado`,
            });
        }

        if (longitudExiste){
            await Longitud.findByIdAndDelete(id);
    
            res.json({
                ok: true,
                msg: `${id}: ha sido eliminado`,
            });

        }
    

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Hubo un error en la catch : ${error} `,
        });
    }
};

// Peso
const getPeso = async (req, res = response) => {
    const unidadesPeso = await Peso.find({}, { __v: 0 });

    res.json({
        ok: true,
        unidadesPeso,
    });
};

const postPeso = async (req, res = response) => {

    const uid = req.uid;
    const { nombre } = req.body;

    try {
        const unidadPesoExiste = await Peso.findOne({ nombre });

        if (unidadPesoExiste) {
            return res.status(400).json({
                ok: false,
                msg: `${unidadPesoExiste.nombre} : ya existe`,
            });
        } else {
            const peso = new Peso({ usuario: uid, ...req.body });

            const unidadPesoDB = await peso.save();

            res.json({
                ok: true,
                unidadPesoDB,
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

        const pesoExiste = await Peso.findById(id);
        console.log(pesoExiste);
    
        if (!pesoExiste) {
            res.status(200).json({
                ok: false,
                msg: `Unidad de peso no existe o ya fue eliminado`,
            });
        }

        if (pesoExiste){
            await Peso.findByIdAndDelete(id);
    
            res.json({
                ok: true,
                msg: `${pesoExiste.nombre}: ha sido eliminado`,
            });

        }
    

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Hubo un error en la catch : ${error} `,
        });
    }
};

module.exports = {
    getLogitud,
    postLogitud,
    deleteLongitud,
    getPeso,
    postPeso,
    deletePeso

};
