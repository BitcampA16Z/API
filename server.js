var express = require('express');
var app = express();

var github = require('./github.js');
/*
input: search query, gh username
output: search result from Houndify
{
    "result" : response
}

*/
app.get('/', function (req, res) {
    var query = req.query.query;
    var ghusername = req.query.ghusername;

    var testQuery = "Show my notifications on Github";

    github(testQuery.toLowerCase(), "vwsong", function(response){
        res.send(response);
    });
    //    var response;
    //    hdfy(query, function (response) {
    //        res.send({
    //            "result": response
    //        });
    //    });
});

//
//function getIntent(query) {
//    var listOfIntents = ['GitHub', 'Spotify', 'Chrome', 'Houndify'];
//    for (var i = 0; i < listOfIntents.length; i++) {
//        if (query.includes(listOfIntents[i]) {
//                return listOfIntents[i];
//            }
//        }
//    }
//}
app.listen(3000);