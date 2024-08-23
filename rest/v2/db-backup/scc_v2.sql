-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 23, 2024 at 07:00 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

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
-- Table structure for table `sccv2_category`
--

CREATE TABLE `sccv2_category` (
  `category_aid` int(11) NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `category_description` text NOT NULL,
  `category_is_active` tinyint(1) NOT NULL,
  `category_datetime` varchar(20) NOT NULL,
  `category_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv2_category`
--

INSERT INTO `sccv2_category` (`category_aid`, `category_name`, `category_description`, `category_is_active`, `category_datetime`, `category_created`) VALUES
(1, 'vvvv', 'zxczxczxc', 1, '', '2024-08-23 09:59:31'),
(3, 'ccc', 'ccc', 1, '2024-08-23 10:02:10', '2024-08-23 10:02:10');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_product`
--

CREATE TABLE `sccv2_product` (
  `product_aid` int(11) NOT NULL,
  `product_is_active` tinyint(1) NOT NULL,
  `product_sku` varchar(20) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_description` text NOT NULL,
  `product_barcode` varchar(20) NOT NULL,
  `product_datetime` varchar(20) NOT NULL,
  `product_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv2_product`
--

INSERT INTO `sccv2_product` (`product_aid`, `product_is_active`, `product_sku`, `product_name`, `product_description`, `product_barcode`, `product_datetime`, `product_created`) VALUES
(1, 1, 'hfg', 'fghf', 'hfghfghfghf', 'ghfghfg', '', '2024-08-22 14:39:41'),
(2, 1, 'hfgh', 'fghfg', 'fghfghf', 'ghfghfgh', '', '2024-08-22 14:39:49'),
(3, 0, 'hjfgh', 'fghjfg', 'jfghjfg', 'hjfghjfghj', '', '2024-08-22 14:39:53'),
(26, 0, 'fsfs', 'sdfs', 'dfsfsfs', 'dfsfff', '', '2024-08-23 07:03:22'),
(27, 1, 'sdfg', '123123123123123', 'fsgfxcxcxc', 'sdfgsdfg', '2024-08-23 07:03:41', '2024-08-23 07:03:41'),
(28, 1, 'xcvxv', 'Fght', 'xcvxcvx', 'cvxvxcvx', '2024-08-23 09:36:24', '2024-08-23 09:36:24');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_supplier`
--

CREATE TABLE `sccv2_supplier` (
  `supplier_aid` int(11) NOT NULL,
  `supplier_name` varchar(30) NOT NULL,
  `supplier_representative` varchar(30) NOT NULL,
  `supplier_representative_phone` varchar(20) NOT NULL,
  `supplier_phone` varchar(20) NOT NULL,
  `supplier_address` text NOT NULL,
  `supplier_email` varchar(50) NOT NULL,
  `supplier_is_active` tinyint(1) NOT NULL,
  `supplier_datetime` varchar(20) NOT NULL,
  `supplier_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv2_supplier`
--

INSERT INTO `sccv2_supplier` (`supplier_aid`, `supplier_name`, `supplier_representative`, `supplier_representative_phone`, `supplier_phone`, `supplier_address`, `supplier_email`, `supplier_is_active`, `supplier_datetime`, `supplier_created`) VALUES
(1, 'xx', 'xxx', 'xxx', 'xxx', 'xx', 'xxx@sasdas.com', 0, '', '2024-08-23 12:46:25'),
(2, 'Amazing Chuchu', 'Ramon Plaza', '092122232321', '09221222212', '214 Purok 5 Barangay Sta Ana San Pablo City', 'ramon.plaza@frontlibusiness.com.ph', 1, '2024-08-23 12:53:54', '2024-08-23 12:53:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_category`
--
ALTER TABLE `sccv2_category`
  ADD PRIMARY KEY (`category_aid`);

--
-- Indexes for table `sccv2_product`
--
ALTER TABLE `sccv2_product`
  ADD PRIMARY KEY (`product_aid`);

--
-- Indexes for table `sccv2_supplier`
--
ALTER TABLE `sccv2_supplier`
  ADD PRIMARY KEY (`supplier_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_category`
--
ALTER TABLE `sccv2_category`
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sccv2_product`
--
ALTER TABLE `sccv2_product`
  MODIFY `product_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `sccv2_supplier`
--
ALTER TABLE `sccv2_supplier`
  MODIFY `supplier_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
