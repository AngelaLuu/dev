const express = require('express');
const router= express.Router();
const usersModel=require('../models/UsersModels.js')

router.post('/register', 
async(req, res)=>{
    try{

    const users=
            await usersModel.create(req.body)
        res.
        status(201).
        json({
            success:true,
            msg:"user successfully registered",
            token:users.ObtenerJWT()
        }) 
    }catch(err){
        res.
            status(400).
            json({
                success:false,
                message:err.message
            })
    }
})

router.post('/Login',
    async (req, res) => {
        //desestructuracion
        // - objetos
        // - arreglos
        const {email, password} = req.body;
        //si no llega email o password
        if (!email || !password) {
            res.
                status(400).
                json({
                    success: false,
                    message: "debe ingresar email o password"
                })
        } else {
            try {
                //encontrar usuario que tenga el email
                const user = await usersModel
                                            .findOne({email})
                                            .select("+password")

                //console.log(user)
                if(!user) {
                    res.
                        status(400).
                        json({
                            success: false,
                            message: "no se encontró el usuario"
                })
                } else {

                    //console.log(password)
                        const isMatch = await user
                                        .comparePassword(password)
                        if(!isMatch){
                            res.
                                status(400).
                                json({
                                success: false,
                                msg: "contraseña incorrecta"
                            })
                        } else {
                            res.
                            status(200).
                            json({
                                success: true,
                                msg: "Login correcto"
                            })
                    } 

                }


            } catch (error) {

            }
        }
    }

)

/*const mongoose=require('mongoose')
const router = express.Router()

//traer todos los users
router.get('/' , 
        async(request , response)=> { 

            try {
               //traer todos loos users
                const users = 
                await usersModel.find()

                if(users.length === 0){
                    return response.
                        status(404).
                        json({
                            success: false,
                            msg: "no hay users disponible"
                        })
                }

                response
                .status(200)
                .json({
                        "success" : true,
                        "results":users
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

 //traer user por id

router.get('/:id',
async(request,response)=>{
    try {
        const userId= request.params.id
        if(!mongoose.Types.ObjectId.isValid(userId)){
            response
            .status(500)
            .json({
                "success": false,
                msg:"identificador invalido"
            })
        }else{ 
        
        const selected_users =
        await usersModel.findById(userId)

        if (!selected_users) {
            response
                .status(404)
                .json({
                    success:false,
                    msg:`No se halló el user con id:${userId} `
            })
        

        }
        else{
            response
                    .status(200)
                    .json({
                        "success": true,
                        "results": selected_users
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
//crear user
router.post('/',
async (request,response)=>{
    try{
            const user= await usersModel.
            create(request.body)
            response
            .status(201)
            .json({
                "success": true,
                "data" : user
            })
        } catch (error) {
                response.status(500)
                .json({
                    success: false,
                    msg:error.message
                })
    }
    
})
//actualizar users por id
router.put('/:id',
async(request,response)=>{

    try {

        const userId = request.params.id
        if(!mongoose.Types.ObjectId.isValid(userId)){
            response 
            .status(500)
            .json({
            success : false,
            msg: "Identificador invalido"
        })
    }else{

        const selected_users = await usersModel.findByIdAndUpdate(
            userId,
            request.body,
            {
                new:true
            }
        )
        if(!selected_users){
                    response
                            .status(404)
                            .json({
                                success: true,
                                msg: `No se hallo el review con id: ${userId}`
                            })
                        } else {
                            response 
                            .status(200)
                            .json({
                                "success" : true,
                                "results" : selected_users
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
//eliminar users por id
router.delete('/:id',
async(request,response)=>{
    try {
        const userId= request.params.id
        if(!mongoose.Types.ObjectId.isValid(userId)){
            response
            .status(500)
            .json({
                "success": false,
                msg:"identificador invalido"
            })
        }else{ 
        
        const selected_users =
        await usersModel.
        findByIdAndDelete(userId)

        if (!selected_users) {
            response
                .status(404)
                .json({
                    success:false,
                    msg:`No se halló el review con id:${userId} `
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
})*/

module.exports=router