const pool = require('../database');
const ctrlEstudiantes = {};
const helpers = require('../lib/helpers');


ctrlEstudiantes.getEstudiantes = async(req, res) => {
    const data = await pool.query('SELECT id_usuario,nombre,apellido,habilitado,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango,nombre_pais,url_foto_pais FROM usuario JOIN pais ON pais.id_pais=usuario.id_pais WHERE id_rango = 2');
    res.json(data);
}
ctrlEstudiantes.getEstudianteById = async(req, res) => {
    const rows = await pool.query('SELECT id_usuario,nombre,apellido,habilitado,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango FROM usuario WHERE id_usuario = ?', [req.params.id]);
    if (rows.length === 0) return res.json({ message: "failed" });
    return res.json(rows[0]);
}
ctrlEstudiantes.deleteEstudiante = async (req, res) => {
    const rows = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);
    rows[0].habilitado == 0 ? rows[0].habilitado = 1 : rows[0].habilitado = 0
    const data = await pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [rows[0], req.params.id]);
    if (data.affectedRows === 1) return res.json({ message: "success" }); //Se logró actualizar
    res.json({ message: "failed" });
}


module.exports = ctrlEstudiantes;