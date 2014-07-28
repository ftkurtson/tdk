bk$(function() {
    Server.plugins = sdkPlugins;
    Server.app = {
        'mode': 'published'
    };
    Server.page = page;

    // only choose selected widgets to be functional, most will be just static with no need of any JS capabilities
    var functionalWidgets = ['extendednavigation', 'map', 'gallery', 'responsiveslideshow','blogpost', 'ecombasket', 'ecomproduct', 'ecomcheckout', 'yelpreview', 'contactform'];
    sdkWidgets.forEach(function(widget) {
        if (bk$.inArray(widget.type, functionalWidgets) === -1) {
            return;
        }

        var el = bk$("#" + widget.id);

        el["basekitWidget" + widget.name](widget.params);
        var object = el.data("bkob");

        object.scope.properties.data = widget.params;
    });
});