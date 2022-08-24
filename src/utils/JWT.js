const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

module.exports = payload => jwt.sign(payload, SECRET_KEY, {expiresIn: '1d'})