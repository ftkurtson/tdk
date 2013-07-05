$(function() {
    var templates = {};

    function loadTemplate(id, file, callback) {

        // TODO: Queue up calls for the same template id

        // If the template is already loaded then return it
        if (typeof templates[id] !== "undefined") {
            if (typeof callback === "function") {
                callback(templates[id]);
            }

            return templates[id];
        }

        var template = twig({
            id: id,
            href: file,
            async: false,
            load: function(tpl) {
                if (typeof callback === "function") {
                    callback(tpl);
                }
            }
        });

        templates[id] = template;

        return template;
    }

    Twig.extendFunction("asset", function(url) {
        return "/template/" + url;
    });

    Twig.extend(function(Twig) {
        Twig.exports.extendTag({
            type: "extends",
            regex: /^extends\s+(.+)$/,
            next: [ ],
            open: true,
            compile: function(token) {
                var expression = token.match[1];

                // Compile the expression. (turns the string into tokens)
                token.stack = Twig.expression.compile.apply(this, [{
                    type:  Twig.expression.type.expression,
                    value: expression
                }]).stack;

                delete token.match;
                return token;
            },
            parse: function(token, context, chain) {
                // parse the tokens into a value with the render context
                var name = Twig.expression.parse.apply(this, [token.stack, context]),
                    output = '';

                return {
                    chain: false,
                    output: output
                };
            }
        });
    });

    idCount = 0;

    var widgets = [];

    function renderWidget(type, defaults) {
        // Capitalize the type to get its initial properties
        var name = type.charAt(0).toUpperCase() + type.slice(1);
        var initial = BaseKit.Widget[name + "Properties"] || {};

        var input = properties[type] || {};
        if (typeof input === "function") {
            input = input();
        }

        var params = $.extend(initial, defaults, input);

        var data = {
            profile: profile,
            data: params,
            pages: site
        };

        var widget = loadTemplate(type, "/widgets/widget_" + type + ".twig");
        var html = widget.render(data);

        var id = "id" + (++idCount);

        widgets.push({
            id: id,
            name: name,
            params: params,
            rerender: function(properties) {
                data.data = $.extend(data.data, properties, properties.temporary);
                return widget.render(data);
            }
        });

        return '<div id="' + id + '" class="widget ' + type + ' ' + params.preset + '">' + html + '</div>';
    }

    Twig.extendFunction("widget", function(type, id, defaults) {
        return renderWidget(type, defaults);
    });

    Twig.extendFunction("zone", function(name) {
        var html = "";

        switch (name) {
            case "main":
                html += renderWidget($("#widget1").val());
                html += renderWidget($("#widget2").val());
                break;
        }

        return html;
    });

    Twig.extendFilter("raw", function(input) {
        return input;
    });

    Twig.extendFilter("expandAssetUrl", function(url) {
        return "/template" + url;
    });

    Twig.extendFilter("translate", function(key, values) {
        return $.isArray(values) ? values[0] : values;
    });

    var unique = 0;

    function renderTemplate() {
        var iframe = $("iframe");

        var file = $("#template").val() || "default.twig";

        // Always make the id unique so we re-compile and render the template every time
        var template = loadTemplate(file + (++unique), "template/" + file);

        // Render the Twig template
        var html = template.render({
            profile: profile
        });

        // Inject the template HTML into the iframe
        iframe.contents().find("body").html(html);

        // Init the widgets in the iframe
        iframe.get(0).contentWindow.initWidgets(widgets);
        widgets = [];
    }

    $("#render").click(renderTemplate);

    setTimeout(renderTemplate, 1000);
});
