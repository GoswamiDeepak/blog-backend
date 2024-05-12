import multer from 'multer';
import path from 'path';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(path.resolve(__dirname));
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
export const upload = multer({ storage: storage });
