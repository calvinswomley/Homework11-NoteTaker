const express = require("express");

//Need absolute path so define it here. Note that 'path' comes with NodeJS
const path = require("path");

const db = require("./db/db.json");
const PORT = 3003;
const app = express();



//allow express to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up of static middleware >> This will grab all the static files in the 'public' folder
app.use(express.static("public"))

//define routes (underscore means 'req' is being taken in but not used)

//1. post route
app.post('/api/notes', (req, res)=> {
    res.send("Hello World")
})

//2. get route (/api/notes - read and return all notes from db.json)
app.get('/api/notes', (__, res) => res.json(db));

//3. get route (/notes - return notes.html file)
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

//4. get route (* - return index.html file)
app.get('/', (req, res) => {
    res.send(path.join(__dirname, 'index.html'))
});

//listens for any incoming connections on specified port (port defined above)
app.listen(PORT, () => {
    //do something
    console.log(`listening on port ${PORT}`)
})