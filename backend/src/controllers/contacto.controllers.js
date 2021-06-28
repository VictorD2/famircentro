const pool = require('../database');
const ctrlContacto = {};
const nodemailer = require('nodemailer');

ctrlContacto.createContacto = async(req, res) => {
    const { name, email, message } = req.body;
    const newContacto = {
            nombre: name,
            correo: email,
            mensaje: message
        }
        // let contentHTML = `  
        //     <h1>User Information</h1>
        //     <ul>
        //         <li>Username: ${newContacto.nombre}</li>
        //         <li>User Email: ${newContacto.correo}</li>
        //     </ul>
        //     <p>${newContacto.mensaje}</p>`;
        // let transporter = nodemailer.createTransport({
        //     host: 'mail.fazttech.net',
        //     port: 587,
        //     secure: false,
        //     auth: {
        //         user: 'testtwo@fazttech.net',
        //         pass: 'testtwocontraseña'
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // });

    // let info = await transporter.sendMail({
    //     from: `<${newContacto.correo}>`, // sender address,
    //     to: 'victorhv2729@gmail.com',
    //     subject: 'Mensaje Web de contacto',
    //     // text: 'Hello World'
    //     html: contentHTML
    // })
    // console.log('Message sent: %s', info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    const rows = await pool.query('INSERT INTO contactos SET ?', [newContacto]);
    if (rows.affectedRows === 1) return res.json({ success: "Mensaje Enviado" }); //Se logró registrar
    return res.json({ error: "Ocurrió un error" });
}

ctrlContacto.getContactos = async(req, res) => {
    const cantidadDatos = 12;
    console.log(req.params.page)
    const pagina = (req.params.page - 1) * cantidadDatos;
    const rows = await pool.query('SELECT * FROM contactos');
    res.json(rows.splice(pagina, cantidadDatos));
}
ctrlContacto.getCount = async(req, res) => {
    const rows = await pool.query('SELECT COUNT(*) FROM contactos');
    if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"])
    return res.json({ error: "Ocurrió un error" });
}

ctrlContacto.getContactoById = async(req, res) => {
    const rows = await pool.query('SELECT * FROM contactos WHERE id_contacto = ?', [req.params.id]);
    if (rows[0]) return res.json(rows[0]);
    return res.json({ error: "No existe al mensaje de contacto" });
}

// ctrlContacto.updateServicio = (req, res) => {}

ctrlContacto.deleteContacto = async(req, res) => {
    const rows = await pool.query('DELETE FROM contactos WHERE id_contacto = ?', [req.params.id])
    if (rows.affectedRows === 1) return res.json({ success: `Mensaje eliminado` }); //Se logró actualizar
    return res.json({ error: "Ocurrió un error" });
}



module.exports = ctrlContacto;