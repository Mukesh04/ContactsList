var express = require('express');

//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
var bodyParser = require('body-parser');

//DataBase connections
var mongoose = require('mongoose');
var apiRoutes = express.Router();

    //Mongoose queries are not promises. However, they do have a .then() function for yield and async/await.
    mongoose.Promise = require('bluebird');

    var app = express();

    app.use(bodyParser.urlencoded({ extended: false }));

    //to consume json
    app.use(bodyParser.json());

    //connection to mongoose
    mongoose.connect('mongodb://localhost:27017/mydb');

    //connecting Schema with mongoose

        //Everything in Mongoose starts with a Schema.
        // Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
        var Schema = mongoose.Schema;


        //creating User schema
        var userSchema = new Schema({

            firstname: {type:String},
            lastname: {type:String},
            gender: {type:String},
            street: {type:String},
            city: {type:String},
            state: {type:String},
            phone:{type:String}
        });

        //METHODS


        //Models are defined by passing a Schema instance to mongoose.model
        //model
        var User = mongoose.model('student', userSchema);



        //express routes
        app.use('/',express.static(__dirname + '/../public'));


                //read the data
                app.get('/student', function(req, res) {


                    //I query IS passed into .find(), filters by the query parameters
                        User.find({}, function (err, user) {
                            if (err) {
                                res.status(500).send(err)
                            } else {
                                // send the list of all people in database with name of "John James" and age of 36
                                // Very possible this will be an array with just one Person object in it.
                                res.send(user);
                            }
                        });


                        // find one

                        // User.findOne(
                        //     {"name": "Mukesh-dude", "username": "Jain"},  // query
                        //     {"name": true, "owner": true},  // Only return an object with the "name" and "owner" fields. "_id" is included by default, so you'll need to remove it if you don't want it.
                        //     function (err, kitten) {
                        //         if (err) {
                        //             res.send(err)
                        //         }
                        //         if (kitten) {  // Search could come back empty, so we should protect against sending nothing back
                        //             res.send(kitten);
                        //             console.log(kitten);
                        //         } else {  // In case no kitten was found with the given query
                        //             res.send("No kitten found")
                        //         }
                        //     }
                        // );
                });


                //Read Data By Id
                app.get('/student/id/:id', function(req, res) {

                console.log("get By Id");
                //find by Id

                    // Common RESTful way to get the Id is from the url params in req.params

                User.findById(req.params.id, function (err, kitten) {
                        var myObjectId = mongoose.Types.ObjectId(req.param.id);

                        if (err) {
                            res.send(err)
                        }
                        if (kitten) {
                            console.log("get By Id Sucess");
                            kitten.firstname = req.body.firstname;
                            kitten.lastname = req.body.lastname;
                            kitten.gender = req.body.gender;
                            kitten.street = req.body.street;
                            kitten.city = req.body.city;
                            kitten.state = req.body.state;
                            kitten.phone = req.body.phone;

                            console.log("get By Id Sucess" + res.send(kitten));
                        } else {
                            res.send("No kitten found with that ID")
                        }
                    });
                });



                //write the data

                app.post('/student', function(req, res) {
                    var user = new User();

                    user.firstname = req.body.firstname;
                    user.lastname = req.body.lastname;
                    user.gender = req.body.gender;
                    user.street = req.body.street;
                    user.city = req.body.city;
                    user.state = req.body.state;
                    user.phone = req.body.phone;

                    user.save(function(err){
                        if(err) throw err;
                        console.log("uploaded Sucessfully...");
                    });
                    console.log(user);
                    res.send(user);
                    res.end();
                });


                //Update the data

                app.put('/student/id/:id', function(req, res){
                    var myObjectId = mongoose.Types.ObjectId(req.params.id);

                        return User.findById({_id:myObjectId}, function(err, user) {

                            user.firstname = req.body.firstname;
                            user.lastname = req.body.lastname;
                            user.gender = req.body.gender;
                            user.street = req.body.street;
                            user.city = req.body.city;
                            user.state = req.body.state;
                            user.phone = req.body.phone;

                            // Save the updated document back to the database
                            return user.save(function (err) {
                                if (!err) {
                                    console.log("updated sucessfully");
                                } else {
                                    console.log(err);
                                }
                                return res.send(user);
                            });
                        });
                });



                //delete the data

                app.delete('/student/id/:id', function(req, res){
                    var myObjectId = mongoose.Types.ObjectId(req.params.id);
                    console.log(myObjectId);
                     User.findByIdAndRemove({_id:myObjectId}, function (err,response) {

                        if(err){
                            console.log(err)
                        }
                        var response = {
                            message: "Todo successfully deleted",
                            id: myObjectId
                        };
                        res.send(response);
                    });
                });



                //Server Port Listen
                var server = app.listen(8081, function(){
                    var host = server.address().address;
                    var port = server.address().port;
                    console.log("Example app listening at http://%s:%s", host, port)

                });


                //end of MONGOOSE API'S

