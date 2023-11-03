const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ');
        jwt.verify(token[1], process.env.TOKENPASS, (err, data) => {
            if(data) {  
                if(data?.userData?.role === 2 || data?.userData?.role === 3) {
                    req.userId = data?.userData._id;
                    next();
                }else {
                res.status(401).json({ message : "Unauthorized User"});
                }
            }else { 
                res.status(401).json({ message : "Unauthorized User"});
            } 
        } )
    } catch (error) {
        res.status(500).json({ error : error.message})
    }
}
 
module.exports = auth;