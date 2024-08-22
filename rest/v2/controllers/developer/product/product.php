<?php
require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/product/Product.php';

$body = file_get_contents("php://input");
$data = json_decode($body, true);
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    // GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $result = require 'read.php';
        sendResponse($result);
        exit;
    }
    // POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $result = require 'create.php';
        sendResponse($result);
        exit;
    }
    // PUT
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $result = require 'update.php';
        sendResponse($result);
        exit;
    }
    // DELETE
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $result = require 'delete.php';
        sendResponse($result);
        exit;
    }
}

http_response_code(200);
checkAccess();
