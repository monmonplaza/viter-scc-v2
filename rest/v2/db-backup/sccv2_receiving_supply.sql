-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2024 at 06:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scc_v2`
--

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_receiving_supply`
--

CREATE TABLE `sccv2_receiving_supply` (
  `receiving_supply_aid` int(11) NOT NULL,
  `receiving_supply_is_active` tinyint(1) NOT NULL,
  `receiving_supply_received_id` int(11) NOT NULL,
  `receiving_supply_product_id` int(11) NOT NULL,
  `receiving_supply_barcode` varchar(100) NOT NULL,
  `receiving_supply_supplier_id` int(11) NOT NULL,
  `receiving_supply_unit_id` varchar(20) NOT NULL,
  `receiving_supply_quantity` int(20) NOT NULL,
  `receiving_supply_price` varchar(20) NOT NULL,
  `receiving_supply_amount` varchar(30) NOT NULL,
  `receiving_supply_expiration_date` varchar(20) NOT NULL,
  `receiving_supply_defective_product_qty` varchar(20) NOT NULL,
  `receiving_supply_datetime` varchar(20) NOT NULL,
  `receiving_supply_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_receiving_supply`
--

INSERT INTO `sccv2_receiving_supply` (`receiving_supply_aid`, `receiving_supply_is_active`, `receiving_supply_received_id`, `receiving_supply_product_id`, `receiving_supply_barcode`, `receiving_supply_supplier_id`, `receiving_supply_unit_id`, `receiving_supply_quantity`, `receiving_supply_price`, `receiving_supply_amount`, `receiving_supply_expiration_date`, `receiving_supply_defective_product_qty`, `receiving_supply_datetime`, `receiving_supply_created`) VALUES
(1, 1, 1, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 09:40:09', '2024-08-28 08:49:07'),
(4, 1, 1, 2, '', 1, '2', 200, '1', '200', '', '', '2024-08-28 09:47:05', '2024-08-28 09:47:05'),
(5, 1, 1, 2, '', 1, '2', 200, '1', '200', '', '', '2024-08-28 09:47:37', '2024-08-28 09:47:37'),
(6, 1, 1, 2, '', 1, '2', 200, '1', '200', '', '', '2024-08-28 09:47:45', '2024-08-28 09:47:45'),
(7, 1, 1, 2, '', 1, '2', 200, '1', '200', '', '', '2024-08-28 09:48:08', '2024-08-28 09:48:08'),
(8, 1, 1, 2, '', 1, '1', 2000, '1', '2000', '', '', '2024-08-28 09:48:23', '2024-08-28 09:48:23'),
(9, 1, 1, 2, '', 1, '1', 200, '2', '400', '', '', '2024-08-28 09:52:50', '2024-08-28 09:52:50'),
(10, 1, 2, 2, '', 2, '1', 500, '20', '10000', '', '', '2024-08-28 09:54:53', '2024-08-28 09:54:53'),
(11, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '', '2024-08-28 09:57:57', '2024-08-28 09:57:57'),
(12, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '', '2024-08-28 09:58:15', '2024-08-28 09:58:15'),
(13, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '', '2024-08-28 09:58:15', '2024-08-28 09:58:15'),
(14, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '', '2024-08-28 09:58:16', '2024-08-28 09:58:16'),
(15, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '', '2024-08-28 09:58:16', '2024-08-28 09:58:16'),
(16, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '', '2024-08-28 09:58:16', '2024-08-28 09:58:16'),
(17, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '', '2024-08-28 09:58:16', '2024-08-28 09:58:16'),
(18, 1, 3, 2, '', 2, '1', 60, '10', '600', '', '', '2024-08-28 09:58:37', '2024-08-28 09:58:37'),
(19, 1, 3, 2, '', 2, '1', 60, '10', '600', '', '', '2024-08-28 09:59:51', '2024-08-28 09:59:51'),
(20, 1, 3, 2, '', 2, '1', 60, '10', '600', '', '', '2024-08-28 10:00:34', '2024-08-28 10:00:34'),
(21, 1, 3, 2, '', 2, '1', 60, '10', '600', '', '', '2024-08-28 10:00:36', '2024-08-28 10:00:36'),
(22, 1, 3, 2, '', 2, '1', 60, '10', '600', '', '', '2024-08-28 10:00:38', '2024-08-28 10:00:38'),
(23, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '', '2024-08-28 10:00:40', '2024-08-28 10:00:40'),
(25, 1, 1, 1, '', 1, '1', 10, '20', '200', '', '', '2024-08-28 10:02:48', '2024-08-28 10:02:48'),
(29, 1, 4, 1, '', 1, '2', 3000, '3', '9000', '', '', '2024-08-28 10:33:00', '2024-08-28 10:33:00'),
(30, 1, 5, 1, '', 2, '2', 900, '1', '900', '', '', '2024-08-28 10:33:32', '2024-08-28 10:33:32'),
(31, 1, 6, 1, '', 1, '2', 500, '18', '9000', '', '', '2024-08-28 10:34:56', '2024-08-28 10:34:56'),
(32, 1, 6, 1, '', 1, '2', 100, '10', '1000', '', '', '2024-08-28 10:35:29', '2024-08-28 10:35:29'),
(34, 1, 6, 2, '', 1, '2', 100, '10', '1000', '', '', '2024-08-28 10:36:13', '2024-08-28 10:36:13'),
(35, 1, 7, 2, '', 2, '1', 100, '10', '1000', '', '', '2024-08-28 13:05:55', '2024-08-28 10:57:38'),
(36, 1, 8, 1, '', 2, '2', 100, '10', '1000', '', '', '2024-08-28 12:15:11', '2024-08-28 12:15:11'),
(37, 1, 8, 1, '', 2, '2', 100, '10', '1000', '', '', '2024-08-28 12:15:15', '2024-08-28 12:15:15'),
(38, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:16', '2024-08-28 13:06:16'),
(39, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:17', '2024-08-28 13:06:17'),
(40, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:17', '2024-08-28 13:06:17'),
(41, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:18', '2024-08-28 13:06:18'),
(42, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:19', '2024-08-28 13:06:19'),
(43, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:19', '2024-08-28 13:06:19'),
(44, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:20', '2024-08-28 13:06:20'),
(45, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:20', '2024-08-28 13:06:20'),
(46, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:21', '2024-08-28 13:06:21'),
(47, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:21', '2024-08-28 13:06:21'),
(48, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:22', '2024-08-28 13:06:22'),
(49, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:23', '2024-08-28 13:06:23'),
(50, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:23', '2024-08-28 13:06:23'),
(51, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:24', '2024-08-28 13:06:24'),
(52, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:26', '2024-08-28 13:06:26'),
(53, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:26', '2024-08-28 13:06:26'),
(54, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:27', '2024-08-28 13:06:27'),
(55, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:27', '2024-08-28 13:06:27'),
(56, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:27', '2024-08-28 13:06:27'),
(57, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(58, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(59, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(60, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(61, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(62, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(63, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(64, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(65, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(66, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(67, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(68, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(69, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(70, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:30', '2024-08-28 13:06:30'),
(71, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:30', '2024-08-28 13:06:30'),
(72, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:30', '2024-08-28 13:06:30'),
(73, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:30', '2024-08-28 13:06:30'),
(74, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-28 13:06:36', '2024-08-28 13:06:36'),
(75, 1, 7, 1, '123456789', 2, '1', 10, '20', '200', '2024-08-28', '', '2024-08-28 14:06:19', '2024-08-28 13:06:38'),
(76, 1, 7, 2, '1236547890', 2, '1', 100, '20', '2000', '2024-08-28', '', '2024-08-28 14:26:50', '2024-08-28 13:06:39'),
(77, 1, 7, 2, '12345678900', 1, '1', 20, '10', '200', '', '', '2024-08-28 14:29:41', '2024-08-28 14:13:58'),
(78, 1, 7, 3, '1234567890', 2, '2', 10, '12', '120', '', '', '2024-08-28 14:29:29', '2024-08-28 14:29:16'),
(79, 1, 9, 3, '12', 2, '2', 10, '20', '200', '2024-08-22', '', '2024-08-29 08:42:16', '2024-08-29 08:32:01'),
(80, 1, 9, 1, '12345654123', 1, '1', 10, '50', '500', '2024-08-20', '2', '2024-08-29 12:21:21', '2024-08-29 08:37:48'),
(81, 1, 9, 1, '1', 2, '2', 1000, '130', '130000', '', '', '2024-08-29 08:38:31', '2024-08-29 08:38:31'),
(82, 1, 9, 1, '', 2, '2', 1000, '130', '130000', '', '', '2024-08-29 08:38:38', '2024-08-29 08:38:38'),
(83, 1, 9, 1, '', 2, '2', 1000, '130', '130000', '', '', '2024-08-29 08:38:41', '2024-08-29 08:38:41'),
(84, 1, 9, 3, '', 2, '1', 10, '23', '230', '', '', '2024-08-29 08:41:17', '2024-08-29 08:41:17'),
(85, 1, 9, 1, '', 2, '1', 10, '20', '200', '', '', '2024-08-29 08:41:31', '2024-08-29 08:41:31'),
(86, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:31', '2024-08-29 10:16:31'),
(87, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:32', '2024-08-29 10:16:32'),
(88, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:33', '2024-08-29 10:16:33'),
(89, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:34', '2024-08-29 10:16:34'),
(90, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:35', '2024-08-29 10:16:35'),
(91, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:35', '2024-08-29 10:16:35'),
(92, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:36', '2024-08-29 10:16:36'),
(93, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:44:23', '2024-08-29 10:16:37'),
(94, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:46', '2024-08-29 10:16:46'),
(95, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:47', '2024-08-29 10:16:47'),
(96, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:48', '2024-08-29 10:16:48'),
(97, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:48', '2024-08-29 10:16:48'),
(98, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:48', '2024-08-29 10:16:48'),
(99, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:48', '2024-08-29 10:16:48'),
(100, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:49', '2024-08-29 10:16:49'),
(101, 1, 9, 3, '', 2, '1', 1, '10', '10', '', '60', '2024-08-29 10:49:54', '2024-08-29 10:16:49'),
(102, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:49', '2024-08-29 10:16:49'),
(103, 1, 9, 3, '', 2, '1', 1, '1', '1', '', '', '2024-08-29 10:16:49', '2024-08-29 10:16:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_receiving_supply`
--
ALTER TABLE `sccv2_receiving_supply`
  ADD PRIMARY KEY (`receiving_supply_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_receiving_supply`
--
ALTER TABLE `sccv2_receiving_supply`
  MODIFY `receiving_supply_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
