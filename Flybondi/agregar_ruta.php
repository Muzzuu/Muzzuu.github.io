<?php
include 'conexion.php';

// Configurar encabezado para indicar que la respuesta es JSON
header('Content-Type: application/json');

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los valores enviados
    $origen = isset($_POST['origen']) ? $_POST['origen'] : null;
    $destino = isset($_POST['destino']) ? $_POST['destino'] : null;

    // Verificar si los valores de origen y destino son válidos
    if ($origen && $destino) {
        // Escapar los valores para prevenir inyecciones SQL
        $origen = $conn->real_escape_string($origen);
        $destino = $conn->real_escape_string($destino);

        // Verificar la conexión a la base de datos
        if ($conn->connect_error) {
            echo json_encode(['success' => false, 'message' => 'Conexión a la base de datos fallida: ' . $conn->connect_error]);
            exit;
        }

        // Consulta SQL para insertar la ruta en la tabla correcta
        $sql = "INSERT INTO ruta (origen, destino) VALUES ('$origen', '$destino')";

        // Ejecutar la consulta y verificar si tuvo éxito
        if ($conn->query($sql) === TRUE) {
            // Respuesta exitosa
            echo json_encode(['success' => true, 'message' => 'Ruta agregada correctamente.']);
        } else {
            // Respuesta de error con el mensaje de error de la base de datos
            echo json_encode(['success' => false, 'message' => 'Error al agregar ruta: ' . $conn->error]);
        }
    } else {
        // Si los valores de origen y destino no son válidos
        echo json_encode(['success' => false, 'message' => 'Los valores de origen y destino son requeridos.']);
    }

    // Cerrar la conexión
    $conn->close();
}
?>