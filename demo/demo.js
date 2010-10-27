
$(function() {

    /* Test the instant upload */

    var button = $('#neat_instant');
    button.upload({
        error: function(id, error) {
            alert('error in uploader ' + id + '; "' + error + '"');
        },
        submit: function(id) {
            alert('submitted uploader ' + id);
        }
    });

});

