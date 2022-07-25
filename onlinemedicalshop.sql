-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2020 at 09:46 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `onlinemedicalshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `mid` int(50) NOT NULL,
  `mname` varchar(200) NOT NULL,
  `mgenre` varchar(200) NOT NULL,
  `mprice` float NOT NULL,
  `mstatus` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`mid`, `mname`, `mgenre`, `mprice`, `mstatus`) VALUES
(1, 'Napa', 'Paracitamol', 2, 'available'),
(2, 'Aspirin 500mg', 'Aspirin', 5, 'not available'),
(3, 'Histasin 20mg', 'Histasin', 5, 'available'),
(11, 'Zesup (100ml)', 'Syrup', 35, 'not available');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `oid` int(50) NOT NULL,
  `uid` int(50) NOT NULL,
  `otime` varchar(200) NOT NULL,
  `opaymentmethod` varchar(200) NOT NULL,
  `ostatus` varchar(200) NOT NULL,
  `oamount` float NOT NULL,
  `oaddress` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`oid`, `uid`, `otime`, `opaymentmethod`, `ostatus`, `oamount`, `oaddress`) VALUES
(6, 3, '2020-11-25 22:28:52', 'bkash', 'confirmed', 12, 'mirpur-2'),
(7, 3, '2020-11-25 22:29:06', 'rocket', 'pending', 10, 'mirpur-2'),
(8, 2, '1', 'rocket', 'cancled', 4, 'dhaka'),
(9, 5, '2020-11-26 02:43:47', 'bkash', 'confirmed', 25, 'mirpur-2');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(50) NOT NULL,
  `uname` varchar(200) NOT NULL,
  `uphone` varchar(200) NOT NULL,
  `uemail` varchar(200) NOT NULL,
  `urole` varchar(200) NOT NULL,
  `ustatus` varchar(200) NOT NULL,
  `upassword` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `uname`, `uphone`, `uemail`, `urole`, `ustatus`, `upassword`) VALUES
(1, 'Harry', '0123456789', 'harry@gmail.com', 'admin', 'valid', '123'),
(3, 'John', '012345678910', 'john@gmail.com', 'customer', 'valid', '123'),
(5, 'Smith', '012345678910', 'smith@gmail.com', 'customer', 'valid', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`oid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `mid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `oid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
