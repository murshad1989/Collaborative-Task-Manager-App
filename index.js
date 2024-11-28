
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:Murshad313@cluster0.lsx7b.mongodb.net/Task?retryWrites=true&w=majority";
const client = new MongoClient(uri);

client.connect(err => {
  if(err) {
    console.error('Error connecting to MongoDB', err);
    return;
  }
  console.log('Connected to MongoDB');
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
