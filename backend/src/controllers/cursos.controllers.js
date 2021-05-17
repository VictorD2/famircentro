const pool = require('../database');
const ctrlCursos = {};
const helpers = require('../lib/helpers');

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
        const rows = await pool.query('INSERT INTO curso set ?', [newCurso]);
        if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró registrar
        return res.json({ message: "failed" });
    } catch (error) {
        return res.json({ message: "already exists" });
    }

}

ctrlCursos.getCursos = async(req, res) => {
    const tipo = req.params.tipo == 'Talleres' ? 'Taller' : 'Curso'
    const modalidad = req.params.modalidad == 'Asincronos' ? 'Asincrono' : 'Sincrono'
    const data = await pool.query(`SELECT * FROM curso JOIN usuario ON usuario.id_usuario = curso.id_usuario WHERE tipo = '${tipo}' AND modalidad = '${modalidad}'`);
    for (let i = 0; i < data.length; i++) {
        delete data[i].password;
    }
    res.json(data);
}

ctrlCursos.getCursoById = async(req, res) => {
    const rows = await pool.query('SELECT * FROM curso WHERE id_curso = ?', [req.params.id]);
    if (rows.length === 0) return res.json({ message: "failed" });
    return res.json(rows[0]);
}

ctrlCursos.updateCurso = async(req, res) => {
    const curso = await pool.query('SELECT * FROM curso WHERE nombre_curso = ?', [req.body.nombre_curso]);

    if (curso.length > 0 && curso[0].id_curso != req.params.id) return res.json({ message: "already exists" }); //Existe un correo

    const newCurso = req.body;
    delete newCurso.modulos;
    const rows = await pool.query('UPDATE curso set ? WHERE id_curso = ?', [newCurso, req.params.id]);

    if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró actualizar

    res.json({ message: "failed" });

}

ctrlCursos.deleteCurso = async(req, res) => {
    const rows = await pool.query("SELECT * FROM curso WHERE id_curso = ?", [req.params.id]);

    rows[0].habilitado == 0 ? rows[0].habilitado = 1 : rows[0].habilitado = 0

    const data = await pool.query('UPDATE curso set ? WHERE id_curso = ?', [rows[0], req.params.id]);

    if (data.affectedRows === 1) return res.json({ message: "success" }); //Se logró actualizar

    return res.json({ message: "failed" });
}



module.exports = ctrlCursos;