#!/usr/bin/env php
<?php
include 'metadata.php';

$strictMode = true;
$htmlDir = '/Users/admin/Desktop/trendsetter';
$templateDir = '/usr/local/zend/apache2/htdocs/emulator/templates';

$cssFileList = array();
$pageTypeList = array();

function recurse_copy($src, $dst) {
    global $htmlDir, $cssFileList;
    $dir = opendir($src); 
    @mkdir($dst); 
    while(false !== ( $file = readdir($dir)) ) { 
        if (( $file != '.' ) && ( $file != '..' )) { 
            if ( is_dir($src . '/' . $file) ) { 
                recurse_copy($src . '/' . $file, $dst . '/' . $file); 
            } else { 
                // Check for css files
                $fileLocation = $src . '/' . $file;
                $fileDestination = $dst . '/' . $file;
                if(strpos($file, '.css') || strpos($file, '.less')) {
                    // Change all css files to less files
                    $file = str_replace(array('css'), 'less', $file);
                    $fileDestination = $dst . '/' . $file;

                    array_push($cssFileList, str_replace($htmlDir, '', $src . '/' . $file));
                    $css = file_get_contents($fileLocation);
                    $css = add_image_to_css($css);
                    file_put_contents($fileDestination, $css);
                } else if(strpos($file, '.css')) {

                    $html = file_get_contents($fileLocation);
                    $html = add_asset_to_html($html);
                    file_put_contents($fileDestination, $html);
                } else {
                    copy($fileLocation, $fileDestination);
                }
            } 
        } 
    } 

    closedir($dir); 
}

function add_asset_to_html($html) {
    global $strictMode;
    // Add asset for IMG tags
    $html = preg_replace('/(<img\b.+?src=\")(?!http)([^\"]*)(\".*?\/?>)/', '$1{{asset(\'$2\')}}$3', $html);

    if ($strictMode === true) {
        // Remove all LINK tags
        $html = preg_replace('/(<link\b.+?href=\")(?!http)([^\"]*)(\".*?>)/', '', $html);

        // Strict mode - Insert head script
        $headHTML = <<<HTML
<link rel="stylesheet" href="//{{env.assetDomain}}/templates/common/responsive-columns.css" />
{% include basekit.headScript %}
</head>
HTML;
        $html = str_replace("</head>", $headHTML, $html);

        // Strict mode - Insert body script
        $bodyHTML = <<<HTML
{% include basekit.bodyScript %}
</body>
HTML;
        $html = str_replace("</body>", $bodyHTML, $html);
    } else {
        // Add asset for LINK tags
        $html = preg_replace('/(<link\b.+?href=\")(?!http)([^\"]*)(\".*?>)/', '$1{{asset(\'$2\')}}$3$4', $html);
    }

    // Add asset for SCRIPT tags
    $html = preg_replace('/(<script\b.+?src=\")(?!http)([^\"]*)(\".*?>)/', '$1{{asset(\'$2\')}}$3', $html);
    
    // Deal with CSS iamges in the HTML
    $html = preg_replace('/(style="\b.+?url\(\')(?!http)([^\']*)(\'.*?")/', '$1{{asset(\'$2\')}}$3', $html);

    return $html;
}

function add_image_to_css($css) {
    // path traversal doesn't work in BaseKit templates, remove them
    $css = str_replace("../", "/", $css);

    $css = preg_replace('/(?<!@import )(url\([\'\"]?)(?!http)([^\)]*)([\'\"]?\))/', 'image(\'/$2\'$3', $css);
    
    // Clean up a few string issues that could occur.
    $css = str_replace("(''", "('", $css);
    $css = str_replace("'')", "')", $css);
    $css = str_replace("//", "/", $css);
    
    $css = str_replace(".css", ".less", $css);
    return $css;
}

$templateName = end(explode('/', $htmlDir));
$templateDestination = $templateDir . '/' . $templateName;
mkdir($templateDestination);

foreach (new DirectoryIterator($htmlDir) as $fileInfo) {
    if ($fileInfo->isDot()) {
        continue;
    }

    $filename = $fileInfo->getFilename();
    $extension = $fileInfo->getExtension();
    $from = $htmlDir . '/' . $filename;
    $to = $templateDestination . '/' . $filename;

    if ($fileInfo->isDir()) {
    	recurse_copy($from, $to);
    } else if ($fileInfo->isFile() && in_array($extension, array('html','htm')) ) {

        array_push($pageTypeList, $filename);

        $filename = str_replace(array('html', 'htm'), 'twig', $filename);
        $filename = str_replace(array('index.'), 'home.', $filename);

        // Over the the to varialbe now that we've changed the file name
		$to = $templateDestination . '/' . $filename;

        $html = file_get_contents($from);
        $html = add_asset_to_html($html);
        file_put_contents($to, $html);
    } else if ($fileInfo->isFile() && in_array($extension, array('css','less')) ) {
        
        $filename = str_replace(array('css'), 'less', $filename);

        array_push($cssFileList, '/' . $filename);

        // Over the the to varialbe now that we've changed the file name
        $to = $templateDestination . '/' . $filename;

        $css = file_get_contents($from);
        $css = add_image_to_css($css);

        file_put_contents($to, $css);
    }
}


// make metajson.less
$metadata['name'] = $templateName;
$metadata['screenshot'] = $templateName . '.png';
$metadata['thumbnail'] = $templateName . '.png';
$metadata['pageTypes'] = $pageTypeList;
file_put_contents($templateDestination . '/metadata.json', json_encode($metadata));

// make stylesheet.less
$css = "";
foreach ($cssFileList as $cssFile) {
    $css .= '@import "@{templateLocal}' . $cssFile . '";' . PHP_EOL;
}

file_put_contents($templateDestination . '/stylesheet.less', $css);

// Add image with template name
copy('screenshot.png', $templateDir . '/' . $templateName . '/' . $metadata['thumbnail']);


