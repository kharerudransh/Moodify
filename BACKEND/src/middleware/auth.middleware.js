const jwt = require("jsonwebtoken");
const redis = require("../config/cache")

async function authUser(req, res, next) {
    try {
        //yaha pe ham token ko verify karenge 
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Invalid Token"
            })
        }
        // Check if token is blacklisted 
        const isBlackListed = await redis.get(token);
        if (isBlackListed) {
            return res.status(401).json({
                message: "Invalid Token"
            })
        }
        // agar token verify hogeya toh theek hai par agar expire hogeya ya koi aur problem aagayi toh kwt.verify ek error throw kartu hai 
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decode;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired, please login again" });
        }
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

}

module.exports = { authUser }