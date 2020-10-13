const mongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");

const keys = require("./../jwtkey");
const dbUrl = keys.db.dbUrl;
const dbName = keys.db.dbName;
const collectionName = "users";

function authenticate(request, response) {
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            console.log("Unable to connecto to db", err);
            response.status(500);
            response.send("Unable to connecto to db");
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if (err) {

                    response.status(500);
                    response.send("Unable to connect to collection")
                }
                else {
                    const query = JSON.parse(request.headers.user);
                    //console.log(request.headers.user);
                    coll.findOne(query, { projection: { 'password': 0 } }, (err, res) => {
                        if (err) {

                            response.status(500)
                            response.send("Error while fetching user");
                        }
                        else if (res) {
                            response.status(200);
                            const token = jwt.sign(res, keys.jwtSecret);
                            // console.log(token);
                            response.send({ token });
                        }
                        else {

                            response.status(401);
                            response.send("User not found");
                        }
                    })
                }
            })
        }
    })
}

module.exports = { authenticate }