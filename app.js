const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

let cars = [
    {id:1,Brand:"BMW", Model:"G80 ", engine:"L6 3.0 Twin tubo",vin:"54221332",power:510},
    {id:2,Brand:"Porshe", Model:"GT3", engine:"F6 4.0 NA",vin:"54221332",power:490},
    {id:3,Brand:"Audi", Model:"RS5", engine:"V6 2.9 Twin turbo",vin:"54221332",power:480},    
    {id:4,Brand:"Mercedes", Model:"G63", engine:"V8 4.0 HotV turbo",vin:"54221332",power:510}]

    //Add new car in the list
app.post('/add_car',(req,res)=>{
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).send({message:'Car added in your list with success', car:newCar})
})

//Edit car by Id
app.put('/update_car/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const carIndex = cars.findIndex(c => c.id === carId);

    if (carIndex === -1) {
        return res.status(404).send({ message: 'Car not found' });
    }

    const updatedCar = req.body;
    cars[carIndex] = updatedCar;

    res.status(200).json(updatedCar);
});

//Get all cars in the list
app.get('/list_car',(req,res)=>{
    res.status(200).json(cars);
})


//Get car with id with parameter 
app.get('/car/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const car = cars.find(c => c.id === carId);

    if (!car) {
        return res.status(404).send({ message: 'Car not found' });
    }

    res.status(200).json(car);
});

//Delet Car with id if it exist
app.delete('car_del/:id',(req,res)=>{
    const carId = parseInt(req.params.id);
    const carIndex = cars.findIndex(c => c.id === carId);

  if (carIndex === -1) {
    return res.status(404).send({ message: 'Car not found' });
  }
  cars.splice(carIndex, 1);
  res.status(200).send({ message: 'Car deleted successfully' });
})

app.get('/hi', (req, res) => {
  res.send('Hello World Test');
});



app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
