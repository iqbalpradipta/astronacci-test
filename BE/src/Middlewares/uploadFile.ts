import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/Upload");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const FileToString = file.fieldname + "-" + uniqueSuffix
    cb(null, FileToString);
  },
});

export const upload = multer({ storage: storage });
