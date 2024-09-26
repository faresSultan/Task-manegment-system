const jwt = require('jsonwebtoken');
const User = require('../models/user')

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.secret_key);
        const decoded_username = decoded.name; 
        const user = await User.findOne({username : decoded_username});
        if(user){
            req.user = user;
            next();
        } else {
            return res.status(401).json({ message: "Access Denied." });
        }
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = authenticateToken;
