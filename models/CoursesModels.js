const mongoose = require('mongoose')

//definir el modelo para los bootcamps

const coursesSchema = mongoose.Schema({
    title:{
        type:String,
        unique:[true, "nombre de courses debe ser unico"],
        required:[true, "nombre de courses requerido"],
        maxlength:[30, "longitud de nombre menos a 50"],
        minlength: [10, "logintud de nombre menor"]
    },
    description:{
        type:String,
        maxlength: [10, "longitus de telefono menor a 10 "]
    },
    weeks:{
        type: Number,
        required:[true, "direccion requerido"],
        maxlength: [9, "longitus de telefono menor a 10 "]

    },
    enroll_cost:{
        type: Number,
        required:[true, "numero requerido"],
    },
    minimun_skill:{
        type: String,
        required:[true, "direccion requerido"],
        enum: [
            "Beginner",
            "Intermediate",
            "Advance",
            "Expert"
        ]
    },

    averageRating: Number,
    createdAt:Date
})

module.exports = mongoose.model('Courses',
                                coursesSchema)