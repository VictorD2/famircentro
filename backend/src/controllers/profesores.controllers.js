const pool = require('../database');
const ctrlProfesores = {};
const helpers = require('../lib/helpers');

ctrlProfesores.createProfesor = async(req, res) => {
    const newProfesor = req.body;
    newProfesor.id_rango = 3;
    newProfesor.habilitado_u = 1;
    newProfesor.url_foto_usuario = "/defaultProfile.PNG";
    newProfesor.password = newProfesor.rut;
    newProfesor.password = await helpers.encrypPassword(newProfesor.password);

    try {
        const rows = await pool.query('INSERT INTO usuario set ?', [newProfesor]);

        if (rows.affectedRows === 1) return res.json({ success: "Profesor creado" }); //Se logró registrar

        return res.json({ error: "Ocurrió un error" });
    } catch (error) {
        if (error.code === 'ECONNREFUSED') return res.json({ error: "Base de datos desconectada" });
        if (error.code === 'ER_DUP_ENTRY') return res.json({ error: "Ese correo ya está registrado" });
    }

}

ctrlProfesores.getCount = async(req, res) => {
    const rows = await pool.query('SELECT COUNT(*) FROM usuario WHERE id_rango = 3');
    if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"])
    return res.json({ error: "Ocurrió un error" });
}

ctrlProfesores.getProfesores = async(req, res) => {
    const cantidadDatos = 12;
    const pagina = (req.params.page - 1) * cantidadDatos;
    const data = await pool.query('SELECT id_usuario,nombre,apellido,habilitado_u,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango,nombre_pais,url_foto_pais FROM usuario JOIN pais ON pais.id_pais=usuario.id_pais WHERE id_rango = 3');
    res.json(data.splice(pagina, cantidadDatos));
}

ctrlProfesores.getProfesorById = async(req, res) => {
    const rows = await pool.query('SELECT id_usuario,nombre,apellido,habilitado_u,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango FROM usuario WHERE id_usuario = ?', [req.params.id]);

    if (rows.length === 0) return res.json({ error: "No existe al profesor" });

    return res.json(rows[0]);
}

ctrlProfesores.updateProfesor = async(req, res) => {
    const newProfesor = req.body;

    try {
        const rows = await pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [newProfesor, req.params.id]);

        if (rows.affectedRows === 1) return res.json({ success: "Profesor actualizado" }); //Se logró actualizar

        res.json({ error: "Ocurrió un error" });
    } catch (error) {
        if (error.code === 'ECONNREFUSED') return res.json({ error: "Base de datos desconectada" });
        if (error.code === 'ER_DUP_ENTRY') return res.json({ error: "Ese correo ya está registrado" });
    }
}

ctrlProfesores.deleteProfesor = async(req, res) => {
    const rows = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);
    rows[0].habilitado_u == 0 ? rows[0].habilitado_u = 1 : rows[0].habilitado_u = 0
    const data = await pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [rows[0], req.params.id]);

    if (data.affectedRows === 1) return res.json({ success: `Estado del profesor ${rows[0].nombre} actualizado` }); //Se logró actualizar

    res.json({ error: "Ocurrió un error" });
}



module.exports = ctrlProfesores;