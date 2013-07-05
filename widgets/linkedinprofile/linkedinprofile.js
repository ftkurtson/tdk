(function ()
{
	BaseKit.Widget.Linkedinprofile = {};

	BaseKit.Widget.LinkedinprofileProperties = {
	};

	BaseKit.Widget.LinkedinprofileMethods = {
		construct: function (el, options)
		{
			this.options = options;

			// check to see if we have already l;oaded the linkinin API
			if (Site.Page.Globals.linkinInAPILoaded === undefined || 
				Site.Page.Globals.linkinInAPILoaded === null)
			{
				Site.Page.Globals.linkinInAPILoaded = false;
			}

			this.load();
		},

		load: function ()
		{
			var that = this;

			// This dynamically injects the linkedin script into the body
			if (Site.Page.Globals.linkinInAPILoaded === false && $('#linkinedin-widget-script').length === 0)
			{
				$.getScript("http://platform.linkedin.com/in.js?suppressWarnings=true", function() 
				{
					$(this).attr('id', 'linkinedin-widget-script');
					Site.Page.Globals.linkinInAPILoaded = true;
				});
			}
			else
			{
				// this is needed to force the LinkedIn code to reparse any new profile url's
				if (IN && typeof IN.parse === 'function')
				{
					IN.parse();
				}
			}
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Linkedinprofile = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.LinkedinprofileProperties,
			methods: BaseKit.Widget.LinkedinprofileMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetLinkedinprofile = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Linkedinprofile(el, options));
		});
	};
}());