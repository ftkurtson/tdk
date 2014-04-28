// RH: Widgetcore Javascript
(function () {
    // RH: Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.WidgetCore = function (scope, args, options) {
        var o = new BaseKit.Component(scope, args, {

            methods: {
                construct: function () {
                    // RH: Set the core variables here
                    scope.properties = {
                        type: '',
                        styles: {},
                        temporary: {}, // this may not be needed in this mode??
                        data: {},
                        changed: {}
                    };

                    // RH: extend methods that are coming through
                    if (options.methods !== null) {
                        bk$.extend(true, scope, options.methods);
                    }

                    if (typeof options.properties === 'object') {
                        bk$.extend(true, scope.properties.data, options.properties);
                    }

                    // extend the basic properties
                    if (args[1] && typeof args[1] === 'object') {
                        bk$.extend(true, scope.properties, args[1]);
                    }

                    if (typeof scope.construct === 'function') {
                        scope.construct.apply(scope, args);
                    }
                },

                /**
                 * This returns the widget property by name
                 * @param <string> name - property name
                 * @returns <mixed> property or null if does not exist
                 */
                get: function (name) {
                    var property = null;
                    try {
                        // get the temp property first as this will always
                        // be the most recent until they save
                        if (scope.properties.temporary && scope.properties.temporary[name] !== undefined) {
                            property = scope.properties.temporary[name];
                        } else if (this.properties.changed[name] && this.properties.changed[name] !== undefined) {
                            property = this.properties.changed[name];
                        } else if (this.properties.data[name] && this.properties.data[name] !== undefined) {
                             // fallback to the default property
                            property = this.properties.data[name];
                        } else if (this.properties[name] && this.properties[name] !== undefined) {
                            // finally check to see if it's part of the main widget properties
                            property = this.properties[name];
                        } else if (this[name] && this[name] !== undefined) {
                            // finally check to see if it's part of the main widget properties
                            property = this[name];
                        }
                        return property;
                    } catch (exception) {
                        throw new Error('Unable to get property', exception.message);
                    }
                },

                /**
                 * This sets the widget property by name
                 * @param <string> name - property name
                 * @param <mixed> value - property value
                 * @param <boolean> temporary - whether the value is a temporary one
                 */
                set: function (name, value, temporary) {
                    try {
                        temporary = temporary || false;
                        if (temporary === true) {
                            scope.properties.temporary[name] = value;
                        }
                    } catch (exception) {
                        throw new Error('Unsable to set property', exception.message);
                    }
                },

                rerender: function () {
                    var properties = this.getProperties('current'),
                        pluginName = null;

                    // HC: store the plugin data
                    properties.plugins = {};

                    if (typeof Server !== 'undefined' && Server.hasOwnProperty('plugins')) {
                        // HC: get the plugin data from the server
                        for (pluginName in Server.plugins) {
                            if (Server.plugins.hasOwnProperty(pluginName)) {
                                if (properties.plugins.hasOwnProperty(pluginName)) {
                                    throw new Error('Plugin name conflicts');
                                } else {
                                    properties.plugins[pluginName] = bk$.extend(true, {}, Server.plugins[pluginName]);
                                }
                            }
                        }
                    }

                    // HC: make profile available for the published site widgets
                    if (properties.profile !== undefined) {
                        bk$.extend(true, properties.profile, Profile.profile);
                    } else {
                        properties.profile = Profile.profile;
                    }

                    this.el.html('');

                    var html = window.parent.renderWidget(properties.type, this.el.attr('id'), properties.temporary, true),
                        that = this,
                        t = null;
                        this.el.html(bk$(html).unwrap());

                    t = setTimeout (function () {
                        if(typeof that.attachEvents === 'function') {
                            that.attachEvents();
                        }
                    }, 1000);
                },

                /**
                 * This returns the properties for the current widget
                 * @param <string> type - the type of property to get (changed)
                 * @returns <object>
                 */
                getProperties: function (type) {
                    var properties = scope.properties;
                    if (type && type === 'current') {

                        properties = bk$.extend(true, {}, scope.properties);

                        // replace the previous with the current saved properties
                        properties.data = bk$.extend(true, properties.data, properties.changed);

                        // replace the previous with any temporary properties
                        properties.data = bk$.extend(true, properties.data, properties.temporary);
                    }
                    return properties;
                },

                getErrorsFromResponse: function (response) {
                    var errors = [],
                        responseObj;

                    if (response.responseText) {
                        responseObj = bk$.parseJSON(response.responseText);

                        if (responseObj.messageTemplates) {
                            bk$.each(responseObj.messageTemplates, function (field, errorTemplates) {
                                bk$.each(errorTemplates.templates, function (type, template) {
                                    errors.push({
                                        field: field,
                                        type: type
                                    });
                                });
                            });
                        }
                    }

                    return errors;
                },

                getRegistrationMessageAndFieldFromErrors: function (errors) {
                    var message = null,
                        field = null;

                    bk$.each(errors, function (i, value) {
                        if (value.field === 'email' && value.type === 'duplicateEmail') {
                            field = 'email';
                            message = App.t('global_v7.error_registration.duplicate_email', 'It looks like that email is already in use. Are you sure you don’t already have an account?');
                            return false;
                        }
                        if (value.field === 'email') {
                            field = 'email';
                            message = App.t('global_v7.error_registration.incorrect_email_format', 'Please enter a valid email address.');
                            return false;
                        }
                        if (value.field === 'password') {
                            field = 'password';
                            message = App.t('global_v7.error_registration.invalid_password', 'Please provide a password greater than 7 characters but less than 19.');
                            return false;
                        }
                        if (value.field === 'firstName') {
                            field = 'firstName';
                            message = App.t('global_v7.error_registration.empty_firstname', 'Please provide your first name');
                            return false;
                        }
                        if (value.field === 'lastName') {
                            field = 'lastName';
                            message = App.t('global_v7.error_registration.empty_lastname', 'Please provide your last name');
                            return false;
                        }
                    });

                    return {
                        message: message,
                        field: field
                    };
                },

                rerenderPartial: function (tplName, tplData) {
                    var html = window.parent.renderWidget(tplName, this.el.attr('id') + tplName.replace('widget_', ''), tplData, true);
                    return bk$(html);
                }
            }
        });
    };
}());