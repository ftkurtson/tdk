<?php

header('X-XSS-Protection', '0');

if (!empty($_POST) && isset($_POST['html'])) {
	$html = base64_decode($_POST['html']);

	if (isset($_POST['css'])) {
		$pos = stripos($html, '</head>');
		$html = substr($html, 0, $pos) . '<style>' . base64_decode($_POST['css']) . '</style>' . substr($html, $pos);
	}

	if (isset($_POST['js'])) {
		$pos = stripos($html, '</head>');
		$html = substr($html, 0, $pos) . '<script>' . base64_decode($_POST['js']) . '</script>' . substr($html, $pos);
	}
	echo $html;
} else {
	echo file_get_contents('blank.htm');
}
