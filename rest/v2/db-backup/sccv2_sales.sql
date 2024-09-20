-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2024 at 09:34 AM
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
  `sales_created` datetime NOT NULL,
  `sales_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_sales`
--

INSERT INTO `sccv2_sales` (`sales_aid`, `sales_customer_id`, `sales_date`, `sales_reference_no`, `sales_total_amount`, `sales_payment_amount`, `sales_is_paid`, `sales_new_data`, `sales_payment_method`, `sales_created`, `sales_updated`) VALUES
(15, '1', '2024-09-20', '1221241', '21.95', '', 0, 0, 'credit', '2024-09-20 08:15:32', '2024-09-20 14:03:32'),
(16, '1', '2024-09-20', '1826958', '52.86', '200', 1, 0, 'gcash', '2024-09-20 08:19:18', '0000-00-00 00:00:00'),
(17, '2', '2024-09-20', '2528497', '32', '', 1, 0, 'creadit', '2024-09-20 09:22:55', '0000-00-00 00:00:00'),
(18, '1', '2024-09-20', '2915453', '22.05', '', 1, 0, 'creadit', '2024-09-20 09:56:06', '0000-00-00 00:00:00'),
(19, '2', '2024-09-20', '2715505', '11.05', '10', 0, 0, 'credit', '2024-09-20 12:25:06', '2024-09-20 13:39:17'),
(20, '1', '2024-09-20', '1912772', '43.95', '100', 0, 0, 'credit', '2024-09-20 12:49:57', '2024-09-20 13:38:19'),
(21, '1', '2024-09-20', '1617394', '0', '0', 0, 0, 'credit', '2024-09-20 13:45:09', '0000-00-00 00:00:00'),
(22, '2', '2024-09-20', '2313203', '55.2', '', 0, 0, 'credit', '2024-09-20 14:20:53', '2024-09-20 14:21:10'),
(23, '2', '2024-09-20', '2518365', '24.31', '', 0, 0, 'credit', '2024-09-20 14:21:19', '2024-09-20 14:21:28');

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
  MODIFY `sales_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
