(function ()
{
	BaseKit.Widget.Twitter = null;

	BaseKit.Widget.TwitterProperties = {
		count: '3',
		refreshTime: '1800000',
		includeRts: 0,
		searchKey: 'profile',
		searchType: 'username',
		defaultSearchKey: 'basekit' // HC: for the empty input
	};

	BaseKit.Widget.TwitterMethods = {
		construct: function (el, options)
		{
			this.refreshInterval = '';
			this.load();
		},

		load: function ()
		{
			this.refreshTimeline();
			this.getUpdateTwitterFeed();
		},

		/**
		 * refreshTimeline: set the interval for refreshing the timeline twitter feed
		 */
		refreshTimeline: function ()
		{
			var that = this,
				// Default to every 30 mins
				refreshTime = (this.get('refreshTime') > 0 ? parseInt(this.get('refreshTime'), 10) : 1800000);

			// clean the interval
			if (this.refreshInterval !== '')
			{
				window.clearInterval(this.refreshInterval);
				this.refreshInterval = '';
			}

			this.refreshInterval = window.setInterval(function ()
			{
				try
				{
					//api get new data
					that.getUpdateTwitterFeed();
				}
				catch (err)
				{
					clearInterval(that.refreshInterval);

					//throw error
					console.log(err);
				}
			}, refreshTime);
		},

		/**
		* getUpdateTwitterFeed: an api call for getting the tweets and format the data to rerender the widget
		*/
		getUpdateTwitterFeed: function ()
		{
			var that = this,
				url = '/site/' + App.session.get('siteRef') + '/fetch-feed',
				createdDate = null,
				tweetData = [],
				data = {
					'count':      this.get('count') > 0 ? this.get('count') : 3,
					'includeRts': this.get('includeRts') !== null ? this.get('includeRts') : true,
					'searchKey' : this.get('searchKey') === 'profile' ? Profile.get('twitter') : this.get('searchKey'),
					'searchType': this.get('searchKey') === 'profile' ? 'username' : this.get('searchType')
				};

			// HC: when the profile twitter or searchKey is empty we use the defaultSearchKey
			// for retriving the tweets
			if ( (this.get('searchKey') === 'profile' && (Profile.get('twitter') === null || Profile.get('twitter').length === 0))
				|| (this.get('searchKey') === null || this.get('searchKey').length === 0))
			{
				data.searchKey = this.get('defaultSearchKey');
			}

			// get twitter feed
			$.ajax(
			{
				url: url,
				type: "GET",
				data: data
			})
			.done(function (response, status, jqXHR)
			{
				if (status === 'success')
				{
					// format data
					$.each(response, function (index, el)
					{
						// format created data
						createdDate = el.created_at;
						createdDate = createdDate.split(" ");

						tweetData.push({
							'screenName' : el.user.screen_name,
							'createdAt' :  createdDate[2] + '/' + createdDate[1] + '/' + createdDate[5],
							'fullName' :   el.user.name,
							'imageUrl' :   el.user.profile_image_url,
							'source' :     el.source,
							'text' :       el.text
						});
					});

					that.set('tweets', tweetData, true);

					// rerender widget
					that.rerender();
				}
			})
			.fail(function (response)
			{
				that.set('tweets', [], true);

				that.el.find('.twitter').html('<p>No tweets found!</p>');

			});
		}
	};

	// Base Widget Functionality - What ever is required
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Twitter = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.TwitterProperties,
			methods: BaseKit.Widget.TwitterMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	$.fn.basekitWidgetTwitter = function (options)
	{
		this.each(function (index, el)
		{
			$(el).data('bkob', new BaseKit.Widget.Twitter(el, options));
		});
	};
}());