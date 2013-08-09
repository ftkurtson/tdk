/* Google Fonts */

WebFontConfig = {
    google: {
        families: [
            'Droid+Sans::latin',
            'Arvo::latin',
            'Corben::latin',
            'Lobster::latin',
            'Droid+Serif::latin',
            'Raleway:100:latin',
            'Goudy+Bookletter+1911::latin',
            'Abril+Fatface::latin',
            'Yanone+Kaffeesatz:400,700:latin',
            'Hammersmith+One::latin',
            'Lato::latin',
            'PT+Sans+Narrow::latin',
            'Open+Sans::latin',
            'Old+Standard+TT::latin',
            'Merriweather::latin',
            'Montserrat:400,700:latin',
            'Roboto::latin',
            'Titillium+Web::latin',
            'Karla::latin',
            'Oswald::latin',
            'Glegoo::latin',
            'Vollkorn::latin'
        ]
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