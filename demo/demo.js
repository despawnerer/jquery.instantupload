
$(function() {

    /* Test the instant upload */

    var button = $('#neat_instant');
    button.upload({
        select: function(id, filename) {
            alert('selected in uploader ' + id + ': ' + filename);
        },
        submit: function(id) {
            alert('submitted uploader ' + id);
        },
        error: function(id, error) {
            alert('error in uploader ' + id + '; "' + error + '"');
        },
        success: function(id) {
            alert('uploader ' + id + ' succeeded');
        }
    });

});

