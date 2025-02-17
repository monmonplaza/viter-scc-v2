-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2024 at 09:34 AM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_settings_unit`
--
ALTER TABLE `sccv2_settings_unit`
  ADD PRIMARY KEY (`settings_unit_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_settings_unit`
--
ALTER TABLE `sccv2_settings_unit`
  MODIFY `settings_unit_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
