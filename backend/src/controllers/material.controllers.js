const pool = require("../database");
const ctrlEstudiantes = {};
const helpers = require("../lib/helpers");
const fs = require("fs-extra");
const path = require("path");

//.get('/:id')
ctrlEstudiantes.getMaterialByTemaId = async (req, res) => {
  const { id } = req.params;
  const rows = await pool.query("SELECT * FROM material_clase WHERE id_tema = ?", [id]);
  res.json(rows);
};

//.post('/')
ctrlEstudiantes.createMaterial = async (req, res) => {
  const { id_tema } = req.body;
  let values = `VALUES `;

  for (let i = 0; i < req.files.material.length; i++) {
    const url_material_clase = `/uploads/material/${req.files.material[i].filename}`;
    values += ` (NULL, '${url_material_clase}', '${id_tema}'),`;
  }

  const sqlValues = values.slice(0, values.length - 1);
  const rows = await pool.query(`INSERT INTO material_clase (id_material_clase, url_material, id_tema) ${sqlValues};`);

  if (rows.affectedRows > 0) return res.json({ success: "Material agregado." }); //Se logró registrar

  return res.json({ error: "Ocurrió un error" });
};

//.delete('/:id')
ctrlEstudiantes.deleteMaterial = async (req, res) => {
  const material = await pool.query("SELECT * FROM material_clase WHERE id_material_clase = ?", [req.params.id]);
  await fs.unlink(path.join(__dirname, "../build" + material[0].url_material));
  const rows = await pool.query("DELETE FROM material_clase WHERE id_material_clase = ?", [req.params.id]);

  if (rows.affectedRows === 1) return res.json({ success: "Material Eliminado" }); //Se logró registrar

  return res.json({ error: "Ocurrió un error" });
};

module.exports = ctrlEstudiantes;
