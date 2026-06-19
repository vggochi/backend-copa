import express from "express";

import supabase from "../supabase.js";


const router=express.Router();



// VER CARRINHO

router.get("/:usuario",async(req,res)=>{


const {data,error}=await supabase

.from("carrinho")

.select(`

*,

produtos(*)

`)

.eq(

"usuario_id",

req.params.usuario

);



res.json(data);


})





// ADICIONAR AO CARRINHO


router.post("/",async(req,res)=>{


const {data,error}=await supabase

.from("carrinho")

.insert(req.body)

.select();



res.json(data);


})





// ALTERAR QUANTIDADE


router.put("/:id",async(req,res)=>{


const {data,error}=await supabase

.from("carrinho")

.update({

quantidade:req.body.quantidade

})

.eq("id",req.params.id)

.select();



res.json(data);


})





// REMOVER


router.delete("/:id",async(req,res)=>{


await supabase

.from("carrinho")

.delete()

.eq(

"id",

req.params.id

);



res.json({

message:"removido"

})


})



export default router;