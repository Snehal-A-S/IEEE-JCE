require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const ejsmate = require("ejs-mate");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const Event = require("./models/event.js");


const dburl = process.env.MONGO_ATLAS;
main().then(()=>{
    console.log("Connected to db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);
}


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs",ejsmate);
// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.get("/team",(req,res)=>{
    res.render("team.ejs");
})

app.get("/events",async(req,res)=>{
    let alldata = await Event.find();
    res.render("events.ejs",{alldata});
})

//show events route
app.get("/events/:id",async(req,res)=>{
    let {id} = req.params;
    const event = await Event.findById(id);
    res.render("show.ejs",{event});
})

app.get("/Wie",(req,res)=>{
    res.render("Wie.ejs")
})

app.get("/aess",(req,res)=>{
    res.render("aess.ejs");
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
})


// POST endpoint to handle form submissions
app.post("/contact", (req, res) => {
    const { name, email,phone, Message } = req.body;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.SECRET,
        }
    });

        // Email content
        let mailOptions = {
            from: req.bodyemail ,
            to: process.env.EMAIL ,
            subject: 'New Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nPhone No:${phone}\nMessage: ${Message}`
        };
    

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // res.send('Email sent successfully');
            res.render("emailsent.ejs");
        }
    });
});

app.listen(8080,()=>{
    console.log("app is listening at 8080");
})