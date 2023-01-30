const fs = require("fs");
const path = require("path");
const multer = require("multer");
const createHttpError = require("http-errors");
const createRoute = (req) => {
    let folder = req.baseUrl.split("/")[1]
    if(folder == 'admin') folder = req.baseUrl.split("/")[2]
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = String(Number(date.getMonth().toString()) + 1);
    const day = date.getDay().toString();
    const directory = path.join(__dirname,"..", "..", "public", "uploads", folder, year, month, day);
    req.body.fileUploadPath = path.join("uploads", folder, year, month, day);
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
function videoFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimetypes = [".mp4", ".mpg", ".avi", ".mov", ".mkv"];
    if(mimetypes.includes(ext)){
        return cb(null, true)
    }
    return cb(createHttpError.BadRequest("فرمت ویدئو ارسال شده صحیح نمی باشد"))
}

const pictureMaxSize = 1 * 1000 * 1000; //1MB
const videoMaxSize = 300 * 1000 * 1000; //300MB
const uploadFile = multer({storage, fileFilter, limits: {fileSize: pictureMaxSize}});
const uploadVideo = multer({storage, videoFilter, limits: {fileSize: videoMaxSize}});
module.exports = {
    uploadFile,
    uploadVideo
}