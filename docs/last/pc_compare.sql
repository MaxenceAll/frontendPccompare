-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 26, 2023 at 06:59 PM
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
-- Database: `pc_compare`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `Id_account` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `modifiedBy` varchar(255) DEFAULT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_account`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `Id_article` int NOT NULL AUTO_INCREMENT,
  `product_number` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `marque` varchar(255) DEFAULT NULL,
  `img_src` varchar(255) DEFAULT NULL,
  `img_alt` varchar(255) DEFAULT NULL,
  `Id_model` int DEFAULT NULL,
  PRIMARY KEY (`Id_article`),
  KEY `Id_model` (`Id_model`)
) ENGINE=MyISAM AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`Id_article`, `product_number`, `designation`, `marque`, `img_src`, `img_alt`, `Id_model`) VALUES
(1, '24G-P5-4999-KR', 'EVGA RTX 3090 Ti FTW3 KINGPIN', 'EVGA', 'https://tpucdn.com/gpu-specs/images/b/9583-front.jpg', 'EVGA RTX 3090 Ti FTW3 KINGPIN', 2),
(2, 'GV-N4090GAMING OC-24GD', 'GIGABYTE RTX 4090 GAMING OC', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9743-front.jpg', 'GIGABYTE RTX 4090 GAMING OC', 1),
(3, 'RX 7900 XTX 24G-E/OC', 'PowerColor Red Devil RX 7900 XTX', 'PowerColor', 'https://tpucdn.com/gpu-specs/images/b/9945-front.jpg', 'PowerColor Red Devil RX 7900 XTX', 3),
(4, 'TUF-RTX4090-24G-GAMING', 'ASUS TUF RTX 4090 GAMING', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9746-front.jpg', 'ASUS TUF RTX 4090 GAMING', 1),
(5, 'RX7900XTX TCW 24GO', 'ASRock RX 7900 XTX Taichi White OC', 'ASRock', 'https://tpucdn.com/gpu-specs/images/b/11036-front.jpg', 'ASRock RX 7900 XTX Taichi White OC', 3),
(6, 'GV-N309TAORUSX W-24GD', 'GIGABYTE AORUS RTX 3090 Ti XTREME WATERFORCE', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9552-front.jpg', 'GIGABYTE AORUS RTX 3090 Ti XTREME WATERFORCE', 2),
(7, 'ZT-D40900D-10P', 'ZOTAC RTX 4090 Trinity', 'ZOTAC', 'https://tpucdn.com/gpu-specs/images/b/9771-front.jpg', 'ZOTAC RTX 4090 Trinity', 1),
(8, 'ROG-STRIX-LC-RTX3090Ti-O24G-GAMING', 'ASUS ROG STRIX LC RTX 3090 Ti OC', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9547-front.jpg', 'ASUS ROG STRIX LC RTX 3090 Ti OC', 2),
(9, 'VCG3090T24TFXMPB', 'PNY XLR8 RTX 3090 Ti UPRISING EPIC-X', 'PNY', 'https://tpucdn.com/gpu-specs/images/b/9569-front.jpg', 'PNY XLR8 RTX 3090 Ti UPRISING EPIC-X', 2),
(10, NULL, 'Gainward RTX 3090 Ti GLARE OC', 'Gainward', 'https://tpucdn.com/gpu-specs/images/b/10114-front.jpg', 'Gainward RTX 3090 Ti GLARE OC', 2),
(11, 'TUF-RTX4090-O24G-GAMING', 'ASUS TUF RTX 4090 GAMING OC', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9745-front.jpg', 'ASUS TUF RTX 4090 GAMING OC', 1),
(12, 'C4090-246XX-18330005', 'Inno3D iChill RTX 4090 BLACK', 'Inno3D', 'https://tpucdn.com/gpu-specs/images/b/9773-front.jpg', 'Inno3D iChill RTX 4090 BLACK', 1),
(13, 'GV-R695XTAORUSX WB-16GD', 'GIGABYTE AORUS RX 6950 XT XTREME WATERFORCE WB', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9673-front.jpg', 'GIGABYTE AORUS RX 6950 XT XTREME WATERFORCE WB', 4),
(14, NULL, 'KFA2 RTX 3090 Ti HOF OC Lab Edition', 'KFA2', 'https://tpucdn.com/gpu-specs/images/b/10007-front.jpg', 'KFA2 RTX 3090 Ti HOF OC Lab Edition', 2),
(15, '24G-P5-4998-KR', 'EVGA RTX 3090 Ti FTW3 KINGPIN HYBRID', 'EVGA', 'https://tpucdn.com/gpu-specs/images/b/9562-front.jpg', 'EVGA RTX 3090 Ti FTW3 KINGPIN HYBRID', 2),
(16, 'RX-695XATBD9', 'XFX Speedster MERC 319 RX 6950 XT Black', 'XFX', 'https://tpucdn.com/gpu-specs/images/b/10400-front.jpg', 'XFX Speedster MERC 319 RX 6950 XT Black', 4),
(17, NULL, 'HP RTX 4090 OEM', 'HP', 'https://tpucdn.com/gpu-specs/images/b/10715-front.jpg', 'HP RTX 4090 OEM', 1),
(18, NULL, 'ASUS RX 7900 XTX', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9950-front.jpg', 'ASUS RX 7900 XTX', 3),
(19, '39IXM5MD6HEX', 'GALAX RTX 3090 Ti EX Gamer (1-Click OC)', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9575-front.jpg', 'GALAX RTX 3090 Ti EX Gamer (1-Click OC)', 2),
(20, NULL, 'MSI RX 6950 XT GAMING X TRIO', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9661-front.jpg', 'MSI RX 6950 XT GAMING X TRIO', 4),
(21, 'RX7900XTX PG 24GO', 'ASRock RX 7900 XTX Phantom OC', 'ASRock', 'https://tpucdn.com/gpu-specs/images/b/9957-front.jpg', 'ASRock RX 7900 XTX Phantom OC', 3),
(22, '24G-P5-4985-KR', 'EVGA RTX 3090 Ti FTW3 ULTRA', 'EVGA', 'https://tpucdn.com/gpu-specs/images/b/9548-front.jpg', 'EVGA RTX 3090 Ti FTW3 ULTRA', 2),
(23, '11317-02-20G', 'Sapphire NITRO+ RX 6950 XT', 'Sapphire', 'https://tpucdn.com/gpu-specs/images/b/9635-front.jpg', 'Sapphire NITRO+ RX 6950 XT', 4),
(24, 'RX 7900 XTX 24G-E/OC/LIMITED', 'PowerColor Red Devil RX 7900 XTX Limited Edition', 'PowerColor', 'https://tpucdn.com/gpu-specs/images/b/10119-front.jpg', 'PowerColor Red Devil RX 7900 XTX Limited Edition', 3),
(25, 'VCG3090T24TFXMPB-O', 'PNY XLR8 RTX 3090 Ti UPRISING EPIC-X OC', 'PNY', 'https://tpucdn.com/gpu-specs/images/b/9568-front.jpg', 'PNY XLR8 RTX 3090 Ti UPRISING EPIC-X OC', 2),
(26, NULL, 'Leadtek WinFast RTX 4090 HURRICANE', 'Leadtek', 'https://tpucdn.com/gpu-specs/images/b/9869-front.jpg', 'Leadtek WinFast RTX 4090 HURRICANE', 1),
(27, NULL, 'MSI RTX 4090 VENTUS 3X', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9907-front.jpg', 'MSI RTX 4090 VENTUS 3X', 1),
(28, NULL, 'Yeston RTX 4090 Deluxe HA', 'Yeston', 'https://tpucdn.com/gpu-specs/images/b/9834-front.jpg', 'Yeston RTX 4090 Deluxe HA', 1),
(29, 'VCG409024TFXXPB1', 'PNY XLR8 RTX 4090 VERTO EPIC-X Triple Fan', 'PNY', 'https://tpucdn.com/gpu-specs/images/b/9777-front.jpg', 'PNY XLR8 RTX 4090 VERTO EPIC-X Triple Fan', 1),
(30, '49NXM5MD6DDR', 'GALAX RTX 4090 ST (1-Click OC)', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9835-front.jpg', 'GALAX RTX 4090 ST (1-Click OC)', 1),
(31, 'AH-695XATCBR', 'VASTARMOR RX 6950 XT ALLOY', 'VASTARMOR', 'https://tpucdn.com/gpu-specs/images/b/9712-front.jpg', 'VASTARMOR RX 6950 XT ALLOY', 4),
(32, 'NED309TS19SB-1022G', 'Palit RTX 3090 Ti GameRock OC', 'Palit', 'https://tpucdn.com/gpu-specs/images/b/9531-front.jpg', 'Palit RTX 3090 Ti GameRock OC', 2),
(33, NULL, 'ZOTAC RTX 4090 Apocalypse OC', 'ZOTAC', 'https://tpucdn.com/gpu-specs/images/b/9786-front.jpg', 'ZOTAC RTX 4090 Apocalypse OC', 1),
(34, NULL, 'GALAX RTX 3090 Ti Xingyao OC', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9580-front.jpg', 'GALAX RTX 3090 Ti Xingyao OC', 2),
(35, 'ROG-STRIX-LC-RX6950XT-O16G-GAMING', 'ASUS ROG STRIX LC RX 6950 XT GAMING OC', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9675-front.jpg', 'ASUS ROG STRIX LC RX 6950 XT GAMING OC', 4),
(36, NULL, 'MSI RTX 4090 SUPRIM X', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9753-front.jpg', 'MSI RTX 4090 SUPRIM X', 1),
(37, '49NXM5MD6DSK', 'KFA2 RTX 4090 ST (1-Click OC)', 'KFA2', 'https://tpucdn.com/gpu-specs/images/b/9838-front.jpg', 'KFA2 RTX 4090 ST (1-Click OC)', 1),
(38, NULL, 'GALAX RTX 4090 ST V2 (1-Click OC)', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9836-front.jpg', 'GALAX RTX 4090 ST V2 (1-Click OC)', 1),
(39, NULL, 'GALAX RTX 4090 HOF OC LAB PLUS', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9840-front.jpg', 'GALAX RTX 4090 HOF OC LAB PLUS', 1),
(40, '471056224-3413', 'Gainward RTX 4090 Glare OC', 'Gainward', 'https://tpucdn.com/gpu-specs/images/b/10120-front.jpg', 'Gainward RTX 4090 Glare OC', 1),
(41, '471056224-3390', 'Gainward RTX 4090 Glare', 'Gainward', 'https://tpucdn.com/gpu-specs/images/b/10378-front.jpg', 'Gainward RTX 4090 Glare', 1),
(42, 'AXRX 6950 XT 16GBD6-3DHE/OC', 'PowerColor Red Devil RX 6950 XT', 'PowerColor', 'https://tpucdn.com/gpu-specs/images/b/9654-front.jpg', 'PowerColor Red Devil RX 6950 XT', 4),
(43, NULL, 'GALAX RTX 3090 Ti HOF OC Lab Edition', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9573-front.jpg', 'GALAX RTX 3090 Ti HOF OC Lab Edition', 2),
(44, NULL, 'Colorful Tomahawk RTX 4090 Deluxe Edition', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/9740-front.jpg', 'Colorful Tomahawk RTX 4090 Deluxe Edition', 1),
(45, '39IXM5MD5ZEH', 'GALAX RTX 3090 Ti HOF OC', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/10006-front.jpg', 'GALAX RTX 3090 Ti HOF OC', 2),
(46, 'M-NRTX4090G/6RHHPPP-M3530', 'Manli RTX 4090 Gallardo (M3530+N675)', 'Manli', 'https://tpucdn.com/gpu-specs/images/b/9877-front.jpg', 'Manli RTX 4090 Gallardo (M3530+N675)', 1),
(47, NULL, 'ASRock RX 7900 XTX', 'ASRock', 'https://tpucdn.com/gpu-specs/images/b/9955-front.jpg', 'ASRock RX 7900 XTX', 3),
(48, NULL, 'GALAX RTX 4090 Metal Master', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9874-front.jpg', 'GALAX RTX 4090 Metal Master', 1),
(49, NULL, 'Colorful iGame RTX 4090 Neptune', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/10473-front.jpg', 'Colorful iGame RTX 4090 Neptune', 1),
(50, 'VA7906AEF4', 'BIOSTAR RX 7900 XTX', 'BIOSTAR', 'https://tpucdn.com/gpu-specs/images/b/10214-front.jpg', 'BIOSTAR RX 7900 XTX', 3),
(51, NULL, 'GALAX RTX 4090 Boomstar', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9872-front.jpg', 'GALAX RTX 4090 Boomstar', 1),
(52, 'RX-79XMBABF9', 'XFX RX 7900 XTX', 'XFX', 'https://tpucdn.com/gpu-specs/images/b/9927-front.jpg', 'XFX RX 7900 XTX', 3),
(53, 'N309T3-246XX-1890VA46', 'Inno3D RTX 3090 Ti X3 OC', 'Inno3D', 'https://tpucdn.com/gpu-specs/images/b/9564-front.jpg', 'Inno3D RTX 3090 Ti X3 OC', 2),
(54, NULL, 'Colorful iGame RTX 4090 Vulcan OC', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/9787-front.jpg', 'Colorful iGame RTX 4090 Vulcan OC', 1),
(55, 'TUF-RTX3090TI-O24G-GAMING', 'ASUS TUF RTX 3090 Ti GAMING OC', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9570-front.jpg', 'ASUS TUF RTX 3090 Ti GAMING OC', 2),
(56, '11322-01-20G', 'Sapphire NITRO+ RX 7900 XTX Vapor-X', 'Sapphire', 'https://tpucdn.com/gpu-specs/images/b/9968-front.jpg', 'Sapphire NITRO+ RX 7900 XTX Vapor-X', 3),
(57, 'VA7906AMF4', 'BIOSTAR RX 7900 XTX', 'BIOSTAR', 'https://tpucdn.com/gpu-specs/images/b/10213-front.jpg', 'BIOSTAR RX 7900 XTX', 3),
(58, 'GV-R79XTXGAMING OC-24GD', 'GIGABYTE RX 7900 XTX GAMING OC', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9941-front.jpg', 'GIGABYTE RX 7900 XTX GAMING OC', 3),
(59, NULL, 'Colorful iGame RTX 4090 Neptune OC', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/9788-front.jpg', 'Colorful iGame RTX 4090 Neptune OC', 1),
(60, 'RX 7900 XTX 24G-L/OC', 'PowerColor Hellhound RX 7900 XTX', 'PowerColor', 'https://tpucdn.com/gpu-specs/images/b/9974-front.jpg', 'PowerColor Hellhound RX 7900 XTX', 3),
(61, 'RX-79XMERCB9', 'XFX Speedster MERC310 RX 7900 XTX Black', 'XFX', 'https://tpucdn.com/gpu-specs/images/b/9926-front.jpg', 'XFX Speedster MERC310 RX 7900 XTX Black', 3),
(62, NULL, 'MSI RX 6950 XT GAMING TRIO', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9662-front.jpg', 'MSI RX 6950 XT GAMING TRIO', 4),
(63, '24G-P5-4981-KR', 'EVGA RTX 3090 Ti FTW3 BLACK', 'EVGA', 'https://tpucdn.com/gpu-specs/images/b/9559-front.jpg', 'EVGA RTX 3090 Ti FTW3 BLACK', 2),
(64, '24G-P5-4983-KR', 'EVGA RTX 3090 Ti FTW3', 'EVGA', 'https://tpucdn.com/gpu-specs/images/b/9558-front.jpg', 'EVGA RTX 3090 Ti FTW3', 2),
(65, 'GV-N4090GAMING-24GD', 'GIGABYTE RTX 4090 GAMING', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9857-front.jpg', 'GIGABYTE RTX 4090 GAMING', 1),
(66, 'ZT-D40900B-10P', 'ZOTAC RTX 4090 AMP Extreme AIRO', 'ZOTAC', 'https://tpucdn.com/gpu-specs/images/b/9769-front.jpg', 'ZOTAC RTX 4090 AMP Extreme AIRO', 1),
(67, NULL, 'Dell RTX 4090 OEM', 'Dell', 'https://tpucdn.com/gpu-specs/images/b/10191-front.jpg', 'Dell RTX 4090 OEM', 1),
(68, '49NXM5MD6DSG', 'GALAX RTX 4090 SG (1-Click OC)', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9780-front.jpg', 'GALAX RTX 4090 SG (1-Click OC)', 1),
(69, 'C309T-246XX-1890FB', 'Inno3D iChill RTX 3090 Ti FROSTBITE', 'Inno3D', 'https://tpucdn.com/gpu-specs/images/b/9563-front.jpg', 'Inno3D iChill RTX 3090 Ti FROSTBITE', 2),
(70, 'N40903-246XX-18332989', 'Inno3D RTX 4090 X3', 'Inno3D', 'https://tpucdn.com/gpu-specs/images/b/9800-front.jpg', 'Inno3D RTX 4090 X3', 1),
(71, NULL, 'Colorful iGame RTX 4090 Chinese New Year Gift Box 2023 Advanced', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/10464-front.jpg', 'Colorful iGame RTX 4090 Chinese New Year Gift Box 2023 Advanced', 1),
(72, NULL, 'EVGA RTX 4090 FTW3 Prototype', 'EVGA', 'https://tpucdn.com/gpu-specs/images/b/9870-front.jpg', 'EVGA RTX 4090 FTW3 Prototype', 1),
(73, NULL, 'NVIDIA GeForce RTX 4090 Founders Edition', 'NVIDIA', 'https://tpucdn.com/gpu-specs/images/b/9915-front.jpg', 'NVIDIA GeForce RTX 4090 Founders Edition', 1),
(74, NULL, 'GALAX RTX 4090 Metal Master OC', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9873-front.jpg', 'GALAX RTX 4090 Metal Master OC', 1),
(75, NULL, 'Gainward RTX 4090 Phantom', 'Gainward', 'https://tpucdn.com/gpu-specs/images/b/9768-front.jpg', 'Gainward RTX 4090 Phantom', 1),
(76, 'GV-N4090AORUS M-24GD', 'GIGABYTE AORUS RTX 4090 MASTER', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9742-front.jpg', 'GIGABYTE AORUS RTX 4090 MASTER', 1),
(77, '24G-P5-4988-KR', 'EVGA RTX 3090 Ti FTW3 ULTRA HYBRID', 'EVGA', 'https://tpucdn.com/gpu-specs/images/b/9560-front.jpg', 'EVGA RTX 3090 Ti FTW3 ULTRA HYBRID', 2),
(78, NULL, 'Gainward RTX 4090 Phantom GS', 'Gainward', 'https://tpucdn.com/gpu-specs/images/b/9767-front.jpg', 'Gainward RTX 4090 Phantom GS', 1),
(79, 'GeForce® RTX 3090Ti-24G6X PGF OC', 'ZOTAC RTX 3090 Ti PGF OC', 'ZOTAC', 'https://tpucdn.com/gpu-specs/images/b/9582-front.jpg', 'ZOTAC RTX 3090 Ti PGF OC', 2),
(80, 'ROG-STRIX-RTX4090-24G-WHITE', 'ASUS ROG STRIX RTX 4090 GAMING WHITE', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9986-front.jpg', 'ASUS ROG STRIX RTX 4090 GAMING WHITE', 1),
(81, '49NXM5MD6DSK', 'KFA2 RTX 4090 SG (1-Click OC)', 'KFA2', 'https://tpucdn.com/gpu-specs/images/b/9783-front.jpg', 'KFA2 RTX 4090 SG (1-Click OC)', 1),
(82, NULL, 'MSI RTX 4090 SUPRIM LIQUID X', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9757-front.jpg', 'MSI RTX 4090 SUPRIM LIQUID X', 1),
(83, NULL, 'MSI RTX 4090 GAMING TRIO', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9756-front.jpg', 'MSI RTX 4090 GAMING TRIO', 1),
(84, 'C40903-246XX-1833VA47', 'Inno3D iChill RTX 4090 X3', 'Inno3D', 'https://tpucdn.com/gpu-specs/images/b/9972-front.jpg', 'Inno3D iChill RTX 4090 X3', 1),
(85, NULL, 'Colorful iGame RTX 4090 Vulcan', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/9741-front.jpg', 'Colorful iGame RTX 4090 Vulcan', 1),
(86, NULL, 'MSI RTX 4090 GAMING X TRIO', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9755-front.jpg', 'MSI RTX 4090 GAMING X TRIO', 1),
(87, NULL, 'Colorful iGame RTX 3090 Ti Neptune OC', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/9550-front.jpg', 'Colorful iGame RTX 3090 Ti Neptune OC', 2),
(88, NULL, 'KFA2 RTX 4090 ST V2 (1-Click OC)', 'KFA2', 'https://tpucdn.com/gpu-specs/images/b/9839-front.jpg', 'KFA2 RTX 4090 ST V2 (1-Click OC)', 1),
(89, 'ROG-STRIX-RTX4090-24G-GAMING', 'ASUS ROG STRIX RTX 4090 GAMING', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9750-front.jpg', 'ASUS ROG STRIX RTX 4090 GAMING', 1),
(90, NULL, 'PowerColor RX 7900 XTX', 'PowerColor', 'https://tpucdn.com/gpu-specs/images/b/9971-front.jpg', 'PowerColor RX 7900 XTX', 3),
(91, 'TUF-RTX3090TI-24G-GAMING', 'ASUS TUF RTX 3090 Ti GAMING', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9571-front.jpg', 'ASUS TUF RTX 3090 Ti GAMING', 2),
(92, 'ROG-STRIX-RTX4090-O24G-GAMING', 'ASUS ROG STRIX RTX 4090 GAMING OC', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9749-front.jpg', 'ASUS ROG STRIX RTX 4090 GAMING OC', 1),
(93, 'GV-N309TGAMING-24GD', 'GIGABYTE RTX 3090 Ti GAMING', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9555-front.jpg', 'GIGABYTE RTX 3090 Ti GAMING', 2),
(94, NULL, 'MSI RTX 4090 VENTUS 3X OC', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9906-front.jpg', 'MSI RTX 4090 VENTUS 3X OC', 1),
(95, '11322-02-20G', 'Sapphire PULSE RX 7900 XTX', 'Sapphire', 'https://tpucdn.com/gpu-specs/images/b/9966-front.jpg', 'Sapphire PULSE RX 7900 XTX', 3),
(96, NULL, 'MSI RTX 3090 Ti GAMING X TRIO', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9553-front.jpg', 'MSI RTX 3090 Ti GAMING X TRIO', 2),
(97, '39IXM5MD6HEK', 'KFA2 RTX 3090 Ti EX Gamer (1-Click OC)', 'KFA2', 'https://tpucdn.com/gpu-specs/images/b/9576-front.jpg', 'KFA2 RTX 3090 Ti EX Gamer (1-Click OC)', 2),
(98, 'RD-RX7900XTX-E24GB', 'KUROUTOSHIKOU RX 7900 XTX', 'KUROUTOSHIKOU', 'https://tpucdn.com/gpu-specs/images/b/10348-front.jpg', 'KUROUTOSHIKOU RX 7900 XTX', 3),
(99, 'GV-R695XTGAMING OC-16GD', 'GIGABYTE RX 6950 XT GAMING OC', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9674-front.jpg', 'GIGABYTE RX 6950 XT GAMING OC', 4),
(100, NULL, 'Dell RTX 3090 Ti OEM', 'Dell', 'https://tpucdn.com/gpu-specs/images/b/10005-front.jpg', 'Dell RTX 3090 Ti OEM', 2),
(101, NULL, 'Colorful iGame RTX 3090 Ti Vulcan OC', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/9549-front.jpg', 'Colorful iGame RTX 3090 Ti Vulcan OC', 2),
(102, NULL, 'Colorful iGame RTX 4090 Chinese New Year Gift Box 2023 Vulcan', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/10465-front.jpg', 'Colorful iGame RTX 4090 Chinese New Year Gift Box 2023 Vulcan', 1),
(103, 'ROG-STRIX-LC-RTX3090Ti-24G-GAMING', 'ASUS ROG STRIX LC RTX 3090 Ti', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9572-front.jpg', 'ASUS ROG STRIX LC RTX 3090 Ti', 2),
(104, 'NED4090019SB-1020Q', 'Palit RTX 4090 GameRock OmniBlack', 'Palit', 'https://tpucdn.com/gpu-specs/images/b/9823-front.jpg', 'Palit RTX 4090 GameRock OmniBlack', 1),
(105, NULL, 'MSI RTX 3090 Ti SUPRIM X', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9546-front.jpg', 'MSI RTX 3090 Ti SUPRIM X', 2),
(106, 'NED309T019SB-1022G', 'Palit RTX 3090 Ti GameRock', 'Palit', 'https://tpucdn.com/gpu-specs/images/b/9567-front.jpg', 'Palit RTX 3090 Ti GameRock', 2),
(107, 'NED4090S19SB-1020G', 'Palit RTX 4090 GameRock OC', 'Palit', 'https://tpucdn.com/gpu-specs/images/b/9775-front.jpg', 'Palit RTX 4090 GameRock OC', 1),
(108, 'RX-695XAWBD9', 'XFX Speedster ZERO WB RX 6950 XT Limited Edition', 'XFX', 'https://tpucdn.com/gpu-specs/images/b/10401-front.jpg', 'XFX Speedster ZERO WB RX 6950 XT Limited Edition', 4),
(109, NULL, 'MSI RX 7900 XTX GAMING TRIO CLASSIC', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/10710-front.jpg', 'MSI RX 7900 XTX GAMING TRIO CLASSIC', 3),
(110, '11317-04-20G', 'Sapphire NITRO+ RX 6950 XT PURE', 'Sapphire', 'https://tpucdn.com/gpu-specs/images/b/9634-front.jpg', 'Sapphire NITRO+ RX 6950 XT PURE', 4),
(111, 'RX7900XTX AQ 24GO', 'ASRock RX 7900 XTX AQUA', 'ASRock', 'https://tpucdn.com/gpu-specs/images/b/9936-front.jpg', 'ASRock RX 7900 XTX AQUA', 3),
(112, '471056224-3185', 'Gainward RTX 3090 Ti Phantom', 'Gainward', 'https://tpucdn.com/gpu-specs/images/b/9566-front.jpg', 'Gainward RTX 3090 Ti Phantom', 2),
(113, 'TUF-RX7900XTX-O24G-GAMING', 'ASUS TUF RX 7900 XTX GAMING OC', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9931-front.jpg', 'ASUS TUF RX 7900 XTX GAMING OC', 3),
(114, NULL, 'MSI RTX 4090 SUPRIM X Classic', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/10845-front.jpg', 'MSI RTX 4090 SUPRIM X Classic', 1),
(115, 'GV-N4090WF3-24GD', 'GIGABYTE RTX 4090 WINDFORCE', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9744-front.jpg', 'GIGABYTE RTX 4090 WINDFORCE', 1),
(116, '24G-P5-4989-KR', 'EVGA RTX 3090 Ti FTW3 ULTRA HYDRO COPPER', 'EVGA', 'https://tpucdn.com/gpu-specs/images/b/9561-front.jpg', 'EVGA RTX 3090 Ti FTW3 ULTRA HYDRO COPPER', 2),
(117, NULL, 'Colorful iGame RTX 4090 Vulcan W OC', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/10466-front.jpg', 'Colorful iGame RTX 4090 Vulcan W OC', 1),
(118, NULL, 'GALAX RTX 4090 Boomstar OC', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9871-front.jpg', 'GALAX RTX 4090 Boomstar OC', 1),
(119, 'C4090-246XX-1833FB', 'Inno3D iChill RTX 4090 FROSTBITE', 'Inno3D', 'https://tpucdn.com/gpu-specs/images/b/9974-front.jpg', 'Inno3D iChill RTX 4090 FROSTBITE', 1),
(120, 'VCG409024TFXMPB', 'PNY XLR8 RTX 4090 Uprising EPIC-X Triple Fan', 'PNY', 'https://tpucdn.com/gpu-specs/images/b/10652-front.jpg', 'PNY XLR8 RTX 4090 Uprising EPIC-X Triple Fan', 1),
(121, NULL, 'NVIDIA GeForce RTX 3090 Ti Founders Edition', 'NVIDIA', 'https://tpucdn.com/gpu-specs/images/b/10004-front.jpg', 'NVIDIA GeForce RTX 3090 Ti Founders Edition', 2),
(122, '盈通 RX7900XTX-24GD6 樱瞳水着 SUGAR', 'Yeston RX 7900 XTX SAKURA', 'Yeston', 'https://tpucdn.com/gpu-specs/images/b/9981-front.jpg', 'Yeston RX 7900 XTX SAKURA', 3),
(123, 'RX7900XTX TC 24GO', 'ASRock RX 7900 XTX Taichi OC', 'ASRock', 'https://tpucdn.com/gpu-specs/images/b/9956-front.jpg', 'ASRock RX 7900 XTX Taichi OC', 3),
(124, 'GV-N4090AORUSX W-24GD', 'GIGABYTE AORUS RTX 4090 XTREME WATERFORCE Rev. 1.1', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9937-front.jpg', 'GIGABYTE AORUS RTX 4090 XTREME WATERFORCE Rev. 1.1', 1),
(125, 'GG-RTX4090-E24GB/OC/TP', 'KUROUTOSHIKOU RTX 4090 GALAKURO', 'KUROUTOSHIKOU', 'https://tpucdn.com/gpu-specs/images/b/9867-front.jpg', 'KUROUTOSHIKOU RTX 4090 GALAKURO', 1),
(126, NULL, 'AMD Radeon RX 7900 XTX', 'AMD', 'https://tpucdn.com/gpu-specs/images/b/10940-front.jpg', 'AMD Radeon RX 7900 XTX', 3),
(127, 'ZT-D40900J-10P', 'ZOTAC RTX 4090 Trinity OC', 'ZOTAC', 'https://tpucdn.com/gpu-specs/images/b/9770-front.jpg', 'ZOTAC RTX 4090 Trinity OC', 1),
(128, 'M-NRTX3090TIG/6RHHPPP-M3520', 'Manli RTX 3090 Ti Gallardo (M3520+N667)', 'Manli', 'https://tpucdn.com/gpu-specs/images/b/9579-front.jpg', 'Manli RTX 3090 Ti Gallardo (M3520+N667)', 2),
(129, NULL, 'AX Gaming Renegade RTX 4090 X3W', 'AX', 'https://tpucdn.com/gpu-specs/images/b/9806-front.jpg', 'AX Gaming Renegade RTX 4090 X3W', 1),
(130, '39IXM5MD6HEG', 'GALAX RTX 3090 Ti EX Gamer ST (1-Click OC)', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9578-front.jpg', 'GALAX RTX 3090 Ti EX Gamer ST (1-Click OC)', 2),
(131, NULL, 'Lenovo RTX 4090 OEM', 'Lenovo', 'https://tpucdn.com/gpu-specs/images/b/10714-front.jpg', 'Lenovo RTX 4090 OEM', 1),
(132, NULL, 'AMD Radeon RX 6950 XT', 'AMD', 'https://tpucdn.com/gpu-specs/images/b/3941-front.jpg', 'AMD Radeon RX 6950 XT', 4),
(133, 'GV-N4090AERO OC-24GD', 'GIGABYTE RTX 4090 AERO OC', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/10856-front.jpg', 'GIGABYTE RTX 4090 AERO OC', 1),
(134, 'RX6950XT OCF 16G', 'ASRock RX 6950 XT OC Formula', 'ASRock', 'https://tpucdn.com/gpu-specs/images/b/9641-front.jpg', 'ASRock RX 6950 XT OC Formula', 4),
(135, NULL, 'Leadtek WinFast RTX 4090 HURRICANE', 'Leadtek', 'https://tpucdn.com/gpu-specs/images/b/10118-front.jpg', 'Leadtek WinFast RTX 4090 HURRICANE', 1),
(136, '39IXM5MD6KKK', 'KFA2 RTX 3090 Ti EX Gamer ST (1-Click OC)', 'KFA2', 'https://tpucdn.com/gpu-specs/images/b/9577-front.jpg', 'KFA2 RTX 3090 Ti EX Gamer ST (1-Click OC)', 2),
(137, 'VCG409024TFXXPB1-O', 'PNY XLR8 RTX 4090 VERTO EPIC-X Triple Fan OC', 'PNY', 'https://tpucdn.com/gpu-specs/images/b/9865-front.jpg', 'PNY XLR8 RTX 4090 VERTO EPIC-X Triple Fan OC', 1),
(138, 'AXRX 6950 XT 16GBD6-W3DH/OC', 'PowerColor Liquid Devil RX 6950 XT', 'PowerColor', 'https://tpucdn.com/gpu-specs/images/b/9652-front.jpg', 'PowerColor Liquid Devil RX 6950 XT', 4),
(139, 'NED4090019SB-1020G', 'Palit RTX 4090 GameRock', 'Palit', 'https://tpucdn.com/gpu-specs/images/b/9776-front.jpg', 'Palit RTX 4090 GameRock', 1),
(140, 'VCG409024TFXPPB', 'PNY XLR8 RTX 4090 REVEL EPIC-X Triple Fan', 'PNY', 'https://tpucdn.com/gpu-specs/images/b/10854-front.jpg', 'PNY XLR8 RTX 4090 REVEL EPIC-X Triple Fan', 1),
(141, NULL, 'MSI RTX 4090 SUPRIM', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9754-front.jpg', 'MSI RTX 4090 SUPRIM', 1),
(142, NULL, 'ZOTAC RTX 4090 AMP Extreme AIRO Moon White', 'ZOTAC', 'https://tpucdn.com/gpu-specs/images/b/10059-front.jpg', 'ZOTAC RTX 4090 AMP Extreme AIRO Moon White', 1),
(143, 'GV-N4090AORUSX W-24GD', 'GIGABYTE AORUS RTX 4090 XTREME WATERFORCE', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9797-front.jpg', 'GIGABYTE AORUS RTX 4090 XTREME WATERFORCE', 1),
(144, NULL, 'MSI RTX 3090 Ti GAMING TRIO', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9556-front.jpg', 'MSI RTX 3090 Ti GAMING TRIO', 2),
(145, NULL, 'GALAX RTX 3090 Ti Xingyao', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9581-front.jpg', 'GALAX RTX 3090 Ti Xingyao', 2),
(146, 'GV-R79XTX-24GC-B', 'GIGABYTE RX 7900 XTX', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9938-front.jpg', 'GIGABYTE RX 7900 XTX', 3),
(147, 'GV-N309TGAMING OC-24GD', 'GIGABYTE RTX 3090 Ti GAMING OC', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9554-front.jpg', 'GIGABYTE RTX 3090 Ti GAMING OC', 2),
(148, 'TUF-RX6950XT-O16G-GAMING', 'ASUS TUF RX 6950 XT GAMING OC', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9935-front.jpg', 'ASUS TUF RX 6950 XT GAMING OC', 4),
(149, NULL, 'MSI RTX 4090 SUPRIM LIQUID', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9758-front.jpg', 'MSI RTX 4090 SUPRIM LIQUID', 1),
(150, '21322-01-20G', 'Sapphire RX 7900 XTX', 'Sapphire', 'https://tpucdn.com/gpu-specs/images/b/9922-front.jpg', 'Sapphire RX 7900 XTX', 3),
(151, NULL, 'Colorful iGame RTX 4090 Advanced', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/10472-front.jpg', 'Colorful iGame RTX 4090 Advanced', 1),
(152, NULL, 'MSI RTX 4090 GAMING X TRIO Classic', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/10844-front.jpg', 'MSI RTX 4090 GAMING X TRIO Classic', 1),
(153, NULL, 'NVIDIA GeForce RTX 4090 Founders Edition Rev. 2', 'NVIDIA', 'https://tpucdn.com/gpu-specs/images/b/10933-front.jpg', 'NVIDIA GeForce RTX 4090 Founders Edition Rev. 2', 1),
(154, NULL, 'GALAX RTX 4090 HOF OC LAB', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9943-front.jpg', 'GALAX RTX 4090 HOF OC LAB', 1),
(155, NULL, 'MSI RTX 3090 Ti SUPRIM', 'MSI', 'https://tpucdn.com/gpu-specs/images/b/9557-front.jpg', 'MSI RTX 3090 Ti SUPRIM', 2),
(156, NULL, 'GALAX RTX 3090 Ti HOF OC Lab Limited Edition', 'GALAX', 'https://tpucdn.com/gpu-specs/images/b/9574-front.jpg', 'GALAX RTX 3090 Ti HOF OC Lab Limited Edition', 2),
(157, 'RX7900XTX 24G-W/OC', 'PowerColor Liquid Devil RX 7900 XTX', 'PowerColor', 'https://tpucdn.com/gpu-specs/images/b/10721-front.jpg', 'PowerColor Liquid Devil RX 7900 XTX', 3),
(158, '11317-01-20G', 'Sapphire TOXIC RX 6950 XT Limited Edition', 'Sapphire', 'https://tpucdn.com/gpu-specs/images/b/9633-front.jpg', 'Sapphire TOXIC RX 6950 XT Limited Edition', 4),
(159, NULL, 'KFA2 RTX 4090 HOF OC LAB', 'KFA2', 'https://tpucdn.com/gpu-specs/images/b/10769-front.jpg', 'KFA2 RTX 4090 HOF OC LAB', 1),
(160, '471056224-3208', 'Gainward RTX 3090 Ti Phantom GS', 'Gainward', 'https://tpucdn.com/gpu-specs/images/b/9565-front.jpg', 'Gainward RTX 3090 Ti Phantom GS', 2),
(161, 'ROG-STRIX-RTX4090-O24G-WHITE', 'ASUS ROG STRIX RTX 4090 GAMING WHITE OC', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9985-front.jpg', 'ASUS ROG STRIX RTX 4090 GAMING WHITE OC', 1),
(162, 'ZT-A30910B-10P', 'ZOTAC RTX 3090 Ti AMP Extreme Holo', 'ZOTAC', 'https://tpucdn.com/gpu-specs/images/b/9545-front.jpg', 'ZOTAC RTX 3090 Ti AMP Extreme Holo', 2),
(163, 'VCG409024TFXPB1', 'PNY RTX 4090 VERTO Triple Fan', 'PNY', 'https://tpucdn.com/gpu-specs/images/b/9864-front.jpg', 'PNY RTX 4090 VERTO Triple Fan', 1),
(164, NULL, 'Colorful iGame RTX 4090 Advanced OC', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/9849-front.jpg', 'Colorful iGame RTX 4090 Advanced OC', 1),
(165, NULL, 'Colorful Tomahawk RTX 3090 Ti Deluxe Edition', 'Colorful', 'https://tpucdn.com/gpu-specs/images/b/9551-front.jpg', 'Colorful Tomahawk RTX 3090 Ti Deluxe Edition', 2),
(166, 'TUF-RX7900XTX-24G-GAMING', 'ASUS TUF RX 7900 XTX GAMING', 'ASUS', 'https://tpucdn.com/gpu-specs/images/b/9948-front.jpg', 'ASUS TUF RX 7900 XTX GAMING', 3),
(167, 'GV-R79XTXAORUS E-24GD', 'GIGABYTE AORUS RX 7900 XTX ELITE', 'GIGABYTE', 'https://tpucdn.com/gpu-specs/images/b/9942-front.jpg', 'GIGABYTE AORUS RX 7900 XTX ELITE', 3),
(168, '100-100000910WOF', 'AMD Ryzen 7 7800X3D', 'AMD', 'https://media.ldlc.com/r1600/ld/products/00/06/02/14/LD0006021478.jpg', 'AMD Ryzen 7 7800X3D', 5),
(169, '100-100000591WOF', 'AMD Ryzen 7 7700X', 'AMD', 'https://media.ldlc.com/r1600/ld/products/00/05/99/73/LD0005997308.jpg', 'AMD Ryzen 7 7700X', 5),
(170, '100-100000063WOF', 'AMD Ryzen 7 5800X', 'AMD', 'https://media.ldlc.com/r1600/ld/products/00/05/74/60/LD0005746001_1.jpg', 'AMD Ryzen 7 5800X', 5),
(171, '100-100000065BOX', 'AMD Ryzen 5 5600X Wraith Stealth', 'AMD', 'https://media.ldlc.com/r1600/ld/products/00/05/74/59/LD0005745995_1.jpg', 'AMD Ryzen 5 5600X Wraith Stealth', 6),
(172, '100-100000510BOX', 'AMD Ryzen 3 4100 Wraith Stealth', 'AMD', 'https://media.ldlc.com/r1600/ld/products/00/05/95/00/LD0005950063.jpg', 'AMD Ryzen 3 4100 Wraith Stealth', 7),
(173, '100-100000144BOX', 'AMD Ryzen 3 4300G Wraith Stealth', 'AMD', 'https://media.ldlc.com/r1600/ld/products/00/06/02/27/LD0006022798.jpg', 'AMD Ryzen 3 4300G Wraith Stealth', 7),
(174, 'BX8071513900K', 'Intel Core i9-13900K', 'Intel', 'https://media.ldlc.com/r1600/ld/products/00/05/98/23/LD0005982300.jpg', 'Intel Core i9-13900K', 8),
(175, 'BX8071512900KF', 'Intel Core i9-12900KF', 'Intel', 'https://media.ldlc.com/r1600/ld/products/00/05/90/02/LD0005900238_1.jpg', 'Intel Core i9-12900KF', 8),
(176, 'BX8071513700K', 'Intel Core i7-13700K', 'Intel', 'https://www.ldlc.com/fiche/PB00519277.html', 'Intel Core i7-13700K', 9),
(177, 'BX8071512700KF', 'Intel Core i7-12700KF', 'Intel', 'https://www.ldlc.com/fiche/PB00464924.html', 'Intel Core i7-12700KF', 9),
(178, 'BX8071513600KF', 'Intel Core i5-13600KF', 'Intel', 'https://media.ldlc.com/r1600/ld/products/00/05/98/20/LD0005982085.jpg', 'Intel Core i5-13600KF', 10),
(179, 'BX8071512500', 'Intel Core i5-12500', 'Intel', 'https://www.ldlc.com/fiche/PB00472401.html', 'Intel Core i5-12500', 10),
(180, 'BX8071513100', 'Intel Core i3-13100', 'Intel', 'https://media.ldlc.com/r1600/ld/products/00/06/00/26/LD0006002655.jpg', 'Intel Core i3-13100', 11),
(181, 'BX8071512100F', 'Intel Core i3-12100F', 'Intel', 'https://media.ldlc.com/r1600/ld/products/00/05/91/49/LD0005914916_1.jpg', 'Intel Core i3-12100F', 11);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `Id_category` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `img_src` varchar(255) DEFAULT NULL,
  `img_alt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_category`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Id_category`, `name`, `code`, `img_src`, `img_alt`) VALUES
