const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.set('view engine','hbs');
app.use((req,res,next)=>{
    var now= new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log("Unable to append to log file");
        }
    });
    next();
});

app.use(express.static(__dirname +'/public'));


app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: "About Page",
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: "About Page",
        currentYear: new Date().getFullYear()
    }); 
});

app.get('/bad',(req,res)=>{
   res.send( {
        errorMessage:"lol"
    });
});

app.listen(3000, ()=>{
    console.log("Server listening on port 3000");
});