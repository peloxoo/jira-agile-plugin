function testFunction () {
    return 1;
}

function getPromise() {
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

// If we're running under Node
if(typeof exports !== 'undefined') {
    exports.testFunction = testFunction;
    exports.getPromise = getPromise;
}