<?php
define('_MN_USER', '599b4a10f7d8a98e781b9f77dd8df125db9773c7');
require_once($_SERVER['DOCUMENT_ROOT'].'/'._MN_USER.'/magenet.php');
$magenet = new Magenet();
echo $magenet->getLinks();
?>