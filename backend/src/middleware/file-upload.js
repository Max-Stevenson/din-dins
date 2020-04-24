const multer = require('multer');
const uuid = require('uuid/v1');
let fs = require('fs-extra');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let path = 'src/images';
      fs.mkdirsSync(path);
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + '.' + ext);
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let err = isValid ? null : new Error('Invalid mime type');
    cb(err, isValid);
  }
});

module.exports = fileUpload;