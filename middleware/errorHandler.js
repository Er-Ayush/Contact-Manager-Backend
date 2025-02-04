const {constants}=require("../Constant.js/constants")

const errorHandler=(err,req,res,next)=>{
    const statusCode= res.statusCode ? res.statusCode:500
    switch(statusCode){
        case constants.FORBIDDEN:
            res.json({
                title:"Forbidden error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title:"NOT_FOUND",
                message: err.message,
                stackTrace: err.stack
            });
            break;  
        case constants.SERVER_ERROR:
                res.json({
                    title:"SERVER_ERROR",
                    message: err.message,
                    stackTrace: err.stack
                });
                break;
        case constants.UNAUTHORISED:
                res.json({
                    title:"UNAUTHORISED",
                    message: err.message,
                    stackTrace: err.stack
                });
                break;             
        case constants.VALIDATION_ERROR:
                    res.json({
                        title:"VALIDATION_ERROR",
                        message: err.message,
                        stackTrace: err.stack
                    });
                    break;        
    }
    console.error(err);
};

module.exports=errorHandler;