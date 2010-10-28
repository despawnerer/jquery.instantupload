
$(function() {

    /* Test the instant upload */

    var button = $('#neat_instant');
    button.upload({
        select: function(id, filename) {
            alert('selected in uploader ' + id + ': ' + filename);
        },
        error: function(id, error) {
            alert('error in uploader ' + id + '; "' + error + '"');
        },
        submit: function(id) {
            alert('submitted uploader ' + id);
        }
    });

});

