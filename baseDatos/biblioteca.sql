-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-03-2021 a las 21:41:31
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `idUsuario` int(11) NOT NULL,
  `idLibro` int(11) NOT NULL,
  `comentario` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`idUsuario`, `idLibro`, `comentario`) VALUES
(1, 9, 'Muy buen libro'),
(2, 9, 'Lo recomiendo, no es solo para niños!');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `idLibro` int(11) NOT NULL,
  `tituloLibro` varchar(70) DEFAULT NULL,
  `autorLibro` varchar(150) DEFAULT NULL,
  `descripcionLibro` mediumtext DEFAULT NULL,
  `puntuacionLibro` int(11) DEFAULT NULL,
  `generoLibro` varchar(45) DEFAULT NULL,
  `imagenLibro` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`idLibro`, `tituloLibro`, `autorLibro`, `descripcionLibro`, `puntuacionLibro`, `generoLibro`, `imagenLibro`) VALUES
(1, 'Harry potter y la piedra filosofal ', 'J K Rowling', 'Harry Potter nunca ha oído hablar de Hogwarts hasta que empiezan a caer cartas en el felpudo del número 4 de Privet Drive. Llevan la dirección escrita con tinta verde en un sobre de pergamino amarillento con un sello de lacre púrpura, y sus horripilantes tíos se apresuran a confiscarlas. Más tarde, el día que Harry cumple once años, Rubeus Hagrid, un hombre gigantesco cuyos ojos brillan como escarabajos negros, irrumpe con una noticia extraordinaria: Harry Potter es un mago, y le han concedido una plaza en el Colegio Hogwarts de Magia y Hechicería. ¡Está a punto de comenzar una aventura increíble!', 10, 'Juvenil Magia', 'https://m.media-amazon.com/images/I/517DxWbJNZL.jpg'),
(2, 'Harry potter y la cámara secreta', 'J K Rowling', 'El verano de Harry Potter ha incluido el peor cumpleaños de su vida, las funestas advertencias de un elfo doméstico llamado Dobby y el rescate de casa de los Dursley protagonizado por su amigo Ron Weasley al volante de un coche mágico volador. De vuelta en el Colegio Hogwarts de Magia y Hechicería, donde va a empezar su segundo curso, Harry oye unos extraños susurros que resuenan por los pasillos vacíos. Y entonces empiezan los ataques y varios alumnos aparecen petrificados... Por lo visto, las siniestras predicciones de Dobby se están cumpliendo....', 10, 'Juvenil Magia', 'https://m.media-amazon.com/images/I/515J1emcbkL.jpg'),
(3, 'Harry potter y el prisionero de Azkaban', 'J K Rowling', 'Cuando el autobús noctámbulo irrumpe en una calle oscura y frena con fuertes chirridos delante de Harry, comienza para él un nuevo curso en Hogwarts, lleno de acontecimientos extraordinarios. Sirius Black, asesino y seguidor de lord Voldemort, se ha fugado, y dicen que va en busca de Harry. En su primera clase de Adivinación, la profesora Trelawney ve un augurio de muerte en las hojas de té de la taza de Harry... Pero quizá lo más aterrador sean los dementores que patrullan por los jardines del colegio, capaces de sorberte el alma con su beso...', 10, 'Juvenil Magia', 'https://m.media-amazon.com/images/I/41zqI6oPb-L.jpg'),
(4, 'Harry potter y el cáliz de fuego', 'J K Rowling', 'Se va a celebrar en Hogwarts el Torneo de los Tres Magos. Sólo los alumnos mayores de diecisiete años pueden participar en esta competición, pero, aun así, Harry sueña con ganarla. En Halloween, cuando el cáliz de fuego elige a los campeones, Harry se lleva una sorpresa al ver que su nombre es uno de los escogidos por el cáliz mágico. Durante el torneo deberá enfrentarse a desafíos mortales, dragones y magos tenebrosos, pero con la ayuda de Ron y Hermione, sus mejores amigos, ¡quizá logre salir con vida!', 10, 'Juvenil Magia', 'https://m.media-amazon.com/images/I/51Y6Exe5UiL.jpg'),
(5, 'Harry potter y la orden del fénix', 'J K Rowling', 'Son malos tiempos para Hogwarts. Tras el ataque de los dementores a su primo Dudley, Harry Potter comprende que Voldemort no se detendrá ante nada para encontrarlo. Muchos niegan que el Señor Tenebroso haya regresado, pero Harry no está solo: una orden secreta se reúne en Grimmauld Place para luchar contra las fuerzas oscuras. Harry debe permitir que el profesor Snape le enseñe a protegerse de las brutales incursiones de Voldemort en su mente. Pero éstas son cada vez más potentes, y a Harry se le está agotando el tiempo...', 10, 'Juvenil Magia', 'https://m.media-amazon.com/images/I/41q-WZgFyBL.jpg'),
(6, 'Harry potter y el misterio del prícipe', 'J K Rowling', 'Cuando se monta en el sidecar de la moto de Hagrid y se eleva en el cielo, dejando Privet Drive por última vez, Harry Potter sabe que lord Voldemort y sus mortífagos se hallan cerca. El encantamiento protector que había mantenido a salvo a Harry se ha roto, pero él no puede seguir escondiéndose. El Señor Tenebroso se dedica a aterrorizar a todos los seres queridos de Harry, y, para detenerlo, éste habrá de encontrar y destruir los horrocruxes que quedan. La batalla definitiva debe comenzar: Harry tendrá que alzarse y enfrentarse a su enemigo...', 10, 'Juvenil Magia', 'https://m.media-amazon.com/images/I/51WLWaAEBkL.jpg'),
(7, 'Harry potter y la reliquias de la muerte', 'J K Rowling', 'Con dieciséis años cumplidos, Harry inicia el sexto curso en Hogwarts en medio de terribles acontecimientos que asolan Inglaterra. Elegido capitán del equipo de quidditch, los ensayos, los exámenes y las chicas ocupan todo su tiempo, pero la tranquilidad dura poco.El anciano director solicitará la ayuda de Harry y juntos emprenderán peligrosos viajes para intentar debilitar al enemigo, para lo cual el joven mago contará con un viejo libro de pociones perteneciente a un misterioso personaje, alguien que se hace llamar Príncipe Mestizo.', 10, 'Juvenil Magia', 'https://m.media-amazon.com/images/I/512gF89kp2L.jpg'),
(8, 'Los juegos del hambre', 'Suzanne Collins', 'En una oscura versión del futuro próximo, doce chicos y doce chicas se ven obligados a participar en un reality show llamado Los juegos del hambre. Solo hay una regla: matar o morir. Cuando Katniss Everdeen, una joven de dieciséis años se presenta voluntaria para ocupar el lugar de su hermana en los juegos, lo entiende como una condena a muerte. Sin embargo, Katniss ya ha visto la muerte de cerca y la supervivencia forma parte de su naturaleza.', 7, 'Juvenil', 'https://images-na.ssl-images-amazon.com/images/I/418ZSvsuM1L._SX327_BO1,204,203,200_.jpg'),
(9, 'El Principito', 'Antoine De Saint Exupery', 'Fábula mítica y relato filosófico que interroga acerca de la relación del ser humano con su prójimo y con el mundo, El Principito concentra, con maravillosa simplicidad, la constante reflexión de Saint-Exupéry sobre la amistad, el amor, la responsabilidad y el sentido de la vida.', 8, 'Infantil', 'https://images-na.ssl-images-amazon.com/images/I/41iS616ndCL._SX312_BO1,204,203,200_.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `librosprestados`
--

CREATE TABLE `librosprestados` (
  `idUsuario` int(11) NOT NULL,
  `idLibro` int(11) NOT NULL,
  `fechaDevolver` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `librosprestados`
--

INSERT INTO `librosprestados` (`idUsuario`, `idLibro`, `fechaDevolver`) VALUES
(1, 9, '2021-03-12'),
(3, 9, '2021-02-27'),
(2, 9, '2021-03-14'),
(2, 8, '2021-03-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `emailUsuario` varchar(150) DEFAULT NULL,
  `passwordUsuario` varchar(20) DEFAULT NULL,
  `rolUsuario` varchar(45) DEFAULT NULL,
  `multaUsuario` int(11) DEFAULT NULL,
  `multaHasta` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `emailUsuario`, `passwordUsuario`, `rolUsuario`, `multaUsuario`, `multaHasta`) VALUES
(1, 'administrador@correo.es', '12345', 'administrador', 0, NULL),
(2, 'usuario@correo.es', '12345', 'usuario', 0, NULL),
(3, 'jmmh@gmail.com', '12345', 'usuario', 1, '2021-03-14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD KEY `fk_Usuarios_has_Libros_Libros2_idx` (`idLibro`),
  ADD KEY `fk_Usuarios_has_Libros_Usuarios1_idx` (`idUsuario`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`idLibro`);

--
-- Indices de la tabla `librosprestados`
--
ALTER TABLE `librosprestados`
  ADD KEY `fk_Libros_prestados_Libros_idx` (`idLibro`),
  ADD KEY `fk_Libros_prestados_Usuarios` (`idUsuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `idLibro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `fk_Usuarios_has_Libros_Libros2` FOREIGN KEY (`idLibro`) REFERENCES `libros` (`idLibro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Usuarios_has_Libros_Usuarios1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `librosprestados`
--
ALTER TABLE `librosprestados`
  ADD CONSTRAINT `fk_LibrosPrestados_Libros` FOREIGN KEY (`idLibro`) REFERENCES `libros` (`idLibro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Libros_prestados_Usuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
