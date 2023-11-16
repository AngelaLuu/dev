const mongoose = require('mongoose')

//definir el modelo para los bootcamps

const bootcampSchema = mongoose.Schema({
    name:{
        type:String,
        unique:[true, "nombre de bootcamp debe ser unico"],
        required:[true, "nombre de bootcamp requerido"],
        maxlength:[50, "longitud de nombre menos a 50"]
    },
    phone:{
        type:Number,
        maxlength: [10, "longitus de telefono menor a 10 "]
    },
    address:{
        type: String,
        required:[true, "direccion requerido"],
    },
    topics:{
        type: [String],
        enum: [
            "AI",
            "Frontenda/UX",
            "Backend",
            "DevOps"
        ]
    },
    averageRating: Number,
    createdAt:Date
})

module.exports = mongoose.model('Bootcamp',
                                bootcampSchema)