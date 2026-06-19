import express from "express";

import supabase from "../supabase.js";


const router = express.Router();



// GET TODOS PRODUTOS

router.get("/", async(req,res)=>{


const {data,error}=await supabase

.from("produtos")

.select("*");



if(error)

return res.status(400).json(error);



res.json(data);


})





// GET PRODUTO POR ID


router.get("/:id", async(req,res)=>{


const {id}=req.params;


const {data,error}=await supabase

.from("produtos")

.select("*")

.eq("id",id)

.single();



if(error)

return res.status(400).json(error);



res.json(data);


})





// POST CRIAR PRODUTO


router.post("/",async(req,res)=>{


const produto=req.body;



const {data,error}=await supabase

.from("produtos")

.insert(produto)

.select();



if(error)

return res.status(400).json(error);



res.json(data);


})






// PUT ATUALIZAR PRODUTO


router.put("/:id",async(req,res)=>{


const {id}=req.params;


const {data,error}=await supabase

.from("produtos")

.update(req.body)

.eq("id",id)

.select();



if(error)

return res.status(400).json(error);



res.json(data);



})







// DELETE PRODUTO


router.delete("/:id",async(req,res)=>{


const {id}=req.params;



const {error}=await supabase

.from("produtos")

.delete()

.eq("id",id);



if(error)

return res.status(400).json(error);



res.json({

message:"Produto removido"

})



})



export default router;