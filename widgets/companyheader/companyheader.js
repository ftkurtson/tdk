(function ()
{
	BaseKit.Widget.CompanyheaderProperties = {
	};

	BaseKit.Widget.CompanyheaderMethods = {
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
	BaseKit.Widget.Companyheader = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.CompanyheaderProperties,
			methods: BaseKit.Widget.CompanyheaderMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetCompanyheader = function (options)
	{
		this.each(function (index, el)
		{
			var obj = null;
			obj = new BaseKit.Widget.Companyheader(el, options);
			$(el).data('bkob', obj);
		});
	};
}());