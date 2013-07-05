(function ()
{
	BaseKit.Widget.Tweet = null;
	
	BaseKit.Widget.TweetProperties = {
		linkText: App.t('widgets.tweet.default_link_text', 'Tweet'),
		tweetText: '',
		url: 'http://www.basekit.com'
	};

	BaseKit.Widget.TweetMethods = {
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
		
		attachEvents: function ()
		{
			
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Tweet = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.TweetProperties,
			methods: BaseKit.Widget.TweetMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetTweet = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Tweet(el, options));
		});
	};
}());
