<?php
require __DIR__ . '/auth.php';
require __DIR__ . '/../config.php';

$allowed = ['New','Contacted','In Progress','Completed'];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $id = (int)($_POST['id'] ?? 0);
    if ($id > 0 && $action === 'status') {
        $status = $_POST['status'] ?? '';
        if (in_array($status, $allowed, true)) {
            $stmt = $pdo->prepare('UPDATE estimate_requests SET status = ? WHERE id = ?');
            $stmt->execute([$status, $id]);
        }
    } elseif ($id > 0 && $action === 'delete') {
        $stmt = $pdo->prepare('DELETE FROM estimate_requests WHERE id = ?');
        $stmt->execute([$id]);
    }
    header('Location: index.php'); exit;
}

$counts = array_fill_keys($allowed, 0);
foreach ($pdo->query('SELECT status, COUNT(*) total FROM estimate_requests GROUP BY status') as $row) {
    $counts[$row['status']] = (int)$row['total'];
}
$total = array_sum($counts);
$requests = $pdo->query('SELECT * FROM estimate_requests ORDER BY created_at DESC')->fetchAll();
function e($value){ return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8'); }
?><!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Requests Dashboard | Superior Construction Group</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#07111d;color:#eef5fb;font-family:Arial,sans-serif}.top{height:76px;border-bottom:1px solid #223448;background:#0b1725;display:flex;align-items:center;justify-content:space-between;padding:0 34px;position:sticky;top:0;z-index:10}.brand{font-weight:900;letter-spacing:.4px}.brand span{color:#4fa1ff}.top-right{display:flex;align-items:center;gap:20px;color:#9fb1c4;font-size:13px}.top a{color:#fff;text-decoration:none;border:1px solid #334a61;padding:9px 14px;border-radius:6px}.wrap{max-width:1380px;margin:auto;padding:34px}.heading{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:25px}.eyebrow{font-size:11px;letter-spacing:2px;color:#6faeff}.heading h1{font-size:38px;margin:8px 0 0}.heading p{color:#8fa2b5;margin:8px 0 0}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}.stat{background:#0d1a29;border:1px solid #22364a;border-radius:12px;padding:20px}.stat small{color:#91a4b7;font-size:11px;letter-spacing:1.3px}.stat strong{display:block;font-size:31px;margin-top:8px}.tablebox{background:#0d1a29;border:1px solid #22364a;border-radius:12px;overflow:hidden}.tablehead{padding:19px 20px;border-bottom:1px solid #22364a;display:flex;justify-content:space-between}.tablehead strong{font-size:17px}.tablehead span{color:#91a4b7;font-size:13px}.tablewrap{overflow:auto}table{width:100%;border-collapse:collapse;min-width:980px}th,td{padding:16px 18px;border-bottom:1px solid #1e3042;text-align:left;vertical-align:top}th{font-size:10px;letter-spacing:1.3px;color:#8da2b6;background:#0a1623}td{font-size:14px;color:#dce6ef}.name{font-weight:800;color:#fff}.muted{font-size:12px;color:#8094a9;margin-top:4px}.details{max-width:310px;line-height:1.55;color:#a9bacb}.status-form{display:flex;gap:7px;align-items:center}.status{border:1px solid #344b62;background:#0a1623;color:#fff;padding:8px;border-radius:6px;font-size:12px}.delete{border:1px solid #59343b;background:transparent;color:#ff9ca9;padding:8px 10px;border-radius:6px;cursor:pointer}.empty{text-align:center;padding:70px;color:#8195aa}.note{margin-top:16px;color:#70869c;font-size:12px}.badge{display:inline-block;padding:6px 8px;border-radius:20px;background:#18304a;color:#8ec3ff;font-size:11px}.actions{white-space:nowrap}@media(max-width:800px){.top{padding:0 18px}.top-right span{display:none}.wrap{padding:22px 16px}.stats{grid-template-columns:1fr 1fr}.heading{display:block}.heading h1{font-size:31px}}
</style></head><body>
<header class="top"><div class="brand">SUPERIOR <span>CONSTRUCTION GROUP</span></div><div class="top-right"><span>Signed in as <?=e($_SESSION['admin_username'] ?? 'admin')?></span><a href="../index.html">View Site</a><a href="logout.php">Logout</a></div></header>
<main class="wrap"><div class="heading"><div><div class="eyebrow">ADMIN DASHBOARD / ESTIMATES</div><h1>Request Inbox</h1><p>All free-estimate requests submitted from the website.</p></div></div>
<section class="stats"><div class="stat"><small>TOTAL REQUESTS</small><strong><?=$total?></strong></div><div class="stat"><small>NEW</small><strong><?=$counts['New']?></strong></div><div class="stat"><small>CONTACTED</small><strong><?=$counts['Contacted']?></strong></div><div class="stat"><small>IN PROGRESS</small><strong><?=$counts['In Progress']?></strong></div></section>
<section class="tablebox"><div class="tablehead"><strong>Estimate Requests</strong><span><?=count($requests)?> record<?=count($requests)===1?'':'s'?></span></div><div class="tablewrap"><table><thead><tr><th>DATE</th><th>CLIENT</th><th>CONTACT</th><th>SERVICE</th><th>PROJECT DETAILS</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody><?php if(!$requests): ?><tr><td colspan="7"><div class="empty">No estimate requests yet. New submissions will appear here.</div></td></tr><?php else: foreach($requests as $r): ?><tr><td><?=e(date('M d, Y', strtotime($r['created_at'])))?><div class="muted"><?=e(date('g:i A', strtotime($r['created_at'])))?></div></td><td><div class="name"><?=e($r['name'])?></div></td><td><?=e($r['phone'])?><div class="muted"><?=e($r['email'])?></div></td><td><span class="badge"><?=e($r['service'])?></span></td><td><div class="details"><?=nl2br(e($r['project_details']))?></div></td><td><form class="status-form" method="post"><input type="hidden" name="action" value="status"><input type="hidden" name="id" value="<?=$r['id']?>"><select class="status" name="status" onchange="this.form.submit()"><?php foreach($allowed as $s): ?><option <?=$r['status']===$s?'selected':''?>><?=e($s)?></option><?php endforeach; ?></select></form></td><td class="actions"><form method="post" onsubmit="return confirm('Delete this estimate request?');"><input type="hidden" name="action" value="delete"><input type="hidden" name="id" value="<?=$r['id']?>"><button class="delete" type="submit">Delete</button></form></td></tr><?php endforeach; endif; ?></tbody></table></div></section><div class="note">Tip: change a request status from the dropdown. The website form saves directly to this dashboard through MySQL.</div></main></body></html>
