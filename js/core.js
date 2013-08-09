var App = {
    t: function(key, text) {
        return text;
    },
    session: {
        get: function(key) {
            switch (key) {
                case "siteRef":
                    return 12345;
                case "assetSubdomain":
                    return "55b558c7-resources";
                case "domain":
                    return "basekit.com";
                default:
                    return "";
            }
        }
    },
    fakeRender: function (type, properties) {
        var type = type.replace('widget.',''), 
            template = null,
            data = {};
        
        template = Util.loadTemplate(type, 'widgets/' + properties.type + '.twig', "", null, parent.window);
        
        data = {
            data: $.extend({}, properties.data, properties.changed, properties.temporary)
        };
        
        return template.render(data);
    }
};

var Util = {
    twigs: [],
    loadTemplate: function(id, file, base, callback, scope) {

        var error = null;
        
        scope = scope || parent.window

        // The only way to catch exceptions here is via window.onerror
        // This is horrible, but a simple try / catch doesn't seem to work
        // Probably something to do with the fact this can be called asynchronously
        var windowOnerror = window.onerror;
        window.onerror = function(msg) {
            error = new Error(msg);
        };

        // TODO: Queue up calls for the same template id

        // If the template is already loaded then return it
        if (typeof scope.Util.twigs[id] !== "undefined") {
            if (typeof callback === "function") {
                callback(scope.Util.twigs[id]);
            }

            return scope.Util.twigs[id];
        }
        
        var template = scope.twig({
            id: id,
            href: file,
            async: false,
            base: base || "",
            load: function(tpl) {
                if (typeof callback === "function") {
                    callback(tpl);
                }
            }
        });

        scope.Util.twigs[id] = template;

        // Replace window.onerror
        scope.onerror = windowOnerror;

        // Throw errors caught via window.onerror
        if (error) {
            throw error;
        }

        return template;
    }
}

var Site = {
    Page: {
        Globals: {

        }
    }
};

var Profile = {
    get: function(key) {
        return profile.key || "";
    }
};

var Server = {};
