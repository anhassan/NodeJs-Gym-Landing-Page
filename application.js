const express = require('express');
const fs = require('fs');
const path = require("path");
const app = express();
const port = 80;

// EXPRESS RELATED STUFF
// first static is for the endpoint and second static is for the folder name. Both can be any names
app.use("/static",express.static("static"));
app.use(express.urlencoded());

// PUG RELATED STUFF
app.set("view engine","pug");//set the template engine as pug
app.set("views",path.join(__dirname,"views"));//set the view directory

//ENDPOINTS
app.get("/",(req,res)=>{
    const con = "See the results in just a couple of weeks";
    const params = {'title':"Gym Form", content :con};
    res.status(200).render("index.pug",params);
})
app.post("/",(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const address = req.body.address;
    const more = req.body.more;
    let outputToWrite = `The details of the clients are name:  ${name} , ${age} years old , gender : ${gender} , residing at ${address}, additional details : ${more}`;
    fs.writeFileSync("output.txt",outputToWrite);
    const params ={message: "Your form has been submitted successfully....."};
    res.status(200).render("index.pug",params);

})


//START THE SERVER
//demo end point
app.get('/demo', (req, res)=> {
    res.render('demo', { title: 'Hey', message: 'Hello there!' })
  })



app.listen(port,()=>{
    console.log(`The app is running on ${port}....`)
})