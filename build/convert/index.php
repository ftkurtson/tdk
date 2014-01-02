<?php
include 'metadata.php';
include 'class.convert.php';

$strictMode = true;
$error = "";
$message = "";


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

if(isset($_FILES["zip"])) {
    $filename = $_FILES["zip"]["name"];
    $source = $_FILES["zip"]["tmp_name"];
    $type = $_FILES["zip"]["type"];
    
    $templateDir = '../../templates'; //$_POST['destination'];

    $name = explode(".", $filename);
    $accepted_types = array('application/zip', 'application/x-zip-compressed', 'multipart/x-zip', 'application/x-compressed');
    foreach($accepted_types as $mime_type) {
        if($mime_type == $type) {
            $okay = true;
            break;
        } 
    }

    $continue = (count($name) > 1 && strtolower(end($name)) == 'zip') ? true : false;

    if(!$continue) {
        $error = "The file you are trying to upload is not a .zip file. Please try again.";
    }

    $target_path = "/tmp/".$filename;  // change this to the correct site path
    $folderName = current(explode('.', $filename));
    if(move_uploaded_file($source, $target_path)) {
        $zip = new ZipArchive();
        $x = $zip->open($target_path);
        if ($x === true) {
            // It removes the directory if it exists
            if (is_dir('/tmp/' . $folderName)) {
                destroy_dir('/tmp/' . $folderName);
            }

            mkdir('/tmp/'.$folderName);
            $zip->extractTo('/tmp/'.$folderName); // change this to the correct site path

            $process = new Convert($strictMode, '/tmp/'.$folderName, $templateDir, $metadata);
            $process->process();

            $zip->close();
    
            unlink($target_path);
        }
        $message = "Your .zip file was uploaded and unpacked.";
    } else {    
        $error = "There was a problem with the upload. Please try again.";
    }
}
?>
<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
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
                <p><strong><?php echo($error) ?></p>
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
<!--
              <div class="form-group">
                <label for="destination">Destination</label>
                <input type="text" class="form-control" name="destination" id="destination">
                <p class="help-block">Destination directory: /usr/local/apache/emulator/templates/</p>
              </div>
-->
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
    </body>
</html>