(function ()
{
	BaseKit.Widget.Linkedincompanyprofile = {};

	BaseKit.Widget.LinkedincompanyprofileProperties = {
		'linkedinID' : '',
		'source' : 'companyName'
	};

	BaseKit.Widget.LinkedincompanyprofileMethods = {
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
			if (Site.Page.Globals.linkinInAPILoaded === false && $('#linkedin-script').length === 0)
			{
				$.getScript("http://platform.linkedin.com/in.js", function() 
				{
					$(this).attr('id', 'linkedin-script');
					Site.Page.Globals.linkinInAPILoaded = true;
				});
			}
			else
			{
				// this is needed to force the LinkedIn code to reparse any new widgets
				if (IN && typeof IN.parse === 'function')
				{
					IN.parse();
				}
			}
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Linkedincompanyprofile = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.LinkedincompanyprofileProperties,
			methods: BaseKit.Widget.LinkedincompanyprofileMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetLinkedincompanyprofile = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Linkedincompanyprofile(el, options));
		});
	};
}());