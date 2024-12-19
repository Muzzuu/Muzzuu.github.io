<?php
$host = 'localhost';
$usuario = 'root'; // El usuario por defecto en XAMPP
$clave = ''; // La contraseña por defecto es vacía
$baseDeDatos = 'aircraft'; // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($host, $usuario, $clave, $baseDeDatos);

// Verificar si la conexión fue exitosa
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}else{
    echo("Conectado");
}
?>