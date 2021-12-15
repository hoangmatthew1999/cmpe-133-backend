// require the express module
const express = require("express");
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

// create an object from the express function which we contains methods for making requests and starting the server
const app = express();

app.use(bodyParser.urlencoded({extended: false})      )
app.use(bodyParser.json());
// create a route for a GET request to '/' - when that route is reached, run a function
app.use(cors( {origin: "http://localhost:4200"}));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.get("/", function(request, response) {
  /* inside of this callback we have two large objects, request and response
        request - can contain data about the request (query string, url parameters, form data)
        response - contains useful methods for determining how to respond (with html, text, json, etc.)
    let's respond by sending the text Hello World!
    */
  return response.send("Hello World!");
});

app.use( express.static('form')    );
// let's tell our server to listen on port 3012 and when the server starts, run a callback function that console.log's a message
const url = "mongodb+srv://john:Asdfg12345@cluster0.vp2i9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.post('/user-create',(req,res)=>{
    console.log("Trying to create a new user");   
    res.end();
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("cmpe133");
        var myobj = { name: "haha", level: "User", userType: "Advisor", limitClient: 5, email: "abc@gmail.com" };
        dbo.collection("cmpe133").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      }); 

});
app.get('/see-user',(req,res)=>{
  var resultArray = [];

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpe133");
    dbo.collection("cmpe133").find({}).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      resultArray.push(result);
      // console.log(resultArray[0], "result array")
      res.send(result);
      db.close();
    });

  }); 

});

app.get('/see-user/manager',(req,res)=>{
  var resultArray = [];

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpe133");
    let query = {level: "Manager", archive: "false"}
    dbo.collection("cmpe133").find(query).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      resultArray.push(result);
      // console.log(resultArray[0], "result array")
      res.send(result);
      db.close();
    });

  }); 

});
app.get('/see-user/admin',(req,res)=>{
  var resultArray = [];

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpe133");
    let query = {level: "Admin", archive: "false"}
    dbo.collection("cmpe133").find(query).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      resultArray.push(result);
      // console.log(resultArray[0], "result array")
      res.send(result);
      db.close();
    });

  }); 

});

app.get('/see-user/user',(req,res)=>{
  var resultArray = [];

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpe133");
    let query = {level: "User", archive: "false"}
    dbo.collection("cmpe133").find(query).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      resultArray.push(result);
      // console.log(resultArray[0], "result array")
      res.send(result);
      db.close();
    });

  }); 

});

app.get('/see-user/advisor',(req,res)=>{
  var resultArray = [];

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpe133");
    let query = {level: "Advisor", archive: "false"}
    dbo.collection("cmpe133").find(query).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      resultArray.push(result);
      // console.log(resultArray[0], "result array")
      res.send(result);
      db.close();
    });

  }); 

});

app.get('/see-user/coach',(req,res)=>{
  var resultArray = [];

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpe133");
    let query = {level: "Coach", archive: "false"}
    dbo.collection("cmpe133").find(query).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      resultArray.push(result);
      // console.log(resultArray[0], "result array")
      res.send(result);
      db.close();
    });

  }); 

});

app.get('/see-user/specialist',(req,res)=>{
  var resultArray = [];

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpe133");
    let query = {level: "Specialist", archive: "false"}
    dbo.collection("cmpe133").find(query).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      resultArray.push(result);
      // console.log(resultArray[0], "result array")
      res.send(result);
      db.close();
    });

  }); 

});

app.get('/see-user/archive',(req,res)=>{
  var resultArray = [];

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpe133");
    let query = {archive: "true"}
    dbo.collection("cmpe133").find(query).toArray(function(err, result) {
      if (err) throw err;
    
      res.send(result);
      db.close();
    });
  }); 
});



