import bodyParser from "body-parser";
import express, { urlencoded } from "express";
import mongoose from "mongoose";

//database url string
const DBURL = 'mongodb://localhost:27017/HealthCareServices';

//connection with database
mongoose.connect(DBURL)
.then(()=>{console.log("Connection Successful")})
.catch((err)=>{console.log("Error while Connecting to Database")})


//Schema of the service
const serviceSchema = new mongoose.Schema({
  serviceName:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  }
})
const Service = mongoose.model("user", serviceSchema);



const PORT = 3000; //App will run on Port No. 3000, if not available please change it.
const App = express();

App.use(bodyParser.urlencoded({extended: true}))





//Post method to add new service into the database
App.post('/addservice', async(req, res)=>{
  let servName = req.body.serviceName;
  let description = req.body.description;
  let price = req.body.price;
  if(!servName || !description || !price){
    return res.status(500).send(`All Fields are Required`);
  }

  const result = await Service.create({
    serviceName: servName,
    description: description,
    price: price,
  })
  return res.status(200).send(`Success`);
})




//Get method to fetch all the records present in database
App.get("/allservices", async(req, res)=>{
  try{
    const result = await Service.find();
    return res.status(200).json(result);
  } catch(err){
    return res.status(500).send("Unable to Fetch services for now");
  }
});




//Delete method to delete anynrecord with the object id present in mongodatabase
App.delete("/deleteservice/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).send('Service not found');
    }

    await Service.deleteOne({ _id: req.params.id });

    return res.status(200).send('Service deleted successfully');
  } catch (err) {
    return res.status(500).send('Unable to complete the operation');
  }
});




//to edit any record present in db with its ID
App.patch("/updateservice/:id", async (req, res) => {
  try {
    const result = await Service.findById(req.params.id);
    if (!result) {
      return res.status(404).send('Service not found');
    }

    let serv = req.body.serviceName || result.serviceName;
    let description = req.body.description || result.description;
    let price = req.body.price || result.price;
    
    const ans = await Service.updateOne({_id: req.params.id}, {
      serviceName: serv,
      description: description,
      price: price,
    });
    return res.status(200).send("Success");
  } catch (err) {
    return res.status(500).send('Unable to complete the operation');
  }
});







App.listen(PORT, ()=>{
  console.log(`App is listening on the PORT : ${PORT}`);
})
