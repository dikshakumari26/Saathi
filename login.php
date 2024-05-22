<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $password = $_POST["password"];
  
  // Perform authentication logic (e.g., check against database)
  if ($username === "your_username" && $password === "your_password") {
    // Successful login, set a session and redirect to the home page
    session_start();
    $_SESSION["username"] = $username;
    header("Location: home.html");
    exit();
  } else {
    $error_message = "Invalid username or password.";
  }
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Login Result</title>
</head>
<body>
  <?php if (isset($error_message)) : ?>
    <p><?php echo $error_message; ?></p>
  <?php endif; ?>
</body>
</html>

