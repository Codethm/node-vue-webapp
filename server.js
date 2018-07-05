const express = require('express');
const https = require('https');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const session  = require('express-session');

const url = "mongodb://localhost:27017";

var app = express();
app.use(express.static(__dirname));


const httpsOptions = {
    ca: fs.readFileSync(__dirname + '/ssl/codethm_me.ca-bundle'),
    key: fs.readFileSync(__dirname + '/ssl/codethm.me.key'),
    cert: fs.readFileSync(__dirname + '/ssl/codethm_me.crt')
}

app.get('/',function(req,res){
    res.sendfile(__dirname + '/index.html');
})

app.get('/login', function(req, res) {
    res.sendfile(__dirname + '/views/login.html');

});

app.post('/login', function(req, res) {
    req.session.authenticated = true;
    res.redirect('/calculator');
});

app.get('/calculator', function(req, res) {
    res.sendfile(__dirname + '/views/calculator.html'); 
});




app.get('/.well-known/pki-validation/146B5DEB5A1B5AA2E633DF1A17F6D4F2.txt',function(req,res){
    res.sendfile(__dirname + '/ssl/146B5DEB5A1B5AA2E633DF1A17F6D4F2.txt');
})

app.get('/api/listTemple', function(req, res){
    MongoClient.connect(url, function(err, client) {
        var db = client.db('temple');
        if (err) throw err;
        db.collection("temples").find().toArray().then(temples=>{
           const output = {temple : temples}
           res.json(output);
        });
        client.close();
      });
})

app.listen(80, function(){
    console.log("HTTP is listening to port 80.");
})

https.createServer(httpsOptions, app).listen(443,function(){
    console.log("HTTPS is listening to port 443.");
})
