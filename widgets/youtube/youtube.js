(function ()
{
	BaseKit.Widget.Youtube = {};

	BaseKit.Widget.YoutubeProperties = {
		userInput: '',  // Stores what the user enters
		videoId: '' // Stores the video id extracted from the user input
	};

	BaseKit.Widget.YoutubeMethods = {
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
	BaseKit.Widget.Youtube = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.YoutubeProperties,
			methods: BaseKit.Widget.YoutubeMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetYoutube = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Youtube(el, options));
		});
	};
}());