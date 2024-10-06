-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2024 at 10:05 AM
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
  `product_price_scc_price` varchar(20) NOT NULL,
  `product_price_scc_percent` varchar(20) NOT NULL,
  `product_price_whole_sale_amount` varchar(20) NOT NULL,
  `product_price_whole_sale_percent` varchar(20) NOT NULL,
  `product_price_scc_whole_sale_percent` varchar(20) NOT NULL,
  `product_price_scc_whole_sale_amount` varchar(20) NOT NULL,
  `product_price_amount` varchar(20) NOT NULL,
  `product_price_percent` varchar(20) NOT NULL,
  `product_price_stock_in` varchar(20) NOT NULL,
  `product_price_stock_out` varchar(20) NOT NULL,
  `product_price_available_stock` varchar(20) NOT NULL,
  `product_price_whole_sale_qty` varchar(20) NOT NULL,
  `product_price_promo_end_date` varchar(20) NOT NULL,
  `product_price_promo_percent` varchar(20) NOT NULL,
  `product_price_promo_amount` varchar(20) NOT NULL,
  `product_price_remarks` text NOT NULL,
  `product_price_created` datetime NOT NULL,
  `product_price_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_product_price`
--

INSERT INTO `sccv2_product_price` (`product_price_aid`, `product_price_product_id`, `product_price_supply_id`, `product_price_scc_price`, `product_price_scc_percent`, `product_price_whole_sale_amount`, `product_price_whole_sale_percent`, `product_price_scc_whole_sale_percent`, `product_price_scc_whole_sale_amount`, `product_price_amount`, `product_price_percent`, `product_price_stock_in`, `product_price_stock_out`, `product_price_available_stock`, `product_price_whole_sale_qty`, `product_price_promo_end_date`, `product_price_promo_percent`, `product_price_promo_amount`, `product_price_remarks`, `product_price_created`, `product_price_update`) VALUES
(1, '3', '2', '8.8', '10', '8.8', '10', '9', '8.72', '8.88', '11', '500', '0', '480', '25', '2024-10-02', '8', '8.64', '', '2024-10-02 15:47:54', '2024-10-02 16:04:49'),
(2, '2', '1', '5.35', '7', '5.35', '7', '6', '5.3', '5.4', '8', '50', '1', '39', '1', '2024-10-02', '0', '5', '', '2024-10-02 15:55:05', '2024-10-02 16:04:49');

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
  MODIFY `product_price_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
