/*!
 * jQuery Instant Upload plugin, v0.1
 *
 * Copyright 2010, Alexey Shelf
 * Licensed under GPLv3 or later.
 * http://www.gnu.org/licenses/
 */

(function($) {

    /* jQuery function binding */

    $.fn.upload = function(options) {

        // merge the options with defaults
        options = $.extend({
            url: '',
            name: '',
            enctype: 'multipart/form-data',
            select: function(filename, id) { return true; },
            submit: function(id) {},
            error: function(error, id) {},
            success: function(response, id) {},
            complete: function(id) {}
        }, options);

        this.each(function() {
            new Uploader(this, options);
        });

        return this;

    },

    /* The main Uploader object that actually controls the process */

    Uploader = function(element, options) {

        this.element = $(element);
        this.options = options;

        // use the form's action as our submit url if none is specified
        var form = this.element.closest('form');
        if (form.length > 0 && !this.options.url) {
            this.options.url = form.attr('action');
        }

        // use the element's name attr as our name, if not specified
        if (!this.options.name) {
            this.options.name = this.element.attr('name');
        }

        this.regenerate(); // get the first generation of controls

    }

    Uploader.prototype.regenerate = function() {
        var self = this;

        // a unique id for this generation of controls
        this.id = new Date().getTime().toString().substr(8);

        // make sure we can position our controls inside the element
        var position = this.element.css('position');
        if (position != 'absolute' && position != 'relative') {
            this.element.css('position', 'relative');
        }

        // an invisible iframe
        this.frame = $('<iframe></iframe>')
            .attr('id', 'iframe-' + this.id)
            .attr('name', 'iframe-' + this.id)
            .css('display', 'none')
            .appendTo(this.element);

        // a fake form we're gonna use to position and submit the image to
        this.form = $('<form></form>')
            .attr('method', 'post')
            .attr('enctype', this.options.enctype)
            .attr('action', this.options.url)
            .attr('target', 'iframe-' + this.id) // use our frame to submit
            .css({
                position: 'absolute',
                'text-align': 'right',
                right: 0,
                top: 0,
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: this.element.css('cursor')
            })
            .appendTo(this.element)

        // the actual clickable input
        this.input = $('<input/>')
            .attr('name', this.options.name)
            .attr('type', 'file')
            .css({
                position: 'absolute',
                right: 0,
                top: 0,
                cursor: this.element.css('cursor')
            })
            .appendTo(this.form);

        // make sure input's height is large enough to fill the element
        // firefox doesn't like to hide overflowing file inputs, so
        // use the actual height instead of some unbelieveablyLargeNumber
        if (this.element.innerHeight() > 0) {
            this.input.css({
                 height: this.element.innerHeight() + 'px',
                'font-size': this.element.innerHeight() + 'px'
            });
        }

        // IE8 doesn't let you click the button unless the control is focused
        if ($.browser.msie) { 
            this.element.mouseover(function(event) {
                self.input.focus();
            });
        }

        // watch the file selection and submit the form when a file is changed
        this.input.change(function() {
            var filename = self.input.val();
            // call the user-provided select function, which can be used to
            // validate the filename to determine if we should submit or not
            if (self.options.select(filename, self.id) != false) {
                self.submit();
            }
        });

    }

    Uploader.prototype.submit = function() {
        var self = this;

        // call the user-defined callback
        this.options.submit(this.id);

        // submit the actual form
        this.form
            .appendTo('body') // jquery.validate doesn't enjoy forms-in-forms
            .submit();

        // wait till the file is done uploading
        var id = this.id;
        this.frame
            .unbind('load')
            .load(function(event) {
                var document = this.contentWindow.document;
                if (document) {
                    // get the response in plain text and call the callback
                    var response = $(this.contentWindow.document.body).html();
                    self.options.success(response, id);
                } else {
                    self.options.error('not_loaded', id);
                }
                self.options.complete(id);
                // remove the frame
                $(this).remove();
            });

        // remove the old set of controls, generate the new ones
        this.form.remove();
        this.regenerate();
    }

})(jQuery);

