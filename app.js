const express = require("express");
const app = express();
const path = require("path");
const ejsmate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs",ejsmate);


app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.get("/team",(req,res)=>{
    res.render("team.ejs");
})

app.get("/events",(req,res)=>{
    res.render("events.ejs");
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

app.listen(8080,()=>{
    console.log("app is listening at 8080");
})