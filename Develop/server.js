const { randomUUID } = require("crypto");
const { json } = require("express");
const express = require("express");
const fs = require("fs");

//Need absolute path so define it here. Note that 'path' comes with NodeJS
const path = require("path");
const db = require("./db/db.json");
const PORT = process.env.PORT || 80;
const app = express();

//allow express to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up of static middleware >> This will grab all the static files in the 'public' folder
app.use(express.static("public"));

//function for adding to file
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            const stringifiedData = JSON.stringify(parsedData);
            fs.writeFile(file, stringifiedData, 'utf8', (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");  
                }
            });
        }
    });
};

//define routes (underscore means 'req' is being taken in but not used)
//1. post route to add note
app.post('/api/notes', (req, res)=> {
    console.info(`${req.method} request received to add note`);
    
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: randomUUID(),
        };
        const dbUrl = path.join(__dirname, './db/db.json');
        readAndAppend(newNote, dbUrl);
        const response = {
            status: 'success',
            body: dbUrl,
        };
        res.status(201).json(response);
    } else {
        res.status(500).json('Error: POST unsuccessful');
    }
});

//2.[WORKS] get route (/api/notes - read and return all notes from db.json)
app.get('/api/notes', (req, res) => {
    console.log(`${req.method} recieved to get ALL notes`)
    res.sendFile(path.join(__dirname, './db/db.json'));
});

//2.2 get route (  - read and return specific note)

//3. [WORKS] get route (/notes - return notes.html file)
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//4. [WORKS] get route (* - return index.html file)
app.get('/', (req, res) => {
    res.send(path.join(__dirname, 'index.html'))
});

//listens for any incoming connections on specified port (port defined above)
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});