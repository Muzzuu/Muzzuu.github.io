<?php

include "conexion.php";

header("Content-Type: application/json");

// Recibir datos del cuerpo de la solicitud POST
$data = json_decode(file_get_contents("php://input"), true);

$dia = $data["dia"];
$mes = $data["mes"];
$anio = $data["anio"];
$horario = $data["horario"];

// Insertar datos en la tabla `hora_y_fecha`
$sql = "INSERT INTO hora_y_fecha (dia, mes, anio, horario) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $dia, $mes, $anio, $horario);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error al guardar datos: " . $conn->error]);
}

// Cerrar conexión
$stmt->close();
$conn->close();
?>