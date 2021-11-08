const express = require("express");
const app = express();
//Need absolute path so define it here. Note that 'path' comes with NodeJS
const path = require("path");

const PORT = 3003;

//define routes (underscore means 'req' is being taken in but not used)

//1. post route
app.post('/api/notes', (__, res)=> {
    res.send("Hello World")
})
//2. get route (/api/notes - read and return all notes from db.json)
app.get('/api/notes', (__, res) => {
    res.send(path.join(__dirname, "./db.json"))
})
//3. get route (/notes - return notes.html file)
app.get('/notes', (__, res) => {
    res.send(path.join(__dirname, "../public/notes.html"))
})
//4. get route (* - return index.html file)
app.get('*', (__, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

//listens for any incoming connections on specified port (port defined above)
app.listen(PORT, () => {
    //do something
    console.log(`listening on port ${PORT}`)
})