(function ()
{
	BaseKit.Widget.Contactform = null;
	
	BaseKit.Widget.ContactformProperties = {
		email: 'profile',
		text: App.t('widgets.contactform.default_button_text', 'Send'),
		formTitle: App.t('widgets.contactform.default_title', 'Contact Form')
	};

	BaseKit.Widget.ContactformMethods = {
		construct: function (el, options)
		{
			this.load();
		},

		load: function ()
		{
			//do something if the widget needs to be loaded!
			this.attachEvents();
		},

		/**
		 * attachEvents: attach the send email event
		 */
		attachEvents: function ()
		{
			var that = this,
				thisEl = $(this.el),
				url = '/site/' + App.session.get('siteRef') + '/submit-form',
				data = {};

			// override the submit event on the form
			thisEl.find('form').on('submit', function (e)
			{
				e.preventDefault();

				// set the form data
				data = {
					'emailFrom'  : thisEl.find('.email').val(),
					'message'    : thisEl.find('.message').val(),
					'useProfile' : that.get('email') === "profile" ? 1 : 0,
					'widgetRef'  : that.get('ref'),
					'formTitle'  : that.get('formTitle')
				};

				// submit the form using the api
				$.ajax(
				{
					url: url,
					type: "POST",
					data: data

				})
				.done(function (response, status, jqXHR)
				{
					if (status === 'success' && that.get('goalUrl'))
					{
						//redirect the window location
						window.location = that.get('goalUrl');
					}
				})
				.fail(function (response)
				{
					// TODO: we need to handle published site errors @see Megan
				});
			});
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Contactform = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.ContactformProperties,
			methods: BaseKit.Widget.ContactformMethods 
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetContactform = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Contactform(el, options));
		});
	};
}());
