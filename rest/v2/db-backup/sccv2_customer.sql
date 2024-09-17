-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2024 at 06:13 AM
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
(1, 1, 'Cyrene lumabas', 'San cristobal san pablo city laguna 4000', '09865326545', '2024-09-13 12:11:44', '2024-09-13 12:12:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_customer`
--
ALTER TABLE `sccv2_customer`
  ADD PRIMARY KEY (`customer_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_customer`
--
ALTER TABLE `sccv2_customer`
  MODIFY `customer_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
