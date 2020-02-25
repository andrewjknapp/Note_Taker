const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Express route handlers
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/note", function(req, res) {
    res.sendFile(path.join(__dirname, 'note.html'));
});

app.get("/api/notes", function(req, res) {
    fs.readFile('db.json', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        
        res.send(data);
    })
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;

    fs.readFile('db.json', 'utf8', function(err, data) {

        data = JSON.parse(data)
        data.unshift(newNote);

        fs.writeFile('db.json', JSON.stringify(data, null, 1), function(err) {
            if (err) {
                throw err;
            }
            res.status(200).json({status:"ok"});
        })
    })
})

app.post("/api/delete", function(req, res) {
    let index = req.body;
    
    fs.readFile('db.json', 'utf8', function(err, data) {
        
        data = JSON.parse(data);
        data.splice(index.index, 1);
        

        fs.writeFile('db.json', JSON.stringify(data, null, 1), function(err) {
            if (err) {
                throw err;
            }
            res.status(200).json({status:"ok"});
        })
    })
    
})

app.post('/api/current', function(req, res) {
    let index = req.body;
    
    fs.readFile('db.json', 'utf8', function(err, data) {

        data = JSON.parse(data);
        let currentNote = data.splice(index.index, 1);

        data.unshift(currentNote[0]);

        fs.writeFile('db.json', JSON.stringify(data, null, 1), function(err) {
            if (err) { 
                throw err;
            }
            res.status(200).json({status:"ok"});
        })
    })

})

app.listen(PORT, function() {
    console.log("App listening at http://localhost:" + PORT);
});