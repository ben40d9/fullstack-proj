const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));//in one line of code we have hosted an entore website
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//logging middleware
app.use((req, res, next) => {
    //whatever you put here
    console.log(`request recieved: ${Date.now()}`)
    next()
})

app.post('/sendMessage', (req, res) => {
    console.log(req.body)
    res.sendStatus(200)

})

app.get('/hello', (req, res) => {
    //runs our middleware here
    //next
    res.send('hello');
})
app.get('/else', (req, res) => {
    //and here
    res.send('also hello');
})

app.listen(3000);