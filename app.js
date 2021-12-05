// require the express module
const express = require("express");
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

// create an object from the express function which we contains methods for making requests and starting the server
const app = express();

app.use(   bodyParser.urlencoded({extended: false})      )
// create a route for a GET request to '/' - when that route is reached, run a function
app.use(cors( {origin: "http://localhost:4200/archive"}));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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
        var myobj = { name: "Company Inc", level: "User", userType: "Advisor", limitClient: 5, email: "a@gmail.com" };
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
    let query = {level: "Manager"}
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
    let query = {level: "Admin"}
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
    db.getCollection('cmpe133').aggregate([{$group: {Level: "User"}}])


    var dbo = db.db("cmpe133");
    let query = {level: "User"}
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
      // console.log(result);
      //resultArray.push(result);
      // console.log(resultArray[0], "result array")
      res.send(result);
      db.close();
    });


  }); 

});


app.listen(port = 3012, function() {
  console.log(" currently running on " + port);
});