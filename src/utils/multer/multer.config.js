import multer from 'multer';
// type 1*****************
const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    // todo: put limit 10mb max.
    limits: { fileSize: 3e7 }, // 30mb 30 * 1024 * 1024
});

//type 2***********************

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/temp');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload1 = multer({
    storage: storage1,
});

//type 3*******************

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/png') {
            cb(null, path.join(__dirname, 'path'));
        }
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, file.name);
    },
});

const upload2 = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
});

//return**************
upload.single('avatar');
upload.array('photos', 12);
upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 },
]);
