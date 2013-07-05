(function ()
{
	BaseKit.Widget.Navigation = null;

	BaseKit.Widget.NavigationProperties = {
		align: 'center',
		icons: []
	};

	BaseKit.Widget.NavigationMethods = {
		construct: function (el, options)
		{
			this.load();
		},

		load: function ()
		{
			//do something if the widget needs to be loaded!
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Navigation = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.NavigationProperties,
			methods: BaseKit.Widget.NavigationMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetNavigation = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Navigation(el, options));
		});
	};
}());