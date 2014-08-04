(function () {
    BaseKit.Widget.BlogpostProperties = {};

    BaseKit.Widget.BlogpostMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            if (Server.app.mode === 'published') {
                this.attachPopupEvents();
            }
        },

        attachPopupEvents: function () {
            var thisEl = bk$(this.el),
                specs = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600',
                currentUrl = encodeURIComponent(window.location.href),
                blogSummary = Server.plugins.blog && Server.plugins.blog.posts ? Server.plugins.blog.posts[0].summary : '';

            thisEl.find('button.facebook').on('click', function () {
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + currentUrl, '', specs);
            });

            thisEl.find('button.twitter').on('click', function () {
                window.open('https://twitter.com/share?text=' + blogSummary + '&url=' + currentUrl, '', specs);
            });

            thisEl.find('button.googleplus').on('click', function () {
                window.open('https://plus.google.com/share?url=' + currentUrl, '', specs);
            });
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Blogpost = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.BlogpostProperties,
            methods: BaseKit.Widget.BlogpostMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetBlogpost = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Blogpost(el, options));
        });
    };
}());(function () {

    BaseKit.Widget.Blogpostlist = null;

    BaseKit.Widget.BlogpostlistProperties = {
        postDisplayType: 'summary'
    };

    BaseKit.Widget.BlogpostlistMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Blogpostlist = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.BlogpostlistProperties,
            methods: BaseKit.Widget.BlogpostlistMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetBlogpostlist = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Blogpostlist(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Blogsearch = {};

    BaseKit.Widget.BlogsearchProperties = {};

    BaseKit.Widget.BlogsearchMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            this.attachEvents();
        },

        attachEvents: function () {
            var that = this;

            bk$(this.el).find('.blog-search-form').on('submit', function (evt) {
                that.submitSearch(evt);
            });
        },

        submitSearch: function (evt) {
            var value = bk$(this.el).find('.blog-search-input').val();

            evt.preventDefault();

            if (!value.length) {
                return;
            }

            window.location.href = Server.plugins.blog.searchUrl + encodeURIComponent(value);
        }
    };

    BaseKit.Widget.Blogsearch = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.BlogsearchProperties,
            methods: BaseKit.Widget.BlogsearchMethods
        });
    };

    bk$.fn.basekitWidgetBlogsearch = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Blogsearch(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.ButtonProperties = {
        iconPosition: 'left',
        iconColor: 'black',
        icon: '',
        action: 'none',
        text: App.t('widgets.button.default_text', 'Button'),
        url: '',
        target: 'New',
        align: ''
    };

    BaseKit.Widget.ButtonMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        // attachEvents: attach the click event to the button
        attachEvents: function () {
            var that = this,
                url = null,
                action = null,
                target = null;

            bk$(this.el).find('button').on('click', function (e) {
                //get the button date
                action = that.get('action');
                url = that.get('url');
                target = that.get('target');

                if (window.Server.page.facebookPublish && action === 'internal') {
                    target = '_blank';
                    console.log(window.Server.page.facebookPublish);
                    url = window.Server.page.facebookPublish.urlPrefix + url;
                }

                // check if the buton has a button link
                if (action !== 'none' && action !== null) {
                    //open in the same window
                    if (target !== '_blank') {
                        window.location = url;
                    } else {
                        window.open(url);
                    }
                }
            });
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Button = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ButtonProperties,
            methods: BaseKit.Widget.ButtonMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetButton = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Button(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.BuynowProperties = {
        'showNames': 0,
        'buttonText': ''
    };

    BaseKit.Widget.BuynowMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
            this.loadPaymentAndPackage();
        },

        loadPaymentAndPackage: function () {
            var that = this,
                t = null;

            t = setTimeout(function () {
                clearTimeout(t);
                that.loadPackageInfo();
                that.loadBrandPaymentMethods();
            }, 200);
        },

        /**
         * attachEvents: the function will be called when render finished
         */
        attachEvents: function () {
            this.toggleShowHidePassword();
            this.buttonClickEvent();
            this.inputEvents();
            this.checkFieldsForSubmit();
            this.selectPaymentPeriodEvent();
        },

        inputEvents: function () {
            var that = this;

            this.el.find('input').off('keyup').on('keyup', function () {
                that.checkFieldsForSubmit();
                that.clearErrorMessages();
            });
        },

        checkFieldsForSubmit: function () {
            var empty = false,
                thisEl = this.el;

            // HC: disable the submit buttom if any of the fields is empty
            thisEl.find('input').each(function () {
                if (bk$(this).val().length === 0) {
                    empty = true;
                }
            });

            if (empty) {
                thisEl.find('.widget-buynow-make-payment').attr('disabled', 'disabled');
            } else {
                thisEl.find('.widget-buynow-make-payment').removeAttr('disabled');
            }
        },

        clearErrorMessages: function () {
            this.el.find('.errors').each(function () {
                bk$(this).empty();
            });
        },

        buttonClickEvent: function () {
            var that = this,
                thisEl = bk$(this.el),
                button = thisEl.find('.widget-buynow-make-payment'),
                submitData = {};

            thisEl.find('form').on('submit', function (e) {
                var onSuccess;
                e.preventDefault();

                onSuccess = function (response) {
                    submitData = {
                        'email':                 thisEl.find('.widget-buynow-email').val(),
                        'firstName':             thisEl.find('.widget-buynow-first-name').val(),
                        'lastName':              thisEl.find('.widget-buynow-last-name').val(),
                        'password':              thisEl.find('.password').val(),
                        'brandRef' :             that.get('brandRef'),
                        'currencyRef':           App.getParam('currencyRef') || that.get('currencyRef'),
                        'paymentMethodRef':      thisEl.find('.widget-buynow-paymentMethods input:checked').val(),
                        'packageRef':            App.getParam('packageRef') || thisEl.find('.widget-buynow-package-name').attr('data-ref'),
                        'billingPeriodMonths':   thisEl.find('.payment-period-annually').is(':checked') ? 12 : 1,
                        'newsletter':            thisEl.find('.widget-buynow-newsletter').is(':checked') ? false : true,
                        'auth_token':            response.token,
                        'languageCode':          App.session.get('languageCode')
                    };

                    bk$.ajax({
                        type: 'POST',
                        url: '/site/api/user-registration',
                        data: submitData,
                        async: false,
                        beforeSend: function () {
                            that.showMessageBox(
                                App.t(
                                    'widgets.buynow.processing',
                                    'Creating your account...please wait'
                                )
                            );
                            button.addClass('spinner').attr('disabled', 'disabled');
                        }
                    }).done(function (response) {
                        document.location = response.url;
                    }).fail(function (response) {

                        var errors = that.getErrorsFromResponse(response),
                            message = that.getRegistrationMessageAndFieldFromErrors(errors).message,
                            field = that.getRegistrationMessageAndFieldFromErrors(errors).field;

                        if (message) {
                            thisEl.find('.filed-error-' + field).text(message);
                        } else {
                            that.showText(false, App.t('widgets.buynow.failed', 'Sorry we were unable to create your account. Please contact support.'));
                        }
                    }).always(function () {
                        button.removeClass('spinner');
                        that.removeMessageBox();
                    });
                };

                bk$.ajax({
                    type: 'POST',
                    url: '/site/api/auth-token',
                    success: onSuccess
                });
            });
        },

        selectPaymentPeriodEvent: function () {
            var thisEl = bk$(this.el),
                price = null,
                that = this;

            thisEl.find('input[name="paymentPeriod"]').on('change', function () {
                price = that.loadPackageInfo(false).price;
                thisEl.find('.widget-buynow-package-price').text(price);
            });
        },

        loadBrandPaymentMethods: function () {
            var that = this;

            bk$.ajax({
                type: 'POST',
                url: '/site/api/brand-payment-methods',
                data: {
                    brandRef: this.get('brandRef')
                },
                async: false,
                beforeSend: function () {
                    bk$(that.el).find('.widget-buynow-paymentMethods').html('<span>' + App.t('widgets.buynow.retrieving_paymentmethods', 'Waiting for the paymentmethods') + '</span>');
                    that.showMessageBox();
                }
            }).done(function (response) {
                // HC: sets to temporary properties as we don't want to save them
                that.set('paymentMethods', response.paymentMethods, true);
                that.rerender();
            }).fail(function (response) {
                var message = App.t('widgets.buynow.paymentmethods_fail', 'Failed to get payment methods');
                that.showText(true, message);
            }).always(function () {
                that.removeMessageBox();
            });
        },

        /**
         * showText: shows the message text depends on the status
         * @param <boolean>  isSuccess
         */
        showText: function (isSuccess, message) {
            var thisEl = bk$(this.el),
                className = null;

            if (thisEl.find('.message-box').length > 0) {
                thisEl.find('.message-box').remove();
            }

            if (isSuccess) {
                className = 'success';
            } else {
                className = 'fail';
            }

            thisEl.find('.overlay').addClass(className).append('<div class="message-box"><span class="message-text">' + message + '</span></div>');
        },

        showMessageBox: function (message) {
            var thisEl = bk$(this.el),
                msg = message || '',
                overlay = bk$('<div class="overlay">'+msg+'</div>');

            if (thisEl.find('.overlay').length === 0) {
                thisEl.append(overlay);
            }
        },

        removeMessageBox: function () {
            var thisEl = bk$(this.el),
                t = null;

            t = setTimeout(function () {
                clearTimeout(t);
                thisEl.find('.overlay').fadeOut(function () {
                    thisEl.find('.email, .message').val('');
                    bk$(this).remove();
                });
            }, 3000);
        },

        loadPackageInfo: function (doRerender) {
            var that = this,
                thisEl = bk$(this.el),
                packageData = {},
                data = {
                    brandRef: this.get('brandRef'),
                    currencyRef: this.get('currencyRef'),
                    billingPeriodMonths: thisEl.find('.payment-period-monthly').is(':checked') ? 1 : 12,
                    languageCode: App.session.get('languageCode')
                };

            if (App.getParam('packageRef') !== null) {
                data.packageRef = App.getParam('packageRef');
            }

            if (App.getParam('currencyRef') !== null) {
                data.currencyRef = App.getParam('currencyRef');
            }

            bk$.ajax({
                type: 'POST',
                url: '/site/api/get-package',
                data: data,
                async: false,
                beforeSend: function () {
                    if (doRerender !== false) {
                        bk$(that.el).find('.widget-buynow-package').html('<span>' + App.t('widgets.buynow.retrieving_package', 'Waiting for the package inforamtion') + '</span>');
                        that.showMessageBox();
                    }
                }
            }).done(function (response) {

                if (!bk$.isEmptyObject(response)) {
                    packageData = {
                        'name' : response.name,
                        'ref' : response.ref
                    };

                    if (response.prices && response.prices.length > 0) {
                        bk$.each(response.prices, function (index, value) {
                            packageData.price = this.price;
                            packageData.formattedPrice = this.formattedPrice;
                        });
                    }
                }

                // HC: sets to temporary properties as we don't want to save them
                that.set('packageData', packageData, true);

                if (doRerender !== false) {
                    that.rerender();
                }
            }).fail(function (response) {
                var message = App.t('widgets.buynow.packageinfo_fail', 'Failed to get package methods');
                that.showText(true, message);
            }).always(function () {
                that.removeMessageBox();
            });

            return packageData;
        },

        toggleShowHidePassword: function () {
            var thisEl = bk$(this.el),
                passwordInputEl = thisEl.find('.password');

            thisEl.find('.password-mask-toggle').on('click', function () {
                if (passwordInputEl[0].type === 'password') {
                    passwordInputEl[0].type = 'text';
                    passwordInputEl.attr('autocapitalize', 'off').attr('autocorrect', 'off').attr('spellcheck', 'false');
                    bk$(this).text(App.t('widgets.buynow.hide', 'Hide'));
                } else {
                    passwordInputEl[0].type = 'password';
                    passwordInputEl.removeAttr('autocapitalize').removeAttr('autocorrect').removeAttr('spellcheck');
                    bk$(this).text(App.t('widgets.buynow.show', 'Show'));
                }
            });
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Buynow = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.BuynowProperties,
            methods: BaseKit.Widget.BuynowMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetBuynow = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Buynow(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Clicktocall = null;

    BaseKit.Widget.ClicktocallProperties = {
        phone: 'profile',
        align: '',
        phoneText: App.t('widgets.clicktocall.default_text', 'Click to call')
    };

    BaseKit.Widget.ClicktocallMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Clicktocall = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ClicktocallProperties,
            methods: BaseKit.Widget.ClicktocallMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetClicktocall = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Clicktocall(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.CompanyaddressProperties = {};

    BaseKit.Widget.CompanyaddressMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Companyaddress = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.CompanyaddressProperties,
            methods: BaseKit.Widget.CompanyaddressMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetCompanyaddress = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Companyaddress(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.CompanyheaderProperties = {
		showLogo: 1,
		showText: 1
	};

    BaseKit.Widget.CompanyheaderMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Companyheader = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.CompanyheaderProperties,
            methods: BaseKit.Widget.CompanyheaderMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetCompanyheader = function (options) {
        this.each(function (index, el) {
            var obj = null;
            obj = new BaseKit.Widget.Companyheader(el, options);
            bk$(el).data('bkob', obj);
        });
    };
}());(function () {
    BaseKit.Widget.Companyname = null;

    BaseKit.Widget.CompanynameProperties = {
        business: 'profile'
    };

    BaseKit.Widget.CompanynameMethods = {
        construct: function (el, options) {
            this.options = options;
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Companyname = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.CompanynameProperties,
            methods: BaseKit.Widget.CompanynameMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetCompanyname = function (options) {
        this.each(function (index, el) {
            var obj = null;
            obj = new BaseKit.Widget.Companyname(el, options);
            bk$(el).data('bkob', obj);
        });
    };
}());(function () {
    BaseKit.Widget.Contactform = null;

    BaseKit.Widget.ContactformProperties = {
        email: 'profile',
        text: App.t('widgets.contactform.default_button_text', 'Send'),
        formTitle: App.t('widgets.contactform.default_title', 'Contact Form')
    };

    BaseKit.Widget.ContactformMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        /**
         * attachEvents: attach the send email event
         */
        attachEvents: function () {
            var that = this,
                thisEl = bk$(this.el),
                url = '/site/' + App.session.get('siteRef') + '/submit-form',
                data = {},
                emailRegex = /[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+(?:\.[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?/i;

            // override the submit event on the form
            thisEl.find('form').on('submit', function (e) {
                e.preventDefault();

                // set the form data
                data = {
                    'emailFrom': thisEl.find('.email').val(),
                    'message': thisEl.find('.message').val(),
                    'useProfile': that.get('email') === "profile" ? 1 : 0,
                    'formTitle': that.get('formTitle'),
                    'widgetId': thisEl.attr('id')
                };

                if (thisEl.find('.overlay').length > 0) {
                    thisEl.find('.overlay').removeClass('fail success');
                }

                that.removeMessage();
                that.showMessageBox();

                if (!data.emailFrom.length) {
                    that.showMessage(
                        App.t('widgets.form.empty_email', 'Please enter an email address.'),
                        'fail'
                    );
                    return;
                }

                if (!data.message.length) {
                    that.showMessage(
                        App.t('widgets.form.empty_message', 'Please enter a message.'),
                        'fail'
                    );
                    return;
                }

                if (!emailRegex.test(data.emailFrom)) {
                    that.showMessage(
                        App.t('widgets.form.invalid_email', 'Please enter a valid email address.'),
                        'fail'
                    );
                    return;
                }

                // submit the form using the api
                bk$.ajax({
                    url: url,
                    type: "POST",
                    data: data,
                    success: function () {
                        if (that.get('goalUrl')) {
                            //redirect the window location
                            window.location = that.get('goalUrl');
                        } else {
                            that.showMessage(
                                App.t('widgets.form.success', 'Message sent successfully.'),
                                'success'
                            );
                            that.removeMessageBox();
                        }
                    },
                    error: function () {
                        that.showMessage(
                            App.t('widgets.form.failed', 'Submit failed.'),
                            'fail'
                        );
                        that.removeMessageBox();
                    }
                });
            });
        },

        showMessage: function (message, className) {
            var thisEl = bk$(this.el);

            if (!message) {
                return;
            }

            if (thisEl.find('.message-box').length > 0) {
                thisEl.find('.message-box').remove();
            }

            thisEl.find('.overlay').addClass(className).append('<div class="message-box"><span class="message-text">' + message + '</span></div>');
        },

        removeMessage: function () {
            bk$(this.el).find('.overlay .message-box').remove();
        },

        showMessageBox: function () {
            var thisEl = bk$(this.el),
                overlay = bk$('<div class="overlay"></div>'),
                formEl = null;

            if (thisEl.find('.overlay').length === 0) {
                thisEl.append(overlay);
            }

            formEl = thisEl.find('form');

            // Add add class to form element
            if (formEl.length > 0) {
                formEl.addClass('submitting');
            }
        },

        removeMessageBox: function () {
            var thisEl = bk$(this.el),
                t = null,
                formEl = null;

            formEl = thisEl.find('form');

            // Add remove class to form element
            if (formEl.length > 0) {
                formEl.removeClass('submitting');
            }

            thisEl.find('.email, .message').val('');

            t = setTimeout(function () {
                clearTimeout(t);
                thisEl.find('.overlay').fadeOut(function () {
                    bk$(this).remove();
                });
            }, 10000);
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Contactform = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ContactformProperties,
            methods: BaseKit.Widget.ContactformMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetContactform = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Contactform(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Content = null;

    BaseKit.Widget.ContentProperties = {
        lines: 'all',
        content: ''
    };

    BaseKit.Widget.ContentMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            if (this.get('ref') !== null) {
                this.showLines(this.get('lines'));
            }
        },

        renderFinish: function () {
            this.showLines(this.get('lines'));
        },

        /**
         *showLines: show content according to the lines set and attach expand event
         *@param <string> lines - this is a content widget property, determining how many lines to show
         */
        showLines: function (lines) {
            if (typeof lines !== "undefined") {
                var contentEl = bk$(this.el).find('.bk-content-text'),
                    contentElHeight = null,
                    newheight = null;

                contentEl.height('auto');
                contentElHeight = contentEl.height();

                switch (lines) {
                case 'one':
                    newheight = contentElHeight * 25 / 100;
                    this.expandText(newheight, contentElHeight);
                    break;
                case 'two':
                    newheight = contentElHeight * 50 / 100;
                    this.expandText(newheight, contentElHeight);
                    break;
                case 'all':
                    newheight = 'auto';
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
        expandText: function (newheight, fullheight) {
            if (typeof newheight !== "undefined" && typeof fullheight !== "undefined") {
                var thisEl = bk$(this.el),
                    expandSpan = thisEl.find('span.expand'),
                    contentTextEl = thisEl.find('div.bk-content-text'),
                    h = null;

                // MB: animate the text div to slide up and down
                expandSpan.bind('click', function () {
                    if (contentTextEl.height() === parseInt(fullheight, 10)) {
                        thisEl.find('.more').show();
                        thisEl.find('.less').hide();
                        h = newheight;
                    } else {
                        thisEl.find('.more').hide();
                        thisEl.find('.less').show();
                        h = fullheight;
                    }

                    // HC: slide up and down smoothly
                    contentTextEl.stop().animate({
                        'height': h
                    }, 500);
                });
            }
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Content = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ContentProperties,
            methods: BaseKit.Widget.ContentMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetContent = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Content(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Disqus = {};

    BaseKit.Widget.DisqusProperties = {
        url: ''
    };

    BaseKit.Widget.DisqusMethods = {
        construct: function (el, options) {
            this.options = options;
        }
    };

    BaseKit.Widget.Disqus = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.DisqusProperties,
            methods: BaseKit.Widget.DisqusMethods
        });
    };

    bk$.fn.basekitWidgetDisqus = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Disqus(el, options));
        });
    };
}());
(function () {

    BaseKit.Widget.DropboxProperties = {
        iconColor: 'black',
        text: App.t('widgets.dropbox.default_text', 'Download'),
        align: '',
        showFileName: 0
    };

    BaseKit.Widget.DropboxMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {

            this.attachEvents();
        },

        attachEvents: function () {
            var that = this;

            bk$(this.el).find('button').on('click', function (e) {
                var link = bk$(this).data('link');

                if (link === undefined || link.length === 0) {
                    alert(App.t('widgets.dropbox.no_file_added', 'No file added'));
                } else {
                    window.open(link);
                }
            });
        }
    };

    BaseKit.Widget.Dropbox = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.DropboxProperties,
            methods: BaseKit.Widget.DropboxMethods
        });
    };

    bk$.fn.basekitWidgetDropbox = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Dropbox(el, options));
        });
    };
}());
(function () {

    BaseKit.Widget.Ecombasket = null;

    BaseKit.Widget.EcombasketProperties = {
    };

    BaseKit.Widget.EcombasketMethods = {
        construct: function (el, options) {
            this.options = options;

            if (!Server.plugins.ecommerce) {
                return;
            }

            this.load();
        },

        load: function () {
            var that = this;

            Globals.addHook('ecom.basket.changed', this, function (cart) {
                that.updateBasket(cart);
            });

            this.attachEvents();
        },

        attachEvents: function () {
            var that = this,
                thisEl = bk$(this.el);

            thisEl.find('.js-pull').on('click', function () {
                thisEl.toggleClass('show-content');
                bk$(document).on('click', function(evt) {
                    if (!bk$(evt.target).parents('.ecombasket').length) {
                        thisEl.toggleClass('show-content');
                        bk$(document).off('click');
                    }
                });
            });

            thisEl.find('.js-remove').on('click', function (e) {
                that.removeItem(bk$(e.target).attr('data-ref'));
            });
        },

        updateBasket: function (cart) {
            this.set('items', cart.items, true);
            this.set('itemCount', cart.itemCount, true);
            this.set('subTotal', cart.subTotal, true);

            this.rerender();
        },

        removeItem: function (ref) {
            bk$.ajax({
                method: 'POST',
                url: '/store/cart/remove-item',
                data: {
                    productVariationRef: ref
                }
            }).done(function (response) {
                Globals.notifyHooks('ecom.basket.changed', response);
            });
        }
    };

    BaseKit.Widget.Ecombasket = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.EcombasketProperties,
            methods: BaseKit.Widget.EcombasketMethods
        });
    };

    bk$.fn.basekitWidgetEcombasket = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Ecombasket(el, options));
        });
    };
}());
(function () {

    BaseKit.Widget.Ecombasketsummary = null;

    BaseKit.Widget.EcombasketsummaryProperties = {
    };

    BaseKit.Widget.EcombasketsummaryMethods = {
        construct: function (el, options) {
            this.options = options;

            if (!Server.plugins.ecommerce) {
                return;
            }

            this.load();
        },

        load: function () {
            var that = this;

            Globals.addHook('ecom.basket.changed', this, function (cart) {
                that.updateBasketSummary(cart);
            });

            this.attachEvents();
        },

        attachEvents: function () {
            var that = this;

            bk$(this.el).find('.js-add').off('click').on('click', function (e) {
                that.addItem(bk$(this).data('ref'));
            });

            bk$(this.el).find('.js-remove').off('click').on('click', function (e) {
                that.removeItem(bk$(this).data('ref'));
            });
        },

        updateBasketSummary: function (cart) {
            this.set('items', cart.items, true);
            this.set('itemCount', cart.itemCount, true);
            this.set('subTotal', cart.subTotal, true);

            this.rerender();
        },

        removeItem: function (ref) {
            bk$.ajax({
                method: 'POST',
                url: '/store/cart/remove-item',
                data: {
                    productVariationRef: ref
                }
            }).done(function (response) {
                Globals.notifyHooks('ecom.basket.changed', response);
            });
        },

        addItem: function (ref) {
            bk$.ajax({
                method: 'POST',
                url: '/store/cart/add-item',
                data: {
                    productVariationRef: ref
                }
            }).done(function (response) {
                Globals.notifyHooks('ecom.basket.changed', response);
            });
        }
    };

    BaseKit.Widget.Ecombasketsummary = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.EcombasketsummaryProperties,
            methods: BaseKit.Widget.EcombasketsummaryMethods
        });
    };

    bk$.fn.basekitWidgetEcombasketsummary = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Ecombasketsummary(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Ecomcategorieslist = null;

    BaseKit.Widget.EcomcategorieslistProperties = {
        title: App.t('widgets.ecomcategorieslist.default_title', 'Categories'),
        showCount: true
    };

    BaseKit.Widget.EcomcategorieslistMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Ecomcategorieslist = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.EcomcategorieslistProperties,
            methods: BaseKit.Widget.EcomcategorieslistMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetEcomcategorieslist = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Ecomcategorieslist(el, options));
        });
    };
}());(function () {

    BaseKit.Widget.Ecomcheckout = null;

    BaseKit.Widget.EcomcheckoutProperties = {
    };

    BaseKit.Widget.EcomcheckoutMethods = {
        construct: function (el, options) {
            this.options = options;

            if (!Server.plugins.ecommerce) {
                return;
            }

            this.storeRef = Server.plugins.ecommerce.store.ref;
            this.load();
        },

        load: function () {
            var that = this;

            // HC: just want to add hook once
            Globals.addHook('ecom.basket.changed', this, function () {
                that.updateCheckout();
            });

            this.updateCheckout();
        },

        attachEvents: function () {
            var that = this;

            bk$(this.el).find('.js-add').off('click').on('click', function (e) {
                that.addItem(bk$(this).data('ref'));
            });

            bk$(this.el).find('.js-remove').off('click').on('click', function (e) {
                that.removeItem(bk$(this).data('ref'));
            });

            this.countrySelectEvent();
            this.shippingSelectEvent();
            this.formEvents();
        },

        handleCountryAutoFill: function () {
            var that = this,
                refreshTime = 1000;

            // clean the interval
            if (this.refreshInterval !== '') {
                window.clearInterval(this.refreshInterval);
                this.refreshInterval = '';
            }

            this.refreshInterval = window.setInterval(function () {
                try {

                    // HC: autofill does not fire change on country select so manually check it's value
                    if (that.el.find('[name="delivery[countryCode]"]').length > 0
                            && that.el.find('[name="delivery[countryCode]"]').val() !== that.countryCode) {

                        // HC: resets the delivery ref value
                        that.el.find('[name="deliveryRef"]').val("");
                        that.updateCheckoutTotal();
                    }

                } catch (err) {
                    clearInterval(that.refreshInterval);

                    //throw error
                    console.log(err);
                }
            }, refreshTime);
        },

        updateCheckout: function () {
            var that = this,
                cart = null,
                variations = {},
                store = Server.plugins.ecommerce.store;

            this.items = [];

            bk$.ajax({
                method: 'GET',
                url: '/store/cart/get'
            }).done(function (response) {
                cart = response;

                bk$.each(cart, function (ref, key) {
                    var variation = that.findVariationByRef(ref);

                    if (variation !== null) {
                        that.items.push({
                            ref: ref,
                            title: variation.title,
                            productRef: variation.productRef,
                            assetUrl: variation.assetUrl,
                            quantity: parseInt(cart[ref], 10),
                            pricePU: variation.formattedPrice
                        });

                        variations[ref] = parseInt(cart[ref], 10);
                    }
                });

                that.variations = variations;

                if (store.stripePublishableKey === null && !store.paypal) {
                    return;
                }

                if (that.items.length === 0) {
                    that.updateEmptyUI();
                } else {
                    that.updateCheckoutTotal();
                }
            });
        },

        getCountryCode: function () {
            var countryCode = this.el.find('[name="delivery[countryCode]"]').val();
            this.countryCode = countryCode;
            return countryCode;
        },

        getCountry: function () {
            return this.el.find('[name="delivery[countryCode]"] option:selected').text();
        },

        getDeliveryRef: function () {
            var deliveryRef = parseInt(this.el.find('[name="deliveryRef"]').val(), 10);

            if (!isNaN(deliveryRef)) {
                return deliveryRef;
            }
        },

        getTaxRef: function () {
            var taxRef = this.el.find('[name="taxRef"]').val();
            this.taxRef = taxRef;
            return taxRef;
        },

        removeItem: function (ref) {
            bk$.ajax({
                method: 'POST',
                url: '/store/cart/remove-item',
                data: {
                    productVariationRef: ref
                }
            }).done(function (response) {
                Globals.notifyHooks('ecom.basket.changed', response);
            });
        },

        addItem: function (ref) {
            bk$.ajax({
                method: 'POST',
                url: '/store/cart/add-item',
                data: {
                    productVariationRef: ref
                }
            }).done(function (response) {
                Globals.notifyHooks('ecom.basket.changed', response);
            });

        },

        updateCheckoutTotal: function () {
            var that = this,
                sendingData = {
                    storeRef: Server.plugins.ecommerce.store.ref,
                    productVariationRefs: this.variations,
                    countryCode: this.getCountryCode(),
                    deliveryRef: this.getDeliveryRef()
                };

            that.updateTax();
            sendingData.taxRef = that.getTaxRef();

            bk$.ajax({
                url: Server.plugins.ecommerce.store.calculateUrl,
                method: 'POST',
                data: sendingData,
                dataType:'json'
            }).done(function (response) {
                that.setCheckoutTotal(response);
                that.updateCheckoutUI();
            });
        },

        setCheckoutTotal: function (response) {
            var itemRef = null,
                currentItems = this.items; // store the reference

            bk$.each(currentItems, function (index, product) {
                itemRef = product.ref;
                product.price = response.productVariationSubTotals[itemRef];
            });

            // HC: partial tpl data
            this.noShippingsReason = response.emptyShippingOptionsReason;
            this.subTotalPrice     = response.productVariationsTotal;
            this.shippingOpts      = response.shippingOptions;
            this.totalPrice        = response.total;
            this.shippingCost      = response.shippingCost;
            this.totalTax          = response.totalTax;
        },

        updateCheckoutUI: function () {
            this.updateItemsTableUI();
            this.updateItemsInputUI();
            this.updateShippingOptsUI();
            this.updateTax();
            this.updateTaxAndTotalValues();
            this.updateSubmitBtnUI();
            this.attachEvents();
        },

        updateTax: function () {
            var thisEl = bk$(this.el),
                countryCode = this.getCountryCode(),
                taxData = {
                    countryCode : countryCode,
                    taxRef      : this.findTaxRef(countryCode)
                },
                taxHtml = this.rerenderPartial('widget_ecomcheckout_tax', taxData);

            if (thisEl.find('[name="taxRef"]').length > 0) {
                thisEl.find('[name="taxRef"]').remove();
            }

            thisEl.find('.js-checkout-form').append(taxHtml);

            if (!thisEl.find('[name="taxRef"]').val()) {
                thisEl.find('[name="taxRef"]').remove();
            }
        },

        findTaxRef: function (countryCode) {
            var taxRef = Server.plugins.ecommerce.store.defaultTaxRef;
            bk$.each(Server.plugins.ecommerce.taxes, function (key, tax) {
                if (tax !== null && tax.deleted === 0 && tax.countryCode === countryCode) {
                    taxRef = tax.ref;
                }
            });

            return taxRef;
        },

        updateEmptyUI: function () {
            var thisEl = bk$(this.el),
                emptyHtml = this.rerenderPartial('widget_ecomcheckout_empty'),
                removedEl = thisEl.find(':not(.js-checkout-title)');

            if (bk$('body').hasClass('edit')) {

                // HC: in editor mode, thisEl will have an overlay which should not be removed
                removedEl = thisEl.find(':not(.js-checkout-title, .bk-overlay, .bk-overlay-bg, .bk-icons-bar, .bk-icons-bar span)');
            }

            if (removedEl.length > 0 && emptyHtml.length > 0) {
                removedEl.remove().end().append(emptyHtml);
            }
        },

        updateItemsTableUI: function () {
            var thisEl = bk$(this.el),
                itemsData = {
                    items: this.items,
                    subTotalPrice: this.subTotalPrice
                },
                itemsHtml = this.rerenderPartial('widget_ecomcheckout_items', itemsData);

            if (thisEl.find('.js-checkout-itemstable').length > 0 && itemsHtml.length > 0) {
                thisEl.find('.js-checkout-itemstable').empty().append(itemsHtml);
            } else {
                throw new Error('unable to find .js-checkout-itemstable element');
            }
        },

        updateItemsInputUI: function () {
            var thisEl = bk$(this.el),
                itemsInputData = {
                    items: this.items,
                    subTotalPrice: this.subTotalPrice
                },
                itemsInputHtml = this.rerenderPartial('widget_ecomcheckout_itemsinput', itemsInputData);

            if (thisEl.find('.js-checkout-form').length > 0 && itemsInputHtml.length > 0) {

                if (bk$('.js-checkout-items-input').length > 0) {
                    bk$('.js-checkout-items-input').remove();
                }

                bk$('.js-checkout-form').append(itemsInputHtml);
            } else {
                throw new Error('unable to find .js-checkout-form element');
            }
        },

        updateShippingOptsUI: function () {
            var thisEl = bk$(this.el),
                shippingData = {
                    email:             Server.plugins.ecommerce.store.email,
                    country:           this.getCountry(),
                    business:          Profile.get('business'),
                    shippings:         Server.plugins.ecommerce.shippings,
                    countryCode:       this.getCountryCode(),
                    deliveryRef:       this.getDeliveryRef(),
                    shippingOpts:      this.shippingOpts,
                    noShippingsReason: this.noShippingsReason
                },
                shippingHtml = this.rerenderPartial('widget_ecomcheckout_shippingopts', shippingData);

            if (thisEl.find('.js-shipping-opts').length > 0 && shippingHtml.length > 0) {
                thisEl.find('.js-shipping-opts').empty().append(shippingHtml);
            } else {
                throw new Error('unable to find .js-shipping-opts element');
            }
        },

        updateTaxAndTotalValues: function () {
            var thisEl = bk$(this.el),
                shippingCostText = App.t('widgets.ecomcheckout.delivery_amount', 'Delivery price:') + ' ' + this.shippingCost,
                totalTaxText = App.t('widgets.ecomcheckout.total_tax', 'Total tax:') + ' ' + this.totalTax,
                totalPriceText = App.t('widgets.ecomcheckout.total_amount', 'Total amount:') + ' ' + this.totalPrice,
                deliveryPriceEl = thisEl.find('.delivery-price'),
                taxEl = thisEl.find('.checkout-total-tax'),
                totalAmountEl = thisEl.find('.checkout-total-amount');

            if (deliveryPriceEl.length > 0) {
                deliveryPriceEl.text(shippingCostText);
            }

            if (taxEl.length > 0) {
                taxEl.text(totalTaxText);
            }

            if (totalAmountEl.length > 0) {
                totalAmountEl.text(totalPriceText);
            }
        },

        updateSubmitBtnUI: function () {
            var btnEl = bk$(this.el).find('.js-create-order');

            if (bk$.isEmptyObject(this.shippingOpts)) {
                btnEl.prop('disabled', true);
            } else {
                btnEl.prop('disabled', false);
            }

            // HC: always disable the paymentbutton from preview and edit modes
            if (Server.app.mode !== 'published') {
                btnEl.prop('disabled', true);
            }
        },

        findVariationByRef: function (ref) {
            var variation = null,
                products = Server.plugins.ecommerce.products;

            bk$.each(products, function (key, product) {
                var variations = bk$.merge(product.variations, product.inactiveVariations),
                    result = bk$.grep(variations, function (variation) {
                        return parseInt(variation.ref, 10) === parseInt(ref, 10);
                    });

                if (result.length === 1) {
                    variation = result[0];
                    variation.productRef = product.ref;

                    if (product.assets.length) {
                        variation.assetUrl = Server.plugins.assets.images[product.assets[0].assetRef].url;
                    }
                    return;
                }
            });

            return variation || null;
        },

        countrySelectEvent: function () {
            var that = this,
                thisEl = bk$(this.el);

            thisEl.find('[name="delivery[countryCode]"]').off('change').on('change', function () {

                // HC: resets the delivery ref value
                thisEl.find('[name="deliveryRef"]').val("");
                that.updateCheckoutTotal();
            });
        },

        shippingSelectEvent: function () {
            var that = this;

            bk$(this.el).find('[name="deliveryRef"]').off('change').on('change', function () {
                that.updateCheckoutTotal();
            });
        },

        formEvents: function () {
            var that = this;

            bk$(this.el).find('.checkout-form').off('submit').on('submit', function (e) {
                if (!that.validateFields()) {
                    e.preventDefault();
                }
            });
        },

        validateFields: function () {
            var thisEl = bk$(this.el),
                fieldEls = thisEl.find('[name][required]'),
                isValid = true;

            thisEl.find('.form-group').removeClass('invalid');

            bk$.each(fieldEls, function () {
                if (bk$(this).val().length === 0) {
                    bk$(this).parents('.form-group').addClass('invalid');
                    isValid = false;
                }
            });
            return isValid;
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Ecomcheckout = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.EcomcheckoutProperties,
            methods: BaseKit.Widget.EcomcheckoutMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetEcomcheckout = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Ecomcheckout(el, options));
        });
    };
}());
(function () {

    BaseKit.Widget.Ecomconfirmation = null;

    BaseKit.Widget.EcomconfirmationProperties = {
    };

    BaseKit.Widget.EcomconfirmationMethods = {
        construct: function (el, options) {
            this.options = options;

            this.load();
        },

        load: function () {
            this.clearCart();
        },

        clearCart: function () {
            window.localStorage.removeItem('cart');
        }
    };

    BaseKit.Widget.Ecomconfirmation = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.EcomconfirmationProperties,
            methods: BaseKit.Widget.EcomconfirmationMethods
        });
    };

    bk$.fn.basekitWidgetEcomconfirmation = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Ecomconfirmation(el, options));
        });
    };
}());
(function () {

    BaseKit.Widget.Ecomfeaturedproducts = null;

    BaseKit.Widget.EcomfeaturedproductsProperties = {
    };

    BaseKit.Widget.EcomfeaturedproductsMethods = {
        construct: function (el, options) {
            this.options = options;

            this.load();
        },

        load: function () {
        }
    };

    BaseKit.Widget.Ecomfeaturedproducts = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.EcomfeaturedproductsProperties,
            methods: BaseKit.Widget.EcomfeaturedproductsMethods
        });
    };

    bk$.fn.basekitWidgetEcomfeaturedproducts = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Ecomfeaturedproducts(el, options));
        });
    };
}());
(function () {

    BaseKit.Widget.Ecomlegal = null;

    BaseKit.Widget.EcomlegalProperties = {
    };

    BaseKit.Widget.EcomlegalMethods = {
        construct: function (el, options) {
            this.options = options;
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Ecomlegal = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.EcomlegalProperties,
            methods: BaseKit.Widget.EcomlegalMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetEcomlegal = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Ecomlegal(el, options));
        });
    };
}());
(function () {

    BaseKit.Widget.Ecomproduct = null;

    BaseKit.Widget.EcomproductProperties = {
    };

    BaseKit.Widget.EcomproductMethods = {
        construct: function (el, options) {
            this.options = options;

            if (!Server.plugins.ecommerce) {
                return;
            }

            this.storeRef = Server.plugins.ecommerce.store.ref;
            this.load();
        },

        load: function () {
            this.set('translations', {
                'Add to cart' : App.t('shared_views.ecom-product.add-to-cart', 'Add to cart'),
                'Added'       : App.t('shared_views.ecom-product.added', 'Added')
            }, true);

            this.set('product', Server.plugins.ecommerce.product, true);
            this.set('variations', Server.plugins.ecommerce.product.variations, true);
            this.set('options', Server.plugins.ecommerce.product.options, true);

            if (this.get('variations').length === 1) {
                this.selectVariation(this.get('variations')[0]);
            } else {
                this.chooseSensibleDefaultVariation();
            }
            this.rerender();
        },

        attachEvents: function () {
            bk$(this.el).find('select').on('change', this.dropdownChanged.bind(this));
            bk$(this.el).find('.ecom-product-add-to-cart-btn').on('click', this.addToCartButtonClicked.bind(this));

            this.previewImageEvent();
        },

        previewImageEvent: function () {
            var thisEl = bk$(this.el),
                previewWrapper = thisEl.find('.ecom-product-preview-image-wrap'),
                previewImg = thisEl.find('.ecom-product-preview-image');

            thisEl.find('.ecom-product-image-wrap').on('click', function () {
                var src = bk$(this).find('img').attr('src');
                previewImg.attr('src', src);
                previewWrapper.css('background-image', 'url(' + src + ')');
            });
        },

        chooseSensibleDefaultVariation: function () {
            var product = this.get('product'),
                purchasableVariations = [];
            purchasableVariations = this.get('variations').filter(function (variation) {
                return (
                    product.stockUnlimited === 1
                    || product.stockTrack === 0
                    || variation.stock > 0
                );
            });
            if (purchasableVariations.length > 0) {
                this.selectVariation(purchasableVariations[0]);
            } else {
                this.selectVariation(this.get('variations')[0]);
            }
        },

        getCurrentOptionChoices: function () {
            var choices = {};
            bk$(this.el).find('select option:selected').each(function (i, option) {
                choices[option.parentNode.name] = option.text;
            });
            return choices;
        },

        dropdownChanged: function (event) {
            var changedOptionName = event.target.name,
                selectedValue = bk$(event.target).find('option:selected').text();
            this.selectVariationOption(changedOptionName, selectedValue);
            this.rerender();
        },

        selectVariationOption: function (name, value) {
            var matchingVariations = this.findVariations(this.getCurrentOptionChoices()),
                selectedVariation = matchingVariations[0];

            this.set('variationExists', typeof selectedVariation !== 'undefined', true);
            this.set('variationRef', null, true);
            this.set('price', null, true);
            this.set('soldOut', null, true);
            this.set('disableButton', true, true);
            this.get('options')[name].selectedValue = bk$.trim(value);
            if (this.get('variationExists')) {
                this.selectVariation(selectedVariation);
            }
        },

        selectVariation: function (variation) {
            var that = this,
                product = this.get('product');
            this.set('variationExists', true, true);
            this.set('variationRef', variation.ref, true);
            this.set('price', variation.formattedPrice, true);
            this.set('soldOut', (
                product.stockUnlimited !== 1
                && product.stockTrack !== 0
                && variation.stock < 1
            ), true);
            this.set('disableButton', this.get('soldOut'), true);
            bk$.each(variation.options, function (i, option) {
                bk$.each(option, function (name, value) {
                    that.get('options')[name].selectedValue = value;
                });
            });
        },

        findVariations: function (searchCriteria) {
            var matchingVariations = [];
            bk$.each(this.get('variations'), function (i, variation) {
                var isMatch = true;
                bk$.each(variation.options, function (j, option) {
                    var name = null,
                        value = null;
                    for (name in option) {
                        if (option.hasOwnProperty()) {
                            break;
                        }
                    }
                    value = option[name];
                    if (typeof searchCriteria[name] !== 'undefined' && searchCriteria[name] !== value) {
                        isMatch = false;
                        return false;
                    }
                });
                if (isMatch) {
                    matchingVariations.push(variation);
                }
            });
            return matchingVariations;
        },

        addToCartButtonClicked: function (event) {
            this.switchToCheckoutButton();
            this.addToCart(this.get('variationRef'));
            setTimeout(this.switchBackToAddToCartButton.bind(this), 2000);
        },

        addToCart: function (variationRef) {
            var cart = null,
                that = this;

            bk$.ajax({
                method: 'POST',
                url: '/store/cart/add-item',
                data: {
                    productVariationRef: variationRef
                }
            }).done(function (response) {
                Globals.notifyHooks('ecom.basket.changed', response);
            });
        },

        switchToCheckoutButton: function () {
            var addButton = bk$(this.el).find('.ecom-product-add-to-cart-btn'),
                checkoutWrapper = bk$(this.el).find('.ecom-product-go-to-checkout-btn-wrapper');

            addButton
                .attr('disabled', 'disabled')
                .addClass('added')
                .find('.text')
                .text(this.get('translations')['Added']);
            checkoutWrapper.attr('hidden', true);
        },

        switchBackToAddToCartButton: function () {
            var addButton = bk$(this.el).find('.ecom-product-add-to-cart-btn'),
                checkoutWrapper = bk$(this.el).find('.ecom-product-go-to-checkout-btn-wrapper');

            addButton
                .removeAttr('disabled')
                .removeClass('added')
                .find('.text')
                .text(this.get('translations')['Add to cart']);
            checkoutWrapper.removeAttr('hidden');
        }

    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Ecomproduct = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.EcomproductProperties,
            methods: BaseKit.Widget.EcomproductMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetEcomproduct = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Ecomproduct(el, options));
        });
    };
}());
(function () {

    BaseKit.Widget.Ecomproductslist = null;

    BaseKit.Widget.EcomproductslistProperties = {
        productFiltering: 1
    };

    BaseKit.Widget.EcomproductslistMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            this.attachEvents();
        },

        attachEvents: function () {
            var displayControl = bk$(this.el).find('.js-display-control'),
                form = bk$(this.el).find('.productlist-display-form');

            displayControl.on('change', function () {
                bk$(this).parents('.productlist-display-form').submit();
            });

            form.on('submit', function (e) {
                var orderBy = bk$(e.currentTarget).find('[name="productlist-sort"] option[value="score-desc"]'),
                    search = bk$(e.currentTarget).find('[name="productlist-search"]');

                if (!orderBy.length && search.val().length) {
                    bk$(e.currentTarget).find('[name="productlist-sort"]').append('<option value="score-desc"></option>');
                    bk$(e.currentTarget).find('[name="productlist-sort"]').val('score-desc');
                }
            });
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Ecomproductslist = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.EcomproductslistProperties,
            methods: BaseKit.Widget.EcomproductslistMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetEcomproductslist = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Ecomproductslist(el, options));
        });
    };
}());
(function ()
{
	BaseKit.Widget.EmbedProperties = {
	};

	BaseKit.Widget.EmbedMethods = {
		construct: function (el, options)
		{
			this.options = options;
			this.load();
		},

		load: function ()
		{
			var thisEl = bk$(this.el),
				code = this.get('code');
				
			if (typeof(code) !== 'undefined' && code !== null &&  code.length > 0)
			{
				thisEl.find('.embed-default').hide();

                if (this.get('debugMode') !== true) {
                    thisEl.find('.content').show().writeCapture().html(code,
                    {
                        proxyGetElementById: true,
                        writeOnGetElementById: true
                    });
                }
			}
			else
			{
				thisEl.find('.embed-default').show();
				thisEl.find('.content').hide();
			}
		}
	};

	// Base Widget Functionality - What ever is required 
	// to get the widget working in normal mode goes in here.
	BaseKit.Widget.Embed = function ()
	{
		var o = new BaseKit.WidgetCore(this, arguments, {
			properties: BaseKit.Widget.EmbedProperties,
			methods: BaseKit.Widget.EmbedMethods
		});
	};

	// JQuery plugin so that a widget can be attached to an element
	bk$.fn.basekitWidgetEmbed = function (options)
	{
		this.each(function (index, el)
		{
			bk$(el).data('bkob', new BaseKit.Widget.Embed(el, options));
		});
	};
}());
(function () {
    BaseKit.Widget.Extendednavigation = null;

    BaseKit.Widget.ExtendednavigationProperties = {
        align: 'center',
        icons: []
    };

    BaseKit.Widget.ExtendednavigationMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            this.attachEvents();
        },

        attachEvents: function () {
            this.menuDropdownEvent();
            this.addClassToCurrentPage();
        },

        menuDropdownEvent: function () {
            var that = this,
                thisEl = bk$(this.el),
                pullEl = thisEl.find('.pull'),
                menuEl = thisEl.find('.extendednavigation > ul');

            pullEl.off('click').on('click', function (e) {
                e.preventDefault();
                if (!bk$('body').hasClass('edit')) {
                    menuEl.toggleClass('open');
                }
            });

            this.menuToggle();

            bk$(window).on('resize orientationchange', function () {
                that.menuToggle();
            });
        },

        menuToggle: function () {
            var w = bk$(window).width(),
                menuEl = bk$(this.el).find('.extendednavigation ul');

            if (w > 320 && menuEl.is(':hidden')) {
                menuEl.removeClass('open');
            }
        },

        addClassToCurrentPage: function () {
            var pageLiEls = bk$(this.el).find('li'),
                folderLiEl = null;

            if (pageLiEls.length > 0) {
                pageLiEls.each(function () {
                    if (parseInt(bk$(this).attr('id').replace('menu-item_', ''), 10) === parseInt(Server.page.ref, 10)) {
                        bk$(this).addClass('selected');

                        folderLiEl = bk$(this).parents('li');
                        if (folderLiEl.length > 0 && folderLiEl.hasClass('folder')) {
                            folderLiEl.addClass('selected');
                        }
                    }
                });
            }
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Extendednavigation = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ExtendednavigationProperties,
            methods: BaseKit.Widget.ExtendednavigationMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetExtendednavigation = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Extendednavigation(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Facebookcomments = null;

    BaseKit.Widget.FacebookcommentsProperties = {
        url: '',
        numPosts: 5,
        colorScheme: 'light',
        orderBy: 'social',
        appId: ''
    };

    BaseKit.Widget.FacebookcommentsMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
            this.fbEl = el;
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Facebookcomments = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.FacebookcommentsProperties,
            methods: BaseKit.Widget.FacebookcommentsMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetFacebookcomments = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Facebookcomments(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Facebooklike = null;

    BaseKit.Widget.FacebooklikeProperties = {
        showFaces: true,
        action: 'like',
        colorscheme: 'light',
        layout: 'standard',
        height: '80',
        font: 'arial',
        locale: 'en_US',
        thisUrl: 'www.basekit.com' // RH: Needs to be this site domain
    };

    BaseKit.Widget.FacebooklikeMethods = {
        construct: function (el, options) {
            this.options = options;

            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        // attachEvents: attach the click event to the button
        attachEvents: function () {
            var that = this;
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Facebooklike = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.FacebooklikeProperties,
            methods: BaseKit.Widget.FacebooklikeMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetFacebooklike = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Facebooklike(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Feature = null;

    BaseKit.Widget.FeatureProperties = {
        bgImg: '',
        header: App.t('widgets.feature.header_default', 'My great company'),
        strapline: App.t('widgets.feature.strapline_default', 'My strap line goes here'),
        url: '',
        action: 'none',
        icon: '',
        buttonText: App.t('widgets.feature.button_text', 'button text'),
        iconPosition: 'left',
        iconColor: 'black',
        target: 'New',
        showBtn: true
    };

    BaseKit.Widget.FeatureMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        // attachEvents: attach the click event to the button and re-align background
        attachEvents: function () {
            var that = this,
                url = null,
                action = null,
                target = null;

            bk$(this.el).find('button').on('click', function (e) {
                //get the button date
                action = that.get('action');
                url = that.get('url');
                target = that.get('target');

                // check if the buton has a button link
                if (action !== 'none' && action !== null) {
                    //open in the same window
                    if (target !== '_blank') {
                        window.location = url;
                    } else {
                        window.open(url);
                    }
                }
            });
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Feature = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.FeatureProperties,
            methods: BaseKit.Widget.FeatureMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetFeature = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Feature(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.ForgottenpasswordProperties = {
        passwordResetPage: 'home',
        label: App.t('widgets.forgottenpassword.email', 'Email'),
        text: App.t('widgets.forgottenpassword.button_text', 'Send')
    };

    BaseKit.Widget.ForgottenpasswordMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            this.attachEvents();
        },

        attachEvents: function () {
            var that = this,
                thisEl = bk$(this.el);

            thisEl.find('form').on('submit', function (e) {
                e.preventDefault();

                // return if the email address is empty
                if (thisEl.find('.email').val().length === 0) {
                    return;
                }

                bk$.ajax({
                    type: 'POST',
                    url: 'site/api/auth-token',
                    async: false
                }).done(function (response) {
                    var data = {
                        token : response.token,
                        email : thisEl.find('.email').val(),
                        passwordResetPage : that.get('passwordResetPage')
                    };

                    bk$.ajax({
                        url: 'site/api/forgotten-password',
                        type: 'POST',
                        data: data,
                        beforeSend: function () {
                            that.showMessageBox();
                        }
                    }).always(function () {
                        that.removeMessageBox();
                    }).done(function (response) {
                        var message = App.t('widgets.forgottenpassword.success', 'Reset password email sent successfully.');
                        that.showText(true, message);
                    }).fail(function (response) {
                        var errors = App.getErrorsFromResponse(response),
                            message = null;

                        bk$.each(errors, function (i, value) {
                            if (value.field === 'email') {
                                message = value.message;
                                return;
                            }
                        })

                        if (message) {
                            that.showText(false, message);
                        } else {
                            that.showText(false, App.t('widgets.forgottenpassword.failed', 'Submit failed.'));
                        }
                    });
                }).fail(function (response) {
                    var message = App.t('widgets.forgottenpassword.auth_fail', 'Failed to get authentication token');
                    that.showText(true, message);
                });
            });
        },

        /**
         * showText: shows the message text depends on the status
         * @param <boolean>  isSuccess
         */
        showText: function (isSuccess, message) {
            var thisEl = bk$(this.el),
                className = null;

            if (thisEl.find('.message-box').length > 0) {
                thisEl.find('.message-box').remove();
            }

            if (isSuccess) {
                className = 'success';
            } else {
                className = 'fail';
            }

            thisEl.find('.overlay').addClass(className).append('<div class="message-box"><span class="message-text">' + message + '</span></div>');
        },

        showMessageBox: function () {
            var thisEl = bk$(this.el),
                overlay = bk$('<div class="overlay"></div>');

            if (thisEl.find('.overlay').length === 0) {
                thisEl.append(overlay);
            }
        },

        removeMessageBox: function () {
            var thisEl = bk$(this.el),
                t = null;

            t = setTimeout(function () {
                clearTimeout(t);
                thisEl.find('.overlay').fadeOut(function () {
                    thisEl.find('.email, .message').val('');
                    bk$(this).remove();
                });
            }, 3000);
        }
    };

    BaseKit.Widget.Forgottenpassword = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ForgottenpasswordProperties,
            methods: BaseKit.Widget.ForgottenpasswordMethods
        });
    };

    bk$.fn.basekitWidgetForgottenpassword = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Forgottenpassword(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Gallery = null;

    BaseKit.Widget.GalleryProperties = {
        widgetType: 'widget.gallery',
        imageScale: 'original',
        showTitle: 1,
        showDescription: 1,
        albumRef: 0,
        images: []
    };

    BaseKit.Widget.GalleryMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Gallery = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.GalleryProperties,
            methods: BaseKit.Widget.GalleryMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetGallery = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Gallery(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Image = null;

    BaseKit.Widget.ImageProperties = {
        description: '',
        linkUrl: 'none',
        target: 'none',
        action: 'none',
        scale: 'original',
        imageWidth: 'auto',
        alt: '',
        title: '',
        widgetType: 'widget.image',
        align: null
    };

    BaseKit.Widget.ImageMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Image = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ImageProperties,
            methods: BaseKit.Widget.ImageMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetImage = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Image(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Line = null;

    BaseKit.Widget.LineProperties = {
        thickness: 'inherit',
        padding: 'inherit',
        length: 'inherit',
        align: ''
    };

    BaseKit.Widget.LineMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Line = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.LineProperties,
            methods: BaseKit.Widget.LineMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetLine = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Line(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Linkedincompanyprofile = {};

    BaseKit.Widget.LinkedincompanyprofileProperties = {
        'linkedinID': '',
        'source': 'companyName'
    };

    BaseKit.Widget.LinkedincompanyprofileMethods = {
        construct: function (el, options) {
            this.options = options;

            // check to see if we have already l;oaded the linkinin API
            if (Site.Page.Globals.linkinInAPILoaded === undefined || Site.Page.Globals.linkinInAPILoaded === null) {
                Site.Page.Globals.linkinInAPILoaded = false;
            }

            this.load();
        },

        load: function () {
            var that = this;

            // This dynamically injects the linkedin script into the body
            if (Site.Page.Globals.linkinInAPILoaded === false && bk$('#linkedin-script').length === 0) {
                bk$.getScript("//platform.linkedin.com/in.js", function () {
                    bk$(this).attr('id', 'linkedin-script');
                    Site.Page.Globals.linkinInAPILoaded = true;
                });
            } else {
                this.rebuild();
            }
        },

        attachEvents: function () {
            this.rebuild();
        },

        /**
         * tells the linked IN object to reparse itself, thus rendereding the iframe inside
         */
        rebuild: function () {
            // this is needed to force the LinkedIn code to reparse any new profile url's
            if (IN && typeof IN.parse === 'function') {
                IN.parse();
            }
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Linkedincompanyprofile = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.LinkedincompanyprofileProperties,
            methods: BaseKit.Widget.LinkedincompanyprofileMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetLinkedincompanyprofile = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Linkedincompanyprofile(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Linkedinprofile = {};

    BaseKit.Widget.LinkedinprofileProperties = {};

    BaseKit.Widget.LinkedinprofileMethods = {
        construct: function (el, options) {
            this.options = options;

            // check to see if we have already l;oaded the linkinin API
            if (Site.Page.Globals.linkinInAPILoaded === undefined || Site.Page.Globals.linkinInAPILoaded === null) {
                Site.Page.Globals.linkinInAPILoaded = false;
            }

            this.load();
        },

        load: function () {
            var that = this;

            // This dynamically injects the linkedin script into the body
            if (Site.Page.Globals.linkinInAPILoaded === false && bk$('#linkinedin-widget-script').length === 0) {
                bk$.getScript("//platform.linkedin.com/in.js?suppressWarnings=true", function () {
                    bk$(this).attr('id', 'linkinedin-widget-script');
                    Site.Page.Globals.linkinInAPILoaded = true;
                });
            } else {
                this.rebuild();
            }
        },

        attachEvents: function () {
            this.rebuild();
        },

        /**
         * tells the linked IN object to reparse itself, thus rendereding the iframe inside
         */
        rebuild: function () {
            // this is needed to force the LinkedIn code to reparse any new profile url's
            if (IN && typeof IN.parse === 'function') {
                IN.parse();
            }
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Linkedinprofile = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.LinkedinprofileProperties,
            methods: BaseKit.Widget.LinkedinprofileMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetLinkedinprofile = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Linkedinprofile(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Logo = null;

    BaseKit.Widget.LogoProperties = {
    };

    BaseKit.Widget.LogoMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Logo = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.LogoProperties,
            methods: BaseKit.Widget.LogoMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetLogo = function (options) {
        this.each(function (index, el) {
            var obj = null;
            obj = new BaseKit.Widget.Logo(el, options);
            bk$(el).data('bkob', obj);
        });
    };
}());(function () {
    BaseKit.Widget.Map = {};

    BaseKit.Widget.MapProperties = {
        zoom: 12,
        zoomControl: true,
        height: 150, // MB: default height
        address: 'profile',
        latitude: '51.50959718054336',
        longitude: '-0.12668609619140625', // HC: in case the profile is empty
        markerPath: '/apps/images/mobile/map-marker.png'
    };

    BaseKit.Widget.MapMethods = {
        construct: function (el, options) {
            // stores the current map
            this.gmap = null;

            // stores the main marker
            this.marker = null;

            if (window.mapReady === undefined) {
                window.mapReady = function () {
                    Site.Page.Globals.mapsAPILoaded = true;
                };
            }

            // set the global google map property for checking to see if the
            // map api has been loaded
            if (Site.Page.Globals.mapsAPILoaded === undefined || Site.Page.Globals.mapsAPILoaded === null) {
                Site.Page.Globals.mapsAPILoaded = false;
            }

            this.load();
        },

        load: function () {
            var t = false,
                that = this,
                script;

            // get around the map is not centering on changing the device orientation
            this.onResize = function () {
                if (t !== false) {
                    clearTimeout(t);
                }
                t = setTimeout(function () {
                    that.resetMap();
                }, 300);
            }
            bk$(window).on('resize', this.onResize);

            // if no maps have yet been loaded, then try to load one
            if (Site.Page.Globals.mapsAPILoaded === false && bk$('#gmaps-widget-script').length === 0) {
                // This dynamically injects the googlemaps into the body
                script = document.createElement("script");
                script.type = "text/javascript";
                script.id = "gmaps-widget-script";
                script.src = "https://maps.google.com/maps/api/js?sensor=false&callback=mapReady&language=" + App.session.get('languageCode');

                // append to the body
                document.body.appendChild(script);
            }

            // do checking to see if any maps are loaded yet
            this.isMapReady();
        },

        isMapReady: function () {
            var that = this;

            if (Site.Page.Globals.mapsAPILoaded === false) {
                setTimeout(function () {
                    that.isMapReady();
                }, 100);
            } else {
                if (this.get('address') === 'profile' && Profile.get('postalcode').length > 0) {
                    this.findAddress({
                        source: 'profile',
                        value: Profile.get('postalcode')
                    }, this.postFindAddress, this);
                } else {
                    this.findAddress({
                        source: 'custom',
                        value: this.get('address')
                    }, this.postFindAddress, this);
                }
            }
        },

        setupMap: function () {
            // map options
            var mapOptions = {
                zoom: parseInt(this.get('zoom'), 10),
                center: new google.maps.LatLng(parseFloat(this.get('latitude'), 10),
                    parseFloat(this.get('longitude'), 10)),
                scaleControl: false,
                mapTypeControl: false,
                overviewMapControl: false,
                zoomControl: !!(this.get('zoomControl')),
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.DEFAULT
                },
                panControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            // MB: set the height
            // HC: we need to set the height before rendering the map to make sure the map is in the center
            bk$(this.el).find('.map').height(this.get('height'));

            // set the map
            this.gmap = new google.maps.Map(bk$(this.el).find('.map').get(0), mapOptions);
            this.resetMap();
        },

        /**
         * Centres the map on the new coordinates
         */
        resetMap: function (markerDraggable) {
            var newCenter = null;

            // make sure the maps has been loaded
            if (this.gmap !== null && Site.Page.Globals.mapsAPILoaded === true) {
                bk$(this.el).find('.map').height(this.get('height'));

                // NOTE: Google Maps is fussy - needs parseFloat calls!
                newCenter = new google.maps.LatLng(
                    parseFloat(this.get('latitude'), 10),
                    parseFloat(this.get('longitude'), 10)
                );

                // reset the map
                this.gmap.setZoom(parseInt(this.get('zoom'), 10));
                this.gmap.setCenter(newCenter);

                // create  an new map marker at this point
                this.createMapMarker(
                    parseFloat(this.get('latitude'), 10),
                    parseFloat(this.get('longitude'), 10),
                    markerDraggable || false
                );
            }
        },

        /**
         * createMapMarker: creates a marker on the map at the passed co-ordinates
         * @param <integer> latitude - the latitude to position the marker
         * @param <integer> longitude - the longitude to position the marker
         * @param <boolean> draggable - can the marker be dragged
         */
        createMapMarker: function (latitude, longitude, draggable) {
            var icon = new google.maps.MarkerImage(App.session.get('assetBaseUrl') + this.get('markerPath'),
                    new google.maps.Size(32, 32), null,
                    new google.maps.Point(16, 32),
                    new google.maps.Size(32, 32));

            // add the marker if one is not yet defined
            if (this.marker === null) {
                // create a new marker
                this.marker = new google.maps.Marker({
                    icon: icon,
                    bouncy: true,
                    draggable: false,
                    autoPan: true,
                    position: new google.maps.LatLng(latitude, longitude)
                });

                // assign it to the current map
                this.marker.setMap(this.gmap);
            } else {
                // remove it from the current map and update the pos
                this.marker.setMap(null);
                this.marker.draggable = draggable || false;
                this.marker.setPosition(new google.maps.LatLng(latitude, longitude));

                // assign it to the current map
                this.marker.setMap(this.gmap);
            }
        },

        /**
         * tries to find the address specified
         * @param <object> address - the address details and the type of search
         * @param <function> callback
         * @param <object> scope
         */
        findAddress: function (address, callback, scope) {
            if (typeof (address) === "undefined" || typeof (address) !== "object") {
                throw new Error('findAddress param address error');
            }
            if (typeof (callback) === "undefined" || typeof (callback) !== "function") {
                throw new Error('findAddress param callback error');
            }
            if (typeof (scope) === "undefined" || typeof (scope) !== "object") {
                throw new Error('findAddress scope callback error');
            }

            var that = this,
                geoOptions = {
                    'address': null,
                    'region': "ISO 3166-1"
                },
                results = {};

            if (!this.geocoder) {
                this.geocoder = new google.maps.Geocoder();
            }

            geoOptions.address = address.value || '';

            this.geocoder.geocode(geoOptions, function (result, status) {
                if (status === google.maps.GeocoderStatus.OK && result.length) {
                    results = {
                        latitude: result[0].geometry.location.lat(),
                        longitude: result[0].geometry.location.lng()
                    };
                } else {
                    // HC: if it's a bad or empty postalcode, use the defualt one
                    results = {
                        latitude: that.get('latitude'),
                        longitude: that.get('longitude')
                    };
                }

                results.address = (address.source && address.source === 'profile') ? 'profile' : address.value;
                results.postalcode = (address.source && address.source === 'profile') ? address.value : '';

                // RH: Call the callback
                callback.apply(scope, [results]);
            });
        },

        /**
         * postFindAddress: sets the valuse as temporary and resets map
         * @param <object> results - contains lat, lng, address, postalcode(for profile)
         */
        postFindAddress: function (results) {
            if (typeof (results) === "undefined" || typeof (results) !== "object") {
                throw new Error('settingsPostFindAddress parameter error: expecting a object');
            }

            this.set('latitude', results.latitude, true);
            this.set('longitude', results.longitude, true);
            this.set('address', results.address, true);

            // HC: now sets up the map with the location data
            this.setupMap();
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Map = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.MapProperties,
            methods: BaseKit.Widget.MapMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetMap = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Map(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.MenuProperties = {
    };

    BaseKit.Widget.MenuMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Menu = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.MenuProperties,
            methods: BaseKit.Widget.MenuMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetMenu = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Menu(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.MenusectionsProperties = {
    };

    BaseKit.Widget.MenusectionsMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        attachEvents: function () {
            var that = this,
                thisEl = bk$(this.el),
                anchorEl = thisEl.find('.menu-section-list a'),
                menuEl = bk$(document).find('.widget.menu');

            anchorEl.on('click.selectSection', function (e) {
                if (menuEl.length > 0) {
                    that.updateMenuSectionClass(bk$(this).attr('href'));
                }
            });

            this.menuDropdownEvent();
        },

        updateMenuSectionClass: function (sectionId) {
            var menuEl = bk$(document).find('.widget.menu'),
                sectionEls = menuEl.find('.main');

            if (sectionEls.length > 0) {
                bk$.each(sectionEls, function (index, item) {
                    bk$(item).removeClass('selected');
                });
            }

            menuEl.find(sectionId).addClass('selected');
        },

        menuDropdownEvent: function () {
            var that = this,
                thisEl = bk$(this.el),
                pullEl = thisEl.find('.menu-pull'),
                menuListEl = thisEl.find('.menu-section-list');

            pullEl.off('click').on('click', function (e) {
                e.preventDefault();
                if (!bk$('body').hasClass('edit')) {
                    if (menuListEl.is(':visible')) {
                        menuListEl.hide();
                    } else {
                        menuListEl.show();
                    }
                }
            });

            this.menuToggle();

            bk$(window).on('resize orientationchange', function () {
                that.menuToggle();
            });
        },

        menuToggle: function () {
            var w = bk$(window).width(),
                menuListEl = bk$(this.el).find('.menu-section-list');

            if (w > 320 && menuListEl.is(':hidden')) {
                menuListEl.removeAttr('style');
            }
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Menusections = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.MenusectionsProperties,
            methods: BaseKit.Widget.MenusectionsMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetMenusections = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Menusections(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Navigation = null;

    BaseKit.Widget.NavigationProperties = {
        align: 'center',
        icons: []
    };

    BaseKit.Widget.NavigationMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Navigation = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.NavigationProperties,
            methods: BaseKit.Widget.NavigationMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetNavigation = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Navigation(el, options));
        });
    };
}());(function () {

    BaseKit.Widget.Parkinglogin = null;

    BaseKit.Widget.ParkingloginProperties = {
    };

    BaseKit.Widget.ParkingloginMethods = {
        construct: function (el, options) {
            this.options = options;
        }
    };

    BaseKit.Widget.Parkinglogin = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ParkingloginProperties,
            methods: BaseKit.Widget.ParkingloginMethods
        });
    };

    bk$.fn.basekitWidgetParkinglogin = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Parkinglogin(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Paypalbuynow = null;

    BaseKit.Widget.PaypalbuynowProperties = {
        paypalbuynow_text: App.t('widgets.paypalbuynow.text', 'Buy Now'),
        paypalbuynow_purchaseurl: '',
        paypalbuynow_businessemail: Profile.get('paypalbuynow_businessemail'),
        paypalbuynow_currency: Profile.get('paypalbuynow_currency'),
        paypalbuynow_productname: App.t('widgets.paypalbuynow.productname_default', 'My awesome product'),
        paypalbuynow_productprice: 0.00,
        paypalbuynow_shipping: 0.00,
        paypalbuynow_languagecode: 'en'
    };

    BaseKit.Widget.PaypalbuynowMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Paypalbuynow = function () {
        BaseKit.Widget.PaypalbuynowProperties.paypalbuynow_purchaseurl = App.session.get('paypalUrl');
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.PaypalbuynowProperties,
            methods: BaseKit.Widget.PaypalbuynowMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetPaypalbuynow = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Paypalbuynow(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.ProfileProperties = {
        'profileType': 'twitter',

        // address properties
        'address': 'profile',
        'address1': 'profile',
        'address2': 'profile',
        'country': 'profile',
        'addressPostalCode': 'profile',

        'email': 'profile',
        'headline': 'profile',
        'strapline': 'profile',
        'companydescription': 'profile',
        'phone': 'profile',
        'business': 'profile',
        'copyright': 'profile',

        // twitter properties
        'twitter': 'profile',
        'refreshtime': '1800000',
        'defaultTwitter': 'BaseKit',

        // map properties
        'mapZoom': 12,
        'mapHeight': 150, // MB: default height
        'mapAddress': 'profile',
        'latitude': '51.50959718054336',
        'longitude': '-0.12668609619140625', // HC: in case the profile is empty

        // single email form properties
        'formText':         App.t('widgets.contactform.default_button_text', 'Send'),
        'formTitle':        App.t('widgets.contactform.default_title', 'Contact Form'),

        // social icons 
        'socialIconsLinkedin':   'profile',
        'socialIconsTwitter':    'profile',
        'socialIconsFacebook':   'profile',
        'socialIconsRss':        'profile',
        'socialIconsGoogleplus': 'profile',
        'socialIconsYoutube':    'profile'
    };

    BaseKit.Widget.ProfileMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            this.attachProfileEvents();
        },

        attachProfileEvents: function () {
            switch (this.get('profileType')) {
            case 'twitter':
                this.initialTwitter();
                break;
            case 'map':
                this.initialMap();
                break;
            case 'form':
                this.initialForm();
                break;
            default:
                break;
            }
        },

        initialForm: function () {
            var that = this,
                thisEl = bk$(this.el),
                url = '/site/' + App.session.get('siteRef') + '/submit-form',
                data = {};

            // override the submit event on the form
            thisEl.find('form').on('submit', function (e) {
                e.preventDefault();

                // set the form data
                data = {
                    'emailFrom': thisEl.find('.email').val(),
                    'message': '', // HC: we have to have the data field to make the call
                    'useProfile': 1,
                    'formTitle': that.get('formTitle'),
                    'widgetId': thisEl.attr('id')
                };

                if (thisEl.find('.overlay').length > 0) {
                    thisEl.find('.overlay').removeClass('fail success');
                }

                // submit the form using the api
                bk$.ajax({
                    url: url,
                    type: "POST",
                    data: data,
                    beforeSend: function () {
                        that.showMessageBox();
                    },
                    success: function () {
                        if (that.get('goalUrl')) {
                            //redirect the window location
                            window.location = that.get('goalUrl');
                        } else {
                            that.showText(true);
                            that.removeMessageBox();
                        }
                    },
                    error: function () {
                        that.showText();
                        that.removeMessageBox();
                    }
                });
            });
        },

        /**
         * showText: shows the message text depends on the status
         * @param <boolean>  isSuccess
         */
        showText: function (isSuccess) {
            var message = null,
                thisEl = bk$(this.el),
                className = null;

            if (thisEl.find('.message-box').length > 0) {
                thisEl.find('.message-box').remove();
            }

            if (isSuccess) {
                message = App.t('widgets.form.success', 'Message sent successfully.');
                className = 'success';
            } else {
                message = App.t('widgets.form.failed', 'Submit failed.');
                className = 'fail';
            }

            thisEl.find('.overlay').addClass(className).append('<div class="message-box"><span class="message-text">' + message + '</span></div>');
        },

        showMessageBox: function () {
            var thisEl = bk$(this.el),
                overlay = bk$('<div class="overlay"></div>'),
                formEl = thisEl.find('form');

            if (thisEl.find('.overlay').length === 0) {
                thisEl.append(overlay);
            }

            if (formEl.length > 0) {
                formEl.addClass('submitting');
            }
        },

        removeMessageBox: function () {
            var thisEl = bk$(this.el),
                t = null,
                formEl = thisEl.find('form');

            if (formEl.length > 0) {
                formEl.removeClass('submitting');
            }

            thisEl.find('.email').val('');

            t = setTimeout(function () {
                clearTimeout(t);
                thisEl.find('.overlay').fadeOut(function () {
                    bk$(this).remove();
                });
            }, 3000);
        },

        initialMap: function () {

            // stores the current map
            this.gmap = null;

            // stores the main marker
            this.marker = null;

            if (window.mapReady === undefined) {
                window.mapReady = function () {
                    Site.Page.Globals.mapsAPILoaded = true;
                };
            }

            // set the global google map property for checking to see if the
            // map api has been loaded
            if (Site.Page.Globals.mapsAPILoaded === undefined || Site.Page.Globals.mapsAPILoaded === null) {
                Site.Page.Globals.mapsAPILoaded = false;
            }

            this.loadMap();
        },

        loadMap: function () {
            // if no maps have yet been loaded, then try to load one
            if (Site.Page.Globals.mapsAPILoaded === false && bk$('#gmaps-widget-script').length === 0) {
                // This dynamically injects the googlemaps into the body
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.id = "gmaps-widget-script";
                script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=mapReady&language=" + App.session.get('languageCode');

                // append to the body
                document.body.appendChild(script);
            }

            // do checking to see if any maps are loaded yet
            this.isMapReady();
        },

        isMapReady: function () {
            var that = this;

            if (Site.Page.Globals.mapsAPILoaded === false) {
                setTimeout(function () {
                    that.isMapReady();
                }, 100);
            } else {

                if (this.get('mapAddress') === 'profile' && Profile.get('postalcode').length > 0) {
                    this.findAddress({
                        source: 'profile',
                        value: Profile.get('postalcode')
                    }, this.postFindAddress, this);
                } else {
                    // reset the map display with all the other options
                    this.findAddress({
                        source: 'custom',
                        value: this.get('mapAddress')
                    }, this.postFindAddress, this);
                }
            }
        },

        setupMap: function () {
            // map options
            var mapOptions = {
                zoom: parseInt(this.get('mapZoom'), 10),
                center: new google.maps.LatLng(parseFloat(this.get('latitude'), 10),
                    parseFloat(this.get('longitude'), 10)),
                scaleControl: false,
                mapTypeControl: false,
                overviewMapControl: false,
                zoomControl: false,
                panControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            // MB: set the map Height
            // HC: we need to set the height before rendering the map to make sure the map is in the center
            bk$(this.el).find('.map').height(this.get('mapHeight'));

            // set the map
            this.gmap = new google.maps.Map(bk$(this.el).find('.map').get(0), mapOptions);

            // refresh the map
            this.resetMap();
        },

        /**
         * Centres the map on the new coordinates
         */
        resetMap: function (markerDraggable) {
            var newCenter = null;

            // make sure the maps has been loaded
            if (this.gmap !== null && Site.Page.Globals.mapsAPILoaded === true) {
                bk$(this.el).find('.map').height(this.get('mapHeight'));

                // NOTE: Google Maps is fussy - needs parseFloat calls!
                newCenter = new google.maps.LatLng(
                    parseFloat(this.get('latitude'), 10),
                    parseFloat(this.get('longitude'), 10)
                );

                // reset the map
                this.gmap.setZoom(parseInt(this.get('mapZoom'), 10));
                this.gmap.setCenter(newCenter);

                // create an new map marker at this point
                this.createMapMarker(
                    parseFloat(this.get('latitude'), 10),
                    parseFloat(this.get('longitude'), 10),
                    markerDraggable || false
                );
            }
        },

        /**
         * createMapMarker: creates a marker on the map at the passed co-ordinates
         * @param <integer> latitude - the latitude to position the marker
         * @param <integer> longitude - the longitude to position the marker
         * @param <boolean> draggable - can the marker be dragged
         */
        createMapMarker: function (latitude, longitude, draggable) {
            var icon = new google.maps.MarkerImage(App.session.get('assetBaseUrl') + '/apps/images/mobile/map-marker.png',
                    new google.maps.Size(32, 32), null,
                    new google.maps.Point(16, 32),
                    new google.maps.Size(32, 32));

            // add the marker if one is not yet defined
            if (this.marker === null) {
                // create a new marker
                this.marker = new google.maps.Marker({
                    icon: icon,
                    bouncy: true,
                    draggable: false,
                    autoPan: true,
                    position: new google.maps.LatLng(latitude, longitude)
                });

                // assign it to the current map
                this.marker.setMap(this.gmap);
            } else {
                // remove it from the current map and update the pos
                this.marker.setMap(null);
                this.marker.draggable = draggable || false;
                this.marker.setPosition(new google.maps.LatLng(latitude, longitude));

                // assign it to the current map
                this.marker.setMap(this.gmap);
            }
        },

        /**
         * tries to find the address specified
         * @param <object> address - the address details and the type of search
         * @param <function> callback
         * @param <object> scope
         */
        findAddress: function (address, callback, scope) {
            if (typeof address === "undefined" || typeof address !== "object") {
                throw new Error('findAddress param address error');
            }
            if (typeof callback === "undefined" || typeof callback !== "function") {
                throw new Error('findAddress param callback error');
            }
            if (typeof scope === "undefined" || typeof scope !== "object") {
                throw new Error('findAddress scope callback error');
            }

            var that = this,
                geoOptions = {
                    'address': null,
                    'region': "ISO 3166-1"
                },
                results = {};

            if (!this.geocoder) {
                this.geocoder = new google.maps.Geocoder();
            }

            geoOptions.address = address.value || '';

            this.geocoder.geocode(geoOptions, function (result, status) {
                if (status === google.maps.GeocoderStatus.OK && result.length) {
                    results = {
                        latitude: result[0].geometry.location.lat(),
                        longitude: result[0].geometry.location.lng()
                    };
                } else {
                    // HC: if it's a bad or empty postalcode, use the defualt one
                    results = {
                        latitude: that.get('latitude'),
                        longitude: that.get('longitude')
                    };
                }

                results.address = (address.source && address.source === 'profile') ? 'profile' : address.value;
                results.postalcode = (address.source && address.source === 'profile') ? address.value : '';

                callback.apply(scope, [results]);
            });
        },

        /**
         * postFindAddress: sets the valuse as temporary and resets map
         * @param <object> results - contains lat, lng, address, postalcode(for profile)
         */
        postFindAddress: function (results) {
            if (typeof results === "undefined" || typeof results !== "object") {
                throw new Error('settingsPostFindAddress parameter error: expecting a object');
            }

            this.set('latitude', results.latitude, true);
            this.set('longitude', results.longitude, true);
            this.set('mapAddress', results.address, true);

            this.setupMap();
        },

        /**
         * initialTwitter: initial the twitter type profile
         */
        initialTwitter: function () {
            this.refreshTimeline();
            this.getAndUpdateTweet();
        },

        /**
         * refreshTimeline: set the interval for refreshing the timeline twitter feed
         */
        refreshTimeline: function () {
            var that = this,
                // Default to every 30 mins
                refreshtime = (this.get('refreshtime') > 0 ? parseInt(this.get('refreshtime'), 10) : 1800000);

            // clean the interval
            if (this.refreshInterval !== '') {
                window.clearInterval(this.refreshInterval);
                this.refreshInterval = '';
            }

            this.refreshInterval = window.setInterval(function () {
                try {
                    //api get new data
                    that.getAndUpdateTweet();
                } catch (err) {
                    clearInterval(that.refreshInterval);

                    //throw error
                    console.log(err);
                }
            }, refreshtime);
        },

        /**
         * getAndUpdateTweet: it gets the tweet feed and updates the view
         */
        getAndUpdateTweet: function () {
            var that = this,
                url = '/site/fetch-feed',
                createdDate = null,
                tweetData = [],
                data = {
                    'count': 1,
                    'includeRts': true, // if we don't have settings for it then turn it on, other wise it might return nothing if the latest tweet is retweeted 
                    'searchKey': this.get('twitter') === 'profile' ? Profile.get('twitter') : this.get('twitter'),
                    'searchType': 'username'
                };

            // HC: when the profile twitter or searchKey is empty we use the defaultSearchKey
            // for retriving the tweets
            if ((this.get('twitter') === 'profile' && (Profile.get('twitter') === null || Profile.get('twitter').length === 0)) || (this.get('twitter') === null || this.get('twitter').length === 0)) {
                data.searchKey = this.get('defaultTwitter');
            }

            // get twitter feed
            bk$.ajax({
                url: url,
                type: "POST",
                data: data
            }).done(function (response, status) {
                if (status === 'success') {
                    // format data
                    bk$.each(response, function () {

                        // format created data
                        createdDate = this.created_at;
                        createdDate = createdDate.split(" ");

                        tweetData.push({
                            'screenName': this.user.screen_name,
                            'createdAt': createdDate[2] + '/' + createdDate[1] + '/' + createdDate[5],
                            'fullName': this.user.name,
                            'imageUrl': this.user.profile_image_url,
                            'source': this.source,
                            'text': this.text
                        });
                    });

                    that.set('tweets', tweetData, true);

                    // rerender widget
                    that.rerender();
                }
            }).fail(function () {
                that.set('tweets', [], true);

                that.el.find('.twitter').html('<p>No tweets found!</p>');
            });
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Profile = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ProfileProperties,
            methods: BaseKit.Widget.ProfileMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetProfile = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Profile(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Redirecttodesktop = null;

    BaseKit.Widget.RedirecttodesktopProperties = {
        text: App.t('widgets.redirecttodesktop.default_text', 'Switch to desktop'),
        url: ''
    };

    BaseKit.Widget.RedirecttodesktopMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Redirecttodesktop = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.RedirecttodesktopProperties,
            methods: BaseKit.Widget.RedirecttodesktopMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetRedirecttodesktop = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Redirecttodesktop(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Resetpassword = null;

    BaseKit.Widget.ResetpasswordProperties = {
        text: App.t('widgets.resetpassword.save_new_password', 'Save'),
        label: App.t('widgets.resetpassword.new_password', 'Choose your new password')
    };

    BaseKit.Widget.ResetpasswordMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            this.attachEvents();
        },

        attachEvents: function () {
            var that = this,
                thisEl = bk$(this.el);

            this.toggleShowHidePassword();

            thisEl.find('form').on('submit', function (e) {
                e.preventDefault();

                // return if the password is empty
                if (thisEl.find('.password').val().length === 0) {
                    return;
                }

                bk$.ajax({
                    type: 'POST',
                    url: 'site/api/auth-token',
                    async: false
                }).done(function (response) {
                    var data = {
                        hash: App.getParam('h'),
                        password: thisEl.find('.password').val(),
                        token: response.token
                    };

                    bk$.ajax({
                        url: '/site/api/reset-password',
                        type: 'POST',
                        data: data,
                        beforeSend: function () {
                            that.showMessageBox();
                        }
                    }).always(function () {
                        that.removeMessageBox();
                    }).done(function (response) {
                        var message = App.t('widgets.resetpassword.success', 'Password successfully changed.'),
                            onTimeout;

                        onTimeout = function () {
                            window.location = '/' + that.get('completionPage');
                        };

                        that.showText(true, message);
                        setTimeout(onTimeout, 2000);
                    }).fail(function (response) {
                        var errors = App.getErrorsFromResponse(response),
                            message = null;

                        bk$.each(errors, function (i, value) {
                            if (value.field === 'hash') {
                                message = value.message;
                                return;
                            }
                        });

                        if (message) {
                            that.showText(false, message);
                        } else {
                            that.showText(false, App.t('widgets.resetpassword.failed', 'Submit failed.'));
                        }
                    });
                }).fail(function (response) {
                    var message = App.t('widgets.resetpassword.auth_fail', 'Failed to get authentication token');
                    that.showText(true, message);
                });
            });
        },

        toggleShowHidePassword: function () {
            var thisEl = bk$(this.el),
                passwordInputEl = thisEl.find('.password');

            thisEl.find('.password-mask-toggle').on('click', function () {
                if (passwordInputEl[0].type === 'password') {
                    passwordInputEl[0].type = 'text';
                    passwordInputEl.attr('autocapitalize', 'off').attr('autocorrect', 'off').attr('spellcheck', 'false');
                    bk$(this).text(App.t('widgets.resetpassword.hide', 'Hide'));
                } else {
                    passwordInputEl[0].type = 'password';
                    passwordInputEl.removeAttr('autocapitalize').removeAttr('autocorrect').removeAttr('spellcheck');
                    bk$(this).text(App.t('widgets.resetpassword.show', 'Show'));
                }
            });
        },

        /**
         * showText: shows the message text depends on the status
         * @param <boolean>  isSuccess
         */
        showText: function (isSuccess, message) {
            var thisEl = bk$(this.el),
                className = null;

            if (thisEl.find('.message-box').length > 0) {
                thisEl.find('.message-box').remove();
            }

            if (isSuccess) {
                className = 'success';
            } else {
                className = 'fail';
            }

            thisEl.find('.overlay').addClass(className).append('<div class="message-box"><span class="message-text">' + message + '</span></div>');
        },

        showMessageBox: function () {
            var thisEl = bk$(this.el),
                overlay = bk$('<div class="overlay"></div>');

            if (thisEl.find('.overlay').length === 0) {
                thisEl.append(overlay);
            }
        },

        removeMessageBox: function () {
            var thisEl = bk$(this.el),
                t = null;

            t = setTimeout(function () {
                clearTimeout(t);
                thisEl.find('.overlay').fadeOut(function () {
                    thisEl.find('.email, .message').val('');
                    bk$(this).remove();
                });
            }, 3000);
        }
    };

    BaseKit.Widget.Resetpassword = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ResetpasswordProperties,
            methods: BaseKit.Widget.ResetpasswordMethods
        });
    };

    bk$.fn.basekitWidgetResetpassword = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Resetpassword(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Responsivecolumns = null;

    BaseKit.Widget.ResponsivecolumnsProperties = {
        selectable: 0,
        isEmpty: 1,
        columns: 0
    };

    BaseKit.Widget.ResponsivecolumnsMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            this.hideEmptyColumns();
        },

        hideEmptyColumns: function () {
            if (!bk$('body').hasClass('edit') && this.get('isEmpty') && this.get('isEmpty') === '1') {
                bk$(this.el).find('.tip-message, #select-columns-num').hide();
            }
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Responsivecolumns = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ResponsivecolumnsProperties,
            methods: BaseKit.Widget.ResponsivecolumnsMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetResponsivecolumns = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Responsivecolumns(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Responsiveslideshow = null;

    BaseKit.Widget.ResponsiveslideshowProperties = {
        aspect: 75,
        crop: 0,
        scale: 'zoom',
        duration: 3,
        transSpeed: 1000,
        transType: 'fade',
        showButtons: true,
        showBullets: true,
        allowPause: false,
        allowLoop: true,
        showTitle: 1,
        showDescription: 1,
        albumRef: 0,
        images: []
    };

    BaseKit.Widget.ResponsiveslideshowMethods = {
        construct: function (el, options) {
            this.load();
            this.paused = false;
            this.stopSlide = false;
        },

        load: function () {
            var editor = bk$('body').hasClass('edit'),
                albumArray = this.get('albumRef') > 0 ? Server.plugins.assets.albums[this.get('albumRef')] : this.get('images');

            if ((albumArray && (albumArray.length > 0)) || this.properties.changed.album) {
                this.attachEvents();
            }

            if (!editor) {
                this.startSlideShow(0);
            }
        },

        attachEvents: function () {

            var that = this,
                ref = bk$(this).data('ref'),
                thisEl = bk$(this.el),
                imageArray = this.get('albumRef') > 0 ? Server.plugins.assets.albums[this.get('albumRef')] : this.get('images');

            if (imageArray && imageArray.length === 1) {
                thisEl.find('.btn-play').hide();
                thisEl.find('.btn-prev').hide();
                thisEl.find('.btn-next').hide();
                return;
            }

            thisEl.find('.btn-play').on('click', function () {
                ref = bk$(this).data('ref');

                if (bk$(this).hasClass('pause')) {
                    that.pauseSlideShow();
                    return;
                }

                if (bk$(this).attr('disabled') === 'disabled') {
                    return;
                }

                that.playSlideShow(ref);
            });

            thisEl.find('.slide-ctrl').on('click', function () {
                ref = bk$(this).data('ref');

                that.handleSlideNavigation(ref);
            });
        },

        handleSlideNavigation: function (ref) {
            var that = this,
                duration = Math.round(this.get('duration') * 1000),
                timer;

            this.stopSlideShow();
            this.setSlide(ref);

            timer = setTimeout(function () {
                that.startSlideShow(ref);
            }, duration);

            bk$('.slide-ctrl').on('click', function () {
                clearTimeout(timer);
            });
        },

        startSlideShow: function (ref) {
            if (bk$('body').hasClass('edit')) {
                return;
            }

            this.stopSlide = false;
            this.setNextSlide(ref);
        },

        stopSlideShow: function () {
            var elAll = bk$(this.el).find('.slideshow-image-item');

            elAll.stop(true, true);
            this.stopSlide = true;
        },

        setSlide: function (ref) {
            var thisEl = bk$(this.el),
                currentSlide = thisEl.find('.slideshow-image-item.current'),
                newSlide = thisEl.find('.slideshow-image-item[data-ref="' + ref + '"]'),
                newImage = newSlide.find('.slideshow-image');

            currentSlide.removeClass('current');
            newSlide.addClass('current');
            thisEl.find('.slideshow-image-item').removeAttr('style');
            this.setSlideInfo(ref);
        },

        setSlideInfo: function (ref) {
            var el = bk$(this.el),
                imageArray = this.get('albumRef') > 0 ? Server.plugins.assets.albums[this.get('albumRef')] : this.get('images'),
                lastImg = imageArray.length - 1,
                next = ref + 1,
                prev = ref - 1;

            if (next === imageArray.length) {
                next = 0;
            }

            if (ref === 0) {
                prev = lastImg;
            }

            el.find('.dot').removeClass('selected');
            el.find('.dot[data-ref=' + ref + ']').addClass('selected');
            el.find('.btn-prev').data('ref', prev);
            el.find('.btn-next').data('ref', next);
            el.find('.btn-play').data('ref', ref);

            if ((prev === lastImg) && !this.get('allowLoop')) {
                el.find('.btn-prev').addClass('disabled').attr('disabled', true);
            } else {
                el.find('.btn-prev').removeClass('disabled').removeAttr('disabled');
            }

            if ((next === 0) && !this.get('allowLoop')) {
                el.find('.btn-next').addClass('disabled').attr('disabled', true);
            } else {
                el.find('.btn-next').removeClass('disabled').removeAttr('disabled');
            }
        },

        playSlideShow: function (ref) {
            bk$(this.el).find('.btn-play').addClass('pause');
            this.stopSlide = false;
            this.paused = false;

            this.setNextSlide(ref);
        },

        pauseSlideShow: function () {
            bk$(this.el).find('.btn-play').removeClass('pause');
            this.stopSlide = true;
            this.paused = true;
        },

        setNextSlide: function (currentSlide) {
            var that = this,
                duration = this.get('duration') * 1000,
                imageArray = this.get('albumRef') > 0 ? Server.plugins.assets.albums[this.get('albumRef')] : this.get('images'),
                lastImg = imageArray.length - 1,
                t = null;

            if (this.stopSlide || this.paused || (currentSlide === lastImg && (!this.get('allowLoop')))) {
                return;
            }

            t = setTimeout(function () {
                clearTimeout(t);
                that.animate(currentSlide);
            }, duration);
        },

        animate: function (slideFromRef, slideToRef) {
            var that = this,
                thisEl = bk$(this.el),
                timing = parseInt(this.get('transSpeed'), 10),
                elEffect = this.get('transType'),
                elOut,
                elIn,
                t,
                elInImg,
                next = slideFromRef + 1,
                imageArray = this.get('albumRef') > 0 ? Server.plugins.assets.albums[this.get('albumRef')] : this.get('images');

            if (this.stopSlide || this.paused) {
                return;
            }

            // HC: the last image
            if (next === imageArray.length) {
                next = 0;
            }

            slideToRef = slideToRef || next;

            elOut   = thisEl.find('.slideshow-image-item[data-ref=' + slideFromRef + ']');
            elIn    = thisEl.find('.slideshow-image-item[data-ref=' + slideToRef + ']');
            elInImg = bk$(elIn).find('.slideshow-image');

            function callbackOut() {
                that.setSlideInfo(slideToRef);
            }

            function callbackIn() {
                that.setNextSlide(slideToRef);
            }

            switch (elEffect) {
            case 'fade':
                timing = timing / 2;
                elOut.fadeOut(timing, callbackOut);

                t = setTimeout(function () {
                    clearTimeout(t);
                    elIn.fadeIn(timing, callbackIn);
                }, timing);

                t = setTimeout(function () {
                    clearTimeout(t);
                    elOut.removeClass('current');
                    elIn.addClass('current');
                }, timing * 2);
                break;

            case 'dissolve':
                callbackOut();
                elOut.fadeOut(timing);
                elIn.fadeIn(timing, callbackIn);
                t = setTimeout(function () {
                    clearTimeout(t);
                    elOut.removeClass('current');
                    elIn.addClass('current');
                }, timing);
                break;

            default:

                callbackOut();
                elOut.removeClass('current');
                elIn.addClass('current');
                callbackIn();
                break;
            }
        }
    };

    // Base Widget Functionality - What ever is required 
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Responsiveslideshow = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.ResponsiveslideshowProperties,
            methods: BaseKit.Widget.ResponsiveslideshowMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetResponsiveslideshow = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Responsiveslideshow(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Signupform = null;

    BaseKit.Widget.SignupformProperties = {
        email: 'profile',
        label: App.t('widgets.signupform.email', 'Your Email'),
        text: App.t('widgets.signupform.default_button_text', 'Send'),
        formTitle: App.t('widgets.signupform.default_title', 'Signup Form')
    };

    BaseKit.Widget.SignupformMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        /**
         * attachEvents: attach the send email event
         */
        attachEvents: function () {
            var that = this,
                thisEl = bk$(this.el),
                url = '/site/' + App.session.get('siteRef') + '/submit-form',
                data = {};

            // override the submit event on the form
            thisEl.find('form').on('submit', function (e) {
                e.preventDefault();

                // set the form data
                data = {
                    'emailFrom': thisEl.find('.email').val(),
                    'useProfile': that.get('email') === "profile" ? 1 : 0,
                    'widgetId': thisEl.attr('id'),
                    'formTitle': that.get('formTitle')
                };

                // submit the form using the api
                bk$.ajax({
                    url: url,
                    type: "POST",
                    data: data,
                    beforeSend: function () {
                        that.showMessageBox();
                    },
                    success: function () {
                        if (that.get('goalUrl')) {
                            //redirect the window location
                            window.location = that.get('goalUrl');
                        } else {
                            that.showText(true);
                            that.removeMessageBox();
                        }
                    },
                    error: function () {
                        that.showText();
                        that.removeMessageBox();
                    }
                });
            });
        },

        /**
         * showText: shows the message text depends on the status
         * @param <boolean>  isSuccess
         */
        showText: function (isSuccess) {
            var message = null,
                thisEl = bk$(this.el),
                className = null;

            if (thisEl.find('.message-box').length > 0) {
                thisEl.find('.message-box').remove();
            }

            if (isSuccess) {
                message = App.t('widgets.form.success', 'Message sent successfully.');
                className = 'success';
            } else {
                message = App.t('widgets.form.failed', 'Submit failed.');
                className = 'fail';
            }

            thisEl.find('.overlay').addClass(className).append('<div class="message-box"><span class="message-text">' + message + '</span></div>');
        },

        showMessageBox: function () {
            var thisEl = bk$(this.el),
                overlay = bk$('<div class="overlay"></div>'),
                formEl = thisEl.find('form');

            if (thisEl.find('.overlay').length === 0) {
                thisEl.append(overlay);
            }

            if (formEl.length > 0) {
                formEl.addClass('submitting');
            }
        },

        removeMessageBox: function () {
            var thisEl = bk$(this.el),
                t = null,
                formEl = thisEl.find('form');

            if (formEl.length > 0) {
                formEl.removeClass('submitting');
            }

            thisEl.find('.email').val('');

            t = setTimeout(function () {
                clearTimeout(t);
                thisEl.find('.overlay').fadeOut(function () {
                    bk$(this).remove();
                });
            }, 3000);
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Signupform = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.SignupformProperties,
            methods: BaseKit.Widget.SignupformMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetSignupform = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Signupform(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Socialicons = {};

    BaseKit.Widget.SocialiconsProperties = {
        'align': '',
        'googleplus': 'profile',
        'linkedin': 'profile',
        'facebook': 'profile',
        'twitter': 'profile',
        'youtube': 'profile',
        'rss': 'profile'
    };

    BaseKit.Widget.SocialiconsMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },
        load: function () {
            // do something if the widget needs to be loaded
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Socialicons = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.SocialiconsProperties,
            methods: BaseKit.Widget.SocialiconsMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetSocialicons = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Socialicons(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Soundcloud = {};

    BaseKit.Widget.SoundcloudProperties = {
    };

    BaseKit.Widget.SoundcloudMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },
        load: function () {
            // do something if the widget needs to be loaded
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Soundcloud = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.SoundcloudProperties,
            methods: BaseKit.Widget.SoundcloudMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetSoundcloud = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Soundcloud(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Space = {};

    BaseKit.Widget.SpaceProperties = {
        height: '50'
    };

    BaseKit.Widget.SpaceMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },
        load: function () {
            // do something if the widget needs to be loaded
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Space = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.SpaceProperties,
            methods: BaseKit.Widget.SpaceMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetSpace = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Space(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Tweet = null;

    BaseKit.Widget.TweetProperties = {
        linkText: App.t('widgets.tweet.default_link_text', 'Tweet'),
        tweetText: '',
        align: '',
        url: 'http://www.basekit.com'
    };

    BaseKit.Widget.TweetMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },

        load: function () {
            //do something if the widget needs to be loaded!
            this.attachEvents();
        },

        attachEvents: function () {

        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Tweet = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.TweetProperties,
            methods: BaseKit.Widget.TweetMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetTweet = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Tweet(el, options));
        });
    };
}());(function () {
    BaseKit.Widget.Twitter = null;

    BaseKit.Widget.TwitterProperties = {
        count: '3',
        refreshTime: '1800000',
        includeRts: '1',
        searchKey: 'profile',
        searchType: 'username',
        defaultSearchKey: 'basekit' // HC: for the empty input
    };

    BaseKit.Widget.TwitterMethods = {
        construct: function () {
            this.refreshInterval = '';
            this.load();
        },

        load: function () {
            this.refreshTimeline();
            this.getUpdateTwitterFeed();
        },

        /**
         * refreshTimeline: set the interval for refreshing the timeline twitter feed
         */
        refreshTimeline: function () {
            var that = this,
                // Default to every 30 mins
                refreshTime = (this.get('refreshTime') > 0 ? parseInt(this.get('refreshTime'), 10) : 1800000);

            // clean the interval
            if (this.refreshInterval !== '') {
                window.clearInterval(this.refreshInterval);
                this.refreshInterval = '';
            }

            this.refreshInterval = window.setInterval(function () {
                try {
                    //api get new data
                    that.getUpdateTwitterFeed();
                } catch (err) {
                    clearInterval(that.refreshInterval);

                    //throw error
                    console.log(err);
                }
            }, refreshTime);
        },

        /**
         * getUpdateTwitterFeed: an api call for getting the tweets and format the data to rerender the widget
         */
        getUpdateTwitterFeed: function () {
            var that = this,
                url = '/site/fetch-feed',
                createdDate = null,
                tweetData = [],
                data = {
                    'count': this.get('count') > 0 ? this.get('count') : 3,
                    'includeRts': this.get('includeRts') !== null ? this.get('includeRts') : true,
                    'searchKey': this.get('searchType') === 'username' ? Profile.get('twitter') : this.get('searchKey'),
                    'searchType': this.get('searchType')
                };

            // HC: when the profile twitter or searchKey is empty we use the defaultSearchKey
            // for retriving the tweets
            if ((this.get('searchKey') === 'profile' && (Profile.get('twitter') === null || Profile.get('twitter').length === 0)) || (this.get('searchKey') === null || this.get('searchKey').length === 0)) {
                data.searchKey = this.get('defaultSearchKey');
            }

            // get twitter feed
            bk$.ajax({
                url: url,
                type: "POST",
                data: data,
                beforeSend: function () {
                    that.el.find('.twitter').html('<li>' + App.t('widgets.twitter.retrieving_tweets', 'Retrieving Tweets') + '</li>');
                }
            }).done(function (response, status) {

                bk$.each(response, function () {
                    // format created date
                    createdDate = this.created_at;
                    createdDate = createdDate.split(' ');

                    tweetData.push({
                        'screenName': this.user.screen_name,
                        'createdAt': createdDate[2] + '/' + createdDate[1] + '/' + createdDate[5],
                        'fullName': this.user.name,
                        'imageUrl': this.user.profile_image_url,
                        'source': this.source,
                        'text': this.text,
                        'retweetUser': this.retweetUser
                    });
                });

                that.set('tweets', tweetData, true);
                that.rerender();

            }).fail(function () {
                that.set('tweets', [], true);
                that.rerender();
            });
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Twitter = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.TwitterProperties,
            methods: BaseKit.Widget.TwitterMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetTwitter = function (options) {
        this.each(function () {
            bk$(this).data('bkob', new BaseKit.Widget.Twitter(this, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Userlogin = null;

    BaseKit.Widget.UserloginProperties = {
        align: '',
        email: 'profile',
        text: App.t('widgets.userlogin.default_button_text', 'Login')
    };

    BaseKit.Widget.UserloginMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            this.attachEvents();
        },

        /**
         * showOverlay: shows an overlay that is styled by the template
         * @param <string> message the message to display in the overlay
         */
        showOverlay: function (message) {
            message = message || 'message';

            var thisEl = bk$(this.el),
                overlayEl = thisEl.find('.overlay');

            overlayEl.find(".message").html(message).end().show();
            bk$(this.el).find("form button.userloginbtn").attr('disabled', true);
        },

        /**
         * hideOverlay: hides the overlay
         */
        hideOverlay: function () {
            var thisEl = bk$(this.el),
                overlayEl = thisEl.find('.overlay');

            overlayEl.hide().find('.message').empty();
            thisEl.find("form button.userloginbtn").attr('disabled', false);
        },

        /**
         * attachEvents: attach the send email event
         */
        attachEvents: function () {
            var that = this,
                thisEl = bk$(this.el),
                errors = [],
                postData = {};

            // override the submit event on the form
            thisEl.find('form').on('submit', function (e) {
                e.preventDefault();

                that.hideOverlay();
                errors = [];
                postData = {
                    'email':        thisEl.find("input[type='email']").val(),
                    'password':     thisEl.find("input[type='password']").val(),
                    'auth_token':   null
                };
                thisEl.find("p.error").empty().hide();

                // basic js validation before sending to the api
                if (postData.password !== undefined) {
                    if (postData.password.trim().length === 0) {
                        errors.push({
                            'element' : 'password',
                            'error' : App.t('widgets.userlogin.error.missing_password', 'Please provide a password.')
                        });
                    } else if (postData.password.trim().length < 7) {
                        errors.push({
                            'element' : 'password',
                            'error' : App.t('widgets.userlogin.error.invalid_password', 'Please provide a password greater than 7 characters but less than 19.')
                        });
                    }
                }

                if (postData.email !== undefined) {
                    if (postData.email.trim().length < 5 && postData.email.indexOf('@') === -1) {
                        errors.push({
                            'element' : 'email',
                            'error' : App.t('widgets.userlogin.error.wrong_email_format', 'Please enter an email address.')
                        });
                    }
                }

                bk$.each(errors, function () {
                    var element = thisEl.find("p.error." + this.element);
                    if (element.length) {
                        element.html(this.error).show();
                    }
                });

                // only submit if we have no errors
                if (!errors.length) {
                    bk$.ajax({
                        url: '/site/api/auth-token',
                        type: "POST",
                        processData: false
                    }).done(function (response, status, jqXHR) {
                        if (response.token !== undefined) {
                            postData.auth_token = response.token;
                            that.login(postData);
                        }
                    });
                }
            });
        },

        /**
         * create the user account
         * @param  <object> postData data sent to the api
         */
        login: function (postData) {
            var that = this,
                thisEl = bk$(this.el);

            bk$.ajax({
                url: '/site/api/user-login',
                type: "POST",
                data: postData,
                beforeSend: function () {
                    var message = App.t(
                            "widgets.userlogin.login_process",
                            "Logging into your account, Please wait..."
                        );
                    that.showOverlay(message);
                }
            }).always(function () {
                that.hideOverlay();
            }).done(function (response, status, jqXHR) {
                var error,
                    redirect = '';

                if (status === 'success' && response.url !== undefined) {

                    if (App.getParam('r') !== null) {
                        if (response.url.indexOf('?') >= 0) {
                            redirect = '&r=' + App.getParam('r');
                        } else {
                            redirect = '?r=' + App.getParam('r');
                        }
                    }

                    document.location = response.url + redirect;
                } else {
                    error = App.t("widgets.userlogin.error.unknown_error", "An unknown error has occurred, please try again");
                    thisEl.find("p.error.submission").html(error).show();
                }
            }).fail(function (response) {
                var apiErrors = that.formatResponseErrors(response);
                thisEl.find("p.error.submission").html(apiErrors).show();
            });
        },

        /**
         * a quick method that tries to extract any errors sent back form the api
         * @param  <object> response response object sent back from an ajax call
         * @return <string>          flat list of errors
         */
        formatResponseErrors: function (response) {
            var errors = [];

            if (response.responseJSON === undefined || response.responseJSON === null) {
                return errors;
            }

            response = (typeof response.responseJSON === 'object') ? response.responseJSON
                                                                   : bk$.parseJSON(response.responseJSON);
            if (response.messageTemplates) {
                bk$.each(response.messageTemplates, function (type, properties) {
                    bk$.each(properties.templates, function (template, value) {
                        var args = ['widget.userregistration.error.' + template.toLowerCase(), value];
                        errors.push(App.t.apply(App, args));
                    });
                });
            } else {
                errors.push(App.t("widgets.userlogin.error.unknown_error",
                                  "An unknown error has occurred, please try again.")
                            );
            }
            return errors.join('');
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Userlogin = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.UserloginProperties,
            methods: BaseKit.Widget.UserloginMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetUserlogin = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Userlogin(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Userregistration = null;

    BaseKit.Widget.UserregistrationProperties = {
        align: '',
        email: 'profile',
        text: App.t('widgets.userregistration.default_button_text', 'Register')
    };

    BaseKit.Widget.UserregistrationMethods = {
        construct: function (el, options) {
            this.load();
        },

        load: function () {
            this.attachEvents();
        },

        /**
         * showOverlay: shows an overlay that is styled by the template
         * @param <string> message the message to display in the overlay
         */
        showOverlay: function (message) {

            message = message || 'message';

            var thisEl = bk$(this.el),
                overlayEl = thisEl.find('.overlay');

            overlayEl.find(".message").html(message).end().show();
            thisEl.find("form button.userregistrationbtn").attr('disabled', true);
        },

        /**
         * hideOverlay: hides the overlay
         */
        hideOverlay: function () {
            var thisEl = bk$(this.el),
                overlayEl = thisEl.find('.overlay');

            overlayEl.hide().find('.message').empty();
            thisEl.find("form button.userregistrationbtn").attr('disabled', false);
        },

        /**
         * attachEvents: attach the send email event
         */
        attachEvents: function () {
            var that = this,
                thisEl = bk$(this.el),
                errors = [],
                postData = {};

            // override the submit event on the form
            thisEl.find('form').on('submit', function (e) {
                e.preventDefault();

                that.hideOverlay();
                errors = [];
                postData = {
                    'brandRef':     App.session.get('brandRef'),
                    'brandDomain':  App.session.get('domain'),
                    'email':        thisEl.find("input[type='email']").val(),
                    'password':     thisEl.find("input[type='password']").val(),
                    'widgetId':     thisEl.attr('id'),
                    'languageCode': App.session.get('languageCode'),
                    'auth_token':   null
                };
                thisEl.find("p.error").empty().hide();

                // basic js validation before sending to the api
                if (postData.password !== undefined && (postData.password.trim().length < 7)) {
                    errors.push({
                        'element' : 'password',
                        'error' : App.t('widgets.userregistration.error.invalid_password', 'Please provide a password greater than 7 characters but less than 19.')
                    });
                }

                if (postData.email !== undefined && postData.email.trim().length < 5 && postData.email.indexOf('@') === -1) {
                    errors.push({
                        'element' : 'email',
                        'error' : App.t('widgets.userregistration.error.wrong_email_format', 'Please enter an email address.')
                    });
                }

                bk$.each(errors, function () {
                    var element = thisEl.find("p.error." + this.element);
                    if (element.length) {
                        element.html(this.error).show();
                    }
                });

                // only submit if we have no errors
                if (!errors.length) {
                    bk$.ajax({
                        url: '/site/api/auth-token',
                        type: "POST",
                        processData: false
                    }).done(function (response, status, jqXHR) {
                        if (response.token !== undefined) {
                            postData.auth_token = response.token;
                            that.createAccount(postData);
                        }
                    });
                }
            });
        },

        /**
         * create the user account
         * @param  <object> postData data sent to the api
         */
        createAccount: function (postData) {
            var that = this,
                thisEl = bk$(this.el);

            bk$.ajax({
                url: '/site/api/user-registration',
                type: "POST",
                data: postData,
                beforeSend: function () {
                    var message = App.t(
                            "widgets.userregistration.creating_account",
                            "Creating your account, Please wait..."
                        );
                    that.showOverlay(message);
                }
            }).always(function () {
                that.hideOverlay();
            }).done(function (response, status, jqXHR) {
                if (status === 'success' && response.url !== undefined) {
                    document.location = response.url;
                } else {
                    var error = App.t("widgets.userregistration.error.unknown_error",
                                      "An unknown error has occurred, please try again"
                                );
                    thisEl.find("p.error.submission").html(error).show();
                }
            }).fail(function (response) {
                var apiErrors = that.formatResponseErrors(response);
                thisEl.find("p.error.submission").html(apiErrors).show();
            });
        },

        /**
         * a quick method that tries to extract any errors sent back form the api
         * @param  <object> response response object sent back from an ajax call
         * @return <string>          flat list of errors
         */
        formatResponseErrors: function (response) {
            var errors = [];

            if (response.responseJSON === undefined || response.responseJSON === null) {
                return errors;
            }

            response = (typeof response.responseJSON === 'object') ? response.responseJSON
                                                                   : bk$.parseJSON(response.responseJSON);
            if (response.messageTemplates) {
                bk$.each(response.messageTemplates, function (type, properties) {
                    if (type === 'username') {
                        return;
                    }
                    bk$.each(properties.templates, function (template, value) {
                        var args = ['widgets.userregistration.error.' + template.toLowerCase(), value];
                        errors.push(App.t.apply(App, args));
                    });
                });
            } else {
                errors.push(App.t("widgets.userregistration.error.unknown_error",
                                  "An unknown error has occurred, please try again.")
                            );
            }
            return errors.join('');
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Userregistration = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.UserregistrationProperties,
            methods: BaseKit.Widget.UserregistrationMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetUserregistration = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Userregistration(el, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Yelpreview = null;

    BaseKit.Widget.YelpreviewProperties = {
        title: App.t('widgets.yelpreview.title', 'Yelp reviews'),
        reviews: [],
        count: 10,
        refreshTime: '3600000'
    };

    BaseKit.Widget.YelpreviewMethods = {
        construct: function () {
            this.refreshInterval = '';
            this.load();
        },

        load: function () {
            this.refreshTimeline();
            this.getUpdateReviews();
        },

        refreshTimeline: function () {
            var that = this,
                refreshTime = (this.get('refreshTime') > 0 ? parseInt(this.get('refreshTime'), 10) : 3600000);

            if (this.refreshInterval !== '') {
                window.clearInterval(this.refreshInterval);
                this.refreshInterval = '';
            }

            this.refreshInterval = window.setInterval(function () {
                try {
                    that.getUpdateReviews();
                } catch (err) {
                    clearInterval(that.refreshInterval);
                }
            }, refreshTime);
        },

        getUpdateReviews: function () {
            var that = this,
                url = '/site/12345/fetch-yelp-reviews.js',
                data = {
                    'count': this.get('count') > 0 ? this.get('count') : 3,
                    'businessID': Profile.get('yelpbusinessid')
                };

            bk$.ajax({
                url: url,
                type: "POST",
                data: data,
                dataType:'json',
                beforeSend: function () {
                    that.el.find('.yelpreview').html('<li>' + App.t('widgets.yelp.retrieving_reviews', 'Retrieving Reviews') + '</li>');
                }
            }).done(function (response, status) {
                that.set('reviews', response, true);
                that.rerender();
            }).fail(function () {
                that.set('reviews', [], true);
                that.rerender();
            });
        }
    };

    BaseKit.Widget.Yelpreview = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.YelpreviewProperties,
            methods: BaseKit.Widget.YelpreviewMethods
        });
    };

    bk$.fn.basekitWidgetYelpreview = function (options) {
        this.each(function () {
            bk$(this).data('bkob', new BaseKit.Widget.Yelpreview(this, options));
        });
    };
}());
(function () {
    BaseKit.Widget.Youtube = {};

    BaseKit.Widget.YoutubeProperties = {
        userInput: '', // Stores what the user enters
        videoId: '' // Stores the video id extracted from the user input
    };

    BaseKit.Widget.YoutubeMethods = {
        construct: function (el, options) {
            this.options = options;
            this.load();
        },
        load: function () {
            // do something if the widget needs to be loaded
        }
    };

    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Widget.Youtube = function () {
        var o = new BaseKit.WidgetCore(this, arguments, {
            properties: BaseKit.Widget.YoutubeProperties,
            methods: BaseKit.Widget.YoutubeMethods
        });
    };

    // JQuery plugin so that a widget can be attached to an element
    bk$.fn.basekitWidgetYoutube = function (options) {
        this.each(function (index, el) {
            bk$(el).data('bkob', new BaseKit.Widget.Youtube(el, options));
        });
    };
}());