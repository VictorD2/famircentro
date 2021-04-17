const router = require('express').Router();
const ctrlVideos = require('../controllers/videos.controllers');

router.get('/', ctrlVideos.getUsers);
router.get('/:id', ctrlVideos.getUserById);
router.post('/', ctrlVideos.createUser);
router.put('/:id', ctrlVideos.updateUser);
router.delete('/:id', ctrlVideos.deleteUser);



module.exports = router;