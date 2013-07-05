$(function() {
    var twigs = {};

    function loadTemplate(id, file, callback) {

        // TODO: Queue up calls for the same template id

        // If the template is already loaded then return it
        if (typeof twigs[id] !== "undefined") {
            if (typeof callback === "function") {
                callback(twigs[id]);
            }

            return twigs[id];
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

        twigs[id] = template;

        return template;
    }

    Twig.extendFunction("asset", function(url) {
        var template = $("#template").val() || "none";
        return "/templates/" + template + "/" + url;
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
        var template = $("#template").val() || "none";

        // Capitalize the type to get its initial properties
        var name = type.charAt(0).toUpperCase() + type.slice(1);
        var initial = BaseKit.Widget[name + "Properties"] || {};

        var input = properties[type] || {};
        if (typeof input === "function") {
            input = input(template);
        }

        var params = $.extend(initial, defaults, input);

        var data = {
            profile: profile(template),
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
                // Use this to grab rerender properties
                //console.log(properties);
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
        var template = $("#template").val() || "none";
        return "/templates/" + template + "/" + url;
    });

    Twig.extendFilter("translate", function(key, values) {
        return $.isArray(values) ? values[0] : values;
    });

    var unique = 0;

    function renderTemplate() {
        var template = $("#template").val() || "none", file = $("#layout").val() || "default.twig";

        // Parse the LESS code for the selected template
        var parser = new(less.Parser);
        parser.parse('@import "vars.less";\n@import "presets.less";\n@import "templates/' + template + '/stylesheet.less";', function(e, tree) {
            if (e) {
                return console.log(e);
            }

            var iframe = $("iframe");

            // Always make the id unique so we re-compile and render the template every time
            var twig = loadTemplate(template + "/" + file + (++unique), "templates/" + template + "/" + file);

            // Render the Twig template
            var html = twig.render({
                profile: profile(template)
            });

            // Inject the template HTML into the iframe
            iframe.contents().find("body").html(html);

            // Inject the CSS into the iframe
            iframe.contents().find("#styles").html(tree.toCSS());

            // Get the iframe window
            iframeWindow = iframe.get(0).contentWindow;

            // Store the selected template in the top-level and iframe windows
            iframeWindow.selectedTemplate = template;
            window.selectedTemplate = template;

            // Init the widgets in the iframe
            iframeWindow.initWidgets(widgets);
            widgets = [];
        });
    }

    // Render the template when the button is clicked
    $("#render").click(renderTemplate);

    templates.forEach(function(template) {
        $("#template")
            .append($("<option></option>")
                .attr("value", template.directory)
                .text(template.name)
            );
    });

    // Wait before rendering as there are lots of resources to be loaded
    setTimeout(renderTemplate, 500);
});
