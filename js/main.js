$(function() {

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

    Twig.extendFunction("asset", function(url) {
        var template = $("#template").val() || "none";
        return "templates/" + template + "/" + url;
    });

    Twig.extendFunction("widget", function(type, id, args) {
        return renderWidget(type, id, args);
    });

    Twig.extendFunction("zone", function(name) {
        var html = "";

        switch (name) {
            case "main":
                html += renderWidget('content', 'maincontent1');
                html += renderWidget('contactform', 'maincontactform1');
                html += renderWidget('twitter', 'maintwitter1');
                html += renderWidget('line', 'mainline1');
                html += renderWidget('button', 'mainbutton1');
                html += renderWidget('socialicons', 'mainsocialicons1');
                html += renderWidget('youtube', 'mainyoutube1');
                html += renderWidget('map', 'mainmap1');
                html += renderWidget('image', 'mainimage1');
                html += renderWidget('paypalbuynow', 'mainpaypalbuynow1');
                html += renderWidget('tweet', 'maintweet1');
                html += renderWidget('dropbox', 'maindropbox1');
                html += renderWidget('clicktocall', 'mainclicktocall1');
                html += renderWidget('gallery', 'maingallery1');
                html += renderWidget('responsiveslideshow', 'mainresponsiveslideshow1');
                html += renderWidget('signupform', 'mainsignupform1');
                break;
        }

        return html;
    });

    Twig.extendFilter("raw", function(input) {
        return input;
    });

    Twig.extendFilter("expandAssetUrl", function(url) {
        var template = $("#template").val() || "none";
        return "templates/" + template + "/" + url;
    });

    Twig.extendFilter("translate", function(key, values) {
        return $.isArray(values) ? values[0] : values;
    });

    var unique = 0,
        currentTemplate = null,
        widgets = [];

    function loadTemplate(id, file, base, callback, scope) {

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

    function defaultProperties(template, defaults) {
        return defaults;
    }

    function renderWidget(type, id, args) {
        var template = $("#template").val() || "none";

        // Capitalize the type to get its initial properties
        var name = type.charAt(0).toUpperCase() + type.slice(1);

        var initial = BaseKit.Widget[name + "Properties"] || {};
        var widgetProperties = properties[type];

        if (type === 'profile') {
            if (properties[args.profileType])
            {
                widgetProperties = properties[args.profileType];
            }
        }

        var input = widgetProperties || defaultProperties;

        if (typeof input === "function") {
            input = input(template, typeof args === "object" && args !== null ? args : {});
        }

        initial.type = type;
        var params = $.extend({}, initial, input);

        var data = {
            profile: profile(template),
            data: params,
            pages: pages,
            plugins: plugins(template)
        };

        var widget = loadTemplate(id, "widgets/widget_" + type + ".twig");
        var html = widget.render(data);

        widgets.push({
            id: id,
            name: name,
            type: type,
            params: params
        });

        return '<div id="' + id + '" class="widget ' + type + '">' + html + '</div>';
    }

    function renderTemplate() {
        // Make sure that both LESS and Twig don't cache

        if (typeof window.localStorage !== "undefined") {
            localStorage.clear();
        }

        Twig.cache(false);

        // Clear widgets
        widgets = [];

        var template = $("#template").val() || "none", file = $("#layout").val() || "default.twig";
        var colourSwatchIndex = $("#colour-swatch").val() || 0;

        if (currentTemplate != template) {
            currentTemplate = template;

            // Reset the colour swatch
            colourSwatchIndex = 0;
        }

        site.colorSwatch = 'swatch-' + (parseInt(colourSwatchIndex, 10) + 1);

        // Grab the metadata.json file
        $.getJSON("templates/" + template + "/metadata.json").done(function(data) {
            // Build the LESS variables for this template

            var error, varsLess = "";

            // Check that the metadata.json file contains colour and font swatches

            if (typeof data.colorSwatches === "undefined") {
                error = "Template Metadata Error\nNo 'colorSwatches' provided";
                alert(error);
                throw error;
            }

            if (typeof data.fontSwatch === "undefined") {
                error = "Template Metadata Error\nNo 'fontSwatch' provided";
                alert(error);
                throw error;
            }

            // Add the templateCommon & templateLocal strings into the mix
            varsLess += '@templateCommon: "/templates/common";';
            varsLess += '@templateLocal: "/templates/' + template + '";';

            var colourNumber = 0;

            $("#colour-swatch").empty();

            for (var name in data.colorSwatches) {
                var colours = data.colorSwatches[name];

                if (colourNumber == colourSwatchIndex) {
                    var index = 0;
                    for (var key in colours) {
                        varsLess += "@color-swatch" + (index + 1) + ":" + colours[key] + ";\n";
                        index++;
                    }
                }

                $("#colour-swatch")
                    .append($("<option></option>")
                        .attr("value", colourNumber)
                        .text(name)
                    );

                colourNumber++;
            }

            $("#colour-swatch").val(colourSwatchIndex);

            for (var fontNumber = 1; fontNumber < 11; fontNumber++) {
                if (typeof data.fontSwatch["font" + fontNumber] === "undefined") {
                    error = "Template Metadata Error\nNo 'fontSwatch.font" + fontNumber + "' provided";
                    alert(error);
                    throw error;
                }

                var font = data.fontSwatch["font" + fontNumber];

                for (var attribute in font) {
                    varsLess += "@font-swatch" + (fontNumber) + "-" + attribute + ":" + font[attribute] + ";\n";
                }
            }

            // Parse the LESS code for the selected template
            var parser = new(less.Parser)();
            parser.parse(varsLess + '@import "less/vars.less";\n@import "less/presets.less";\n@import "templates/' + template + '/stylesheet.less";', function(e, tree) {
                if (e) {
                    alert("LESS Parse Error\n" + e.message);
                    console.log(e);
                    throw e;
                }

                var iframe = $("iframe");

                try {
                    // Always make the id unique so we re-compile and render the template every time
                    var twig = loadTemplate(template + "/" + file + (++unique), "templates/" + template + "/" + file, "templates/" + template);
                } catch (e) {
                    if (e.message.substring(0, 9) == "Uncaught ") {
                        e.message = e.message.substring(9);
                    }

                    if (e.message.substring(0, 15) == "TwigException: ") {
                        e.message = e.message.substring(15);
                    }

                    alert("Twig Compile Error\n" + e.message);
                    console.log(e.message);
                    throw e.message;
                }

                // Render the compiled Twig template to HTML
                try {
                    var html = twig.render({
                        assetSubdomain: "",
                        assetDomain: window.location.hostname,
                        env: {
                            assetSubdomain: "",
                            assetDomain: window.location.hostname
                        },
                        brand: {
                            domain: window.location.hostname
                        },
                        site: site,
                        page: page,
                        profile: profile(template),
                        plugins: plugins(template),
                        basekit: {
                            headScript: "headscript.twig",
                            bodyScript: "bodyscript.twig"
                        }
                    });
                } catch (e) {
                    alert("Twig Render Error\n" + e.message);
                    console.log(e);
                    throw e;
                }

                // Compile parsed LESS tree to CSS
                try {
                    var css = tree.toCSS();
                } catch (e) {
                    alert("LESS Compile Error\n" + e.message + " on line " + e.line + " of " + e.filename);
                    console.log(e);
                    throw e;
                }

                // Construct the widgets Javascript
                // Note that this is base64 encoded to prevent XSS protection from kicking in
                var js = 'var sdkWidgets = ' + JSON.stringify(widgets) + ';';
                js += 'var sdkPlugins = ' + JSON.stringify(plugins(template)) + ';';

                // Submit the form to the iframe
                $("#html").val(B64.encode(html));
                $("#css").val(B64.encode(css));
                $("#js").val(B64.encode(js));
                $("#post").submit();
            });
        }).fail(function() {
            var error = "Template Metadata Error\nJSON syntax error";
            alert(error);
            throw error;
        });
    }

    $("#render").click(renderTemplate);

    templates.forEach(function(template) {
        $("#template")
            .append($("<option></option>")
                .attr("value", template.directory)
                .text(template.name)
            );
    });

    $(document).ready(function () {
        renderTemplate();
    });
});