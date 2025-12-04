<?php
// Turn on PHP error reporting (good while developing)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . "/bootstrap.php";  // gives $mysqli + fail()

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail("invalid-method");
}

// Read JSON body
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (!$data) {
    fail("invalid-json");
}

$qid     = isset($data["qid"]) ? (int)$data["qid"] : 0;
$userid  = isset($data["userid"]) ? (int)$data["userid"] : 0;
$answers = isset($data["answers"]) ? $data["answers"] : null;

if ($qid <= 0 || $userid <= 0 || !is_array($answers)) {
    fail("missing-fields");
}

// 1) Create one instance row (qinstance)
$stmt = $mysqli->prepare("INSERT INTO qinstance (qid, userid) VALUES (?, ?)");
if (!$stmt) {
    fail("prepare-instance-failed");
}
$stmt->bind_param("ii", $qid, $userid);
$ok = $stmt->execute();
if (!$ok) {
    fail("insert-instance-failed");
}
$qiid = $stmt->insert_id;

// 2) Prepare insert for each answer into qanswer
//    qanswer: aid, qiid, fid, atype, avalue :contentReference[oaicite:0]{index=0}
$ansStmt = $mysqli->prepare(
    "INSERT INTO qanswer (qiid, fid, atype, avalue) VALUES (?, ?, ?, ?)"
);
if (!$ansStmt) {
    fail("prepare-answer-failed");
}

foreach ($answers as $a) {
    if (!is_array($a)) continue;

    $qidStr = $a["questionId"] ?? "";
    if (!is_string($qidStr)) continue;

    // questionId format from getSurvey.php is "q-<fid>" :contentReference[oaicite:1]{index=1}
    if (!preg_match('/^q-(\d+)$/', $qidStr, $m)) {
        continue;
    }

    $fid = (int)$m[1];
    if ($fid <= 0) continue;

    if (!array_key_exists("value", $a)) continue;
    $val = $a["value"];

    // Skip empty values
    if ($val === "" || $val === null) {
        continue;
    }

    // Determine type + normalize value
    if (is_numeric($val)) {
        $atype = "number";
        $valStr = (string)$val;
    } elseif (is_array($val)) {
        $atype = "json";
        $valStr = json_encode($val);
    } else {
        $atype = "text";
        $valStr = (string)$val;
    }

    $ansStmt->bind_param("iiss", $qiid, $fid, $atype, $valStr);
    $ok = $ansStmt->execute();
    if (!$ok) {
        // Do not fail the whole submit for one bad row, just log it
        error_log("Failed to insert answer for fid=$fid: " . $ansStmt->error);
    }
}

// Final success response
echo json_encode([
    "success" => true,
    "qiid"    => $qiid
]);
