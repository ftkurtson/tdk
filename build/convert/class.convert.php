<?php
// base class with member properties and methods
class Convert {

    var $strictMode;
    var $htmlDir;
    var $templateDir;
    var $metadata;

    var $cssFileList = array();
    var $pageTypeList = array();

    function Convert($strictMode = true, $htmlDir="", $templateDir="", $metadata) {
        $this->strictMode = $strictMode;
        $this->htmlDir = $htmlDir;
        $this->templateDir = $templateDir;
        $this->metadata = $metadata;
    }

    function destroy_dir($dir) { 
    if (!is_dir($dir) || is_link($dir)) return unlink($dir); 
        foreach (scandir($dir) as $file) { 
            if ($file == '.' || $file == '..') continue; 
            if (!destroy_dir($dir . DIRECTORY_SEPARATOR . $file)) { 
                chmod($dir . DIRECTORY_SEPARATOR . $file, 0777); 
                if (!destroy_dir($dir . DIRECTORY_SEPARATOR . $file)) return false; 
            }; 
        } 
        return rmdir($dir); 
    }

    function recurse_copy($src, $dst) {
        $dir = opendir($src);
        @mkdir($dst); 
        while(false !== ( $file = readdir($dir)) ) { 
            if (( $file != '.' ) && ( $file != '..' )) { 
                if ( is_dir($src . '/' . $file) ) { 
                    $this->recurse_copy($src . '/' . $file, $dst . '/' . $file); 
                } else { 
                    // Check for css files
                    $fileLocation = $src . '/' . $file;
                    $fileDestination = $dst . '/' . $file;
                    if(strpos($file, '.css') || strpos($file, '.less')) {
                        // Change all css files to less files
                        $file = str_replace(array('css'), 'less', $file);
                        $fileDestination = $dst . '/' . $file;

                        array_push($this->cssFileList, str_replace($this->htmlDir, '', $src . '/' . $file));
                        $css = file_get_contents($fileLocation);
                        $css = $this->add_image_to_css($css);
                        file_put_contents($fileDestination, $css);
                    } else if(strpos($file, '.css')) {

                        $html = file_get_contents($fileLocation);
                        $html = $this->add_asset_to_html($html);
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
        // Add asset for IMG tags
        $html = preg_replace('/(<img\b.+?src=\")(?!http)([^\"]*)(\".*?\/?>)/', '$1{{asset(\'$2\')}}$3', $html);

        if ($this->strictMode === true) {
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

    function process () {
        $exploded = explode('/', $this->htmlDir);
        $templateName = end($exploded);
        $templateDestination = $this->templateDir . '/' . $templateName;

        // It removes the directory if it exists
        if (is_dir($templateDestination)) {
            $this->destroy_dir($templateDestination);
        }

        mkdir($templateDestination);

        foreach (new DirectoryIterator($this->htmlDir) as $fileInfo) {
            if ($fileInfo->isDot()) {
                continue;
            }

            $filename = $fileInfo->getFilename();
            $extension = $fileInfo->getExtension();
            $from = $this->htmlDir . '/' . $filename;
            $to = $templateDestination . '/' . $filename;

            if ($fileInfo->isDir()) {
                $this->recurse_copy($from, $to);
            } else if ($fileInfo->isFile() && in_array($extension, array('html','htm')) ) {

                $filename = str_replace(array('html', 'htm'), 'twig', $filename);
                $filename = str_replace(array('index.'), 'home.', $filename);

                array_push($this->pageTypeList, str_replace('.twig', '', $filename));

                // Over the the to varialbe now that we've changed the file name
                $to = $templateDestination . '/' . $filename;

                $html = file_get_contents($from);
                $html = $this->add_asset_to_html($html);
                file_put_contents($to, $html);
            } else if ($fileInfo->isFile() && in_array($extension, array('css','less')) ) {
                
                $filename = str_replace(array('css'), 'less', $filename);

                array_push($this->cssFileList, '/' . $filename);

                // Over the the to varialbe now that we've changed the file name
                $to = $templateDestination . '/' . $filename;

                $css = file_get_contents($from);
                $css = $this->add_image_to_css($css);

                file_put_contents($to, $css);
            }
        }


        // make metajson.less
        $this->metadata['name'] = $templateName;
        $this->metadata['screenshot'] = $templateName . '.png';
        $this->metadata['thumbnail'] = $templateName . '.png';
        $this->metadata['pageTypes'] = $this->pageTypeList;
        file_put_contents($templateDestination . '/metadata.json', json_encode($this->metadata, JSON_PRETTY_PRINT));

        // make stylesheet.less
        $css = "";
        foreach ($this->cssFileList as $cssFile) {
            $css .= '@import "@{templateLocal}' . $cssFile . '";' . PHP_EOL;
        }

        file_put_contents($templateDestination . '/stylesheet.less', $css);

        // Add image with template name
        copy('screenshot.png', $this->templateDir . '/' . $templateName . '/' . $this->metadata['thumbnail']);
    }
} 