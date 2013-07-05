function mapReady()
{
	Site.Page.Globals.mapsAPILoaded = true;
}

(function ()
{
	BaseKit.Widget.Map = {};

	BaseKit.Widget.MapProperties = {
		zoom:     12,
		height:   150, // MB: default height
		address:  'profile',
		latitude: '51.50959718054336',
		longitude:'-0.12668609619140625' // HC: in case the profile is empty
	};

	BaseKit.Widget.MapMethods = {
		construct: function (el, options)
		{
			// stores the current map
			this.gmap = null;

			// stores the main marker
			this.marker = null;

			// set the global google map property for checking to see if the
			// map api has been loaded
			if (Site.Page.Globals.mapsAPILoaded === undefined ||
				Site.Page.Globals.mapsAPILoaded === null)
			{
				Site.Page.Globals.mapsAPILoaded = false;
			}

			this.load();
		},

		load: function ()
		{
			// if no maps have yet been loaded, then try to load one
			if (Site.Page.Globals.mapsAPILoaded === false &&
				$('#gmaps-widget-script').length === 0)
			{
				// This dynamically injects the googlemaps into the body
				var script	=	document.createElement("script");
				script.type	=	"text/javascript";
				script.id	=	"gmaps-widget-script";
				script.src	=	"http://maps.google.com/maps/api/js?sensor=false&callback=mapReady&language="+App.session.get('languageCode');

				// append to the body
				document.body.appendChild(script);
			}

			// do checking to see if any maps are loaded yet
			this.isMapReady();
		},

		isMapReady: function ()
		{
			var that = this;

			if(Site.Page.Globals.mapsAPILoaded === false)
			{
				setTimeout(function()
				{
					that.isMapReady();
				}, 100);
			}
			else
			{
				this.setupMap();
			}
		},

		setupMap: function ()
		{
			// map options
			var mapOptions = {
				draggable: false,
				zoom: parseInt(this.get('zoom'),10),
				center: new google.maps.LatLng( parseFloat(this.get('latitude'),10),
												parseFloat(this.get('longitude'),10)),
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

			if(this.get('address') === 'profile' && Profile.get('postalcode').length > 0)
			{
				this.findAddress({source: 'profile', value: Profile.get('postalcode')}, this.postFindAddress, this);
			}
			else
			{
				// reset the map display with all the other options
				this.resetMap();
			}
		},

		/**
		 * Centres the map on the new coordinates
		 */
		resetMap: function()
		{
			var newCenter = null;

			// make sure the maps has been loaded
			if (this.gmap !== null && Site.Page.Globals.mapsAPILoaded === true)
			{
				$(this.el).find('.map').height(this.get('height'));

				// NOTE: Google Maps is fussy - needs parseFloat calls!
				newCenter = new google.maps.LatLng( parseFloat(this.get('latitude'), 10),
													parseFloat(this.get('longitude'),10));

				// reset the map
				this.gmap.setZoom(parseInt(this.get('zoom'),10));
				this.gmap.setCenter(newCenter);

				// create  an new map marker at this point
				this.createMapMarker( parseFloat(this.get('latitude'), 10),
									  parseFloat(this.get('longitude'),10));
			}
		},

		/**
		* createMapMarker: creates a marker on the map at the passed co-ordinates
		* @param <integer> latitude - the latitude to position the marker
		* @param <integer> longitude - the longitude to position the marker
		*/
		createMapMarker: function(latitude, longitude)
		{
			var that = this,
				marker = null,
				icon = new google.maps.MarkerImage('//' + App.session.get('assetSubdomain') + '.' + App.session.get('domain')  + '/apps/images/mobile/map-marker.png',
										new google.maps.Size(32, 32), null,
										new google.maps.Point(16, 32),
										new google.maps.Size(32, 32)
				);

			// add the marker if one is not yet defined
			if (this.marker === null)
			{
				// create a new marker
				this.marker = new google.maps.Marker(
				{
					icon: icon,
					bouncy: true,
					draggable: true,
					autoPan: true,
					position: new google.maps.LatLng(latitude, longitude)
				});

				// assign it to the current map
				this.marker.setMap(this.gmap);
			}
			// only update the position if we already have a marker
			else
			{
				// remove it from the current map and update the pos
				this.marker.setMap(null);
				this.marker.setPosition( new google.maps.LatLng(latitude, longitude) );

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
		findAddress: function(address, callback, scope)
		{
			if (typeof (address) === "undefined" || typeof (address) !== "object")
			{
				throw new Error('findAddress param address error');
			}
			if (typeof (callback) === "undefined" || typeof (callback) !== "function")
			{
				throw new Error('findAddress param callback error');
			}
			if (typeof (scope) === "undefined" || typeof (scope) !== "object")
			{
				throw new Error('findAddress scope callback error');
			}

			var that = this,
				geoOptions = {
					'address': null,
					'region': "ISO 3166-1"
				},
				results = {};

			if (!this.geocoder)
			{
				this.geocoder = new google.maps.Geocoder();
			}

			geoOptions.address = address.value || '';

			this.geocoder.geocode(geoOptions, function(result, status)
			{
				if (status === google.maps.GeocoderStatus.OK && result.length)
				{
					results = {
						latitude: result[0].geometry.location.lat(),
						longitude: result[0].geometry.location.lng()
					};
				}
				else
				{
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
		postFindAddress: function (results)
		{
			if (typeof (results) === "undefined" || typeof (results) !== "object")
			{
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
	BaseKit.Widget.Map = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.MapProperties,
			methods: BaseKit.Widget.MapMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetMap = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Map(el, options));
		});
	};
}());
