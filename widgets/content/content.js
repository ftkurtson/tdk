(function ()
{
	BaseKit.Widget.Content = null;

	BaseKit.Widget.ContentProperties = {
		lines: 'all',
		content: ''
	};

	BaseKit.Widget.ContentMethods = {
		construct: function (el, options)
		{
			this.load();
		},

		load: function ()
		{
			//do something if the widget needs to be loaded!
			if (this.get('ref') !== null)
			{
				this.showLines(this.get('lines'));
			}
		},

		/**
		*showLines: show content according to the lines set and attach expand event
		*@param <string> lines - this is a content widget property, determining how many lines to show
		*/
		showLines: function (lines)
		{
			if (typeof lines !== "undefined")
			{
				var contentEl = $(this.el).find('.bk-content-text'),
					contentElHeight = null,
					newheight = null;

				contentEl.height('100%');
				contentElHeight = contentEl.height();

				switch (lines)
				{
				case 'one':
					newheight = contentElHeight * 25 / 100;
					this.expandText(newheight, contentElHeight);
					break;
				case 'two':
					newheight = contentElHeight * 50 / 100;
					this.expandText(newheight, contentElHeight);
					break;
				case 'all':
					break;
				}

				contentEl.height(newheight);
				contentEl.css('overflow', 'hidden');
			}
		},

		/**
		* expandText: expend the content
		* @param <string> newheight - the line height to be displayed
		* @param <string> fullheight - the whole height of the paragraph
		*/
		expandText: function (newheight, fullheight)
		{
			if (typeof newheight !== "undefined" &&  typeof fullheight !== "undefined")
			{
				var thisEl = $(this.el),
					expandSpan = thisEl.find('span.expand'),
					contentTextEl = thisEl.find('div.bk-content-text'),
					h = null;

				// MB: animate the text div to slide up and down
				expandSpan.bind('click', function ()
				{
					if (contentTextEl.height() === parseInt(fullheight, 10))
					{
						thisEl.find('.more').show();
						thisEl.find('.less').hide();
						h = newheight;
					}
					else
					{
						thisEl.find('.more').hide();
						thisEl.find('.less').show();
						h = fullheight;
					}

					// HC: slide up and down smoothly
					contentTextEl.stop().animate(
					{
						'height': h
					}, 500);
				});
			}
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Content = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.ContentProperties,
			methods: BaseKit.Widget.ContentMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetContent = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Content(el, options));
		});
	};
}());
