-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2024 at 01:31 PM
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
  `receiving_supply_have_price` tinyint(1) NOT NULL,
  `receiving_supply_received_id` varchar(20) NOT NULL,
  `receiving_supply_product_id` varchar(20) NOT NULL,
  `receiving_supply_barcode` varchar(100) NOT NULL,
  `receiving_supply_supplier_id` varchar(20) NOT NULL,
  `receiving_supply_unit_id` varchar(20) NOT NULL,
  `receiving_supply_quantity` varchar(20) NOT NULL,
  `receiving_supply_whole_sale_quantity` varchar(20) NOT NULL,
  `receiving_supply_price` varchar(20) NOT NULL,
  `receiving_supply_amount` varchar(30) NOT NULL,
  `receiving_supply_expiration_date` varchar(20) NOT NULL,
  `receiving_supply_defective_product_qty` varchar(20) NOT NULL,
  `receiving_supply_defective_remarks` text NOT NULL,
  `receiving_supply_datetime` varchar(20) NOT NULL,
  `receiving_supply_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_receiving_supply`
--

INSERT INTO `sccv2_receiving_supply` (`receiving_supply_aid`, `receiving_supply_is_active`, `receiving_supply_have_price`, `receiving_supply_received_id`, `receiving_supply_product_id`, `receiving_supply_barcode`, `receiving_supply_supplier_id`, `receiving_supply_unit_id`, `receiving_supply_quantity`, `receiving_supply_whole_sale_quantity`, `receiving_supply_price`, `receiving_supply_amount`, `receiving_supply_expiration_date`, `receiving_supply_defective_product_qty`, `receiving_supply_defective_remarks`, `receiving_supply_datetime`, `receiving_supply_created`) VALUES
(2, 1, 1, '1', '1', '', '2', '1', '100', '', '10', '1000', '', '0', '', '', '2024-09-13 09:42:47'),
(3, 1, 1, '1', '2', '', '2', '1', '50', '', '12', '600', '', '0', '', '2024-09-17 12:57:04', '2024-09-13 10:06:15'),
(4, 1, 1, '1', '2', '', '2', '1', '50', '', '12', '600', '', '6', '', '2024-09-17 12:57:59', '2024-09-13 10:06:18'),
(5, 1, 0, '2', '1', '', '2', '1', '1', '', '20', '20', '', '0', '', '2024-09-18 15:21:18', '2024-09-18 15:21:18'),
(6, 1, 0, '3', '1', '', '2', '2', '20', '', '200', '4000', '', '0', '', '2024-09-20 08:49:39', '2024-09-20 08:49:39'),
(7, 1, 0, '3', '1', '', '2', '2', '20', '', '200', '4000', '', '0', '', '2024-09-20 08:49:42', '2024-09-20 08:49:42'),
(8, 1, 0, '3', '1', '', '2', '2', '20', '', '200', '4000', '', '0', '', '2024-09-20 08:49:46', '2024-09-20 08:49:46'),
(9, 1, 0, '3', '1', '', '2', '2', '20', '', '200', '4000', '', '0', '', '2024-09-20 08:49:46', '2024-09-20 08:49:46'),
(12, 1, 0, '3', '1', '', '2', '2', '2', '', '2', '4', '', '0', '', '2024-09-20 08:55:46', '2024-09-20 08:55:46'),
(13, 1, 0, '3', '1', '', '2', '2', '2', '', '2', '4', '', '0', '', '2024-09-20 08:55:47', '2024-09-20 08:55:47'),
(15, 1, 0, '3', '1', '', '2', '2', '1', '', '2', '2', '', '0', '', '2024-09-20 14:06:41', '2024-09-20 08:55:48'),
(16, 1, 0, '3', '1', '', '2', '2', '2', '', '2', '4', '', '0', '', '2024-09-20 08:55:48', '2024-09-20 08:55:48'),
(19, 1, 1, '2', '2', '2325698', '2', '1', '100', '', '20', '2000', '', '0', '', '2024-09-20 09:22:44', '2024-09-20 09:20:12'),
(20, 1, 0, '3', '1', '', '2', '1', '2', '', '20', '40', '', '0', '', '2024-10-01 19:16:23', '2024-10-01 19:16:23'),
(21, 1, 0, '3', '1', '321408963', '2', '1', '2', '', '20', '40', '', '0', '', '2024-10-01 19:20:25', '2024-10-01 19:20:25'),
(22, 1, 0, '3', '1', '391917237', '2', '1', '2', '', '20', '40', '', '0', '', '2024-10-01 19:20:28', '2024-10-01 19:20:28'),
(23, 1, 0, '3', '1', '3479612', '2', '1', '2', '', '20', '40', '', '0', '', '2024-10-01 19:23:48', '2024-10-01 19:23:48'),
(24, 1, 0, '3', '1', '123123', '2', '1', '2', '', '20', '40', '', '0', '', '2024-10-01 19:26:11', '2024-10-01 19:26:11');

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
  MODIFY `receiving_supply_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
