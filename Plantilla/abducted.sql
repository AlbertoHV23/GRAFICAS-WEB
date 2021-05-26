-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-05-2021 a las 01:27:30
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `abducted`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_score`
--

CREATE TABLE `tbl_score` (
  `id_score` int(10) UNSIGNED NOT NULL,
  `_name` varchar(255) DEFAULT NULL,
  `score` varchar(255) DEFAULT NULL,
  `_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_score`
--

INSERT INTO `tbl_score` (`id_score`, `_name`, `score`, `_date`) VALUES
(1, 'LORDRIKUARA', '2', '2021-05-27');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_score`
--
ALTER TABLE `tbl_score`
  ADD PRIMARY KEY (`id_score`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_score`
--
ALTER TABLE `tbl_score`
  MODIFY `id_score` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
