<?php
session_start(); // Starting Session
$error=''; // Variable To Store Error Message
if (isset($_POST['logsubmit'])) {
//if (empty($_POST['uname']) || empty($_POST['psw'])) {
//$error = "Username or Password is invalid";
//echo $error;
//}
//else
//{
// Define $username and $password
$username=$_POST['uname'];
$password=$_POST['psw'];
}
//}
if (isset($_POST['signsubmit'])) {
//if (empty($_POST['uname1']) || empty($_POST['psw1']) || empty($_POST['psw2'])) {
//$error = "Username or Password is invalid";
//}
//add if statement to compare psw1 and psw2
//else
//{
// Define $username and $password
$username=$_POST['uname1'];
$password1=$_POST['psw1'];
$password2=$_POST['psw2'];

if ($password1 !== $password2)
{
    $error = 'Your passwords do not match, please enter them correctly.';
}
}
?>