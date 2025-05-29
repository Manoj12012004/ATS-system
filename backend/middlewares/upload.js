const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

const filefilter=(req,file,cb)=>{
    const allowedTypes=['.pdf','.doc','.docx']
    const ext=path.extname(file.originalname).toLowerCase();
    if(allowedTypes.includes(ext))cb(null,true);
    else cb(new Error('File type not allowed'),false);
}

const upload=multer({
    storage:storage,
    fileFilter:filefilter
});

module.exports=upload;