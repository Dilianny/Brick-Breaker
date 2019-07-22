<?php
$_SESSION = array();
session_destroy();
session_start();


$username = $_REQUEST["name"];
$password = $_REQUEST["password"];
$username1 = "james";
$password1 = "web";
if (isset($_SESSION['loggedin'])&& $_SESSION['loggedin']== true) {
  header("Location: index.html");
}
if (isset($_POST['username']) && isset($_POST['password'])) {
  if($_POST['username']== $username && $_POST['password'] == $password){
    $_SESSION['loggedin'] = true;
    header("Location: index.html");
  }
}
if (isset($_POST['username']) && isset($_POST['password'])) {
  if($_POST['username']== $username1 && $_POST['password'] == $password1){
    $_SESSION['loggedin'] = true;
    header("Location: index.html");
  }
}
 ?>

<!DOCTYPE html>

<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
</head>

<style>
    h1{
          font-family: monospace;
          font-size: 40px;
          text-align: center;
      }
 * {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial;
    font-size: 17px;
    background-image: url("logo.jpg");
    background-size: contain;
}
.con{
          text-align: center;
          font-size: 15px;
      }
      .tri{
        margin-top: 20%;
        text-align: center;
      }
</style>

<body>
    <?php
    $_SESSION["points"] = 0;
    ?>
    <div>
        <h1>Brick Breaker</h1>

        <div class="tri">

            <form class="" action="login.php" method="post">
                <input type="text" placeholder="Username" name="username">
                <input type="password" placeholder="Password" name="password">
                <button type="submit" value="Login">Login</button>
            </form>
            <p><a href="register.php">Register</a></p>
            <div class="con">A Game By Dilianny Lakitaya </div>
        </div>
    </div>
</body>
</html>
