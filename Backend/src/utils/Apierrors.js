class Apierrors extends Error{
    constructor(statuscode,message="Something went Wrong",errors=[],stack=""){
        this.statuscode=statuscode
        this.message=message,
        this.errors=errors
        this.success=false
        if (stack) {
            this.stack=stack
        }   
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default Apierrors