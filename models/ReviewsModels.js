const mongoose = require('mongoose')

//definir el modelo para los reviews

const reviewsSchema = mongoose.Schema({
    title:{
        type:String,
        unique:[true, "nombre de reviews debe ser unico"],
        required:[true, "nombre de reviews requerido"],
        maxlength:[20, "longitud de nombre menos a 20"]
    },
    text:{
        type:String,
        maxlength: [50, ""]
    },
    rating:{
        type:Number,
        required:[true, "direccion requerido"],
        maxlength:[10, ""],
        minlength:[1, ""]
    },
    averageRating: Number,
    createdAt:Date
})

module.exports = mongoose.model('Reviews',
                                reviewsSchema)