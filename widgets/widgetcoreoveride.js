// RH: Widgetcore Javascript
(function () {
    // RH: Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.WidgetCoreOverride = {
        rerender: function () {
            var properties = this.getProperties('current'),
                pluginName = null;

            // HC: store the plugin data
            properties.plugins = {};

            if (typeof Server !== 'undefined' && Server.hasOwnProperty('plugins')) {
                // HC: get the plugin data from the server
                for (pluginName in Server.plugins) {
                    if (Server.plugins.hasOwnProperty(pluginName)) {
                        if (properties.plugins.hasOwnProperty(pluginName)) {
                            throw new Error('Plugin name conflicts');
                        } else {
                            properties.plugins[pluginName] = bk$.extend(true, {}, Server.plugins[pluginName]);
                        }
                    }
                }
            }

            // HC: make profile available for the published site widgets
            if (properties.profile !== undefined) {
                bk$.extend(true, properties.profile, Profile.profile);
            } else {
                properties.profile = Profile.profile;
            }

            this.el.html('');

            var html = window.parent.renderWidget(properties.type, this.el.attr('id'), properties.temporary, true),
                that = this,
                t = null;
                this.el.html(bk$(html).unwrap());
                
            t = setTimeout (function () {
                that.attachEvents();
            }, 1000);
        },

        rerenderPartial: function (tplName, tplData) {
            var html = window.parent.renderWidget(tplName, this.el.attr('id') + tplName.replace('widget_', ''), tplData, true);
            return bk$(html);
        }
    };
}());