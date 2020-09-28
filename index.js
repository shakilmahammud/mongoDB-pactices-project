const express=require("express");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbuser:shakil@cluster0.d1f3k.mongodb.net/dbme?retryWrites=true&w=majority";
const pass='shakil';
const bodyParser=require('body-parser');
const objectId=require("mongodb").ObjectId //delete krar jonno object id
const { urlencoded } = require("body-parser");//form submit
const { ObjectId } = require("mongodb");
const app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})


const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("dbme").collection("products");
  console.log('database connect');
  app.post('/addProduct',(req,res)=>{
    const product=req.body;
    collection.insertOne(product)
    .then(result=>{
      console.log('hoice');
      res.send('done')
    })  
  })
  app.get('/product',(req,res)=>{
    collection.find({})
    .toArray((err,document)=>{
      console.log(document);
      res.send(document);
    })
  })
  //single product load
  app.get('/product/:id',(req,res)=>{
    collection.find({_id:ObjectId(req.params.id)})
    .toArray((err,document)=>{
      res.send(document[0]);
    })
  })
  //update
  app.patch('/update/:id',(req,res)=>{
    collection.updateOne({_id:ObjectId(req.params.id)}),
    {$set:{price:req.body.price,quantity:req.body.quantity}}
    .then(result=>{
      console.log(result);
    })
  })
//delete
app.delete('/delete/:id',(req,res)=>{
  collection.deleteOne({_id: objectId(req.params.id)})
 .then(result=>{
  console.log(result);
 })
})
  // const data={name:'shakil',id:2}
  // collection.insertOne(data)
  // .then(res=>{
  // console.log('one products aded');
  // })
  // perform actions on the collection object
  // client.close();


});

app.listen(5000)