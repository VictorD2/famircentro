const pool = require('../database');
const ctrlModulos = {};
const helpers = require('../lib/helpers');

ctrlModulos.createModulo = async(req, res) => {
    const newModulo = req.body;
    const rows = await pool.query('INSERT INTO modulo set ?', [newModulo]);
    if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró registrar
    return res.json({ message: "failed" });
}

ctrlModulos.eliminarModulo = async(req, res) => {
    const rows = await pool.query('DELETE FROM modulo WHERE id_modulo = ?', [req.params.id]);
    if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró registrar
    return res.json({ message: "failed" });
}
ctrlModulos.actualizarModulo = async(req, res) => {
    newModulo = req.body;
    delete newModulo.temas;
    const rows = await pool.query('UPDATE modulo set ? WHERE id_modulo = ?', [newModulo, newModulo.id_modulo]);
    if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró registrar
    return res.json({ message: "failed" });
}

module.exports = ctrlModulos;