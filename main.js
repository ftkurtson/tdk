$(function() {
    var templates = {};

    function loadTemplate(id, file, callback) {

        // TODO: Queue up calls for the same template id

        // If the template is already loaded then return it
        if (typeof templates[id] !== "undefined") {
            if (typeof callback === "function") {
                return templates[id];
            }
        }

        var template = null;

        // Load the template's twig file
        $.ajax({
            async: typeof callback === "function" ? true : false,
            url : file,
            dataType: "text",
            success: function (data) {

                // Create the template
                template = templates[id] || twig({
                    id: id,
                    data: data
                });

                // Cache the template for next time
                templates[id] = template;

                if (typeof callback === "function") {
                    callback(template);
                }
            }
        });

        return template;
    }

    Twig.extendFunction("asset", function(url) {
        return "/template/" + url;
    });

    idCount = 0;

    function renderWidget(type, defaults) {
        var input = properties[type] || {};
        if (typeof input === "function") {
            input = input();
        }

        var params = $.extend(defaults, input);

        var widget = loadTemplate(type, "/widgets/widget_" + type + ".twig");
        var html = widget.render({
            profile: profile,
            data: params,
            pages: site
        });

        // TODO: Mixin default properties

        return '<div id="id' + (++idCount) + '" class="widget ' + type + ' ' + params.preset + '">' + html + '</div>';
    }

    Twig.extendFunction("widget", function(type, id, defaults) {
        return renderWidget(type, defaults);
    });

    Twig.extendFunction("zone", function(name) {
        var html = "";

        switch (name) {
            case "main":
                widgets.forEach(function(type) {
                    html += renderWidget(type);
                });
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
        var template = loadTemplate(file + (++unique), "/template/" + file);

        var html = template.render({
            profile: profile
        });

        iframe.contents().find("body").html(html);
    }

    $("#render").click(renderTemplate);

    setTimeout(renderTemplate, 1000);
});
