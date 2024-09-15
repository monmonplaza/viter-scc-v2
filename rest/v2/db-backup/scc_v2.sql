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
-- Table structure for table `sccv2_category`
--

CREATE TABLE `sccv2_category` (
  `category_aid` int(11) NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `category_description` text NOT NULL,
  `category_is_active` tinyint(1) NOT NULL,
  `category_datetime` varchar(20) NOT NULL,
  `category_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_category`
--

INSERT INTO `sccv2_category` (`category_aid`, `category_name`, `category_description`, `category_is_active`, `category_datetime`, `category_created`) VALUES
(1, 'School Supply', 'School Supply', 1, '2024-09-12 19:13:23', '2024-08-27 18:53:16'),
(2, 'dairy product', 'dairy product', 1, '2024-09-12 19:05:54', '2024-09-12 19:05:54');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_customer`
--

CREATE TABLE `sccv2_customer` (
  `customer_aid` int(11) NOT NULL,
  `customer_is_active` tinyint(1) NOT NULL,
  `customer_name` varchar(200) NOT NULL,
  `customer_address` text NOT NULL,
  `customer_mobile_number` varchar(20) NOT NULL,
  `customer_created` datetime NOT NULL,
  `customer_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_customer`
--

INSERT INTO `sccv2_customer` (`customer_aid`, `customer_is_active`, `customer_name`, `customer_address`, `customer_mobile_number`, `customer_created`, `customer_updated`) VALUES
(1, 1, 'Cyrene lumabas', 'San cristobal san pablo city laguna 4000', '09865326545', '2024-09-13 12:11:44', '2024-09-13 12:12:56'),
(2, 1, 'Zaicy Lumabas', 'San Cristobal San Pablo City Laguna', '09095632587', '2024-09-15 15:28:10', '2024-09-15 15:28:10');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_defective_product`
--

CREATE TABLE `sccv2_defective_product` (
  `defective_product_aid` int(11) NOT NULL,
  `defective_product_receiving_supply_id` int(11) NOT NULL,
  `defective_product_is_resolve` tinyint(1) NOT NULL,
  `defective_product_qty` varchar(20) NOT NULL,
  `defective_product_amount` varchar(20) NOT NULL,
  `defective_product_resolved_date` varchar(20) NOT NULL,
  `defective_product_remarks` text NOT NULL,
  `defective_product_created` datetime NOT NULL,
  `defective_product_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_defective_product`
--

INSERT INTO `sccv2_defective_product` (`defective_product_aid`, `defective_product_receiving_supply_id`, `defective_product_is_resolve`, `defective_product_qty`, `defective_product_amount`, `defective_product_resolved_date`, `defective_product_remarks`, `defective_product_created`, `defective_product_updated`) VALUES
(7, 14, 0, '10', '100', '', '', '2024-09-12 20:32:52', '0000-00-00 00:00:00'),
(8, 14, 0, '10', '100', '', '', '2024-09-12 21:02:20', '2024-09-12 21:02:20');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_inventory_log`
--

CREATE TABLE `sccv2_inventory_log` (
  `inventory_log_aid` int(11) NOT NULL,
  `inventory_log_product_id` varchar(20) NOT NULL,
  `inventory_log_available_stock` varchar(20) NOT NULL,
  `inventory_log_stock_in` varchar(20) NOT NULL,
  `inventory_log_stock_out` varchar(20) NOT NULL,
  `inventory_log_defective_product` varchar(20) NOT NULL,
  `inventory_log_return_product` varchar(20) NOT NULL,
  `inventory_log_created` datetime NOT NULL,
  `inventory_log_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_inventory_log`
--

INSERT INTO `sccv2_inventory_log` (`inventory_log_aid`, `inventory_log_product_id`, `inventory_log_available_stock`, `inventory_log_stock_in`, `inventory_log_stock_out`, `inventory_log_defective_product`, `inventory_log_return_product`, `inventory_log_created`, `inventory_log_updated`) VALUES
(1, '4', '', '110', '', '20', '0', '2024-09-12 19:06:21', '2024-09-15 21:28:33');

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

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_receiving`
--

CREATE TABLE `sccv2_receiving` (
  `receiving_aid` int(11) NOT NULL,
  `receiving_date` varchar(20) NOT NULL,
  `receiving_reference_no` varchar(50) NOT NULL,
  `receiving_total_amount` varchar(20) NOT NULL,
  `receiving_is_complete` tinyint(1) NOT NULL,
  `receiving_is_new_data` tinyint(1) NOT NULL,
  `receiving_datetime` varchar(20) NOT NULL,
  `receiving_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_receiving`
--

INSERT INTO `sccv2_receiving` (`receiving_aid`, `receiving_date`, `receiving_reference_no`, `receiving_total_amount`, `receiving_is_complete`, `receiving_is_new_data`, `receiving_datetime`, `receiving_created`) VALUES
(2, '2024-09-12', '3126520730', '1110', 1, 0, '2024-09-15 20:37:36', '2024-09-12 19:47:40');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_receiving_supply`
--

CREATE TABLE `sccv2_receiving_supply` (
  `receiving_supply_aid` int(11) NOT NULL,
  `receiving_supply_is_active` tinyint(1) NOT NULL,
  `receiving_supply_have_price` tinyint(1) NOT NULL,
  `receiving_supply_received_id` varchar(20) NOT NULL,
  `receiving_supply_product_id` varchar(20) NOT NULL,
  `receiving_supply_barcode` varchar(100) NOT NULL,
  `receiving_supply_supplier_id` varchar(20) NOT NULL,
  `receiving_supply_unit_id` varchar(20) NOT NULL,
  `receiving_supply_quantity` varchar(20) NOT NULL,
  `receiving_supply_price` varchar(20) NOT NULL,
  `receiving_supply_amount` varchar(20) NOT NULL,
  `receiving_supply_expiration_date` varchar(20) NOT NULL,
  `receiving_supply_defective_product_qty` varchar(20) NOT NULL,
  `receiving_supply_defective_remarks` text NOT NULL,
  `receiving_supply_datetime` datetime NOT NULL,
  `receiving_supply_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_receiving_supply`
--

INSERT INTO `sccv2_receiving_supply` (`receiving_supply_aid`, `receiving_supply_is_active`, `receiving_supply_have_price`, `receiving_supply_received_id`, `receiving_supply_product_id`, `receiving_supply_barcode`, `receiving_supply_supplier_id`, `receiving_supply_unit_id`, `receiving_supply_quantity`, `receiving_supply_price`, `receiving_supply_amount`, `receiving_supply_expiration_date`, `receiving_supply_defective_product_qty`, `receiving_supply_defective_remarks`, `receiving_supply_datetime`, `receiving_supply_created`) VALUES
(14, 1, 1, '2', '4', '', '1', '1', '100', '10', '1000', '2024-09-15', '10', '', '0000-00-00 00:00:00', '2024-09-12 20:32:47'),
(15, 1, 1, '2', '4', '1111', '2', '1', '10', '11', '110', '', '0', '', '2024-09-15 21:28:08', '2024-09-15 20:37:32');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_return_product`
--

CREATE TABLE `sccv2_return_product` (
  `return_product_aid` int(11) NOT NULL,
  `return_product_is_resolved` tinyint(1) NOT NULL,
  `return_product_id` varchar(20) NOT NULL,
  `return_product_date` varchar(20) NOT NULL,
  `return_product_qty` varchar(20) NOT NULL,
  `return_product_resolved_date` varchar(20) NOT NULL,
  `return_product_remarks` text NOT NULL,
  `return_product_updated` datetime NOT NULL,
  `return_product_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_settings_unit`
--

CREATE TABLE `sccv2_settings_unit` (
  `settings_unit_aid` int(11) NOT NULL,
  `settings_unit_is_active` tinyint(1) NOT NULL,
  `settings_unit_name` varchar(200) NOT NULL,
  `settings_unit_created` datetime NOT NULL,
  `settings_unit_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_settings_unit`
--

INSERT INTO `sccv2_settings_unit` (`settings_unit_aid`, `settings_unit_is_active`, `settings_unit_name`, `settings_unit_created`, `settings_unit_updated`) VALUES
(1, 1, 'Per piece', '2024-08-27 20:03:08', '2024-08-27 20:03:08'),
(2, 1, 'per box', '2024-08-27 20:03:14', '2024-08-27 20:03:14');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_supplier`
--

INSERT INTO `sccv2_supplier` (`supplier_aid`, `supplier_name`, `supplier_representative`, `supplier_representative_phone`, `supplier_phone`, `supplier_address`, `supplier_email`, `supplier_is_active`, `supplier_datetime`, `supplier_created`) VALUES
(1, 'Cyrene Lumabas', 'sd', '09563254123', '09094568723', 'san cristobal san pablo city', 'cyrenemlumabas@gmail.com', 1, '2024-08-27 18:55:25', '2024-08-27 18:55:25'),
(2, 'Zaicy Lumabas', 'as', '09546214554521', '09653214587', 'as', 'zaicy@gmail.com', 1, '2024-08-27 18:56:00', '2024-08-27 18:56:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_category`
--
ALTER TABLE `sccv2_category`
  ADD PRIMARY KEY (`category_aid`);

--
-- Indexes for table `sccv2_customer`
--
ALTER TABLE `sccv2_customer`
  ADD PRIMARY KEY (`customer_aid`);

--
-- Indexes for table `sccv2_defective_product`
--
ALTER TABLE `sccv2_defective_product`
  ADD PRIMARY KEY (`defective_product_aid`);

--
-- Indexes for table `sccv2_inventory_log`
--
ALTER TABLE `sccv2_inventory_log`
  ADD PRIMARY KEY (`inventory_log_aid`);

--
-- Indexes for table `sccv2_product`
--
ALTER TABLE `sccv2_product`
  ADD PRIMARY KEY (`product_aid`);

--
-- Indexes for table `sccv2_product_price`
--
ALTER TABLE `sccv2_product_price`
  ADD PRIMARY KEY (`product_price_aid`);

--
-- Indexes for table `sccv2_receiving`
--
ALTER TABLE `sccv2_receiving`
  ADD PRIMARY KEY (`receiving_aid`);

--
-- Indexes for table `sccv2_receiving_supply`
--
ALTER TABLE `sccv2_receiving_supply`
  ADD PRIMARY KEY (`receiving_supply_aid`);

--
-- Indexes for table `sccv2_return_product`
--
ALTER TABLE `sccv2_return_product`
  ADD PRIMARY KEY (`return_product_aid`);

--
-- Indexes for table `sccv2_settings_unit`
--
ALTER TABLE `sccv2_settings_unit`
  ADD PRIMARY KEY (`settings_unit_aid`);

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
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv2_customer`
--
ALTER TABLE `sccv2_customer`
  MODIFY `customer_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv2_defective_product`
--
ALTER TABLE `sccv2_defective_product`
  MODIFY `defective_product_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sccv2_inventory_log`
--
ALTER TABLE `sccv2_inventory_log`
  MODIFY `inventory_log_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv2_product`
--
ALTER TABLE `sccv2_product`
  MODIFY `product_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sccv2_product_price`
--
ALTER TABLE `sccv2_product_price`
  MODIFY `product_price_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sccv2_receiving`
--
ALTER TABLE `sccv2_receiving`
  MODIFY `receiving_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv2_receiving_supply`
--
ALTER TABLE `sccv2_receiving_supply`
  MODIFY `receiving_supply_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `sccv2_return_product`
--
ALTER TABLE `sccv2_return_product`
  MODIFY `return_product_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv2_settings_unit`
--
ALTER TABLE `sccv2_settings_unit`
  MODIFY `settings_unit_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv2_supplier`
--
ALTER TABLE `sccv2_supplier`
  MODIFY `supplier_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
