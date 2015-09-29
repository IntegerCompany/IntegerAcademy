<?php

	// Data Base value

	// $my_host_name	= 'mysql.promosociety.com';
	// $my_user_name	= 'users_db';
	// $my_password 	= '9MkRbebpdbCr';
	// $my_db_name		= 'users_preregister';
	$my_host_name	= 'localhost';
	$my_user_name	= 'root';
	$my_password 	= '';
	$my_db_name		= 'users';

	// Text Message

	$error_text = '<b>'.'Error.'.'</b> '.'Your data not Saved. Try again.';
	$success_text = '<b>'.'Success.'.'</b>'.' Your data Saved!';
	$connection_error_text = '<b>'.'Connection Error.'.'</b>'.' Please try again later.';


	$mysqli = @new mysqli($my_host_name, $my_user_name, $my_password, $my_db_name);

	if (mysqli_connect_errno()) {

		$json_arr = array(
			'responseClass' => 'error',
			'responseText' => $connection_error_text,

			// 'responseText' => $connection_error_text.mysqli_connect_error(), // Show a problem FOR DEVELOPERS!!!
		);

		echo json_encode($json_arr);
		die();
	}

	// Forms request value

	$user_name = $_POST['formOperation']['user-name'];
	$user_birthday = $_POST['formOperation']['user-birthday'];
	$user_city = $_POST['formOperation']['user-city'];
	$user_gender = $_POST['formOperation']['user-gender'];
	$user_country = $_POST['formOperation']['user-country'];
	$user_email = $_POST['formOperation']['user-email'];

	$mysql_result = $mysqli->query('INSERT INTO `users`	(`user_name`, `user_birthday`, `user_city`, `user_gender`, `user_email`, `user_country`) 
			VALUES ("'.$user_name.'", "'.$user_birthday.'", "'.$user_city.'", "'.$user_gender.'", "'.$user_email.'", "'.$user_country.'")');

	$message_class = !$mysql_result ? 'error' : 'success';

	if(!$mysql_result) {
		$message_class 	= 'error';
		$message_text	= $error_text;
	} else {
		$message_class	= 'success';
		$message_text	= $success_text;
	}

	$mysqli->close();

	unset ($_POST['formOperation']['user-name']);
	unset ($_POST['formOperation']['user-birthday']);
	unset ($_POST['formOperation']['user-city']);
	unset ($_POST['formOperation']['user-gender']);
	unset ($_POST['formOperation']['user-country']);
	unset ($_POST['formOperation']['user-email']);

	$json_arr = array(
		'responseClass' => $message_class,
		'responseText' => $message_text,
	);

	echo json_encode($json_arr);
	die();
?>