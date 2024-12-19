<?php
include 'conexion.php';

$sql = "SELECT * FROM ruta";
$resultado = $conn->query($sql);

$rutas = [];
if ($resultado->num_rows > 0) {
    while($fila = $resultado->fetch_assoc()) {
        $rutas[] = $fila;
    }
}

echo json_encode($rutas);
$conn->close();
?>