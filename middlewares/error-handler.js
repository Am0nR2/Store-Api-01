const handleErrorMiddleWare = (err,req,res,next) => {
    res.status(500).json("Unexpected Error, Please check your actions...")
}

module.exports = handleErrorMiddleWare