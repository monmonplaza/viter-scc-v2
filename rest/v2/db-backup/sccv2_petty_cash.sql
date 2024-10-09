-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2024 at 03:12 AM
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
-- Table structure for table `sccv2_petty_cash`
--

CREATE TABLE `sccv2_petty_cash` (
  `petty_cash_aid` int(11) NOT NULL,
  `petty_cash_last_insert` tinyint(1) NOT NULL,
  `petty_cash_date` varchar(20) NOT NULL,
  `petty_cash_reference_no` varchar(20) NOT NULL,
  `petty_cash_in` varchar(20) NOT NULL,
  `petty_cash_out` varchar(20) NOT NULL,
  `petty_cash_total` varchar(20) NOT NULL,
  `petty_cash_created` datetime NOT NULL,
  `petty_cash_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_petty_cash`
--

INSERT INTO `sccv2_petty_cash` (`petty_cash_aid`, `petty_cash_last_insert`, `petty_cash_date`, `petty_cash_reference_no`, `petty_cash_in`, `petty_cash_out`, `petty_cash_total`, `petty_cash_created`, `petty_cash_updated`) VALUES
(15, 1, '2024-10-09', '151110090', '10000', '0', '10000', '2024-10-09 09:11:19', '2024-10-09 09:11:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_petty_cash`
--
ALTER TABLE `sccv2_petty_cash`
  ADD PRIMARY KEY (`petty_cash_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_petty_cash`
--
ALTER TABLE `sccv2_petty_cash`
  MODIFY `petty_cash_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
