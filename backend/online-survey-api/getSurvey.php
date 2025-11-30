<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . "/bootstrap.php";

$qid = isset($_GET['qid']) ? (int)$_GET['qid'] : 0;
if ($qid <= 0) fail("missing qid");

// 1) Load questionnaire
$q = $mysqli->prepare("SELECT qid, description FROM questionnaire WHERE qid=? AND active=1");
$q->bind_param("i", $qid);
$q->execute();
$res = $q->get_result();
$row = $res->fetch_assoc();
if (!$row) fail("survey-not-found");

$survey = [
    "surveyId" => "survey-" . $row["qid"],
    "title" => $row["description"],
    "pages" => []
];

// 2) Load pages
$pageStmt = $mysqli->prepare("
    SELECT pid, ptitle, pseqnum, pgeneralinline
    FROM qpage
    WHERE qid=?
    ORDER BY pseqnum ASC
");
$pageStmt->bind_param("i", $qid);
$pageStmt->execute();
$pagesRes = $pageStmt->get_result();

while ($p = $pagesRes->fetch_assoc()) {

    $page = [
        "pageId" => "page-" . $p["pid"],
        "title" => $p["ptitle"],
        "introText" => $p["pgeneralinline"] ?? "",
        "categories" => []
    ];

    // 3) Load categories (groups)
    $groupStmt = $mysqli->prepare("
        SELECT gid, gtitle, gseqnum
        FROM qgroup
        WHERE pid=?
        ORDER BY gseqnum ASC
    ");
    $groupStmt->bind_param("i", $p["pid"]);
    $groupStmt->execute();
    $groupsRes = $groupStmt->get_result();

    while ($g = $groupsRes->fetch_assoc()) {

        $categoryTitle = $g["gtitle"];

        $category = [
            "categoryId" => "cat-" . $g["gid"],
            "title" => $categoryTitle,
            "questions" => []
        ];

        // 4) Load questions
        $fieldStmt = $mysqli->prepare("
            SELECT fid, ftitle, fseqnum
            FROM qfield
            WHERE gid=?
            ORDER BY fseqnum ASC
        ");
        $fieldStmt->bind_param("i", $g["gid"]);
        $fieldStmt->execute();
        $fieldsRes = $fieldStmt->get_result();

        while ($f = $fieldsRes->fetch_assoc()) {

            error_log("PROCESSING FIELD ID = " . $f["fid"]);

            $fid = (int)$f["fid"];
            $label = $f["ftitle"];
            $type = null;
            $extra = [];

            // TEXT / DATE
            $t = $mysqli->query("SELECT ftstoreas FROM ftext WHERE ftid=$fid");
            if ($t && $t->num_rows > 0) {
                $rowT = $t->fetch_assoc();
                $type = ($rowT["ftstoreas"] === "DATE") ? "date" : "text";
            }

            // SLIDER
            if ($type === null) {
                $s = $mysqli->query("SELECT fsrangeb, fsrangee FROM fslider WHERE fsid=$fid");
                if ($s && $s->num_rows > 0) {
                    $rowS = $s->fetch_assoc();
                    $type = "slider";
                    $extra = [
                        "min" => (double)$rowS["fsrangeb"],
                        "max" => (double)$rowS["fsrangee"],
                        "step" => 1
                    ];
                }
            }

            // CHOICE (radio/dropdown)
            if ($type === null) {
                $c = $mysqli->query("SELECT fclabel, fcoutvalid FROM fchoice WHERE fcid=$fid ORDER BY fcseqnum ASC");
                if ($c && $c->num_rows > 0) {
                    $type = "dropdown";
                    $options = [];
                    while ($o = $c->fetch_assoc()) {
                        $options[] = [
                            "value" => (int)$o["fcoutvalid"],
                            "text" => $o["fclabel"]
                        ];
                    }
                    $extra["options"] = $options;
                }
            }

            // Skip XY
            if ($type === null) continue;

            // scoring group for radar chart (only numeric)
            $scoringGroup = ($type === "slider") ? $categoryTitle : null;

            $question = array_merge([
                "questionId" => "q-" . $fid,
                "label" => $label,
                "type" => $type,
                "scoringGroup" => $scoringGroup
            ], $extra);

            $category["questions"][] = $question;
        }

        $page["categories"][] = $category;
    }

    $survey["pages"][] = $page;
}

$json = json_encode($survey, JSON_INVALID_UTF8_SUBSTITUTE);
if (!$json) {
    fail("json-failed");
}
echo $json;
