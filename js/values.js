/**
 * User profile values
 */
var profile = function(template) {
    return {
        business: "Smart Inc.",
        header: "",
        strapline: "",
        address1: "123 Example Street",
        address2: "Block Number One",
        postalcode: "BS1 2ND",
        phone: "(020) 123 456 789",
        email: "defaultemail@provider.com",
        twitter: "twitter.com",
        facebook: "facebook.com",
        linkedin: "linkedin.com",
        youtube: "youtube.com",
        googleplus: "googleplus.com",
        rss: "rss.com",
        copyright: "Copyright © 2013. All Rights Reserved."
    };
};

/**
 * Page setup
 */
var page = {
    seoLang: "en",
    keywords: "basekit",
    description: "BaseKit Template SDK",
    backgroundClass: "default"
};

/**
 * Site data
 */
var site = {
    'ref': 12345
};

/**
 * Text for use in content widgets
 */
var library = [
    // Lorem Ipsum
    "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>",
    // Gansta Ipsum
    "<p>Lorem ipsizzle dolizzle sit amizzle, daahng dawg we gonna chung elit. Da bomb boom shackalack fo shizzle, fo shizzle mah nizzle fo rizzle, mah home g-dizzle volutpat, funky fresh quis, gravida vizzle, tellivizzle. Pellentesque shizznit fo. Shiz erizzle. Things izzle dolizzle dapibus boofron tempizzle tempor. Maurizzle pellentesque gangster et boom shackalack.</p>",
    // Bacon Ipsum
    "<p>Bacon ipsum dolor sit amet biltong pastrami tenderloin ball tip jowl andouille. Strip steak meatball ribeye shoulder turducken doner, swine shankle pastrami drumstick meatloaf pork. Meatball ham capicola, strip steak andouille shank chuck chicken turducken venison leberkas ball tip. Tri-tip t-bone ball tip salami. Frankfurter brisket corned beef, fatback.</p>",
    // Dummy Terms & Conditions 
    "<p>This product is meant for educational purposes only. Any resemblance to real persons, living or dead is purely coincidental. Void where prohibited. Some assembly required. List each check separately by bank number. Batteries not included. Contents may settle during shipment. Use only as directed. No other warranty expressed or implied.</p>",
    // Cupcake Ipsum
    "<p>Marshmallow candy canes chocolate fruitcake icing gummies jujubes gummies. Unerdwear.com croissant croissant cookie gingerbread sweet. Pudding cake muffin tart halvah ice cream danish. Candy canes chocolate cake chocolate jelly. Ice cream danish biscuit lemon drops. Donut chupa chups jelly-o sweet roll danish toffee unerdwear.com bear claw lollipop.</p>",
    // Hipster Ipsum
    "<p>Umami Brooklyn eu Pinterest swag, dolore pop-up messenger bag anim tattooed nihil mumblecore veniam. Exercitation minim laboris, Neutra Carles Schlitz skateboard delectus ut direct trade eu ennui biodiesel put a bird on it. Culpa tempor flannel typewriter. Tote bag farm-to-table skateboard kale chips velit, elit organic minim qui shabby chic viral nostrud forage selfies banh mi.</p>"
];

/**
 * Widget properties
 * These can either be an object or a function that returns an object
 */
var properties = {
    feature: function(template, defaults) {
        return {
            preset: "align-center",
            bgImg: "templates/" + template + "/images/feature-bg.jpg",
            buttonText: "Sign Up",
            header: "My Website Header",
            strapline: "Here is the website strapline!"
        };
    },
    companyheader: function(template, defaults) {
        var properties = $.extend(defaults, {
            preset: "default",
            showLogo: 1
        });

        return properties;
    },
    content: function(template, defaults) {
        var properties = $.extend(defaults, {
            lines: "all"
        });

        if (typeof properties.content !== "string") {
            properties.content = library[Math.floor(Math.random() * library.length)];
        }

        return properties;
    },
    contactform: {
        preset: "todo",
        text: "Submit Form"
    },
    map: {
        height: 300
    },
    twitter: {
        // @todo: change this for something more visual
        tweets: [{"text": "How To Get Big-Brand Search Visibility","created_at": "Thu Aug 01 11:30:49 +0000 2013","source": "href=\"http://www.tweetdeck.com\" rel=\"nofollow\"TweetDeck","user": {"name": "BaseKit.Com","screen_name": "basekit","profile_image_url": "http://a0.twimg.com/profile_images/2388265742/8pkr9i1jj6x3wtu4h9j4_normal.jpeg","protected": false}}]
    },
    youtube: {
        videoId: "yfCdflc3x8U"
    },
    button: {
        text: "Click Me"
    },
    gallery: {
        preset: "default",
        albumRef: 1
    },
    extendednavigation: {
        align: "left"
    },
    responsiveslideshow: {
        preset: "default",
        albumRef: 1
    },
    image: function(template, defaults) {
        var properties = $.extend(defaults, {});

        return properties;
    },
    gallery: function(template, defaults) {
        var properties = $.extend(defaults, {});

        return properties;
    },
    responsiveslideshow: function(template, defaults) {
        var properties = $.extend(defaults, {});

        return properties;
    },
    profile: function(template, defaults) {
        var properties = $.extend(defaults, {});

        return properties;
    },
    navigation: function(template, defaults) {
        var properties = $.extend({
            preset: "default",
            align: "left"
        }, defaults);
    }
};

/**
 * Plugins data
 * Albums and images are defined here
 */
var plugins = function(template) {
    return {
        assets: {
            albums: {
                1: [1, 2, 3, 4, 5, 6]
            },
            images: {
                1: {
                    url: "templates/" + template + "/images/gallery/1.jpg"
                },
                2: {
                    url: "templates/" + template + "/images/gallery/2.jpg"
                },
                3: {
                    url: "templates/" + template + "/images/gallery/3.jpg"
                },
                4: {
                    url: "templates/" + template + "/images/gallery/4.jpg"
                },
                5: {
                    url: "templates/" + template + "/images/gallery/5.jpg"
                },
                6: {
                    url: "templates/" + template + "/images/gallery/6.jpg"
                }
            }
        }
    };
};

/**
 * Site navigation
 * Pages, folders and sub-pages can be defined for use in navigation menus
 */
var pages = [
    {
        ref: 1,
        request: "home",
        title: "Home",
        type: "page",
        status: "active",
        parent_id: 0,
        parentId: 0
    },
    {
        ref: 2,
        request: "about",
        title: "About",
        type: "page",
        status: "active",
        parent_id: 0,
        parentId: 0
    },
    {
        ref: 3,
        request: "contact",
        title: "Contact",
        type: "page",
        status: "active",
        parent_id: 0,
        parentId: 0
    },
    {
        ref: 4,
        request: "portfolio",
        title: "Portfolio",
        type: "folder",
        status: "active",
        subPages: [
            {
                ref: 5,
                request: "portfolio/web",
                title: "Web",
                type: "page",
                status: "active",
                parent_id: 4,
                parentId: 4
            },
            {
                ref: 6,
                request: "portfolio/print",
                title: "Print",
                type: "page",
                status: "active",
                parent_id: 4,
                parentId: 4
            },
            {
                ref: 7,
                request: "portfolio/canvas",
                title: "Canvas",
                type: "page",
                status: "active",
                parent_id: 4,
                parentId: 4
            }
        ]
    },
    {
        ref: 8,
        request: "gallery",
        title: "Gallery",
        type: "page",
        status: "active",
        parent_id: 0,
        parentId: 0
    }
];
