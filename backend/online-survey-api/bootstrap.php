<?php
// Enable PHP error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// fail() function — ONLY ONCE
function fail($msg) {
    echo json_encode(["error" => $msg]);
    exit;
}

// CORS + JSON headers
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") { exit; }

// DB CONFIG
require_once(__DIR__ . '/dbconfig.php');

// Connect to MySQL
$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($mysqli->connect_errno) {
    fail("db-failed");
}
