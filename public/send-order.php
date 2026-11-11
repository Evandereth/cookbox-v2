<?php

header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('Europe/London');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

const BANK_NAME    = 'Cookbox Inc Ltd';
const BANK_ACCOUNT = '59537862';
const BANK_SORT    = '309950';

function reply($code, $payload) {
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

// Single-line fields: strip line breaks to block header injection
function clean($v, $max = 200) {
    return mb_substr(trim(preg_replace('/[\r\n]+/', ' ', (string) $v)), 0, $max);
}

function h($v) { return htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8'); }
function gbp($n) { return '£' . number_format($n, 2); }

function makeMailer() {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'mail.cookboxltd.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'admin@cookboxltd.com';
    $mail->Password   = 'Cookbox123';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';
    $mail->setFrom('admin@cookboxltd.com', 'Cookbox Inc');
    return $mail;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'Method not allowed']);
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    reply(400, ['ok' => false, 'error' => 'Invalid request data']);
}

$name       = clean($data['name'] ?? '', 100);
$email      = clean($data['email'] ?? '', 150);
$phone      = clean($data['phone'] ?? '', 30);
$fulfilment = clean($data['fulfilment'] ?? '');
$address    = clean($data['address'] ?? '', 200);
$postcode   = clean($data['postcode'] ?? '', 12);
$date       = clean($data['date'] ?? '', 20);
$payment    = clean($data['payment'] ?? '');
$notes      = mb_substr(trim($data['notes'] ?? ''), 0, 1000);
$company    = trim($data['company'] ?? '');   // honeypot

// Honeypot spam protection
if ($company !== '') {
    reply(200, ['ok' => true]);
}

// Items: re-check every line and work out the total on the server
$items = [];
$total = 0;
foreach (($data['items'] ?? []) as $it) {
    if (!is_array($it)) continue;
    $n = clean($it['name'] ?? '', 80);
    $p = round((float) ($it['price'] ?? 0), 2);
    $q = (int) ($it['qty'] ?? 0);
    if ($n === '' || $p <= 0 || $p > 500 || $q < 1 || $q > 99) continue;
    $items[] = ['name' => $n, 'price' => $p, 'qty' => $q];
    $total += $p * $q;
    if (count($items) >= 60) break;
}
$total = round($total, 2);

// Validate
$delivery = $fulfilment === 'delivery';
if (
    strlen($name) < 2 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    strlen($phone) < 6 ||
    !in_array($fulfilment, ['delivery', 'collection'], true) ||
    !in_array($payment, ['bank', 'cash'], true) ||
    ($delivery && (strlen($address) < 5 || strlen($postcode) < 3)) ||
    count($items) === 0
) {
    reply(422, ['ok' => false, 'error' => 'Please fill in all required fields with valid information.']);
}

$invoiceNo   = 'CB-' . date('Ymd') . '-' . strtoupper(bin2hex(random_bytes(2)));
$invoiceDate = date('j F Y');
$payLabel    = $payment === 'bank' ? 'Bank transfer' : 'Pay on ' . ($delivery ? 'delivery' : 'collection');

// ---------- 1) Email to you (plain text) ----------
$lines = '';
foreach ($items as $i) {
    $lines .= $i['qty'] . ' x ' . $i['name'] . ' @ ' . gbp($i['price']) . ' = ' . gbp($i['price'] * $i['qty']) . "\n";
}

