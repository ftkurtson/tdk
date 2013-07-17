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
    }
};

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
