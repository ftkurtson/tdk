(function ()
{
	BaseKit.Widget.Clicktocall = null;

	BaseKit.Widget.ClicktocallProperties = {
		phone: 'profile',
		phoneText: App.t('widgets.clicktocall.default_text', '01234 567 890')
	};

	BaseKit.Widget.ClicktocallMethods = {
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
	BaseKit.Widget.Clicktocall = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.ClicktocallProperties,
			methods: BaseKit.Widget.ClicktocallMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetClicktocall = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Clicktocall(el, options));
		});
	};
}());
