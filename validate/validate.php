<?php
require "../lib/lessphp/lessc.inc.php";

$errors = array();

$templateName = $_GET['templateName'];
$templateName = preg_replace('/[^A-Za-z0-9_\-]/', '', $templateName);

if ($templateName) {
    $templateDir = "../templates/" . $templateName;

    if (is_dir($templateDir)) {
        $dir = scandir($templateDir);

        validateRequiredFiles($dir, $errors);
        validateMetadata($templateDir, $errors);
        validateTwigFiles($templateDir, $dir, $errors);
        validateLESS($templateDir, $errors);
        
    } else {
        $errors[] = sprintf("The directory '%s' does not exist", $templateDir);
    }    
    
} else {
    $errors[] = "No template name set";
}

$status = count($errors) ? false : true;
$response = array('success' => $status, 'errors' => $errors);

header('Content-Type: application/json; charset=utf-8');

echo json_encode($response, true);


/*** FUNCTIONS ***/
function validateRequiredFiles($dir, &$errors)
{
    $requiredFiles = array(
        'metadata.json',
        'default.twig',
        'stylesheet.less',
    );

    foreach ($requiredFiles as $fileName) {
        if (!in_array($fileName, $dir)) {
            $errors[] = sprintf("File '%s' does not exist", $fileName);
        }
    }
}

function validateMetadata($templateDir, &$errors)
{
    $requiredMetaElements = array(
        'name',
        'thumbnail'
    );

    $requiredMetaImages = array(
        'thumbnail',
    );

    $metadata = json_decode(file_get_contents($templateDir . '/metadata.json'), true);

    foreach ($requiredMetaElements as $element) {
        if (!isset($metadata[$element])) {
            $errors[] = sprintf("The element '%s' is missing from metadata.json", $element);
        } else {
            if (in_array($element, $requiredMetaImages)) {
                if (!file_exists($templateDir . '/' . $metadata[$element])) {
                    $errors[] = sprintf("The '%s' image '%s' is missing from the directory", $element, $metadata[$element]);
                }
            } elseif ($element === 'colorSwatches') {
                validateMetaColourSwatches($metadata, $errors);
            } elseif ($element === 'fontSwatch') {
                validateMetaFontSwatches($metadata, $errors);
            }
        }
    }
}

function validateMetaFontSwatches($metadata, &$errors)
{
    $allRequiredElements = array(
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'color',
        'letter-spacing'
    );

    $font6RequiredElements = array_merge(
        $allRequiredElements,
        array(
            'color-hover',
            'background-color',
            'background-color-hover'
        )
    );

    $font7RequiredElements = array_merge(
        $allRequiredElements,
        array(
            'background-color',
            'background-color-hover'
        )
    );

    $requiredFontSwatches = 10;

    for ($f=1;$f<=$requiredFontSwatches;$f++) {
        $fontName = 'font' . $f;
        if (!isset($metadata['fontSwatch'][$fontName])) {
            $errors[] = sprintf("The element ['fontSwatch']['%s'] is missing from metadata.json", $fontName);
        } else {
            switch ($f) {
                case '6':
                    $requiredElements = $font6RequiredElements;
                break;

                case '7':
                    $requiredElements = $font7RequiredElements;
                break;

                default:
                    $requiredElements = $allRequiredElements;
                break;
            }
            
            foreach ($requiredElements as $element) {
                if (!isset($metadata['fontSwatch'][$fontName][$element])) {
                    $errors[] = sprintf("The element ['fontSwatch']['%s']['%s'] is missing from metadata.json", $fontName, $element);
                }
            }
        }
    }
}

function validateMetaColourSwatches($metadata, &$errors)
{
    $requiredColourSwatches = 5;
    $requiredColourElements = 7;
    $colourSwatchRegex = '/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/';

    for ($s=1;$s<=$requiredColourSwatches;$s++) {
        $swatchName = 'Swatch ' . $s;
        if (!isset($metadata['colorSwatches'][$swatchName])) {
            $errors[] = sprintf("The element ['colorSwatches']['%s'] is missing from metadata.json", $swatchName);
        } else {
            for ($c=1;$c<=$requiredColourElements;$c++) {
                $colourName = 'color' . $c;
                if (!isset($metadata['colorSwatches'][$swatchName][$colourName])) {
                    $errors[] = sprintf("The element ['colorSwatches']['%s']['%s'] is missing from metadata.json", $swatchName, $colourName);
                } elseif (!preg_match($colourSwatchRegex, $metadata['colorSwatches'][$swatchName][$colourName])) {
                    $errors[] = sprintf("The element ['colorSwatches']['%s']['%s'] value '%s' is not in the correct format", $swatchName, $colourName, $metadata['colorSwatches'][$swatchName][$colourName]);
                }    
            }
        }
    }
}

