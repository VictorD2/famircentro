const router = require('express').Router();
const ctrlusuariocurso = require('../controllers/usuariocurso.controllers');
const { isAdmin, typePetition } = require('../lib/auth');

router.get('/estudiante/:idEstudiante', [typePetition], ctrlusuariocurso.getUsuariocursoByIdEstudiante);
router.get('/curso/:idCurso', ctrlusuariocurso.getUsuariocursoByIdCurso);
router.post('/', ctrlusuariocurso.createUsuariocurso);
router.delete('/:id', ctrlusuariocurso.deleteUsuariocurso);

module.exports = router;