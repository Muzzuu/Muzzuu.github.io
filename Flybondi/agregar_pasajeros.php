<?php
include "conexion.php";
header('Content-Type: application/json'); // Establecer el tipo de contenido como JSON

// Verificar si los datos llegaron correctamente
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "No se recibieron datos JSON"]);
    exit;
}

// Verifica los datos recibidos
file_put_contents("log.txt", print_r($data, true), FILE_APPEND); // Guarda los datos recibidos en un archivo de log

// Asignar los valores a las variables
$nombre = $data["nombre"] ?? null;
$apellido = $data["apellido"] ?? null;
$fechaNacimiento = $data["fechaNacimiento"] ?? null;
$email = $data["email"] ?? null;
$telefono = $data["telefono"] ?? null;
$pais = $data["pais"] ?? null;
$dni = $data["dni"] ?? null;
$genero = $data["genero"] ?? null;

// Verificar si todos los campos requeridos están presentes
if (!$nombre || !$apellido || !$fechaNacimiento || !$email || !$telefono || !$pais || !$dni || !$genero) {
    echo json_encode(["success" => false, "message" => "Datos incompletos recibidos"]);
    exit;
}

// Preparar la consulta de inserción
$sql = "INSERT INTO pasajeros (nombre, apellido, fecha_nacimiento, email, telefono, pais, dni, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(["success" => false, "message" => "Error en la preparación de la consulta: " . $conn->error]);
    exit;
}

// Vincular parámetros y ejecutar la consulta
$stmt->bind_param("ssssssss", $nombre, $apellido, $fechaNacimiento, $email, $telefono, $pais, $dni, $genero);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Datos guardados correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al guardar datos: " . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>