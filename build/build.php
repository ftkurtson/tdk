<?php

$basekitDir = '/var/www/basekit';
$sdkDir = '/var/www/sdk';

// Copy widget Twig files

$source = $basekitDir . '/assets/twig';
$destination = $sdkDir . '/widgets';

foreach (new DirectoryIterator($source) as $fileInfo) {
    if ($fileInfo->isDot()) {
        continue;
    }

    $filename = $fileInfo->getFilename();
    $extension = $fileInfo->getExtension();

    if (substr($filename, 0, 6) == 'widget' && $extension == 'twig') {
        $from = $source . '/' . $filename;
        $to = $destination . '/' . $filename;

        if (file_exists($to)) {
            unlink($to);
        }

        copy($from, $to);
    }
}

// Build widget JS into a single file

$source = $basekitDir . '/assets/public/site/widgets';
$destination = $sdkDir . '/widgets';

$widgetsJs = '';

foreach (new DirectoryIterator($source) as $fileInfo) {
    if ($fileInfo->isDot()) {
        continue;
    }

    $filename = $fileInfo->getFilename();
    $extension = $fileInfo->getExtension();

    if ($fileInfo->isDir()) {
        $file = $source . '/' . $filename . '/' . $filename . '.js';
        if (file_exists($file)) {
            $widgetsJs .= file_get_contents($file);
        }
    }
}

$to = $destination . '/widgets.js';

if (file_exists($to)) {
    unlink($to);
}

file_put_contents($to, $widgetsJs);

// Copy other individual files

$rules = array(
    $basekitDir . '/assets/public/site/widgets/widgetcore.js' => $sdkDir . '/widgets/widgetcore.js',
    $basekitDir . '/assets/public/apps/js/framework/components/component/component.js' => $sdkDir . '/templates/common/component.js',
    $basekitDir . '/assets/public/apps/js/framework/basekit.js' => $sdkDir . '/templates/common/basekit.js',
    $basekitDir . '/templates/common/responsive-columns.css' => $sdkDir . '/templates/common/responsive-columns.css',
    $basekitDir . '/templates/common/template-common.css' => $sdkDir . '/templates/common/template-common.css',
    $basekitDir . '/assets/public/libs/google-fonts.js' => $sdkDir . '/templates/common/google-fonts.js'
);

foreach ($rules as $from => $to) {
    if (!file_exists($from)) {
        echo "Source file {$from} does not exist" . PHP_EOL;
        exit(-1);
    }

    if (file_exists($to)) {
        unlink($to);
    }

    copy($from, $to);
}
