#!/usr/bin/env php
<?php
include 'config.php';
include 'metadata.php';
include 'class.convert.php';

$process = new Convert(true, $htmlDir, $templateDir, $metadata);
$process->process();


