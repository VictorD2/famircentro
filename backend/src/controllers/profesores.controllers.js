const pool = require('../database');
const ctrlProfesores = {};
const helpers = require('../lib/helpers');

ctrlProfesores.createProfesor = async(req, res) => {
    const profesor = await pool.query('SELECT * FROM usuario WHERE correo = ?', [req.body.correo]);

    if (profesor.length > 0) return res.json({ message: "already exists" }); //Existe un correo

    const newProfesor = req.body;

    newProfesor.id_rango = 3;

    newProfesor.habilitado = 1;

    newProfesor.url_foto_usuario = "/defaultProfile.PNG";

    newProfesor.password = newProfesor.rut;

    newProfesor.password = await helpers.encrypPassword(newProfesor.password);

    const rows = await pool.query('INSERT INTO usuario set ?', [newProfesor]);

    if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró registrar

    return res.json({ message: "failed" });
}

ctrlProfesores.getProfesores = async(req, res) => {
    const data = await pool.query('SELECT id_usuario,nombre,apellido,habilitado,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango,nombre_pais,url_foto_pais FROM usuario JOIN pais ON pais.id_pais=usuario.id_pais WHERE id_rango = 3');
    res.json(data);
}

ctrlProfesores.getProfesorById = async(req, res) => {
    const rows = await pool.query('SELECT id_usuario,nombre,apellido,habilitado,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango FROM usuario WHERE id_usuario = ?', [req.params.id]);
    if (rows.length === 0) return res.json({ message: "failed" });
    return res.json(rows[0]);
}

ctrlProfesores.updateProfesor = async(req, res) => {
    const profesor = await pool.query('SELECT * FROM usuario WHERE correo = ?', [req.body.correo]);

    if (profesor.length > 0 && profesor[0].id_usuario != req.params.id) return res.json({ message: "already exists" }); //Existe un correo

    const newProfesor = req.body;
    const rows = await pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [newProfesor, req.params.id]);

    if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró actualizar

    res.json({ message: "failed" });
}

ctrlProfesores.deleteProfesor = async(req, res) => {
    const rows = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);
    rows[0].habilitado == 0 ? rows[0].habilitado = 1 : rows[0].habilitado = 0
    const data = await pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [rows[0], req.params.id]);
    if (data.affectedRows === 1) return res.json({ message: "success" }); //Se logró actualizar
    res.json({ message: "failed" });
}



module.exports = ctrlProfesores;