(function () {
    BaseKit.Widget.Clicktocall = null;

    BaseKit.Widget.ClicktocallProperties = {
        phone: 'profile',
        phoneText: App.t('widgets.clicktocall.default_text', '01234 567 890')
    };

    BaseKit.Widget.ClicktocallMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Clicktocall = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ClicktocallProperties,
            methods: BaseKit.Widget.ClicktocallMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetClicktocall = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Clicktocall(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Linkedincompanyprofile = {};

    BaseKit.Widget.LinkedincompanyprofileProperties = {
        'linkedinID': '',
        'source': 'companyName'
    };

    BaseKit.Widget.LinkedincompanyprofileMethods = {
        construct: function (el, options) {
            this.options = options;

            // check to see if we have already l;oaded the linkinin API
            if (Site.Page.Globals.linkinInAPILoaded === undefined || Site.Page.Globals.linkinInAPILoaded === null) {
                Site.Page.Globals.linkinInAPILoaded = false;
            }

            this.load();
        },

        load: function () {
            var that = this;

            // This dynamically injects the linkedin script into the body
            if (Site.Page.Globals.linkinInAPILoaded === false && $('#linkedin-script').length === 0) {
                $.getScript("http://platform.linkedin.com/in.js", function () {
                    $(this).attr('id', 'linkedin-script');
                    Site.Page.Globals.linkinInAPILoaded = true;
                });
            } else {
                // this is needed to force the LinkedIn code to reparse any new widgets
                if (IN && typeof IN.parse === 'function') {
                    IN.parse();
                }
            }
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Linkedincompanyprofile = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.LinkedincompanyprofileProperties,
            methods: BaseKit.Widget.LinkedincompanyprofileMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetLinkedincompanyprofile = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Linkedincompanyprofile(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Youtube = {};

    BaseKit.Widget.YoutubeProperties = {
        userInput: '', // Stores what the user enters
        videoId: '' // Stores the video id extracted from the user input
    };

    BaseKit.Widget.YoutubeMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },
        load: function () {
            // do something if the widget needs to be loaded
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Youtube = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.YoutubeProperties,
            methods: BaseKit.Widget.YoutubeMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetYoutube = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Youtube(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Gallery = null;

    BaseKit.Widget.GalleryProperties = {
        widgetType: 'widget.gallery',
        imageScale: 'original',
        showTitle: 1,
        showDescription: 1
    };

    BaseKit.Widget.GalleryMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Gallery = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.GalleryProperties,
            methods: BaseKit.Widget.GalleryMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetGallery = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Gallery(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.CompanyheaderProperties = {
		showLogo: 1,
		showText: 1
	};

    BaseKit.Widget.CompanyheaderMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Companyheader = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.CompanyheaderProperties,
            methods: BaseKit.Widget.CompanyheaderMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetCompanyheader = function (options) {
        this.each(function (index, el) {
            var obj = null;
            obj = new BaseKit.Widget.Companyheader(el, options);
            $(el).data('bkob', obj);
        });
    };
}());(function () {
    BaseKit.Widget.Line = null;

    BaseKit.Widget.LineProperties = {
        thickness: 'inherit',
        padding: 'inherit',
        length: 'inherit',
        align: ''
    };

    BaseKit.Widget.LineMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Line = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.LineProperties,
            methods: BaseKit.Widget.LineMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetLine = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Line(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.CompanyaddressProperties = {};

    BaseKit.Widget.CompanyaddressMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Companyaddress = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.CompanyaddressProperties,
            methods: BaseKit.Widget.CompanyaddressMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetCompanyaddress = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Companyaddress(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Socialicons = {};

    BaseKit.Widget.SocialiconsProperties = {
        'googleplus': 'profile',
        'linkedin': 'profile',
        'facebook': 'profile',
        'twitter': 'profile',
        'youtube': 'profile',
        'rss': 'profile'
    };

    BaseKit.Widget.SocialiconsMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },
        load: function () {
            // do something if the widget needs to be loaded
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Socialicons = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.SocialiconsProperties,
            methods: BaseKit.Widget.SocialiconsMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetSocialicons = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Socialicons(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Tweet = null;

    BaseKit.Widget.TweetProperties = {
        linkText: App.t('widgets.tweet.default_link_text', 'Tweet'),
        tweetText: '',
        url: 'http://www.basekit.com'
    };

    BaseKit.Widget.TweetMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        attachEvents: function () {

        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Tweet = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.TweetProperties,
            methods: BaseKit.Widget.TweetMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetTweet = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Tweet(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Feature = null;

    BaseKit.Widget.FeatureProperties = {
        bgImg: '',
        header: App.t('widgets.feature.header_default', 'My great company'),
        strapline: App.t('widgets.feature.strapline_default', 'My strap line goes here'),
        url: '',
        action: 'none',
        icon: '',
        buttonText: App.t('widgets.feature.button_text', 'button text'),
        iconPosition: 'left',
        iconColor: 'black',
        target: 'New',
        showBtn: true
    };

    BaseKit.Widget.FeatureMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        // attachEvents: attach the click event to the button and re-align background
        attachEvents: function () {
            var that = this,
                url = null,
                action = null,
                target = null;

            $(this.el).find('button').on('click', function (e) {
                //get the button date
                action = that.get('action');
                url = that.get('url');
                target = that.get('target');

                // check if the buton has a button link
                if (action !== 'none' && action !== null) {
                    //open in the same window
                    if (target !== '_blank') {
                        window.location = url;
                    } else {
                        window.open(url);
                    }
                }
            });
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Feature = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.FeatureProperties,
            methods: BaseKit.Widget.FeatureMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetFeature = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Feature(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Navigation = null;

    BaseKit.Widget.NavigationProperties = {
        align: 'center',
        icons: []
    };

    BaseKit.Widget.NavigationMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Navigation = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.NavigationProperties,
            methods: BaseKit.Widget.NavigationMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetNavigation = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Navigation(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Space = {};

    BaseKit.Widget.SpaceProperties = {
        height: '50'
    };

    BaseKit.Widget.SpaceMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },
        load: function () {
            // do something if the widget needs to be loaded
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Space = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.SpaceProperties,
            methods: BaseKit.Widget.SpaceMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetSpace = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Space(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Facebooklike = null;

    BaseKit.Widget.FacebooklikeProperties = {
        showFaces: 'true',
        action: 'like',
        colorscheme: 'light',
        layout: 'standard',
        height: '80',
        font: 'arial',
        locale: 'en_US',
        thisUrl: 'www.basekit.com' // RH: Needs to be this site domain
    };

    BaseKit.Widget.FacebooklikeMethods = {
        construct: function (el, options) {
            this.options = options;

            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        // attachEvents: attach the click event to the button
        attachEvents: function () {
            var that = this;
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Facebooklike = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.FacebooklikeProperties,
            methods: BaseKit.Widget.FacebooklikeMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetFacebooklike = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Facebooklike(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Image = null;

    BaseKit.Widget.ImageProperties = {
        description: '',
        url: 'none',
        target: 'none',
        action: 'none',
        scale: 'original',
        imageWidth: 'auto',
        alt: '',
        title: '',
        widgetType: 'widget.image'
    };

    BaseKit.Widget.ImageMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Image = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ImageProperties,
            methods: BaseKit.Widget.ImageMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetImage = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Image(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Responsivecolumns = null;

    BaseKit.Widget.ResponsivecolumnsProperties = {
        selectable: 0,
        isEmpty: 1
    };

    BaseKit.Widget.ResponsivecolumnsMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            this.hideEmptyColumns();
        },

        hideEmptyColumns: function () {
            if (!$('body').hasClass('edit') && this.get('isEmpty') && this.get('isEmpty') === '1') {
                $(this.el).find('.tip-message, #select-columns-num').hide();
            }
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Responsivecolumns = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ResponsivecolumnsProperties,
            methods: BaseKit.Widget.ResponsivecolumnsMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetResponsivecolumns = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Responsivecolumns(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.ButtonProperties = {
        iconPosition: 'left',
        iconColor: 'black',
        icon: '',
        action: 'none',
        text: App.t('widgets.button.default_text', 'Button'),
        url: '',
        target: 'New'
    };

    BaseKit.Widget.ButtonMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        // attachEvents: attach the click event to the button
        attachEvents: function () {
            var that = this,
                url = null,
                action = null,
                target = null;

            $(this.el).find('button').on('click', function (e) {
                //get the button date
                action = that.get('action');
                url = that.get('url');
                target = that.get('target');

                // check if the buton has a button link
                if (action !== 'none' && action !== null) {
                    //open in the same window
                    if (target !== '_blank') {
                        window.location = url;
                    } else {
                        window.open(url);
                    }
                }
            });
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Button = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ButtonProperties,
            methods: BaseKit.Widget.ButtonMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetButton = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Button(el, options));
        });
    };
}());function mapReady() {
    Site.Page.Globals.mapsAPILoaded = true;
}

(function () {
    BaseKit.Widget.Map = {};

    BaseKit.Widget.MapProperties = {
        zoom: 12,
        height: 150, // MB: default height
        address: 'profile',
        latitude: '51.50959718054336',
        longitude: '-0.12668609619140625' // HC: in case the profile is empty
    };

    BaseKit.Widget.MapMethods = {
        construct: function (el, options) {
            // stores the current map
            this.gmap = null;

            // stores the main marker
            this.marker = null;

            // set the global google map property for checking to see if the
            // map api has been loaded
            if (Site.Page.Globals.mapsAPILoaded === undefined || Site.Page.Globals.mapsAPILoaded === null) {
                Site.Page.Globals.mapsAPILoaded = false;
            }

            this.load();
        },

        load: function () {
            // if no maps have yet been loaded, then try to load one
            if (Site.Page.Globals.mapsAPILoaded === false && $('#gmaps-widget-script').length === 0) {
                // This dynamically injects the googlemaps into the body
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.id = "gmaps-widget-script";
                script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=mapReady&language=" + App.session.get('languageCode');

                // append to the body
                document.body.appendChild(script);
            }

            // do checking to see if any maps are loaded yet
            this.isMapReady();
        },

        isMapReady: function () {
            var that = this;

            if (Site.Page.Globals.mapsAPILoaded === false) {
                setTimeout(function () {
                    that.isMapReady();
                }, 100);
            } else {
                this.setupMap();
            }
        },

        setupMap: function () {
            // map options
            var mapOptions = {
                draggable: false,
                zoom: parseInt(this.get('zoom'), 10),
                center: new google.maps.LatLng(parseFloat(this.get('latitude'), 10),
                    parseFloat(this.get('longitude'), 10)),
                scaleControl: false,
                mapTypeControl: false,
                overviewMapControl: false,
                zoomControl: false,
                panControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            // MB: set the height
            // HC: we need to set the height before rendering the map to make sure the map is in the center
            $(this.el).find('.map').height(this.get('height'));

            // set the map
            this.gmap = new google.maps.Map($(this.el).find('.map').get(0), mapOptions);

            if (this.get('address') === 'profile' && Profile.get('postalcode').length > 0) {
                this.findAddress({
                    source: 'profile',
                    value: Profile.get('postalcode')
                }, this.postFindAddress, this);
            } else {
                // reset the map display with all the other options
                this.resetMap();
            }
        },

        /**
         * Centres the map on the new coordinates
         */
        resetMap: function () {
            var newCenter = null;

            // make sure the maps has been loaded
            if (this.gmap !== null && Site.Page.Globals.mapsAPILoaded === true) {
                $(this.el).find('.map').height(this.get('height'));

                // NOTE: Google Maps is fussy - needs parseFloat calls!
                newCenter = new google.maps.LatLng(parseFloat(this.get('latitude'), 10),
                    parseFloat(this.get('longitude'), 10));

                // reset the map
                this.gmap.setZoom(parseInt(this.get('zoom'), 10));
                this.gmap.setCenter(newCenter);

                // create  an new map marker at this point
                this.createMapMarker(parseFloat(this.get('latitude'), 10),
                    parseFloat(this.get('longitude'), 10));
            }
        },

        /**
         * createMapMarker: creates a marker on the map at the passed co-ordinates
         * @param <integer> latitude - the latitude to position the marker
         * @param <integer> longitude - the longitude to position the marker
         */
        createMapMarker: function (latitude, longitude) {
            var that = this,
                marker = null,
                icon = new google.maps.MarkerImage('//' + App.session.get('assetSubdomain') + '.' + App.session.get('domain') + '/apps/images/mobile/map-marker.png',
                    new google.maps.Size(32, 32), null,
                    new google.maps.Point(16, 32),
                    new google.maps.Size(32, 32));

            // add the marker if one is not yet defined
            if (this.marker === null) {
                // create a new marker
                this.marker = new google.maps.Marker({
                    icon: icon,
                    bouncy: true,
                    draggable: true,
                    autoPan: true,
                    position: new google.maps.LatLng(latitude, longitude)
                });

                // assign it to the current map
                this.marker.setMap(this.gmap);
            } else {
                // remove it from the current map and update the pos
                this.marker.setMap(null);
                this.marker.setPosition(new google.maps.LatLng(latitude, longitude));

                // assign it to the current map
                this.marker.setMap(this.gmap);
            }
        },

        /**
         * tries to find the address specified
         * @param <object> address - the address details and the type of search
         * @param <function> callback
         * @param <object> scope
         */
        findAddress: function (address, callback, scope) {
            if (typeof (address) === "undefined" || typeof (address) !== "object") {
                throw new Error('findAddress param address error');
            }
            if (typeof (callback) === "undefined" || typeof (callback) !== "function") {
                throw new Error('findAddress param callback error');
            }
            if (typeof (scope) === "undefined" || typeof (scope) !== "object") {
                throw new Error('findAddress scope callback error');
            }

            var that = this,
                geoOptions = {
                    'address': null,
                    'region': "ISO 3166-1"
                },
                results = {};

            if (!this.geocoder) {
                this.geocoder = new google.maps.Geocoder();
            }

            geoOptions.address = address.value || '';

            this.geocoder.geocode(geoOptions, function (result, status) {
                if (status === google.maps.GeocoderStatus.OK && result.length) {
                    results = {
                        latitude: result[0].geometry.location.lat(),
                        longitude: result[0].geometry.location.lng()
                    };
                } else {
                    // HC: if it's a bad or empty postalcode, use the defualt one
                    results = {
                        latitude: that.get('latitude'),
                        longitude: that.get('longitude')
                    };
                }

                results.address = (address.source && address.source === 'profile') ? 'profile' : address.value;
                results.postalcode = (address.source && address.source === 'profile') ? address.value : '';

                // RH: Call the callback
                callback.apply(scope, [results]);
            });
        },

        /**
         * postFindAddress: sets the valuse as temporary and resets map
         * @param <object> results - contains lat, lng, address, postalcode(for profile)
         */
        postFindAddress: function (results) {
            if (typeof (results) === "undefined" || typeof (results) !== "object") {
                throw new Error('settingsPostFindAddress parameter error: expecting a object');
            }

            this.set('latitude', results.latitude, true);
            this.set('longitude', results.longitude, true);
            this.set('address', results.address, true);

            // refresh the map
            this.resetMap();
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Map = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.MapProperties,
            methods: BaseKit.Widget.MapMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetMap = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Map(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.CompanynameProperties = {};

    BaseKit.Widget.CompanynameMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Companyname = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.CompanynameProperties,
            methods: BaseKit.Widget.CompanynameMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetCompanyname = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Companyname(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Content = null;

    BaseKit.Widget.ContentProperties = {
        lines: 'all',
        content: ''
    };

    BaseKit.Widget.ContentMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            if (this.get('ref') !== null) {
                this.showLines(this.get('lines'));
            }
        },

        /**
         *showLines: show content according to the lines set and attach expand event
         *@param <string> lines - this is a content widget property, determining how many lines to show
         */
        showLines: function (lines) {
            if (typeof lines !== "undefined") {
                var contentEl = $(this.el).find('.bk-content-text'),
                    contentElHeight = null,
                    newheight = null;

                contentEl.height('100%');
                contentElHeight = contentEl.height();

                switch (lines) {
                case 'one':
                    newheight = contentElHeight * 25 / 100;
                    this.expandText(newheight, contentElHeight);
                    break;
                case 'two':
                    newheight = contentElHeight * 50 / 100;
                    this.expandText(newheight, contentElHeight);
                    break;
                case 'all':
                    break;
                }

                contentEl.height(newheight);
                contentEl.css('overflow', 'hidden');
            }
        },

        /**
         * expandText: expend the content
         * @param <string> newheight - the line height to be displayed
         * @param <string> fullheight - the whole height of the paragraph
         */
        expandText: function (newheight, fullheight) {
            if (typeof newheight !== "undefined" && typeof fullheight !== "undefined") {
                var thisEl = $(this.el),
                    expandSpan = thisEl.find('span.expand'),
                    contentTextEl = thisEl.find('div.bk-content-text'),
                    h = null;

                // MB: animate the text div to slide up and down
                expandSpan.bind('click', function () {
                    if (contentTextEl.height() === parseInt(fullheight, 10)) {
                        thisEl.find('.more').show();
                        thisEl.find('.less').hide();
                        h = newheight;
                    } else {
                        thisEl.find('.more').hide();
                        thisEl.find('.less').show();
                        h = fullheight;
                    }

                    // HC: slide up and down smoothly
                    contentTextEl.stop().animate({
                        'height': h
                    }, 500);
                });
            }
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Content = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ContentProperties,
            methods: BaseKit.Widget.ContentMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetContent = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Content(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Linkedinprofile = {};

    BaseKit.Widget.LinkedinprofileProperties = {};

    BaseKit.Widget.LinkedinprofileMethods = {
        construct: function (el, options) {
            this.options = options;

            // check to see if we have already l;oaded the linkinin API
            if (Site.Page.Globals.linkinInAPILoaded === undefined || Site.Page.Globals.linkinInAPILoaded === null) {
                Site.Page.Globals.linkinInAPILoaded = false;
            }

            this.load();
        },

        load: function () {
            var that = this;

            // This dynamically injects the linkedin script into the body
            if (Site.Page.Globals.linkinInAPILoaded === false && $('#linkinedin-widget-script').length === 0) {
                $.getScript("http://platform.linkedin.com/in.js?suppressWarnings=true", function () {
                    $(this).attr('id', 'linkinedin-widget-script');
                    Site.Page.Globals.linkinInAPILoaded = true;
                });
            } else {
                // this is needed to force the LinkedIn code to reparse any new profile url's
                if (IN && typeof IN.parse === 'function') {
                    IN.parse();
                }
            }
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Linkedinprofile = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.LinkedinprofileProperties,
            methods: BaseKit.Widget.LinkedinprofileMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetLinkedinprofile = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Linkedinprofile(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Redirecttodesktop = null;

    BaseKit.Widget.RedirecttodesktopProperties = {
        text: App.t('widgets.redirecttodesktop.default_text', 'Switch to desktop'),
        url: ''
    };

    BaseKit.Widget.RedirecttodesktopMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Redirecttodesktop = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.RedirecttodesktopProperties,
            methods: BaseKit.Widget.RedirecttodesktopMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetRedirecttodesktop = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Redirecttodesktop(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Twitter = null;

    BaseKit.Widget.TwitterProperties = {
        count: '3',
        refreshTime: '1800000',
        includeRts: '1',
        searchKey: 'profile',
        searchType: 'username',
        defaultSearchKey: 'basekit' // HC: for the empty input
    };

    BaseKit.Widget.TwitterMethods = {
        construct: function () {
            this.refreshInterval = '';
            this.load();
        },

        load: function () {
            this.refreshTimeline();
            this.getUpdateTwitterFeed();
        },

        /**
         * refreshTimeline: set the interval for refreshing the timeline twitter feed
         */
        refreshTimeline: function () {
            var that = this,
                // Default to every 30 mins
                refreshTime = (this.get('refreshTime') > 0 ? parseInt(this.get('refreshTime'), 10) : 1800000);

            // clean the interval
            if (this.refreshInterval !== '') {
                window.clearInterval(this.refreshInterval);
                this.refreshInterval = '';
            }

            this.refreshInterval = window.setInterval(function () {
                try {
                    //api get new data
                    that.getUpdateTwitterFeed();
                } catch (err) {
                    clearInterval(that.refreshInterval);

                    //throw error
                    console.log(err);
                }
            }, refreshTime);
        },

        /**
         * getUpdateTwitterFeed: an api call for getting the tweets and format the data to rerender the widget
         */
        getUpdateTwitterFeed: function () {
            var that = this,
                url = '/site/' + App.session.get('siteRef') + '/fetch-feed',
                createdDate = null,
                tweetData = [],
                data = {
                    'count': this.get('count') > 0 ? this.get('count') : 3,
                    'includeRts': this.get('includeRts') !== null ? this.get('includeRts') : true,
                    'searchKey': this.get('searchKey') === 'profile' ? Profile.get('twitter') : this.get('searchKey'),
                    'searchType': this.get('searchKey') === 'profile' ? 'username' : this.get('searchType')
                };

            // HC: when the profile twitter or searchKey is empty we use the defaultSearchKey
            // for retriving the tweets
            if ((this.get('searchKey') === 'profile' && (Profile.get('twitter') === null || Profile.get('twitter').length === 0)) || (this.get('searchKey') === null || this.get('searchKey').length === 0)) {
                data.searchKey = this.get('defaultSearchKey');
            }

            // get twitter feed
            $.ajax({
                url: url,
                type: "GET",
                data: data
            }).done(function (response, status) {
                if (status === 'success') {
                    // format data
                    $.each(response, function () {

                        // format created data
                        createdDate = this.created_at;
                        createdDate = createdDate.split(" ");

                        tweetData.push({
                            'screenName': this.user.screen_name,
                            'createdAt': createdDate[2] + '/' + createdDate[1] + '/' + createdDate[5],
                            'fullName': this.user.name,
                            'imageUrl': this.user.profile_image_url,
                            'source': this.source,
                            'text': this.text
                        });
                    });

                    that.set('tweets', tweetData, true);

                    // rerender widget
                    that.rerender();
                }
            }).fail(function () {
                that.set('tweets', [], true);

                that.el.find('.twitter').html('<p>No tweets found!</p>');

            });
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Twitter = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.TwitterProperties,
            methods: BaseKit.Widget.TwitterMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetTwitter = function (options) {
        this.each(function () {
            $(this).data('bkob', new BaseKit.Widget.Twitter(this, options));
        });
    };
}());(function ()
{
	BaseKit.Widget.EmbedProperties = {
	};

	BaseKit.Widget.EmbedMethods = {
		construct: function (el, options)
		{
			this.options = options;
			this.load();
		},

		load: function ()
		{
			var thisEl = $(this.el),
				code = this.get('code');
				
			if (typeof(code) !== 'undefined' && code !== null &&  code.length > 0)
			{
				thisEl.find('.embed-default').hide();
				thisEl.find('.content').show().writeCapture().html(code,
				{
					proxyGetElementById: true,
					writeOnGetElementById: true
				});
			}
			else
			{
				thisEl.find('.embed-default').show();
				thisEl.find('.content').hide();
			}
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Embed = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.EmbedProperties,
			methods: BaseKit.Widget.EmbedMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetEmbed = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Embed(el, options));
		});
	};
}());(function () {
    BaseKit.Widget.Contactform = null;

    BaseKit.Widget.ContactformProperties = {
        email: 'profile',
        text: App.t('widgets.contactform.default_button_text', 'Send'),
        formTitle: App.t('widgets.contactform.default_title', 'Contact Form')
    };

    BaseKit.Widget.ContactformMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        /**
         * attachEvents: attach the send email event
         */
        attachEvents: function () {
            var that = this,
                thisEl = $(this.el),
                url = '/site/' + App.session.get('siteRef') + '/submit-form',
                data = {};

            // override the submit event on the form
            thisEl.find('form').on('submit', function (e) {
                e.preventDefault();

                // set the form data
                data = {
                    'emailFrom': thisEl.find('.email').val(),
                    'message': thisEl.find('.message').val(),
                    'useProfile': that.get('email') === "profile" ? 1 : 0,
                    'widgetRef': that.get('ref'),
                    'formTitle': that.get('formTitle')
                };

                // submit the form using the api
                $.ajax({
                    url: url,
                    type: "POST",
                    data: data

                }).done(function (response, status, jqXHR) {
                    if (status === 'success' && that.get('goalUrl')) {
                        //redirect the window location
                        window.location = that.get('goalUrl');
                    }
                }).fail(function (response) {
                    // TODO: we need to handle published site errors @see Megan
                });
            });
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Contactform = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ContactformProperties,
            methods: BaseKit.Widget.ContactformMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetContactform = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Contactform(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Extendednavigation = null;

    BaseKit.Widget.ExtendednavigationProperties = {
        align: 'center',
        icons: []
    };

    BaseKit.Widget.ExtendednavigationMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Extendednavigation = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ExtendednavigationProperties,
            methods: BaseKit.Widget.ExtendednavigationMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetExtendednavigation = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Extendednavigation(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Responsiveslideshow = null;

    BaseKit.Widget.ResponsiveslideshowProperties = {
        aspect: 75,
        crop: 0,
        scale: 'zoom',
        duration: 3,
        transSpeed: 1000,
        transType: 'fade',
        showButtons: true,
        showBullets: true,
        allowPause: false,
        allowLoop: true,
        showTitle: 1,
        showDescription: 1
    };

    BaseKit.Widget.ResponsiveslideshowMethods = {
        construct: function (el, options) {
            this.load();
            this.paused = false;
            this.stopSlide = false;
        },

        load: function () {
            var editor = $('body').hasClass('edit'),
                albumArray = Server.plugins.assets.albums[this.get('albumRef')];

            if ((albumArray && (albumArray.length > 0)) || this.properties.changed.album) {
                this.attachEvents();
            }

            if (!editor) {
                this.startSlideShow(0);
            }
        },

        attachEvents: function () {
            var that = this,
                ref = $(this).data('ref'),
                thisEl = $(this.el),
                imageArray = Server.plugins.assets.albums[this.get('albumRef')];

            if (imageArray && imageArray.length === 1) {
                thisEl.find('.btn-play').hide();
                thisEl.find('.btn-prev').hide();
                thisEl.find('.btn-next').hide();
                return;
            }

            thisEl.find('.btn-play').on('click', function () {
                ref = $(this).data('ref');

                if ($(this).hasClass('pause')) {
                    that.pauseSlideShow();
                    return;
                }

                if ($(this).attr('disabled') === 'disabled') {
                    return;
                }

                that.playSlideShow(ref);
            });

            thisEl.find('.slide-ctrl').on('click', function () {
                ref = $(this).data('ref');

                that.handleSlideNavigation(ref);
            });
        },

        handleSlideNavigation: function (ref) {
            var that = this,
                duration = Math.round(this.get('duration') * 1000),
                timer;

            this.stopSlideShow();
            this.setSlide(ref);

            timer = setTimeout(function () {
                that.startSlideShow(ref);
            }, duration);

            $('.slide-ctrl').on('click', function () {
                clearTimeout(timer);
            });
        },

        startSlideShow: function (ref) {
            if ($('body').hasClass('edit')) {
                return;
            }

            this.stopSlide = false;
            this.setNextSlide(ref);
        },

        stopSlideShow: function () {
            var elAll = $(this.el).find('.slideshow-image-item');

            elAll.stop(true, true);
            this.stopSlide = true;
        },

        setSlide: function (ref) {
            var thisEl = $(this.el),
                currentSlide = thisEl.find('.slideshow-image-item.current'),
                newSlide = thisEl.find('.slideshow-image-item[data-ref="' + ref + '"]'),
                newImage = newSlide.find('.slideshow-image');

            currentSlide.removeClass('current');
            newSlide.addClass('current');
            thisEl.find('.slideshow-image-item').removeAttr('style');
            this.setSlideInfo(ref);
        },

        setSlideInfo: function (ref) {
            var el = $(this.el),
                imageArray = Server.plugins.assets.albums[this.get('albumRef')],
                lastImg = imageArray.length - 1,
                next = ref + 1,
                prev = ref - 1;

            if (next === imageArray.length) {
                next = 0;
            }

            if (ref === 0) {
                prev = lastImg;
            }

            el.find('.dot').removeClass('selected');
            el.find('.dot[data-ref=' + ref + ']').addClass('selected');
            el.find('.btn-prev').data('ref', prev);
            el.find('.btn-next').data('ref', next);
            el.find('.btn-play').data('ref', ref);

            if ((prev === lastImg) && !this.get('allowLoop')) {
                el.find('.btn-prev').addClass('disabled').attr('disabled', true);
            } else {
                el.find('.btn-prev').removeClass('disabled').removeAttr('disabled');
            }

            if ((next === 0) && !this.get('allowLoop')) {
                el.find('.btn-next').addClass('disabled').attr('disabled', true);
            } else {
                el.find('.btn-next').removeClass('disabled').removeAttr('disabled');
            }
        },

        playSlideShow: function (ref) {
            $(this.el).find('.btn-play').addClass('pause');
            this.stopSlide = false;
            this.paused = false;

            this.setNextSlide(ref);
        },

        pauseSlideShow: function () {
            $(this.el).find('.btn-play').removeClass('pause');
            this.stopSlide = true;
            this.paused = true;
        },

        setNextSlide: function (currentSlide) {
            var that = this,
                duration = this.get('duration') * 1000,
                imageArray = Server.plugins.assets.albums[this.get('albumRef')],
                lastImg = imageArray.length - 1,
                t = null;

            if (this.stopSlide || this.paused || (currentSlide === lastImg && (!this.get('allowLoop')))) {
                return;
            }

            t = setTimeout(function () {
                clearTimeout(t);
                that.animate(currentSlide);
            }, duration);
        },

        animate: function (slideFromRef, slideToRef) {
            var that = this,
                thisEl = $(this.el),
                timing = parseInt(this.get('transSpeed'), 10),
                elEffect = this.get('transType'),
                elOut,
                elIn,
                t,
                elInImg,
                next = slideFromRef + 1,
                imageArray = Server.plugins.assets.albums[this.get('albumRef')];

            if (this.stopSlide || this.paused) {
                return;
            }

            // HC: the last image
            if (next === imageArray.length) {
                next = 0;
            }

            slideToRef = slideToRef || next;

            elOut   = thisEl.find('.slideshow-image-item[data-ref=' + slideFromRef + ']');
            elIn    = thisEl.find('.slideshow-image-item[data-ref=' + slideToRef + ']');
            elInImg = $(elIn).find('.slideshow-image');

            function callbackOut() {
                that.setSlideInfo(slideToRef);
            }

            function callbackIn() {
                that.setNextSlide(slideToRef);
            }

            switch (elEffect) {
            case 'fade':
                timing = timing / 2;
                elOut.fadeOut(timing, callbackOut);

                t = setTimeout(function () {
                    clearTimeout(t);
                    elIn.fadeIn(timing, callbackIn);
                }, timing);

                t = setTimeout(function () {
                    clearTimeout(t);
                    elOut.removeClass('current');
                    elIn.addClass('current');
                }, timing * 2);
                break;

            case 'dissolve':
                callbackOut();
                elOut.fadeOut(timing);
                elIn.fadeIn(timing, callbackIn);
                t = setTimeout(function () {
                    clearTimeout(t);
                    elOut.removeClass('current');
                    elIn.addClass('current');
                }, timing);
                break;

            default:

                callbackOut();
                elOut.removeClass('current');
                elIn.addClass('current');
                callbackIn();
                break;
            }
        }
    };

    // Base Widget Functionality - What ever is required 
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Responsiveslideshow = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ResponsiveslideshowProperties,
            methods: BaseKit.Widget.ResponsiveslideshowMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    $.fn.basekitWidgetResponsiveslideshow = function (options) {
        this.each(function (index, el) {
            $(el).data('bkob', new BaseKit.Widget.Responsiveslideshow(el, options));
        });
    };
}());
