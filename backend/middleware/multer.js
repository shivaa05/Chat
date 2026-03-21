import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    console.log(file)
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); 
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
