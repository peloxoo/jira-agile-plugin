function getProjects() {
    var rq = require('request-promise');

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

function createIssue(key) {
    if (!checkFeature) {
        alert('Debes rellenar la feature');
    } else if (!checkDescription) {
        alert('No has rellenado la descripción, ¿estás seguro de enviar el issue?');
    } else {
        doPost(key);
    }
}

function doPost(key) {
    var rq = require('request-promise');
    
    var opts = {
        method: 'POST',
        uri: 'https://urjctfg.atlassian.net/rest/api/2/issue',
        body: {
            "fields": {
                "project": {
                    "key": "BDD"
                },
                "summary": "Tarea creada por código",
                "description": "Creating of an issue using project keys and issue type names using the REST API",
                "issuetype": {
                    "name": "Task"
                }
            }
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW46UHAyMzA2NTk='
        },
        json: true // Automatically parses the JSON string in the response
    };

    return rq(opts)
        .then(function (repos) {
            return repos;
        })
        .catch(function (err) {
            console.log(Error + err);
        })
}



if (typeof exports !== 'undefined') {
    exports.getProjects = getProjects;
    exports.doPost = doPost;
}

// aux functions
function checkFeature() {
    var title = document.getElementById('myTitle').value;
    if (title.length > 9) {
        return true;
    } else {
        return false;
    }
}

function checkDescription() {
    var description = document.getElementById('myText').value;
    if (description.length > 70) {
        return true;
    } else {
        return false;
    }
}
