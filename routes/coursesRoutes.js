const express = require('express')
const mongoose=require('mongoose')
const coursesModel=require('../models/CoursesModels')
const router = express.Router()

//traer todos los curses
router.get('/' , 
        async(request , response)=> { 

            try {
               //traer todos los courses
                const courses = 
                await coursesModel.find()

                if(courses.length === 0){
                    return response.
                        status(404).
                        json({
                            success: false,
                            msg: "no hay courses disponible"
                        })
                }

                response
                .status(200)
                .json({
                        "success" : true,
                        "results":courses
                    })

            } catch (error) {
                response
                    .status(500)
                    .json({
                    success: false,
                    msg: "Error interno de servidor"
                })
            }
        })
//traer curses por id
router.get('/:id',
async(request,response)=>{
    try {
        const coursesId= request.params.id
        if(!mongoose.Types.ObjectId.isValid(coursesId)){
            response
            .status(500)
            .json({
                "success": false,
                msg:"identificador invalido"
            })
        }else{ 
        
        const selected_courses =
        await coursesModel.findById(coursesId)

        if (!selected_courses) {
            response
                .status(404)
                .json({
                    success:false,
                    msg:`No se halló el courses con id:${coursesId} `
            })
        

        }
        else{
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results": selected_courses
                    })
        } 
    }
    } catch (error) {
        response.status(500)
        .json({
            
            success: false,
            msg:error.message
        })
    }     
})
//crear curses
router.post('/',
async (request,response)=>{
    try{
            const courses= await coursesModel.
            create(request.body)
            response
            .status(201)
            .json({
                "success": true,
                "data" : courses
            })
        } catch (error) {
                response.status(500)
                .json({
                    success: false,
                    msg:error.message
                })
    }
    
})
//actualizar curses por id
router.put('/:id',
async(request,response)=>{

    try {

        const coursesId = request.params.id
        if(!mongoose.Types.ObjectId.isValid(coursesId)){
            response 
            .status(500)
            .json({
            success : false,
            msg: "Identificador invalido"
        })
    }else{

        const selected_courses = await coursesModel.findByIdAndUpdate(
            coursesId,
            request.body,
            {
                new:true
            }
        )
        if(!selected_courses){
                    response
                            .status(404)
                            .json({
                                success: true,
                                msg: `No se hallo el courses con id: ${coursesId}`
                            })
                        } else {
                            response 
                            .status(200)
                            .json({
                                "success" : true,
                                "results" : selected_courses
                            })
        } 


    }
            } catch(error){
                response
                .status(500)
                .json({
                    success:false,
                    msg:error.message
                })
            }
        })
//eliminar curses por id
router.delete('/:id',
async(request,response)=>{
    try {
        const coursesId= request.params.id
        if(!mongoose.Types.ObjectId.isValid(coursesId)){
            response
            .status(500)
            .json({
                "success": false,
                msg:"identificador invalido"
            })
        }else{ 
        
        const selected_courses =
        await coursesModel.
        findByIdAndDelete(coursesId)

        if (!selected_courses) {
            response
                .status(404)
                .json({
                    success:false,
                    msg:`No se halló el courses con id:${coursesId} `
            })
        

        }
        else{
            response
                .status(200)
                .json({
                    "success": true,
                    "results":[]  
            })
        } 
    }
    } catch (error) {
        response.status(500)
        .json({
            
            success: false,
            msg:error.message
        })
    }     
})

module.exports=router