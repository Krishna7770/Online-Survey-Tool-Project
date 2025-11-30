<?php
header("Content-Type: application/json; charset=utf-8");
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") { exit; }

// PATH TO YOUR DB CONFIG:
require_once "C:\Users\Acer\BST2025\Dynamic Project\online-survey-tool\dbconfig.php";

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($mysqli->connect_errno) {
    echo json_encode(["error" => "db-failed"]);
    exit;
}

function fail($msg) {
    echo json_encode(["error" => $msg]);
    exit;
}
