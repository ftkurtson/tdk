<?php
include 'metadata.php';
include 'class.convert.php';

$conversionResult = 'install'; // (string) 'zip' or  'install'
$installTemplateDir = '../../templates'; 
$uploadDir = '/tmp';
$strictMode = true;
$error = "";
$message = "";

function destroyDir($dir) { 
if (!is_dir($dir) || is_link($dir)) return unlink($dir); 
    foreach (scandir($dir) as $file) { 
        if ($file == '.' || $file == '..') continue; 
        if (!destroyDir($dir . DIRECTORY_SEPARATOR . $file)) { 
            chmod($dir . DIRECTORY_SEPARATOR . $file, 0777); 
            if (!destroyDir($dir . DIRECTORY_SEPARATOR . $file)) return false; 
        }; 
    } 
    return rmdir($dir); 
}

function returnUploadError() {
    $message = 'There was a problem with the upload. Please try again.';
    switch( $_FILES['zip']['error'] ) {
        case UPLOAD_ERR_OK:
            $message = false;;
            break;
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            $message .= ' - file too large (limit of '.get_max_upload().' bytes).';
            break;
        case UPLOAD_ERR_PARTIAL:
            $message .= ' - file upload was not completed.';
            break;
        case UPLOAD_ERR_NO_FILE:
            $message .= ' - zero-length file uploaded.';
            break;
        default:
            $message .= ' - internal error #'.$_FILES['zip']['error'];
            break;
    }

    return $message;
}

function get_max_upload() {
    return convertBytes(ini_get('upload_max_filesize'));
}

function convertBytes( $value ) {
    if ( is_numeric( $value ) ) {
        return $value;
    } else {
        $value_length = strlen($value);
        $qty = substr( $value, 0, $value_length - 1 );
        $unit = strtolower( substr( $value, $value_length - 1 ) );
        switch ( $unit ) {
            case 'k':
                $qty *= 1024;
                break;
            case 'm':
                $qty *= 1048576;
                break;
            case 'g':
                $qty *= 1073741824;
                break;
        }
        return $qty;
    }
}

/* START OF TEMPLATE PROCESS */
// After all the checks... are we good to process the template?
$goodToGo = true;

if(isset($_FILES["zip"])) {
    $filename = $_FILES["zip"]["name"];
    $source = $_FILES["zip"]["tmp_name"];
    $type = $_FILES["zip"]["type"];
    
    $name = explode(".", $filename);
    $accepted_types = array('application/zip', 'application/x-zip-compressed', 'multipart/x-zip', 'application/x-compressed');
    foreach($accepted_types as $mime_type) {
        if($mime_type == $type) {
            $okay = true;
            break;
        } 
    }

    // Check to see if the file uploaded is a zip file.
    $continue = (count($name) > 1 && strtolower(end($name)) == 'zip') ? true : false;
    if(!$continue) {
        $error = "The file you are trying to upload is not a .zip file. Please try again.";
        $goodToGo = false;
    }

    $targetPath = $uploadDir . '/' . $filename;
    $folderName = current(explode('.', $filename));

    if(move_uploaded_file($source, $targetPath)) {
        $zip = new ZipArchive();
        $exists = $zip->open($targetPath);

        // If file hasn't moved correctly...or upload errors
        if ($exists !== true) {
            $error = returnUploadError();
            $goodToGo = false;
        }

        // The template files need to be in the top level directory of the archive
        if ($zip->locateName('index.html') === false && $zip->locateName('index.htm') === false) {
            $error = "No index.htm or index.html file found in the top level directory within the archive.";
            $goodToGo = false;
        }

        // If we have passed all checks... rock and roll!
        if ($goodToGo === true) {

            // It removes the directory if it exists
            if (is_dir($uploadDir . '/' . $folderName)) {
                destroyDir($uploadDir . '/' . $folderName);
            }

            mkdir($uploadDir . '/' . $folderName);
            $zip->extractTo($uploadDir . '/' . $folderName); 

            // New convert process
            $process = new Convert();
            $process->setStrictMode($strictMode);
            $process->setHtmlDir($uploadDir . '/' . $folderName);
            $process->setTemplatesDir($installTemplateDir);
            $process->setWorkingDirectory($uploadDir);
            $process->setMetaData($metaData);
            $process->process($conversionResult === 'zip' ? true : false);

            $zip->close();
            
            // Remove the uploaded zip
            unlink($targetPath);

            // As the file is being downloaded, exit;
            if($conversionResult === 'zip' ? true : false) {
                exit;
            } else {
                $message = 'Template installed!';
            }
        }
    }
}
?>
<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>HTML Template to BaseKit Template</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Bootstrap core CSS -->
        <link href="bootstrap.css" rel="stylesheet">
    </head>
    <body>
        <div class="container">
