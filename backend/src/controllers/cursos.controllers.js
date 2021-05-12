const pool = require('../database');
const ctrlCursos = {};
const helpers = require('../lib/helpers');

ctrlCursos.createCurso = async(req, res) => {
    const { nombre_curso, descripcion, precio, duracion, horario, enlace, tipo, modalidad, id_usuario } = req.body;
    const data = await pool.query('SELECT * FROM curso WHERE nombre_curso = ?', [nombre_curso]);
    if (data.length > 0) return res.json({ message: "already exists" });
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
    const rows = await pool.query('INSERT INTO curso set ?', [newCurso]);
    if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró registrar
    return res.json({ message: "failed" });
}

ctrlCursos.getTalleresSincronos = async(req, res) => {
    const tipo = req.params.tipo == 'Talleres' ? 'Taller' : 'Curso'
    const modalidad = req.params.modalidad == 'Asincronos' ? 'Asincrono' : 'Sincrono'
    const data = await pool.query(`SELECT * FROM curso JOIN usuario ON usuario.id_usuario = curso.id_usuario WHERE tipo = '${tipo}' AND modalidad = '${modalidad}'`);
    for (let i = 0; i < data.length; i++) {
        const modulos = await pool.query('SELECT * FROM modulo WHERE id_curso = ?', [data[i].id_curso]);
        for (let j = 0; j < modulos.length; j++) {
            const temas = await pool.query('SELECT * FROM tema WHERE id_modulo = ?', [modulos[j].id_modulo]);
            for (let k = 0; k < temas.length; k++) {
                const material = await pool.query('SELECT * FROM material_clase WHERE id_tema = ?', [temas[k].id_tema]);
                temas.material[k] = material
            }
            modulos[j].temas = temas;
        }
        data[i].modulos = modulos;
        delete data[i].password;
    }
    
    console.log(data);
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