(function ()
{
	BaseKit.Widget.Image = null;
	
	BaseKit.Widget.ImageProperties = {
		description:'',
		url:'none',
		target:'none',
		action:'none',
		scale:'original',
		imageWidth: 'auto',
		alt:'',
		title:'',
		widgetType:'widget.image'
	};

	BaseKit.Widget.ImageMethods = {
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
	BaseKit.Widget.Image = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.ImageProperties,
			methods: BaseKit.Widget.ImageMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetImage = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Image(el, options));
		});
	};
}());