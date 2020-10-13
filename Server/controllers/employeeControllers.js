const mongoClient = require("mongodb").MongoClient;

// const { ObjectID, ObjectId } = require("mongodb");
const keys = require("./../jwtkey");
const dbUrl = keys.db.dbUrl;
const dbName = keys.db.dbName;
const collectionName = "employees";
const ObjectId = require('mongodb').ObjectID;

function getEmployees(request, response) {
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {
            response.status(500);
            response.send("Unable to connecto to db");
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if (err) {
                    response.status(500);
                    response.send("Unable to connect to collection");
                }
                else {
                    coll.find({}).toArray((err, res) => {
                        if (err) {
                            response.status(500);
                            response.send("Error while fetching records");
                        }
                        else if (res) {
                            response.status(200);
                            response.send(res);
                        }
                        else {
                            response.status(204);
                            response.send("No records found");
                        }
                    })
                }
            })
        }
    })
}

function deleteEmployee(request, response) {
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {

            response.status(500);
            response.send("Unable to connecto to db");
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if (err) {

                    response.status(500);
                    response.send("Unable to connect to collection");
                }
                else {
                    console.log(request);
                    let _id = ObjectId(request.query.id);
                    coll.findOneAndDelete({_id:_id}, (err, res) => {
                        if (err) {
                            response.status(500);
                            response.send("Error while deleting records");
                        }
                        else if (res) {
                            response.status(200);
                            response.send(res);
                        }
                        else {
                            response.status(204);
                            response.send("No records found");
                        }
                    })
                }
            })
        }
    })
}

function updateEmployee(request, response) {
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {

            response.status(500);
            response.send("Unable to connecto to db");
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if (err) {

                    response.status(500);
                    response.send("Unable to connect to collection");
                }
                else {
                    const employee = request.body;
                    const _id = ObjectId(employee['_id']);
                    delete employee._id;
                    employee['contactNumber'] = parseInt(employee['contactNumber']);
                    employee['department'] = employee['department'];
                    employee['name']= employee['name'];
                    coll.updateOne({ _id }, { $set: employee }, (err, res) => {
                        if (err) {
                            response.status(500);
                            response.send("Error while updating records");
                        }
                        else if (res) {
                            response.status(200);
                            response.send(res);
                        }
                        else {
                            response.status(204);
                            response.send("No records found");
                        }
                    })
                }
            })
        }
    })
}

function addEmployee(request, response) {
    mongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, dbHost) => {
        if (err) {

            response.status(500);
            response.send("Unable to connecto to db");
        }
        else {
            let db = dbHost.db(dbName);
            db.collection(collectionName, (err, coll) => {
                if (err) {

                    response.status(500);
                    response.send("Unable to connect to collection");
                }
                else {
                    const employee = request.body;
                    employee['contactNumber'] = parseInt(employee['contactNumber']);
                    employee['department'] = employee['department'];
                    employee['name']= employee['name'];
                    coll.insertOne(employee, (err, res) => {
                        if (err) {
                            response.status(500);
                            response.send("Error while updating records");
                        }
                        else if (res) {
                            response.status(201);
                            response.send(res);
                        }
                    })
                }
            })
        }
    })
}

module.exports = { getEmployees, deleteEmployee, updateEmployee, addEmployee }