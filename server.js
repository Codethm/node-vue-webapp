const express = require('express');
const https = require('https');
const fs = require('fs');

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

app.get('/.well-known/pki-validation/146B5DEB5A1B5AA2E633DF1A17F6D4F2.txt',function(req,res){
    res.sendfile(__dirname + '/ssl/146B5DEB5A1B5AA2E633DF1A17F6D4F2.txt');
})

app.listen(80, function(){
    console.log("HTTP is listening to port 80.");
});

https.createServer(httpsOptions, app).listen(443,function(){
    console.log("HTTPS is listening to port 443.");
});
