(function ()
{
	BaseKit.Widget.Gallery = null;
	
	BaseKit.Widget.GalleryProperties = {
		widgetType:'widget.gallery',
		imageScale: 'original',
		showTitle: 1,
		showDescription: 1
	};

	BaseKit.Widget.GalleryMethods = {
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
	BaseKit.Widget.Gallery = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.GalleryProperties,
			methods: BaseKit.Widget.GalleryMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetGallery = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Gallery(el, options));
		});
	};
}());