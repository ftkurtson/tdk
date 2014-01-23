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
    feature: function(templateName, templateValues) {
        return $.extend({
            preset: "align-center",
            bgImg: "templates/" + templateName + "/images/feature-bg.jpg",
            buttonText: "Sign Up",
            header: "My Website Header",
            strapline: "Here is the website strapline!"
        }, templateValues);
    },
    companyname: function(templateName, templateValues) {
        return $.extend({
            url:"home"
        }, templateValues);
    },
    companyheader: function(templateName, templateValues) {
        return $.extend({
            preset: "default",
            showLogo: 1
        }, templateValues);
    },
    content: function(templateName, templateValues) {
        var properties = $.extend({
            lines: "all"
        }, templateValues);

        if (typeof properties.content !== "string") {
            properties.content = library[Math.floor(Math.random() * library.length)];
        }

        return properties;
    },
    contactform: function(templateName, templateValues) {
        return $.extend({
            preset: "todo",
            text: "Submit Form"
        }, templateValues);
    },
    map: function(templateName, templateValues) {
        return $.extend({
            height: 300,
            markerPath: '/images/map-marker.png'
        }, templateValues);
    },
    twitter: function(templateName, templateValues) {
        return $.extend({
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
        }, templateValues);
    },
    youtube: function(templateName, templateValues) {
        return $.extend({
            videoId: "yfCdflc3x8U"
        }, templateValues);
    },
    button: function(templateName, templateValues) {
        return $.extend({
            text: "Click Me"
        }, templateValues);
    },
    gallery: function(templateName, templateValues) {
        return $.extend({
            preset: "default",
            albumRef: 1
        }, templateValues);
    },
    extendednavigation: function(templateName, templateValues) {
        return $.extend({
            align: "left"
        }, templateValues);
    },
    responsiveslideshow: function(templateName, templateValues) {
        return $.extend({
            preset: "default",
            albumRef: 0
        }, templateValues);
    },
    navigation: function(templateName, templateValues) {
        return $.extend({
            preset: "default",
            align: "left"
        }, templateValues);
    },
    image: function(templateName, templateValues) {
        return $.extend({
            src: "http://placehold.it/250x250"
        }, templateValues);
    },
    paypalbuynow: function(templateName, templateValues) {
        return $.extend({
            paypalbuynow_businessemail: "test@test.com",
            paypalbuynow_currency: "GDP",
            paypalbuynow_text: "Buy Me Now"
        }, templateValues);
    },
    dropbox: function(templateName, templateValues) {
        return $.extend({
            showFileName: 1,
            fileName: "test.file"
        }, templateValues);
    },
    blogpost: function(templateName, templateValues) {
        return $.extend({}, templateValues);
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
                    url: "http://placehold.it/300x100"
                },
                3: {
                    url: "http://placehold.it/250x250"
                },
                4: {
                    url: "http://placehold.it/529x150"
                },
                5: {
                    url: "http://placehold.it/600x200"
                },
                6: {
                    url: "http://placehold.it/250x250"
                }
            }
        },
        blog: {
           "currentPage": 1,
           "directory": "blog",
           "displayBlogHomePageLink": false,
           "isPostPage": false,
           "pathFormat": "/blog/page/",
           "posts": [
              {
                 "category": "cars",
                 "content": "<p>\r\n\t <strong>Cras dictum, urna ut luctus vulputate, massa nunc semper nisl, et tempor libero elit at massa.<\/strong> Cras ut hendrerit nunc. Etiam ut viverra lacus. Donec sagittis, nibh ut dapibus convallis, turpis leo scelerisque lectus, nec bibendum libero sem id urna. Phasellus cursus nec risus in gravida. Nullam tristique felis et neque ornare suscipit. Nulla congue auctor mauris sed consectetur. Nulla consectetur viverra tellus, aliquet pellentesque magna blandit ac. Ut feugiat, arcu ut tempus commodo, nisi tellus semper ante, in faucibus lacus nisl id elit. Pellentesque tristique nibh nec interdum pulvinar.\r\n<\/p>",
                 "featureImageAssetRef": "1",
                 "publishedDate": {
                    "date": "2014-01-14 15:54:47",
                    "timezone": "Europe/London",
                    "timezone_type": 3
                 },
                 "ref": 44,
                 "slug": "cras-dictum,-urna-ut-luctus-vulputate",
                 "summary": "Cras ut hendrerit nunc. Etiam ut viverra lacus. Donec sagittis, nibh ut dapibus convallis, turpis leo scelerisque lectus, nec bibendum libero sem id urna.",
                 "tags": [
                    "yellow",
                    "red"
                 ],
                 "title": "Cras dictum, urna ut luctus vulputate"
              },
              {
                 "category": "cars",
                 "content": "<p>\r\n\t Nunc scelerisque, elit eu iaculis tincidunt, lectus nisl suscipit enim, eu fringilla augue justo ornare tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus mattis a leo quis sollicitudin. Vestibulum ornare turpis in elit tincidunt, ornare sollicitudin ligula laoreet. Sed eu nisi a lorem cursus venenatis a ac velit. Maecenas mollis neque sit amet tellus faucibus semper. Donec eu massa orci. Nunc gravida ante eu magna egestas blandit. Vivamus iaculis ac tellus vel rhoncus. Vestibulum non feugiat nibh. Phasellus eget metus ligula. In ut enim et tortor pharetra scelerisque. Morbi porta lacus tortor, ut pharetra orci laoreet in. Suspendisse laoreet id neque at tristique.\r\n<\/p>",
                 "featureImageAssetRef": 2,
                 "publishedDate": {
                    "date": "2014-01-14 15:54:25",
                    "timezone": "Europe/London",
                    "timezone_type": 3
                 },
                 "ref": 43,
                 "slug": "maecenas-quis-dapibus-massa.",
                 "summary": "Donec nec scelerisque sem, nec commodo justo. Duis lectus est, malesuada eget purus gravida, lobortis consectetur sapien.",
                 "tags": [
                    "blue",
                    "red",
                    "green"
                 ],
                 "title": "Maecenas quis dapibus massa."
              },
              {
                 "category": "cars",
                 "content": "<p>\r\n\t Vestibulum convallis sollicitudin odio, et suscipit nunc scelerisque id. Aenean imperdiet, tellus vel euismod adipiscing, libero ligula aliquam quam, nec adipiscing dolor nunc id lacus. Maecenas fringilla ultricies mauris nec convallis. Integer porttitor posuere quam a varius. Etiam aliquam eleifend orci. Proin ullamcorper vulputate eros, quis semper mi accumsan eu. Curabitur faucibus est mi, id dictum nisi tincidunt vitae. Vestibulum nisi dolor, condimentum non magna ut, tincidunt dignissim sapien. Vestibulum iaculis dui et pretium luctus. Pellentesque in tristique sapien, sit amet rutrum turpis. Proin nisi lacus, cursus sed tincidunt id, pulvinar eu lorem. Sed ut elementum magna. Aliquam erat volutpat.\r\n<\/p>",
                 "featureImageAssetRef": 3,
                 "publishedDate": {
                    "date": "2014-01-14 15:54:07",
                    "timezone": "Europe/London",
                    "timezone_type": 3
                 },
                 "ref": 42,
                 "slug": "aliquam-erat-volutpat",
                 "summary": "Vestibulum convallis sollicitudin odio",
                 "tags": [
                    "yellow",
                    "green"
                 ],
                 "title": "Aliquam erat volutpat"
              },
              {
                 "category": "trucks",
                 "content": "<p>\r\n\t  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean pretium in dui in consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Praesent ac interdum nisi, et tempus mauris. Maecenas quis dapibus massa. Aliquam id sapien facilisis, tincidunt turpis eu, gravida purus. Curabitur pretium nibh quam, quis adipiscing libero venenatis ac. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas sodales, nisi vel aliquam suscipit, eros tortor accumsan purus, id tincidunt risus nulla in nisi. Nunc lobortis id magna sit amet semper. Curabitur iaculis ultrices ligula eget vulputate.\r\n<\/p>\r\n<p>\r\n\t  Nunc scelerisque, elit eu iaculis tincidunt, lectus nisl suscipit enim, eu fringilla augue justo ornare tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus mattis a leo quis sollicitudin. Vestibulum ornare turpis in elit tincidunt, ornare sollicitudin ligula laoreet. Sed eu nisi a lorem cursus venenatis a ac velit. Maecenas mollis neque sit amet tellus faucibus semper. Donec eu massa orci. Nunc gravida ante eu magna egestas blandit. Vivamus iaculis ac tellus vel rhoncus. Vestibulum non feugiat nibh. Phasellus eget metus ligula. In ut enim et tortor pharetra scelerisque. Morbi porta lacus tortor, ut pharetra orci laoreet in. Suspendisse laoreet id neque at tristique.\r\n<\/p>",
                 "featureImageAssetRef": 4,
                 "publishedDate": {
                    "date": "2014-01-14 15:53:41",
                    "timezone": "Europe/London",
                    "timezone_type": 3
                 },
                 "ref": 41,
                 "slug": "praesent-ac-interdum-nisi",
                 "summary": "Vestibulum ante ipsum primis",
                 "tags": [
                    "green"
                 ],
                 "title": "Praesent ac interdum nisi"
              },
              {
                 "category": null,
                 "content": "<p>\r\n\t Cconsectetur adipiscing elit. Nunc ut ligula iaculis, ornare nibh ut, tincidunt dui. Curabitur adipiscing lobortis hendrerit. Donec ut ipsum nec arcu posuere ultrices a quis nisi. Quisque a arcu leo. Quisque commodo, purus ut suscipit gravida, magna libero egestas sapien, ac sollicitudin libero mauris non ipsum. Morbi tristique dictum tellus non laoreet. Suspendisse condimentum lectus at metus euismod tempus.\r\n<\/p>",
                 "featureImageAssetRef": 5,
                 "publishedDate": {
                    "date": "2014-01-14 15:53:30",
                    "timezone": "Europe/London",
                    "timezone_type": 3
                 },
                 "ref": 40,
                 "slug": "lorem-ipsum",
                 "summary": "Lorem ipsum dolor",
                 "tags": [
                    "green",
                    "blue",
                    "red"
                 ],
                 "title": "Lorem ipsum"
              }
           ],
           "postsPerPage": 5,
           "searchUrl": "/blog/search/",
           "totalPages": 2
        },
        menu: {
         "ref":4,
         "title":"Menu",
         "description":"My menu",
         "availability":null,
         "note":null,
         "category":null,
         "active":null,
         "slug":null,
         "created":"2014-01-06 14:33:27",
         "updated":"2014-01-06 14:33:27",
         "items":[
            {
               "ref":373,
               "parentRef":null,
               "title":"Breakfast",
               "description":"Served until 12",
               "displayOrder":1,
               "availability":null,
               "note":null,
               "active":1,
               "category":null,
               "menuType":"section",
               "promoted":false,
               "created":"2014-01-08 12:46:44",
               "updated":"2014-01-09 12:02:47",
               "note": "here is the note part",
               "items":[
                  {
                     "ref":27,
                     "title":"Daily Oats Organic Rude Health Porridge",
                     "description":"This porridge will have you feeling rudely healthy all day. we top ours with honey, fresh strawberries & bananas",
                     "assetRef": 1,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":1,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$4.15"
                     }
                  },
                  {
                     "ref":28,
                     "title":"Veggie Brunch Plate",
                     "description":"Free range fried, poached or scrambled eggs, veggie sausages, Heinz baked beans, mushrooms & avocado with toasted artisan sourdough",
                     "assetRef": 2,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":2,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$8.25"
                     }
                  },
                  {
                     "ref":29,
                     "title":"Deluxe Toastie",
                     "description":"Artisan sourdough toast filled with crispy bacon, fried egg, melting cheddar, lettuce, tomato & mustard mayo",
                     "assetRef": 3,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":3,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$4.95"
                     }
                  },
                  {
                     "ref":30,
                     "title":"Stacked Blueberry & Banana Pancakes",
                     "description":"With maple syrup. 50p from every Pancake Stack goes to Rays of Sunshine Children's Charity which grants wishes for seriously ill children across the UK",
                     "assetRef": 5,
                     "promoted":true,
                     "menuType":"item",
                     "displayOrder":4,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$6.95"
                     }
                  },
                  {
                     "ref":31,
                     "title":"Daybreaker Omelette",
                     "description":"Egg white omelette served with cherry tomato & avocado salsa",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":5,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":32,
                     "title":"Huevos Rancheros Mexican Breakfast",
                     "description":"Vegetarian option with roasted mushrooms £7.95Free range fried or scrambled eggs, chorizo sausage, black beans, melting cheese, adobe sauce, avocado & tomato salsa on a warm soft corn tortilla",
                     "assetRef": 4,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":6,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":false,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$8.25"
                     }
                  },
                  {
                     "ref":33,
                     "title":"Avocado, Hummus & Roasted Cherry Tomatoes",
                     "description":"On toasted artisan sourdough with basil oil",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":7,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":false,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":34,
                     "title":"“The Western” Omelette",
                     "description":"Three egg omelette with roasted vegetables & manchego, served with cherry tomato & avocado salsa",
                     "assetRef": 6,
                     "promoted":true,
                     "menuType":"item",
                     "displayOrder":8,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":27,
                     "title":"Daily Oats Organic Rude Health Porridge",
                     "description":"This porridge will have you feeling rudely healthy all day. we top ours with honey, fresh strawberries & bananas",
                     "assetRef": 3,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":1,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$4.15"
                     }
                  },
                  {
                     "ref":28,
                     "title":"Veggie Brunch Plate",
                     "description":"Free range fried, poached or scrambled eggs, veggie sausages, Heinz baked beans, mushrooms & avocado with toasted artisan sourdough",
                     "assetRef": 2,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":2,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$8.25"
                     }
                  },
                  {
                     "ref":29,
                     "title":"Deluxe Toastie",
                     "description":"Artisan sourdough toast filled with crispy bacon, fried egg, melting cheddar, lettuce, tomato & mustard mayo",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":3,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$4.95"
                     }
                  },
                  {
                     "ref":30,
                     "title":"Stacked Blueberry & Banana Pancakes",
                     "description":"With maple syrup. 50p from every Pancake Stack goes to Rays of Sunshine Children's Charity which grants wishes for seriously ill children across the UK",
                     "assetRef": null,
                     "promoted":true,
                     "menuType":"item",
                     "displayOrder":4,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$6.95"
                     }
                  },
                  {
                     "ref":31,
                     "title":"Daybreaker Omelette",
                     "description":"Egg white omelette served with cherry tomato & avocado salsa",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":5,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":32,
                     "title":"Huevos Rancheros Mexican Breakfast",
                     "description":"Vegetarian option with roasted mushrooms £7.95Free range fried or scrambled eggs, chorizo sausage, black beans, melting cheese, adobe sauce, avocado & tomato salsa on a warm soft corn tortilla",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":6,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":false,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$8.25"
                     }
                  },
                  {
                     "ref":33,
                     "title":"Avocado, Hummus & Roasted Cherry Tomatoes",
                     "description":"On toasted artisan sourdough with basil oil",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":7,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":false,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":34,
                     "title":"“The Western” Omelette",
                     "description":"Three egg omelette with roasted vegetables & manchego, served with cherry tomato & avocado salsa",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":8,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":376,
                     "parentRef":373,
                     "title":"£5 GOOD MORNING BREKKIE",
                     "description":"One of these dishes and a regular hot drink for just £5, Monday - Friday until noon (excluding bank holidays). Not available in airports.",
                     "displayOrder":9,
                     "availability":null,
                     "note":null,
                     "active":1,
                     "category":null,
                     "menuType":"section",
                     "promoted":true,
                     "created":"2014-01-09 12:10:03",
                     "updated":"2014-01-09 12:10:16",
                     "items":[
                        {
                           "ref":35,
                           "title":"Ultimate Superfoods Rude Health Muesli",
                           "description":"Add natural yoghurt & fresh fruit £1.50Wheat free & totally organic blend of oats, apricots, barley & rye flakes, apple, sultanas, dates, golden linseed, seeds & raisins",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":1,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":true,
                              "glutenFree":false,
                              "dairyFree":true,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        },
                        {
                           "ref":36,
                           "title":"Granola Breakfast Sundae",
                           "description":"Granola, natural yoghurt, fresh fruit & honey",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":2,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":false,
                              "glutenFree":false,
                              "dairyFree":false,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        },
                        {
                           "ref":37,
                           "title":"Free Range Eggs on Toasted Focaccia",
                           "description":"Scrambled, fried or poached free range eggs with roasted cherry tomatoes",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":3,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":false,
                              "glutenFree":false,
                              "dairyFree":false,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        }
                     ]
                  },
                  {
                     "ref":377,
                     "parentRef":373,
                     "title":"£5 GOOD MORNING BREKKIE",
                     "description":"One of these dishes and a regular hot drink for just £5, Monday - Friday until noon (excluding bank holidays). Not available in airports.",
                     "displayOrder":10,
                     "availability":null,
                     "note":null,
                     "active":1,
                     "category":null,
                     "menuType":"section",
                     "promoted":false,
                     "created":"2014-01-09 12:10:03",
                     "updated":"2014-01-09 12:10:16",
                     "items":[
                        {
                           "ref":35,
                           "title":"Ultimate Superfoods Rude Health Muesli",
                           "description":"Add natural yoghurt & fresh fruit £1.50Wheat free & totally organic blend of oats, apricots, barley & rye flakes, apple, sultanas, dates, golden linseed, seeds & raisins",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":1,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":true,
                              "glutenFree":false,
                              "dairyFree":true,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        },
                        {
                           "ref":36,
                           "title":"Granola Breakfast Sundae",
                           "description":"Granola, natural yoghurt, fresh fruit & honey",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":2,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":false,
                              "glutenFree":false,
                              "dairyFree":false,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        },
                        {
                           "ref":37,
                           "title":"Free Range Eggs on Toasted Focaccia",
                           "description":"Scrambled, fried or poached free range eggs with roasted cherry tomatoes",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":3,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":false,
                              "glutenFree":false,
                              "dairyFree":false,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        }
                     ]
                  }
               ]
            },
            {
               "ref":374,
               "parentRef":null,
               "title":"Lunch",
               "description":"It's a version without images",
               "displayOrder":1,
               "availability":null,
               "note":null,
               "active":1,
               "category":null,
               "menuType":"section",
               "promoted":false,
               "created":"2014-01-08 12:46:44",
               "updated":"2014-01-09 12:02:47",
               "items":[
                  {
                     "ref":27,
                     "title":"Daily Oats Organic Rude Health Porridge",
                     "description":"This porridge will have you feeling rudely healthy all day. we top ours with honey, fresh strawberries & bananas",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":1,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$4.15"
                     }
                  },
                  {
                     "ref":28,
                     "title":"Veggie Brunch Plate",
                     "description":"Free range fried, poached or scrambled eggs, veggie sausages, Heinz baked beans, mushrooms & avocado with toasted artisan sourdough",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":2,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$8.25"
                     }
                  },
                  {
                     "ref":29,
                     "title":"Deluxe Toastie",
                     "description":"Artisan sourdough toast filled with crispy bacon, fried egg, melting cheddar, lettuce, tomato & mustard mayo",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":3,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$4.95"
                     }
                  },
                  {
                     "ref":30,
                     "title":"Stacked Blueberry & Banana Pancakes",
                     "description":"With maple syrup. 50p from every Pancake Stack goes to Rays of Sunshine Children's Charity which grants wishes for seriously ill children across the UK",
                     "assetRef": null,
                     "promoted":true,
                     "menuType":"item",
                     "displayOrder":4,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$6.95"
                     }
                  },
                  {
                     "ref":31,
                     "title":"Daybreaker Omelette",
                     "description":"Egg white omelette served with cherry tomato & avocado salsa",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":5,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":32,
                     "title":"Huevos Rancheros Mexican Breakfast",
                     "description":"Vegetarian option with roasted mushrooms £7.95Free range fried or scrambled eggs, chorizo sausage, black beans, melting cheese, adobe sauce, avocado & tomato salsa on a warm soft corn tortilla",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":6,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":false,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$8.25"
                     }
                  },
                  {
                     "ref":33,
                     "title":"Avocado, Hummus & Roasted Cherry Tomatoes",
                     "description":"On toasted artisan sourdough with basil oil",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":7,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":false,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":34,
                     "title":"“The Western” Omelette",
                     "description":"Three egg omelette with roasted vegetables & manchego, served with cherry tomato & avocado salsa",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":8,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":27,
                     "title":"Daily Oats Organic Rude Health Porridge",
                     "description":"This porridge will have you feeling rudely healthy all day. we top ours with honey, fresh strawberries & bananas",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":1,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$4.15"
                     }
                  },
                  {
                     "ref":28,
                     "title":"Veggie Brunch Plate",
                     "description":"Free range fried, poached or scrambled eggs, veggie sausages, Heinz baked beans, mushrooms & avocado with toasted artisan sourdough",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":2,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$8.25"
                     }
                  },
                  {
                     "ref":29,
                     "title":"Deluxe Toastie",
                     "description":"Artisan sourdough toast filled with crispy bacon, fried egg, melting cheddar, lettuce, tomato & mustard mayo",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":3,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$4.95"
                     }
                  },
                  {
                     "ref":30,
                     "title":"Stacked Blueberry & Banana Pancakes",
                     "description":"With maple syrup. 50p from every Pancake Stack goes to Rays of Sunshine Children's Charity which grants wishes for seriously ill children across the UK",
                     "assetRef": null,
                     "promoted":true,
                     "menuType":"item",
                     "displayOrder":4,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$6.95"
                     }
                  },
                  {
                     "ref":31,
                     "title":"Daybreaker Omelette",
                     "description":"Egg white omelette served with cherry tomato & avocado salsa",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":5,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":true,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":32,
                     "title":"Huevos Rancheros Mexican Breakfast",
                     "description":"Vegetarian option with roasted mushrooms £7.95Free range fried or scrambled eggs, chorizo sausage, black beans, melting cheese, adobe sauce, avocado & tomato salsa on a warm soft corn tortilla",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":6,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":false,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$8.25"
                     }
                  },
                  {
                     "ref":33,
                     "title":"Avocado, Hummus & Roasted Cherry Tomatoes",
                     "description":"On toasted artisan sourdough with basil oil",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":7,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":false,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":34,
                     "title":"“The Western” Omelette",
                     "description":"Three egg omelette with roasted vegetables & manchego, served with cherry tomato & avocado salsa",
                     "assetRef": null,
                     "promoted":false,
                     "menuType":"item",
                     "displayOrder":8,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "vegetarian":true,
                        "vegan":false,
                        "nutFree":false,
                        "glutenFree":false,
                        "dairyFree":false,
                        "calories":null
                     },
                     "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "spicy":"not spicy",
                     "prices":{
                        "name":"Normal",
                        "price":"$5.95"
                     }
                  },
                  {
                     "ref":376,
                     "parentRef":373,
                     "title":"£5 GOOD MORNING BREKKIE",
                     "description":"One of these dishes and a regular hot drink for just £5, Monday - Friday until noon (excluding bank holidays). Not available in airports.",
                     "displayOrder":9,
                     "availability":null,
                     "note":null,
                     "active":1,
                     "category":null,
                     "menuType":"section",
                     "promoted":true,
                     "created":"2014-01-09 12:10:03",
                     "updated":"2014-01-09 12:10:16",
                     "items":[
                        {
                           "ref":35,
                           "title":"Ultimate Superfoods Rude Health Muesli",
                           "description":"Add natural yoghurt & fresh fruit £1.50Wheat free & totally organic blend of oats, apricots, barley & rye flakes, apple, sultanas, dates, golden linseed, seeds & raisins",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":1,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":true,
                              "glutenFree":false,
                              "dairyFree":true,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        },
                        {
                           "ref":36,
                           "title":"Granola Breakfast Sundae",
                           "description":"Granola, natural yoghurt, fresh fruit & honey",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":2,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":false,
                              "glutenFree":false,
                              "dairyFree":false,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        },
                        {
                           "ref":37,
                           "title":"Free Range Eggs on Toasted Focaccia",
                           "description":"Scrambled, fried or poached free range eggs with roasted cherry tomatoes",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":3,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":false,
                              "glutenFree":false,
                              "dairyFree":false,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        }
                     ]
                  },
                  {
                     "ref":377,
                     "parentRef":373,
                     "title":"£5 GOOD MORNING BREKKIE",
                     "description":"One of these dishes and a regular hot drink for just £5, Monday - Friday until noon (excluding bank holidays). Not available in airports.",
                     "displayOrder":10,
                     "availability":null,
                     "note":null,
                     "active":1,
                     "category":null,
                     "menuType":"section",
                     "promoted":false,
                     "created":"2014-01-09 12:10:03",
                     "updated":"2014-01-09 12:10:16",
                     "items":[
                        {
                           "ref":35,
                           "title":"Ultimate Superfoods Rude Health Muesli",
                           "description":"Add natural yoghurt & fresh fruit £1.50Wheat free & totally organic blend of oats, apricots, barley & rye flakes, apple, sultanas, dates, golden linseed, seeds & raisins",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":1,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":true,
                              "glutenFree":false,
                              "dairyFree":true,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        },
                        {
                           "ref":36,
                           "title":"Granola Breakfast Sundae",
                           "description":"Granola, natural yoghurt, fresh fruit & honey",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":2,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":false,
                              "glutenFree":false,
                              "dairyFree":false,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        },
                        {
                           "ref":37,
                           "title":"Free Range Eggs on Toasted Focaccia",
                           "description":"Scrambled, fried or poached free range eggs with roasted cherry tomatoes",
                           "assetRef": null,
                           "promoted":false,
                           "menuType":"item",
                           "displayOrder":3,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "vegetarian":true,
                              "vegan":false,
                              "nutFree":false,
                              "glutenFree":false,
                              "dairyFree":false,
                              "calories":null
                           },
                           "nutritionalProperties":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "spicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        }
                     ]
                  }
               ]
            }
         ]
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
