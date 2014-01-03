#!/usr/bin/env php
<?php
include 'config.php';
include 'metadata.php';
include 'class.convert.php';

$process = new Convert();
$process->setStrictMode(true);
$process->setHtmlDir($htmlDir);
$process->setTemplatesDir($templateDir);
$process->setMetaData($metaData);
$process->process(false); // no zip download


