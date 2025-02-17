-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2024 at 03:07 AM
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
-- Table structure for table `sccv2_sales`
--

CREATE TABLE `sccv2_sales` (
  `sales_aid` int(11) NOT NULL,
  `sales_customer_id` varchar(20) NOT NULL,
  `sales_date` varchar(20) NOT NULL,
  `sales_reference_no` varchar(50) NOT NULL,
  `sales_total_amount` varchar(20) NOT NULL,
  `sales_payment_amount` varchar(20) NOT NULL,
  `sales_is_paid` tinyint(1) NOT NULL,
  `sales_new_data` tinyint(1) NOT NULL,
  `sales_payment_method` varchar(50) NOT NULL,
  `sales_payment_tracking_number` varchar(200) NOT NULL,
  `sales_created` datetime NOT NULL,
  `sales_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_sales`
--

INSERT INTO `sccv2_sales` (`sales_aid`, `sales_customer_id`, `sales_date`, `sales_reference_no`, `sales_total_amount`, `sales_payment_amount`, `sales_is_paid`, `sales_new_data`, `sales_payment_method`, `sales_payment_tracking_number`, `sales_created`, `sales_updated`) VALUES
(2, '2', '2024-10-03', '2738327', '17.76', '', 0, 0, 'credit', '', '2024-10-03 08:01:32', '2024-10-03 09:02:16'),
(3, '2', '2024-10-03', '2333379', '454.28', '', 0, 0, 'credit', '', '2024-10-03 08:49:41', '2024-10-03 09:06:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_sales`
--
ALTER TABLE `sccv2_sales`
  ADD PRIMARY KEY (`sales_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_sales`
--
ALTER TABLE `sccv2_sales`
  MODIFY `sales_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
