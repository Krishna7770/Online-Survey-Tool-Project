<?php
require_once __DIR__ . "/bootstrap.php";

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) fail("invalid-json");

$email = trim($data["email"] ?? "");
$pass = trim($data["password"] ?? "");

if ($email === "" || $pass === "") {
    fail("missing-fields");
}

$stmt = $mysqli->prepare("SELECT userid, password FROM user WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 0) {
    fail("no-such-user");
}

$row = $res->fetch_assoc();

// verify password
if (!password_verify($pass, $row["password"])) {
    fail("wrong-password");
}

// create simple token
$token = bin2hex(random_bytes(16));

echo json_encode([
  "success" => true,
  "userid" => $row["userid"],
  "token" => $token
]);
