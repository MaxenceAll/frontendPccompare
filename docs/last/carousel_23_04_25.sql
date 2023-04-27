-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 27, 2023 at 12:17 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pccompare`
--

-- --------------------------------------------------------

--
-- Table structure for table `carousel`
--

DROP TABLE IF EXISTS `carousel`;
CREATE TABLE IF NOT EXISTS `carousel` (
  `id` int NOT NULL,
  `img_src` varchar(255) NOT NULL,
  `img_alt` varchar(30) NOT NULL,
  `description` varchar(60) NOT NULL DEFAULT 'Aucune description.',
  `button_text` varchar(30) NOT NULL DEFAULT 'Découvrir',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(255) NOT NULL DEFAULT 'site',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedBy` varchar(255) NOT NULL DEFAULT 'site',
  `navigate_to` varchar(30) NOT NULL DEFAULT '',
  `long_description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `carousel`
--

INSERT INTO `carousel` (`id`, `img_src`, `img_alt`, `description`, `button_text`, `createdAt`, `createdBy`, `deletedAt`, `deletedBy`, `modifiedAt`, `modifiedBy`, `navigate_to`, `long_description`) VALUES
(1, 'https://picsum.photos/id/1/850/300', 'lien vers builder', 'Venez découvrir le builder !', 'Découvrir içi', '2023-04-23 17:03:47', 'site', NULL, '0', '2023-04-23 17:03:47', 'site', 'builder', 'Le builder est un outil qui permet de constuire sa config, il permet d\'assurer la compatibilité entre les composants.\r\nEt combiné avec le comparateur, c\'est le meilleur moyen de faire une config au meilleur prix !'),
(2, 'https://picsum.photos/id/2/850/400', 'lien vers page about', 'Venez découvrir qui nous-sommes !', 'Cliquez ici', '2023-04-23 17:27:05', 'site', NULL, '0', '2023-04-23 17:27:05', 'site', 'about', ''),
(3, 'https://picsum.photos/id/3/850/500', 'lien vers compare', 'Venez découvrir le comparateur ! Trouvez les meilleurs prix ', 'Trouver les meilleurs prix', '2023-04-23 17:28:04', 'site', NULL, '0', '2023-04-23 17:28:04', 'site', 'compare', ''),
(4, 'https://picsum.photos/id/4/850/600', 'lien vers test', 'hello world', 'hello', '2023-04-23 17:29:09', 'site', NULL, '0', '2023-04-23 17:29:09', 'site', 'themes', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
