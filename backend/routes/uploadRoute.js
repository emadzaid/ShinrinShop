
const path = require('path');
const express = require('express')
const multer  = require('multer')
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },

    filename: function (req, file, cb) {
        cb(null, `photos-${Date.now()}-${Math.random().toString(36).substring(7)}-${file.originalname}`);
    }
})

const checkFileType = (file, cb) => {
    const filetypes = /png|jpg|jpeg/;
    const mimetypes = /image\/jpeg|image\/png|image\/webp/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if(extname && mimetype) {
        cb(null, true);
    } else {
      cb(new Error('Images only!'), false);
    }
}
  
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
    limits: { files: 7 },
});

  router.post('/', upload.array('photos', 7), (req, res) => {
   
    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        
        const files = req.files.map(file => {
            // Generate the image URL dynamically
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
            
            return {
                image: imageUrl // Include image URL in the response
            };

        });

        res.status(200).json({
            message: 'Images uploaded successfully',
            files
        });
    

    } catch (error) {
        console.log('Upload Error:', error.message);
        res.status(500).json({ message: 'An error occurred during file upload', error: error.message });
    }
});

  module.exports = router;
