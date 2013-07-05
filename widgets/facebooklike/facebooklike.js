(function ()
{
	BaseKit.Widget.Facebooklike = null;

	BaseKit.Widget.FacebooklikeProperties = {
		showFaces:'true',
		action:'like',
		colorscheme:'light',
		layout:'standard',
		height:'80',
		font:'arial',
		locale: 'en_US',
		thisUrl:'www.basekit.com' // RH: Needs to be this site domain
	};

	BaseKit.Widget.FacebooklikeMethods = {
		construct: function (el, options)
		{
			this.options = options;	
			
			this.load();
		},

		load: function ()
		{
			//do something if the widget needs to be loaded!
			this.attachEvents();
		},

		// attachEvents: attach the click event to the button
		attachEvents: function ()
		{
			var that = this;
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Facebooklike = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.FacebooklikeProperties,
			methods: BaseKit.Widget.FacebooklikeMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetFacebooklike = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Facebooklike(el, options));
		});
	};
}());