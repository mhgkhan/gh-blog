import multer from "multer";
import path from 'path';

export const uploadImg = (fieldname, foldername) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, CB) => CB(null,path.join(process.cwd(), `./raw/images/${foldername}/`)),
            filename: (req,file,CB)=> CB(null, `${fieldname}_${file.originalname}_${Date.now()}_ghblog_${Math.floor(Math.random()*2343453242345e5)}_${path.extname(file.originalname)}`)
        })
    }).single(fieldname);
}

