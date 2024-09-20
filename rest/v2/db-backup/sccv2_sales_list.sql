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
-- Table structure for table `sccv2_sales_list`
--

CREATE TABLE `sccv2_sales_list` (
  `sales_list_aid` int(11) NOT NULL,
  `sales_list_sales_id` varchar(20) NOT NULL,
  `sales_list_product_id` varchar(20) NOT NULL,
  `sales_list_product_price_id` varchar(20) NOT NULL,
  `sales_list_customer_id` varchar(20) NOT NULL,
  `sales_list_quantity` varchar(20) NOT NULL,
  `sales_list_price` varchar(20) NOT NULL,
  `sales_list_date` varchar(20) NOT NULL,
  `sales_list_created` datetime NOT NULL,
  `sales_list_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_sales_list`
--

INSERT INTO `sccv2_sales_list` (`sales_list_aid`, `sales_list_sales_id`, `sales_list_product_id`, `sales_list_product_price_id`, `sales_list_customer_id`, `sales_list_quantity`, `sales_list_price`, `sales_list_date`, `sales_list_created`, `sales_list_updated`) VALUES
(82, '16', '2', '8', '1', '1', '13.2', '2024-09-20', '2024-09-20 08:19:18', '2024-09-20 08:19:24'),
(83, '16', '2', '8', '1', '1', '13.2', '2024-09-20', '2024-09-20 08:19:23', '2024-09-20 08:19:24'),
(84, '16', '2', '8', '1', '10', '13.2', '2024-09-20', '2024-09-20 08:19:24', '2024-09-20 08:24:21'),
(86, '16', '2', '8', '1', '1', '13.26', '2024-09-20', '2024-09-20 08:24:30', '2024-09-20 08:24:30'),
(87, '17', '2', '9', '2', '1', '32', '2024-09-20', '2024-09-20 09:22:55', '2024-09-20 09:22:55'),
(95, '18', '1', '6', '1', '1', '11.05', '2024-09-20', '2024-09-20 09:56:06', '2024-09-20 09:58:41'),
(96, '18', '1', '6', '1', '1', '11', '2024-09-20', '2024-09-20 09:58:41', '2024-09-20 09:58:41'),
(99, '19', '1', '6', '2', '1', '11.05', '2024-09-20', '2024-09-20 12:25:06', '2024-09-20 12:25:06'),
(100, '20', '1', '6', '1', '1', '10.95', '2024-09-20', '2024-09-20 12:49:57', '2024-09-20 12:50:00'),
(101, '20', '1', '6', '1', '1', '11', '2024-09-20', '2024-09-20 12:50:00', '2024-09-20 12:50:00'),
(110, '20', '1', '6', '1', '1', '11', '2024-09-20', '2024-09-20 13:36:30', '2024-09-20 13:36:30'),
(111, '20', '1', '6', '1', '1', '11', '2024-09-20', '2024-09-20 13:37:51', '2024-09-20 13:37:51'),
(125, '15', '1', '6', '1', '1', '11', '2024-09-20', '2024-09-20 14:03:30', '2024-09-20 14:03:30'),
(126, '15', '1', '6', '1', '1', '10.95', '2024-09-20', '2024-09-20 14:03:32', '2024-09-20 14:03:32'),
(127, '22', '1', '6', '2', '1', '11.05', '2024-09-20', '2024-09-20 14:20:53', '2024-09-20 14:21:09'),
(128, '22', '1', '6', '2', '1', '11.05', '2024-09-20', '2024-09-20 14:20:55', '2024-09-20 14:21:09'),
(129, '22', '1', '6', '2', '1', '11.05', '2024-09-20', '2024-09-20 14:20:56', '2024-09-20 14:21:09'),
(130, '22', '1', '6', '2', '1', '11', '2024-09-20', '2024-09-20 14:21:03', '2024-09-20 14:21:09'),
(131, '22', '1', '6', '2', '1', '11.05', '2024-09-20', '2024-09-20 14:21:09', '2024-09-20 14:21:09'),
(132, '23', '1', '6', '2', '1', '11.05', '2024-09-20', '2024-09-20 14:21:19', '2024-09-20 14:21:23'),
(133, '23', '2', '8', '2', '1', '13.26', '2024-09-20', '2024-09-20 14:21:23', '2024-09-20 14:21:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_sales_list`
--
ALTER TABLE `sccv2_sales_list`
  ADD PRIMARY KEY (`sales_list_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_sales_list`
--
ALTER TABLE `sccv2_sales_list`
  MODIFY `sales_list_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
