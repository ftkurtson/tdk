/* Google Fonts */
WebFontConfig = {
    google: {
        families: requiredGoogleFonts
    }
};
(function () {
    var s = null,
        wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';

    s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
}());
