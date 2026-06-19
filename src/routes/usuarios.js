import express from "express";

import supabase from "../supabase.js";


const router = express.Router();



// LISTAR USUARIOS

router.get("/",async(req,res)=>{


const {data,error}=await supabase

.from("usuarios")

.select("*");


res.json(data);


})




// CRIAR USUARIO PERFIL


router.post("/",async(req,res)=>{


const {data,error}=await supabase

.from("usuarios")

.insert(req.body)

.select();



if(error)

return res.status(400).json(error);


res.json(data);


})




router.put("/:id",async(req,res)=>{


const {data,error}=await supabase

.from("usuarios")

.update(req.body)

.eq("id",req.params.id)

.select();


res.json(data);


})




router.delete("/:id",async(req,res)=>{


await supabase

.from("usuarios")

.delete()

.eq("id",req.params.id);



res.json({

message:"usuario deletado"

})


})



export default router;