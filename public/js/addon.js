/* add-on script */
// MyAddon functionality
$(function () {

    AJS.dialog2("#dial-content").hide();
    
    // Shows the dialog when the "Show dialog" button is clicked
    AJS.$(".dial-action").click(function () {
        AJS.dialog2("#dial-content").show();
    });

    // Hides the dialog
    AJS.$(".dial-close").click(function (e) {
        e.preventDefault();
        AJS.dialog2("#dial-content").hide();
    });

    document.getElementById('myText').value+='As:  I want to';
    document.getElementById('myText').value+='\nDescription:  so then';
    document.getElementById('myText').value+='\n\nScenario: ';
    document.getElementById('myText').value+='\nGiven: ';
    document.getElementById('myText').value+='\nWhen: ';
    document.getElementById('myText').value+='\nThen: ';
});

function namingProject(name) {
    document.getElementById("title").innerHTML = "Projecto: " + name;
}
