(function ()
{
	BaseKit.Widget.Redirecttodesktop = null;

	BaseKit.Widget.RedirecttodesktopProperties = {
		text: App.t('widgets.redirecttodesktop.default_text', 'Switch to desktop'),
		url: ''
	};

	BaseKit.Widget.RedirecttodesktopMethods = {
		construct: function (el, options)
		{
			this.options = options;
			this.load();
		},

		load: function ()
		{
			//do something if the widget needs to be loaded!
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Redirecttodesktop = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.RedirecttodesktopProperties,
			methods: BaseKit.Widget.RedirecttodesktopMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetRedirecttodesktop = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Redirecttodesktop(el, options));
		});
	};
}());
