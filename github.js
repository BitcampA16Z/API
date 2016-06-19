var token = "b33ad636a9468ceeff7" + "57795c7bfa2ae3b39bb78";
var request = require('request');
var fuzzy = require('fuzzyset.js');

module.exports = function handleGithubRequests(query, ghusername, callback) {
    if (query.includes("commits") || query.includes("commit")) {
        handleCommits(query, ghusername, function (res) {
            callback(res);
        });
    } else if ((query.includes("search") && query.includes("username")) || (query.includes("search") && query.includes("user"))) {
        userSearch(query, ghusername, function (res) {
            callback(res);
        });
    } else if (query.includes("show") && query.includes("information") || query.includes("show") && query.includes("info")) {
        userInfoSearch(query, ghusername, function (res) {
            callback(res);
        });
    } else if ((query.includes("show") && query.includes("account")) || (query.includes("show") && query.includes("url"))) {
        urlSearch(query, ghusername, function (res) {
            callback(res);
        });
    } else if (query.includes("repo") || query.includes("repository")) {
        repoSearch(query, ghusername, function (res) {
            callback(res);
        });
    } else if (query.includes("notifications")) {
        handleNotifications(query, ghusername, function (res) {
            callback(res);
        });
    } else {
        hdfy(query, function (res) {
            callback(res);
        });
    }
}

//Commits
function handleCommits(query, ghusername, callback) {
    var dictionary = {};
    var querySplit = query.split(" ");
    var showCommits = [
            "show my commits in {{repo}} on github",
            "show commits in {{repo}}",
            "show my commits in {{repo}}",
            "show {{repo}} commits"
    ];
    for (var i = 0; i < showCommits.length; i++) {
        var showCommitsSplit = showCommits[i].split(" ");
        if (showCommitsSplit.length == querySplit.length) {
            for (var j = 0; j < querySplit.length; j++) {
                if (showCommitsSplit[j].includes("}}")) {
                    var variable = showCommitsSplit[j].match("\{{([^}]*)\}}");
                    dictionary[variable[1]] = querySplit[j];
                } else if (showCommitsSplit[j].toLowerCase() != querySplit[j].toLowerCase()) {
                    dictionary = {};
                    break;
                }
            }
        }
    }
    if (dictionary["repo"] != null) {
        console.log("TEST1");
        //https://api.github.com/repos/vwsong/pingpong/commits?Authorization=bfc679f6f560b2a396a2026626a33ccc566832fd
        request({
            url: "https://api.github.com/users/" + ghusername + "/repos?access_token=" + token,
            headers: {
                "User-Agent": "vwsong"
            },
            json: true
        }, function (err, resp, body) {
            console.log("TEST2");
            repos = FuzzySet();
            for (var i = 0; i < body.length; i++) {
                repos.add(body[i].name);
            }
            if (repos.get(dictionary["repo"]) != null) {
                var url = "https://api.github.com/repos/" + ghusername + "/" + repos.get(dictionary["repo"])[0][1] + "/commits?Authorization=" + token;
                request({
                    url: url,
                    headers: {
                        "User-Agent": "vwsong"
                    },
                    json: true
                }, function (err, resp, body) {
                    callback(body);
                });
            }
        });

    } else {

    }
    //if dictionary is empty, use houndify

    console.log(JSON.stringify(dictionary));
}

//Users
function userSearch(query, ghusername, callback) {
    var dictionary = {};
    var querySplit = query.split(" ");
    var showCommits = [
            "search username {{username}} on github",
            "search user {{username}} on github",
            "search username {{username}}",
            "search user {{username}}"
    ];
    for (var i = 0; i < showCommits.length; i++) {
        var showCommitsSplit = showCommits[i].split(" ");
        if (showCommitsSplit.length == querySplit.length) {
            for (var j = 0; j < querySplit.length; j++) {
                if (showCommitsSplit[j].includes("}}")) {
                    var variable = showCommitsSplit[j].match("\{{([^}]*)\}}");
                    dictionary[variable[1]] = querySplit[j];
                } else if (showCommitsSplit[j].toLowerCase() != querySplit[j].toLowerCase()) {
                    dictionary = {};
                    break;
                }
            }
        }
    }
    if (dictionary["username"] != null) {
        //https://api.github.com/users/vwsong?access_token=bfc679f6f560b2a396a2026626a33ccc566832fd
        var url = "https://api.github.com/users/" + dictionary['username'] + "?access_token=" + token;
        console.log(url);
        request({
            url: url,
            headers: {
                "User-Agent": "vwsong"
            },
            json: true
        }, function (err, resp, body) {
            callback(body);
        });
    } else {

    }

    console.log(JSON.stringify(dictionary));
}

function userInfoSearch(query, ghusername, callback) {
    var dictionary = {};
    var querySplit = query.split(" ");
    var showCommits = [
            "show my account information on github",
            "show my account info on github",
            "show my account information",
            "show my account info",
            "show my account",
            "show account",
            "show info"
    ];
    for (var i = 0; i < showCommits.length; i++) {
        var showCommitsSplit = showCommits[i].split(" ");
        if (showCommitsSplit.length == querySplit.length) {
            for (var j = 0; j < querySplit.length; j++) {
                if (showCommitsSplit[j].includes("}}")) {
                    var variable = showCommitsSplit[j].match("\{{([^}]*)\}}");
                    dictionary[variable[1]] = querySplit[j];
                } else if (showCommitsSplit[j].toLowerCase() != querySplit[j].toLowerCase()) {
                    dictionary = {};
                    break;
                }
            }
        }
    }

    //https://api.github.com/users/vwsong?access_token=bfc679f6f560b2a396a2026626a33ccc566832fd
    var url = "https://api.github.com/users/" + ghusername + "?access_token=" + token;
    console.log(url);
    request({
        url: url,
        headers: {
            "User-Agent": "vwsong"
        },
        json: true
    }, function (err, resp, body) {
        callback(body);
    });

    console.log(JSON.stringify(dictionary));
}