function validateTwigFiles($templateDir, $dir, &$errors)
{
    $headScriptExists = $bodyScriptExists = false;
    $widgetRegex = "/{{widget\(['|\"][a-zA-Z0-9]+['|\"][,][\ ]*['|\"]([a-zA-Z0-9\_\-]+)['|\"]/";
    $includeScriptRegex = "/{\%[\ ]*include[\ ]*basekit\.(headScript)|(bodyScript)+[\ ]*%}/";

    // Check for duplicate widget names in twig files
    foreach ($dir as $fileName) {
        if (preg_match('/\.twig$/', $fileName)) {
            $twigContent = file_get_contents($templateDir . '/' . $fileName);

            if (preg_match_all($widgetRegex, $twigContent, $matches)) {
                $allWidgets = $matches[1];
                $counts = array_count_values($allWidgets);
                foreach ($counts as $widgetName => $widgetCount) {
                    if ($widgetCount > 1) {
                        $errors[] = sprintf("The widget name '%s' appears '%d' times in '%s'", $widgetName, $widgetCount, $fileName);
                    }
                }
            }

            if (preg_match_all($includeScriptRegex, $twigContent, $matches)) {
                if (isset($matches[1][0]) && $matches[1][0]) {
                    $headScriptExists = true;
                }
                if (isset($matches[2][1]) && $matches[2][1]) {
                    $bodyScriptExists = true;
                }
            }
        }
    }

    if (!$headScriptExists) {
        $errors[] = "There are no head scripts included in any of the twig files";
    }

    if (!$bodyScriptExists) {
        $errors[] = "There are no body scripts included in any of the twig files";
    }
}

function recruseImports($lessc, $templateDir, $fileLocation) {
     
    $str = file_get_contents($fileLocation);
    
    // Check LESS at this point
    $lessc->compile($str);
    
    $pattern = "/@import\W+?[\"\'](.*?)[\"\']\;/i";
    preg_match_all($pattern, $str, $matches);
    if(count($matches[0]) > 0) {
        for ($i = 0; $i < count($matches[0]); $i++) {
            
            $swapOutString = $matches[0][$i];
            $result = preg_replace($pattern, '$1', $swapOutString);
            $result = str_replace('@{templateCommon}', '../templates/common', $result);
            $result = str_replace('@{templateLocal}', $templateDir, $result);
            
            recruseImports($lessc, $templateDir, $result);
        }
    }
}

