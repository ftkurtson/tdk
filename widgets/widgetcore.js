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
                        $.extend(true, scope, options.methods);
                    }

                    // extend the basic properties
                    if (args[1] && typeof args[1] === 'object') {
                        $.extend(true, scope.properties, args[1]);
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
                    var properties = this.getProperties('current');
                    this.el.html('');
                    console.log(properties.type, properties, true);
                    this.renderTemplate(properties.type, properties, true);
                },

                /**
                 * This returns the properties for the current widget
                 * @param <string> type - the type of property to get (changed)
                 * @returns <object>
                 */
                getProperties: function (type) {
                    var properties = scope.properties;
                    if (type && type === 'current') {

                        properties = $.extend(true, {}, scope.properties);

                        // replace the previous with the current saved properties
                        properties.data = $.extend(true, properties.data, properties.changed);

                        // replace the previous with any temporary properties
                        properties.data = $.extend(true, properties.data, properties.temporary);
                    }
                    return properties;
                }
            }
        });
    };
}());