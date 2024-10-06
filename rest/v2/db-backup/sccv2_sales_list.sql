-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2024 at 07:03 AM
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
  `sales_list_discount` varchar(20) NOT NULL,
  `sales_list_discount_amount` varchar(20) NOT NULL,
  `sales_list_return_qty` varchar(20) NOT NULL,
  `sales_list_total_qty` varchar(20) NOT NULL,
  `sales_list_created` datetime NOT NULL,
  `sales_list_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_sales_list`
--

INSERT INTO `sccv2_sales_list` (`sales_list_aid`, `sales_list_sales_id`, `sales_list_product_id`, `sales_list_product_price_id`, `sales_list_customer_id`, `sales_list_quantity`, `sales_list_price`, `sales_list_date`, `sales_list_discount`, `sales_list_discount_amount`, `sales_list_return_qty`, `sales_list_total_qty`, `sales_list_created`, `sales_list_updated`) VALUES
(92, '4', '2', '2', '1', '1', '5.35', '2024-10-03', '', '0', '', '', '2024-10-03 12:21:50', '2024-10-03 12:21:50'),
(93, '2', '2', '2', '2', '1', '5', '2024-10-03', 'promo', '0.4', '', '', '2024-10-03 12:43:03', '2024-10-03 12:43:03'),
(94, '2', '3', '1', '2', '25', '8.8', '2024-10-03', 'wholesale', '2', '', '', '2024-10-03 12:43:07', '2024-10-03 12:43:07'),
(95, '2', '2', '2', '2', '1', '5.4', '2024-10-03', 'wholesale', '0', '', '', '2024-10-03 12:43:18', '2024-10-03 12:43:18'),
(96, '2', '3', '1', '2', '1', '8.88', '2024-10-03', 'wholesale', '0', '', '', '2024-10-03 12:43:20', '2024-10-03 12:43:20');

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
  MODIFY `sales_list_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
