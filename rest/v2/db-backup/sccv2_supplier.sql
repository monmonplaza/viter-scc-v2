-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2024 at 02:26 PM
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
-- Indexes for table `sccv2_supplier`
--
ALTER TABLE `sccv2_supplier`
  ADD PRIMARY KEY (`supplier_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_supplier`
--
ALTER TABLE `sccv2_supplier`
  MODIFY `supplier_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
