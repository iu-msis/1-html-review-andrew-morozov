<?php


try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    // print_r($_POST);
    // echo file_get_contents('php://input');
    exit;
}

require("class/DbConnection.php");

$db = DbConnection::getConnection();

$stmt = $db->prepare(
  'UPDATE books SET 
    Title = ?,
    Author = ?,
    YearPublished = ?,
    Publisher = ?,
    PageCount = ?,
    MSRP = ?
  WHERE ID = ?'
);

$stmt->execute([
  $_POST['Title'],
  $_POST['Author'],
  $_POST['YearPublished'],
  $_POST['Publisher'],
  $_POST['PageCount'],
  $_POST['MSRP'],
  $_POST['ID']
]);

header('HTTP/1.1 303 See Other');
header('Location: ../book/');