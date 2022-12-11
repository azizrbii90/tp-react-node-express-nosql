const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const User = require('../../components/user/model')
require('dotenv').config()

module.exports = {

    async generateToken(params = {}, exprireInTime = '1d') {
        return jwt.sign(params, process.env.SECRET_KEY, {expiresIn: exprireInTime})
    },

    async verifyToken (token) {
        return jwt.verify(token, process.env.SECRET_KEY)
    },

    async argon2Hash(data) {
        return argon2.hash(data)
    },

    async comparePassword(expectedPassword, typedPassword) {
        return argon2.verify(expectedPassword, typedPassword)
    },

    authenticate (req, res, next)  {
     
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        
        if (!token) {
            res.status(403).json({ success: false, error: "no token provided" });
        } else {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.status(401).json({ success: false, message: "unauthenticated" });
                }
                req.userEmail = decoded.email;
                req.idUser = decoded.id
                next();
            });
        }
      }
}