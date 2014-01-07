<?php
include 'class.zip.php';

class Convert {

    var $strictMode;
    var $htmlDir;
    var $templatesDir;
    var $metadata;
    var $workingDirectory = "/tmp/";

    var $cssFileList = array();
    var $pageTypeList = array();

    private $templateDestination;
    private $templateName;

    function setStrictMode($strictMode) {
        $this->strictMode = $strictMode;
    }

    function setHtmlDir($htmlDir) {
        $this->htmlDir = $htmlDir;
    }

    function setTemplatesDir($templatesDir) {
        $this->templatesDir = $templatesDir;
    }

    function setMetaData($metadata) {
        $this->metadata = $metadata;
    }

    function setWorkingDirectory($dir) {
        $this->workingDirectory = $dir;
    }

    private function destroyDir($dir) { 
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

    private function recurseCopy($src, $dst) {
        $dir = opendir($src);
        @mkdir($dst); 
        while(false !== ( $file = readdir($dir)) ) { 
            if (( $file != '.' ) && ( $file != '..' )) { 
                if ( is_dir($src . '/' . $file) ) { 
                    $this->recurseCopy($src . '/' . $file, $dst . '/' . $file); 
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
                        $css = $this->addImageToCss($css);
                        file_put_contents($fileDestination, $css);
                    } else if(strpos($file, '.css')) {

                        $html = file_get_contents($fileLocation);
                        $html = $this->addImageToHtml($html);
                        file_put_contents($fileDestination, $html);
                    } else {
                        copy($fileLocation, $fileDestination);
                    }
                } 
            } 
        } 

        closedir($dir); 
    }

    private function addImageToHtml($html) {
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

    private function addImageToCss($css) {
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

    private function downloadAsZip() {
        try {
            $finalSrc = $this->templatesDir . '/' . $this->templateName . '/';
            $zipName = $this->templateName . "-" .time() . ".zip";
            $tmpDest = $this->workingDirectory . $zipName;
            App_File_Zip::CreateFromFilesystem($finalSrc, $tmpDest);
            
            // Destroy the final src
            destroyDir($finalSrc);

            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="'.basename($zipName).'"');
            header('Content-Length: ' . filesize($tmpDest));
            readfile($tmpDest);

            // Remove the unpacks directory 
            destroyDir($this->workingDirectory . $this->templateName);

            // Remove zip from the tmp dir
            unlink($tmpDest);

        } catch (App_File_Zip_Exception $e) {
            // Zip file was not created.
            destroyDir($finalSrc);
        }
    }

    private function createMetaDataFile(){
        // make metajson.less
        $this->metadata['name'] = $this->templateName;
        $this->metadata['screenshot'] = $this->templateName . '.png';
        $this->metadata['thumbnail'] = $this->templateName . '.png';
        $this->metadata['pageTypes'] = $this->pageTypeList;
        file_put_contents($this->templateDestination . '/metadata.json', json_encode($this->metadata, JSON_PRETTY_PRINT));
    }

    private function createLessFile() {
        $css = "";
        foreach ($this->cssFileList as $cssFile) {
            $css .= '@import "@{templateLocal}' . $cssFile . '";' . PHP_EOL;
        }

        file_put_contents($this->templateDestination . '/stylesheet.less', $css);
    }

    private function createScreenshot() {
        // Add image with template name
        copy('screenshot.png', $this->templateDestination . '/' . $this->metadata['thumbnail']);
    }

    private function transferHtmlFilesToBKFormat() {

        // It removes the directory if it exists
        if (is_dir($this->templateDestination)) {
            $this->destroyDir($this->templateDestination);
        }

        mkdir($this->templateDestination);

        foreach (new DirectoryIterator($this->htmlDir) as $fileInfo) {
            if ($fileInfo->isDot()) {
                continue;
            }

            $filename = $fileInfo->getFilename();
            $extension = $fileInfo->getExtension();
            $from = $this->htmlDir . '/' . $filename;
            $to = $this->templateDestination . '/' . $filename;

            if ($fileInfo->isDir()) {
                $this->recurseCopy($from, $to);
            } else if ($fileInfo->isFile() && in_array($extension, array('html','htm')) ) {

                $filename = str_replace(array('html', 'htm'), 'twig', $filename);
                $filename = str_replace(array('index.'), 'home.', $filename);

                array_push($this->pageTypeList, str_replace('.twig', '', $filename));

                // Over the the to varialbe now that we've changed the file name
                $to = $this->templateDestination . '/' . $filename;

                $html = file_get_contents($from);
                $html = $this->addImageToHtml($html);
                file_put_contents($to, $html);
            } else if ($fileInfo->isFile() && in_array($extension, array('css','less')) ) {
                
                $filename = str_replace(array('css'), 'less', $filename);

                array_push($this->cssFileList, '/' . $filename);

                // Over the the to varialbe now that we've changed the file name
                $to = $this->templateDestination . '/' . $filename;

                $css = file_get_contents($from);
                $css = $this->addImageToCss($css);

                file_put_contents($to, $css);
            }
        }
    }

    public function process($zip = false) {
        $exploded = explode('/', $this->htmlDir);
        $this->templateName = end($exploded);
        $this->templateDestination = $this->templatesDir . '/' . $this->templateName;

        $this->transferHtmlFilesToBKFormat();
        $this->createMetaDataFile();
        $this->createLessFile();
        $this->createScreenshot();

        if($zip === true) {
            $this->downloadAsZip();
        }
    }
} 