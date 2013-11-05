$(function() {
    Server.plugins = sdkPlugins;
    // only turn selected widgets to be functional
    var allowedWidgets = ['map'];
    sdkWidgets.forEach(function(widget) {
        if ($.inArray(widget.type, allowedWidgets) === -1) {
            return;
        }

        var el = $("#" + widget.id);
        el["basekitWidget" + widget.name](widget.params);
        var object = el.data("bkob");
        object.scope.properties.data = widget.params;
    });
});
