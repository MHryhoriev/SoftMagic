<?php

if ($_POST) {
  $name = htmlspecialchars($_POST['name']);
	$phone = htmlspecialchars($_POST['phone']);
	$email = htmlspecialchars($_POST['email']);

	if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) { 
		show_error("<br /> Е-mail is not exist"); 
	}

	$to = 'info@softmagic.pro';
	$subject = 'Call me back';
	$message = "\n\n" .
						 'Name - ' . $name . "\n\n" .
						 'Phone - ' . $phone . "\n\n" .
						 'Email - ' . $email . "\n\n";
	$headers = 'From:' . $email;

	$result = mail($to, $subject, $message, $headers);
  
  if ($result){
    echo "<div class='overlayer-container'><img src='../app/img/mail.gif' class='overlayer-img'></div>";
  }
}
?>