(1, 'Cartes Graphique', 'cg', NULL, 'Cartes Graphique'),
(2, 'Processeurs', 'cpu', NULL, 'Processeurs'),
(3, 'Cartes mères', 'cm', NULL, 'Cartes mères'),
(4, 'Mémoires Ram', 'ram', NULL, 'Mémoires Ram');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `Id_comment` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `note` tinyint DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `modifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `modifiedAt` date DEFAULT NULL,
  `Id_customer` int DEFAULT NULL,
  `Id_article` int DEFAULT NULL,
  PRIMARY KEY (`Id_comment`),
  KEY `Id_customer` (`Id_customer`),
  KEY `Id_article` (`Id_article`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `cpu`
--

DROP TABLE IF EXISTS `cpu`;
CREATE TABLE IF NOT EXISTS `cpu` (
  `Id_cpu` int NOT NULL AUTO_INCREMENT,
  `socket` varchar(255) DEFAULT NULL,
  `cpu_frequency` int DEFAULT NULL,
  `turbo_frequency` int DEFAULT NULL,
  `nb_core` int DEFAULT NULL,
  `nb_thread` int DEFAULT NULL,
  `plateform_cpu` varchar(255) DEFAULT NULL,
  `core_name` varchar(255) DEFAULT NULL,
  `lithography` int DEFAULT NULL,
  `tdp` int DEFAULT NULL,
  `cache_l2` int DEFAULT NULL,
  `cache_l3` int DEFAULT NULL,
  `integrated_gpu` varchar(255) DEFAULT NULL,
  `chipset_gpu` varchar(255) DEFAULT NULL,
  `controller_type` varchar(255) DEFAULT NULL,
  `ddr4_max` int DEFAULT NULL,
  `ddr5_max` int DEFAULT NULL,
  `Id_article` int DEFAULT NULL,
  PRIMARY KEY (`Id_cpu`),
  KEY `Id_article` (`Id_article`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `cpu`
--

INSERT INTO `cpu` (`Id_cpu`, `socket`, `cpu_frequency`, `turbo_frequency`, `nb_core`, `nb_thread`, `plateform_cpu`, `core_name`, `lithography`, `tdp`, `cache_l2`, `cache_l3`, `integrated_gpu`, `chipset_gpu`, `controller_type`, `ddr4_max`, `ddr5_max`, `Id_article`) VALUES
(1, 'AM4', 4200, 5000, 8, 16, 'AMD Zen 4', 'Raphael', 5, 120, 8, 96, 'Sans', 'Aucun', 'Dual Channel', 0, 5200, 168),
(2, 'AM4', 4500, 5400, 8, 16, 'AMD Zen 4', 'Raphael', 5, 105, 8, 32, 'Sans', 'Aucun', 'Dual Channel', 0, 5200, 169),
(3, 'AM4', 3800, 4700, 8, 16, 'AMD Zen 3', 'Vermeer', 7, 105, 4, 32, 'Sans', 'Aucun', 'Dual Channel', 3200, 0, 170),
(4, 'AM4', 3700, 4600, 6, 12, 'AMD Zen 3', 'Vermeer', 7, 65, 3, 32, 'Sans', 'Aucun', 'Dual Channel', 3200, 0, 171),
(5, 'AM4', 3800, 4000, 4, 8, 'AMD Zen 2', 'Renoir', 7, 65, 2, 4, 'Sans', 'Aucun', 'Dual Channel', 2933, 0, 172),
(6, 'AM4', 3800, 4000, 4, 8, 'AMD Zen 2', 'Renoir', 7, 65, 2, 4, 'Avec', 'Radeon Vega 6', 'Dual Channel', 3200, 0, 173),
(7, 'Intel 1700', 3000, 5800, 24, 32, 'Intel Raptor Lake-S', 'Raptor Lake', 7, 125, 32, 36, 'Avec', 'UHD Graphics 770', 'Dual Channel', 3200, 5600, 174),
(8, 'Intel 1700', 3200, 5200, 16, 24, 'Intel Alder Lake-S', 'Alder Lake', 10, 125, 14, 30, 'Sans', 'Aucun', 'Dual Channel', 3200, 4800, 175),
(9, 'Intel 1700', 3400, 5400, 16, 24, 'Intel Raptor Lake-S', 'Raptor Lake', 7, 125, 24, 30, 'Avec', 'UHD Graphics 770', 'Dual Channel', 3200, 5600, 176),
(10, 'Intel 1700', 3600, 5000, 12, 20, 'Intel Alder Lake-S', 'Alder Lake', 10, 125, 12, 25, 'Sans', 'Aucun', 'Dual Channel', 3200, 4800, 177),
(11, 'Intel 1700', 3500, 5100, 14, 20, 'Intel Raptor Lake-S', 'Raptor Lake', 7, 125, 20, 24, 'Sans', 'Aucun', 'Dual Channel', 3200, 5600, 178),
(12, 'Intel 1700', 3000, 4600, 6, 12, 'Intel Alder Lake-S', 'Alder Lake', 10, 65, 7, 18, 'Avec', 'UHD Graphics 770', 'Dual Channel', 3200, 4800, 179),
(13, 'Intel 1700', 3400, 4500, 4, 8, 'Intel Raptor Lake-S', 'Raptor Lake', 7, 60, 5, 12, 'Avec', 'UHD Graphics 730', 'Dual Channel', 3200, 4800, 180),
(14, 'Intel 1700', 3300, 4300, 4, 8, 'Intel Alder Lake-S', 'Alder Lake', 10, 58, 5, 12, 'Sans', 'Aucun', 'Dual Channel', 3200, 4800, 181);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `Id_customer` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `last_connection` date DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `modifiedBy` varchar(255) DEFAULT NULL,
  `modifiedAt` date DEFAULT NULL,
  `Id_account` int DEFAULT NULL,
  `Id_role` int DEFAULT NULL,
  PRIMARY KEY (`Id_customer`),
  UNIQUE KEY `Id_account` (`Id_account`),
  UNIQUE KEY `pseudo` (`pseudo`),
  KEY `Id_role` (`Id_role`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `customer_product`
--

DROP TABLE IF EXISTS `customer_product`;
CREATE TABLE IF NOT EXISTS `customer_product` (
  `Id_customer` int NOT NULL,
  `Id_article` int NOT NULL,
  PRIMARY KEY (`Id_customer`,`Id_article`),
  KEY `Id_article` (`Id_article`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `gpu`
--

DROP TABLE IF EXISTS `gpu`;
CREATE TABLE IF NOT EXISTS `gpu` (
  `Id_gpu` int NOT NULL AUTO_INCREMENT,
  `ean` varchar(255) DEFAULT NULL,
  `upc` varchar(255) DEFAULT NULL,
  `chipset` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `gpu_clock` int DEFAULT NULL,
  `boost_clock` int DEFAULT NULL,
  `memory_clock` int DEFAULT NULL,
  `bus_interface` varchar(255) DEFAULT NULL,
  `bus_width` int DEFAULT NULL,
  `memory_vram` int DEFAULT NULL,
  `slot_width` tinyint DEFAULT NULL,
  `length` int DEFAULT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `tdp` int DEFAULT NULL,
  `psu_needed` int DEFAULT NULL,
  `nb_hdmi` int DEFAULT NULL,
  `nb_dp` int DEFAULT NULL,
  `nb_usbc` int DEFAULT NULL,
  `power_connector` varchar(255) DEFAULT NULL,
  `pixel_rate` int DEFAULT NULL,
  `texture_rate` int DEFAULT NULL,
  `fp32` int DEFAULT NULL,
  `shader` int DEFAULT NULL,
  `tmu` int DEFAULT NULL,
  `rop` int DEFAULT NULL,
  `sm_cu` int DEFAULT NULL,
  `tensor_cores` int DEFAULT NULL,
  `rt_cores` int DEFAULT NULL,
  `Id_article` int DEFAULT NULL,
  PRIMARY KEY (`Id_gpu`),
  KEY `Id_article` (`Id_article`)
) ENGINE=MyISAM AUTO_INCREMENT=168 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `gpu`
--

INSERT INTO `gpu` (`Id_gpu`, `ean`, `upc`, `chipset`, `color`, `gpu_clock`, `boost_clock`, `memory_clock`, `bus_interface`, `bus_width`, `memory_vram`, `slot_width`, `length`, `width`, `height`, `tdp`, `psu_needed`, `nb_hdmi`, `nb_dp`, `nb_usbc`, `power_connector`, `pixel_rate`, `texture_rate`, `fp32`, `shader`, `tmu`, `rop`, `sm_cu`, `tensor_cores`, `rt_cores`, `Id_article`) VALUES
(147, NULL, NULL, '3090Ti', 'Black', 1560, 1905, 1313, '4.0 x16', 384, 24, 3, 331, 150, 70, 450, 850, 1, 3, 0, '1 x 16 Pin ', 213, 640, 41, 10752, 336, 112, 874, 336, 84, 147),
(146, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 2, 287, 135, 51, 355, 750, 1, 2, 1, '2 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 146),
(145, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 349, 141, 66, 450, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 145),
(144, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 325, 140, 62, 450, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 144),
(143, NULL, NULL, '4090', 'Black', 2235, 2565, 1313, '4.0 x16', 384, 24, 2, 238, 141, 40, 450, 850, 1, 3, 0, '1 x 16 Pin ', 451, 1313, 84, 16384, 512, 176, 128, 512, 128, 143),
(142, NULL, NULL, '4090', 'White', 2235, 2580, 1313, '4.0 x16', 384, 24, 4, 356, 166, 72, 450, 850, 1, 3, 0, '1 x 16 Pin ', 454, 1321, 85, 16384, 512, 176, 128, 512, 128, 142),
(141, NULL, NULL, '4090', 'Black', 2235, 2595, 1313, '4.0 x16', 384, 24, 4, 336, 142, 78, 450, 850, 1, 3, 0, '1 x 16 Pin ', 457, 1328, 85, 16384, 512, 176, 128, 512, 128, 141),
(140, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, 329, 141, 70, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 140),
(139, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 329, 138, 72, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 139),
(138, NULL, NULL, '6950XT', 'Black', 1860, 2513, 2250, '4.0 x16', 256, 16, 2, 266, 162, 42, 335, 700, 1, 2, 0, '3 x 8 Pin ', 322, 804, 26, 5120, 320, 128, 80, 0, 80, 138),
(137, NULL, NULL, '4090', 'Black', 2235, 2565, 1313, '4.0 x16', 384, 24, 4, 332, 137, 71, 450, 850, 1, 3, 0, '1 x 16 Pin ', 451, 1313, 84, 16384, 512, 176, 128, 512, 128, 137),
(136, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 322, 132, 62, 450, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 136),
(135, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, 352, 145, 68, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 135),
(134, NULL, NULL, '6950XT', 'Black', 2143, 2495, 2250, '4.0 x16', 256, 16, 3, 332, 137, 61, 335, 700, 1, 2, 0, '3 x 8 Pin ', 319, 798, 26, 5120, 320, 128, 80, 0, 80, 134),
(133, NULL, NULL, '4090', 'Black', 2235, 2535, 1313, '4.0 x16', 384, 24, 4, 342, 150, 75, 450, 850, 1, 3, 0, '1 x 16 Pin ', 446, 1298, 83, 16384, 512, 176, 128, 512, 128, 133),
(132, NULL, NULL, '6950XT', 'Black', 1860, 2310, 2250, '4.0 x16', 256, 16, 3, NULL, NULL, NULL, 335, 700, 1, 2, 0, '2 x 8 Pin ', 296, 739, 24, 5120, 320, 128, 80, 0, 80, 132),
(131, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, NULL, NULL, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 131),
(130, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 322, 132, 62, 450, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 130),
(129, NULL, NULL, '4090', 'Black', 2235, 2550, 1313, '4.0 x16', 384, 24, 3, 336, 145, 60, 450, 850, 1, 3, 0, '1 x 16 Pin ', 449, 1305, 84, 16384, 512, 176, 128, 512, 128, 129),
(128, NULL, NULL, '3090Ti', 'Black', 1560, 1875, 1313, '4.0 x16', 384, 24, 3, 320, 138, 58, 450, 850, 1, 3, 0, '1 x 16 Pin ', 210, 630, 40, 10752, 336, 112, 874, 336, 84, 128),
(127, NULL, NULL, '4090', 'Black', 2235, 2535, 1313, '4.0 x16', 384, 24, 4, 356, 165, 71, 450, 850, 1, 3, 0, '1 x 16 Pin ', 446, 1298, 83, 16384, 512, 176, 128, 512, 128, 127),
(126, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 2, 287, 135, 51, 355, 750, 1, 2, 1, '2 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 126),
(125, NULL, NULL, '4090', 'Black', 2235, 2580, 1313, '4.0 x16', 384, 24, 4, 336, 138, 74, 450, 850, 1, 3, 0, '1 x 16 Pin ', 454, 1321, 85, 16384, 512, 176, 128, 512, 128, 125),
(124, NULL, NULL, '4090', 'Black', 2235, 2565, 1313, '4.0 x16', 384, 24, 2, 238, 141, 40, 450, 850, 1, 3, 0, '1 x 16 Pin ', 451, 1313, 84, 16384, 512, 176, 128, 512, 128, 124),
(123, NULL, NULL, '7900XTX', 'Black', 1855, 2679, 2500, '4.0 x16', 384, 24, 3, 345, 140, 61, 355, 750, 1, 3, 0, '3 x 8 Pin ', 641, 1029, 66, 6144, 384, 192, 96, 0, 96, 123),
(122, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 3, 330, 137, 60, 355, 750, 1, 3, 0, '2 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 122),
(121, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 336, 140, 61, 450, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 121),
(120, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, 351, 145, 63, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 120),
(119, NULL, NULL, '4090', 'Black', 2235, 2580, 1313, '4.0 x16', 384, 24, 2, 200, 159, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 454, 1321, 85, 16384, 512, 176, 128, 512, 128, 119),
(118, NULL, NULL, '4090', 'Black', 2235, 2580, 1313, '4.0 x16', 384, 24, 3, 338, 139, 69, 450, 850, 1, 3, 0, '1 x 16 Pin ', 454, 1321, 85, 16384, 512, 176, 128, 512, 128, 118),
(117, NULL, NULL, '4090', 'Black', 2235, 2625, 1313, '4.0 x16', 384, 24, 3, 349, 160, 70, 515, 900, 1, 3, 0, '1 x 16 Pin ', 462, 1344, 86, 16384, 512, 176, 128, 512, 128, 117),
(116, NULL, NULL, '3090Ti', 'Black', 1560, 1920, 1313, '4.0 x16', 384, 24, 2, NULL, NULL, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 215, 645, 41, 10752, 336, 112, 874, 336, 84, 116),
(115, '4719331311476', '889523033975', '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 331, 150, 70, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 115),
(114, NULL, NULL, '4090', 'Black', 2235, 2625, 1313, '4.0 x16', 384, 24, 3, 338, 140, 71, 480, 850, 1, 3, 0, '1 x 16 Pin ', 462, 1344, 86, 16384, 512, 176, 128, 512, 128, 114),
(113, NULL, NULL, '7900XTX', 'Black', 1895, 2565, 2500, '4.0 x16', 384, 24, 4, 353, 158, 73, 355, 750, 1, 3, 0, '3 x 8 Pin ', 613, 985, 63, 6144, 384, 192, 96, 0, 96, 113),
(112, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 314, 137, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 112),
(111, NULL, NULL, '7900XTX', 'Black', 1855, 2679, 2500, '4.0 x16', 384, 24, 2, 275, 157, 22, 355, 750, 1, 3, 0, '3 x 8 Pin ', 641, 1029, 66, 6144, 384, 192, 96, 0, 96, 111),
(110, NULL, NULL, '6950XT', 'Black', 2009, 2368, 2250, '4.0 x16', 256, 16, 4, 320, 135, 72, 335, 700, 1, 2, 0, '2 x 8 Pin  + 1 x 6 Pin', 303, 758, 24, 5120, 320, 128, 80, 0, 80, 110),
(109, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 3, 325, 141, 56, 355, 750, 1, 3, 0, '3 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 109),
(108, NULL, NULL, '6950XT', 'Black', 2210, 2565, 2250, '4.0 x16', 256, 16, 2, 300, 160, 25, 335, 700, 1, 2, 1, '2 x 8 Pin ', 328, 821, 26, 5120, 320, 128, 80, 0, 80, 108),
(107, NULL, NULL, '4090', 'Black', 2235, 2610, 1313, '4.0 x16', 384, 24, 4, 329, 138, 72, 450, 850, 1, 3, 0, '1 x 16 Pin ', 459, 1336, 86, 16384, 512, 176, 128, 512, 128, 107),
(106, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 314, 137, 65, 460, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 106),
(105, NULL, NULL, '3090Ti', 'Black', 1560, 1950, 1313, '4.0 x16', 384, 24, 3, 338, 140, 71, 480, 850, 1, 3, 0, '1 x 16 Pin ', 218, 655, 42, 10752, 336, 112, 874, 336, 84, 105),
(104, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 329, 138, 72, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 104),
(103, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 293, 133, 52, 450, 850, 2, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 103),
(102, NULL, NULL, '4090', 'Black', 2235, 2625, 1313, '4.0 x16', 384, 24, 3, 349, 160, 70, 515, 900, 1, 3, 0, '1 x 16 Pin ', 462, 1344, 86, 16384, 512, 176, 128, 512, 128, 102),
(101, NULL, NULL, '3090Ti', 'Black', 1560, 1920, 1313, '4.0 x16', 384, 24, 3, 323, 159, 71, 510, 900, 1, 3, 0, '1 x 16 Pin ', 215, 645, 41, 10752, 336, 112, 874, 336, 84, 101),
(100, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, NULL, NULL, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 100),
(99, NULL, NULL, '6950XT', 'Black', 1860, 2324, 2250, '4.0 x16', 256, 16, 3, 332, 143, 57, 335, 700, 2, 2, 0, '3 x 8 Pin ', 298, 744, 24, 5120, 320, 128, 80, 0, 80, 99),
(98, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 2, 287, 135, 51, 355, 750, 1, 2, 1, '2 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 98),
(97, NULL, NULL, '3090Ti', 'Black', 1560, 1890, 1313, '4.0 x16', 384, 24, 3, 322, 132, 62, 450, 850, 1, 3, 0, '1 x 16 Pin ', 212, 635, 41, 10752, 336, 112, 874, 336, 84, 97),
(96, NULL, NULL, '3090Ti', 'Black', 1560, 1920, 1313, '4.0 x16', 384, 24, 3, 325, 140, 62, 450, 850, 1, 3, 0, '1 x 16 Pin ', 215, 645, 41, 10752, 336, 112, 874, 336, 84, 96),
(95, NULL, NULL, '7900XTX', 'Black', 1855, 2525, 2500, '4.0 x16', 384, 24, 3, 313, 134, 53, 370, 750, 2, 2, 0, '3 x 8 Pin ', 604, 970, 62, 6144, 384, 192, 96, 0, 96, 95),
(94, NULL, NULL, '4090', 'Black', 2235, 2550, 1313, '4.0 x16', 384, 24, 3, 322, 136, 63, 450, 850, 1, 3, 0, '1 x 16 Pin ', 449, 1305, 84, 16384, 512, 176, 128, 512, 128, 94),
(93, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 331, 150, 70, 450, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 93),
(92, NULL, NULL, '4090', 'Black', 2235, 2610, 1313, '4.0 x16', 384, 24, 4, 358, 149, 70, 450, 850, 2, 3, 0, '1 x 16 Pin ', 459, 1336, 86, 16384, 512, 176, 128, 512, 128, 92),
(91, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 326, 140, 63, 450, 850, 2, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 91),
(90, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 2, 287, 135, 51, 355, 750, 1, 2, 1, '2 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 90),
(89, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 358, 149, 70, 450, 850, 2, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 89),
(88, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 336, 138, 74, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 88),
(87, NULL, NULL, '3090Ti', 'Black', 1560, 1905, 1313, '4.0 x16', 384, 24, 2, 258, 153, 43, 510, 900, 1, 3, 0, '1 x 16 Pin ', 213, 640, 41, 10752, 336, 112, 874, 336, 84, 87),
(86, NULL, NULL, '4090', 'Black', 2235, 2595, 1313, '4.0 x16', 384, 24, 4, 337, 140, 77, 450, 850, 1, 3, 0, '1 x 16 Pin ', 457, 1328, 85, 16384, 512, 176, 128, 512, 128, 86),
(85, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, 349, 160, 70, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 85),
(84, NULL, NULL, '4090', 'Black', 2235, 2580, 1313, '4.0 x16', 384, 24, 3, 334, 148, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 454, 1321, 85, 16384, 512, 176, 128, 512, 128, 84),
(83, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 337, 140, 77, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 83),
(82, NULL, NULL, '4090', 'Black', 2235, 2625, 1313, '4.0 x16', 384, 24, 2, 280, 140, 43, 450, 850, 1, 3, 0, '1 x 16 Pin ', 462, 1344, 86, 16384, 512, 176, 128, 512, 128, 82),
(81, NULL, NULL, '4090', 'Black', 2235, 2580, 1313, '4.0 x16', 384, 24, 4, 336, 138, 74, 450, 850, 1, 3, 0, '1 x 16 Pin ', 454, 1321, 85, 16384, 512, 176, 128, 512, 128, 81),
(80, NULL, NULL, '4090', 'White', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 358, 149, 70, 450, 850, 2, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 80),
(79, NULL, NULL, '3090Ti', 'Black', 1560, 1890, 1313, '4.0 x16', 384, 24, 4, 309, 139, 73, 450, 850, 1, 3, 0, '1 x 16 Pin ', 212, 635, 41, 10752, 336, 112, 874, 336, 84, 79),
(78, NULL, NULL, '4090', 'Black', 2235, 2610, 1313, '4.0 x16', 384, 24, 4, 329, 142, 70, 450, 850, 1, 3, 0, '1 x 16 Pin ', 459, 1336, 86, 16384, 512, 176, 128, 512, 128, 78),
(77, NULL, NULL, '3090Ti', 'Black', 1560, 1920, 1313, '4.0 x16', 384, 24, 3, NULL, NULL, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 215, 645, 41, 10752, 336, 112, 874, 336, 84, 77),
(76, NULL, NULL, '4090', 'Black', 2235, 2550, 1313, '4.0 x16', 384, 24, 4, 359, 163, 75, 450, 850, 1, 3, 0, '1 x 16 Pin ', 449, 1305, 84, 16384, 512, 176, 128, 512, 128, 76),
(75, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 329, 152, 70, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 75),
(74, NULL, NULL, '4090', 'Black', 2235, 2565, 1313, '4.0 x16', 384, 24, 3, 338, 139, 69, 450, 850, 1, 3, 0, '1 x 16 Pin ', 451, 1313, 84, 16384, 512, 176, 128, 512, 128, 74),
(73, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, NULL, 137, 61, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 73),
(72, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, NULL, NULL, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 72),
(71, NULL, NULL, '4090', 'Black', 2235, 2610, 1313, '4.0 x16', 384, 24, 3, 344, 148, 71, 490, 850, 1, 3, 0, '1 x 16 Pin ', 459, 1336, 86, 16384, 512, 176, 128, 512, 128, 71),
(70, NULL, NULL, '4090', 'Black', 2235, 2550, 1313, '4.0 x16', 384, 24, 3, 336, 145, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 449, 1305, 84, 16384, 512, 176, 128, 512, 128, 70),
(69, NULL, NULL, '3090Ti', 'Black', 1560, 1890, 1313, '4.0 x16', 384, 24, 2, 220, 160, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 212, 635, 41, 10752, 336, 112, 874, 336, 84, 69),
(68, NULL, NULL, '4090', 'Black', 2235, 2580, 1313, '4.0 x16', 384, 24, 4, 336, 138, 74, 450, 850, 1, 3, 0, '1 x 16 Pin ', 454, 1321, 85, 16384, 512, 176, 128, 512, 128, 68),
(67, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, NULL, NULL, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 67),
(66, NULL, NULL, '4090', 'Black', 2235, 2580, 1313, '4.0 x16', 384, 24, 4, 356, 166, 72, 450, 850, 1, 3, 0, '1 x 16 Pin ', 454, 1321, 85, 16384, 512, 176, 128, 512, 128, 66),
(65, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 340, 150, 75, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 65),
(64, NULL, NULL, '3090Ti', 'Black', 1560, 1890, 1313, '4.0 x16', 384, 24, 3, 300, 137, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 212, 635, 41, 10752, 336, 112, 874, 336, 84, 64),
(63, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 300, 137, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 63),
(62, NULL, NULL, '6950XT', 'Black', 1860, 2324, 2250, '4.0 x16', 256, 16, 3, 325, 140, 55, 335, 700, 1, 2, 0, '3 x 8 Pin ', 298, 744, 24, 5120, 320, 128, 80, 0, 80, 62),
(61, NULL, NULL, '7900XTX', 'Black', 2867, 2617, 2500, '4.0 x16', 384, 24, 3, 344, 128, 57, 355, 750, 1, 3, 0, '3 x 8 Pin ', 626, 1005, 64, 6144, 384, 192, 96, 0, 96, 61),
(60, NULL, NULL, '7900XTX', 'Black', 1855, 2525, 2500, '4.0 x16', 384, 24, 3, 320, 119, 62, 355, 750, 1, 3, 0, '3 x 8 Pin ', 604, 970, 62, 6144, 384, 192, 96, 0, 96, 60),
(59, NULL, NULL, '4090', 'Black', 2235, 2640, 1313, '4.0 x16', 384, 24, 2, 254, 152, 42, 550, 950, 1, 3, 0, '1 x 16 Pin ', 465, 1351, 87, 16384, 512, 176, 128, 512, 128, 59),
(58, NULL, NULL, '7900XTX', 'Black', 1855, 2525, 2500, '4.0 x16', 384, 24, 2, 311, 138, 50, 355, 750, 2, 2, 0, '2 x 8 Pin ', 604, 970, 62, 6144, 384, 192, 96, 0, 96, 58),
(57, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 3, NULL, NULL, NULL, 355, 750, 1, 3, 0, '2 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 57),
(56, NULL, NULL, '7900XTX', 'Black', 1855, 2679, 2500, '4.0 x16', 384, 24, 4, 320, 136, 72, 420, 800, 2, 2, 0, '3 x 8 Pin ', 641, 1029, 66, 6144, 384, 192, 96, 0, 96, 56),
(55, NULL, NULL, '3090Ti', 'Black', 1560, 1920, 1313, '4.0 x16', 384, 24, 3, 326, 140, 63, 450, 850, 2, 3, 0, '1 x 16 Pin ', 215, 645, 41, 10752, 336, 112, 874, 336, 84, 55),
(54, NULL, NULL, '4090', 'Black', 2235, 2625, 1313, '4.0 x16', 384, 24, 3, 349, 160, 70, 515, 900, 1, 3, 0, '1 x 16 Pin ', 462, 1344, 86, 16384, 512, 176, 128, 512, 128, 54),
(53, NULL, NULL, '3090Ti', 'Black', 1560, 1890, 1313, '4.0 x16', 384, 24, 3, 330, 140, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 212, 635, 41, 10752, 336, 112, 874, 336, 84, 53),
(52, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 2, 287, 135, 51, 355, 750, 1, 2, 1, '2 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 52),
(51, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, 338, 139, 69, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 51),
(50, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 2, 287, 135, 51, 355, 750, 1, 2, 1, '2 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 50),
(49, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 2, 254, 152, 42, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 49),
(48, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, 338, 139, 69, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 48),
(47, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 2, 287, 135, 51, 355, 750, 1, 2, 1, '2 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 47),
(46, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, 351, 145, 63, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 46),
(45, NULL, NULL, '3090Ti', 'Black', 1560, 1920, 1313, '4.0 x16', 384, 24, 3, 339, 144, 68, 480, 850, 1, 3, 0, '2 x 16 Pin ', 215, 645, 41, 10752, 336, 112, 874, 336, 84, 45),
(44, NULL, NULL, '4090', 'Black', 2235, 2565, 1313, '4.0 x16', 384, 24, 3, NULL, NULL, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 451, 1313, 84, 16384, 512, 176, 128, 512, 128, 44),
(43, NULL, NULL, '3090Ti', 'Black', 1560, 1920, 1313, '4.0 x16', 384, 24, 3, 343, 145, 68, 480, 850, 1, 3, 0, '2 x 16 Pin ', 215, 645, 41, 10752, 336, 112, 874, 336, 84, 43),
(42, NULL, NULL, '6950XT', 'Black', 1860, 2435, 2250, '4.0 x16', 256, 16, 3, 320, 135, 62, 335, 700, 1, 2, 0, '3 x 8 Pin ', 312, 779, 25, 5120, 320, 128, 80, 0, 80, 42),
(41, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, NULL, NULL, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 41),
(40, NULL, NULL, '4090', 'Black', 2235, 2580, 1313, '4.0 x16', 384, 24, 3, NULL, NULL, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 454, 1321, 85, 16384, 512, 176, 128, 512, 128, 40),
(39, NULL, NULL, '4090', 'Black', 2235, 2625, 1313, '4.0 x16', 384, 24, 4, 344, 144, 77, 550, 950, 1, 3, 0, '2 x 16 Pin ', 462, 1344, 86, 16384, 512, 176, 128, 512, 128, 39),
(38, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 336, 138, 74, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 38),
(37, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 336, 138, 74, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 37),
(36, NULL, NULL, '4090', 'Black', 2235, 2625, 1313, '4.0 x16', 384, 24, 4, 336, 142, 78, 450, 850, 1, 3, 0, '1 x 16 Pin ', 462, 1344, 86, 16384, 512, 176, 128, 512, 128, 36),
(35, NULL, NULL, '6950XT', 'Black', 2210, 2565, 2250, '4.0 x16', 256, 16, 2, 277, 131, 44, 335, 700, 1, 2, 1, '3 x 8 Pin ', 328, 821, 26, 5120, 320, 128, 80, 0, 80, 35),
(34, NULL, NULL, '3090Ti', 'Black', 1560, 1890, 1313, '4.0 x16', 384, 24, 3, 349, 141, 66, 450, 850, 1, 3, 0, '1 x 16 Pin ', 212, 635, 41, 10752, 336, 112, 874, 336, 84, 34),
(33, NULL, NULL, '4090', 'Black', 2235, 2550, 1313, '4.0 x16', 384, 24, 4, 367, 150, 74, 450, 850, 1, 3, 0, '1 x 16 Pin ', 449, 1305, 84, 16384, 512, 176, 128, 512, 128, 33),
(32, NULL, NULL, '3090Ti', 'Black', 1560, 1890, 1313, '4.0 x16', 384, 24, 3, 314, 137, 65, 460, 850, 1, 3, 0, '1 x 16 Pin ', 212, 635, 41, 10752, 336, 112, 874, 336, 84, 32),
(31, NULL, NULL, '6950XT', 'Black', 2093, 2448, 2250, '4.0 x16', 256, 16, 3, 345, 122, 67, 335, 700, 1, 3, 0, '2 x 8 Pin ', 313, 783, 25, 5120, 320, 128, 80, 0, 80, 31),
(30, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 336, 138, 74, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 30),
(29, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 332, 137, 71, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 29),
(28, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 330, 132, 70, 450, 850, 2, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 28),
(27, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, 322, 136, 63, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 27),
(26, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, 352, 145, 68, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 26),
(25, NULL, NULL, '3090Ti', 'Black', 1560, 1875, 1313, '4.0 x16', 384, 24, 3, 320, 138, 58, 450, 850, 1, 3, 0, '1 x 16 Pin ', 210, 630, 40, 10752, 336, 112, 874, 336, 84, 25),
(24, NULL, NULL, '7900XTX', 'Black', 1855, 2563, 2500, '4.0 x16', 384, 24, 4, 338, 135, 73, 355, 750, 1, 3, 0, '3 x 8 Pin ', 613, 984, 63, 6144, 384, 192, 96, 0, 96, 24),
(23, NULL, NULL, '6950XT', 'Black', 1860, 2324, 2250, '4.0 x16', 256, 16, 3, 320, 135, 58, 335, 700, 1, 2, 0, '2 x 8 Pin  + 1 x 6 Pin', 298, 744, 24, 5120, 320, 128, 80, 0, 80, 23),
(22, NULL, NULL, '3090Ti', 'Black', 1560, 1920, 1313, '4.0 x16', 384, 24, 3, 300, 137, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 215, 645, 41, 10752, 336, 112, 874, 336, 84, 22),
(21, NULL, NULL, '7900XTX', 'Black', 1867, 2617, 2500, '4.0 x16', 384, 24, 3, 330, 140, 58, 355, 750, 1, 3, 0, '3 x 8 Pin ', 626, 1005, 64, 6144, 384, 192, 96, 0, 96, 21),
(20, NULL, NULL, '6950XT', 'Black', 1860, 2454, 2250, '4.0 x16', 256, 16, 3, 325, 140, 55, 335, 700, 1, 2, 0, '3 x 8 Pin ', 314, 785, 25, 5120, 320, 128, 80, 0, 80, 20),
(19, NULL, NULL, '3090Ti', 'Black', 1560, 1890, 1313, '4.0 x16', 384, 24, 3, 322, 132, 62, 450, 850, 1, 3, 0, '1 x 16 Pin ', 212, 635, 41, 10752, 336, 112, 874, 336, 84, 19),
(18, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 2, 287, 135, 51, 355, 750, 1, 2, 1, '2 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 18),
(17, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, NULL, NULL, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 17),
(16, NULL, NULL, '6950XT', 'Black', 2009, 2368, 2250, '4.0 x16', 256, 16, 3, 340, 139, 57, 335, 700, 1, 2, 1, '2 x 8 Pin ', 303, 758, 24, 5120, 320, 128, 80, 0, 80, 16),
(15, NULL, NULL, '3090Ti', 'Black', 1560, 1950, 1313, '4.0 x16', 384, 24, 3, 289, 138, NULL, 450, 850, 1, 3, 0, '2 x 16 Pin ', 218, 655, 42, 10752, 336, 112, 874, 336, 84, 15),
(14, NULL, NULL, '3090Ti', 'Black', 1560, 1920, 1313, '4.0 x16', 384, 24, 3, 343, 145, 68, 480, 850, 1, 3, 0, '1 x 16 Pin ', 215, 645, 41, 10752, 336, 112, 874, 336, 84, 14),
(13, NULL, NULL, '6950XT', 'Black', 2210, 2565, 2250, '4.0 x16', 256, 16, 2, 282, 146, 28, 335, 700, 2, 2, 0, '3 x 8 Pin ', 328, 821, 26, 5120, 320, 128, 80, 0, 80, 13),
(12, NULL, NULL, '4090', 'Black', 2235, 2580, 1313, '4.0 x16', 384, 24, 2, 280, 137, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 454, 1321, 85, 16384, 512, 176, 128, 512, 128, 12),
(11, NULL, NULL, '4090', 'Black', 2235, 2565, 1313, '4.0 x16', 384, 24, 4, 348, 160, 73, 450, 850, 2, 3, 0, '1 x 16 Pin ', 451, 1313, 84, 16384, 512, 176, 128, 512, 128, 11),
(10, NULL, NULL, '3090Ti', 'Black', 1560, 1905, 1313, '4.0 x16', 384, 24, 4, 355, 151, 70, 450, 850, 1, 3, 0, '1 x 16 Pin ', 213, 640, 41, 10752, 336, 112, 874, 336, 84, 10),
(9, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 320, 138, 58, 450, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 9),
(8, NULL, NULL, '3090Ti', 'Black', 1560, 1950, 1313, '4.0 x16', 384, 24, 3, 293, 133, 52, 450, 850, 2, 3, 0, '1 x 16 Pin ', 218, 655, 42, 10752, 336, 112, 874, 336, 84, 8),
(7, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 356, 165, 71, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 7),
(6, NULL, NULL, '3090Ti', 'Black', 1560, 1935, 1313, '4.0 x16', 384, 24, 2, 238, 141, 40, 450, 850, 1, 3, 0, '1 x 16 Pin ', 217, 650, 42, 10752, 336, 112, 874, 336, 84, 6),
(5, NULL, NULL, '7900XTX', 'White', 1855, 2679, 2500, '4.0 x16', 384, 24, 3, 345, 140, 61, 355, 750, 1, 3, 0, '3 x 8 Pin ', 641, 1029, 66, 6144, 384, 192, 96, 0, 96, 5),
(4, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 4, 348, 160, 73, 450, 850, 2, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 4),
(3, NULL, NULL, '7900XTX', 'Black', 1855, 2563, 2500, '4.0 x16', 384, 24, 4, 338, 135, 73, 355, 750, 1, 3, 0, '3 x 8 Pin ', 613, 984, 63, 6144, 384, 192, 96, 0, 96, 3),
(2, NULL, '889523033845', '4090', 'Black', 2235, 2535, 1313, '4.0 x16', 384, 24, 4, 340, 150, 75, 450, 850, 1, 3, 0, '1 x 16 Pin ', 446, 1298, 83, 16384, 512, 176, 128, 512, 128, 2),
(1, NULL, NULL, '3090Ti', 'Black', 1560, 1950, 1313, '4.0 x16', 384, 24, 3, NULL, NULL, NULL, 450, 850, 1, 3, 0, '2 x 16 Pin ', 218, 655, 42, 10752, 336, 112, 874, 336, 84, 1),
(148, NULL, NULL, '6950XT', 'Black', 1860, 2324, 2250, '4.0 x16', 256, 16, 3, 320, 140, 58, 335, 700, 1, 2, 1, '3 x 8 Pin ', 298, 744, 24, 5120, 320, 128, 80, 0, 80, 148),
(149, NULL, NULL, '4090', 'Black', 2235, 2595, 1313, '4.0 x16', 384, 24, 2, 336, 140, 43, 450, 850, 1, 3, 0, '1 x 16 Pin ', 457, 1328, 85, 16384, 512, 176, 128, 512, 128, 149),
(150, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 2, 287, 135, 51, 355, 750, 1, 2, 1, '2 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 150),
(151, NULL, NULL, '4090', 'Black', 2235, 2610, 1313, '4.0 x16', 384, 24, 3, 344, 148, 71, 450, 850, 1, 3, 0, '1 x 16 Pin ', 459, 1336, 86, 16384, 512, 176, 128, 512, 128, 151),
(152, NULL, NULL, '4090', 'Black', 2235, 2595, 1313, '4.0 x16', 384, 24, 4, 337, 140, 77, 450, 850, 1, 3, 0, '1 x 16 Pin ', 457, 1328, 85, 16384, 512, 176, 128, 512, 128, 152),
(153, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, NULL, 137, 61, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 153),
(154, NULL, NULL, '4090', 'Black', 2235, 2595, 1313, '4.0 x16', 384, 24, 4, 344, 144, 77, 550, 950, 1, 3, 0, '2 x 16 Pin ', 457, 1328, 85, 16384, 512, 176, 128, 512, 128, 154),
(155, NULL, NULL, '3090Ti', 'Black', 1560, 1920, 1313, '4.0 x16', 384, 24, 3, 338, 140, 71, 450, 850, 1, 3, 0, '1 x 16 Pin ', 215, 645, 41, 10752, 336, 112, 874, 336, 84, 155),
(156, NULL, NULL, '3090Ti', 'Black', 1560, 1965, 1313, '4.0 x16', 384, 24, 3, 343, 145, 68, 480, 850, 1, 3, 0, '2 x 16 Pin ', 220, 660, 42, 10752, 336, 112, 874, 336, 84, 156),
(157, NULL, NULL, '7900XTX', 'Black', 1867, 2617, 2500, '4.0 x16', 384, 24, 2, 288, 163, 28, 355, 750, 1, 3, 0, '3 x 8 Pin ', 626, 1005, 64, 6144, 384, 192, 96, 0, 96, 157),
(158, NULL, NULL, '6950XT', 'Black', 1860, 2532, 2250, '4.0 x16', 256, 16, 2, 270, 130, 45, 335, 700, 1, 2, 0, '2 x 8 Pin  + 1 x 6 Pin', 324, 810, 26, 5120, 320, 128, 80, 0, 80, 158),
(159, NULL, NULL, '4090', 'Black', 2235, 2595, 1313, '4.0 x16', 384, 24, 4, 344, 144, 77, 550, 950, 1, 3, 0, '2 x 16 Pin ', 457, 1328, 85, 16384, 512, 176, 128, 512, 128, 159),
(160, NULL, NULL, '3090Ti', 'Black', 1560, 1890, 1313, '4.0 x16', 384, 24, 3, 314, 137, NULL, 450, 850, 1, 3, 0, '1 x 16 Pin ', 212, 635, 41, 10752, 336, 112, 874, 336, 84, 160),
(161, NULL, NULL, '4090', 'White', 2235, 2610, 1313, '4.0 x16', 384, 24, 4, 358, 149, 70, 450, 850, 2, 3, 0, '1 x 16 Pin ', 459, 1336, 86, 16384, 512, 176, 128, 512, 128, 161),
(162, NULL, NULL, '3090Ti', 'Black', 1560, 1890, 1313, '4.0 x16', 384, 24, 3, 356, 150, 64, 450, 850, 1, 3, 0, '1 x 16 Pin ', 212, 635, 41, 10752, 336, 112, 874, 336, 84, 162),
(163, NULL, NULL, '4090', 'Black', 2235, 2520, 1313, '4.0 x16', 384, 24, 3, 340, 143, 59, 450, 850, 1, 3, 0, '1 x 16 Pin ', 444, 1290, 83, 16384, 512, 176, 128, 512, 128, 163),
(164, NULL, NULL, '4090', 'Black', 2235, 2610, 1313, '4.0 x16', 384, 24, 3, 344, 148, 71, 490, 850, 1, 3, 0, '1 x 16 Pin ', 459, 1336, 86, 16384, 512, 176, 128, 512, 128, 164),
(165, NULL, NULL, '3090Ti', 'Black', 1560, 1860, 1313, '4.0 x16', 384, 24, 3, 327, 139, 60, 450, 850, 1, 3, 0, '1 x 16 Pin ', 208, 625, 40, 10752, 336, 112, 874, 336, 84, 165),
(166, NULL, NULL, '7900XTX', 'Black', 1855, 2499, 2500, '4.0 x16', 384, 24, 4, 353, 158, 73, 355, 750, 1, 3, 0, '3 x 8 Pin ', 598, 960, 61, 6144, 384, 192, 96, 0, 96, 166),
(167, NULL, NULL, '7900XTX', 'Black', 1855, 2679, 2500, '4.0 x16', 384, 24, 4, 355, 137, 69, 355, 750, 2, 2, 0, '3 x 8 Pin ', 641, 1029, 66, 6144, 384, 192, 96, 0, 96, 167);

-- --------------------------------------------------------

--
-- Table structure for table `historique_prix`
--

DROP TABLE IF EXISTS `historique_prix`;
CREATE TABLE IF NOT EXISTS `historique_prix` (
  `Id_historique_prix` int NOT NULL AUTO_INCREMENT,
  `price` int DEFAULT NULL,
  `_date` date DEFAULT NULL,
  PRIMARY KEY (`Id_historique_prix`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `Id_image` int NOT NULL AUTO_INCREMENT,
  `img_src` varchar(255) DEFAULT NULL,
  `img_alt` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `modifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `modifiedAt` date DEFAULT NULL,
  PRIMARY KEY (`Id_image`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `image_comment`
--

DROP TABLE IF EXISTS `image_comment`;
CREATE TABLE IF NOT EXISTS `image_comment` (
  `Id_image` int NOT NULL,
  `Id_comment` int NOT NULL,
  PRIMARY KEY (`Id_image`),
  KEY `Id_comment` (`Id_comment`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `mb`
--

DROP TABLE IF EXISTS `mb`;
CREATE TABLE IF NOT EXISTS `mb` (
  `Id_mb` int NOT NULL AUTO_INCREMENT,
  `Id_article` int DEFAULT NULL,
  PRIMARY KEY (`Id_mb`),
  KEY `Id_article` (`Id_article`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
CREATE TABLE IF NOT EXISTS `model` (
  `Id_model` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `Id_category` int DEFAULT NULL,
  PRIMARY KEY (`Id_model`),
  KEY `Id_category` (`Id_category`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `model`
--

INSERT INTO `model` (`Id_model`, `name`, `Id_category`) VALUES
(1, 'RTX 4000', 1),
(2, 'RTX 3000', 1),
(3, 'RX 7000', 1),
(4, 'RX 6000', 1),
(5, 'AMD RYZEN 7', 2),
(6, 'AMD RYZEN 5', 2),
(7, 'AMD RYZEN 3', 2),
(8, 'Intel Core i9', 2),
(9, 'Intel Core i7', 2),
(10, 'Intel Core i5', 2),
(11, 'Intel Core i3', 2);

-- --------------------------------------------------------

--
-- Table structure for table `ram`
--

DROP TABLE IF EXISTS `ram`;
CREATE TABLE IF NOT EXISTS `ram` (
  `Id_ram` int NOT NULL AUTO_INCREMENT,
  `Id_article` int DEFAULT NULL,
  PRIMARY KEY (`Id_ram`),
  KEY `Id_article` (`Id_article`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `Id_role` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_role`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

DROP TABLE IF EXISTS `seller`;
CREATE TABLE IF NOT EXISTS `seller` (
  `Id_seller` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `img_src` varchar(255) DEFAULT NULL,
  `img_alt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_seller`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `seller_historique_article`
--

DROP TABLE IF EXISTS `seller_historique_article`;
CREATE TABLE IF NOT EXISTS `seller_historique_article` (
  `Id_article` int NOT NULL,
  `Id_seller` int NOT NULL,
  `Id_historique_prix` int NOT NULL,
  PRIMARY KEY (`Id_article`,`Id_seller`,`Id_historique_prix`),
  KEY `Id_seller` (`Id_seller`),
  KEY `Id_historique_prix` (`Id_historique_prix`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
