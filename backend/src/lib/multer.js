  const multer = require('multer');
  const path = require('path');

  // Settings
  const storage = multer.diskStorage({
      destination: path.join(__dirname, '../build/uploads/videos'),
      filename: (req, file, cb) => {
          const fecha = new Date();
          cb(null, `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}${file.originalname}`)
      }
  });


  module.exports = multer({ storage, dest: path.join(__dirname, '../build/uploads/videos') });