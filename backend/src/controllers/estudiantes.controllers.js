const pool = require("../database");
const ctrlEstudiantes = {};

//.get("/")
ctrlEstudiantes.getEstudiantes = async (req, res) => {
  if (req.query.keyword && req.query.page) {
    const data = await pool.query(`SELECT id_usuario,nombre,apellido,habilitado_u,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango,nombre_pais,url_foto_pais FROM usuario JOIN pais ON pais.id_pais=usuario.id_pais WHERE id_rango = 2 AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%')`);
    const cantidadDatos = 12;
    const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
    return res.json(data.splice(pagina, cantidadDatos));
  }

  if (req.query.keyword) {
    const data = await pool.query(`SELECT id_usuario,nombre,apellido,habilitado_u,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango,nombre_pais,url_foto_pais FROM usuario JOIN pais ON pais.id_pais=usuario.id_pais WHERE id_rango = 2 AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%')`);
    return res.json(data);
  }

  if (req.query.page) {
    const data = await pool.query("SELECT id_usuario,nombre,apellido,habilitado_u,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango,nombre_pais,url_foto_pais FROM usuario JOIN pais ON pais.id_pais=usuario.id_pais WHERE id_rango = 2");
    const cantidadDatos = 12;
    const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
    return res.json(data.splice(pagina, cantidadDatos));
  }

  const data = await pool.query("SELECT id_usuario,nombre,apellido,habilitado_u,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango,nombre_pais,url_foto_pais FROM usuario JOIN pais ON pais.id_pais=usuario.id_pais WHERE id_rango = 2");
  return res.json(data);
};

//.get("/count")
ctrlEstudiantes.getCount = async (req, res) => {
  if (req.query.keyword) {
    const data = await pool.query(`SELECT COUNT(*) FROM usuario WHERE id_rango = 2 AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%')`);
    if (data[0]["COUNT(*)"]) return res.json(data[0]["COUNT(*)"]);
    return res.json(0);
  }

  const rows = await pool.query("SELECT COUNT(*) FROM usuario WHERE id_rango = 2");

  if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);

  return res.json(0);
};

//.get("/:id")
ctrlEstudiantes.getEstudianteById = async (req, res) => {
  const rows = await pool.query("SELECT id_usuario,nombre,apellido,habilitado_u,profesion,correo,telefono,rut,url_foto_usuario,usuario.id_pais,id_rango,nombre_pais FROM usuario JOIN pais ON pais.id_pais=usuario.id_pais WHERE id_usuario = ?", [req.params.id]);

  if (rows.length === 0) return res.json({ error: "No existe tal estudiante" });

  return res.json(rows[0]);
};

//.delete("/:id")
ctrlEstudiantes.deleteEstudiante = async (req, res) => {
  const rows = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);
  rows[0].habilitado_u == 0 ? (rows[0].habilitado_u = 1) : (rows[0].habilitado_u = 0);
  const data = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [rows[0], req.params.id]);

  if (data.affectedRows === 1) return res.json({ success: `Estado del estudiante ${rows[0].nombre} actualizado` }); //Se logró actualizar

  return res.json({ error: "Ocurrió un error" });
};

module.exports = ctrlEstudiantes;
