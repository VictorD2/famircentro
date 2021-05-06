const pool = require('../database');
const ctrlEstudiantes = {};
const helpers = require('../lib/helpers');


ctrlEstudiantes.getEstudiantes = async(req, res) => {
    const data = await pool.query('SELECT id_usuario,nombre,apellido,habilitado,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango,nombre_pais,url_foto_pais FROM usuario JOIN pais ON pais.id_pais=usuario.id_pais WHERE id_rango = 2');
    console.log(data);
    res.json(data);
}
ctrlEstudiantes.getEstudianteById = async(req, res) => {
    const rows = await pool.query('SELECT id_usuario,nombre,apellido,habilitado,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango FROM usuario WHERE id_usuario = ?', [req.params.id]);
    if (rows.length === 0) return res.json({ message: "failed" });
    return res.json(rows[0]);
}
ctrlEstudiantes.deleteEstudiante = (req, res) => {}


module.exports = ctrlEstudiantes;