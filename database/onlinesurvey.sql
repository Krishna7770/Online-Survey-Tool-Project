-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Nov 30, 2025 at 10:53 PM
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
-- Database: `onlinesurvey`
--

-- --------------------------------------------------------

--
-- Table structure for table `fchoice`
--

CREATE TABLE `fchoice` (
  `fcid` int(11) NOT NULL,
  `fclabel` varchar(255) NOT NULL,
  `fcseqnum` int(11) NOT NULL,
  `fcoutvalid` int(11) NOT NULL,
  `fcpresentation` varchar(20) NOT NULL DEFAULT 'RADIO',
  `fcsubseqnum` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fchoice`
--

INSERT INTO `fchoice` (`fcid`, `fclabel`, `fcseqnum`, `fcoutvalid`, `fcpresentation`, `fcsubseqnum`) VALUES
(3, 'With family', 1, 1, 'RADIO', 0),
(3, 'Alone', 2, 2, 'RADIO', 0),
(3, 'With roommates', 3, 3, 'RADIO', 0),
(3, 'Student housing', 4, 4, 'RADIO', 0),
(3, 'Other', 5, 5, 'RADIO', 0),
(6, 'Yes, regularly', 1, 1, 'RADIO', 0),
(6, 'Sometimes', 2, 2, 'RADIO', 0),
(6, 'No', 3, 3, 'RADIO', 0),
(8, 'Poor', 1, 1, 'RADIO', 0),
(8, 'Average', 2, 2, 'RADIO', 0),
(8, 'Good', 3, 3, 'RADIO', 0),
(8, 'Excellent', 4, 4, 'RADIO', 0),
(9, 'Easy', 1, 1, 'RADIO', 0),
(9, 'Moderate', 2, 2, 'RADIO', 0),
(9, 'Hard', 3, 3, 'RADIO', 0),
(10, 'Rarely', 1, 1, 'RADIO', 0),
(10, 'Sometimes', 2, 2, 'RADIO', 0),
(10, 'Mostly', 3, 3, 'RADIO', 0),
(10, 'Always', 4, 4, 'RADIO', 0),
(11, 'Yes', 1, 1, 'RADIO', 0),
(11, 'Somewhat', 2, 2, 'RADIO', 0),
(11, 'No', 3, 3, 'RADIO', 0),
(13, 'Group', 1, 1, 'RADIO', 0),
(13, 'Individual', 2, 2, 'RADIO', 0),
(13, 'Both', 3, 3, 'RADIO', 0),
(16, 'Yes', 1, 1, 'RADIO', 0),
(16, 'Somewhat', 2, 2, 'RADIO', 0),
(16, 'No', 3, 3, 'RADIO', 0),
(19, 'Yes', 1, 1, 'RADIO', 0),
(19, 'Maybe', 2, 2, 'RADIO', 0),
(19, 'No', 3, 3, 'RADIO', 0);

-- --------------------------------------------------------

--
-- Table structure for table `fslider`
--

CREATE TABLE `fslider` (
  `fsid` int(11) NOT NULL,
  `fsstoreas` varchar(20) NOT NULL,
  `fslabel` varchar(255) DEFAULT NULL,
  `fsrangeb` int(11) DEFAULT 0,
  `fsrangee` int(11) DEFAULT 10
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fslider`
--

INSERT INTO `fslider` (`fsid`, `fsstoreas`, `fslabel`, `fsrangeb`, `fsrangee`) VALUES
(1, 'DECIMAL', 'Hours of Sleep', 0, 12),
(2, 'DECIMAL', 'Exercise Days', 0, 7),
(5, 'DECIMAL', 'Free Time (hours/day)', 0, 5),
(8, 'DECIMAL', 'Teaching Quality', 1, 5),
(9, 'DECIMAL', 'Course Difficulty', 1, 10),
(10, 'DECIMAL', 'Lecture Attendance', 0, 7),
(12, 'DECIMAL', 'Study Hours/Week', 0, 40),
(15, 'DECIMAL', 'Stress Level', 0, 10),
(17, 'DECIMAL', 'Life–Study Balance', 0, 10);

-- --------------------------------------------------------

--
-- Table structure for table `ftext`
--

CREATE TABLE `ftext` (
  `ftid` int(11) NOT NULL,
  `ftlabel` varchar(255) DEFAULT NULL,
  `ftstoreas` varchar(20) NOT NULL DEFAULT 'TEXT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ftext`
--

INSERT INTO `ftext` (`ftid`, `ftlabel`, `ftstoreas`) VALUES
(4, 'Hobbies', 'TEXT'),
(7, 'Activities (Optional)', 'TEXT'),
(14, 'Most Interesting Course', 'TEXT'),
(18, 'Motivation', 'TEXT'),
(20, 'Suggestions', 'TEXT');

-- --------------------------------------------------------

--
-- Table structure for table `qanswer`
--

CREATE TABLE `qanswer` (
  `aid` int(11) NOT NULL,
  `qiid` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `atype` varchar(20) NOT NULL,
  `avalue` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `qfield`
--

CREATE TABLE `qfield` (
  `fid` int(11) NOT NULL,
  `gid` int(11) NOT NULL,
  `fseqnum` int(11) NOT NULL,
  `ftitle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qfield`
--

INSERT INTO `qfield` (`fid`, `gid`, `fseqnum`, `ftitle`) VALUES
(1, 1, 1, 'How many hours do you sleep per night on average?'),
(2, 1, 2, 'How often do you exercise in a week?'),
(3, 1, 3, 'Do you currently live:'),
(4, 2, 1, 'What are your main hobbies?'),
(5, 2, 2, 'How much free time do you have on weekdays?'),
(6, 2, 3, 'Do you participate in any clubs or extracurricular activities?'),
(7, 2, 4, 'If yes, which activities?'),
(8, 3, 1, 'Rate the quality of teaching in your current courses.'),
(9, 3, 2, 'How difficult do you find your coursework?'),
(10, 3, 3, 'How often do you attend lectures in person?'),
(11, 4, 1, 'Do assignments help you learn the subject?'),
(12, 4, 2, 'How many hours do you study per week outside class?'),
(13, 4, 3, 'Do you prefer group work or individual assignments?'),
(14, 4, 4, 'Which course do you find the most interesting?'),
(15, 5, 1, 'How stressed do you generally feel during a school week?'),
(16, 5, 2, 'Do you feel you have enough support (friends, teachers, etc.)?'),
(17, 5, 3, 'How would you rate your overall life-study balance?'),
(18, 6, 1, 'What motivates you the most in your studies?'),
(19, 6, 2, 'Are you planning to pursue further studies after graduation?'),
(20, 6, 3, 'Any suggestions to improve student life or university services?');

-- --------------------------------------------------------

--
-- Table structure for table `qgroup`
--

CREATE TABLE `qgroup` (
  `gid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `gseqnum` int(11) NOT NULL,
  `gtitle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qgroup`
--

INSERT INTO `qgroup` (`gid`, `pid`, `gseqnum`, `gtitle`) VALUES
(1, 1, 1, 'Daily Routine'),
(2, 1, 2, 'Hobbies & Interests'),
(3, 2, 1, 'Courses & Learning'),
(4, 2, 2, 'Assignments & Study Habits'),
(5, 3, 1, 'Well-being and Future Aspirations'),
(6, 3, 2, 'Motivation and Future Plans');

-- --------------------------------------------------------

--
-- Table structure for table `qinstance`
--

CREATE TABLE `qinstance` (
  `qiid` int(11) NOT NULL,
  `qid` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `qpage`
--

CREATE TABLE `qpage` (
  `pid` int(11) NOT NULL,
  `qid` int(11) NOT NULL,
  `pseqnum` int(11) NOT NULL,
  `ptitle` varchar(255) NOT NULL,
  `pgeneralinline` text DEFAULT NULL,
  `pscope` varchar(20) DEFAULT 'ALL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qpage`
--

INSERT INTO `qpage` (`pid`, `qid`, `pseqnum`, `ptitle`, `pgeneralinline`, `pscope`) VALUES
(1, 1, 1, 'Personal & Lifestyle Overview', 'Answer honestly.', 'ALL'),
(2, 1, 2, 'Academic Experience', NULL, 'ALL'),
(3, 1, 3, 'Well-being and Future Aspirations', NULL, 'ALL');

-- --------------------------------------------------------

--
-- Table structure for table `questionnaire`
--

CREATE TABLE `questionnaire` (
  `qid` int(11) NOT NULL,
  `predecessor` int(11) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `root` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questionnaire`
--

INSERT INTO `questionnaire` (`qid`, `predecessor`, `description`, `root`, `active`) VALUES
(1, NULL, 'Student Life and Academic Experience Survey 2025', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `email`, `password`) VALUES
(1, 'newuser@gmail.com', '$2y$10$lQhvsdiqQkmLaOvjAflf/OdGCZE273fX5J9DD1joukAIEgvVyCCla'),
(2, 'newuser2@gmail.com', '$2y$10$06Gq2r/yk9C2ZpbWl7D0Oe8n2Cen5lx/36l6RomSkJV8SU40gBGkC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `qanswer`
--
ALTER TABLE `qanswer`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `qfield`
--
ALTER TABLE `qfield`
  ADD PRIMARY KEY (`fid`);

--
-- Indexes for table `qgroup`
--
ALTER TABLE `qgroup`
  ADD PRIMARY KEY (`gid`);

--
-- Indexes for table `qinstance`
--
ALTER TABLE `qinstance`
  ADD PRIMARY KEY (`qiid`);

--
-- Indexes for table `qpage`
--
ALTER TABLE `qpage`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `questionnaire`
--
ALTER TABLE `questionnaire`
  ADD PRIMARY KEY (`qid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `qanswer`
--
ALTER TABLE `qanswer`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `qfield`
--
ALTER TABLE `qfield`
  MODIFY `fid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `qgroup`
--
ALTER TABLE `qgroup`
  MODIFY `gid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `qinstance`
--
ALTER TABLE `qinstance`
  MODIFY `qiid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `qpage`
--
ALTER TABLE `qpage`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `questionnaire`
--
ALTER TABLE `questionnaire`
  MODIFY `qid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
