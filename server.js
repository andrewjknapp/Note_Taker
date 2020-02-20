const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


//Express route handlers
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/notes", function(req, res) {
    fs.readFile('db.json', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        
        res.send(data);
    })
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});