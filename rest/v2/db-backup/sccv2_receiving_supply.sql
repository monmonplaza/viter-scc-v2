-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2024 at 09:52 AM
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
  `receiving_supply_received_id` int(11) NOT NULL,
  `receiving_supply_product_id` int(11) NOT NULL,
  `receiving_supply_supplier_id` int(11) NOT NULL,
  `receiving_supply_unit_id` varchar(20) NOT NULL,
  `receiving_supply_quantity` int(20) NOT NULL,
  `receiving_supply_price` varchar(20) NOT NULL,
  `receiving_supply_amount` varchar(30) NOT NULL,
  `receiving_supply_is_active` tinyint(1) NOT NULL,
  `receiving_supply_datetime` varchar(20) NOT NULL,
  `receiving_supply_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_receiving_supply`
--

INSERT INTO `sccv2_receiving_supply` (`receiving_supply_aid`, `receiving_supply_received_id`, `receiving_supply_product_id`, `receiving_supply_supplier_id`, `receiving_supply_unit_id`, `receiving_supply_quantity`, `receiving_supply_price`, `receiving_supply_amount`, `receiving_supply_is_active`, `receiving_supply_datetime`, `receiving_supply_created`) VALUES
(1, 1, 1, 2, 'per piece', 56, '56', '3136', 1, '2024-08-26 22:28:11', '2024-08-26 22:28:11'),
(2, 1, 1, 2, 'per box', 55, '55', '3025', 1, '2024-08-26 22:28:20', '2024-08-26 22:28:20');

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
