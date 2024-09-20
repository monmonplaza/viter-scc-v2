-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2024 at 10:04 AM
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
-- Table structure for table `sccv2_purchase`
--

CREATE TABLE `sccv2_purchase` (
  `purchase_aid` int(11) NOT NULL,
  `purchase_is_ongoing` tinyint(1) NOT NULL,
  `purchase_is_new_data` tinyint(1) NOT NULL,
  `purchase_delivery_date` varchar(20) NOT NULL,
  `purchase_date` varchar(20) NOT NULL,
  `purchase_product_id` varchar(20) NOT NULL,
  `purchase_quantity` varchar(20) NOT NULL,
  `purchase_supplier_id` varchar(20) NOT NULL,
  `purchase_unit_id` varchar(20) NOT NULL,
  `purchase_price` varchar(20) NOT NULL,
  `purchase_remarks` text NOT NULL,
  `purchase_reference_no` varchar(50) NOT NULL,
  `purchase_created` datetime NOT NULL,
  `purchase_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_purchase`
--

INSERT INTO `sccv2_purchase` (`purchase_aid`, `purchase_is_ongoing`, `purchase_is_new_data`, `purchase_delivery_date`, `purchase_date`, `purchase_product_id`, `purchase_quantity`, `purchase_supplier_id`, `purchase_unit_id`, `purchase_price`, `purchase_remarks`, `purchase_reference_no`, `purchase_created`, `purchase_updated`) VALUES
(5, 0, 1, '2024-09-19', '2024-09-19', '1', '10', '2', '1', '5', '', '397282861', '2024-09-19 15:52:31', '2024-09-19 15:52:31'),
(6, 0, 1, '2024-09-19', '2024-09-19', '1', '10', '2', '1', '5', '', '397282861', '2024-09-19 15:52:38', '2024-09-19 15:52:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_purchase`
--
ALTER TABLE `sccv2_purchase`
  ADD PRIMARY KEY (`purchase_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_purchase`
--
ALTER TABLE `sccv2_purchase`
  MODIFY `purchase_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
