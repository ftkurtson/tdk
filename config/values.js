/**
 * User Profile Values
 *
 * Widget properties with the value "profile" will use the corresponding profile value.
 * Text in templates should use the profile wherever possible.
 */
var profile = function(template) {
    return {
        business: "Smart Inc.",
        headline: "My Website Header",
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
var library = ['<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><h4>Heading 4</h4><h5>Heading 5</h5><h6>Heading 6</h6><small>A small element</small><a href="#" title="A link">A link</a><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut <u>underline element</u> labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco <i>italicised element</i> laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in <a href="#" title="a link">a link</a> reprehenderit in voluptate velit esse cillum <strong>bold text</strong> dolore eu fugiat nulla pariatur. Excepteur <span>span element</span> sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><ul><li>An item</li><li>An item</li><li>An item</li><li>An item</li><li>An item</li></ul><ol><li>Item one</li><li>Item two</li><li>Item three</li><li>Item four</li><li>Item five</li></ol><strong>Bold text</strong><br /><i>Italicised element</i><br /><u>Underline element</u><blockquote>A simple blockquote</blockquote><pre>A line of code</pre><code>Another line of code</code><br /><span>Span element</span>'];

/**
 * Widget Properties
 *
 * These can either be an object or a function that returns an object.
 * You should always extend the default properties (via the defaults argument).
 */
var properties = {
    feature: function(templateName, templateValues) {
        return bk$.extend({
            preset: "align-center",
            bgImg: "templates/" + templateName + "/images/feature-bg.jpg",
            buttonText: "Sign Up",
            header: "My Website Header",
            strapline: "Here is the website strapline!"
        }, templateValues);
    },
    companyname: function(templateName, templateValues) {
        return bk$.extend({
            url:"home"
        }, templateValues);
    },
    companyheader: function(templateName, templateValues) {
        return bk$.extend({
            preset: "default",
            showLogo: 1
        }, templateValues);
    },
    content: function(templateName, templateValues) {
        var properties = bk$.extend({
            lines: "all"
        }, templateValues);

        if (typeof properties.content !== "string") {
            properties.content = library[Math.floor(Math.random() * library.length)];
        }

        return properties;
    },
    contactform: function(templateName, templateValues) {
        return bk$.extend({
            preset: "todo",
            text: "Submit Form"
        }, templateValues);
    },
    map: function(templateName, templateValues) {
        return bk$.extend({
            height: 300,
            markerPath: '/images/map-marker.png'
        }, templateValues);
    },
    twitter: function(templateName, templateValues) {
        return bk$.extend({
            tweets: [
                {
                    "text": "How To Get Big-Brand Search Visibility",
                    "createdAt": "Thu Aug 01 11:30:49 +0000 2013",
                    "source": "<a href=\"http://www.tweetdeck.com\" rel=\"nofollow\">TweetDeck</a>",
                    "fullName": "BaseKit.Com",
                    "screenName": "basekit",
                    "imageUrl": "http://placehold.it/98x98"
                },
                {
                    "text": "Check out the 10 companies that control the internet ",
                    "createdAt": "Thu Aug 01 10:30:49 +0000 2013",
                    "source": "<a href=\"http://www.tweetdeck.com\" rel=\"nofollow\">TweetDeck</a>",
                    "fullName": "BaseKit.Com",
                    "screenName": "basekit",
                    "imageUrl": "http://placehold.it/98x98"
                }
            ]
        }, templateValues);
    },
    youtube: function(templateName, templateValues) {
        return bk$.extend({
            videoId: "yfCdflc3x8U"
        }, templateValues);
    },
    button: function(templateName, templateValues) {
        return bk$.extend({
            text: "Click Me"
        }, templateValues);
    },
    gallery: function(templateName, templateValues) {
        return bk$.extend({
            preset: "default",
            albumRef: 1
        }, templateValues);
    },
    extendednavigation: function(templateName, templateValues) {
        return bk$.extend({
            align: "left"
        }, templateValues);
    },
    responsiveslideshow: function(templateName, templateValues) {
        return bk$.extend({
            preset: "default",
            albumRef: 0,
            images: [
                {
                    'imageHeight':'350',
                    'imageWidth':'900',
                    'url':'http://placehold.it/350x900',
                    'title':'test title',
                    'description': 'test desc'
                },{
                    'imageHeight':'350',
                    'imageWidth':'300',
                    'url':'http://placehold.it/350x300',
                    'title':'test title',
                    'description': 'test desc'
                },{
                    'imageHeight':'350',
                    'imageWidth':'500',
                    'url':'http://placehold.it/350x500',
                    'title':'test title',
                    'description': 'test desc'
                },{
                    'imageHeight':'350',
                    'imageWidth':'300',
                    'url':'http://placehold.it/350x300',
                    'title':'test title',
                    'description': 'test desc'
                }]
        }, templateValues);
    },
    navigation: function(templateName, templateValues) {
        return bk$.extend({
            preset: "default",
            align: "left"
        }, templateValues);
    },
    image: function(templateName, templateValues) {
        return bk$.extend({
            src: "http://placehold.it/250x250"
        }, templateValues);
    },
    paypalbuynow: function(templateName, templateValues) {
        return bk$.extend({
            paypalbuynow_businessemail: "test@test.com",
            paypalbuynow_currency: "GDP",
            paypalbuynow_text: "Buy Me Now"
        }, templateValues);
    },
    dropbox: function(templateName, templateValues) {
        return bk$.extend({
            showFileName: 1,
            fileName: "test.file"
        }, templateValues);
    },
    blogpost: function(templateName, templateValues) {
        return bk$.extend({}, templateValues);
    },
    blogpostlist: function(templateName, templateValues) {
        return bk$.extend({
            postDisplayType: 'summary'
        }, templateValues);
    },
    ecombasket: function(templateName, templateValues) {
        return bk$.extend({}, templateValues);
    },
    ecomfeaturedproducts: function(templateName, templateValues) {
        return bk$.extend({
            selectedTag: 'summer'
        }, templateValues);
    },
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
                    url: "http://placehold.it/2250x800",
                    fileType: "image"
                },
                2: {
                    url: "http://placehold.it/300x100",
                    fileType: "image"
                },
                3: {
                    url: "http://placehold.it/250x250",
                    fileType: "image"
                },
                4: {
                    url: "http://placehold.it/529x150",
                    fileType: "image"
                },
                5: {
                    url: "http://placehold.it/600x200",
                    fileType: "image"
                },
                6: {
                    url: "http://placehold.it/250x250",
                    fileType: "image"
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
            "items":
            [{
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
               "highlight":1,
               "created":"2014-01-08 12:46:44",
               "updated":"2014-01-09 12:02:47",
               "note": "here is the note part",
               "items":
               [{
                     "ref":27,
                     "title":"Daily Oats Organic Rude Health Porridge",
                     "description":"This porridge will have you feeling rudely healthy all day. we top ours with honey, fresh strawberries & bananas",
                     "assetRef": 1,
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":1,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":2,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":3,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":1,
                     "menuType":"item",
                     "displayOrder":4,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":5,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":6,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":0,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":7,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":0,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":1,
                     "menuType":"item",
                     "displayOrder":8,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":1,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":2,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":3,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":1,
                     "menuType":"item",
                     "displayOrder":4,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":5,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":6,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":0,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":7,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":0,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":8,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":1,
                     "created":"2014-01-09 12:10:03",
                     "updated":"2014-01-09 12:10:16",
                     "items":[
                        {
                           "ref":35,
                           "title":"Ultimate Superfoods Rude Health Muesli",
                           "description":"Add natural yoghurt & fresh fruit £1.50Wheat free & totally organic blend of oats, apricots, barley & rye flakes, apple, sultanas, dates, golden linseed, seeds & raisins",
                           "assetRef": null,
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":1,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":0,
                              "foodNutFree":1,
                              "foodGlutenFree":0,
                              "foodDairyFree":1,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
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
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":2,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":0,
                              "foodNutFree":0,
                              "foodGlutenFree":0,
                              "foodDairyFree":0,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
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
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":3,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":0,
                              "foodNutFree":0,
                              "foodGlutenFree":0,
                              "foodDairyFree":0,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "created":"2014-01-09 12:10:03",
                     "updated":"2014-01-09 12:10:16",
                     "items":[
                        {
                           "ref":35,
                           "title":"Ultimate Superfoods Rude Health Muesli",
                           "description":"Add natural yoghurt & fresh fruit £1.50Wheat free & totally organic blend of oats, apricots, barley & rye flakes, apple, sultanas, dates, golden linseed, seeds & raisins",
                           "assetRef": null,
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":1,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":0,
                              "foodNutFree":1,
                              "foodGlutenFree":0,
                              "foodDairyFree":1,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
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
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":2,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":0,
                              "foodNutFree":0,
                              "foodGlutenFree":0,
                              "foodDairyFree":0,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
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
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":3,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":0,
                              "foodNutFree":0,
                              "foodGlutenFree":0,
                              "foodDairyFree":0,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        }
                     ]
                }]
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
               "highlight":0,
               "created":"2014-01-08 12:46:44",
               "updated":"2014-01-09 12:02:47",
               "items":[
                  {
                     "ref":27,
                     "title":"Daily Oats Organic Rude Health Porridge",
                     "description":"This porridge will have you feeling rudely healthy all day. we top ours with honey, fresh strawberries & bananas",
                     "assetRef": null,
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":1,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":2,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":3,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":1,
                     "menuType":"item",
                     "displayOrder":4,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":5,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":6,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":0,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":7,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":0,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":8,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":1,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":2,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":3,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":1,
                     "menuType":"item",
                     "displayOrder":4,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":5,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":0,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":6,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":1,
                        "foodNutFree":0,
                        "foodGlutenFree":0,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":7,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":0,
                        "foodVegan":1,
                        "foodNutFree":0,
                        "foodGlutenFree":1,
                        "foodDairyFree":0,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "menuType":"item",
                     "displayOrder":8,
                     "sectionRef":373,
                     "active":1,
                     "dietaryInfo":{
                        "foodVegetarian":1,
                        "foodVegan":1,
                        "foodNutFree":1,
                        "foodGlutenFree":1,
                        "foodDairyFree":1,
                        "calories":null
                     },
                     "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                     "foodSpicy":"not spicy",
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
                     "highlight":1,
                     "created":"2014-01-09 12:10:03",
                     "updated":"2014-01-09 12:10:16",
                     "items":[
                        {
                           "ref":35,
                           "title":"Ultimate Superfoods Rude Health Muesli",
                           "description":"Add natural yoghurt & fresh fruit £1.50Wheat free & totally organic blend of oats, apricots, barley & rye flakes, apple, sultanas, dates, golden linseed, seeds & raisins",
                           "assetRef": null,
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":1,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":1,
                              "foodNutFree":1,
                              "foodGlutenFree":1,
                              "foodDairyFree":1,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
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
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":2,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":0,
                              "foodNutFree":0,
                              "foodGlutenFree":0,
                              "foodDairyFree":0,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
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
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":3,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":0,
                              "foodNutFree":1,
                              "foodGlutenFree":0,
                              "foodDairyFree":1,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
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
                     "highlight":0,
                     "created":"2014-01-09 12:10:03",
                     "updated":"2014-01-09 12:10:16",
                     "items":[
                        {
                           "ref":35,
                           "title":"Ultimate Superfoods Rude Health Muesli",
                           "description":"Add natural yoghurt & fresh fruit £1.50Wheat free & totally organic blend of oats, apricots, barley & rye flakes, apple, sultanas, dates, golden linseed, seeds & raisins",
                           "assetRef": null,
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":1,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":0,
                              "foodNutFree":1,
                              "foodGlutenFree":0,
                              "foodDairyFree":1,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
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
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":2,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":0,
                              "foodNutFree":0,
                              "foodGlutenFree":0,
                              "foodDairyFree":0,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
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
                           "highlight":0,
                           "menuType":"item",
                           "displayOrder":3,
                           "sectionRef":376,
                           "active":1,
                           "dietaryInfo":{
                              "foodVegetarian":1,
                              "foodVegan":0,
                              "foodNutFree":1,
                              "foodGlutenFree":0,
                              "foodDairyFree":1,
                              "calories":null
                           },
                           "foodNutrition":"Contains gluten, Contains seeds & kittens, Contains dairy",
                           "foodSpicy":"not spicy",
                           "prices":{
                              "name":"Normal",
                              "price":"$5"
                           }
                        }
                     ]
                  }
               ]
            }]
        },
        "ecommerce": {
            "store":{
                "ref":"18",
                "currency":{
                    "ref":"3",
                    "name":"Pound Sterling",
                    "alphaCode":"GBP",
                    "htmlCode":"&#163;"
                },
                "stripePublishableKey":'',
                "paypal":'',
                "chargeUrl":"/",
                "paymentCompletionUrl": "/",
                "calculateUrl":"/site/12345/ecom.calc.js",
                "categories" :[
                    {
                        "name": "woman",
                        "ref": 1
                    },{
                        "name": "man",
                        "ref": 2
                    }
                ],
                "tags": [
                    {
                        "title": "summer",
                        "ref": 1
                    },{
                        "title": "winter",
                        "ref": 2
                    }
                ]
            },
            "pageOffset": "0",
            "filteredProducts": {
                "products": [{
                    "ref":1,
                    "multiplePrices": false,
                    "formattedPrice": "£32",
                    "title":"Aliquam Handbag",
                    "shortDescription":null,
                    "longDescription":"Aliquam iaculis risus ut orci pharetra, eu interdum orci tempus. Sed non malesuada dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    "visibility":0,
                    "availability":1,
                    "sku":null,
                    "assets":[
                    {
                       "ref":15,
                       "assetRef":1
                    }],
                    "category":{
                        "ref":10,
                        "name":"Handheld"
                    },
                     "tags":[
                        {
                            "ref": 1,
                            "slug": "summer",
                            "title": "summer"
                        },{
                            "ref": 2,
                            "slug": "winter",
                            "title": "winter"
                        }
                     ],
                     "options":[
                        {
                           "ref":21,
                           "title":"Colour",
                           "values":[
                              {
                                 "ref":66,
                                 "title":"pink"
                              },
                              {
                                 "ref":67,
                                 "title":"blue"
                              },
                              {
                                 "ref":68,
                                 "title":"turquoise"
                              },
                              {
                                 "ref":69,
                                 "title":"brown"
                              }
                           ]
                        }
                     ],
                     "created":{
                        "date":"2014-03-20 09:29:34",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                     },
                     "updated":{
                        "date":"2014-03-20 09:32:02",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                     },
                     "variations":[
                        {
                           "ref":1,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"32.00",
                           "formattedPrice":"£32.00",
                           "stock":3,
                           "values":[
                              {
                                 "ref":92,
                                 "optionTitle":"Colour",
                                 "valueTitle":"blue"
                              }
                           ]
                        },
                        {
                           "ref":3,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"32.00",
                           "formattedPrice":"£32.00",
                           "stock":8,
                           "values":[
                              {
                                 "ref":93,
                                 "optionTitle":"Colour",
                                 "valueTitle":"turquoise"
                              }
                           ]
                        },
                        {
                           "ref":5,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"32.00",
                           "formattedPrice":"£32.00",
                           "stock":9,
                           "values":[
                              {
                                 "ref":94,
                                 "optionTitle":"Colour",
                                 "valueTitle":"pink"
                              }
                           ]
                        },
                        {
                           "ref":7,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"30.00",
                           "formattedPrice":"£32.00",
                           "stock":7,
                           "values":[
                              {
                                 "ref":95,
                                 "optionTitle":"Colour",
                                 "valueTitle":"brown"
                              }
                           ]
                        }
                    ]
                },
                {
                     "ref":2,
                     "multiplePrices": true,
                     "formattedPrice": "£32",
                     "title":"Commodo Handbag",
                     "shortDescription":null,
                     "longDescription":"Suspendisse consequat pharetra malesuada. Nullam luctus felis in commodo vehicula. Cum sociis natoque penatibus et magnis dis parturient montes",
                     "visibility":0,
                     "availability":1,
                     "sku":null,
                     "assets":[
                        {
                           "ref":21,
                           "assetRef":2
                        }
                     ],
                     "category":{
                        "ref":10,
                        "name":"Handheld"
                     },
                     "tags":[
                        {
                            "ref": 1,
                            "slug": "summer",
                            "title": "summer"
                        }
                     ],
                     "options":[
                        {
                           "ref":21,
                           "title":"Colour",
                           "values":[
                              {
                                 "ref":66,
                                 "title":"pink"
                              },
                              {
                                 "ref":67,
                                 "title":"blue"
                              },
                              {
                                 "ref":68,
                                 "title":"turquoise"
                              },
                              {
                                 "ref":69,
                                 "title":"brown"
                              }
                           ]
                        }
                     ],
                     "created":{
                        "date":"2014-03-20 09:41:35",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                     },
                     "updated":{
                        "date":"2014-03-20 09:41:35",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                     },
                     "variations":[
                        {
                           "ref":2,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"32.00",
                           "formattedPrice":"£32.00",
                           "stock":3,
                           "values":[
                              {
                                 "ref":92,
                                 "optionTitle":"Colour",
                                 "valueTitle":"blue"
                              }
                           ]
                        },
                        {
                           "ref":4,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"32.00",
                           "formattedPrice":"£32.00",
                           "stock":8,
                           "values":[
                              {
                                 "ref":93,
                                 "optionTitle":"Colour",
                                 "valueTitle":"turquoise"
                              }
                           ]
                        },
                        {
                           "ref":6,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"32.00",
                           "formattedPrice":"£32.00",
                           "stock":9,
                           "values":[
                              {
                                 "ref":94,
                                 "optionTitle":"Colour",
                                 "valueTitle":"pink"
                              }
                           ]
                        },
                        {
                           "ref":8,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"30.00",
                           "formattedPrice":"£32.00",
                           "stock":7,
                           "values":[
                              {
                                 "ref":95,
                                 "optionTitle":"Colour",
                                 "valueTitle":"brown"
                              }
                           ]
                        }
                    ]
                },
                {
                     "ref":3,
                     "multiplePrices": false,
                     "formattedPrice": "£32",
                     "title":"Conubia Nostra Handbag",
                     "shortDescription":null,
                     "longDescription":"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut a ligula non tortor pretium laoreet at vel mi. ",
                     "visibility":0,
                     "availability":1,
                     "sku":null,
                     "assets":[
                        {
                           "ref":22,
                           "assetRef":3
                        }
                     ],
                     "category":{
                        "ref":11,
                        "name":"Weekend Bag"
                     },
                     "tags":[
                        {
                            "ref": 2,
                            "slug": "winter",
                            "title": "winter"
                        }
                     ],
                     "options":[
                        {
                           "ref":22,
                           "title":"Size",
                           "values":[
                              {
                                 "ref":70,
                                 "title":"small"
                              },
                              {
                                 "ref":71,
                                 "title":"large"
                              }
                           ]
                        }
                     ],
                     "created":{
                        "date":"2014-03-20 09:46:03",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                     },
                     "updated":{
                        "date":"2014-03-20 09:46:03",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                     },
                     "variations":[
                        {
                           "ref":11,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"42.00",
                           "formattedPrice":"£42.00",
                           "stock":4,
                           "values":[
                              {
                                 "ref":96,
                                 "optionTitle":"Size",
                                 "valueTitle":"small"
                              }
                           ]
                        },
                        {
                           "ref":13,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"58.00",
                           "formattedPrice":"£58.00",
                           "stock":15,
                           "values":[
                              {
                                 "ref":97,
                                 "optionTitle":"Size",
                                 "valueTitle":"large"
                              }
                           ]
                        }
                    ]
                },
                {
                     "ref":4,
                     "multiplePrices": false,
                     "formattedPrice": "£32",
                     "title":"Magnis Handbag",
                     "shortDescription":null,
                     "longDescription":"Cum sociis natoque penatibus et magnis dis parturient montes.",
                     "visibility":0,
                     "availability":1,
                     "sku":null,
                     "assets":[
                        {
                           "ref":20,
                           "assetRef":4
                        }
                     ],
                     "category":{
                        "ref":10,
                        "name":"Handheld"
                     },
                     "tags":[
                        {
                            "ref": 1,
                            "slug": "summer",
                            "title": "summer"
                        },{
                            "ref": 2,
                            "slug": "winter",
                            "title": "winter"
                        }
                     ],
                     "options":[
                        {
                           "ref":22,
                           "title":"Size",
                           "values":[
                              {
                                 "ref":70,
                                 "title":"small"
                              },
                              {
                                 "ref":71,
                                 "title":"large"
                              }
                           ]
                        }
                     ],
                     "created":{
                        "date":"2014-03-20 09:38:16",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                     },
                     "updated":{
                        "date":"2014-03-20 09:38:16",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                    },
                    "variations":[
                        {
                           "ref":10,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"42.00",
                           "formattedPrice":"£42.00",
                           "stock":4,
                           "values":[
                              {
                                 "ref":96,
                                 "optionTitle":"Size",
                                 "valueTitle":"small"
                              }
                           ]
                        },
                        {
                           "ref":12,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"58.00",
                           "formattedPrice":"£58.00",
                           "stock":15,
                           "values":[
                              {
                                 "ref":97,
                                 "optionTitle":"Size",
                                 "valueTitle":"large"
                              }
                           ]
                        }
                    ]
                },
                {
                     "ref":5,
                     "multiplePrices": false,
                     "formattedPrice": "£32",
                     "title":"Montes Handheld Bag",
                     "shortDescription":null,
                     "longDescription":"Suspendisse consequat pharetra malesuada. Nullam luctus felis in commodo vehicula. Cum sociis natoque penatibus et magnis dis parturient montes.",
                     "visibility":0,
                     "availability":1,
                     "sku":null,
                     "assets":[
                        {
                           "ref":19,
                           "assetRef":5
                        }
                     ],
                     "category":{
                        "ref":10,
                        "name":"Handheld"
                     },
                     "tags":[
                        {
                            "ref": 1,
                            "slug": "summer",
                            "title": "summer"
                        },{
                            "ref": 2,
                            "slug": "winter",
                            "title": "winter"
                        }
                     ],
                     "options":[
                        {
                           "ref":22,
                           "title":"Size",
                           "values":[
                              {
                                 "ref":70,
                                 "title":"small"
                              },
                              {
                                 "ref":71,
                                 "title":"large"
                              }
                           ]
                        }
                     ],
                     "created":{
                        "date":"2014-03-20 09:36:42",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                     },
                     "updated":{
                        "date":"2014-03-20 09:36:42",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                     },
                    "variations":[
                        {
                           "ref":22,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"42.00",
                           "formattedPrice":"£42.00",
                           "stock":4,
                           "values":[
                              {
                                 "ref":96,
                                 "optionTitle":"Size",
                                 "valueTitle":"small"
                              }
                           ]
                        },
                        {
                           "ref":24,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"58.00",
                           "stock":15,
                           "values":[
                              {
                                 "ref":97,
                                 "optionTitle":"Size",
                                 "valueTitle":"large"
                              }
                           ]
                        }
                    ]
                },
                {
                    "ref":6,
                    "multiplePrices": false,
                    "formattedPrice": "£32",
                    "title":"Tristique Handbag",
                    "shortDescription":null,
                    "longDescription":"Aliquam iaculis risus ut orci pharetra, eu interdum orci tempus. Sed non malesuada dui. Pellentesque habitant morbi tristique.",
                    "visibility":0,
                    "availability":1,
                    "sku":null,
                    "assets":[
                        {
                           "ref":23,
                           "assetRef":6
                        }
                    ],
                    "category":{
                        "ref":12,
                        "name":"Tote Bag"
                    },
                    "tags":[
                        {
                            "ref": 1,
                            "slug": "summer",
                            "title": "summer"
                        },{
                            "ref": 2,
                            "slug": "winter",
                            "title": "winter"
                        }
                    ],
                    "options":[
                        {
                           "ref":20,
                           "title":"Colour",
                           "values":[
                              {
                                 "ref":64,
                                 "title":"red"
                              },
                              {
                                 "ref":65,
                                 "title":"brown"
                              }
                           ]
                        }
                    ],
                    "created":{
                        "date":"2014-03-20 09:34:38",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                    },
                    "updated":{
                        "date":"2014-03-20 09:46:41",
                        "timezone_type":3,
                        "timezone":"Europe/London"
                    },
                    "variations":[
                        {
                           "ref":21,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"67.00",
                           "formattedPrice":"£67.00",
                           "stock":3,
                           "values":[
                              {
                                 "ref":90,
                                 "optionTitle":"Colour",
                                 "valueTitle":"brown"
                              }
                           ]
                        },
                        {
                           "ref":23,
                           "title":"productVariation",
                           "sku":"1234",
                           "price":"67.00",
                           "formattedPrice":"£67.00",
                           "stock":1,
                           "values":[
                              {
                                 "ref":91,
                                 "optionTitle":"Colour",
                                 "valueTitle":"red"
                              }
                           ]
                        }
                    ]
                }],
                "totalCount": 6
            },
            "product": {
              "assets": [
                {
                  "assetRef": 1,
                  "ref": 1
                },
                {
                  "assetRef": 2,
                  "ref": 2
                },
                {
                  "assetRef": 3,
                  "ref": 3
                }
              ],
              "category": {
                "name": "skirt",
                "ref": 59
              },
              "created": {
                "date": "2014-04-28 10:12:57",
                "timezone": "Europe/London",
                "timezone_type": 3
              },
              "formattedPrice": "£34.00",
              "longDescription": "Donec id elit non sapien tincidunt pellentesque vitae lacinia quam. Maecenas id ipsum in est sagittis porttitor. Suspendisse potenti. Nullam dictum massa augue, at aliquam purus mattis non. Aliquam ac sagittis elit.",
              "mapValueToVariation": [],
              "multiplePrices": false,
              "options": [],
              "ref": 1,
              "stockTrack": 1,
              "stockUnlimited": 0,
              "stockWarningLevel": 10,
              "tags": [
                "stripes",
                "black and white",
                "knee lenght"
              ],
              "title": "Donec id elit non sapien tincidunt",
              "updated": {
                "date": "2014-04-28 10:13:31",
                "timezone": "Europe/London",
                "timezone_type": 3
              },
              "variations": [
                {
                  "formattedPrice": "£34.00",
                  "price": "34.00",
                  "productRef": 1,
                  "ref": 1,
                  "sku": "",
                  "stock": 0,
                  "title": "Donec id elit non sapien tincidunt",
                  "values": [],
                  "weight": "0.000"
                }
              ],
              "visibility": 1
            },
            "products":[
            {
                "ref":1,
                "title":"Aliquam Handbag",
                "shortDescription":null,
                "longDescription":"Aliquam iaculis risus ut orci pharetra, eu interdum orci tempus. Sed non malesuada dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "visibility":0,
                "availability":1,
                "sku":null,
                "assets":[
                {
                   "ref":15,
                   "assetRef":1
                }],
                "category":{
                    "ref":10,
                    "name":"Handheld"
                },
                 "tags":[

                 ],
                 "options":[
                    {
                       "ref":21,
                       "title":"Colour",
                       "values":[
                          {
                             "ref":66,
                             "title":"pink"
                          },
                          {
                             "ref":67,
                             "title":"blue"
                          },
                          {
                             "ref":68,
                             "title":"turquoise"
                          },
                          {
                             "ref":69,
                             "title":"brown"
                          }
                       ]
                    }
                 ],
                 "created":{
                    "date":"2014-03-20 09:29:34",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                 },
                 "updated":{
                    "date":"2014-03-20 09:32:02",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                 },
                 "variations":[
                    {
                       "ref":1,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"32.00",
                       "formattedPrice":"£32.00",
                       "stock":3,
                       "values":[
                          {
                             "ref":92,
                             "optionTitle":"Colour",
                             "valueTitle":"blue"
                          }
                       ]
                    },
                    {
                       "ref":3,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"32.00",
                       "formattedPrice":"£32.00",
                       "stock":8,
                       "values":[
                          {
                             "ref":93,
                             "optionTitle":"Colour",
                             "valueTitle":"turquoise"
                          }
                       ]
                    },
                    {
                       "ref":5,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"32.00",
                       "formattedPrice":"£32.00",
                       "stock":9,
                       "values":[
                          {
                             "ref":94,
                             "optionTitle":"Colour",
                             "valueTitle":"pink"
                          }
                       ]
                    },
                    {
                       "ref":7,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"30.00",
                       "formattedPrice":"£32.00",
                       "stock":7,
                       "values":[
                          {
                             "ref":95,
                             "optionTitle":"Colour",
                             "valueTitle":"brown"
                          }
                       ]
                    }
                ]
            },
            {
                 "ref":2,
                 "title":"Commodo Handbag",
                 "shortDescription":null,
                 "longDescription":"Suspendisse consequat pharetra malesuada. Nullam luctus felis in commodo vehicula. Cum sociis natoque penatibus et magnis dis parturient montes",
                 "visibility":0,
                 "availability":1,
                 "sku":null,
                 "assets":[
                    {
                       "ref":21,
                       "assetRef":2
                    }
                 ],
                 "category":{
                    "ref":10,
                    "name":"Handheld"
                 },
                 "tags":[
                    "blue",
                    "brown",
                    "pink",
                    "turquoise"
                 ],
                 "options":[
                    {
                       "ref":21,
                       "title":"Colour",
                       "values":[
                          {
                             "ref":66,
                             "title":"pink"
                          },
                          {
                             "ref":67,
                             "title":"blue"
                          },
                          {
                             "ref":68,
                             "title":"turquoise"
                          },
                          {
                             "ref":69,
                             "title":"brown"
                          }
                       ]
                    }
                 ],
                 "created":{
                    "date":"2014-03-20 09:41:35",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                 },
                 "updated":{
                    "date":"2014-03-20 09:41:35",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                 },
                 "variations":[
                    {
                       "ref":2,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"32.00",
                       "formattedPrice":"£32.00",
                       "stock":3,
                       "values":[
                          {
                             "ref":92,
                             "optionTitle":"Colour",
                             "valueTitle":"blue"
                          }
                       ]
                    },
                    {
                       "ref":4,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"32.00",
                       "formattedPrice":"£32.00",
                       "stock":8,
                       "values":[
                          {
                             "ref":93,
                             "optionTitle":"Colour",
                             "valueTitle":"turquoise"
                          }
                       ]
                    },
                    {
                       "ref":6,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"32.00",
                       "formattedPrice":"£32.00",
                       "stock":9,
                       "values":[
                          {
                             "ref":94,
                             "optionTitle":"Colour",
                             "valueTitle":"pink"
                          }
                       ]
                    },
                    {
                       "ref":8,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"30.00",
                       "formattedPrice":"£32.00",
                       "stock":7,
                       "values":[
                          {
                             "ref":95,
                             "optionTitle":"Colour",
                             "valueTitle":"brown"
                          }
                       ]
                    }
                ]
            },
            {
                 "ref":3,
                 "title":"Conubia Nostra Handbag",
                 "shortDescription":null,
                 "longDescription":"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut a ligula non tortor pretium laoreet at vel mi. ",
                 "visibility":0,
                 "availability":1,
                 "sku":null,
                 "assets":[
                    {
                       "ref":22,
                       "assetRef":3
                    }
                 ],
                 "category":{
                    "ref":11,
                    "name":"Weekend Bag"
                 },
                 "tags":[
                    "red"
                 ],
                 "options":[
                    {
                       "ref":22,
                       "title":"Size",
                       "values":[
                          {
                             "ref":70,
                             "title":"small"
                          },
                          {
                             "ref":71,
                             "title":"large"
                          }
                       ]
                    }
                 ],
                 "created":{
                    "date":"2014-03-20 09:46:03",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                 },
                 "updated":{
                    "date":"2014-03-20 09:46:03",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                 },
                 "variations":[
                    {
                       "ref":11,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"42.00",
                       "formattedPrice":"£42.00",
                       "stock":4,
                       "values":[
                          {
                             "ref":96,
                             "optionTitle":"Size",
                             "valueTitle":"small"
                          }
                       ]
                    },
                    {
                       "ref":13,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"58.00",
                       "formattedPrice":"£58.00",
                       "stock":15,
                       "values":[
                          {
                             "ref":97,
                             "optionTitle":"Size",
                             "valueTitle":"large"
                          }
                       ]
                    }
                ]
            },
            {
                 "ref":4,
                 "title":"Magnis Handbag",
                 "shortDescription":null,
                 "longDescription":"Cum sociis natoque penatibus et magnis dis parturient montes.",
                 "visibility":0,
                 "availability":1,
                 "sku":null,
                 "assets":[
                    {
                       "ref":20,
                       "assetRef":4
                    }
                 ],
                 "category":{
                    "ref":10,
                    "name":"Handheld"
                 },
                 "tags":[
                    "leather",
                    "brown"
                 ],
                 "options":[
                    {
                       "ref":22,
                       "title":"Size",
                       "values":[
                          {
                             "ref":70,
                             "title":"small"
                          },
                          {
                             "ref":71,
                             "title":"large"
                          }
                       ]
                    }
                 ],
                 "created":{
                    "date":"2014-03-20 09:38:16",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                 },
                 "updated":{
                    "date":"2014-03-20 09:38:16",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                },
                "variations":[
                    {
                       "ref":10,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"42.00",
                       "formattedPrice":"£42.00",
                       "stock":4,
                       "values":[
                          {
                             "ref":96,
                             "optionTitle":"Size",
                             "valueTitle":"small"
                          }
                       ]
                    },
                    {
                       "ref":12,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"58.00",
                       "formattedPrice":"£58.00",
                       "stock":15,
                       "values":[
                          {
                             "ref":97,
                             "optionTitle":"Size",
                             "valueTitle":"large"
                          }
                       ]
                    }
                ]
            },
            {
                 "ref":5,
                 "title":"Montes Handheld Bag",
                 "shortDescription":null,
                 "longDescription":"Suspendisse consequat pharetra malesuada. Nullam luctus felis in commodo vehicula. Cum sociis natoque penatibus et magnis dis parturient montes.",
                 "visibility":0,
                 "availability":1,
                 "sku":null,
                 "assets":[
                    {
                       "ref":19,
                       "assetRef":5
                    }
                 ],
                 "category":{
                    "ref":10,
                    "name":"Handheld"
                 },
                 "tags":[
                    "brown"
                 ],
                 "options":[
                    {
                       "ref":22,
                       "title":"Size",
                       "values":[
                          {
                             "ref":70,
                             "title":"small"
                          },
                          {
                             "ref":71,
                             "title":"large"
                          }
                       ]
                    }
                 ],
                 "created":{
                    "date":"2014-03-20 09:36:42",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                 },
                 "updated":{
                    "date":"2014-03-20 09:36:42",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                 },
                "variations":[
                    {
                       "ref":22,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"42.00",
                       "formattedPrice":"£42.00",
                       "stock":4,
                       "values":[
                          {
                             "ref":96,
                             "optionTitle":"Size",
                             "valueTitle":"small"
                          }
                       ]
                    },
                    {
                       "ref":24,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"58.00",
                       "stock":15,
                       "values":[
                          {
                             "ref":97,
                             "optionTitle":"Size",
                             "valueTitle":"large"
                          }
                       ]
                    }
                ]
            },
            {
                "ref":6,
                "title":"Tristique Handbag",
                "shortDescription":null,
                "longDescription":"Aliquam iaculis risus ut orci pharetra, eu interdum orci tempus. Sed non malesuada dui. Pellentesque habitant morbi tristique.",
                "visibility":0,
                "availability":1,
                "sku":null,
                "assets":[
                    {
                       "ref":23,
                       "assetRef":6
                    }
                ],
                "category":{
                    "ref":12,
                    "name":"Tote Bag"
                },
                "tags":[

                ],
                "options":[
                    {
                       "ref":20,
                       "title":"Colour",
                       "values":[
                          {
                             "ref":64,
                             "title":"red"
                          },
                          {
                             "ref":65,
                             "title":"brown"
                          }
                       ]
                    }
                ],
                "created":{
                    "date":"2014-03-20 09:34:38",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                },
                "updated":{
                    "date":"2014-03-20 09:46:41",
                    "timezone_type":3,
                    "timezone":"Europe/London"
                },
                "variations":[
                    {
                       "ref":21,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"67.00",
                       "formattedPrice":"£67.00",
                       "stock":3,
                       "values":[
                          {
                             "ref":90,
                             "optionTitle":"Colour",
                             "valueTitle":"brown"
                          }
                       ]
                    },
                    {
                       "ref":23,
                       "title":"productVariation",
                       "sku":"1234",
                       "price":"67.00",
                       "formattedPrice":"£67.00",
                       "stock":1,
                       "values":[
                          {
                             "ref":91,
                             "optionTitle":"Colour",
                             "valueTitle":"red"
                          }
                       ]
                    }
                ]
            }]
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
