$(function() {
    Server.plugins = sdkPlugins;
    // only choose selected widgets to be functional, most will be just static with no need of any JS capabilities
    var functionalWidgets = ['map', 'gallery', 'responsiveslideshow'];
    sdkWidgets.forEach(function(widget) {
        if ($.inArray(widget.type, functionalWidgets) === -1) {
            return;
        }

        var el = $("#" + widget.id);
        el["basekitWidget" + widget.name](widget.params);
        var object = el.data("bkob");
        object.scope.properties.data = widget.params;
    });
});