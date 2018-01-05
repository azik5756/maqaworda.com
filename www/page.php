<?php 
$a=$_POST['username'];
$b=$_POST['password'];
$connect=new mysqli("localhost","root","","maqazin");
$giriw=$connect->query("SELECT * FROM satiw wHERE username='$a' AND password='$b'");
if($giriw->num_rows>0)
{
	echo 'Ela';
}
else
{
	echo 'Idi naxuy';
}

?>
