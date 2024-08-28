-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2024 at 08:52 AM
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
-- Table structure for table `sccv2_category`
--

CREATE TABLE `sccv2_category` (
  `category_aid` int(11) NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `category_description` text NOT NULL,
  `category_is_active` tinyint(1) NOT NULL,
  `category_datetime` varchar(20) NOT NULL,
  `category_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_category`
--

INSERT INTO `sccv2_category` (`category_aid`, `category_name`, `category_description`, `category_is_active`, `category_datetime`, `category_created`) VALUES
(1, 'vvvv', 'zxczxczxc', 1, '', '2024-08-23 09:59:31'),
(3, 'Dairy', 'Dairy Products', 1, '2024-08-23 14:23:02', '2024-08-23 10:02:10');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_product`
--

CREATE TABLE `sccv2_product` (
  `product_aid` int(11) NOT NULL,
  `product_is_active` tinyint(1) NOT NULL,
  `product_category_id` varchar(20) NOT NULL,
  `product_sku` varchar(20) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_description` text NOT NULL,
  `product_barcode` varchar(20) NOT NULL,
  `product_datetime` varchar(20) NOT NULL,
  `product_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_product`
--

INSERT INTO `sccv2_product` (`product_aid`, `product_is_active`, `product_category_id`, `product_sku`, `product_name`, `product_description`, `product_barcode`, `product_datetime`, `product_created`) VALUES
(1, 1, '3', '67559621', 'Egg', 'Chicken egg', '', '2024-08-27 12:55:06', '2024-08-27 12:55:06'),
(2, 1, '1', '53103642', 'Lucky me canton', 'Lucky me canton', '', '2024-08-27 12:55:30', '2024-08-27 12:55:30'),
(3, 1, '3', '78347313', 'Ballpen', 'This is Ballpen', '', '2024-08-28 14:28:57', '2024-08-28 14:28:57');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_receiving`
--

CREATE TABLE `sccv2_receiving` (
  `receiving_aid` int(11) NOT NULL,
  `receiving_date` varchar(20) NOT NULL,
  `receiving_reference_no` varchar(50) NOT NULL,
  `receiving_total_amount` varchar(20) NOT NULL,
  `receiving_is_active` tinyint(1) NOT NULL,
  `receiving_is_new_data` tinyint(1) NOT NULL,
  `receiving_datetime` varchar(20) NOT NULL,
  `receiving_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_receiving`
--

INSERT INTO `sccv2_receiving` (`receiving_aid`, `receiving_date`, `receiving_reference_no`, `receiving_total_amount`, `receiving_is_active`, `receiving_is_new_data`, `receiving_datetime`, `receiving_created`) VALUES
(1, '2024-08-26', '2861-416-716', '4240', 1, 0, '2024-08-28 10:02:48', '2024-08-28 08:49:07'),
(2, '2024-08-02', '7830-623-942', '', 1, 0, '2024-08-28 09:54:53', '2024-08-28 09:54:53'),
(3, '2024-08-03', '2419-935-988', '600', 1, 0, '2024-08-28 10:00:40', '2024-08-28 09:57:57'),
(4, '2024-08-09', '2696-745-94', '9000', 1, 0, '2024-08-28 10:33:00', '2024-08-28 10:31:01'),
(5, '2024-08-29', '4979-658-384', '', 1, 0, '2024-08-28 10:33:32', '2024-08-28 10:33:32'),
(6, '2024-08-19', '6805-166-792', '12000', 1, 0, '2024-08-28 10:36:13', '2024-08-28 10:34:56'),
(7, '2024-08-01', '6653-270-543', '10920', 1, 0, '2024-08-28 14:29:41', '2024-08-28 10:57:38'),
(8, '2024-08-20', '4417-881-544', '2000', 1, 0, '2024-08-28 12:15:15', '2024-08-28 12:15:11');

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
  `receiving_supply_datetime` varchar(20) NOT NULL,
  `receiving_supply_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_receiving_supply`
--

INSERT INTO `sccv2_receiving_supply` (`receiving_supply_aid`, `receiving_supply_is_active`, `receiving_supply_received_id`, `receiving_supply_product_id`, `receiving_supply_barcode`, `receiving_supply_supplier_id`, `receiving_supply_unit_id`, `receiving_supply_quantity`, `receiving_supply_price`, `receiving_supply_amount`, `receiving_supply_expiration_date`, `receiving_supply_datetime`, `receiving_supply_created`) VALUES
(1, 1, 1, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 09:40:09', '2024-08-28 08:49:07'),
(4, 1, 1, 2, '', 1, '2', 200, '1', '200', '', '2024-08-28 09:47:05', '2024-08-28 09:47:05'),
(5, 1, 1, 2, '', 1, '2', 200, '1', '200', '', '2024-08-28 09:47:37', '2024-08-28 09:47:37'),
(6, 1, 1, 2, '', 1, '2', 200, '1', '200', '', '2024-08-28 09:47:45', '2024-08-28 09:47:45'),
(7, 1, 1, 2, '', 1, '2', 200, '1', '200', '', '2024-08-28 09:48:08', '2024-08-28 09:48:08'),
(8, 1, 1, 2, '', 1, '1', 2000, '1', '2000', '', '2024-08-28 09:48:23', '2024-08-28 09:48:23'),
(9, 1, 1, 2, '', 1, '1', 200, '2', '400', '', '2024-08-28 09:52:50', '2024-08-28 09:52:50'),
(10, 1, 2, 2, '', 2, '1', 500, '20', '10000', '', '2024-08-28 09:54:53', '2024-08-28 09:54:53'),
(11, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '2024-08-28 09:57:57', '2024-08-28 09:57:57'),
(12, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '2024-08-28 09:58:15', '2024-08-28 09:58:15'),
(13, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '2024-08-28 09:58:15', '2024-08-28 09:58:15'),
(14, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '2024-08-28 09:58:16', '2024-08-28 09:58:16'),
(15, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '2024-08-28 09:58:16', '2024-08-28 09:58:16'),
(16, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '2024-08-28 09:58:16', '2024-08-28 09:58:16'),
(17, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '2024-08-28 09:58:16', '2024-08-28 09:58:16'),
(18, 1, 3, 2, '', 2, '1', 60, '10', '600', '', '2024-08-28 09:58:37', '2024-08-28 09:58:37'),
(19, 1, 3, 2, '', 2, '1', 60, '10', '600', '', '2024-08-28 09:59:51', '2024-08-28 09:59:51'),
(20, 1, 3, 2, '', 2, '1', 60, '10', '600', '', '2024-08-28 10:00:34', '2024-08-28 10:00:34'),
(21, 1, 3, 2, '', 2, '1', 60, '10', '600', '', '2024-08-28 10:00:36', '2024-08-28 10:00:36'),
(22, 1, 3, 2, '', 2, '1', 60, '10', '600', '', '2024-08-28 10:00:38', '2024-08-28 10:00:38'),
(23, 1, 3, 2, '', 2, '2', 60, '10', '600', '', '2024-08-28 10:00:40', '2024-08-28 10:00:40'),
(25, 1, 1, 1, '', 1, '1', 10, '20', '200', '', '2024-08-28 10:02:48', '2024-08-28 10:02:48'),
(29, 1, 4, 1, '', 1, '2', 3000, '3', '9000', '', '2024-08-28 10:33:00', '2024-08-28 10:33:00'),
(30, 1, 5, 1, '', 2, '2', 900, '1', '900', '', '2024-08-28 10:33:32', '2024-08-28 10:33:32'),
(31, 1, 6, 1, '', 1, '2', 500, '18', '9000', '', '2024-08-28 10:34:56', '2024-08-28 10:34:56'),
(32, 1, 6, 1, '', 1, '2', 100, '10', '1000', '', '2024-08-28 10:35:29', '2024-08-28 10:35:29'),
(34, 1, 6, 2, '', 1, '2', 100, '10', '1000', '', '2024-08-28 10:36:13', '2024-08-28 10:36:13'),
(35, 1, 7, 2, '', 2, '1', 100, '10', '1000', '', '2024-08-28 13:05:55', '2024-08-28 10:57:38'),
(36, 1, 8, 1, '', 2, '2', 100, '10', '1000', '', '2024-08-28 12:15:11', '2024-08-28 12:15:11'),
(37, 1, 8, 1, '', 2, '2', 100, '10', '1000', '', '2024-08-28 12:15:15', '2024-08-28 12:15:15'),
(38, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:16', '2024-08-28 13:06:16'),
(39, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:17', '2024-08-28 13:06:17'),
(40, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:17', '2024-08-28 13:06:17'),
(41, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:18', '2024-08-28 13:06:18'),
(42, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:19', '2024-08-28 13:06:19'),
(43, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:19', '2024-08-28 13:06:19'),
(44, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:20', '2024-08-28 13:06:20'),
(45, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:20', '2024-08-28 13:06:20'),
(46, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:21', '2024-08-28 13:06:21'),
(47, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:21', '2024-08-28 13:06:21'),
(48, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:22', '2024-08-28 13:06:22'),
(49, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:23', '2024-08-28 13:06:23'),
(50, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:23', '2024-08-28 13:06:23'),
(51, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:24', '2024-08-28 13:06:24'),
(52, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:26', '2024-08-28 13:06:26'),
(53, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:26', '2024-08-28 13:06:26'),
(54, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:27', '2024-08-28 13:06:27'),
(55, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:27', '2024-08-28 13:06:27'),
(56, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:27', '2024-08-28 13:06:27'),
(57, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(58, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(59, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(60, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(61, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(62, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:28', '2024-08-28 13:06:28'),
(63, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(64, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(65, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(66, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(67, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(68, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(69, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:29', '2024-08-28 13:06:29'),
(70, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:30', '2024-08-28 13:06:30'),
(71, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:30', '2024-08-28 13:06:30'),
(72, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:30', '2024-08-28 13:06:30'),
(73, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:30', '2024-08-28 13:06:30'),
(74, 1, 7, 1, '', 2, '1', 10, '20', '200', '', '2024-08-28 13:06:36', '2024-08-28 13:06:36'),
(75, 1, 7, 1, '123456789', 2, '1', 10, '20', '200', '2024-08-28', '2024-08-28 14:06:19', '2024-08-28 13:06:38'),
(76, 1, 7, 2, '1236547890', 2, '1', 100, '20', '2000', '2024-08-28', '2024-08-28 14:26:50', '2024-08-28 13:06:39'),
(77, 1, 7, 2, '12345678900', 1, '1', 20, '10', '200', '', '2024-08-28 14:29:41', '2024-08-28 14:13:58'),
(78, 1, 7, 3, '1234567890', 2, '2', 10, '12', '120', '', '2024-08-28 14:29:29', '2024-08-28 14:29:16');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_settings_unit`
--

CREATE TABLE `sccv2_settings_unit` (
  `settings_unit_aid` int(11) NOT NULL,
  `settings_unit_is_active` tinyint(1) NOT NULL,
  `settings_unit_name` varchar(200) NOT NULL,
  `settings_unit_created` datetime NOT NULL,
  `settings_unit_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_settings_unit`
--

INSERT INTO `sccv2_settings_unit` (`settings_unit_aid`, `settings_unit_is_active`, `settings_unit_name`, `settings_unit_created`, `settings_unit_updated`) VALUES
(1, 1, 'test', '2024-08-27 14:52:04', '2024-08-27 15:01:01'),
(2, 1, 'data test', '2024-08-27 15:01:31', '2024-08-27 15:01:45');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_supplier`
--

CREATE TABLE `sccv2_supplier` (
  `supplier_aid` int(11) NOT NULL,
  `supplier_name` varchar(30) NOT NULL,
  `supplier_representative` varchar(30) NOT NULL,
  `supplier_representative_phone` varchar(20) NOT NULL,
  `supplier_phone` varchar(20) NOT NULL,
  `supplier_address` text NOT NULL,
  `supplier_email` varchar(50) NOT NULL,
  `supplier_is_active` tinyint(1) NOT NULL,
  `supplier_datetime` varchar(20) NOT NULL,
  `supplier_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_supplier`
--

INSERT INTO `sccv2_supplier` (`supplier_aid`, `supplier_name`, `supplier_representative`, `supplier_representative_phone`, `supplier_phone`, `supplier_address`, `supplier_email`, `supplier_is_active`, `supplier_datetime`, `supplier_created`) VALUES
(1, 'xx', 'xxx', 'xxx', 'xxx', 'xx', 'xxx@sasdas.com', 0, '', '2024-08-23 12:46:25'),
(2, 'Amazing Chuchu', 'Ramon Plaza', '092122232321', '09221222212', '214 Purok 5 Barangay Sta Ana San Pablo City', 'ramon.plaza@frontlibusiness.com.ph', 1, '2024-08-23 12:53:54', '2024-08-23 12:53:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_category`
--
ALTER TABLE `sccv2_category`
  ADD PRIMARY KEY (`category_aid`);

--
-- Indexes for table `sccv2_product`
--
ALTER TABLE `sccv2_product`
  ADD PRIMARY KEY (`product_aid`);

--
-- Indexes for table `sccv2_receiving`
--
ALTER TABLE `sccv2_receiving`
  ADD PRIMARY KEY (`receiving_aid`);

--
-- Indexes for table `sccv2_receiving_supply`
--
ALTER TABLE `sccv2_receiving_supply`
  ADD PRIMARY KEY (`receiving_supply_aid`);

--
-- Indexes for table `sccv2_settings_unit`
--
ALTER TABLE `sccv2_settings_unit`
  ADD PRIMARY KEY (`settings_unit_aid`);

--
-- Indexes for table `sccv2_supplier`
--
ALTER TABLE `sccv2_supplier`
  ADD PRIMARY KEY (`supplier_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_category`
--
ALTER TABLE `sccv2_category`
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sccv2_product`
--
ALTER TABLE `sccv2_product`
  MODIFY `product_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sccv2_receiving`
--
ALTER TABLE `sccv2_receiving`
  MODIFY `receiving_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sccv2_receiving_supply`
--
ALTER TABLE `sccv2_receiving_supply`
  MODIFY `receiving_supply_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `sccv2_settings_unit`
--
ALTER TABLE `sccv2_settings_unit`
  MODIFY `settings_unit_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv2_supplier`
--
ALTER TABLE `sccv2_supplier`
  MODIFY `supplier_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
