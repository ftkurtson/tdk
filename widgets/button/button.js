(function ()
{
	BaseKit.Widget.ButtonProperties = {
		iconPosition: 'left',
		iconColor: 'black',
		icon: '',
		action: 'none',
		text: App.t('widgets.button.default_text', 'Button'),
		url: '',
		target: 'New'
	};

	BaseKit.Widget.ButtonMethods = {
		construct: function (el, options)
		{
			this.options = options;
			this.load();
		},

		load: function ()
		{
			//do something if the widget needs to be loaded!
			this.attachEvents();
		},

		// attachEvents: attach the click event to the button
		attachEvents: function ()
		{
			var that = this,
				url = null,
				action = null,
				target = null;

			$(this.el).find('button').on('click', function(e)
			{
				//get the button date
				action = that.get('action');
				url = that.get('url');
				target = that.get('target');

				// check if the buton has a button link
				if (action !== 'none' && action !== null)
				{
					//open in the same window
					if ( target !== '_blank')
					{
						window.location = url;
					}
					else
					{
						window.open(url);
					}
				}
			});
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Button = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.ButtonProperties,
			methods: BaseKit.Widget.ButtonMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetButton = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Button(el, options));
		});
	};
}());
