const fs = require("fs");
const path = require("path");
const multer = require("multer");
const createHttpError = require("http-errors");
const createRoute = (req) => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = String(Number(date.getMonth().toString()) + 1);
    const day = date.getDay().toString();
    const directory = path.join(__dirname,"..", "..", "public", "uploads", "blog", year, month, day);
    req.body.fileUploadPath = path.join("uploads", "blog", year, month, day);
    fs.mkdirSync(directory, {recursive: true});
    return directory
}

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        if(file?.originalname){
            const filePath = createRoute(req);
            return cb(null, filePath)
        }
        cb(null, null)
    },
    filename: (req, file, cb) =>{
        if(file.originalname){
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext)
            req.body.filename = fileName;
            return cb(null, fileName)
        }
        cb(null, null)
    }
})
function fileFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimetypes = [".png", ".jpg", ".jpeg", ".webp"];
    if(mimetypes.includes(ext)){
        return cb(null, true)
    }
    return cb(createHttpError.BadRequest("فرمت ارسال شده صحیح نمی باشد"))
}

const maxSize = 1 * 1000 * 1000;
const uploadFile = multer({storage, fileFilter, limits: {fileSize: maxSize}});
module.exports = {
    uploadFile
}