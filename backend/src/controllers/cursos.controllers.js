const pool = require('../database');
const helpers = require('../lib/helpers');
const ctrlCursos = {};
const fs = require('fs-extra')
const path = require('path');

ctrlCursos.verificarSub = async(req, res) => {
    if (!req.user) return res.json(false);
    const rows = await pool.query('SELECT * FROM usuario_curso WHERE id_curso = ? AND id_usuario = ?', [req.params.id, req.user.id_usuario]);
    if (rows[0])
        if (rows[0].estado_pago === 'E') return res.json(true);
    return res.json(false);
}

ctrlCursos.createCurso = async(req, res) => {
    const { nombre_curso, descripcion, precio, duracion, horario, enlace, tipo, modalidad, id_usuario } = req.body;

    const newCurso = {
        nombre_curso,
        descripcion,
        precio,
        duracion,
        horario,
        enlace,
        tipo,
        modalidad,
        id_usuario,
        habilitado: 1
    }

    if (modalidad === "Asincrono") {
        delete newCurso.duracion;
        delete newCurso.horario;
        delete newCurso.enlace;

    }

    try {
        newCurso.url_foto_curso = `/uploads/fotosCursos/${req.file.filename}`
        const rows = await pool.query('INSERT INTO curso set ?', [newCurso]);
        if (rows.affectedRows === 1) return res.json({ success: "Curso creado" }); //Se logró registrar
        return res.json({ error: "Ocurrió un error" });
    } catch (error) {
        if (error.code === 'ECONNREFUSED') return res.json({ error: "Base de datos desconectada" });
        if (error.code === 'ER_DUP_ENTRY') return res.json({ error: "Ya existe un curso con ese nombre" });
    }

}

ctrlCursos.getCursos = async(req, res) => {
    const tipo = req.params.tipo == 'Talleres' ? 'Taller' : 'Curso'
    const modalidad = req.params.modalidad == 'Asincronos' ? 'Asincrono' : 'Sincrono'
    const data = await pool.query(`SELECT * FROM curso JOIN usuario ON usuario.id_usuario = curso.id_usuario WHERE tipo = '${tipo}' AND modalidad = '${modalidad}'`);

    for (let i = 0; i < data.length; i++) delete data[i].password;

    res.json(data);
}

ctrlCursos.getCursoById = async(req, res) => {
    const rows = await pool.query('SELECT * FROM curso WHERE id_curso = ?', [req.params.id]);
    if (rows.length === 0) return res.json({ error: "No existe tal curso" });

    return res.json(rows[0]);
}

ctrlCursos.updateCurso = async(req, res) => {

    const newCurso = req.body;
    delete newCurso.modulos;
    delete newCurso.fotoCurso;
    
    try {
        if (req.file) {
            const curso = await pool.query('SELECT * FROM curso WHERE id_curso = ?', [req.params.id]);

            if (curso[0].url_foto_curso.search(`/uploads/fotosCursos/${req.file.filename}`) == -1)
                await fs.unlink(path.join(__dirname, "../build" + curso[0].url_foto_curso));

            newCurso.url_foto_curso = `/uploads/fotosCursos/${req.file.filename}`
        }

        const rows = await pool.query('UPDATE curso set ? WHERE id_curso = ?', [newCurso, req.params.id]);
        if (rows.affectedRows === 1) return res.json({ success: "Curso actualizado" }); //Se logró actualizar
    } catch (error) {
        if (error.code === 'ECONNREFUSED') return res.json({ error: "Base de datos desconectada" });
        if (error.code === 'ER_DUP_ENTRY') return res.json({ error: "Ya existe un curso con ese nombre" });
    }
    res.json({ error: "Ocurrió un error" });
}

ctrlCursos.deleteCurso = async(req, res) => {
    const rows = await pool.query("SELECT * FROM curso WHERE id_curso = ?", [req.params.id]);
    rows[0].habilitado == 0 ? rows[0].habilitado = 1 : rows[0].habilitado = 0
    const data = await pool.query('UPDATE curso set ? WHERE id_curso = ?', [rows[0], req.params.id]);

    if (data.affectedRows === 1) return res.json({ success: `Curso ${rows[0].nombre_curso} deshabilidato / habilitado` }); //Se logró actualizar

    return res.json({ error: "Ocurrió un error" });
}



module.exports = ctrlCursos;