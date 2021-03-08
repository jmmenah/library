<?php

header('Content-Type: application/json');

require_once ('funciones.php');
require_once ('db.php');

$id = htmlentities($_GET['id']) ?? '';

if (!empty($id)) {


    $stm = $pdo->prepare("SELECT emailUsuario, comentario FROM comentarios INNER JOIN libros ON comentarios.idLibro = libros.idLibro INNER JOIN usuarios ON comentarios.idUsuario = usuarios.idUsuario WHERE comentarios.idLibro = :idLibro");
    
    $stm->execute(array(
        ':idLibro' => $id
    ));

    $comentarios = $stm->fetchAll(PDO::FETCH_ASSOC);

    if ($comentarios) echo devolverMensaje($comentarios, 200);
    else echo devolverMensaje('Aún no hay comentarios', 500);


}else {
    echo devolverMensaje('Error en la petición', 500);
}