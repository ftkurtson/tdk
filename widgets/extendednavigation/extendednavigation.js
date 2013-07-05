(function ()
{
	BaseKit.Widget.Extendednavigation = null;

	BaseKit.Widget.ExtendednavigationProperties = {
		align: 'center',
		icons: []
	};

	BaseKit.Widget.ExtendednavigationMethods = {
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
	BaseKit.Widget.Extendednavigation = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.ExtendednavigationProperties,
			methods: BaseKit.Widget.ExtendednavigationMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetExtendednavigation = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Extendednavigation(el, options));
		});
	};
}());