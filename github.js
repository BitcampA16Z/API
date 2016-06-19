module.exports = function handleRequests(query) {
    if (query.includes("commits") || query.includes("commit")) {
        handleCommits(query);
    } else if ((query.includes("Search") && query.includes("username")) || (query.includes("Search") && query.includes("user"))) {
        userSearch(query);
    } else if (query.includes("Show") && query.includes("information")) {
        userInfoSearch(query);
    } else if ((query.includes("Show") && query.includes("account")) || (query.includes("Show") && query.includes("URL"))) {
        urlSearch(query);
    } else if (query.includes("repo") || query.includes("repository")) {
        repoSearch(query);
    }
}

//Commits
function handleCommits(query) {
        var dictionary = {};
        var querySplit = query.split(" ");
        var showCommits = [
            "Show my commits in {{repo}} on Github",
            "Show commits in {{repo}}",
            "Show my commits in {{repo}}",
            "Show {{repo}} commits"
    ];
        for (var i = 0; i < showCommits.length; i++) {
            var showCommitsSplit = showCommits[i].split(" ");
            if (showCommitsSplit.length == querySplit.length) {
                for (var j = 0; j < querySplit.length; j++) {
                    if (showCommitsSplit[j].includes("}}")) {
                        var variable = showCommitsSplit[j].match("\{{([^}]*)\}}");
                        dictionary[variable[1]] = querySplit[j];
                    } else if (showCommitsSplit[i] != querySplit[i]) {
                        dictionary = {};
                        break;
                    }
                }
            }
        }

        if (!dictionary.length == 0)) {
        //make API call w/variables
        //username, repo
    } else {
        //feed into houndify   
    }
    //if dictionary is empty, use houndify


console.log(JSON.stringify(dictionary));
}

//Users
function userSearch(query) {
    var dictionary = {};
    var querySplit = query.split(" ");
    var showCommits = [
            "Search username {{username}} on Github",
            "Search user {{username}} on Github",
            "Search username {{username}}",
            "Search user {{username}}"
    ];
    for (var i = 0; i < showCommits.length; i++) {
        var showCommitsSplit = showCommits[i].split(" ");
        if (showCommitsSplit.length == querySplit.length) {
            for (var j = 0; j < querySplit.length; j++) {
                if (showCommitsSplit[j].includes("}}")) {
                    var variable = showCommitsSplit[j].match("\{{([^}]*)\}}");
                    dictionary[variable[1]] = querySplit[j];
                } else if (showCommitsSplit[i] != querySplit[i]) {
                    dictionary = {};
                    break;
                }
            }
        }
    }

    if (dictionary.length == 0) {
        //make API call w/variables
        //username, repo
    } else {
        //feed into houndify   
    }

    //make API call w/variables
    //username
    console.log(JSON.stringify(dictionary));
}

function userInfoSearch(query) {
    var dictionary = {};
    var querySplit = query.split(" ");
    var showCommits = [
            "Show my account information on Github",
            "Show my account information",
            "Show my account",
            "Show account",
            "Show info"
    ];
    for (var i = 0; i < showCommits.length; i++) {
        var showCommitsSplit = showCommits[i].split(" ");
        if (showCommitsSplit.length == querySplit.length) {
            for (var j = 0; j < querySplit.length; j++) {
                if (showCommitsSplit[j].includes("}}")) {
                    var variable = showCommitsSplit[j].match("\{{([^}]*)\}}");
                    dictionary[variable[1]] = querySplit[j];
                } else if (showCommitsSplit[i] != querySplit[i]) {
                    dictionary = {};
                    break;
                }
            }
        }
    }

    if (dictionary.length == 0) {
        //make API call w/variables
        //username, repo
    } else {
        //feed into houndify   
    }
    //make API call w/variables:
    //username
    console.log(JSON.stringify(dictionary));
}

function urlSearch(query) {
    var dictionary = {};
    var querySplit = query.split(" ");
    var showCommits = [
            "Show my account URL on Github",
            "Show my URL on Github",
            "Show my account on Github"
    ];
    for (var i = 0; i < showCommits.length; i++) {
        var showCommitsSplit = showCommits[i].split(" ");
        if (showCommitsSplit.length == querySplit.length) {
            for (var j = 0; j < querySplit.length; j++) {
                if (showCommitsSplit[j].includes("}}")) {
                    var variable = showCommitsSplit[j].match("\{{([^}]*)\}}");
                    dictionary[variable[1]] = querySplit[j];
                } else if (showCommitsSplit[i] != querySplit[i]) {
                    dictionary = {};
                    break;
                }
            }
        }
    }

    if(dictionary.length == 0){
        //make API call w/variables
        //username, repo
    } else {
        //feed into houndify   
    }
    //make API call w/variables:
    //username
    console.log(JSON.stringify(dictionary));
}

//Repositories
function urlSearch(query) {
    var dictionary = {};
    var querySplit = query.split(" ");
    var showCommits = [
            "Search repository {{repository}} on Github",
            "Search repo {{repository}} on Github",
            "Search repository {{repository}}",
            "Search repo {{repository}}"
    ];
    for (var i = 0; i < showCommits.length; i++) {
        var showCommitsSplit = showCommits[i].split(" ");
        if (showCommitsSplit.length == querySplit.length) {
            for (var j = 0; j < querySplit.length; j++) {
                if (showCommitsSplit[j].includes("}}")) {
                    var variable = showCommitsSplit[j].match("\{{([^}]*)\}}");
                    dictionary[variable[1]] = querySplit[j];
                } else if (showCommitsSplit[i] != querySplit[i]) {
                    dictionary = {};
                    break;
                }
            }
        }
    }

    if(dictionary.length == 0){
        //make API call w/variables
        //username, repo
    } else {
        //feed into houndify   
    }
    //make API call w/variables:
    //repository
    console.log(JSON.stringify(dictionary));
}