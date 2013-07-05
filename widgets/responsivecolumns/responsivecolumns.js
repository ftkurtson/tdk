(function ()
{
	BaseKit.Widget.Responsivecolumns = null;

	BaseKit.Widget.ResponsivecolumnsProperties = {
		selectable: 0,
		isEmpty: 1
	};

	BaseKit.Widget.ResponsivecolumnsMethods = {
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
	BaseKit.Widget.Responsivecolumns = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.ResponsivecolumnsProperties,
			methods: BaseKit.Widget.ResponsivecolumnsMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetResponsivecolumns = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Responsivecolumns(el, options));
		});
	};
}());