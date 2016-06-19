'use strict';

//Server dependencies
var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();

//Intents
const Store = require('../handler').Store;
const Handler = require('../handler').Handler;


var SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
  clientId : 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri : 'http://localhost:3030/callback'
});


class SpotifyPlay extends Handler {
  constructor(){
    super('SpotifyPlay');
  }

  respond(success,cb){
    const that = this;
    if(this.params.song){
      spotifyApi.searchTracks(this.params.song)
      .then(function(data) {
        var exec = require('child_process').exec;
        exec('/Users/arturkashperskiy/Desktop/shpotify/spotify play ' + data.body.tracks.items[0].name, function(error, stdout, stderr){
          setTimeout(that.status,600,cb)
        });
      }, function(err) {
        console.error(err);
      });
    }
    else {
      var exec = require('child_process').exec;
      exec('/Users/arturkashperskiy/Desktop/shpotify/spotify play', function(error, stdout, stderr){
        setTimeout(that.status,600,cb)
      });
    }
  }

  status(cb){
    var exec = require('child_process').exec;
    exec('/Users/arturkashperskiy/Desktop/shpotify/spotify status', function(error, stdout, stderr){
      cb(stdout)
    });
  }

  template(){
    return [
      'play {{song}} with spotify',
      'play with spotify',
    ]
  }
}

//the default handler always goes last
const stor = new Store([new SpotifyPlay()]);


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//------------------------//
//Basic Logic of server//
//----------------------//

app.post('/',function (req, res) {
  console.log(req.body.message);
  stor.emit('data',req.body.message.toLowerCase(), (response) => {
    res.send(response);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
