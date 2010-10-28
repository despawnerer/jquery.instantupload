
$(function() {

    /* Test the instant uploaders */

    $('#neat_instant_success').upload({
        success: function(id, response) {
            alert('Everything seems fine!');
        }
    });

    $('#neat_instant_error').upload({
        url: 'nonexistant_file.html',
        error: function(id, error) {
            alert('Whoops, an error happened: ' + error);
        }
    });

    $('#neat_instant_jpeg').upload({
        select: function(id, filename) {
            var extension = filename.split('.').pop().toLowerCase();
            if ($.inArray(extension, ['jpeg', 'jpg']) < 0) {
                alert('This is not a jpeg.');
                return false;
            }
        },
        success: function(id, response) {
            alert('Everything seems fine!');
        }
    });

});

