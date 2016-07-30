import express from 'express';
import mongodb from "mongodb";
import bodyParser from 'body-parser';
import path from 'path'
var ObjectId = require('mongodb').ObjectID
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var MongoClient = mongodb.MongoClient
var url1 = "mongodb://tienanh2007:Dien1234@ds047325.mlab.com:47325/votingapp"
MongoClient.connect(url1, function (err, db) {
  if (err) throw err
  var collection = db.collection("users")
  collection.find({},{_id:0}).toArray(function(err, docs) {
    state.docs = docs
    db.close()
  })
})
MongoClient.connect(url1, function (err, db) {
  if (err) throw err
  var collection = db.collection("polls")
  collection.find({}).toArray(function(err, docs) {
    offPolls.docs = docs
    db.close()
  })
})
var state = {
  docs: null
}
var offPolls = {
  docs: null
}
var temp = null
var user = {
  "login": false,
  "username": "",
  "password": "",
  "ip": ""
}
var id;
app.enable('trust proxy')
app.use(express.static(path.join(__dirname, 'public')));
app.use('/polls',express.static('public'))
app.use(function(req,res,next){
  if(!user.ip){
    user.ip = req.ip;
    console.log(user)
  }
  next()
})
app.get('/api',function(req,res){
  var data = offPolls.docs.filter(function(doc){
    return doc._id == id;
  })
  if(data[0]){
    data[0].haveVoted = false;
    for(var voters in data[0].voted){
      if(data[0].voted[voters] == user.ip)
        data[0].haveVoted = true;
    }
    res.status(200).send(data[0])
  }
  else{
    res.status(404).send('Not Found')
  }
})
app.get('/api2',function(req,res){
  var dataToSend = offPolls.docs.filter(function(poll){
    return poll.username == user.username
  })
  if(dataToSend){
    res.status(200).send(dataToSend)
  }
  else{
    res.status(404).send('Not Found')
  }
})
app.post('/apiVote',function(req,res){
  var first = false;
  if(req.body.option == 1)
  first = true;
  MongoClient.connect(url1, function (err, db) {
    if (err) throw err
    var collection = db.collection("polls")
    if (first){
      collection.update({"_id": ObjectId(req.body._id)},{$inc:{"No1":1},$push:{ "voted": user.ip}})
    }
    else{
      collection.update({"_id": ObjectId(req.body._id)},{$inc:{"No2":1},$push:{ "voted": user.ip}})
    }

    collection.find({}).toArray(function(err, docs) {
      offPolls.docs = docs
      res.redirect(req.get('referer'));
      db.close()
    })
  })

})
app.get('/polls/:id',function(req,res){
  id = req.params.id;
  console.log(id)
  res.sendFile(__dirname + "/public/poll.html",function(err){
    if(err)
    console.log(err)
    else {
      console.log('file sent')
    }
  })
})
app.get('/',function(req,res){
  res.send(state.docs)
})
app.get('/dashboard',function(req,res){
  if(user.login){
    res.sendFile(__dirname + "/public/dashboard.html")
  }
  else {
    res.redirect("/login");
  }
})
app.post('/dashboard',function(req,res){
  var thing = {
    "username": user.username,
    "Question": req.body.Question,
    "Option 1": req.body["Option 1"],
    "Option 2": req.body["Option 2"],
    "No1": 0,
    "No2": 0,
    "voted": []
  }
  MongoClient.connect(url1, function (err, db) {
    if (err) throw err
    var collection = db.collection("polls")
    collection.insert(thing)
    collection.find({}).toArray(function(err, docs) {
      offPolls.docs = docs
      res.redirect(req.get('referer'))
      db.close();
    })

  })
})
app.get('/register',function(req,res){
  res.sendFile(__dirname + "/public/register.html")
})
app.post('/register',function(req,res){
  var accs = state.docs.filter(function(acc){
    return acc.username==req.body.username
  })
  if(accs.length == 0){
    var thing = {
      "username": req.body.username,
      "password": req.body.password
    }
    MongoClient.connect(url1, function (err, db) {
      if (err) throw err
      var collection = db.collection("users")
      collection.insert(thing)
      collection.find({},{_id:0}).toArray(function(err, docs) {
        state.docs = docs
        db.close()
      })
    })
    res.redirect("/login");
  }
  else{
    res.send('username already used')
  }
})
app.get('/login',function(req,res){
  res.sendFile(__dirname + "/public/login.html")
})
app.post('/login',function(req,res){
  var accs = state.docs.filter(function(acc){
    return acc.username==req.body.username && acc.password == req.body.password
  })
  if(accs.length == 0)
  res.send('fails to login')
  else{
    user.login = true;
    user.username = req.body.username;
    user.password = req.body.password;
    res.redirect("/dashboard");
    console.log(user);
  }
})
app.listen(process.env.PORT || 3000,function(){
  console.log(user)
});
