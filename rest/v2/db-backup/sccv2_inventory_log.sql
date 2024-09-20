-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2024 at 09:31 AM
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
-- Table structure for table `sccv2_inventory_log`
--

CREATE TABLE `sccv2_inventory_log` (
  `inventory_log_aid` int(11) NOT NULL,
  `inventory_log_product_id` varchar(20) NOT NULL,
  `inventory_log_available_stock` varchar(20) NOT NULL,
  `inventory_log_stock_in` varchar(20) NOT NULL,
  `inventory_log_stock_out` varchar(20) NOT NULL,
  `inventory_log_defective_product` varchar(20) NOT NULL,
  `inventory_log_return_product` varchar(20) NOT NULL,
  `inventory_log_created` datetime NOT NULL,
  `inventory_log_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_inventory_log`
--

INSERT INTO `sccv2_inventory_log` (`inventory_log_aid`, `inventory_log_product_id`, `inventory_log_available_stock`, `inventory_log_stock_in`, `inventory_log_stock_out`, `inventory_log_defective_product`, `inventory_log_return_product`, `inventory_log_created`, `inventory_log_updated`) VALUES
(1, '1', '', '190', '15', '', '0', '2024-09-13 08:16:51', '0000-00-00 00:00:00'),
(2, '2', '', '200', '15', '6', '', '2024-09-13 10:05:54', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_inventory_log`
--
ALTER TABLE `sccv2_inventory_log`
  ADD PRIMARY KEY (`inventory_log_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_inventory_log`
--
ALTER TABLE `sccv2_inventory_log`
  MODIFY `inventory_log_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
