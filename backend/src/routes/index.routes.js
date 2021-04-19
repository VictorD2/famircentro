const router = require('express').Router();
const path = require('path');
const pool = require('../database');
const { isAdmin, typePetition } = require('../lib/auth');


router.get('/succesfulRegister',typePetition, (req, res) => {
    res.json(req.user).status(200);
});
router.get('/succesfulLogin',typePetition, (req, res) => {
    res.json(req.user).status(200);
});


router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


module.exports = router;