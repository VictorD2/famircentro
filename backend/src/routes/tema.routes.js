const router = require('express').Router();
const ctrlTema = require('../controllers/tema.controllers');
const { isAdmin, typePetition } = require('../lib/auth');
const upload = require('../lib/multer');

router.get('/:id', ctrlTema.getTemaByModuloId);
router.get('/idTema/:id', ctrlTema.getTemaById);


router.put('/:id', function(req, res, next) {
    upload.videos.single('video')(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlTema.actualizarTema);

router.delete('/:id', ctrlTema.eliminarTema);

router.post('/', function(req, res, next) {
    upload.videos.single('video')(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlTema.createTema);

module.exports = router;