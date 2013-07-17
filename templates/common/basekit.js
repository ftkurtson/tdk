BaseKit = {
    Util: {},
    Widget: {}
};

BaseKit.Util.extend = function (plugin, methods) {
    $.extend(true, plugin.prototype, methods);
};

BaseKit.Util.expandException = function (exception) {
    var error = null,
        prop = null,
        expanded = "";

    for (prop in exception) {
        if (exception.hasOwnProperty(prop)) {
            expanded += "property: " + prop + " value: [" + exception[prop] + "]\n";
        }
    }

    expanded += " value: [" + exception.toString() + "]";

    return expanded;
};

/**
 * BaseKit.Util.waitsFor: function to wait for a positive reuslt to move on.
 * If a true boolean (===) is received, then the success function is called.
 * If a any other value is received, we wait for 10MS then call the funciton again.
 * If the accumulative interval is greater than the timeout (user defined),
 * we assume that the testing method has failed and we call the callbackFail function
 * @param <function> testMethod - Test method that is called every 10ms.
 * @param <integer> timeoutMS - time in milliseconds to continue testing
 * @param <function> callbackSuccess - function to call when test method returns true
 * @param <function> callbackFail - function to call when timeout runs out.
 * @returns <boolean> This should return true on success.
 */
BaseKit.Util.debug = false;
BaseKit.Util.waitsFor = function (testMethod, callbackSuccess, callbackFail, timeoutMS) {
    // RH: Because the interval adds the 10
    // the first time around being clock to 0.
    var clock = -10,
        intervalPeriod = 10,
        interval = null,
        result = false;

    if (typeof testMethod !== 'function') {
        if (BaseKit.Util.debug === true) {
            console.log('-> typeof testMethod: ' + typeof testMethod);
        }

        throw new Error('waitsFor: testMethod is not a function');
    }

    if (typeof timeoutMS !== 'number' || timeoutMS <= 10 || timeoutMS > 10000) {
        if (BaseKit.Util.debug === true) {
            console.log('-> typeof timeoutMS: ' + typeof timeoutMS);
            console.log('-> range[10ms-10000ms] timeoutMS: ' + timeoutMS);
        }

        throw new Error('waitsFor: timeoutMS is not valid; range[10ms-10000ms]');
    }

    if (typeof callbackSuccess !== 'function') {
        if (BaseKit.Util.debug === true) {
            console.log('-> typeof callbackSuccess: ' + typeof callbackSuccess);
        }

        throw new Error('waitsFor: callbackSuccess is not a function');
    }

    if (typeof callbackFail !== 'function') {
        if (BaseKit.Util.debug === true) {
            console.log('-> typeof callbackFail: ' + typeof callbackSuccess);
        }

        throw new Error('waitsFor: callbackFail is not a function');
    }

    // RH: Set the interval up
    interval = setInterval(function () {
        clock += intervalPeriod;

        if (clock >= timeoutMS) {
            // RH: Stop testing
            clearInterval(interval);

            if (BaseKit.Util.debug === true) {
                console.log('timeout exceeded after: ' + clock + 'ms >=' + timeoutMS + 'ms');
            }

            // RH: Call the callback fail function
            return callbackFail();
        }

        try {
            result = testMethod();

            if (BaseKit.Util.debug === true) {
                console.log('test called; result = ' + result);
            }

        } catch (exception) {
            if (BaseKit.Util.debug === true) {
                console.log('test crashed after ' + clock + 'ms');
            }

            // RH: erh... something went wrong in the test method.
            // Bomb and return back an Error.
            clearInterval(interval);

            result = false;

            throw new Error("waitsFor: testMethod bombed!\n" + BaseKit.Util.expandException(exception));
        }

        if (result === true) {
            if (BaseKit.Util.debug === true) {
                console.log('test returned succeeded after: ' + clock + 'ms');
            }

            // RH: Stop testing
            clearInterval(interval);

            return callbackSuccess();
        }

        return true;

    }, intervalPeriod);
};

/*
 * This uppercases the first character of a string
 */
String.prototype.ucfirst = function () {
    var f = this.charAt(0).toUpperCase();
    return f + this.substr(1);
};

/*
 * This changes the text into camelcase (uses . as the delimiter)
 */
String.prototype.toCamelCase = function () {
    return this.replace(/(\.[a-z])/g, function (txt) {
        return txt.toUpperCase().replace('.', '');
    });
};

/*
 * This changes widget name to the title case format
 */
String.prototype.toWidgetTitleCase = function () {
    return this.replace('.', ' ').replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }).replace(' ', '.');
};