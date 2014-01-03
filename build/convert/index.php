<?php
include 'metadata.php';
include 'class.convert.php';

$conversionResult = 'install'; // (string) 'zip' or  'install'
$installTemplateDir = '../../templates'; // only needed if $conversionResult = 'install'
$uploadDir = '/tmp';
$strictMode = true;
$error = "";
$message = "";

function destroyDir($dir) { 
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

if(isset($_FILES["zip"])) {
    $filename = $_FILES["zip"]["name"];
    $source = $_FILES["zip"]["tmp_name"];
    $type = $_FILES["zip"]["type"];
    
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

    $targetPath = $uploadDir . '/' . $filename;
    $folderName = current(explode('.', $filename));
    if(move_uploaded_file($source, $targetPath)) {
        $zip = new ZipArchive();
        $exists = $zip->open($targetPath);
        if ($exists === true) {
            // It removes the directory if it exists
            if (is_dir($uploadDir . '/' . $folderName)) {
                destroyDir($uploadDir . '/' . $folderName);
            }

            mkdir($uploadDir . '/' . $folderName);
            $zip->extractTo($uploadDir . '/' . $folderName); 

            // New Convert Process
            $process = new Convert();
            $process->setStrictMode($strictMode);
            $process->setHtmlDir($uploadDir . '/' . $folderName);
            $process->setTemplatesDir($installTemplateDir);
            $process->setMetaData($metaData);
            $process->process($conversionResult == 'zip' ? true : false);

            $zip->close();
            
            // Remove the uploaded zip
            unlink($targetPath);

            // As the file is being downloaded, exit;
            if($conversionResult == 'zip' ? true : false) {
                exit;
            }
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
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
    </body>
</html>