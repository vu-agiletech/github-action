export function createFileName(req: any, file: any, cb: any) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const fileExtName = file.originalname.split('.')[1];
  cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtName);
}
