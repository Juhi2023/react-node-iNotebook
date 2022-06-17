const jwt = require('jsonwebtoken')
const JWT_SECRET ='nefoiqjwfoajf3op'


const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error: 'please authenticate usind valid token'})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    }
    catch(err){
        res.status(401).send({error: 'please authenticate usind valid token'})
    }
    
}

module.exports =  fetchUser;