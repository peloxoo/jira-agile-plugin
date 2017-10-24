module.exports = function (app, addon) {

    // Root route. This route will serve the `atlassian-connect.json` unless the
    // documentation url inside `atlassian-connect.json` is set
    app.get('/', function (req, res) {
        res.format({
            // If the request content-type is text-html, it will decide which to serve up
            'text/html': function () {
                res.redirect('/atlassian-connect.json');
            },
            // This logic is here to make sure that the `atlassian-connect.json` is always
            // served up when requested by the host
            'application/json': function () {
                res.redirect('/atlassian-connect.json');
            }
        });
    });

    // This is an example route that's used by the default "generalPage" module.
    // Verify that the incoming request is authenticated with Atlassian Connect
    app.get('/hello-world', addon.authenticate(), function (req, res) {
        // Rendering a template is easy; the `render()` method takes two params: name of template
        // and a json object to pass the context in
        res.render('hello-world', {
            title: 'the best BDD JIRA Plugin'
            //issueId: req.query['issueId']
        });
    }
    );

    app.get('/bddShare', addon.authenticate(), function (req, res) {
        // Rendering a template is easy; the `render()` method takes two params: name of template
        // and a json object to pass the context in
        res.render('activity', {
            title: 'BDD Share',
            project: projects
            //issueId: req.query['issueId']
        });
    }
    );

    // Add any additional route handlers you need for views or REST resources here...

    var rq = require('request-promise');
    var projects;

    var options = {
        uri: 'https://urjctfg.atlassian.net/rest/api/2/project',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW46UHAyMzA2NTk='
        },
        json: true // Automatically parses the JSON string in the response
    };

    rq(options)
        .then(function (repos) {
            // console.log(repos);
            projects = repos[0].key;
        })
        .catch(function (err) {
            console.log(Error + err);
        });

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

    rq(opts)
    .then(function (repos) {
        console.log(repos);
    })
    .catch(function (err) {
        console.log(Error + err);
    });


    // load any additional files you have in routes and apply those to the app
    {
        var fs = require('fs');
        var path = require('path');
        var files = fs.readdirSync("routes");
        for (var index in files) {
            var file = files[index];
            if (file === "index.js") continue;
            // skip non-javascript files
            if (path.extname(file) != ".js") continue;

            var routes = require("./" + path.basename(file));

            if (typeof routes === "function") {
                routes(app, addon);
            }
        }
    }
};
