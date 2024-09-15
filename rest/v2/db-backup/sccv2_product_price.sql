-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2024 at 03:33 PM
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
-- Table structure for table `sccv2_product_price`
--

CREATE TABLE `sccv2_product_price` (
  `product_price_aid` int(11) NOT NULL,
  `product_price_product_id` varchar(20) NOT NULL,
  `product_price_supply_id` varchar(20) NOT NULL,
  `product_price_css_price` varchar(20) NOT NULL,
  `product_price_scc_percent` varchar(20) NOT NULL,
  `product_price_whole_sale_amount` varchar(20) NOT NULL,
  `product_price_whole_sale_percent` varchar(20) NOT NULL,
  `product_price_scc_whole_sale_percent` varchar(20) NOT NULL,
  `product_price_scc_whole_sale_amount` varchar(20) NOT NULL,
  `product_price_amount` varchar(20) NOT NULL,
  `product_price_percent` varchar(20) NOT NULL,
  `product_price_stock_in` varchar(20) NOT NULL,
  `product_price_stock_out` varchar(20) NOT NULL,
  `product_price_remarks` text NOT NULL,
  `product_price_created` datetime NOT NULL,
  `product_price_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_product_price`
--

INSERT INTO `sccv2_product_price` (`product_price_aid`, `product_price_product_id`, `product_price_supply_id`, `product_price_css_price`, `product_price_scc_percent`, `product_price_whole_sale_amount`, `product_price_whole_sale_percent`, `product_price_scc_whole_sale_percent`, `product_price_scc_whole_sale_amount`, `product_price_amount`, `product_price_percent`, `product_price_stock_in`, `product_price_stock_out`, `product_price_remarks`, `product_price_created`, `product_price_update`) VALUES
(4, '4', '14', '11', '10', '11', '10', '9.5', '10.95', '11.05', '10.5', '100', '0', 'first test data', '2024-09-15 21:17:44', '2024-09-15 21:17:44'),
(5, '4', '15', '11.11', '1', '11.11', '1', '1', '11.11', '11.11', '1', '10', '0', 'test', '2024-09-15 21:28:08', '2024-09-15 21:28:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_product_price`
--
ALTER TABLE `sccv2_product_price`
  ADD PRIMARY KEY (`product_price_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_product_price`
--
ALTER TABLE `sccv2_product_price`
  MODIFY `product_price_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
