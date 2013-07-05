(function ()
{
	BaseKit.Widget.Feature = null;

	BaseKit.Widget.FeatureProperties = {
		bgImg: '',
		header: App.t('widgets.feature.header_default','My great company'),
		strapline:  App.t('widgets.feature.strapline_default','My strap line goes here'),
		url: '',
		action: 'none',
		icon: '',
		buttonText: App.t('widgets.feature.button_text','button text'),
		iconPosition: 'left',
		iconColor: 'black',
		target: 'New',
		zoom: '1',
		focalData: {}

	};

	BaseKit.Widget.FeatureMethods = {
		construct: function (el, options)
		{
			this.load();
		},

		load: function ()
		{
			//do something if the widget needs to be loaded!
			this.attachEvents();
		},

		// attachEvents: attach the click event to the button and re-align background
		attachEvents: function ()
		{
			var that = this,
				url = null,
				action = null,
				target = null,
				data = this.get('focalData');

			$(this.el).find('button').on('click', function(e)
			{
				//get the button date
				action = that.get('action');
				url = that.get('url');
				target = that.get('target');

				// check if the buton has a button link
				if (action !== 'none' && action !== null)
				{
					//open in the same window
					if ( target !== '_blank')
					{
						window.location = url;
					}
					else
					{
						window.open(url);
					}
				}
			});

			//check there is a background image before trying to realign it
			if (this.get('bgImg') !== '' && $('html').find('body.edit').length === 0)
			{	
				this.alignBackground(data);	

				$(window).resize(that.debouncer(function (e) 
				{
					that.alignBackground(data);
				}));
			}
		},

		//set up realignment on resize, but only fire once after resize is done
		debouncer: function(func) 
		{	
			var timeoutID = null, 
				timeout = 200;
			
			return function () 
			{
				var scope = this, 
					args = arguments;
				
				clearTimeout(timeoutID);
				timeoutID = setTimeout(function () 
				{
					func.apply(scope, Array.prototype.slice.call(args));
				}, timeout);
			};
		},

		alignBackground: function(data)
		{
			var thisEl       = $(this.el),
				bgImg        = thisEl.find('.bgimage'),
				elZoom       = this.get('zoom'),
				clientWidth  = thisEl.width(),
				clientHeight = thisEl.height(),
				elCenterX    = parseInt(clientWidth/ 2, 10),
				elCenterY    = parseInt(clientHeight / 2, 10),
				xPoint       = null,
				yPoint       = null,	
				rPoint       = null,
				bPoint       = null;


				//if the width of the image divided by zoom is smaller than the window size, set it to 100%
				if ((data.imgWidth * elZoom) < clientWidth)
				{
					elZoom = Math.ceil((clientWidth / data.imgWidth) * 100) / 100;
				} 

				if ((data.imgHeight * elZoom) < clientHeight)
				{
					elZoom = Math.ceil((clientHeight / data.imgHeight) * 100) / 100;
				}

			xPoint = parseInt((data.focusX * elZoom) - elCenterX, 10);
			yPoint = parseInt((data.focusY * elZoom) - elCenterY, 10);		
			rPoint = parseInt((data.imgWidth * elZoom) - clientWidth, 10);
			bPoint = parseInt((data.imgHeight * elZoom) - clientHeight, 10);		

			// if the X focus point, minus the indow offset is less than 0, align left. If more than the width of the image align right
			// when the ifrema is larger or equals to the image, rPoint will be minus or 0 
			if (xPoint < 0 || rPoint <= 0)
			{
				xPoint = 0;
			} 
			else if (xPoint > rPoint && rPoint > 0)
			{
				xPoint = rPoint;
			}	
			
			// if the Y focus point, minus the indow offset is less than 0, align top. If more than the height of the image align bottom
			if (yPoint < 0)
			{
				yPoint = 0;
			} 
			else if (yPoint > bPoint)
			{
				yPoint = bPoint;
			}

			data.focusXset = xPoint;
			data.focusYset = yPoint;	
				
			//set the proper alignment inline
			bgImg.css(
			{ 
				'margin-left':       '-' + xPoint + 'px', 
				'margin-top':        '-' + yPoint + 'px', 
				'-moz-transform':    'scale(' + elZoom + ')',
				'-webkit-transform': 'scale(' + elZoom + ')',
				'-ms-transform':     'scale(' + elZoom + ')',
				'-o-transform':      'scale(' + elZoom + ')'
			});

			return data;
		}	
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Feature = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.FeatureProperties,
			methods: BaseKit.Widget.FeatureMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetFeature = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Feature(el, options));
		});
	};
}());