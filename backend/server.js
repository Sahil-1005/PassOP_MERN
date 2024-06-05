const express = require('express')
const { MongoClient } = require('mongodb');

//https://www.npmjs.com/package/dotenv
const dotenv = require('dotenv')
dotenv.config()


//https://www.npmjs.com/package/cors
const cors=require('cors')

//https://www.npmjs.com/package/body-parser
const bodyparser=require('body-parser');
const { Result } = require('postcss');

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passOP';
const app = express()
app.use(bodyparser.json())
app.use(cors())
const port = 3000

client.connect();

//to get all password saved
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const finalResult = await collection.find({}).toArray();
  res.json(finalResult);
})


//to save new password
app.post('/', async(req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const finalResult = await collection.insertOne(password);
  res.send({success:true,result:finalResult});
})

//to delete password
app.delete('/', async(req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const finalResult = await collection.deleteOne(password);
  res.send({success:true,result:finalResult});
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})