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
    await pool.query('UPDATE comprobante set ? WHERE id_comprobante = ?', [newComprobante, id_comprobante]);
    if (data.affectedRows === 1) return res.json({ success: `Inscripción realizada` }); //Se logró actualizar
    return res.json({ error: "Ocurrió un error" });
}

ctrlUsuariocurso.getUsuariocursoByIdEstudiante = async(req, res) => {
    const rows = await pool.query('SELECT id_usuario_curso,nombre_curso,descripcion,url_foto_curso,tipo,modalidad,enlace,favorito,curso.id_curso FROM usuario_curso JOIN curso ON usuario_curso.id_curso = curso.id_curso WHERE usuario_curso.id_usuario = ?', [req.params.idEstudiante]);
    res.json(rows);
}

ctrlUsuariocurso.getUsuariocursoByIdCurso = async(req, res) => {
    const rows = await pool.query('SELECT id_usuario_curso,usuario.id_usuario,nombre,apellido,correo,telefono,url_foto_usuario FROM usuario_curso JOIN usuario ON usuario_curso.id_usuario = usuario.id_usuario WHERE id_curso = ?', [req.params.idCurso]);
    res.json(rows);
}


ctrlUsuariocurso.deleteUsuariocurso = async(req, res) => {
    if (data.affectedRows === 1) return res.json({ success: `Comprobante Eliminado` }); //Se logró actualizar
    return res.json({ error: "Ocurrió un error" });
}



module.exports = ctrlUsuariocurso;