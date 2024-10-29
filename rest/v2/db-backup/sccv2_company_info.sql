-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2024 at 08:59 AM
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
-- Table structure for table `sccv2_company_info`
--

CREATE TABLE `sccv2_company_info` (
  `company_info_aid` int(11) NOT NULL,
  `company_info_name` varchar(200) NOT NULL,
  `company_info_email` varchar(200) NOT NULL,
  `company_info_phone` varchar(20) NOT NULL,
  `company_info_mobile` varchar(20) NOT NULL,
  `company_info_address` text NOT NULL,
  `company_info_color_accent` varchar(20) NOT NULL,
  `company_info_color_secondary` varchar(20) NOT NULL,
  `company_info_logo` varchar(200) NOT NULL,
  `company_info_created` datetime NOT NULL,
  `company_info_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv2_company_info`
--

INSERT INTO `sccv2_company_info` (`company_info_aid`, `company_info_name`, `company_info_email`, `company_info_phone`, `company_info_mobile`, `company_info_address`, `company_info_color_accent`, `company_info_color_secondary`, `company_info_logo`, `company_info_created`, `company_info_updated`) VALUES
(1, 'FBS', 'cyrenemlumabas@gmail.com', '09865325687', '3265987456321', 'FBS^ FBS^  FBS^   FBS^    FBS', '#081c59', '#e3e3e3', '', '2024-10-29 12:57:27', '2024-10-29 15:58:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_company_info`
--
ALTER TABLE `sccv2_company_info`
  ADD PRIMARY KEY (`company_info_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_company_info`
--
ALTER TABLE `sccv2_company_info`
  MODIFY `company_info_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
