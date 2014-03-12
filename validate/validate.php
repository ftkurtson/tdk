<?php

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
        'screenshot',
        'thumbnail'
    );

    $requiredMetaImages = array(
        'screenshot',
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
