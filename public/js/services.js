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

    if (!checkFeature(feature)) {
        alert('Debes rellenar la feature');
    } else if (!checkDescription(description)) {
        alert('No has rellenado la descripción, ¿estás seguro de enviar el issue?');
    } else {
        doPost(feature, description);
    }
}

/*function doPost() { 
    var rq = require('request-promise');
    var feature = document.getElementById('myTitle').value;
    var description = document.getElementById('myText').value;
    var credentials = b64EncodeUnicode('admin' + ':' + 'Pp230659');
    
    var optsPost = {
        method: 'POST',
        uri: '/rest/api/2/issue',
        body: {
            "fields": {
                "project": {
                    "key": currentTitle
                },
                "summary": feature,
                "description": description,
                "issuetype": {
                    "name": "Task"
                }
            }
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': credentials
        },
        json: true // Automatically parses the JSON string in the response
    };

    return rq(optsPost)
        .then(function (repos) {
            return repos;
        })
        .catch(function (err) {
            console.log(Error + err);
        })*/

    /*AJS.$.ajax({
        type: 'POST',
        url: 'https://urjctfg.atlassian.net/rest/api/2/issue',
        data: JSON.stringify({
            "fields": {
                "project": {
                    "key": "BDD"
                },
                "summary": "Prueba ajax",
                "description": "Creating of an issue using project keys and issue type names using the REST API",
                "issuetype": {
                    "name": "Task"
                }
            }
        }),
        success: function(data){
            alert(data);
        },
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', 'Basic YWRtaW46UHAyMzA2NTk=');
        }
    });
}*/

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
