const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient

//connect to db
MongoClient.connect("mongodb+srv://ben_1:benny1234@cluster0.daout.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    
    //do everything once we are connected to the db:
    .then((client) => {
        console.log('Connected to Database');

        //choose a db(we can have many)
        const db = client.db('notes-db')
        // set collection to a variable for easier use 
        const notesCollection = db.collection('notes')

        app.use(express.static(path.join(__dirname, 'public')));//in one line of code we have hosted an entore website
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true}));

        //logging middleware
        app.use((req, res, next) => {
            //whatever you put here
            console.log(`request recieved: ${Date.now()}`)
            next()
        })

        app.get('/notes', (req, res) => {
            notesCollection.find().toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
        })

        app.post('/notes', (req, res) => {
            notesCollection.insertOne(req.body)
                .then((result) =>{
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/notes', (req, res) => {
            notesCollection.findOneAndUpdate(
                { name: req.body.noteToUpdate },
                {
                    $set: {
                        name: req.body.name,
                        note: req.body.note
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => {
                    res.json('success')
                })
                .catch(error => console.error(error))

        })



        app.listen(3000);
        
    })
            

