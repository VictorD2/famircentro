const pool = require("../database");
const ctrlTareaMaterial = {};
const helpers = require("../lib/helpers");

//.get("/:id")
ctrlTareaMaterial.getTareasByTareaId = async (req, res) => {
  const rows = await pool.query("SELECT nombre,apellido,fecha_entrega,id_material_tarea,url_material,id_tarea FROM material_tarea JOIN usuario ON usuario.id_usuario = material_tarea.id_usuario WHERE id_tarea = ?", [req.params.id]);
  res.json(rows);
};

//.post("/")
ctrlTareaMaterial.createTareaMaterial = async (req, res) => {
  const url_material_tarea = `/uploads/tareas/${req.files.material_tarea[0].filename}`;
  const { id_tarea } = req.body;
  const newTarea = {
    id_tarea,
    url_material: url_material_tarea,
    id_usuario: 45,
    fecha_entrega: new Date(),
  };
  const rows = await pool.query("INSERT INTO material_tarea set ?", [newTarea]);

  if (rows.affectedRows === 1) return res.json({ success: "Tarea Enviada" }); //Se logró registrar

  return res.json({ error: "Ocurrió un error" });
};

//.delete("/:id")
ctrlTareaMaterial.eliminarTareaMaterial = async (req, res) => {
  const rows = await pool.query("DELETE FROM material_tarea WHERE id_material_tarea = ?", [req.params.id]);

  if (rows.affectedRows === 1) return res.json({ success: "Tarea eliminada" }); //Se logró registrar

  return res.json({ error: "Ocurrió un error" });
};

module.exports = ctrlTareaMaterial;
