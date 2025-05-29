<?php
// подключение к базе данных
require_once('db_connect.php');

// считываем все города из базы данных
$result = mysqli_query($con, "SELECT name FROM City");

$cityList = [];
while ($row = mysqli_fetch_assoc($result)) {
    $cityList[] = $row['name']; // добавляем города в массив
}

// отправляем обратно список всех городов как JSON
echo json_encode($cityList);

mysqli_close($con);
?>