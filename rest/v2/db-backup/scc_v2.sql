-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2024 at 10:02 AM
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
(1, 'vvvv', 'zxczxczxc', 1, '', '2024-08-23 09:59:31'),
(3, 'Dairy', 'Dairy Products', 1, '2024-08-23 14:23:02', '2024-08-23 10:02:10');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_customer`
--

CREATE TABLE `sccv2_customer` (
  `customer_aid` int(11) NOT NULL,
  `customer_is_active` tinyint(1) NOT NULL,
  `customer_is_member` tinyint(1) NOT NULL,
  `customer_name` varchar(200) NOT NULL,
  `customer_address` text NOT NULL,
  `customer_mobile_number` varchar(20) NOT NULL,
  `customer_created` datetime NOT NULL,
  `customer_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_customer`
--

INSERT INTO `sccv2_customer` (`customer_aid`, `customer_is_active`, `customer_is_member`, `customer_name`, `customer_address`, `customer_mobile_number`, `customer_created`, `customer_updated`) VALUES
(1, 1, 1, 'Cyrene lumabas', 'San cristobal san pablo city laguna 4000', '09865326545', '2024-09-13 12:11:44', '2024-09-17 12:44:57');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_defective_product`
--

CREATE TABLE `sccv2_defective_product` (
  `defective_product_aid` int(11) NOT NULL,
  `defective_product_receiving_supply_id` int(11) NOT NULL,
  `defective_product_is_resolve` tinyint(1) NOT NULL,
  `defective_product_qty` varchar(20) NOT NULL,
  `defective_product_resolved_date` varchar(20) NOT NULL,
  `defective_product_amount` varchar(20) NOT NULL,
  `defective_product_remarks` text NOT NULL,
  `defective_product_created` datetime NOT NULL,
  `defective_product_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_defective_product`
--

INSERT INTO `sccv2_defective_product` (`defective_product_aid`, `defective_product_receiving_supply_id`, `defective_product_is_resolve`, `defective_product_qty`, `defective_product_resolved_date`, `defective_product_amount`, `defective_product_remarks`, `defective_product_created`, `defective_product_updated`) VALUES
(2, 2, 0, '2', '', '20', '', '2024-09-13 09:43:05', '2024-09-13 09:43:05'),
(3, 4, 0, '6', '', '72', '', '2024-09-13 10:06:30', '2024-09-13 10:06:30');

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
(1, '1', '', '100', '', '2', '', '2024-09-13 08:16:51', '2024-09-17 12:47:54'),
(2, '2', '', '100', '', '6', '', '2024-09-13 10:05:54', '2024-09-17 12:47:54');

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
  `product_barcode` varchar(20) NOT NULL,
  `product_datetime` varchar(20) NOT NULL,
  `product_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_product`
--

INSERT INTO `sccv2_product` (`product_aid`, `product_is_active`, `product_category_id`, `product_sku`, `product_name`, `product_description`, `product_barcode`, `product_datetime`, `product_created`) VALUES
(1, 1, '3', '76662451', 'Ballpen', 'This is test.', '', '2024-09-13 08:16:51', '2024-09-13 08:16:51'),
(2, 1, '3', '22634202', 'egg', '', '', '2024-09-13 10:05:54', '2024-09-13 10:05:54');

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
  `product_price_remarks` text NOT NULL,
  `product_price_created` datetime NOT NULL,
  `product_price_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_product_price`
--

INSERT INTO `sccv2_product_price` (`product_price_aid`, `product_price_product_id`, `product_price_supply_id`, `product_price_scc_price`, `product_price_scc_percent`, `product_price_whole_sale_amount`, `product_price_whole_sale_percent`, `product_price_scc_whole_sale_percent`, `product_price_scc_whole_sale_amount`, `product_price_amount`, `product_price_percent`, `product_price_stock_in`, `product_price_stock_out`, `product_price_remarks`, `product_price_created`, `product_price_update`) VALUES
(6, '1', '2', '11', '10', '11', '10', '9.5', '10.95', '11.05', '10.5', '100', '0', 'test', '2024-09-17 12:56:40', '2024-09-17 12:56:40'),
(7, '2', '3', '13.2', '10', '13.2', '10', '9', '13.08', '13.32', '11', '50', '0', 'test', '2024-09-17 12:57:04', '2024-09-17 12:57:04'),
(8, '2', '4', '13.2', '10', '13.2', '10', '9', '13.08', '13.26', '10.5', '50', '0', '', '2024-09-17 12:57:59', '2024-09-17 12:57:59');

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
(1, '2024-09-13', '8515210432', '2200', 1, 0, '2024-09-17 12:47:54', '2024-09-13 08:20:02'),
(2, '2024-09-18', '5872029894', '20', 0, 0, '2024-09-18 15:21:18', '2024-09-18 15:21:18');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_receiving_supply`
--

CREATE TABLE `sccv2_receiving_supply` (
  `receiving_supply_aid` int(11) NOT NULL,
  `receiving_supply_is_active` tinyint(1) NOT NULL,
  `receiving_supply_have_price` tinyint(1) NOT NULL,
  `receiving_supply_received_id` int(11) NOT NULL,
  `receiving_supply_product_id` int(11) NOT NULL,
  `receiving_supply_barcode` varchar(100) NOT NULL,
  `receiving_supply_supplier_id` int(11) NOT NULL,
  `receiving_supply_unit_id` varchar(20) NOT NULL,
  `receiving_supply_quantity` int(20) NOT NULL,
  `receiving_supply_price` varchar(20) NOT NULL,
  `receiving_supply_amount` varchar(30) NOT NULL,
  `receiving_supply_expiration_date` varchar(20) NOT NULL,
  `receiving_supply_defective_product_qty` varchar(20) NOT NULL,
  `receiving_supply_defective_remarks` text NOT NULL,
  `receiving_supply_datetime` varchar(20) NOT NULL,
  `receiving_supply_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_receiving_supply`
--

INSERT INTO `sccv2_receiving_supply` (`receiving_supply_aid`, `receiving_supply_is_active`, `receiving_supply_have_price`, `receiving_supply_received_id`, `receiving_supply_product_id`, `receiving_supply_barcode`, `receiving_supply_supplier_id`, `receiving_supply_unit_id`, `receiving_supply_quantity`, `receiving_supply_price`, `receiving_supply_amount`, `receiving_supply_expiration_date`, `receiving_supply_defective_product_qty`, `receiving_supply_defective_remarks`, `receiving_supply_datetime`, `receiving_supply_created`) VALUES
(2, 1, 1, 1, 1, '', 2, '1', 100, '10', '1000', '', '2', '', '2024-09-17 12:56:40', '2024-09-13 09:42:47'),
(3, 1, 1, 1, 2, '', 2, '1', 50, '12', '600', '', '0', '', '2024-09-17 12:57:04', '2024-09-13 10:06:15'),
(4, 1, 1, 1, 2, '', 2, '1', 50, '12', '600', '', '6', '', '2024-09-17 12:57:59', '2024-09-13 10:06:18'),
(5, 1, 0, 2, 1, '', 2, '1', 1, '20', '20', '', '0', '', '2024-09-18 15:21:18', '2024-09-18 15:21:18');

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
  `return_product_created` datetime NOT NULL,
  `return_product_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_return_product`
--

INSERT INTO `sccv2_return_product` (`return_product_aid`, `return_product_is_resolved`, `return_product_id`, `return_product_date`, `return_product_qty`, `return_product_resolved_date`, `return_product_remarks`, `return_product_created`, `return_product_updated`) VALUES
(1, 0, '1', '2024-09-13', '1', '', 'test', '2024-09-13 08:24:37', '2024-09-13 08:24:37');

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
(4, '1', '2024-09-18', '43117', '261.8', '0', 0, 0, 'credit', '2024-09-17 20:24:29', '2024-09-18 15:58:31');

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
(13, '4', '4', '4', '1', '1', '11.05', '2024-09-17', '2024-09-17 20:25:28', '2024-09-18 15:12:49'),
(14, '4', '4', '6', '1', '1', '11.22', '2024-09-17', '2024-09-17 20:26:03', '2024-09-18 15:12:49'),
(16, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:19', '2024-09-18 15:12:49'),
(17, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:19', '2024-09-18 15:12:49'),
(18, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:20', '2024-09-18 15:12:49'),
(19, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:21', '2024-09-18 15:12:49'),
(20, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:21', '2024-09-18 15:12:49'),
(21, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:21', '2024-09-18 15:12:49'),
(22, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:22', '2024-09-18 15:12:49'),
(23, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:22', '2024-09-18 15:12:49'),
(24, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:22', '2024-09-18 15:12:49'),
(25, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:22', '2024-09-18 15:12:49'),
(26, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:23', '2024-09-18 15:12:49'),
(27, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:23', '2024-09-18 15:12:49'),
(28, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:23', '2024-09-18 15:12:49'),
(29, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:23', '2024-09-18 15:12:49'),
(30, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:23', '2024-09-18 15:12:49'),
(31, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:24', '2024-09-18 15:12:49'),
(33, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:24', '2024-09-18 15:12:49'),
(34, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:24', '2024-09-18 15:12:49'),
(35, '4', '2', '7', '1', '1', '13.2', '2024-09-18', '2024-09-18 14:25:24', '2024-09-18 15:12:49'),
(37, '4', '0', '0', '1', '1', '0', '2024-09-18', '2024-09-18 15:05:20', '2024-09-18 15:12:49'),
(38, '4', '1', '6', '1', '1', '11', '2024-09-18', '2024-09-18 15:12:49', '2024-09-18 15:12:49');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_settings_developer`
--

CREATE TABLE `sccv2_settings_developer` (
  `developer_aid` int(11) NOT NULL,
  `developer_fname` varchar(50) NOT NULL,
  `developer_lname` varchar(50) NOT NULL,
  `developer_email` varchar(100) NOT NULL,
  `developer_email_new` varchar(100) NOT NULL,
  `developer_role_id` int(11) NOT NULL,
  `developer_key` varchar(255) NOT NULL,
  `developer_password` varchar(255) NOT NULL,
  `developer_is_active` tinyint(1) NOT NULL,
  `developer_datetime` varchar(20) NOT NULL,
  `developer_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_settings_developer`
--

INSERT INTO `sccv2_settings_developer` (`developer_aid`, `developer_fname`, `developer_lname`, `developer_email`, `developer_email_new`, `developer_role_id`, `developer_key`, `developer_password`, `developer_is_active`, `developer_datetime`, `developer_created`) VALUES
(1, 'Ramon', 'Plaza', 'ramon.plaza@frontlinebusiness.com.ph', '', 7, '05a1cb047d6aca7451fec8279db846d2a34b0f58e3ce992fff5d4e10a68aa939', '$2y$10$MhszWhcDBOGVJa5JG6hBZuteZijzbEIWevuKpFDaQI9Ob4OVYQiB6', 1, '', '2024-09-18 08:41:58');

-- --------------------------------------------------------

--
-- Table structure for table `sccv2_settings_role`
--

CREATE TABLE `sccv2_settings_role` (
  `role_aid` int(11) NOT NULL,
  `role_name` varchar(20) NOT NULL,
  `role_description` text NOT NULL,
  `role_is_active` tinyint(1) NOT NULL,
  `role_created` varchar(20) NOT NULL,
  `role_datetime` varchar(20) NOT NULL,
  `role_is_` tinyint(1) NOT NULL,
  `role_is_developer` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_settings_role`
--

INSERT INTO `sccv2_settings_role` (`role_aid`, `role_name`, `role_description`, `role_is_active`, `role_created`, `role_datetime`, `role_is_`, `role_is_developer`) VALUES
(7, 'Developer', 'Developer User', 1, '2024-09-17 15:01:54', '2024-09-17 15:01:54', 0, 1);

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
(1, 1, 'per box', '2024-08-27 14:52:04', '2024-08-27 15:01:01'),
(2, 1, 'per pieces', '2024-08-27 15:01:31', '2024-08-27 15:01:45');

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
-- Indexes for table `sccv2_sales`
--
ALTER TABLE `sccv2_sales`
  ADD PRIMARY KEY (`sales_aid`);

--
-- Indexes for table `sccv2_sales_list`
--
ALTER TABLE `sccv2_sales_list`
  ADD PRIMARY KEY (`sales_list_aid`);

--
-- Indexes for table `sccv2_settings_developer`
--
ALTER TABLE `sccv2_settings_developer`
  ADD PRIMARY KEY (`developer_aid`);

--
-- Indexes for table `sccv2_settings_role`
--
ALTER TABLE `sccv2_settings_role`
  ADD PRIMARY KEY (`role_aid`);

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
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sccv2_customer`
--
ALTER TABLE `sccv2_customer`
  MODIFY `customer_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv2_defective_product`
--
ALTER TABLE `sccv2_defective_product`
  MODIFY `defective_product_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sccv2_inventory_log`
--
ALTER TABLE `sccv2_inventory_log`
  MODIFY `inventory_log_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv2_product`
--
ALTER TABLE `sccv2_product`
  MODIFY `product_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv2_product_price`
--
ALTER TABLE `sccv2_product_price`
  MODIFY `product_price_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sccv2_receiving`
--
ALTER TABLE `sccv2_receiving`
  MODIFY `receiving_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sccv2_receiving_supply`
--
ALTER TABLE `sccv2_receiving_supply`
  MODIFY `receiving_supply_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sccv2_return_product`
--
ALTER TABLE `sccv2_return_product`
  MODIFY `return_product_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv2_sales`
--
ALTER TABLE `sccv2_sales`
  MODIFY `sales_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sccv2_sales_list`
--
ALTER TABLE `sccv2_sales_list`
  MODIFY `sales_list_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `sccv2_settings_developer`
--
ALTER TABLE `sccv2_settings_developer`
  MODIFY `developer_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sccv2_settings_role`
--
ALTER TABLE `sccv2_settings_role`
  MODIFY `role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
