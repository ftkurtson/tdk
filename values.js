var profile = function(template) {
    return {
        business: "My Business Website",
        logo: "/templates/" + template + "/images/logo.png",
        header: "My Website Header",
        strapline: "Here is the website strapline!",
        postalcode: "BS1 2ND"
    };
};

var library = [
    "<p>Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.</p>",
    "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>",
    "<p>Bacon ipsum dolor sit amet biltong pastrami tenderloin ball tip jowl andouille. Strip steak meatball ribeye shoulder turducken doner, swine shankle pastrami drumstick meatloaf pork. Meatball ham capicola, strip steak andouille shank chuck chicken turducken venison leberkas ball tip. Tri-tip t-bone ball tip salami. Frankfurter brisket corned beef, fatback.</p>"
];

var properties = {
    feature: function(template) {
        return {
            preset: "align-center",
            bgImg: "/templates/" + template + "/images/feature-bg.jpg",
            buttonText: "Sign Up",
            header: "My Website Header",
            strapline: "Here is the website strapline!"
        };
    },
    companyheader: {
        preset: "default",
        showLogo: 1
    },
    content: function() {
        return {
            lines: "all",
            content: library[Math.floor(Math.random() * library.length)]
        };
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
        tweets: [{"screenName":"simonbest","createdAt":"06/Mar/2013","fullName":"simonbest","imageUrl":"http://a0.twimg.com/sticky/default_profile_images/default_profile_0_normal.png","source":"web","text":"RT @seedcamp: Announcing the first 5 locations for Mini Seedcamps: Belgrade, Kiev, Istanbul, Tel Aviv and Stockholm! http://t.co/eXcDDnQvdW"},{"screenName":"simonbest","createdAt":"21/Dec/2012","fullName":"simonbest","imageUrl":"http://a0.twimg.com/sticky/default_profile_images/default_profile_0_normal.png","source":"<a href=\"http://twitter.com/tweetbutton\" rel=\"nofollow\">Tweet Button</a>","text":"Applications for Seedcamp London are open until the 8th of January. Apply now! #seedcamp http://t.co/Vi4t8UKL"},{"screenName":"simonbest","createdAt":"12/Dec/2012","fullName":"simonbest","imageUrl":"http://a0.twimg.com/sticky/default_profile_images/default_profile_0_normal.png","source":"<a href=\"http://twitter.com/tweetbutton\" rel=\"nofollow\">Tweet Button</a>","text":"Low Cost Christmas [Infographic] http://t.co/di6yYR6M via @BaseKit"}]
    },
    youtube: {
        videoId: "yfCdflc3x8U"
    },
    button: {
        text: "Click Me"
    }
};

var site = [
    {
        ref: 1,
        request: "home",
        title: "Home",
        type: "page",
        status: "active"
    },
    {
        ref: 2,
        request: "about",
        title: "About",
        type: "page",
        status: "active"
    },
    {
        ref: 3,
        request: "contact",
        title: "Contact",
        type: "page",
        status: "active"
    }
];

var templates = [
    {
        name: "Pearl",
        directory: "pearl"
    },
    {
        name: "Shutter",
        directory: "shutter"
    },
    {
        name: "Hatch",
        directory: "hatch"
    },
    {
        name: "Joel Money",
        directory: "joel-money"
    }
];
