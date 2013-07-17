$(function() {
    Server.plugins = sdkPlugins;
    sdkWidgets.forEach(function(widget) {
        var el = $("#" + widget.id);
        el["basekitWidget" + widget.name](widget.params);
        var object = el.data("bkob");
        object.rerender = function() {
            return widget.rerender(object.getProperties());
        };
    });
});
