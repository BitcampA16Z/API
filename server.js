var express = require('express');
var app = express();

//app.post('/', function (req, res) {
//    console.log(req.text);
//});


/*
input: search query
output: search result from Houndify
{
    "result" : response
}

*/
app.get('/', function (req, res) {
    var query = req.query.query;
    var response;
    hdfy(query, function(response) {
        res.send({
           "result" : response
        });
    });
});

function hdfy(query, callback) {
    var request = require('request');
    var uuid = require('node-uuid');

  //We can declare our own catches here!
  var houndRequest = {
        //This is where we specify the ClientMatch JSON in the RequestInfo Object
//        ClientMatches: [
//        {
//            "Expression": "\"turn\" . \"on\" . [\"the\"] . (\"light\" | \"lights\")",
//            "Result": {
//                "Intent": "TURN_LIGHT_ON"
//            },
//            "SpokenResponse": "Ok, I'm turning the lights on.",
//            "SpokenResponseLong": "Ok, I'm turning the lights on.",
//            "WrittenResponse": "Ok, I'm turning the lights on.",
//            "WrittenResponseLong": "Ok, I'm turning the lights on."
//        },]
    };
    
    request({
        url: 'https://api.houndify.com/v1/text?query=' + query,
        headers: {
            'Hound-Request-Authentication': "client1;3fd94430-35cd-11e6-baa7-6f3076229143",
            'Hound-Client-Authentication': "jj_E0R4yxYBfyUffpY2sPw==;1466306633;ujHHBDmMHrwrCWoaEJDbXeWFGEuucUTEHE2VIgo0SFw=",
            'Hound-Request-Info': JSON.stringify(houndRequest)
        },
        json: true
    }, function (err, resp, body) {
        //console.log(body);
        console.log(body.AllResults[0].WrittenResponseLong);
        callback(body.AllResults[0].WrittenResponseLong);
    });
}

app.listen(3000);