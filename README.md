
jQuery Instant Upload plugin
============================

This fairly simple instant upload plugin turns any DOM element into a button
that uploads a user-chosen file to the server through the forms mechanism,
in a fashion somewhat similar to sending an ajax request.

Usage
-----

    $(element).upload({
        url: '',
        name: '',
        enctype: 'multipart/form-data',
        select: function(filename, id) { },
        submit: function(id) {},
        error: function(error, id) {},
        success: function(response, id) {},
        complete: function(id) {}
    });

Most options should be pretty self-explanatory, but here goes:

* `url`: the url to send the upload request to; if unspecified, uses the `action` from the parent form of the element
* `name`: the `name` attribute for the uploader; if unspecified, uses the `name` attribute of the element
* `enctype`: the `enctype` attribute of the form used to upload the data, most of the time this should be left unchanged
* `select`: user-defined function, which is called whenever the user chooses a file to upload, but before the request is actually sent; use this to validate the choice, and return false to stop the upload from starting
* `submit`: user-defined function, which is called just before uploading
* `error`: called in case an error happened during the upload, with the error detail as the first argument 
* `success`: called if the upload succeeded, with the server response as the first argument
* `complete`: this function is called after the upload request is done, whether it was successful or not

All of the parameters are optional. All of the user-defined callbacks include
the current uploader id as the last arg. Whenever a request is sent, the id
changes, which allows one to use oen uploader to upload multiple files.


