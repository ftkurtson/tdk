#HTML Template to BaseKit Template Convertor

This utility has been built to help template developers convert flat HTML templates in BaseKit templates. The conversion process will do the following:

 - Move all CSS and LESS files to `css/` folder and create a `stylesheet.less` file that will import detected CSS files.
 - All HTML files detected in the top level directory will be converted to twig files and added as page types to your metadata.json file.
 - Create a default metadata.json file with template name, pages types and swatches put in place.
 - Will convert any asset URLs found in HTML and CSS to use the correct Twig functions to generate the correct asset path URLs.
 - Will insert `basekit.headScript` at the bottom of your `<HEAD>` block and `basekit.bodyScript` at the bottom of your `<BODY>` block.
 - Zip up the converted files in a BaseKit ready format.
 
 
##Uploading a HTML template

The uploader accepts zip files containing the template. There are a few assumptions this convertor will make:

 - The convertor expects the template to be the top level. For example index.html file should be in the top level directory within the zip. Do not put the all the template files within a folder within the zip.  
 - The zip name file name will be used as the template name; i.e. ***aTemplate.zip*** will be converted to ***aTemplate***.
 - The convertor expects an index.html (or index.htm) file. It will convert this to home.twig.
 - The zip file must be under 10MB file size.
 
##Conversion

A zip file structure should look something like this:

###HTML Format
<pre>
aTemplate.zip
	- css/
	 	- bootstrap.less
	- images/
	 	- logo.png
	- js/
	 	- jquery.min.js
	- index.html
	- default.html
	- style.css
</pre>

The above will be converted to:

###BaseKit Format
<pre>

aTemplate-timestamp.zip
	- css/
	 	- bootstrap.less
	 	- style.css
	- images/
	 	- logo.png
	- js/
	 	- jquery.min.js
	- home.twig
	- default.twig
	- metadata.json
	- stylesheet.less
</pre>

###How can I view a BaseKit Template

Install the template in our locally run TDK (template development kit). 

##What the conversion will not do

- It leaves it up to you to add a BaseKit zone to you TWIG files; Zones are the areas where a BaseKit user can drop widgets within to the page. i.e `{{zone('main')|raw}}`. For more information, checkout the [TWIG view documentation](http://basekit-templates.github.io/template-docs/twig-view.html).
- There will be no template widgets added to your templates. This is a manual process that has to be completed by the developer.
- Currently, this will not convert other Template formats. For example Wordpress themes.

##Common Issues

###My JavaScript doesn't work!

If your JavaScript stops working. Try placing the calls to your JavaScript files below the `basekit.bodyScript`. In BaseKit, JQuery is added as late as possible into the page load so it is possible that BaseKit JQuery is overriding any functionality that you have added to your template. 

For example, if your TWIG file has some like this at end of the file...

```
	...
	<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js'></script>
	<script src="{{asset('js/modernizr.js')}}" type="text/javascript"></script>
    <script src="{{asset('js/isotope.js')}}" type="text/javascript"></script>
	<script src="{{asset('js/scripts.js')}}" type="text/javascript"></script>    

	{% include basekit.bodyScript %}
</body>

```

Move the SCRIPT tags below the `{% include basekit.bodyScript %}`:

```
	...
	
	{% include basekit.bodyScript %}
	
	<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js'></script>
	<script src="{{asset('js/modernizr.js')}}" type="text/javascript"></script>
    <script src="{{asset('js/isotope.js')}}" type="text/javascript"></script>
	<script src="{{asset('js/scripts.js')}}" type="text/javascript"></script>    
</body>

```

###My template isn't rendering due to LESS rendering issues

There could be number of reasons that your template doesn't load. Usually, this is down to the formatting issues within your now converted CSS files. 

- Check that the files that are in the `stylesheet.less` are actually needed. Sometimes, the zip file will contain a lot more CSS/LESS files that aren't needed to style the template. Make sure the only the LESS files that are needed are included in `stylesheet.less`. Also note to make sure the `@imports` are in the right order.

	After conversion your `stylesheet.less` could easily look like this:

	<pre>
@import "@{templateLocal}/style.less";
@import "@{templateLocal}/css/navigation-style-1.less";
@import "@{templateLocal}/css/navigation-style-4.less";
@import "@{templateLocal}/css/prettyPhoto.less";
@import "@{templateLocal}/css/jquery.bxslider.less";
@import "@{templateLocal}/css/font-awesome.min.less";
@import "@{templateLocal}/css/colors/color-red.less";
@import "@{templateLocal}/css/colors/color-blue.less";
@import "@{templateLocal}/css/colors/color-gray.less";
@import "@{templateLocal}/css/colors/color-green.less";
@import "@{templateLocal}/css/colors/color-yellow.less";
@import "@{templateLocal}/css/bootstrap.min.less";
@import "@{templateLocal}/css/navigation-style-2.less";
@import "@{templateLocal}/css/bootstrap-responsive.min.less";
@import "@{templateLocal}/css/navigation-style-3.less";
@import "@{templateLocal}/\_\_MACOSX/.\_style.less";
@import "@{templateLocal}/\_\_MACOSX/css/.\_bootstrap-responsive.min.less";
@import "@{templateLocal}/\_\_MACOSX/css/.\_prettyPhoto.less";
@import "@{templateLocal}/\_\_MACOSX/css/.\_bootstrap.min.less";
@import "@{templateLocal}/\_\_MACOSX/css/.\_navigation-style-1.less";
</pre>

	This should be trimmed down to the LESS files that are actually needed:

	<pre>
@import "@{templateLocal}/css/bootstrap.min.less";
@import "@{templateLocal}/css/bootstrap-responsive.min.less";
@import "@{templateLocal}/style.less";
@import "@{templateLocal}/css/navigation-style-1.less";
@import "@{templateLocal}/css/prettyPhoto.less";
@import "@{templateLocal}/css/jquery.bxslider.less";
@import "@{templateLocal}/css/font-awesome.min.less";
@import "@{templateLocal}/css/colors/color-red.less";
</pre>

- LESS is very sensitive to CSS semantic errors. If you are using the TDK, Check your browser's Developer console bar as LESS.js will most likely return back a parse error. From this, you will be able to see the offending file and line number of the syntax error.


##More information about BaseKit Template Development

If you're interested in finding out more about BaseKit Template Development, please find the documentation at this URL.

[http://basekit-templates.github.io/template-docs/](http://basekit-templates.github.io/template-docs/)

Or contact me directly:

- twitter: @basekit
- twitter: @richardhealy


 
###The BaseKit Team
