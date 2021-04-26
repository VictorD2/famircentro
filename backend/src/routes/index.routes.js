const router = require('express').Router();
const path = require('path');
const pool = require('../database');
const { isAdmin,isLoggedIn,isNotLoggedIn } = require('../lib/auth');

router.get('/Login', [isNotLoggedIn], (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})
router.get('/Register', [isNotLoggedIn], (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})
router.get('/Dashboard/:id',[isLoggedIn, isAdmin], (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})
router.get('/Dashboard', [isLoggedIn, isAdmin], (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})

router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


module.exports = router;