function urlSearch(query, ghusername, callback) {
    var dictionary = {};
    var querySplit = query.split(" ");
    var showCommits = [
            "show my account url on github",
            "show my url on github",
            "show my account on github",
            "show my account url"
    ];
    for (var i = 0; i < showCommits.length; i++) {
        var showCommitsSplit = showCommits[i].split(" ");
        if (showCommitsSplit.length == querySplit.length) {
            for (var j = 0; j < querySplit.length; j++) {
                if (showCommitsSplit[j].includes("}}")) {
                    var variable = showCommitsSplit[j].match("\{{([^}]*)\}}");
                    dictionary[variable[1]] = querySplit[j];
                } else if (showCommitsSplit[j].toLowerCase() != querySplit[j].toLowerCase()) {
                    dictionary = {};
                    break;
                }
            }
        }
    }

    //https://api.github.com/users/vwsong?access_token=bfc679f6f560b2a396a2026626a33ccc566832fd
    var url = "https://api.github.com/users/" + ghusername + "?access_token=" + token;
    console.log(url);
    request({
        url: url,
        headers: {
            "User-Agent": "vwsong"
        },
        json: true
    }, function (err, resp, body) {
        //console.log(body);
        callback({
            "url": body.url
        });
    });
    console.log(JSON.stringify(dictionary));
}

//Repositories
function repoSearch(query, ghusername, callback) {
    var dictionary = {};
    var querySplit = query.split(" ");
    var showCommits = [
            "search repository {{repository}} on github",
            "search repo {{repository}} on github",
            "search repository {{repository}}",
            "search repo {{repository}}"
    ];
    for (var i = 0; i < showCommits.length; i++) {
        var showCommitsSplit = showCommits[i].split(" ");
        if (showCommitsSplit.length == querySplit.length) {
            for (var j = 0; j < querySplit.length; j++) {
                console.log(showCommitsSplit[j], querySplit[j]);
                if (showCommitsSplit[j].includes("}}")) {
                    var variable = showCommitsSplit[j].match("\{{([^}]*)\}}");
                    dictionary[variable[1]] = querySplit[j];
                } else if (showCommitsSplit[j].toLowerCase() != querySplit[j].toLowerCase()) {
                    dictionary = {};
                    break;
                }
            }
        }
    }
    //https://api.github.com/users/vwsong/repos?access_token=bfc679f6f560b2a396a2026626a33ccc566832fd
    if (dictionary["repository"] != null) {
        //https://api.github.com/search/repositories?access_token=bfc679f6f560b2a396a2026626a33ccc566832fd&q=Bootstrap
        var url = "https://api.github.com/search/repositories?access_token=b33ad636a9468ceeff757795c7bfa2ae3b39bb78&" + dictionary['repository'];
        console.log(url);
        request({
            url: url,
            headers: {
                "User-Agent": "vwsong"
            },
            json: true
        }, function (err, resp, body) {
            callback(body);
        });
    } else {

    }
    if (dictionary["repository"] != null) {
        //https://api.github.com/users/vwsong?access_token=bfc679f6f560b2a396a2026626a33ccc566832fd
        var url = "https://api.github.com/search/repositories?access_token=b33ad636a9468ceeff757795c7bfa2ae3b39bb78" + dictionary['repository'];
        console.log(url);
        request({
            url: url,
            headers: {
                "User-Agent": "vwsong"
            },
            json: true
        }, function (err, resp, body) {
            callback(body);
        });
    } else {

    }
    console.log(JSON.stringify(dictionary));
}

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
            'Hound-Request-Authentication': "houndify_try_api_user;3ac7d580-362a-11e6-9f50-95528cc40d0e",
            'Hound-Client-Authentication': "jj_E0R4yxYBfyUffpY2sPw==;1466346568;u6WI9ZIZ-kgNwLtWrEBYUz99_6j5JwXCF7z6mbdgdpk=",
            'Hound-Request-Info': JSON.stringify(houndRequest)
        },
        json: true
    }, function (err, resp, body) {
        //        console.log(body);
        console.log(body.AllResults[0].WrittenResponseLong);
        callback({
            houdifyResponse: body.AllResults[0].WrittenResponseLong
        });
    });
}

function handleNotifications(query, ghusername, callback) {
    var dictionary = {};
    var querySplit = query.split(" ");
    var showCommits = [
            "show my notifications on github",
            "show my notifications",
            "show my github notifications",
            "show my account notifications",
            "show my notifications"
    ];
    for (var i = 0; i < showCommits.length; i++) {
        var showCommitsSplit = showCommits[i].split(" ");
        if (showCommitsSplit.length == querySplit.length) {
            for (var j = 0; j < querySplit.length; j++) {
                if (showCommitsSplit[j].includes("}}")) {
                    var variable = showCommitsSplit[j].match("\{{([^}]*)\}}");
                    dictionary[variable[1]] = querySplit[j];
                } else if (showCommitsSplit[j].toLowerCase() != querySplit[j].toLowerCase()) {
                    dictionary = {};
                    break;
                }
            }
        }
    }

    //https://api.github.com/users/vwsong?access_token=bfc679f6f560b2a396a2026626a33ccc566832fd
    var url = "https://api.github.com/notifications?access_token=b33ad636a9468ceeff757795c7bfa2ae3b39bb78";
    console.log(url);
    request({
        url: url,
        headers: {
            "User-Agent": "vwsong"
        },
        json: true
    }, function (err, resp, body) {
        callback(body);
    });

    console.log(JSON.stringify(dictionary));
}