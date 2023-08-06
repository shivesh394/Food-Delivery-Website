const express=require("express");
const app = express();
const path = require("path");
require("./db/conn");
let alert = require('alert'); 

const Register = require("./models/register");
const Register2 = require("./models/register2");
const Register3 = require("./models/menu");


const port=80;

app.use(express.static(path.join(__dirname, "views")))
app.use('/css',express.static(__dirname +'/css'));
app.use('/img',express.static(__dirname +'/img'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.post("/register",async(req,res) =>{
   
    try {
       const password = req.body.password; 
       const cpassword = req.body.confirmpassword; 
       if(password==cpassword){

            const registerEmployee = new Register({
                name:req.body.name,
                email:req.body.email,
                password:password,
                confirmpassword:cpassword
            })
        const registered = await registerEmployee.save();
        res.redirect('index.html');
       }
       else{
        alert("Password are not matching");
       }
    } catch (error) {
        // res.status(400).send(error);
        alert("You have not entered");
    }
});

app.post("/register2", async(req,res) =>{
   
    try {
        const registerContactUs = new Register2({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message
        })
        const registered2 = await registerContactUs.save(); 
        res.redirect('index.html');
    } catch (error) {
        // res.status(400).send(error);
        alert("You have not entered")      
    }
});

app.post("/login",async(req,res) =>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        const useremail=await Register.findOne({email:email});
        if(useremail.password===password){
            res.redirect('index-log.html');
        }
        else{
            alert("Password is wrong");
        }
    } catch(error){
        // res.status(400).send("Invalid Email");
        alert("You have not entered");
    }
})

app.post("/menu",async(req,res) =>{
    try {
        const order=req.body.order;
        const registerMenu = new Register3({
            order:order
        })
        const registered3 = await registerMenu.save(); 
        res.redirect('index.html');
        if(order.length!=0){
            alert("Order Successful");
        }
        else{
            alert("You have not entered");
        }
    } catch (error) {
        alert("You have not entered"); 
    }
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
}) 