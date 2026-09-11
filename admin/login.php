<?php
session_start();
if (!empty($_SESSION['admin_id'])) { header('Location: index.php'); exit; }
require __DIR__ . '/../config.php';
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admins WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    $admin = $stmt->fetch();
    if ($admin && password_verify($password, $admin['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_username'] = $admin['username'];
        header('Location: index.php'); exit;
    }
    $error = 'Invalid username or password.';
}
?><!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin Login | Superior Construction Group</title>
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#07111d;color:#fff;font-family:Arial,sans-serif;padding:24px}.box{width:min(440px,100%);background:#101c2b;border:1px solid #26384d;border-radius:18px;padding:38px;box-shadow:0 25px 80px #0008}.eyebrow{font-size:11px;letter-spacing:2px;color:#79b8ff}.logo{font-size:28px;font-weight:900;margin:8px 0 30px}.logo span{color:#5ba8ff}.box h1{font-size:30px;margin:0 0 8px}.sub{color:#93a5b8;margin-bottom:26px}.field{margin:15px 0}.field label{display:block;font-size:11px;letter-spacing:1.3px;margin-bottom:7px;color:#9fb0c2}.field input{width:100%;padding:14px;border:1px solid #30445a;background:#0a1624;color:#fff;border-radius:7px;outline:none}.field input:focus{border-color:#4c9cff}.btn{width:100%;border:0;border-radius:7px;padding:15px;background:#fff;color:#07111d;font-weight:900;cursor:pointer;margin-top:8px}.error{background:#3a1c23;color:#ffb4bf;padding:12px;border-radius:7px;margin-bottom:15px;font-size:14px}.back{display:block;text-align:center;color:#8fb4da;text-decoration:none;margin-top:20px;font-size:13px}
</style></head><body><main class="box"><div class="eyebrow">SUPERIOR CONSTRUCTION GROUP</div><div class="logo">ADMIN<span>.</span></div><h1>Welcome back.</h1><p class="sub">Sign in to manage estimate requests.</p><?php if($error): ?><div class="error"><?=htmlspecialchars($error)?></div><?php endif; ?><form method="post"><div class="field"><label>USERNAME</label><input name="username" autocomplete="username" required></div><div class="field"><label>PASSWORD</label><input type="password" name="password" autocomplete="current-password" required></div><button class="btn" type="submit">SIGN IN →</button></form><a class="back" href="../index.html">← Back to website</a></main></body></html>
