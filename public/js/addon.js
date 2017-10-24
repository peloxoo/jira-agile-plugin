/* add-on script */
// MyAddon functionality
$(function () {

    AP.require(['request', 'JiraActivity'], function (request, JiraActivity) {
        request({
            url: '/rest/api/2/project',
            type: 'GET',
            success: function (response) {
                response = JSON.parse(response);
                for (var i = 0; i < response.length; i++) {
                    console.log(response[i].name);
                }

                JiraActivity.buildProjectTable(response, ".projects");
            },
            error: function (response) {
                alert(arguments);
            },
            contentType: "application/json"
        });
    });

    var issueData = {
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
    };

    AP.require('request', function (request) {
        request({
            url: '/rest/api/2/issue',
            // adjust to a POST instead of a GET
            type: 'POST',
            data: JSON.stringify(issueData),
            success: function (response) {
                // convert the string response to JSON
                response = JSON.parse(response);

                // dump out the response to the console
                console.log(response);
            },
            error: function () {
                console.log(arguments);
            },
            // inform the server what type of data is in the body of the HTTP POST
            contentType: "application/json",
        });
    });
});