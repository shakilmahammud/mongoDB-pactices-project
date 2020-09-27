const express=require("express");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbuser:shakil@cluster0.d1f3k.mongodb.net/dbme?retryWrites=true&w=majority";
const pass='shakil';
const app =express();
app.get('/',(req,res)=>{
    res.send('Hello I m working')
})


const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("dbme").collection("products");
  console.log('database connect');
  // perform actions on the collection object
  client.close();
});

app.listen(5000)