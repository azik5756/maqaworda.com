<?php 
$a=$_POST['name'];
$b=$_POST['surname'];
$c=$_POST['mail'];
$d=$_POST['username'];
$e=$_POST['password'];
$connect=new mysqli("localhost","root","","maqazin");
$in=$connect->query("INSERT INTO satiw(name,surname,mail,username,password)VALUES('$a','$b','$c','$d','$e')");
header("Location:index.html");
 ?>