-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2024 at 09:31 AM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv2_settings_developer`
--

INSERT INTO `sccv2_settings_developer` (`developer_aid`, `developer_fname`, `developer_lname`, `developer_email`, `developer_email_new`, `developer_role_id`, `developer_key`, `developer_password`, `developer_is_active`, `developer_datetime`, `developer_created`) VALUES
(1, 'Ramon', 'Plaza', 'ramon.plaza@frontlinebusiness.com.ph', '', 7, '05a1cb047d6aca7451fec8279db846d2a34b0f58e3ce992fff5d4e10a68aa939', '$2y$10$MhszWhcDBOGVJa5JG6hBZuteZijzbEIWevuKpFDaQI9Ob4OVYQiB6', 1, '', '2024-09-18 08:41:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_settings_developer`
--
ALTER TABLE `sccv2_settings_developer`
  ADD PRIMARY KEY (`developer_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_settings_developer`
--
ALTER TABLE `sccv2_settings_developer`
  MODIFY `developer_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
