let {logger}=require("../helper/wisnston")
let {add,updated,search}= require("../model/categotirsModel")

async function addcategory(req,res){

    let check = await add(req.body,req.userData).catch((err)=>{
      logger.error(err,"/api/v1/update/category",req.body)
        return {error:err}})

    if(!check || check.error){(console.log(check.error))
       return res.status(500).send({error:check.error})
    }
  return res.status(200).send({data:check})
}

async function updatedcategory(req,res){

  let check = await updated(req.body,req.userData).catch((err)=>{
      
      return {error:err}})

  if(!check || check.error){
        console.log(check.error)
     return res.status(500).send({error:check.error})
  }
  return res.status(200).send({data:check})
}

async function findcategory(req,res){
  let check = await search(req.body,req.userData).catch((err)=>{
    return {error:err}
  })

  if(!check || check.error){
    return res.status(500).send({error:check.error})
  }

  return res.status(200).send({data:check})
}



module.exports={addcategory,updatedcategory,findcategory}