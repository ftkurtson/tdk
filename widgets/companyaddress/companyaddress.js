(function ()
{
	BaseKit.Widget.CompanyaddressProperties = {
	};

	BaseKit.Widget.CompanyaddressMethods = {
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
	BaseKit.Widget.Companyaddress = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.CompanyaddressProperties,
			methods: BaseKit.Widget.CompanyaddressMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetCompanyaddress = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Companyaddress(el, options));
		});
	};
}());