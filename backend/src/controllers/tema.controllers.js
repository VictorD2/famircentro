const pool = require('../database');
const ctrlTema = {};
const helpers = require('../lib/helpers');

ctrlTema.createTema = async(req, res) => {
    console.log(req.files);
    // const rows = await pool.query('INSERT INTO tema set ?', [newModulo]);
    // if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró registrar
    return res.json({ message: "success" });
}

ctrlTema.eliminarTema = async(req, res) => {
    const rows = await pool.query('DELETE FROM modulo WHERE id_modulo = ?', [req.params.id]);
    if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró registrar
    return res.json({ message: "failed" });
}
ctrlTema.actualizarTema = async(req, res) => {
    newModulo = req.body;
    delete newModulo.temas;
    const rows = await pool.query('UPDATE modulo set ? WHERE id_modulo = ?', [newModulo, newModulo.id_modulo]);
    if (rows.affectedRows === 1) return res.json({ message: "success" }); //Se logró registrar
    return res.json({ message: "failed" });
}

module.exports = ctrlTema;