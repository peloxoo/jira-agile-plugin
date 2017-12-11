var currentTitle;
var currentKey;

function getProjects() {
    const rq = require('request-promise');

    var options = {
        uri: 'https://urjctfg.atlassian.net/rest/api/2/project',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW46UHAyMzA2NTk='
        },
        json: true // Automatically parses the JSON string in the response
    };

    return rq(options)
        .then(function (repos) {
            return repos;
        })
        .catch(function (err) {
            console.log(Error + err);
        });
}

function createIssue() {
    var feature = document.getElementById('myTitle').value;
    var description = document.getElementById('myText').value;

    if (!checkFeature(feature) || !checkDescription(description)) {
        showFailureMessage();
    } else {
        doPost(feature, description);
        showConfirmationMessage();
    }
}

function doPost(feature, description) {
    AP.request({
        url: '/rest/api/2/issue',
        type: "POST",
        data: JSON.stringify({
            "fields": {
                "project": {
                    "key": currentKey
                },
                "summary": feature,
                "description": description,
                "issuetype": {
                    "name": "Task"
                }
            }
        }),
        contentType: "application/json",
        success: function(msg){
            return msg;
        },
        error: function(msg){
            return msg;
        }
    });
}

function changeLink(key){
    document.getElementById(key).href="https://urjctfg.atlassian.net/browse/"+key;
}

if (typeof exports !== 'undefined') {
    exports.getProjects = getProjects;
    exports.doPost = doPost;
}

// aux functions
function checkFeature(feature) {
    if (feature.length > 9) {
        return true;
    } else {
        return false;
    }
}

function checkDescription(description) {
    if (description.length > 70) {
        return true;
    } else {
        return false;
    }
}

function namingProject(name, key){
    document.getElementById('title').innerHTML=name;
    currentTitle = name;
    currentKey = key;
}

function showConfirmationMessage(){
    document.getElementById('ConfirmationMessage').style.display="block";
    setTimeout(function(){
        AJS.dialog2("#dial-content").hide();
        document.getElementById('ConfirmationMessage').style.display="none";
        //location.reload(true);
    },1000)
};

function showFailureMessage(){
    document.getElementById('FailureMessage').style.display="block";
    setTimeout(function(){
        document.getElementById('FailureMessage').style.display="none";
    },3000)
};
