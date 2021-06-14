const router = require('express').Router();
const ctrlusuariocurso = require('../controllers/usuariocurso.controllers');
const { isAdmin, typePetition } = require('../lib/auth');

router.get('/', [typePetition], ctrlusuariocurso.getUsuariocurso);
router.get('/:id', ctrlusuariocurso.getUsuariocursoById);
router.post('/', ctrlusuariocurso.createUsuariocurso);
router.delete('/:id', ctrlusuariocurso.deleteUsuariocurso);

module.exports = router;