function validateLESS($templateDir, &$errors)
{
    $input =  array (
    'type' => 'css',
    'params' => 
    array (
        '@font-swatch1-font-family' => '"Futura", "Helvetica", sans-serif',
        '@font-swatch1-font-size' => '24px',
        '@font-swatch1-font-weight' => '400',
        '@font-swatch1-line-height' => '34px',
        '@font-swatch1-color' => '@color-swatch6',
        '@font-swatch2-font-family' => '"Futura", "Helvetica", sans-serif',
        '@font-swatch2-font-size' => '24px',
        '@font-swatch2-font-weight' => '400',
        '@font-swatch2-line-height' => '34px',
        '@font-swatch2-color' => '@color-swatch3',
        '@font-swatch3-font-family' => '"Futura", "Helvetica", sans-serif',
        '@font-swatch3-font-size' => '18px',
        '@font-swatch3-font-weight' => '400',
        '@font-swatch3-line-height' => '28px',
        '@font-swatch3-color' => '@color-swatch3',
        '@font-swatch4-font-family' => '"Futura", "Helvetica", sans-serif',
        '@font-swatch4-font-size' => '14px',
        '@font-swatch4-font-weight' => '400',
        '@font-swatch4-line-height' => '24px',
        '@font-swatch4-color' => '@color-swatch3',
        '@font-swatch5-font-family' => '"Futura", "Helvetica", sans-serif',
        '@font-swatch5-font-size' => '14px',
        '@font-swatch5-font-weight' => '400',
        '@font-swatch5-line-height' => '24px',
        '@font-swatch5-color' => '@color-swatch5',
        '@color-swatch1' => '#4a979d',
        '@color-swatch2' => '#eafffc',
        '@color-swatch3' => '#3e3e3e',
        '@color-swatch4' => '#6a6a6a',
        '@color-swatch5' => '#bdbdbd',
        '@siteBackgroundColor' => 'transparent',
        '@siteBackgroundGradientType' => 'vertical',
        '@siteBackgroundGradientFrom' => 'transparent',
        '@siteBackgroundGradientTo' => 'transparent',
        '@siteBackgroundImageScale' => 'original',
        '@siteBackgroundImage' => 'none',
        '@siteBackgroundPositionX' => 'center',
        '@siteBackgroundPositionY' => 'top',
        '@siteBackgroundRepeat' => 'no-repeat',
        '@font-swatch1-letter-spacing' => 'inherit',
        '@font-swatch2-letter-spacing' => 'inherit',
        '@font-swatch3-letter-spacing' => 'inherit',
        '@font-swatch4-letter-spacing' => 'inherit',
        '@font-swatch5-letter-spacing' => 'inherit',
        '@font-swatch6-font-family' => '"Futura", "Helvetica", sans-serif',
        '@font-swatch6-font-size' => '16px',
        '@font-swatch6-font-weight' => '400',
        '@font-swatch6-line-height' => '26px',
        '@font-swatch6-letter-spacing' => 'inherit',
        '@font-swatch6-color' => '@color-swatch5',
        '@font-swatch6-color-hover' => '@color-swatch5',
        '@font-swatch6-background-color' => 'transparent',
        '@font-swatch6-background-color-hover' => 'transparent',
        '@font-swatch7-font-family' => '"Futura", "Helvetica", sans-serif',
        '@font-swatch7-font-size' => '18px',
        '@font-swatch7-font-weight' => '400',
        '@font-swatch7-line-height' => '28px',
        '@font-swatch7-letter-spacing' => 'inherit',
        '@font-swatch7-color' => '@color-swatch5',
        '@font-swatch7-background-color' => 'transparent',
        '@font-swatch7-background-color-hover' => 'darken(@color-swatch1,5%)',
        '@color-swatch6' => '#ffffff',
        '@color-swatch7' => '#f4f4f4',
        '@font-swatch8-font-family' => '"Futura", "Helvetica", sans-serif',
        '@font-swatch8-font-size' => '18px',
        '@font-swatch8-font-weight' => '400',
        '@font-swatch8-line-height' => '28px',
        '@font-swatch8-letter-spacing' => 'inherit',
        '@font-swatch8-color' => '@color-swatch5',
        '@font-swatch9-font-family' => '"Futura", "Helvetica", sans-serif',
        '@font-swatch9-font-size' => '18px',
        '@font-swatch9-font-weight' => '400',
        '@font-swatch9-line-height' => '28px',
        '@font-swatch9-letter-spacing' => 'inherit',
        '@font-swatch9-color' => '@color-swatch5',
        '@font-swatch10-font-family' => '"Futura", "Helvetica", sans-serif',
        '@font-swatch10-font-size' => '24px',
        '@font-swatch10-font-weight' => '400',
        '@font-swatch10-line-height' => '34px',
        '@font-swatch10-letter-spacing' => 'inherit',
        '@font-swatch10-color' => '@color-swatch5',
    ),
    'options' => 
        array (
            'compress' => 1,
        )
    );

    $lessc = new lessc();
    $lessc->setImportDir(array($templateDir, __DIR__ . '../templates'));
    
    // convert any relative image URL's to use the FQDN
    $assetDomain = null;
    $assetVersion = null;
    $templateDirectory = $templateDir;
    $templateHash = null;
    $lessc->registerFunction(
        'image',
        function ($arg) use ($assetDomain, $templateDirectory, $templateHash, $assetVersion) {
            list($type, $delim, $path) = $arg;
            $url = sprintf(
                '//%s/%s/templates',
                $assetDomain,
                $templateHash ? $templateHash : $assetVersion
            );
            if ($templateDirectory) {
                $url .= "/$templateDirectory";
            }
            $url .= $path[0];
            return array($type, '', array(" url($url)"));
        }
    );

    $lessc->registerFunction(
        'bkscale',
        function ($arg) {
            list($type, $delim, $args) = $arg;

            $value = isset($args[0]) && isset($args[0][1]) ? $args[0][1] : '';
            $unit = isset($args[0]) && isset($args[0][2]) ? $args[0][2] : '';
            $scale = isset($args[1]) && isset($args[1][1]) ? $args[1][1] : '';
            $intValue = intval($value);
            $floatScale = floatval($scale);
            $returnValue = array();

            if ($intValue > 0 && $floatScale > 0) {
                $newScale = ($intValue * $floatScale);
                $returnValue = array('string', '', array($newScale . $unit));
            } else {
                // return back the original value
                $returnValue = array('string', '', array($value));
            }

            return $returnValue;
        }
    );

    if (null !== $templateDirectory) {
        $input['params']['@templateLocal'] = '"' . $templateDirectory . '"';
    } else {
        $input['params']['@templateLocal'] = '""';
    }

    $input['params']['@templateCommon'] = '"../templates/common"';

    //  Any passed in variables used to populate the parsed CSS
    if (isset($input['params']) && is_array($input['params']) && count($input['params']) > 0) {
        $lessc->setVariables($input['params']);
    }

    if (isset($input['options']) &&
        isset($input['options']['compress']) &&
        $input['options']['compress'] == true) {
        $lessc->setFormatter("compressed");
    }

    try {
        recruseImports($lessc, $templateDir,  $templateDir .'/stylesheet.less');
    } catch (\Exception $e) {
        $errors[] = "LESS Error: ". $e->getMessage();
    }
}
