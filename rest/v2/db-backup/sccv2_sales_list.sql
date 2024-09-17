-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2024 at 03:05 PM
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
(13, '4', '4', '4', '2', '1', '11.05', '2024-09-17', '2024-09-17 20:25:28', '2024-09-17 20:26:03'),
(14, '4', '4', '6', '2', '1', '11.22', '2024-09-17', '2024-09-17 20:26:03', '2024-09-17 20:26:03');

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
  MODIFY `sales_list_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
