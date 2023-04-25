-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 25, 2023 at 08:44 AM
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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedBy` varchar(255) DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `modifiedBy` text,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `email`, `password`, `createdBy`, `createdAt`, `deletedBy`, `deletedAt`, `modifiedBy`, `modifiedAt`, `refresh_token`) VALUES
(25, 'maxoa59@gmail.com', 'Wek.5OR9uho6s1HxoxPiUOBPtdFv4485/F/8JCMh.449wOm9vpNcq', 'site', '2023-04-21 15:02:58', '0', NULL, 'site', '2023-04-23 12:05:00', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoibWF4b2E1OUBnbWFpbC5jb20iLCJwYXNzd29yZCI6Ildlay41T1I5dWhvNnMxSHhveFBpVU9CUHRkRnY0NDg1L0YvOEpDTWguNDQ5d09tOXZwTmNxIiwiY3JlYXRlZEJ5Ijoic2l0ZSIsImNyZWF0ZWRBdCI6IjIwMjMtMDQtMjFUMTU6MDI6NTguMDAwWiIsIm'),
(23, 'maxence.allart@gmail.com2', '1234', 'site', '2023-04-17 12:15:36', '0', NULL, NULL, '2023-04-17 12:15:36', NULL),
(24, 'maxence.allart@gmail.com3', '1234', 'site', '2023-04-17 12:15:36', '0', NULL, NULL, '2023-04-17 12:15:36', NULL),
(27, 'maxence.allart@gmail.com', 'j9hnjKx3EI92672fK7WAsuz/dOhdjf.vhWe71bmkUsTbAW0KWl/hm', 'site', '2023-04-24 12:54:19', '0', NULL, NULL, '2023-04-24 12:54:19', NULL);

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `carousel`
--

INSERT INTO `carousel` (`id`, `img_src`, `img_alt`, `description`, `button_text`, `createdAt`, `createdBy`, `deletedAt`, `deletedBy`, `modifiedAt`, `modifiedBy`, `navigate_to`) VALUES
(1, 'https://picsum.photos/id/1/850/300', 'lien vers builder', 'Venez découvrir le builder !', 'Découvrir içi', '2023-04-23 17:03:47', 'site', NULL, '0', '2023-04-23 17:03:47', 'site', 'builder'),
(2, 'https://picsum.photos/id/2/850/400', 'lien vers page about', 'Venez découvrir qui nous-sommes !', 'Cliquez ici', '2023-04-23 17:27:05', 'site', NULL, '0', '2023-04-23 17:27:05', 'site', 'about'),
(3, 'https://picsum.photos/id/3/850/500', 'lien vers compare', 'Venez découvrir le comparateur ! Trouvez les meilleurs prix ', 'Trouver les meilleurs prix', '2023-04-23 17:28:04', 'site', NULL, '0', '2023-04-23 17:28:04', 'site', 'compare'),
(4, 'https://picsum.photos/id/4/850/600', 'lien vers test', 'hello world', 'hello', '2023-04-23 17:29:09', 'site', NULL, '0', '2023-04-23 17:29:09', 'site', 'themes'),
(5, 'https://picsum.photos/id/145/850/600', 'TOTO TEEST', 'Hello new test', 'LETS GO', '2023-04-23 17:29:09', 'admin', NULL, '0', '2023-04-24 12:31:28', 'site', 'about');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `id_account` int DEFAULT NULL,
  `id_role` int DEFAULT NULL,
  `last_connection` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_account` (`id_account`),
  KEY `id_role` (`id_role`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `pseudo`, `firstname`, `lastname`, `id_account`, `id_role`, `last_connection`) VALUES
(14, 'mmmm', 'maxence', 'Allart', 25, 0, '2023-04-25 08:35:05'),
(16, 'TestPseudo', 'TestPrenom', 'TestNom', 27, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `title`) VALUES
(1, 'user'),
(2, 'moderator'),
(3, 'admin'),
(4, 'banned');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