try {
    $mail = makeMailer();
    $mail->addAddress('admin@cookboxltd.com');
    $mail->addReplyTo($email, $name);
    $mail->isHTML(false);
    $mail->Subject = '[NEW ORDER] ' . $invoiceNo . ' - ' . $name . ' - ' . gbp($total) . ' - ' . strtoupper($fulfilment);
    $mail->Body = "
*** NEW FOOD ORDER ***
(Placed on cookboxltd.com)

Invoice no: $invoiceNo
Date: $invoiceDate

Name: $name
Email: $email
Phone: $phone

" . ($delivery ? "DELIVERY to: $address, $postcode" : 'COLLECTION from shop') . "
Preferred date: " . ($date !== '' ? $date : 'Not specified') . "
Payment: $payLabel

ORDER:

$lines
TOTAL: " . gbp($total) . "

NOTES:

$notes
";
    $mail->send();
} catch (Exception $e) {
    error_log('Order email error: ' . $e->getMessage());
    reply(500, ['ok' => false, 'error' => 'Unable to place your order. Please try again.']);
}

// ---------- 2) Invoice email to the customer (HTML) ----------
try {
    $rows = '';
    foreach ($items as $i) {
        $rows .= '<tr><td style="padding:8px 0;border-bottom:1px solid #eee">' . h($i['name']) . '</td>'
              . '<td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center">' . $i['qty'] . '</td>'
              . '<td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">' . gbp($i['price']) . '</td>'
              . '<td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">' . gbp($i['price'] * $i['qty']) . '</td></tr>';
    }

    $payHtml = $payment === 'bank'
        ? 'Please pay by bank transfer using <strong>' . h($invoiceNo) . '</strong> as the reference.<br>'
          . 'Account name: ' . BANK_NAME . '<br>Account number: ' . BANK_ACCOUNT . '<br>Sort code: ' . BANK_SORT
        : 'Payment due on ' . ($delivery ? 'delivery' : 'collection') . '.';

    $where = $delivery ? 'Delivery to: ' . h($address) . ', ' . h($postcode) : 'Collection from Cookbox, Leicester';

    $html = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#292524">'
      . '<h2 style="color:#6b0f1a;margin-bottom:4px">INVOICE</h2>'
      . '<p style="margin:0 0 16px;font-size:14px">Invoice no: <strong>' . h($invoiceNo) . '</strong><br>Date: ' . h($invoiceDate) . '</p>'
      . '<p style="font-size:14px"><strong>Cookbox Inc Ltd</strong><br>Leicester, UK<br>07475595055<br>Admin@cookboxltd.com</p>'
      . '<p style="font-size:14px"><strong>Billed to:</strong> ' . h($name) . '<br>' . h($email) . '<br>' . h($phone) . '<br>' . $where . '</p>'
      . '<table style="width:100%;border-collapse:collapse;font-size:14px"><tr style="text-align:left;color:#78716c;font-size:12px">'
      . '<th style="padding:6px 0">Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Amount</th></tr>'
      . $rows . '</table>'
      . '<p style="text-align:right;font-size:18px;color:#6b0f1a"><strong>Total: ' . gbp($total) . '</strong></p>'
      . ($delivery ? '<p style="text-align:right;font-size:12px;color:#78716c">Delivery charges, if any, will be confirmed separately.</p>' : '')
      . '<div style="background:#faf3f4;border-radius:8px;padding:14px;font-size:14px;margin-top:16px"><strong>Payment</strong><br>' . $payHtml . '</div>'
      . '<p style="font-size:12px;color:#78716c;text-align:center;margin-top:24px">Thank you for choosing Cookbox Inc Ltd.</p></div>';

    $cust = makeMailer();
    $cust->addAddress($email, $name);
    $cust->addReplyTo('admin@cookboxltd.com', 'Cookbox Inc');
    $cust->isHTML(true);
    $cust->Subject = 'Your Cookbox invoice ' . $invoiceNo;
    $cust->Body    = $html;
    $cust->AltBody = "Thank you for your order. Invoice $invoiceNo, total " . gbp($total) . '.';
    $cust->send();
} catch (Exception $e) {
    // Your own copy was sent, so the order still counts
    error_log('Customer invoice email error: ' . $e->getMessage());
}

reply(200, [
    'ok' => true,
    'invoice' => ['number' => $invoiceNo, 'date' => $invoiceDate, 'total' => $total],
]);
