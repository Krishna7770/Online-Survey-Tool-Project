<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . "/bootstrap.php";

// Read JSON input
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    fail("invalid-json");
}

$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if ($email === "" || $password === "") {
    fail("missing-fields");
}

// Hash password
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Insert user
$stmt = $mysqli->prepare("INSERT INTO user (email, password) VALUES (?, ?)");
if (!$stmt) fail("prepare-failed");

$stmt->bind_param("ss", $email, $hashed);   // EXACTLY TWO PARAMETERS
$ok = $stmt->execute();

if (!$ok) {
    fail("email-exists-or-db-error");
}

echo json_encode([
    "success" => true,
    "userid" => $stmt->insert_id
]);
