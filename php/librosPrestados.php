<?php

header('Content-Type: application/json');


require ('funciones.php');
require_once ('db.php');

$idUsuario = htmlspecialchars($_GET['idUsuario']) ?? '';


if (!empty($idUsuario)) {

    $stm = $pdo->prepare('SELECT Libros.idLibro, tituloLibro, fechaDevolver FROM librosprestados INNER JOIN Libros ON librosprestados.idLibro = Libros.idLibro WHERE librosprestados.idUsuario = :idUsuario');

    $stm->execute(array(

        ':idUsuario' => $idUsuario

    ));

    if ($stm->rowCount() > 0) {
        
        $libros = $stm->fetchAll(PDO::FETCH_ASSOC);

        echo devolverMensaje($libros, 200);

    }
    else
        echo devolverMensaje('Aún no tienes ningún libro', 500);

}else {
    echo devolverMensaje('Campos vacíos', 500);
}