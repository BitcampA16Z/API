'use strict';

//Server dependencies
var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();

//Intents
const Store = require('../handler').Store;
const Handler = require('../handler').Handler;


var SpotifyWebApi = require('spotify-web-api-node');

var successTree = {
  'SpotifyPlay' : false,
  'SpotifyPause': false,
};

var spotifyApi = new SpotifyWebApi({
  clientId : 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri : 'http://localhost:3030/callback'
});

class SpotifyPlay extends Handler {
  constructor(){
    super('SpotifyPlay');
  }

  failureFunction(){
    successTree[this.intent] = false;
  }

  respond(success,cb){
    successTree[this.intent] = false;
    const that = this;
    var object = {};
    if(this.params.song){
      spotifyApi.searchTracks(`track:${this.params.song}`)
      .then(function(data) {
        var max = parseInt(data.body.tracks.items[0].popularity);
        var index = 0;
        for(var i in data.body.tracks.items){
          var temp = parseInt(data.body.tracks.items[i].popularity);
          if(temp > max){
            index = i;
            max = temp;
          }
        }
        object = {
          'song_name': data.body.tracks.items[index].name,
          'album_url' : data.body.tracks.items[index].album.images[1].url,
          'album_name' : data.body.tracks.items[index].album.name,
          'artist_name' : data.body.tracks.items[index].artists.name
        }
        var exec = require('child_process').exec;
        exec('/Users/arturkashperskiy/Desktop/shpotify/spotify play ' + data.body.tracks.items[index].name, function(error, stdout, stderr){
          cb(JSON.stringify(object))
        });
      }, function(err) {
        console.error(err);
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

class SpotifyPause extends Handler {
  constructor(){
    super('SpotifyPause');
  }

  failureFunction(){
    successTree[this.intent] = false;
  }

  respond(success,cb){
    successTree[this.intent] = true;
    const that = this;
    var exec = require('child_process').exec;
    exec('/Users/arturkashperskiy/Desktop/shpotify/spotify pause', function(error, stdout, stderr){
      cb(stdout);
    });
  }

  template(){
    return [
      'pause',
      'pause spotify'
    ]
  }
}



//the default handler always goes last
const stor = new Store([new SpotifyPlay(),new SpotifyPause()]);


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
