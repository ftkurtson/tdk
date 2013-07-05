(function ()
{
	BaseKit.Widget.Space = {};

	BaseKit.Widget.SpaceProperties = {
		height: '50'
	};

	BaseKit.Widget.SpaceMethods = {
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
	BaseKit.Widget.Space = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.SpaceProperties,
			methods: BaseKit.Widget.SpaceMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetSpace = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Space(el, options));
		});
	};
}());