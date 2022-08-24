const { verify, JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken")
const { SECRET_KEY } = process.env

module.exports = (req, res, next) => {
    const { access_token } = req.headers;
    
    if(!access_token) {
        return res.status(401).json({message: "token not found"})
    } 

    verify(access_token, SECRET_KEY, (error, decode) => {
        if (error instanceof JsonWebTokenError) {
            return res.status(400).json({
                message: "token invalid"
            })
        }

        if (error instanceof TokenExpiredError) {
            return res.status(400).json({ message: "Token expired"})
        }
        
        req.id = decode.id
        next()
    })
}