app.post('/unarchive',(req,res)=>{

  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("cmpe133");
    
    let query = req.body;
    console.log(query);
    var update = {$set: {"archive": "true"}};

    var ObjectId = require('mongodb').ObjectID;

    dbo.collection("cmpe133").updateOne({"_id": ObjectId(req.body._id)},
                                        {$set: {"archive": "false"}}, 
                                      function(err, res){
      if (err) throw err;
      console.log("User unarchived!");
      db.close();
    });
  });
});

app.get('/see-user/notification',(req,res)=>{
  var resultArray = [];

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpe133");
    let query = {notification: "true"}
    dbo.collection("cmpe133").find(query).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      //resultArray.push(result);
      // console.log(resultArray[0], "result array")
      res.send(result);
      db.close();
    });
  });
});

app.get('/see-user/all',(req,res)=>{
  var resultArray = [];

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cmpe133");
    let query = {archive: "false"}
    dbo.collection("cmpe133").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});

app.post('/editNotification',(req,res)=>{

  MongoClient.connect(url, function(err, db) {

    console.log('Testing notifications')
    
    if (err) throw err;
    var dbo = db.db("cmpe133");

    
    var ObjectId = require('mongodb').ObjectID;

    dbo.collection("cmpe133").updateOne({"_id": ObjectId(req.body._id)}, {$set: {"msg": req.body.msg}}, function(err, res){
      if (err) throw err;
      console.log("Msg Editted!");
      db.close();
    });
  });
});

app.post('/deleteNotification',(req,res)=>{

  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("cmpe133");
    var ObjectId = require('mongodb').ObjectID;

    dbo.collection("cmpe133").updateOne({"_id": ObjectId(req.body._id)}, {$set: {"notification": "false"}}, function(err, res){
      if (err) throw err;
      console.log("Notification archived");
      db.close();
    });
  });
});

app.post('/addNotification',(req,res)=>{

  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("cmpe133");
    var ObjectId = require('mongodb').ObjectID;
    console.log(req.body.msg)

    const doc = {"notification": "true", "msg": req.body.msg}

    dbo.collection("cmpe133").insertOne(doc, function(err, res){
      if (err) throw err;
      console.log("Notification created");
      db.close();
    });
  });
});

app.post('/see-user/archive',(req,res)=>{

  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("cmpe133");
    var ObjectId = require('mongodb').ObjectID;

    dbo.collection("cmpe133").updateOne({"_id": ObjectId(req.body._id)}, {$set: {"archive": "true"}}, function(err, res){
      if (err) throw err;
      console.log("User archived");
      db.close();
    });
  });
});

app.post('/deleteUser',(req,res)=>{

  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("cmpe133");
    var ObjectId = require('mongodb').ObjectID;

    dbo.collection("cmpe133").deleteOne({"_id": ObjectId(req.body._id)}, function(err, res){
      if (err) throw err;
      console.log("User archived");
      db.close();
    });
  });
});

app.post('/addUser',(req,res)=>{

  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("cmpe133");
    var ObjectId = require('mongodb').ObjectID;
    const doc = {"archive": "false", "name": req.body.name, "email": req.body.email, "password": req.body.password, "level": req.body.level, "limitClient": req.body.limitClient}

    dbo.collection("cmpe133").insertOne(doc, function(err, res){
      if (err) throw err;
      console.log("User created");
      db.close();
    });
  });
});

app.post('/editUser',(req,res)=>{

  MongoClient.connect(url, function(err, db) {

   
    
    var dbo = db.db("cmpe133");
    var ObjectId = require('mongodb').ObjectID;
    

    dbo.collection("cmpe133").updateOne({"_id": ObjectId(req.body._id)}, {$set: {"archive": "false", "name": req.body.name, "email": req.body.email, "level": req.body.level, "password": req.body.password, "limitClient": req.body.limitClient}}, function(err, res){
      if (err) throw err;
      console.log('User editted!');
      db.close();
  });
});
});

app.listen(port = 3012, function() {
  console.log(" currently running on " + port);
});