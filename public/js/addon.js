/* add-on script */
// MyAddon functionality
$(function () {
    AJS.dialog2("#dial-content").hide();
    // Shows the dialog when the "Show dialog" button is clicked
    AJS.$(".dial-action").click(function () {
        AJS.dialog2("#dial-content").show();
    });

    // Hides the dialog
    AJS.$("#dial-close").click(function (e) {
        e.preventDefault();
        AJS.dialog2("#dial-content").hide();
    });
});