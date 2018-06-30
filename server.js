var express=require('express');
var app=express();

app.use(express.static(__dirname));

app.post('/',function(req,res){
    res.sendfile(__dirname + '/index.html');
})

app.listen(80)
console.log("My Service is listening to port 80.");

