import { getUserId } from "../utils/jwt.js"

const isAuth = (req, res, next) => {
    const token = req.headers.authorization
    
    if(!token) {
        return res.send({message: 'Auth failed...'})
    }

    try {
        const data = getUserId(token)
        req.userId = data.userId;
        next();

    } catch {
        res.send({message: 'Auth failed...'})
    }
    
}

export default isAuth