<?php
        if(strlen($message) > 0) {
?>
            <div class="alert-message success">
                <p><?php echo($message) ?></p>
            </div>
<?php } else if(strlen($error) > 0) { ?>
            <div class="alert-message error">
                <p><strong><?php echo($error) ?></strong></p>
            </div>
<?php } ?>
            <!-- Add your site or application content here -->
            <h1>Convert HTML to BaseKit Template</h1>
            <form role="form" action="index.php" method="post" enctype="multipart/form-data">
            <input type="hidden" name="MAX_FILE_SIZE" value="104857600" /> 
              <div class="form-group">
                <label for="zip">Filename</label>
                <input type="file" name="zip" id="zip">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
<hr />
<h2>How To: HTML Template to BaseKit Template Convertor</h2>

<p>This utility has been built to help template developers convert flat HTML templates in BaseKit templates. The conversion process will do the following:</p>

<ul>
<li>Move all CSS and LESS files to <code>css/</code> folder and create a <code>stylesheet.less</code> file that will import detected CSS files.</li>
<li>All HTML files detected in the top level directory will be converted to twig files and added as page types to your metadata.json file.</li>
<li>Create a default metadata.json file with template name, pages types and swatches put in place.</li>
<li>Will convert any asset URLs found in HTML and CSS to use the correct Twig functions to generate the correct asset path URLs.</li>
<li>Will insert <code>basekit.headScript</code> at the bottom of your <code>&lt;HEAD&gt;</code> block and <code>basekit.bodyScript</code> at the bottom of your <code>&lt;BODY&gt;</code> block.</li>
<li>Zip up the converted files in a BaseKit ready format.</li>
</ul>


<h2>Uploading a HTML template</h2>

<p>The uploader accepts zip files containing the template. There are a few assumptions this convertor will make:</p>

<ul>
<li>The convertor expects the template to be the top level. For example index.html file should be in the top level directory within the zip. Do not put the all the template files within a folder within the zip.</li>
<li>The zip name file name will be used as the template name; i.e. <strong><em>aTemplate.zip</em></strong> will be converted to <strong><em>aTemplate</em></strong>.</li>
<li>The convertor expects an index.html (or index.htm) file. It will convert this to home.twig.</li>
<li>The zip file must be under 10MB file size.</li>
</ul>


<h2>Conversion</h2>

<p>A zip file structure should look something like this:</p>

<h3>HTML Format</h3>

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


<p>The above will be converted to:</p>

<h3>BaseKit Format</h3>

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


<h3>How can I view a BaseKit Template</h3>

<p>Install the template in our locally run TDK (template development kit).</p>

<h2>What the conversion will not do</h2>

<ul>
<li>It leaves it up to you to add a BaseKit zone to you TWIG files; Zones are the areas where a BaseKit user can drop widgets within to the page. i.e <code>{{zone('main')|raw}}</code>. For more information, checkout the <a href="http://basekit-templates.github.io/template-docs/twig-view.html">TWIG view documentation</a>.</li>
<li>There will be no template widgets added to your templates. This is a manual process that has to be completed by the developer.</li>
<li>Currently, this will not convert other Template formats. For example Wordpress themes.</li>
</ul>


<h2>Common Issues</h2>

<h3>My JavaScript doesn't work!</h3>

<p>If your JavaScript stops working. Try placing the calls to your JavaScript files below the <code>basekit.bodyScript</code>. In BaseKit, JQuery is added as late as possible into the page load so it is possible that BaseKit JQuery is overriding any functionality that you have added to your template.</p>

<p>For example, if your TWIG file has some like this at end of the file...</p>

