module.exports=catch_async=>(req,res,next)=>{
    Promise.resolve(catch_async(req,res,next)).catch(next);
}