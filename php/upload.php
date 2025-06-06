<?php
// подключение к базе данных
require_once('db_connect.php');

// получаем данные POST (JSON)
$data = file_get_contents('php://input');

// декодируем JSON
$cities = json_decode($data, true);

// проверяем, что это массив
if (is_array($cities)) {
    foreach ($cities as $city) {
        // добавляем каждый город в базу данных
        $name = mysqli_real_escape_string($con, $city);
        $sql = "INSERT INTO City (name) VALUES ('$name')";
        if (!mysqli_query($con, $sql)) {
            echo "Ошибка при добавлении города: " . mysqli_error($con);
            exit;
        }
    }
    echo "Города успешно добавлены!";
} else {
    echo "Ошибка: Неверный формат данных.";
}

mysqli_close($con);
?>