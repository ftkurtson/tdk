// Panel Javascript
(function()
{
    // Base Widget Functionality - What ever is required
    // to get the widget working in normal mode goes in here.
    BaseKit.Component = function(scope, args, options)
    {
        // A component needs options
        if(options === null)
        {
            return scope;
        }

        // set the components element and scope
        scope.self = scope.el = $(args[0]);
        scope.scope = scope;

        $.extend(true, scope,
        {
            /**
             * This tries to get the twig template, and once it has it it calls postRender unless explicitly asked not too, if you pass a boolean through as the 'values' parameter then this will be used to determine if we need to call postRender
             *
             * @param <templateId> templateId - the twig template name
             * @param <object> values - the values to populate the template
             * @param <boolean> postRender - whether to call postRender method
             * @param <boolean> doRender - if false then just return and do not render into the dom
             * @param <function> callback - callback function if needed
             * @returns <string> content
             */
            renderTemplate: function (templateId, values, postRender, doRender, callback, doEvents)
            {
                var content = null, templateName = null;

                // make sure we have a valid template name
                if (typeof (templateId) !== 'string')
                {
                    throw new Error("renderTemplate first parameter error: expecting twig template name");
                }

                // make sure we have the values
                if (typeof values !== 'object')
                {
                    throw new Error("renderTemplate second parameter error: expecting object");
                }

                // set the default postRender flag to be false
                postRender = (typeof postRender === 'boolean' && postRender === true) ? true : false;

                // see if they wish to only render the template and insert into the DOM
                doRender = (typeof doRender === 'boolean' && doRender === false) ? false : true;

                // by default always run attachEvents unless doEvents is false
                doEvents = (typeof doEvents === 'boolean' && doEvents === false) ? false : true;

                // render the twig template
                if (typeof App === 'object' && typeof App.render === 'function')
                {
                    templateName = templateId.replace(/\./g, '_');
                    App.render(templateName, function(tpl)
                    {
                        if (typeof tpl === 'function')
                        {
                            // we are passing in an object , assume it's the values
                            if (values !== null && typeof values === 'object')
                            {
                                content = tpl(values);
                            }
                            // otherwise lets assume it the postRender option
                            else if (typeof values === 'boolean')
                            {
                                postRender = values;
                                content = tpl();
                            }
                            // otherwise just render the template
                            else
                            {
                                content = tpl();
                            }

                            // render the contents into the DOM
                            if (doRender === true)
                            {
                                $(scope.el).html(content);
                            }

                            // see if they are using the callback method to be the postRender
                            if (postRender === true && typeof scope.postRender === 'function')
                            {
                                scope.postRender(content);
                            }

                            // attach any events if needed to the template
                            if (doEvents === true && typeof scope.attachEvents === 'function')
                            {
                                scope.attachEvents();
                            }

                            // if passed run optional callback
                            if (callback && typeof callback === 'function')
                            {
                                callback.call(scope, content);
                            }
                        }
                        return content;
                    });
                }
            }
        });

        $.extend(true, scope,
        {
            postRender : function(content)
            {
                if(typeof this.renderFinish === 'function')
                {
                    var that = this,
                    lastLength = 0,
                    strikes = 0;
                    BaseKit.Util.waitsFor(function() // Test Method
                    {
                        var loadingHTML = $(scope.el).html(),
                            expectedHTML = typeof content === 'object' ? $(content).html().toString() : content,
                            loadingLength = 0,
                            expectedLength = 0;

                        // RH: Dynamic loading of HTML using the api could slow the
                        // process down. We need to make sure we have some HTML
                        // here before we can get lengths
                        if(loadingHTML === null || loadingHTML.replace === undefined)
                        {
                            return false;
                        }

                        // RH: Get lengths of compressed (whitespace removed) HTML
                        loadingLength = loadingHTML.replace(/\s/g, "").length;
                        expectedLength = expectedHTML.replace(/\s/g, "").length;

                        if(loadingLength !== expectedLength)
                        {
                            // RH: If we detect that the loadingLength is the same
                            // as the last interation then increase the strikes.
                            if(loadingLength === lastLength)
                            {
                                strikes += 1;
                            }

                            // RH: Save the last length for next interation
                            lastLength = loadingLength;

                            // RH: If we have 3 strikes then we assume there's something
                            // fundamentally different with the views. We just return true
                            // in the hope that the view will be okay to run with. :$
                            if(strikes === 3)
                            {
                                // RH: DEBUGGING: Comment this out to spit out the
                                // expected view and the actual html in the document.
                                return true;
                            }

                            // RH: Set to lastLength so we can test
                            // against it next time around.
                            return false;
                        }
                        else
                        {
                            // RH: Lengths match... return true
                            return true;
                        }
                    },
                    function() // Success
                    {
                        // Reset Values;
                        lastLength = 0;
                        strikes = 0;

                        that.renderFinish(content);
                    },
                    function() // Fail
                    {
                        // Reset Values;
                        lastLength = 0;
                        strikes = 0;

                        throw new Error('Editor Window unaccessable');
                    }, 250);
                }
            }
        });

        // extend methods that are coming through
        if(options.methods !== null)
        {
            $.extend(true, scope, options.methods);
        }

        // run the constructor with any passed arguments for the component
        if(typeof scope.construct === 'function')
        {
            scope.construct.apply(scope, args);
        }

        // run the constructor with any passed arguments for the component in editor mode only
        if(typeof scope.editorConstruct === 'function')
        {
            scope.editorConstruct.apply(scope, args);
            if (typeof scope.setSettings === 'function')
            {
                // MC: Testing, as moved this into the click on the settings bubble
                //scope.setSettings();
            }
        }

        return scope;
    };
}());
