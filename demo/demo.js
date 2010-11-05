
$(function() {

    /* Test the instant uploaders */

    $('#neat_instant_success').upload({
        success: function(response, id) {
            alert('Everything seems fine!');
        }
    });

    $('#neat_instant_error').upload({
        url: 'nonexistant_file.html',
        error: function(error, id) {
            alert('Whoops, an error happened: ' + error);
        }
    });

    $('#neat_instant_jpeg').upload({
        select: function(filename, id) {
            var extension = filename.split('.').pop().toLowerCase();
            if ($.inArray(extension, ['jpeg', 'jpg']) < 0) {
                alert('This is not a jpeg.');
                return false;
            }
        },
        success: function(response, id) {
            alert('Everything seems fine!');
        }
    });

});

