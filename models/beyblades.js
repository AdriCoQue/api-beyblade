const mongoose = require('mongoose')
//Estructura basica de un "beyblade"
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    jpname: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    spin: {
        type: String,
        required: true
    },
    system: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    blader: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Beyblade', schema)