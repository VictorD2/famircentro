const pool = require('../database');
const helpers = require('../lib/helpers');
const ctrlUsuariocurso = {};
const fs = require('fs-extra')
const path = require('path');

ctrlUsuariocurso.createUsuariocurso = async(req, res) => {
    const { id_comprobante, id_usuario, id_curso, url_foto_comprobante } = req.body
    const newUsuariocurso = {
        id_usuario,
        id_curso,
        url_comprobante: url_foto_comprobante,
        favorito: 0
    }
    const newComprobante = {
        estado: "Aceptado"
    }
    const data = await pool.query('INSERT INTO usuario_curso set ?', [newUsuariocurso]);
    await pool.query('UPDATE comprobante set ? WHERE id_comprobante = ?', [newComprobante,id_comprobante]);
    if (data.affectedRows === 1) return res.json({ success: `Inscripción realizada` }); //Se logró actualizar
    return res.json({ error: "Ocurrió un error" });
}

ctrlUsuariocurso.getUsuariocurso = async(req, res) => {}

ctrlUsuariocurso.getUsuariocursoById = async(req, res) => {}


ctrlUsuariocurso.deleteUsuariocurso = async(req, res) => {
    if (data.affectedRows === 1) return res.json({ success: `Comprobante Eliminado` }); //Se logró actualizar
    return res.json({ error: "Ocurrió un error" });
}



module.exports = ctrlUsuariocurso;