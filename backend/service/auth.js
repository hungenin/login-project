const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        try {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            const user_dto = jwt.verify(token, config.TOKEN_KEY);
            
            req.token = token;
            req.user_dto = {
                user_name: user_dto.user_name
            };
            
            return res.json({
                message: "success",
                token: req.token,
                user: req.user_dto
            });
        } catch (err) {
        }
    }
    return next();
};

module.exports = verifyToken;