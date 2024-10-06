-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2024 at 03:08 AM
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
-- Table structure for table `sccv2_receiving_supply`
--

CREATE TABLE `sccv2_receiving_supply` (
  `receiving_supply_aid` int(11) NOT NULL,
  `receiving_supply_is_active` tinyint(1) NOT NULL,
  `receiving_supply_is_refund` tinyint(1) NOT NULL,
  `receiving_supply_have_price` tinyint(1) NOT NULL,
  `receiving_supply_received_id` varchar(20) NOT NULL,
  `receiving_supply_product_id` varchar(20) NOT NULL,
  `receiving_supply_barcode` varchar(100) NOT NULL,
  `receiving_supply_supplier_id` varchar(20) NOT NULL,
  `receiving_supply_unit_id` varchar(20) NOT NULL,
  `receiving_supply_quantity` varchar(20) NOT NULL,
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

INSERT INTO `sccv2_receiving_supply` (`receiving_supply_aid`, `receiving_supply_is_active`, `receiving_supply_is_refund`, `receiving_supply_have_price`, `receiving_supply_received_id`, `receiving_supply_product_id`, `receiving_supply_barcode`, `receiving_supply_supplier_id`, `receiving_supply_unit_id`, `receiving_supply_quantity`, `receiving_supply_price`, `receiving_supply_amount`, `receiving_supply_expiration_date`, `receiving_supply_defective_product_qty`, `receiving_supply_defective_remarks`, `receiving_supply_datetime`, `receiving_supply_created`) VALUES
(1, 1, 0, 1, '1', '2', '', '2', '1', '50', '5', '250', '', '10', '', '2024-10-03 07:35:07', '2024-10-02 14:10:39'),
(2, 1, 0, 1, '1', '3', '', '2', '2', '500', '8', '4000', '', '20', '', '2024-10-02 15:47:54', '2024-10-02 14:10:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_receiving_supply`
--
ALTER TABLE `sccv2_receiving_supply`
  ADD PRIMARY KEY (`receiving_supply_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_receiving_supply`
--
ALTER TABLE `sccv2_receiving_supply`
  MODIFY `receiving_supply_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
