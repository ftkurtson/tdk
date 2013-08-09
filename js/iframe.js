$(function() {
    Server.plugins = sdkPlugins;
    sdkWidgets.forEach(function(widget) {
        var el = $("#" + widget.id);
        el["basekitWidget" + widget.name](widget.params);
        var object = el.data("bkob");
        object.scope.properties.data = widget.params;
        object.rerender = function () {
            var properties = this.getProperties('current');
            this.el.html(App.fakeRender(properties.type, properties));
        };
    });
});
