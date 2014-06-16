bk$(function() {
    Server.plugins = sdkPlugins;
    // only choose selected widgets to be functional, most will be just static with no need of any JS capabilities
    var functionalWidgets = ['map', 'gallery', 'responsiveslideshow', 'ecombasket', 'ecomproduct', 'ecomcheckout', 'yelpreview'];
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