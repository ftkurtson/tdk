/**
 * User Profile Values
 *
 * Widget properties with the value "profile" will use the corresponding profile value.
 * Text in templates should use the profile wherever possible.
 */
var profile = function(template) {
    return {
        business: "Smart Inc.",
        header: "My Website Header",
        strapline: "Here is the website strapline!",
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
        copyright: "Copyright 2013. All Rights Reserved."
    };
};

/**
 * Text Widget Content
 *
 * This will only be used where there is no default content specified in a widget.
 * Template text widgets should always have a default value, so this content should only appear within the main zone.
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
 * Widget Properties
 *
 * These can either be an object or a function that returns an object.
 * You should always extend the default properties (via the defaults argument).
 */
var properties = {
    feature: function(template, defaults) {
        return $.extend(defaults, {
            preset: "align-center",
            bgImg: "templates/" + template + "/images/feature-bg.jpg",
            buttonText: "Sign Up",
            header: "My Website Header",
            strapline: "Here is the website strapline!"
        });
    },
    companyname: function(template, defaults) {
        return $.extend(defaults, {
            url:"home"
        });
    },
    companyheader: function(template, defaults) {
        return $.extend(defaults, {
            preset: "default",
            showLogo: 1
        });
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
    contactform: function(template, defaults) {
        return $.extend(defaults, {
            preset: "todo",
            text: "Submit Form"
        });
    },
    map: function(template, defaults) {
        return $.extend(defaults, {
            height: 300,
            markerPath: '/images/map-marker.png'
        });
    },
    twitter: function(template, defaults) {
        return $.extend(defaults, {
            tweets: [
                {
                    "text": "How To Get Big-Brand Search Visibility",
                    "createdAt": "Thu Aug 01 11:30:49 +0000 2013",
                    "source": "<a href=\"http://www.tweetdeck.com\" rel=\"nofollow\">TweetDeck</a>",
                    "fullName": "BaseKit.Com",
                    "screenName": "basekit",
                    "imageUrl": "http://a0.twimg.com/profile_images/2388265742/8pkr9i1jj6x3wtu4h9j4_normal.jpeg"
                },
                {
                    "text": "Check out the 10 companies that control the internet ",
                    "createdAt": "Thu Aug 01 10:30:49 +0000 2013",
                    "source": "<a href=\"http://www.tweetdeck.com\" rel=\"nofollow\">TweetDeck</a>",
                    "fullName": "BaseKit.Com",
                    "screenName": "basekit",
                    "imageUrl": "http://a0.twimg.com/profile_images/2388265742/8pkr9i1jj6x3wtu4h9j4_normal.jpeg"
                }
            ]
        });
    },
    youtube: function(template, defaults) {
        return $.extend(defaults, {
            videoId: "yfCdflc3x8U"
        });
    },
    button: function(template, defaults) {
        return $.extend(defaults, {
            text: "Click Me"
        });
    },
    gallery: function(template, defaults) {
        return $.extend({
            preset: "default",
            albumRef: 1
        }, defaults);
    },
    extendednavigation: function(template, defaults) {
        return $.extend(defaults, {
            align: "left"
        });
    },
    responsiveslideshow: function(template, defaults) {
        return $.extend(defaults, {
            preset: "default",
            albumRef: 0
        });
    },
    navigation: function(template, defaults) {
        return $.extend({
            preset: "default",
            align: "left"
        }, defaults);
    },
    image: function(template, defaults) {
        return $.extend({
            src: "http://placehold.it/250x250"
        }, defaults);
    },
    paypalbuynow: function(template, defaults) {
        return $.extend(defaults, {
            paypalbuynow_businessemail: "test@test.com",
            paypalbuynow_currency: "GDP",
            paypalbuynow_text: "Buy Me Now"
        });
    },
    dropbox: function(template, defaults) {
        return $.extend(defaults, {
            showFileName: 1,
            fileName: "test.file"
        });
    }
};

/**
 * Plugins Data
 *
 * Albums and images are defined here for use in templates.
 * To make use of these, include six images in the images/gallery directory with filenames 1.jpg, 2.jpg, 3.jpg, etc.
 */
var plugins = function(template) {
    return {
        assets: {
            albums: {
                1: [1, 2, 3, 4, 5, 6]
            },
            images: {
                1: {
                    url: "http://placehold.it/250x250"
                },
                2: {
                    url: "http://placehold.it/250x250"
                },
                3: {
                    url: "http://placehold.it/250x250"
                },
                4: {
                    url: "http://placehold.it/250x250"
                },
                5: {
                    url: "http://placehold.it/250x250"
                },
                6: {
                    url: "http://placehold.it/250x250"
                }
            }
        },
        menu: {
          "active" : null,
          "availability" : null,
          "category" : null,
          "created" : "2013-12-23 13:53:13",
          "description" : "Test menu data",
          "items" : [ { "active" : null,
                "availability" : null,
                "category" : null,
                "created" : null,
                "description" : "Hi Breakfast",
                "displayOrder" : 1,
                "items" : [ { "description" : "Nulla vel lacus scelerisque, auctor velit id, eleifend mi. Duis ultricies id lacus eget tempor. Phasellus congue tempus tortor, eget laoreet velit eleifend in",
                      "dietaryInfo" : { "calories" : null,
                          "dairyFree" : true,
                          "glutenFree" : true,
                          "nutFree" : true,
                          "vegan" : true,
                          "vegetarian" : true
                        },
                      "displayOrder" : 1,
                      "imageURL" : null,
                      "menuType" : "item",
                      "nutritionalProperties" : "'VA','VB'",
                      "prices" : { "name" : "Normal",
                          "price" : "10"
                        },
                      "promoted" : true,
                      "ref" : 23,
                      "sectionRef" : 1,
                      "spicy" : "not spicy",
                      "status" : "online",
                      "title" : "Breakfast item 1"
                    },
                    { "description" : "Mauris lacinia mauris rhoncus sollicitudin euismod. Maecenas eleifend eu diam vitae ultricies. Pellentesque dapibus, justo vel pellentesque ven",
                      "dietaryInfo" : { "calories" : null,
                          "dairyFree" : true,
                          "glutenFree" : true,
                          "nutFree" : true,
                          "vegan" : true,
                          "vegetarian" : true
                        },
                      "displayOrder" : 2,
                      "imageURL" : null,
                      "menuType" : "item",
                      "nutritionalProperties" : "['VA','VB']",
                      "prices" : { "name" : "Normal",
                          "price" : "6"
                        },
                      "promoted" : true,
                      "ref" : 24,
                      "sectionRef" : 1,
                      "spicy" : "spicy",
                      "status" : "offline",
                      "title" : "Breakfast item 2"
                    },
                    { "active" : null,
                      "availability" : null,
                      "category" : null,
                      "created" : null,
                      "description" : "Hi Cereals",
                      "displayOrder" : 3,
                      "items" : [ { "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus ante, volutpat a eros id, dapibus sollicitudin metus. Phasellus vel lectus eu sapien lobortis ornare.",
                            "dietaryInfo" : { "calories" : null,
                                "dairyFree" : true,
                                "glutenFree" : true,
                                "nutFree" : true,
                                "vegan" : true,
                                "vegetarian" : true
                              },
                            "displayOrder" : 2,
                            "imageURL" : null,
                            "menuType" : "item",
                            "nutritionalProperties" : null,
                            "prices" : { "name" : "Normal",
                                "price" : "4"
                              },
                            "promoted" : false,
                            "ref" : 15,
                            "sectionRef" : 8,
                            "spicy" : "hot",
                            "status" : "online",
                            "title" : "Porridge 1"
                          },
                          { "description" : "Suspendisse lobortis bibendum mauris, ut dapibus odio elementum et. Fusce vel imperdiet massa. Pellentesque justo magna, tempor luctus mi sit amet,",
                            "dietaryInfo" : { "calories" : null,
                                "dairyFree" : true,
                                "glutenFree" : false,
                                "nutFree" : false,
                                "vegan" : false,
                                "vegetarian" : false
                              },
                            "displayOrder" : 3,
                            "imageURL" : null,
                            "menuType" : "item",
                            "nutritionalProperties" : null,
                            "prices" : { "name" : "Normal",
                                "price" : "3"
                              },
                            "promoted" : false,
                            "ref" : 14,
                            "sectionRef" : 8,
                            "spicy" : "not spicy",
                            "status" : "offline",
                            "title" : "Cornflakes"
                          }
                        ],
                      "menuType" : "section",
                      "note" : null,
                      "parentRef" : 1,
                      "promoted" : false,
                      "ref" : 8,
                      "status" : "offline",
                      "title" : "Cereals",
                      "updated" : "2013-12-23 14:52:05"
                    },
                    { "active" : null,
                      "availability" : null,
                      "category" : null,
                      "created" : null,
                      "description" : "Proin non pharetra nisi, vitae aliquet sem. Ut congue lorem eu fermentum lacinia. Pellentesque gravida placerat leo in sollicitudin",
                      "displayOrder" : 4,
                      "items" : [ { "description" : "ltricies venenatis neque. Donec placerat felis leo, sit amet lobortis justo convallis a. Integer placerat nunc erat, sit amet consequat lacus",
                            "dietaryInfo" : { "calories" : null,
                                "dairyFree" : false,
                                "glutenFree" : true,
                                "nutFree" : false,
                                "vegan" : true,
                                "vegetarian" : false
                              },
                            "displayOrder" : 2,
                            "imageURL" : null,
                            "menuType" : "item",
                            "nutritionalProperties" : null,
                            "prices" : { "name" : "Normal",
                                "price" : "8"
                              },
                            "promoted" : true,
                            "ref" : 26,
                            "sectionRef" : 13,
                            "spicy" : "hot",
                            "status" : "offline",
                            "title" : "Greats"
                          } ],
                      "menuType" : "section",
                      "note" : null,
                      "parentRef" : 1,
                      "promoted" : false,
                      "ref" : 13,
                      "status" : "online",
                      "title" : "Special Offer",
                      "updated" : "2013-12-23 14:54:53"
                    },
                    { "active" : null,
                      "availability" : null,
                      "category" : null,
                      "created" : null,
                      "description" : "Hi Cooked Breakfasts",
                      "displayOrder" : 7,
                      "items" : [ { "description" : "imperdiet nec. Ut diam turpis, vehicula ac rhoncus vitae, laoreet sit amet eros. Phasellus mattis dolor sapien",
                            "dietaryInfo" : { "calories" : null,
                                "dairyFree" : false,
                                "glutenFree" : false,
                                "nutFree" : false,
                                "vegan" : true,
                                "vegetarian" : false
                              },
                            "displayOrder" : 1,
                            "imageURL" : null,
                            "menuType" : "item",
                            "nutritionalProperties" : "['some nutrition']",
                            "prices" : { "name" : "Normal",
                                "price" : "1"
                              },
                            "promoted" : true,
                            "ref" : 12,
                            "sectionRef" : 7,
                            "spicy" : "not spicy",
                            "status" : "offline",
                            "title" : "Bacon sandwich 1"
                          },
                          { "description" : "vitae sodales mauris euismod eget. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                            "dietaryInfo" : { "calories" : null,
                                "dairyFree" : false,
                                "glutenFree" : false,
                                "nutFree" : false,
                                "vegan" : false,
                                "vegetarian" : false
                              },
                            "displayOrder" : 3,
                            "imageURL" : null,
                            "menuType" : "item",
                            "nutritionalProperties" : null,
                            "prices" : { "name" : "Normal",
                                "price" : "7"
                              },
                            "promoted" : false,
                            "ref" : 25,
                            "sectionRef" : 7,
                            "spicy" : "not spicy",
                            "status" : "online",
                            "title" : "Bacon sandwich 3"
                          },
                          { "description" : "Nulla vel lacus scelerisque, auctor velit id, eleifend mi. Duis ultricies id lacus eget tempor. Phasellus congue tempus tortor, eget laoreet velit eleifend in",
                            "dietaryInfo" : { "calories" : null,
                                "dairyFree" : true,
                                "glutenFree" : false,
                                "nutFree" : false,
                                "vegan" : false,
                                "vegetarian" : false
                              },
                            "displayOrder" : 4,
                            "imageURL" : null,
                            "menuType" : "item",
                            "nutritionalProperties" : null,
                            "prices" : { "name" : "Normal",
                                "price" : "5"
                              },
                            "promoted" : true,
                            "ref" : 13,
                            "sectionRef" : 7,
                            "spicy" : "not spicy",
                            "status" : "online",
                            "title" : "Bacon sandwich 2"
                          }
                        ],
                      "menuType" : "section",
                      "note" : null,
                      "parentRef" : 1,
                      "promoted" : false,
                      "ref" : 7,
                      "status" : null,
                      "title" : "Cooked Breakfasts",
                      "updated" : "2013-12-23 14:05:58"
                    }
                  ],
                "menuType" : "section",
                "note" : null,
                "parentRef" : null,
                "promoted" : false,
                "ref" : 1,
                "status" : null,
                "title" : "Breakfast",
                "updated" : "2013-12-18 16:54:25"
              },
              { "active" : null,
                "availability" : null,
                "category" : null,
                "created" : null,
                "description" : "Lunch section",
                "displayOrder" : 2,
                "items" : [ { "active" : null,
                      "availability" : null,
                      "category" : null,
                      "created" : null,
                      "description" : "Hot food",
                      "displayOrder" : 2,
                      "items" : [ { "description" : "Hi Greats",
                            "dietaryInfo" : { "calories" : null,
                                "dairyFree" : false,
                                "glutenFree" : true,
                                "nutFree" : false,
                                "vegan" : true,
                                "vegetarian" : false
                              },
                            "displayOrder" : 1,
                            "imageURL" : null,
                            "menuType" : "item",
                            "nutritionalProperties" : null,
                            "prices" : { "name" : "Normal",
                                "price" : "8"
                              },
                            "promoted" : false,
                            "ref" : 27,
                            "sectionRef" : 16,
                            "spicy" : "medium spicy",
                            "status" : "offline",
                            "title" : "Greats Lunch"
                          } ],
                      "menuType" : "section",
                      "note" : null,
                      "parentRef" : 15,
                      "promoted" : false,
                      "ref" : 16,
                      "status" : null,
                      "title" : "Hot food",
                      "updated" : "2013-12-20 11:56:25"
                    } ],
                "menuType" : "section",
                "note" : null,
                "parentRef" : null,
                "promoted" : false,
                "ref" : 15,
                "status" : null,
                "title" : "Lunch",
                "updated" : "2013-12-19 14:55:47"
              }
            ],
          "note" : null,
          "ref" : 1,
          "slug" : null,
          "title" : "My Menu",
          "updated" : "2013-12-23 13:53:13"
        }
    }
};

/**
 * Site Navigation
 *
 * Pages, folders and sub-pages can be defined for use in navigation menus.
 */
var pages = [
    {
        ref: 1,
        request: "home",
        title: "Home",
        type: "home",
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

/**
 * Page Setup
 */
var page = {
    seoLang: "en",
    keywords: "basekit",
    description: "BaseKit Template SDK",
    backgroundClass: "default",
    request: "home",
    templateType: 'default'
};

/**
 * Site Data
 */
var site = {
    'ref': 12345,
    colorSwatch: null
};
