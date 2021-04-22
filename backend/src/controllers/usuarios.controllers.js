const pool = require('../database');
const ctrlUsuarios = {};


ctrlUsuarios.createUser = (req, res) => {

}

ctrlUsuarios.getUsers = async(req, res) => {
    const data = await pool.query('SELECT * FROM usuarios');
    res.json(data);
}

ctrlUsuarios.getUserById = (req, res) => {}

ctrlUsuarios.whoiam = async(req, res) => {
    if (req.user) {
        if (req.user.Correo) { //Local
            const rows = await pool.query('SELECT * FROM usuarios WHERE Correo = ?', [req.user.Correo]);
            res.json({ user: rows[0], authenticate: true });
        }
        if (req.user.emails) { //Facebook o Google
            const rows = await pool.query('SELECT * FROM usuarios WHERE Correo = ?', [req.user.emails[0].value]);
            res.json({ user: rows[0], authenticate: true });
        }
    } else {
        res.json({ message: "failed", authenticate: false }); //No autentificado
    }
}

ctrlUsuarios.updateUser = (req, res) => {}

ctrlUsuarios.deleteUser = (req, res) => {}



module.exports = ctrlUsuarios;