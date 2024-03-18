const asynchandler = (reqhandler)=>{
    return (req,res,next) =>{
        Promise.resolve(reqhandler(res,req,next)).catch(error=>next(error))
    }
}

export default asynchandler