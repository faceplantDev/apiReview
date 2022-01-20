const jwt = require(`jsonwebtoken`)

module.exports = function (req, res, next) {
    if(req.method == "OPTIONS") next()

    try {
        const token = req.headers.authorization.split(" ")[1]
        if(!token) return res.status(403).json({message: "User not authenticated"}) 
        
        const decoded = jwt.verify(token, `MAJESTIC`)
        req.user = decoded

        next()
    } catch(e) {
        return res.status(403).json({message: "User not authenticated"})
    }
}