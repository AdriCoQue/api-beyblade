//Codigo para subir archivos
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./files/images") //Carpeta destino
    },
    filename: function(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) //Nombre de archivo
    }
})

const upload = multer({storage: storage})

module.exports = upload