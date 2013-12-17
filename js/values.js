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

        menu: [
            {
                title: 'Breakfast',
                menuType: 'section',
                ref: 1,
                parentRef : 0,
                displayOrder: 0,
                availability: 'Server until 12', // not in the table yet
                discription: 'The toplevel Breakfast',
                dietaryInfoKeys:[
                    "vegetarian",
                    "glutenFree"
                ],
                note: "Please note that our airport locations offer a slightly different menu which you can download from their location pages.",
                items: [
                    {
                        title: 'Breakfast item 1',
                        menuType: 'item',
                        sectionRef : 1,
                        displayOrder: 0,
                        promoted: 0,
                        prices: [{ // don't know how it's stored in db
                            price: '1',
                            name: 'offer'
                        },{
                            price: '2',
                            name: 'standard'
                        }],
                        nutritionalProperties: ['VA', 'VB'],
                        dietaryInfo: {
                            vegetarian: 1,
                            vegan: 1,
                            nuts: 1,
                            glutenFree: 1,
                            calories: 1
                        },
                        ref: 23
                    },
                    {
                        title: 'Breakfast item 2',
                        menuType: 'item',
                        sectionRef : 1,
                        displayOrder: 1,
                        promoted: 1,
                        prices: [{
                            price: '1',
                            name: 'offer'
                        },{
                            price: '2',
                            name: 'standard'
                        }],
                        nutritionalProperties: ['VA', 'VB'],
                        dietaryInfo: {
                            vegetarian: 1,
                            vegan: 1,
                            nuts: 1,
                            glutenFree: 1,
                            calories: 1
                        },
                        ref: 24
                    },
                    {
                        title: '$5 Good Morning Brekkie',
                        menuType: 'section',
                        description: 'One of these dishes and a regular hot drink for just $5, Monday - Friday until noon (excluding bank holidays). Not available in airports.',
                        parentRef : 1,
                        displayOrder: 2,
                        promoted: 1, // we need promoted for section
                        ref: 7,
                        items: [
                            {
                                title: 'Ultimate Superfoods Rude Health Muesli',
                                menuType: 'item',
                                discription: 'Wheat free & totally organic blend of oats, apricots, barley & rye flakes, apple, sultanas, dates, golden linseed, seeds & raisins',
                                sectionRef : 7,
                                displayOrder: 0,
                                promoted: 1,
                                prices: [{
                                    price: '$1.50',
                                    name: 'Add natural yoghurt & fresh fruit'
                                },{
                                    price: '$2',
                                    name: 'standard'
                                }],
                                nutritionalProperties: [
                                    "Contains gluten",
                                    "Contains seeds & kittens",
                                    "Contains dairy"
                                ],
                                dietaryInfo: {
                                    vegetarian: 1,
                                    vegan: 1,
                                    nuts: 1,
                                    glutenFree: 1,
                                    calories: 1
                                },
                                ref: 12
                            },
                            {
                                title: 'BBQ Beans & Egg on Sourdough Toast',
                                menuType: 'item',
                                discription: 'Homemade smoky bbq baked beans with chorizo & fried free range egg',
                                sectionRef : 7,
                                displayOrder: 1,
                                promoted: 0,
                                prices: [{
                                    price: '1',
                                    name: 'offer'
                                },{
                                    price: '2',
                                    name: 'standard'
                                }],
                                nutritionalProperties: [
                                    "Contains gluten",
                                    "Contains garlic",
                                    "Contains eggs"
                                ],
                                dietaryInfo: {
                                    vegetarian: 1,
                                    vegan: 1,
                                    nuts: 1,
                                    glutenFree: 1,
                                    calories: 1
                                },
                                ref: 13
                            },
                            {
                                title: 'Granola Breakfast Sundae',
                                menuType: 'item',
                                discription: 'Granola, natural yoghurt, fresh fruit & honey',
                                imageURL: 'http://giraffe.net/assets/global/php/image.php?src=/assets/giraffe/cms/images/menu/4b5dfbf1783630eef780dea56c935f2c.jpg&w=260&h=200&q=90&a=crop',
                                sectionRef : 7,
                                displayOrder: 2,
                                promoted: 0,
                                prices: [{
                                    price: '1',
                                    name: 'offer'
                                },{
                                    price: '2',
                                    name: 'standard'
                                }],
                                nutritionalProperties: ['VA', 'VB'],
                                dietaryInfo: {
                                    vegetarian: 1,
                                    vegan: 1,
                                    nuts: 1,
                                    glutenFree: 1,
                                    calories: 1
                                },
                                ref: 25
                            },
                            {
                                title: 'Sepcial Offer',
                                menuType: 'section',
                                displayOrder: 3,
                                promoted: 0,
                                parentRef : 7,
                                ref: 13,
                                items: [
                                    {
                                        title: 'Rise & Shine Waffle',
                                        discription: 'Topped with vanilla yoghurt, blueberry compote, strawberries, banana & orange blossom honey',
                                        ref: 26,
                                        menuType: 'item',
                                        promoted: 0,
                                        sectionRef : 13,
                                        prices: [{
                                            price: '1',
                                            name: 'offer'
                                        },{
                                            price: '2',
                                            name: 'standard'
                                        }],
                                        nutritionalProperties: [
                                            "Contains gluten",
                                            "Contains dairy",
                                            "Contains eggs"
                                        ],
                                        dietaryInfo: {
                                            vegetarian: 1,
                                            vegan: 1,
                                            nuts: 1,
                                            glutenFree: 1,
                                            calories: 1
                                        },
                                        displayOrder: 0
                                    }
                                ]
                            },
                            {
                                title: 'Empty Section',
                                menuType: 'section',
                                promoted: 0,
                                parentRef : 7,
                                displayOrder: 4,
                                ref: 14,
                                items: []
                            }
                        ]
                    },
                    {
                        title: 'Cereals',
                        menuType: 'section',
                        parentRef : 1,
                        promoted: 0,
                        displayOrder: 3,
                        ref: 8,
                        items: [
                            {
                                title: 'Free Range Eggs on Toasted Focaccia',
                                menuType: 'item',
                                discription: 'Scrambled, fried or poached free range eggs with roasted cherry tomatoes',
                                imageURL: 'http://giraffe.net/assets/global/php/image.php?src=/assets/giraffe/cms/images/menu/14a457dab9bb6aef884358b469632ffe.jpg&w=260&h=200&q=90&a=crop',
                                promoted: 0,
                                sectionRef : 8,
                                displayOrder: 0,
                                prices: [{
                                    price: '1',
                                    name: 'offer'
                                },{
                                    price: '2',
                                    name: 'standard'
                                }],
                                nutritionalProperties: [
                                    "Contains gluten",
                                    "Contains dairy",
                                    "Contains eggs"
                                ],
                                dietaryInfo: {
                                    vegetarian: 1,
                                    vegan: 1,
                                    nuts: 1,
                                    glutenFree: 1,
                                    calories: 1
                                },
                                ref: 14
                            },
                            {
                                title: 'Bacon & Eggs on Sourdough Toast',
                                discription: 'Smoky bacon with either fried, scrambled or poached free range eggs',
                                menuType: 'item',
                                promoted: 0,
                                displayOrder: 1,
                                sectionRef : 8,
                                prices: [{
                                    price: '1',
                                    name: 'offer'
                                },{
                                    price: '2',
                                    name: 'standard'
                                }],
                                nutritionalProperties: [
                                    "Contains gluten",
                                    "Contains dairy",
                                    "Contains eggs"
                                ],
                                dietaryInfo: {
                                    vegetarian: 1,
                                    vegan: 1,
                                    nuts: 1,
                                    glutenFree: 1,
                                    calories: 1
                                },
                                ref: 15
                            }
                        ]
                    }
                ]
            }
        ]
    };
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
    request: "home"
};

/**
 * Site Data
 */
var site = {
    'ref': 12345,
    colorSwatch: null
};
