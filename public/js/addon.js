/* add-on script */
// MyAddon functionality
$(function () {

    AJS.dialog2("#dial-content").hide();
    
    // Shows the dialog when the "Show dialog" button is clicked
    AJS.$(".dial-action").click(function () {
        AJS.dialog2("#dial-content").show();
        /*setTimeout(function(){
            document.getElementById('confirmationMessage').style.display="block";
            location.reload(true);
        },1000)*/
        refreshIssue();
    });

    // Hides the dialog
    AJS.$(".dial-close").click(function (e) {
        e.preventDefault();
        AJS.dialog2("#dial-content").hide();
    });

    AJS.$(".closer").click(function (e) {
        document.getElementById('ConfirmationMessage').style.display="none";
        document.getElementById('FailureMessage').style.display="none";
    });

});

function refreshIssue(){
    document.getElementById('myTitle').value='Feature: ';
    document.getElementById('myText').value='AS:  I WANT TO';
    document.getElementById('myText').value+='\nDESCRIPTION:  SO THEN';
    document.getElementById('myText').value+='\n\nSCENARIO: ';
    document.getElementById('myText').value+='\nGIVEN: ';
    document.getElementById('myText').value+='\nWHEN: ';
    document.getElementById('myText').value+='\nTHEN: ';
}
