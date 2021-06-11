const router = require('express').Router();
const ctrlCursos = require('../controllers/cursos.controllers');
const { isAdmin, typePetition } = require('../lib/auth');
const upload = require('../lib/multer');

router.get('/all/:tipo/:modalidad', [typePetition], ctrlCursos.getCursos);
router.get('/:id', ctrlCursos.getCursoById);
router.get('/sub/:idTema', ctrlCursos.verificarSub);
router.post('/', function(req, res, next) {
    upload.fotosCursos.single('fotoCurso')(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlCursos.createCurso);

router.put('/:id', function(req, res, next) {
    upload.fotosCursos.single('fotoCurso')(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlCursos.updateCurso);

router.delete('/:id', ctrlCursos.deleteCurso);

module.exports = router;