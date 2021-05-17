const pool = require('../database');
const ctrlTema = {};
const path = require('path');
const helpers = require('../lib/helpers');
const fs = require('fs-extra');
ctrlTema.getTemaByModuloId = async(req, res) => {
    const rows = await pool.query('SELECT * FROM tema WHERE id_modulo = ?', [req.params.id]);
    return res.json(rows);
}

ctrlTema.createTema = async(req, res) => {
    const { titulo, descripcion, id_modulo } = req.body;
    const newTema = {
        titulo,
        descripcion,
        url_video: `/uploads/video/${req.file.filename}`,
        id_modulo
    }
    try {
        const rows = await pool.query('INSERT INTO tema set ? ', [newTema]);
        if (rows.affectedRows === 1) return res.json({ success: "Tema creado" }); //Se logró registrar
        return res.json({ error: "Ocurrió un error" });
    } catch (error) {
        return res.json({ error: "Ya existe un tema con ese nombre" });
    }
}

ctrlTema.eliminarTema = async(req, res) => {
    const rows = await pool.query('DELETE FROM tema WHERE id_tema = ?', [req.params.id]);
    if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró registrar
    return res.json({ message: "failed" });
}
ctrlTema.actualizarTema = async(req, res) => {
    const { titulo, descripcion, id_modulo, id_tema } = req.body;
    const newTema = {};
    if (req.file) {
        const tema = await pool.query('SELECT * FROM tema WHERE id_tema = ?', [id_tema]);
        if (tema[0].url_video.search(`/uploads/video/${req.file.filename}`) == -1)
            await fs.unlink(path.join(__dirname, "../build" + tema[0].url_video));
        newTema.url_video = `/uploads/video/${req.file.filename}`
    }
    newTema.titulo = titulo;
    newTema.descripcion = descripcion;
    newTema.id_modulo = id_modulo;
    newTema.id_tema = id_tema;
    try {
        const rows = await pool.query('UPDATE tema set ? WHERE id_tema = ?', [newTema, newTema.id_tema]);
        if (rows.affectedRows === 1) return res.json({ success: "Tema modificado correctamente" }); //Se logró registrar
        return res.json({ error: "Ocurrió un error" });
    } catch (error) {
        return res.json({ error: "Ya existe un tema con ese nombre" });
    }

}

module.exports = ctrlTema;