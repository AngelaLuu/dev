const express = require('express')
const mongoose=require('mongoose')
const reviewModel=require('../models/ReviewsModels.js')
const router = express.Router()

//traer todos los reviews
router.get('/' , 
        async(request , response)=> { 

            try {
               //traer todos loos reviews
                const reviews = 
                await reviewModel.find()

                if(reviews.length === 0){
                    return response.
                        status(404).
                        json({
                            success: false,
                            msg: "no hay reviews disponible"
                        })
                }

                response
                .status(200)
                .json({
                        "success" : true,
                        "results":reviews
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

        //traer review por id

router.get('/:id',
async(request,response)=>{
    try {
        const reviewId= request.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            response
            .status(500)
            .json({
                "success": false,
                msg:"identificador invalido"
            })
        }else{ 
        
        const selected_reviews =
        await reviewModel.findById(reviewId)

        if (!selected_reviews) {
            response
                .status(404)
                .json({
                    success:false,
                    msg:`No se halló el review con id:${reviewId} `
            })
        

        }
        else{
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results": selected_reviews
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


//crear reviews
router.post('/',
async (request,response)=>{
    try{
            const reviews= await reviewModel.
            create(request.body)
            response
            .status(201)
            .json({
                "success": true,
                "data" : reviews
            })
        } catch (error) {
                response.status(500)
                .json({
                    success: false,
                    msg:error.message
                })
    }
    
})
//actualizar reviws por id
router.put('/:id',
async(request,response)=>{

    try {

        const reviewId = request.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            response 
            .status(500)
            .json({
            success : false,
            msg: "Identificador invalido"
        })
    }else{

        const selected_reviews = await reviewModel.findByIdAndUpdate(
            reviewId,
            request.body,
            {
                new:true
            }
        )
        if(!selected_reviews){
                    response
                            .status(404)
                            .json({
                                success: true,
                                msg: `No se hallo el review con id: ${reviewId}`
                            })
                        } else {
                            response 
                            .status(200)
                            .json({
                                "success" : true,
                                "results" : selected_reviews
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

//eliminar reviws por id
router.delete('/:id',
async(request,response)=>{
    try {
        const reviewId= request.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            response
            .status(500)
            .json({
                "success": false,
                msg:"identificador invalido"
            })
        }else{ 
        
        const selected_reviews =
        await reviewModel.
        findByIdAndDelete(reviewId)

        if (!selected_reviews) {
            response
                .status(404)
                .json({
                    success:false,
                    msg:`No se halló el review con id:${reviewId} `
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