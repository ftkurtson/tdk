(function ()
{
	BaseKit.Widget.Socialicons = {};

	BaseKit.Widget.SocialiconsProperties = {
		'googleplus': 'profile',
		'linkedin':   'profile',
		'facebook':   'profile',
		'twitter':    'profile',
		'youtube':    'profile',
		'rss':        'profile'
	};

	BaseKit.Widget.SocialiconsMethods = {
		construct: function (el, options)
		{
			this.options = options;
			this.load();
		},
		load: function ()
		{
			// do something if the widget needs to be loaded
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Socialicons = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.SocialiconsProperties,
			methods: BaseKit.Widget.SocialiconsMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetSocialicons = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Socialicons(el, options));
		});
	};
}());