-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db
-- Generation Time: Jan 24, 2023 at 06:54 AM
-- Server version: 8.0.32
-- PHP Version: 8.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saloodo`
--

-- --------------------------------------------------------

--
-- Table structure for table `order_log`
--

CREATE TABLE `order_log` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `date` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_request`
--

CREATE TABLE `order_request` (
  `id` int NOT NULL,
  `order_ref` varchar(50) NOT NULL,
  `item_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `height` int NOT NULL,
  `weight` int NOT NULL,
  `picked_date` varchar(100) NOT NULL,
  `picked_time` varchar(50) NOT NULL,
  `delivery_date` varchar(50) DEFAULT NULL,
  `delivery_time` varchar(50) DEFAULT NULL,
  `pickedup_location` text NOT NULL,
  `delivery_location` text NOT NULL,
  `customer_notes` text NOT NULL,
  `driver_notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `driver_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `order_status` int DEFAULT NULL,
  `status_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password` text NOT NULL,
  `type` int NOT NULL COMMENT '1-sender,2-driver',
  `licence` varchar(50) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `phone`, `password`, `type`, `licence`, `status`) VALUES
(1, 'Sender 1', 'sender1@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 1, NULL, 1),
(2, 'Driver 1', 'driver1@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 2, 'KL 28B 8888', 1),
(3, 'Driver 2', 'driver2@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 2, 'KL 28B 8888', 1),
(4, 'Sender 2', 'sender2@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 1, NULL, 1),
(5, 'Sender 3', 'sender3@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 1, NULL, 1),
(6, 'Sender 4', 'sender4@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 1, NULL, 1),
(7, 'Sender 5', 'sender5@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 1, NULL, 1),
(8, 'Driver 3', 'driver3@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 2, 'KL 28B 8888', 1),
(9, 'Driver 4', 'driver4@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 2, 'KL 28B 8888', 1),
(10, 'Driver 5', 'driver5@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 2, 'KL 28B 8888', 1),
(11, 'Driver 6', 'driver6@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 2, 'KL 28B 8888', 1),
(12, 'Driver 7', 'driver7@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 2, 'KL 28B 8888', 1),
(13, 'Driver 8', 'driver8@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 2, 'KL 28B 8888', 1),
(14, 'Driver 9', 'driver9@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 2, 'KL 28B 8888', 1),
(15, 'Driver 10', 'driver10@gmail.com', '1234567', '$2y$13$UJbxcXIyfez5L0dhi1Kz3OPIB6OzJFlZFK98OafxXZU0n.R6jgCmW', 2, 'KL 28B 8888', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_log`
--
ALTER TABLE `order_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_request`
--
ALTER TABLE `order_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order_log`
--
ALTER TABLE `order_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `order_request`
--
ALTER TABLE `order_request`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
