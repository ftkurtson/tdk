(function ()
{
	BaseKit.Widget.Line = null;

	BaseKit.Widget.LineProperties = {
		thickness:'inherit',
		padding:'inherit',
		length:'inherit',
		align:''
	};

	BaseKit.Widget.LineMethods = {
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
	BaseKit.Widget.Line = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.LineProperties,
			methods: BaseKit.Widget.LineMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetLine = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Line(el, options));
		});
	};
}());