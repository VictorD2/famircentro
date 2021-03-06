const pool = require("../database");
const helpers = require("../lib/helpers");
const ctrlComprobantes = {};
const fs = require("fs-extra");
const path = require("path");

//.get('/count/:estado')
ctrlComprobantes.getCount = async (req, res) => {
  const rows = await pool.query("SELECT COUNT(*) FROM comprobante WHERE estado = ?", [req.params.estado]);
  if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
  return res.json({ error: "Ocurrió un error" });
};

//.get('/:estado/:page')
ctrlComprobantes.getComprobantes = async (req, res) => {
  const cantidadDatos = 12;
  const pagina = (req.params.page - 1) * cantidadDatos;
  const rows = await pool.query("SELECT id_comprobante,estado,usuario.id_usuario,nombre,apellido,nombre_curso,url_foto_comprobante FROM comprobante JOIN usuario ON comprobante.id_usuario = usuario.id_usuario JOIN curso ON curso.id_curso=comprobante.id_curso WHERE estado = ? ORDER BY fecha_enviado DESC", [req.params.estado]);
  res.json(rows.splice(pagina, cantidadDatos));
};

//.get('/:id')
ctrlComprobantes.getComprobanteById = async (req, res) => {
  const rows = await pool.query("SELECT * FROM comprobante WHERE id_comprobante = ?", [req.params.id]);
  if (rows[0]) return res.json(rows[0]);
  return res.json({ error: "Ocurrió un error" });
};

//.post('/')
ctrlComprobantes.createComprobante = async (req, res) => {
  if (!req.user) return res.json({ error: "Necesita una cuenta para comprar" });
  if (req.user.id_usuario != req.body.id_usuario) return res.json({ error: "No tienes permiso para hacer eso" }); //Descomentar en producción
  if (!req.file) return res.json({ error: "No ha subido una foto" });
  const validacion = await pool.query('SELECT * FROM comprobante WHERE id_usuario = ? AND id_curso = ? AND estado = "NoVisto"', [req.body.id_usuario, req.body.id_curso]);
  if (validacion[0]) return res.json({ error: "Ya ha enviado un comprobante de este curso, pronto lo revisaremos" });
  const validacion2 = await pool.query("SELECT * FROM usuario_curso WHERE id_usuario = ? AND id_curso = ?", [req.body.id_usuario, req.body.id_curso]);
  if (validacion2[0]) return res.json({ error: "Ya está inscrito en este curso" });

  // Capacidad Validación
  const curso = await pool.query("SELECT capacidad FROM curso WHERE id_curso = ?", [req.body.id_curso]);
  if (curso[0].capacidad) {
    const count = await pool.query("SELECT COUNT(*) FROM usuario_curso WHERE id_curso = ?", [req.body.id_curso]);
    if (curso[0].capacidad <= count[0]["COUNT(*)"]) return res.json({ error: "Ya no hay cupos disponibles" });
  }

  const newComprobante = req.body;
  newComprobante.id_usuario = req.user.id_usuario;
  newComprobante.fecha_enviado = new Date();
  newComprobante.estado = "NoVisto";
  newComprobante.url_foto_comprobante = `/uploads/fotosComprobantes/${req.file.filename}`;
  const data = await pool.query("INSERT INTO comprobante set ?", [newComprobante]);
  if (data.affectedRows === 1) return res.json({ success: `Comprobante enviado` }); //Se logró actualizar
  return res.json({ error: "Ocurrió un error" });
};

// .put('/:id')
ctrlComprobantes.actualizarComprobante = async (req, res) => {
  const newComprobante = req.body;
  const comprobante = await pool.query("UPDATE comprobante set ? WHERE id_comprobante = ?", [newComprobante, req.params.id]);
  const usuarioCurso = await pool.query("DELETE FROM usuario_curso WHERE id_curso = ? AND id_usuario = ?", [newComprobante.id_curso, newComprobante.id_usuario]);
  if (comprobante.affectedRows === 1 || usuarioCurso.affectedRows === 1) return res.json({ success: `Comprobante Rechazado` }); //Se logró actualizar
  return res.json({ error: "Ocurrió un error" });
};
// ctrlComprobantes.deleteComprobante = async(req, res) => {
//     const comprobante = await pool.query('SELECT * FROM comprobante WHERE id_comprobante = ?', [req.params.id]);
//     try {
//         await fs.unlink(path.join(__dirname, "../build" + comprobante[0].url_foto_comprobante));
//         const data = await pool.query('DELETE FROM comprobante WHERE id_comprobante = ?', [req.params.id]);
//         if (data.affectedRows === 1) return res.json({ success: `Comprobante Eliminado` }); //Se logró actualizar
//     } catch (error) {
//         return res.json({ error: "Ocurrió un error" });
//     }
// }

module.exports = ctrlComprobantes;