<pre><code>    ...
    &lt;script src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js'&gt;&lt;/script&gt;
    &lt;script src="{{asset('js/modernizr.js')}}" type="text/javascript"&gt;&lt;/script&gt;
    &lt;script src="{{asset('js/isotope.js')}}" type="text/javascript"&gt;&lt;/script&gt;
    &lt;script src="{{asset('js/scripts.js')}}" type="text/javascript"&gt;&lt;/script&gt;    

    {% include basekit.bodyScript %}
&lt;/body&gt;
</code></pre>

<p>Move the SCRIPT tags below the <code>{% include basekit.bodyScript %}</code>:</p>

<pre><code>    ...

    {% include basekit.bodyScript %}

    &lt;script src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js'&gt;&lt;/script&gt;
    &lt;script src="{{asset('js/modernizr.js')}}" type="text/javascript"&gt;&lt;/script&gt;
    &lt;script src="{{asset('js/isotope.js')}}" type="text/javascript"&gt;&lt;/script&gt;
    &lt;script src="{{asset('js/scripts.js')}}" type="text/javascript"&gt;&lt;/script&gt;    
&lt;/body&gt;
</code></pre>

<h3>My template isn't rendering due to LESS rendering issues</h3>

<p>There could be number of reasons that your template doesn't load. Usually, this is down to the formatting issues within your now converted CSS files.</p>

<ul>
<li><p>Check that the files that are in the <code>stylesheet.less</code> are actually needed. Sometimes, the zip file will contain a lot more CSS/LESS files that aren't needed to style the template. Make sure the only the LESS files that are needed are included in <code>stylesheet.less</code>. Also note to make sure the <code>@imports</code> are in the right order.</p>

<p>  After conversion your <code>stylesheet.less</code> could easily look like this:</p>

<p>  <pre>
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
@import "@{templateLocal}/__MACOSX/._style.less";
@import "@{templateLocal}/__MACOSX/css/._bootstrap-responsive.min.less";
@import "@{templateLocal}/__MACOSX/css/._prettyPhoto.less";
@import "@{templateLocal}/__MACOSX/css/._bootstrap.min.less";
@import "@{templateLocal}/__MACOSX/css/._navigation-style-1.less";
</pre></p>

<p>  This should be trimmed down to the LESS files that are actually needed:</p>

<p>  <pre>
@import "@{templateLocal}/css/bootstrap.min.less";
@import "@{templateLocal}/css/bootstrap-responsive.min.less";
@import "@{templateLocal}/style.less";
@import "@{templateLocal}/css/navigation-style-1.less";
@import "@{templateLocal}/css/prettyPhoto.less";
@import "@{templateLocal}/css/jquery.bxslider.less";
@import "@{templateLocal}/css/font-awesome.min.less";
@import "@{templateLocal}/css/colors/color-red.less";
</pre></p></li>
<li><p>LESS is very sensitive to CSS semantic errors. If you are using the TDK, Check your browser's Developer console bar as LESS.js will most likely return back a parse error. From this, you will be able to see the offending file and line number of the syntax error. <strong>If your template isn't rendering, please check the Developer Tools console of your Browser. There'll be clues in there regarding the issue.</strong></p></li>
</ul>

<h2>Running the convertor locally</h2>

<p>Requirements:</p>

<ul>
<li>PHP 5.4 or greater</li>
<li>php-zip extension enabled</li>
</ul>


<p>Common issues:</p>

<ul>
<li>Make sure you can read from the <code>$htmlDir</code> (location of the HTML template)</li>
<li>Make sure you have write permissions to the <code>$templatesDir</code>  (location where the BaseKit Template will be written to) and <code>$workingDirectory</code>  (unzipping folder and general working dir)</li>
<li><code>screenshot.png</code> has the correct read permissions</li>
</ul>


<h2>More information about BaseKit Template Development</h2>

<p>If you're interested in finding out more about BaseKit Template Development, please find the documentation at this URL.</p>

<p><a href="http://developers.basekit.com/">http://developers.basekit.com/</a></p>

<p>Or contact me directly:</p>

<ul>
<li>twitter: @basekit</li>
<li>twitter: @richardhealy</li>
</ul>


<h3>The BaseKit Team</h3>
        </div>

    </body>
</html>