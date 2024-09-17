-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2024 at 02:40 PM
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
-- Table structure for table `sccv2_product`
--

CREATE TABLE `sccv2_product` (
  `product_aid` int(11) NOT NULL,
  `product_is_active` tinyint(1) NOT NULL,
  `product_category_id` varchar(20) NOT NULL,
  `product_sku` varchar(20) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_description` text NOT NULL,
  `product_datetime` varchar(20) NOT NULL,
  `product_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_product`
--

INSERT INTO `sccv2_product` (`product_aid`, `product_is_active`, `product_category_id`, `product_sku`, `product_name`, `product_description`, `product_datetime`, `product_created`) VALUES
(4, 1, '1', '97032254', 'Ballpen', 'This is a test data for product', '2024-09-12 19:06:21', '2024-09-12 19:06:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_product`
--
ALTER TABLE `sccv2_product`
  ADD PRIMARY KEY (`product_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_product`
--
ALTER TABLE `sccv2_product`
  MODIFY `product_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
