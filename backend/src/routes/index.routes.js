const router = require('express').Router();
const path = require('path');
const pool = require('../database');
router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../build', 'index.html'));
});
router.get('/succesful', (req, res) => {
    res.json({message:"logueado"}).status(200);
});
router.get('/Nosotros', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
router.get('/Contactanos', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
router.get('/Programa', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
router.get('/Register', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

module.exports = router;