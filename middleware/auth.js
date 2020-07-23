const jwt = require('jsonwebtoken')
const fileUpload = require('express-fileupload')


const auth = (req, res, next)=>{
    try {


        const token = req.header("x-auth-token")
        if (!token)
            return res.status(401)
    const verified = jwt.verify(token,process.env.JWT_TOKEN)
    if(!verified)
        return res.status(401).json("token error")
    req.user = verified.id
    next();
    }
    catch(err)
    {
        res.status(500);
    }
}
module.exports = auth