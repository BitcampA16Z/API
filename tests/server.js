'use strict';

//Server dependencies
var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();

//Intents
const Store = require('../handler').Store;
const Handler = require('../handler').Handler;

class GitHub extends Handler {
  constructor(){
    super('github');
  }

  template(){
    return [
      'show github commits',
      'show history',
      'please show me commits'
    ]
  }
}

//the default handler always goes last
const stor = new Store([new Handler('default'),new GitHub()]);


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//------------------------//
//Basic Logic of server//
//----------------------//

app.post('/',function (req, res) {
  res.send(req.body.message)
  stor.emit('data',req.body.message);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
