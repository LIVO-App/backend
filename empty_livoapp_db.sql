-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 05, 2023 alle 01:51
-- Versione del server: 10.4.27-MariaDB
-- Versione PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `livoapp_db`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `accessible`
--

CREATE TABLE `accessible` (
  `course_id` int(11) NOT NULL,
  `study_year_id` int(11) NOT NULL,
  `study_address_id` varchar(5) NOT NULL,
  `presidium` tinyint(1) NOT NULL DEFAULT 0,
  `main_study_year` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `cf` varbinary(32) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varbinary(35) NOT NULL,
  `name` varchar(75) NOT NULL,
  `surname` varchar(75) NOT NULL,
  `gender` varbinary(20) NOT NULL,
  `birth_date` varbinary(20) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `project_class_course_id` int(11) NOT NULL,
  `project_class_block` int(11) NOT NULL,
  `section` varchar(3) NOT NULL DEFAULT 'A',
  `publishment` date NOT NULL,
  `italian_message` varchar(1000) NOT NULL,
  `english_message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `annual_credits`
--

CREATE TABLE `annual_credits` (
  `study_year_id` int(11) NOT NULL,
  `study_address_id` varchar(5) NOT NULL,
  `definition_year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `associated`
--

CREATE TABLE `associated` (
  `course_id` int(11) NOT NULL,
  `teaching_id` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `attend`
--

CREATE TABLE `attend` (
  `student_id` int(11) NOT NULL,
  `ordinary_class_study_year` int(11) NOT NULL,
  `ordinary_class_address` varchar(5) NOT NULL,
  `ordinary_class_school_year` int(11) NOT NULL,
  `section` varchar(3) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `citizenship_report`
--

CREATE TABLE `citizenship_report` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `delivery` date NOT NULL,
  `certifying_admin_id` int(11) DEFAULT NULL,
  `admin_confirmation` date DEFAULT NULL,
  `start` date NOT NULL,
  `hours` int(11) NOT NULL,
  `experience_place` varchar(250) NOT NULL,
  `referent_sign` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `constraints`
--

CREATE TABLE `constraints` (
  `annual_credits_study_year` int(11) NOT NULL,
  `annual_credits_address` varchar(5) NOT NULL,
  `annual_credits_definition_year` int(11) NOT NULL,
  `learning_area_id` varchar(5) NOT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `italian_title` varchar(250) NOT NULL,
  `english_title` varchar(250) NOT NULL,
  `creation_date` date NOT NULL,
  `italian_description` varchar(1000) NOT NULL,
  `english_description` varchar(1000) NOT NULL,
  `up_hours` int(11) NOT NULL,
  `credits` int(11) NOT NULL,
  `italian_expected_learning_results` varchar(1000) NOT NULL,
  `english_expected_learning_results` varchar(1000) NOT NULL,
  `italian_criterions` varchar(1000) NOT NULL,
  `english_criterions` varchar(1000) NOT NULL,
  `italian_activities` varchar(1000) NOT NULL,
  `english_activities` varchar(1000) NOT NULL,
  `learning_area_id` varchar(5) NOT NULL,
  `growth_area_id` int(11) NOT NULL,
  `min_students` int(11) NOT NULL,
  `max_students` int(11) NOT NULL,
  `proposer_teacher_id` int(11) NOT NULL,
  `certifying_admin_id` int(11) DEFAULT NULL,
  `admin_confirmation` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `grade`
--

CREATE TABLE `grade` (
  `student_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `project_class_course_id` int(11) NOT NULL,
  `project_class_block` int(11) NOT NULL,
  `publication` datetime NOT NULL,
  `grade` float NOT NULL,
  `final` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `have`
--

CREATE TABLE `have` (
  `course_id` int(11) NOT NULL,
  `learning_context_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `inscribed`
--

CREATE TABLE `inscribed` (
  `student_id` int(11) NOT NULL,
  `project_class_course_id` int(11) NOT NULL,
  `project_class_block` int(11) NOT NULL,
  `section` varchar(3) NOT NULL DEFAULT 'A',
  `pending` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `learning_area`
--

CREATE TABLE `learning_area` (
  `id` varchar(5) NOT NULL,
  `italian_title` varchar(250) NOT NULL,
  `english_title` varchar(250) NOT NULL,
  `italian_description` varchar(1000) DEFAULT NULL,
  `english_description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `learning_block`
--

CREATE TABLE `learning_block` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `school_year` int(11) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `learning_context`
--

CREATE TABLE `learning_context` (
  `id` int(11) NOT NULL,
  `italian_title` varchar(250) NOT NULL,
  `english_title` varchar(250) NOT NULL,
  `italian_description` varchar(1000) DEFAULT NULL,
  `english_description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `limited`
--

CREATE TABLE `limited` (
  `learning_block_id` int(11) NOT NULL,
  `ordinary_class_study_year` int(11) NOT NULL,
  `ordinary_class_address` varchar(5) NOT NULL,
  `ordinary_class_school_year` int(11) NOT NULL,
  `learning_area_id` varchar(5) NOT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `ordinary_class`
--

CREATE TABLE `ordinary_class` (
  `study_year_id` int(11) NOT NULL,
  `study_address_id` varchar(5) NOT NULL,
  `school_year` int(11) NOT NULL,
  `italian_displayed_name` varchar(250) NOT NULL,
  `english_displayed_name` varchar(250) NOT NULL,
  `annual_credits_study_year` int(11) NOT NULL,
  `annual_credits_address` varchar(5) NOT NULL,
  `annual_credits_definition_year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `ordinary_teach`
--

CREATE TABLE `ordinary_teach` (
  `ordinary_class_study_year` int(11) NOT NULL,
  `ordinary_class_address` varchar(5) NOT NULL,
  `ordinary_class_school_year` int(11) NOT NULL,
  `section` varchar(3) NOT NULL DEFAULT 'A',
  `teaching_id` varchar(5) NOT NULL,
  `teacher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `personal_growth_area`
--

CREATE TABLE `personal_growth_area` (
  `id` int(11) NOT NULL,
  `italian_title` varchar(250) NOT NULL,
  `english_title` varchar(250) NOT NULL,
  `italian_description` varchar(1000) DEFAULT NULL,
  `english_description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `project_class`
--

CREATE TABLE `project_class` (
  `course_id` int(11) NOT NULL,
  `learning_block_id` int(11) NOT NULL,
  `italian_displayed_name` varchar(250) DEFAULT NULL,
  `english_displayed_name` varchar(250) DEFAULT NULL,
  `proposer_teacher_id` int(11) NOT NULL,
  `certifying_admin_id` int(11) DEFAULT NULL,
  `admin_confirmation` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `project_teach`
--

CREATE TABLE `project_teach` (
  `teacher_id` int(11) NOT NULL,
  `project_class_course_id` int(11) NOT NULL,
  `project_class_block` int(11) NOT NULL,
  `section` varchar(3) NOT NULL DEFAULT 'A',
  `main` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `cf` varbinary(32) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varbinary(35) NOT NULL,
  `name` varchar(75) NOT NULL,
  `surname` varchar(75) NOT NULL,
  `gender` varbinary(20) NOT NULL,
  `birth_date` varbinary(20) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `study_address`
--

CREATE TABLE `study_address` (
  `id` varchar(5) NOT NULL,
  `italian_title` varchar(250) NOT NULL,
  `english_title` varchar(250) NOT NULL,
  `italian_description` varchar(1000) DEFAULT NULL,
  `english_description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `study_year`
--

CREATE TABLE `study_year` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `cf` varbinary(32) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varbinary(35) NOT NULL,
  `name` varchar(75) NOT NULL,
  `surname` varchar(75) NOT NULL,
  `gender` varbinary(20) NOT NULL,
  `birth_date` varbinary(20) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `teaching`
--

CREATE TABLE `teaching` (
  `id` varchar(5) NOT NULL,
  `italian_title` varchar(250) NOT NULL,
  `english_title` varchar(250) NOT NULL,
  `italian_description` varchar(1000) DEFAULT NULL,
  `english_description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `accessible`
--
ALTER TABLE `accessible`
  ADD PRIMARY KEY (`course_id`,`study_year_id`,`study_address_id`),
  ADD KEY `study_year_id` (`study_year_id`),
  ADD KEY `study_address_id` (`study_address_id`);

--
-- Indici per le tabelle `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indici per le tabelle `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `project_class_course_id` (`project_class_course_id`,`project_class_block`);

--
-- Indici per le tabelle `annual_credits`
--
ALTER TABLE `annual_credits`
  ADD PRIMARY KEY (`study_year_id`,`study_address_id`,`definition_year`),
  ADD KEY `study_address_id` (`study_address_id`);

--
-- Indici per le tabelle `associated`
--
ALTER TABLE `associated`
  ADD KEY `course_id` (`course_id`),
  ADD KEY `teaching_id` (`teaching_id`);

--
-- Indici per le tabelle `attend`
--
ALTER TABLE `attend`
  ADD PRIMARY KEY (`student_id`,`ordinary_class_study_year`,`ordinary_class_address`,`ordinary_class_school_year`,`section`),
  ADD KEY `ordinary_class_address` (`ordinary_class_address`),
  ADD KEY `ordinary_class_study_year` (`ordinary_class_study_year`,`ordinary_class_address`,`ordinary_class_school_year`);

--
-- Indici per le tabelle `citizenship_report`
--
ALTER TABLE `citizenship_report`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `delivery` (`student_id`,`delivery`),
  ADD KEY `certifying_admin_id` (`certifying_admin_id`);

--
-- Indici per le tabelle `constraints`
--
ALTER TABLE `constraints`
  ADD PRIMARY KEY (`annual_credits_study_year`,`annual_credits_address`,`annual_credits_definition_year`,`learning_area_id`),
  ADD KEY `learning_area_id` (`learning_area_id`);

--
-- Indici per le tabelle `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course` (`italian_title`,`english_title`,`creation_date`),
  ADD KEY `learning_area_id` (`learning_area_id`),
  ADD KEY `growth_area_id` (`growth_area_id`),
  ADD KEY `course_ibfk_3` (`proposer_teacher_id`),
  ADD KEY `course_ibfk_4` (`certifying_admin_id`);

--
-- Indici per le tabelle `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`student_id`,`teacher_id`,`project_class_course_id`,`project_class_block`,`publication`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `project_class_course_id` (`project_class_course_id`,`project_class_block`);

--
-- Indici per le tabelle `have`
--
ALTER TABLE `have`
  ADD PRIMARY KEY (`course_id`,`learning_context_id`),
  ADD KEY `learning_context_id` (`learning_context_id`);

--
-- Indici per le tabelle `inscribed`
--
ALTER TABLE `inscribed`
  ADD PRIMARY KEY (`student_id`,`project_class_course_id`,`project_class_block`,`section`),
  ADD KEY `project_class_course_id` (`project_class_course_id`,`project_class_block`);

--
-- Indici per le tabelle `learning_area`
--
ALTER TABLE `learning_area`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `italian_title` (`italian_title`),
  ADD UNIQUE KEY `english_title` (`english_title`);

--
-- Indici per le tabelle `learning_block`
--
ALTER TABLE `learning_block`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`,`school_year`);

--
-- Indici per le tabelle `learning_context`
--
ALTER TABLE `learning_context`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `italian_title` (`italian_title`),
  ADD UNIQUE KEY `english_title` (`english_title`);

--
-- Indici per le tabelle `limited`
--
ALTER TABLE `limited`
  ADD PRIMARY KEY (`learning_block_id`,`ordinary_class_study_year`,`ordinary_class_address`,`ordinary_class_school_year`,`learning_area_id`),
  ADD KEY `ordinary_class_study_year` (`ordinary_class_study_year`,`ordinary_class_address`,`ordinary_class_school_year`),
  ADD KEY `learning_area_id` (`learning_area_id`);

--
-- Indici per le tabelle `ordinary_class`
--
ALTER TABLE `ordinary_class`
  ADD PRIMARY KEY (`study_year_id`,`study_address_id`,`school_year`),
  ADD KEY `study_address_id` (`study_address_id`),
  ADD KEY `annual_credits_study_year` (`annual_credits_study_year`,`annual_credits_address`,`annual_credits_definition_year`);

--
-- Indici per le tabelle `ordinary_teach`
--
ALTER TABLE `ordinary_teach`
  ADD PRIMARY KEY (`ordinary_class_study_year`,`ordinary_class_address`,`ordinary_class_school_year`,`section`,`teaching_id`,`teacher_id`),
  ADD KEY `teaching_id` (`teaching_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indici per le tabelle `personal_growth_area`
--
ALTER TABLE `personal_growth_area`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `italian_title` (`italian_title`),
  ADD UNIQUE KEY `english_title` (`english_title`);

--
-- Indici per le tabelle `project_class`
--
ALTER TABLE `project_class`
  ADD PRIMARY KEY (`course_id`,`learning_block_id`),
  ADD KEY `learning_block_id` (`learning_block_id`),
  ADD KEY `project_class_ibfk_3` (`proposer_teacher_id`),
  ADD KEY `project_class_ibfk_4` (`certifying_admin_id`);

--
-- Indici per le tabelle `project_teach`
--
ALTER TABLE `project_teach`
  ADD PRIMARY KEY (`teacher_id`,`project_class_course_id`,`project_class_block`,`section`),
  ADD KEY `project_class_course_id` (`project_class_course_id`,`project_class_block`);

--
-- Indici per le tabelle `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indici per le tabelle `study_address`
--
ALTER TABLE `study_address`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `italian_title` (`italian_title`),
  ADD UNIQUE KEY `english_title` (`english_title`);

--
-- Indici per le tabelle `study_year`
--
ALTER TABLE `study_year`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indici per le tabelle `teaching`
--
ALTER TABLE `teaching`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `italian_title` (`italian_title`),
  ADD UNIQUE KEY `english_title` (`english_title`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `announcement`
--
ALTER TABLE `announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `citizenship_report`
--
ALTER TABLE `citizenship_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `learning_block`
--
ALTER TABLE `learning_block`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `learning_context`
--
ALTER TABLE `learning_context`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `personal_growth_area`
--
ALTER TABLE `personal_growth_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `accessible`
--
ALTER TABLE `accessible`
  ADD CONSTRAINT `accessible_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `accessible_ibfk_2` FOREIGN KEY (`study_year_id`) REFERENCES `study_year` (`id`),
  ADD CONSTRAINT `accessible_ibfk_3` FOREIGN KEY (`study_address_id`) REFERENCES `study_address` (`id`);

--
-- Limiti per la tabella `announcement`
--
ALTER TABLE `announcement`
  ADD CONSTRAINT `announcement_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `announcement_ibfk_2` FOREIGN KEY (`project_class_course_id`,`project_class_block`) REFERENCES `project_class` (`course_id`, `learning_block_id`);

--
-- Limiti per la tabella `annual_credits`
--
ALTER TABLE `annual_credits`
  ADD CONSTRAINT `annual_credits_ibfk_1` FOREIGN KEY (`study_year_id`) REFERENCES `study_year` (`id`),
  ADD CONSTRAINT `annual_credits_ibfk_2` FOREIGN KEY (`study_address_id`) REFERENCES `study_address` (`id`);

--
-- Limiti per la tabella `associated`
--
ALTER TABLE `associated`
  ADD CONSTRAINT `associated_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `associated_ibfk_2` FOREIGN KEY (`teaching_id`) REFERENCES `teaching` (`id`);

--
-- Limiti per la tabella `attend`
--
ALTER TABLE `attend`
  ADD CONSTRAINT `attend_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `attend_ibfk_2` FOREIGN KEY (`ordinary_class_study_year`,`ordinary_class_address`,`ordinary_class_school_year`) REFERENCES `ordinary_class` (`study_year_id`, `study_address_id`, `school_year`);

--
-- Limiti per la tabella `citizenship_report`
--
ALTER TABLE `citizenship_report`
  ADD CONSTRAINT `citizenship_report_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `citizenship_report_ibfk_2` FOREIGN KEY (`certifying_admin_id`) REFERENCES `admin` (`id`);

--
-- Limiti per la tabella `constraints`
--
ALTER TABLE `constraints`
  ADD CONSTRAINT `constraints_ibfk_1` FOREIGN KEY (`annual_credits_study_year`,`annual_credits_address`,`annual_credits_definition_year`) REFERENCES `annual_credits` (`study_year_id`, `study_address_id`, `definition_year`),
  ADD CONSTRAINT `constraints_ibfk_2` FOREIGN KEY (`learning_area_id`) REFERENCES `learning_area` (`id`);

--
-- Limiti per la tabella `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`learning_area_id`) REFERENCES `learning_area` (`id`),
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`growth_area_id`) REFERENCES `personal_growth_area` (`id`),
  ADD CONSTRAINT `course_ibfk_3` FOREIGN KEY (`proposer_teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `course_ibfk_4` FOREIGN KEY (`certifying_admin_id`) REFERENCES `admin` (`id`);

--
-- Limiti per la tabella `grade`
--
ALTER TABLE `grade`
  ADD CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `grade_ibfk_3` FOREIGN KEY (`project_class_course_id`,`project_class_block`) REFERENCES `project_class` (`course_id`, `learning_block_id`);

--
-- Limiti per la tabella `have`
--
ALTER TABLE `have`
  ADD CONSTRAINT `have_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `have_ibfk_2` FOREIGN KEY (`learning_context_id`) REFERENCES `learning_context` (`id`);

--
-- Limiti per la tabella `inscribed`
--
ALTER TABLE `inscribed`
  ADD CONSTRAINT `inscribed_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `inscribed_ibfk_2` FOREIGN KEY (`project_class_course_id`,`project_class_block`) REFERENCES `project_class` (`course_id`, `learning_block_id`);

--
-- Limiti per la tabella `limited`
--
ALTER TABLE `limited`
  ADD CONSTRAINT `limited_ibfk_1` FOREIGN KEY (`learning_block_id`) REFERENCES `learning_block` (`id`),
  ADD CONSTRAINT `limited_ibfk_2` FOREIGN KEY (`ordinary_class_study_year`,`ordinary_class_address`,`ordinary_class_school_year`) REFERENCES `ordinary_class` (`study_year_id`, `study_address_id`, `school_year`),
  ADD CONSTRAINT `limited_ibfk_3` FOREIGN KEY (`learning_area_id`) REFERENCES `learning_area` (`id`);

--
-- Limiti per la tabella `ordinary_class`
--
ALTER TABLE `ordinary_class`
  ADD CONSTRAINT `ordinary_class_ibfk_1` FOREIGN KEY (`study_year_id`) REFERENCES `study_year` (`id`),
  ADD CONSTRAINT `ordinary_class_ibfk_2` FOREIGN KEY (`study_address_id`) REFERENCES `study_address` (`id`),
  ADD CONSTRAINT `ordinary_class_ibfk_4` FOREIGN KEY (`annual_credits_study_year`,`annual_credits_address`,`annual_credits_definition_year`) REFERENCES `annual_credits` (`study_year_id`, `study_address_id`, `definition_year`);

--
-- Limiti per la tabella `ordinary_teach`
--
ALTER TABLE `ordinary_teach`
  ADD CONSTRAINT `ordinary_teach_ibfk_1` FOREIGN KEY (`ordinary_class_study_year`,`ordinary_class_address`,`ordinary_class_school_year`) REFERENCES `ordinary_class` (`study_year_id`, `study_address_id`, `school_year`),
  ADD CONSTRAINT `ordinary_teach_ibfk_2` FOREIGN KEY (`teaching_id`) REFERENCES `teaching` (`id`),
  ADD CONSTRAINT `ordinary_teach_ibfk_3` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`);

--
-- Limiti per la tabella `project_class`
--
ALTER TABLE `project_class`
  ADD CONSTRAINT `project_class_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `project_class_ibfk_2` FOREIGN KEY (`learning_block_id`) REFERENCES `learning_block` (`id`),
  ADD CONSTRAINT `project_class_ibfk_3` FOREIGN KEY (`proposer_teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `project_class_ibfk_4` FOREIGN KEY (`certifying_admin_id`) REFERENCES `admin` (`id`);

--
-- Limiti per la tabella `project_teach`
--
ALTER TABLE `project_teach`
  ADD CONSTRAINT `project_teach_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `project_teach_ibfk_2` FOREIGN KEY (`project_class_course_id`,`project_class_block`) REFERENCES `project_class` (`course_id`, `learning_block_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
