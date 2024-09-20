-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2024 at 09:13 AM
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
-- Table structure for table `sccv2_settings_user`
--

CREATE TABLE `sccv2_settings_user` (
  `user_aid` int(11) NOT NULL,
  `user_fname` varchar(50) NOT NULL,
  `user_lname` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_email_new` varchar(100) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `user_key` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_is_active` tinyint(1) NOT NULL,
  `user_datetime` varchar(20) NOT NULL,
  `user_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sccv2_settings_user`
--

INSERT INTO `sccv2_settings_user` (`user_aid`, `user_fname`, `user_lname`, `user_email`, `user_email_new`, `user_role_id`, `user_key`, `user_password`, `user_is_active`, `user_datetime`, `user_created`) VALUES
(3, 'MonmonYT', 'Plaza', 'monmon.plaza@gmail.com', '', 8, '', '$2y$10$2YZDUvknvQ1TLXvPiI.cTOa2Nww4OdKdOP8m51PNmo3PtYKkl1sNG', 1, '2024-09-20 14:45:31', '2024-09-20 12:35:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv2_settings_user`
--
ALTER TABLE `sccv2_settings_user`
  ADD PRIMARY KEY (`user_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv2_settings_user`
--
ALTER TABLE `sccv2_settings_user`
  MODIFY `user_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
