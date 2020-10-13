const jwt = require("jsonwebtoken");
const keys = require("../jwtkey");

function authorize(...roles) {
    return (request, response, next) => {
        const bearerToken = request.header("Authorization");
        // console.log("In autorize",roles);
        if (bearerToken!=undefined) {
            const token = bearerToken.split(" ")[1];
            jwt.verify(token, keys.jwtSecret, (err, data) => {
                if (err) {
                    response.status(403);
                    response.send("Unathorized access");
                }
                else {
                    const role = data['role'];
                    console.log("IN authorize", role);
                    if (roles.includes(role)) {                        
                        next();
                    }
                    else {
                        response.status(403);
                        response.send("Unathorized access");
                    }
                }
            })
        }
        else {
            response.status(403);
            response.send("Unathorized access");
        }

    }
}

module.exports = authorize;