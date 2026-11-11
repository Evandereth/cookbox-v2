<?php

header('Content-Type: application/json; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

function reply($code, $payload) {
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    reply(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Read JSON submitted by React
$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    reply(400, ['ok' => false, 'error' => 'Invalid request data']);
}

// Single-line fields: strip line breaks to block header injection
function clean($v) {
    return trim(preg_replace('/[\r\n]+/', ' ', (string) $v));
}

$name     = clean($data['name'] ?? '');
$email    = clean($data['email'] ?? '');
$phone    = clean($data['phone'] ?? '');
$date     = clean($data['date'] ?? '');
$guests   = clean($data['guests'] ?? '');
$location = clean($data['location'] ?? '');
$slot     = clean($data['slot'] ?? '');
$access   = clean($data['access'] ?? 'No');
$dietary  = trim($data['dietary'] ?? '');
$message  = trim($data['message'] ?? '');
$company  = trim($data['company'] ?? '');   // honeypot

// Honeypot spam protection
if ($company !== '') {
    reply(200, ['ok' => true]);
}

// Validate form data
if (
    strlen($name) < 2 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    strlen($phone) < 6 ||
    $date === '' ||
    !ctype_digit($guests) || (int) $guests < 1 ||
    strlen($location) < 3 ||
    $slot === ''
) {
    reply(422, ['ok' => false, 'error' => 'Please fill in all required fields with valid information.']);
}

$mail = new PHPMailer(true);

try {
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host       = 'mail.cookboxltd.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'admin@cookboxltd.com';
    $mail->Password   = 'Cookbox123';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    $mail->CharSet = 'UTF-8';

    // Sender and recipient
    $mail->setFrom('admin@cookboxltd.com', 'Cookbox Website');
    $mail->addAddress('admin@cookboxltd.com');

    // Reply goes straight to the customer
    $mail->addReplyTo($email, $name);

    // Email content
    $mail->isHTML(false);

    $mail->Subject = '[COOKOUT BOOKING] ' . $name . ' - ' . $date . ' - ' . $guests . ' guests';

    $mail->Body = "
*** NEW COOKOUT BOOKING REQUEST ***
(Sent from the Cookout page on cookboxltd.com)

Name: $name
Email: $email
Phone: $phone

Cookout Date: $date
Time Slot: $slot
Number of Guests: $guests
Event Location: $location

Disabled Access Required: $access

DIETARY REQUIREMENTS:

$dietary

ADDITIONAL INFORMATION:

$message
";

    $mail->send();

    reply(200, ['ok' => true, 'message' => 'Your booking request has been sent. We will contact you within 24 hours.']);

} catch (Exception $e) {
    error_log('PHPMailer Error: ' . $mail->ErrorInfo);
    reply(500, ['ok' => false, 'error' => 'Unable to send your booking. Please try again.']);
}

