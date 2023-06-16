-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 05, 2023 alle 01:50
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

--
-- Dump dei dati per la tabella `accessible`
--

INSERT INTO `accessible` (`course_id`, `study_year_id`, `study_address_id`, `presidium`, `main_study_year`) VALUES
(2, 1, 'ATS', 0, 0),
(2, 1, 'BIO', 1, 0),
(2, 1, 'TUR', 0, 0),
(2, 2, 'ATS', 0, 1),
(2, 2, 'BIO', 1, 1),
(2, 2, 'TUR', 0, 1),
(2, 3, 'ATS', 0, 0),
(2, 3, 'BIO', 1, 0),
(2, 3, 'TUR', 0, 0),
(3, 1, 'ATS', 0, 0),
(3, 1, 'BIO', 1, 1),
(3, 1, 'TUR', 0, 0),
(3, 2, 'ATS', 0, 1),
(3, 2, 'BIO', 1, 1),
(3, 2, 'TUR', 0, 1),
(3, 3, 'ATS', 0, 0),
(3, 3, 'BIO', 1, 0),
(3, 3, 'TUR', 0, 0),
(4, 1, 'ATS', 0, 0),
(4, 1, 'BIO', 1, 1),
(4, 1, 'ODO', 0, 0),
(4, 1, 'TUR', 0, 0),
(4, 2, 'ATS', 0, 1),
(4, 2, 'BIO', 1, 0),
(4, 2, 'ODO', 0, 1),
(4, 2, 'TUR', 0, 1),
(5, 1, 'ATS', 0, 1),
(5, 1, 'BIO', 0, 1),
(5, 1, 'ODO', 1, 1),
(5, 1, 'TUR', 0, 1),
(5, 2, 'ATS', 0, 0),
(5, 2, 'BIO', 0, 0),
(5, 2, 'ODO', 1, 0),
(5, 2, 'TUR', 0, 0),
(5, 3, 'ATS', 0, 0),
(5, 3, 'BIO', 0, 0),
(5, 3, 'ODO', 1, 0),
(5, 3, 'TUR', 0, 0),
(5, 4, 'ATS', 0, 0),
(5, 4, 'BIO', 0, 0),
(5, 4, 'ODO', 1, 0),
(5, 4, 'TUR', 0, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `cf` varbinary(64) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varbinary(64) NOT NULL,
  `name` varchar(75) NOT NULL,
  `surname` varchar(75) NOT NULL,
  `gender` varbinary(44) NOT NULL,
  `birth_date` varbinary(44) NOT NULL,
  `address` varbinary(384) NOT NULL,
  `google` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `admin`
--

INSERT INTO `admin` (`id`, `cf`, `username`, `email`, `password`, `name`, `surname`, `gender`, `birth_date`, `address`, `google`) VALUES
(1, 'U2FsdGVkX1+tSsB3z29Ij1wJ3p7TMS4HN8Yh/9i+qUea7PY8P/s5r4fkwPMYVjwJ', 'Admin1', 'admin1@mail.com', 'e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a', 'Stefano', 'Arcibaldi', 'U2FsdGVkX1/5J9UEhi4PvesX2LFK6MseVhnvFYrPr+A=', 'U2FsdGVkX1+C1GnsrPdN1uhPEd0wp8QNjHT205eDZ4c=', 'U2FsdGVkX19lYHyte9dZB/cLtERcde42yfP6EPpu+nAHLSkadqu30XbvOtugDxZp', 0),
(2, 'U2FsdGVkX18/+kbgR7n+/fHVBBxIqirpM1jz9mg1oUlsTYnBDbKwF5RBlRyryKGQ', 'Admin2', 'admin2@mail.com', 'e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a', 'Federica', 'Nizza', 'U2FsdGVkX1+HXPsNgOc9KEm6A2YI2PGPZB7BGUvs6U8=', 'U2FsdGVkX1/HuS6hXB6trH7aXzWY7O630h0QvQRCna8=', 'U2FsdGVkX1/uWxYKeAPjuUNCUU7HolRaItvrXw1UD0NmuGP+1B6tCAYt4mU0juvP', 0);

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
  `italian_title` varchar(200) NOT NULL,
  `english_title` varchar(200) NOT NULL,
  `italian_message` varchar(1000) NOT NULL,
  `english_message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `announcement`
--

INSERT INTO `announcement` (`id`, `teacher_id`, `project_class_course_id`, `project_class_block`, `section`, `publishment`, `italian_title`, `english_title` , `italian_message`, `english_message`) VALUES
(1, 2, 5, 6, 'A', '2023-03-25', 'Avviso di fine corso', 'End of the course announcement', 'Attenzione, il corso sta per finire', 'Attention, the course is about to end');

-- --------------------------------------------------------

--
-- Struttura della tabella `annual_credits`
--

CREATE TABLE `annual_credits` (
  `study_year_id` int(11) NOT NULL,
  `study_address_id` varchar(5) NOT NULL,
  `definition_year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `annual_credits`
--

INSERT INTO `annual_credits` (`study_year_id`, `study_address_id`, `definition_year`) VALUES
(1, 'ATS', 2020),
(1, 'BIO', 2018),
(1, 'BIO', 2022),
(1, 'ODO', 2019),
(1, 'TUR', 2019),
(2, 'ATS', 2020),
(2, 'BIO', 2018),
(2, 'ODO', 2019),
(2, 'TUR', 2019),
(3, 'ATS', 2020),
(3, 'BIO', 2018),
(3, 'ODO', 2019),
(3, 'TUR', 2019),
(4, 'ATS', 2020),
(4, 'BIO', 2018),
(4, 'ODO', 2019),
(4, 'TUR', 2019),
(5, 'ATS', 2020),
(5, 'BIO', 2018),
(5, 'ODO', 2019);

-- --------------------------------------------------------

--
-- Struttura della tabella `associated`
--

CREATE TABLE `associated` (
  `course_id` int(11) NOT NULL,
  `teaching_id` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `associated`
--

INSERT INTO `associated` (`course_id`, `teaching_id`) VALUES
(1, 'ITA'),
(1, 'DLT'),
(2, 'TB'),
(2, 'BMTCS'),
(2, 'CHI'),
(3, 'TB'),
(3, 'BMTCS'),
(3, 'CHI'),
(4, 'TB'),
(4, 'CHI'),
(5, 'TB'),
(6, 'ITA'),
(6, 'TED'),
(6, 'ING');

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

--
-- Dump dei dati per la tabella `attend`
--

INSERT INTO `attend` (`student_id`, `ordinary_class_study_year`, `ordinary_class_address`, `ordinary_class_school_year`, `section`) VALUES
(1, 1, 'BIO', 2022, 'A'),
(2, 1, 'BIO', 2022, 'A'),
(3, 4, 'ODO', 2022, 'A'),
(4, 1, 'BIO', 2018, 'A'),
(4, 2, 'BIO', 2019, 'A'),
(4, 3, 'BIO', 2020, 'A'),
(4, 4, 'BIO', 2021, 'A'),
(4, 5, 'BIO', 2022, 'A');

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

--
-- Dump dei dati per la tabella `citizenship_report`
--

INSERT INTO `citizenship_report` (`id`, `student_id`, `delivery`, `certifying_admin_id`, `admin_confirmation`, `start`, `hours`, `experience_place`, `referent_sign`) VALUES
(3, 1, '2023-04-02', 1, '2023-04-03', '2022-04-27', 11, 'Via Giovanni Segantini 16, Trento, TN', 'Firma'),
(4, 2, '2023-04-04', NULL, NULL, '2023-02-01', 11, 'Via Marconi 16 Castel d\'Azzano, VR', 'Firma 2');

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

--
-- Dump dei dati per la tabella `constraints`
--

INSERT INTO `constraints` (`annual_credits_study_year`, `annual_credits_address`, `annual_credits_definition_year`, `learning_area_id`, `credits`) VALUES
(1, 'BIO', 2018, 'COM', 14),
(1, 'BIO', 2018, 'SGET', 10),
(1, 'BIO', 2018, 'SM', 20),
(1, 'BIO', 2018, 'TEC', 9),
(1, 'BIO', 2018, 'TRA', 4),
(1, 'BIO', 2022, 'COM', 16),
(1, 'BIO', 2022, 'SGET', 8),
(1, 'BIO', 2022, 'SM', 20),
(1, 'BIO', 2022, 'TEC', 9),
(1, 'BIO', 2022, 'TRA', 4),
(1, 'TUR', 2019, 'COM', 24),
(1, 'TUR', 2019, 'SGET', 16),
(1, 'TUR', 2019, 'SM', 16),
(1, 'TUR', 2019, 'TEC', 10),
(1, 'TUR', 2019, 'TRA', 6),
(2, 'BIO', 2018, 'COM', 16),
(2, 'BIO', 2018, 'SGET', 8),
(2, 'BIO', 2018, 'SM', 20),
(2, 'BIO', 2018, 'TEC', 9),
(2, 'BIO', 2018, 'TRA', 4),
(3, 'BIO', 2018, 'COM', 12),
(3, 'BIO', 2018, 'SGET', 5),
(3, 'BIO', 2018, 'SM', 36),
(3, 'BIO', 2018, 'TEC', 0),
(3, 'BIO', 2018, 'TRA', 4),
(4, 'BIO', 2018, 'COM', 12),
(4, 'BIO', 2018, 'SGET', 5),
(4, 'BIO', 2018, 'SM', 36),
(4, 'BIO', 2018, 'TEC', 0),
(4, 'BIO', 2018, 'TRA', 4),
(4, 'ODO', 2019, 'COM', 12),
(4, 'ODO', 2019, 'SGET', 3),
(4, 'ODO', 2019, 'SM', 18),
(4, 'ODO', 2019, 'TEC', 20),
(4, 'ODO', 2019, 'TRA', 4),
(5, 'BIO', 2018, 'COM', 12),
(5, 'BIO', 2018, 'SGET', 10),
(5, 'BIO', 2018, 'SM', 31),
(5, 'BIO', 2018, 'TEC', 0),
(5, 'BIO', 2018, 'TRA', 4);

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

--
-- Dump dei dati per la tabella `course`
--

INSERT INTO `course` (`id`, `italian_title`, `english_title`, `creation_date`, `italian_description`, `english_description`, `up_hours`, `credits`, `italian_expected_learning_results`, `english_expected_learning_results`, `italian_criterions`, `english_criterions`, `italian_activities`, `english_activities`, `learning_area_id`, `growth_area_id`, `min_students`, `max_students`, `proposer_teacher_id`, `certifying_admin_id`, `admin_confirmation`) VALUES
(1, 'Gestire il cambiamento', 'Managing change', '2022-08-25', '<p>\nL’unica costante nella nostra vita è il cambiamento. A volte siamo noi a decidere consapevolmente di dare una svolta alla nostra vita (ad es. quando cambiamo sport, scuola, amici); altre volte è il contesto che cambia attorno a noi e ci costringe ad adeguarci alle nuove condizioni. Quanti cambiamenti hai già affrontato nella tua vita? Li hai accolti come un’opportunità o ti sei sentito in difficoltà?\n</p>', '<p>\r\nThe one constant in our lives is change. Sometimes it is we who consciously decide to turn our lives around (e.g. when we change sport, school, friends); other times it is the context that changes around us and forces us to adapt to the new conditions. How many changes have you already faced in your life? Did you welcome them as an opportunity or did you feel challenged?\r\n</p>', 12, 4, '<ul>\r\n<li><b>Riconoscere</b> e <b>descrivere</b> le principali dinamiche legate ai singoli momenti di un cambiamento, sia personale che professionale;</li>\r\n<li><b>Affrontare</b> con maggiore consapevolezza e sicurezza interiore processi di cambiamento;</li>\r\n<li><b>Applicare</b> diverse strategie per lavorare in modo costruttivo in situazioni inaspettate e imprevedibili;</li>\r\n<li><b>Interagire</b> con gli altri in modo appropriato al contesto e alle aspettative sociali</li>\r\n</ul>', '<ul>\r\n<li><b>Recognize</b> and <b>describe</b> the main dynamics associated with individual moments of change, both personal and professional;</li>\r\n<li><b>Deal</b> with greater awareness and inner confidence in change processes;</li>\r\n<li><b>Apply</b> different strategies to work constructively in unexpected and unpredictable situations;</li>\r\n<li><b>Interact</b> with others in ways appropriate to the context and social expectations</li>\r\n</ul>', '<p>\r\nIl corso presenta diverse domande in itinere, alcune sotto forma di quiz, altre proposte unicamente per stimolare la tua riflessione personale. Queste domande non verranno valutate ai fini del superamento del corso. Verranno invece valutati i quiz che faremo al termine di ogni \"\"capitolo\"\".<br />\r\nInoltre <b>sarà valutata la partecipazione</b> alle attività di riflessione e di Role Play\r\n</p>', '<p>\r\nThe course has several on-going questions, some in the form of quizzes, others offered solely to stimulate your personal reflection. These questions will not be evaluated for the purpose of passing the course. Instead, the quizzes we will take at the end of each \"\"chapter\"\" will be evaluated.<br />\r\nIn addition, <b>participation</b> in the reflection and Role Play activities will be <b>evaluated</b>\r\n</p>', '<p>\r\nDurante il corso sono proposti strumenti e attività pratiche per avviare un processo di riflessione sul proprio modo di porsi nei confronti del cambiamento. Le attività affronteranno 5 temi:\r\n</p>\r\n<ul>\r\n<li>Riconoscere il cambiamento e trarne il meglio</li>\r\n<li>Il processo di cambiamento</li>\r\n<li>Gestione del cambiamento in classe</li>\r\n<li>Gestione del cambiamento in famiglia e nel mio ambiente sociale</li>\r\n<li>Competenze necessarie per il cambiamento</li>\r\n</ul>', '<p>\r\nDuring the course, practical tools and activities are offered to initiate a process of reflection on one\'s attitude toward change. Activities will address 5 themes:\r\n</p>\r\n<ul>\r\n<li>Recognizing change and making the best of it</li>\r\n<li>The process of change</li>\r\n<li>Change management in the classroom</li>\r\n<li>Managing change in the family and in my social environment</li>\r\n<li>Skills needed for change</li>\r\n</ul>', 'COM', 1, 10, 15, 1, NULL, NULL),
(2, 'Green Power🌳🌵🪷: come le piante dominano il mondo', 'Green Power🌳🌵🪷: how plants rule the world', '2021-08-25', '<p>\r\nSiamo sicuri di essere i padroni del mondo o esiste una \"nazione delle piante\"? Dov\'è il segreto del loro successo? Perchè da loro dipende la nostra vita e perchè potrebbero essere loro a salvarci?\r\n</p>', '<p>\r\nAre we sure we are the masters of the world or is there a \"plant nation\"? Where is the secret of their success? Why do our lives depend on them and why could they be the ones to save us?\r\n</p>', 0, 4, '<ul>\r\n<li><b>Comprendere</b> i molteplici ruoli svolti dalle piante e <b>metterli in relazione</b> con lo sfruttamento delle risorse, la difesa dai rischi naturali e la riduzione dei problemi ambientali.</li>\r\n<li><b>Progettare e realizzare</b> un esperimento scientifico per rispondere ad una domanda, formulando un\'ipotesi, raccogliendo dei dati ed elaborandoli.</li>\r\n</ul>', '<ul>\n<li><b>Understand</b> the multiple roles played by plants and <b>relate them</b> to resource exploitation, defense against natural hazards and reduction of environmental problems</li>\n<li>Design and carry out a scientific experiment to answer a question by formulating a hypothesis, collecting data and processing it</li>\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n<li>Valutazione positiva project work</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n<li>Positive evaluation project work</li>\r\n</ul>', '<p>\r\nIl corso offre una panoramica sulla distribuzione delle piante e la biodiversità vegetale, utilizzando immagini,video e campioni e facendo uso di esempi della nostra realtà quotidiana. Passerà in rassegna quindi gli aspetti legati a cibo, farmaci, fotosintesi, clima, adattamenti all\'ambiente. A ciò si affiancherà una parte pratica in cui, lavorando a gruppi, gli studenti dovranno realizzare un esperimento scientifico per mostrare un aspetto specifico legato al mondo vegetale\r\n</p>', '<p>\nThe course provides an overview of plant distribution and plant biodiversity, using images,videos and samples and making use of examples from our everyday reality. It will then review aspects related to food, drugs, photosynthesis, climate, and adaptations to the environment. This will be accompanied by a practical part in which, working in groups, students will have to carry out a scientific experiment to show a specific aspect related to the plant world\n</p>', 'SM', 2, 10, 15, 2, 1, '2021-09-13'),
(3, 'Green Power🌳🌵🪷: come le piante dominano il mondo', 'Green Power🌳🌵🪷: how plants rule the world', '2022-09-08', '<p>\r\nSiamo sicuri di essere i padroni del mondo o esiste una \"nazione delle piante\"? Dov\'è il segreto del loro successo? Perchè da loro dipende la nostra vita e perchè potrebbero essere loro a salvarci?\r\n</p>', '<p>\r\nAre we sure we are the masters of the world or is there a \"plant nation\"? Where is the secret of their success? Why do our lives depend on them and why could they be the ones to save us?\r\n</p>', 0, 4, '<ul>\r\n<li><b>Comprendere</b> i molteplici ruoli svolti dalle piante e <b>metterli in relazione</b> con lo sfruttamento delle risorse, la difesa dai rischi naturali e la riduzione dei problemi ambientali.</li>\r\n<li><b>Progettare e realizzare</b> un esperimento scientifico per rispondere ad una domanda, formulando un\'ipotesi, raccogliendo dei dati ed elaborandoli.</li>\r\n</ul>', '<ul>\n<li><b>Understand</b> the multiple roles played by plants and <b>relate them</b> to resource exploitation, defense against natural hazards and reduction of environmental problems</li>\n<li>Design and carry out a scientific experiment to answer a question by formulating a hypothesis, collecting data and processing it</li>\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n<li>Valutazione positiva project work</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n<li>Positive evaluation project work</li>\r\n</ul>', '<p>\r\nIl corso offre una panoramica sulla distribuzione delle piante e la biodiversità vegetale, utilizzando immagini,video e campioni e facendo uso di esempi della nostra realtà quotidiana. Passerà in rassegna quindi gli aspetti legati a cibo, farmaci, fotosintesi, clima, adattamenti all\'ambiente. A ciò si affiancherà una parte pratica in cui, lavorando a gruppi, gli studenti dovranno realizzare un esperimento scientifico per mostrare un aspetto specifico legato al mondo vegetale\r\n</p>', '<p>\r\nThe course provides an overview of plant distribution and plant biodiversity, using images,videos and samples and making use of examples from our everyday reality. It will then review aspects related to food, drugs, photosynthesis, climate, and adaptations to the environment. This will be accompanied by a practical part in which, working in groups, students will have to carry out a scientific experiment to show a specific aspect related to the plant world\r\n</p>', 'SM', 2, 10, 25, 2, 2, '2022-09-09'),
(4, 'La magia dell\'acqua 💧🧊', 'The magic of water 💧🧊', '2022-08-25', '<p>\r\n“Se vi è una magia su questo pianeta, è contenuta nell’acqua (L. Eiseley)”.<br />\r\nUn percorso alla scoperta della sostanza che rende speciale il nostro Pianeta, dalle caratteristiche molecolari agli effetti sull’uomo e sull’ambiente.\r\n</p>', '<p>\r\n\"If there is any magic on this planet, it is contained in water (L. Eiseley)\".<br />\r\nA journey to discover the substance that makes our Planet special, from molecular characteristics to effects on humans and the environment.\r\n</p>', 0, 4, '<ul>\r\n<li><b>Comprendere</b> le proprietà fisico-chimiche dell\'acqua e <b>riconoscerne</b> l\'importanza per la vita.</li>\r\n<li><b>Individuare</b> il ruolo dell\'acqua nelle cellule e negli organismi <b>riflettendo</b> sulle strategie di conservazione.\r\n<li><b>Riconoscere</b> rischi e risorse degli ambienti acquatici e le alterazioni antropiche</li>\r\n</ul>', '<ul>\r\n<li><b>Understand</b> the physicochemical properties of water and <b>recognize</b> its importance to life.</li>\r\n<li><b>Identify</b> the role of water in cells and organisms by <b>reflecting</b> on conservation strategies.</li>\r\n<li><b>Recognize</b> risks and resources of aquatic environments and anthropogenic alterations</li>\r\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n<li>Valutazione positiva della relazione di laboratorio e della scheda di osservazione di campo</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n<li>Positive evaluation of the laboratory report and field observation form</li>\r\n</ul>', '<p>\r\nIl corso si propone di offrire una panoramica sull’elemento più caratterizzante della Terra, analizzandone peculiarità e ruolo fondamentale per i viventi. Le caratteristiche chimiche dell’acqua verranno indagate anche attraverso semplici esperimenti, mentre gli aspetti più legati alla fisiologia, alla patologia e all’igiene nell’uomo saranno esplorati per mezzo di attività guidate individuali e a piccoli gruppi e avvalendosi di supporti multimediali. Gli aspetti naturalistici e ambientali verranno indagati con delle uscite sul territorio progettate ad hoc (qualità delle acque, rischio idrogeologico, ecc.)\r\n</p>', '<p>\r\nThe course aims to provide an overview of the Earth\'s most defining element, analyzing its peculiarities and fundamental role for living things. The chemical characteristics of water will also be investigated through simple experiments, while aspects more related to physiology, pathology and hygiene in humans will be explored by means of individual and small-group guided activities and making use of multimedia supports. Naturalistic and environmental aspects will be investigated with specially designed field trips (water quality, hydrogeological risk, etc.).\r\n</p>', 'SM', 1, 15, 20, 2, 1, '2021-09-13'),
(5, 'A qualcuno piace caldo🥵', 'Some people like it hot🥵', '2021-08-25', '<b>\r\nCorso dove gli studenti studieranno il cambiamento climatico\r\n</b>', '<b>\r\nCourse where students will study climate change\r\n</b>', 2, 4, '<ul>\r\n<li><b>Comprendere</b> le cause del cambiamento climatico in corso <b>evidenziando</b> quali attività antropiche ne sono responsabili.</li>\r\n<li><b>Distinguere</b> cause ed effetti del cambiamenti climatici <b>mettendole in relazione</b> fra loro.</li>\r\n<li><b>Riflettere</b> sull\'impatto dei propri comportamenti e delle proprie scelte ragionando su possibili alternative.</li>\r\n</ul>', '<ul>\r\n<li><b>Understand</b> the causes of current climate change by <b>highlighting</b> which anthropogenic activities are responsible for it.</li>\r\n<li><b>Distinguish</b> causes and effects of climate change by <b>relating them</b> to each other.</li>\r\n<li><b>Reflect</b> on the impact of their own behaviors and choices by reasoning about possible alternatives.</li>\r\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n</ul>', '<p>\r\nIl corso parte dalle esperienze degli studenti sui cambiamenti climatici per riorganizzarli in una cornice di rigore scientifico e dare loro gli strumenti per partecipare attivamente al dibattito pubblico e di riflettere sui propri comportamenti e le ricadute che essi hanno sull\'ambiente. Ci si concentrerà sulle relazioni di causa-effetto e sulla complessità che caratterizza questi sistemi. Si metteranno in evidenza le cnseguenze di questo fenomeno negli ambiti ambientale, sanitario, economico.\r\n</p>', '<p>\r\nThe course starts with students\' experiences of climate change to reorganize them into a framework of scientific rigor and give them the tools to actively participate in public debate and to reflect on their own behaviors and the effects they have on the environment. There will be a focus on cause-and-effect relationships and the complexity that characterizes these systems. The cnseguences of this phenomenon in the environmental, health, and economic spheres will be highlighted.\r\n</p>', 'SM', 1, 15, 25, 2, 1, '2021-09-13'),
(6, 'Dieci minuti scritti. Sperimentazioni di scrittura', 'Ten minutes written. Experiments in writing', '2022-08-25', '<p>\r\nScrivere può essere un piacere o un peso, ma prima di tutto è frutto di esercizio. Scrivere è una ginnastica per le idee, un metodo per sviluppare il proprio pensiero creativo e cercare idee e rapporti nuovi e originali con ciò che ci circonda. La scrittura creativa è questo: provare, scoprendo risorse, creatività e invenzione che, forse, non si sapeva di avere.\r\n</p>', '<p>\r\nWriting can be a pleasure or a burden, but first and foremost it is the result of exercise. Writing is a gymnastics for ideas, a method of developing one\'s creative thinking and seeking new and original ideas and relationships with what surrounds us. Creative writing is this: trying, discovering resources, creativity and invention that, perhaps, you did not know you had.\r\n</p>', 0, 2, '<ul>\r\n<li><b>Comprendere</b> le caratteristiche di vari tipi di testo e i rudimenti del processo creativo su cui si basa la scrittura</li>\r\n<li><b>Applicare</b>: le principali regole di scrittura, utilizzare i diversi registri in base ai testi e le griglie di autocorrezione</li>\r\n<li><b>Produrre</b>: microtesti di varie tipologie, facendo riferimento agli esercizi base della scrittura creativa</li>\r\n<ul>', '<ul>\r\n<li><b>Understand</b> the characteristics of various types of text and the rudiments of the creative process on which writing is based</li>\r\n<li><b>Apply</b>: the main rules of writing, use different registers according to texts and self-correction grids</li>\r\n<li><b>Produce</b>: microtexts of various types, referring to the basic exercises of creative writing</li>\r\n<ul>', '<ul>\r\n<li>L\'impegno nelle esercitaizoni e l\'attenzione a seguire indicazioni e consigli per evitare il ripetersi di errori, oltre alla costanza nella produzione delle esercizi assegnati, concorreranno alla valutazione finale, che consisterà nella stesura di un minitesto di tipologia a scelta fra quelle affrontate, la cui correttezzia è determinata dai parametri stessi del testo precedentemente presentati agli studenti.</li>\r\n<li>Presenza almeno 60% ore</li>\r\n</ul>', '<ul>\r\n<li>Commitment to the exercises and attention to following directions and advice to avoid the repetition of errors, as well as consistency in the production of the assigned exercises, will contribute to the final assessment, which will consist of the writing of a mini-text of a type chosen from those addressed, the correctness of which is determined by the very parameters of the text previously presented to the students.</li>\r\n<li>Attendance at least 60% hours</li>\r\n</ul>', '<p>\r\nIl corso ha carattere laboratoriale e prevede la stesura di microtesti di varia natura oltre ad attività pratiche di scrittura creativa, sviluppando un approccio originale alle tematiche proposte\r\n</p>', '<p>\r\nThe course is workshop-based in nature and involves the writing of microtexts of various kinds as well as practical creative writing activities, developing an original approach to the proposed topics\r\n</p>', 'COM', 1, 10, 20, 1, 2, '2022-09-08');

-- --------------------------------------------------------

--
-- Struttura della tabella `grade`
--

CREATE TABLE `grade` (
  `student_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `project_class_course_id` int(11) NOT NULL,
  `project_class_block` int(11) NOT NULL,
  `italian_description` varchar(1000) NOT NULL,
  `english_description` varchar(1000) NOT NULL,
  `publication` datetime NOT NULL,
  `grade` float NOT NULL,
  `final` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `grade`
--

INSERT INTO `grade` (`student_id`, `teacher_id`, `project_class_course_id`, `project_class_block`, `italian_description`, `english_description`, `publication`, `grade`, `final`) VALUES
(1, 3, 4, 6, 'Compito di Chimica', 'Chemisrty test', '2023-04-01 09:10:15', 9, 0),
(1, 3, 4, 6, 'Interrogazione su organismi acquatici', 'Oral exam on aquatic organisms', '2023-04-02 10:10:15', 8, 0),
(1, 3, 4, 6, 'Compito finale', 'Final test', '2023-04-03 15:10:15', 9, 0),
(2, 3, 5, 6, 'Introduzione alla temperatura', 'Introduction to temperature', '2023-04-01 09:10:15', 7, 0),
(2, 3, 5, 6, 'Interrogazione su caratteristiche delle specie che vivono in luoghi caldi', 'Oral test on species that lives in hot environment', '2023-04-04 09:10:15', 9, 0),
(3, 1, 6, 6, 'Introduzione ai metodi di scrittura: italiano', 'Introduction to writing methods: italian', '2023-04-01 09:10:15', 9, 0),
(4, 3, 5, 6, 'Compito finale', 'Final test', '2023-04-01 09:10:15', 6, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `have`
--

CREATE TABLE `have` (
  `course_id` int(11) NOT NULL,
  `learning_context_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `have`
--

INSERT INTO `have` (`course_id`, `learning_context_id`) VALUES
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(4, 1),
(4, 3),
(5, 1),
(5, 2),
(6, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `inscribed`
--

CREATE TABLE `inscribed` (
  `student_id` int(11) NOT NULL,
  `project_class_course_id` int(11) NOT NULL,
  `project_class_block` int(11) NOT NULL,
  `section` varchar(3) NOT NULL DEFAULT '',
  `pending` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `inscribed`
--

INSERT INTO `inscribed` (`student_id`, `project_class_course_id`, `project_class_block`, `section`, `pending`) VALUES
(1, 3, 7, 'A', NULL),
(1, 4, 6, 'A', NULL),
(2, 3, 7, 'A', NULL),
(2, 4, 7, 'A', NULL),
(2, 5, 6, 'A', NULL),
(2, 6, 7, 'A', NULL),
(3, 5, 7, 'A', NULL),
(3, 6, 6, 'A', NULL),
(4, 4, 7, 'A', NULL),
(4, 5, 6, 'A', NULL),
(4, 6, 7, 'A', NULL);

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

--
-- Dump dei dati per la tabella `learning_area`
--

INSERT INTO `learning_area` (`id`, `italian_title`, `english_title`, `italian_description`, `english_description`) VALUES
('COM', 'Area della comunicazione', 'Communication area', NULL, NULL),
('SGET', 'Area storico-giuridico-economica e del territorio', 'Historical-legal-economic and territorial area', NULL, NULL),
('SM', 'Area scientifico-matematica', 'Scientific-mathematical area', NULL, NULL),
('TEC', 'Area tecnologica, artistico, motoria', 'Technology area', 'In quest\'area, uno studente ha la possibilità di avere a che fare con le tecnologie all\'avanguardia nel settore', 'In this area, a student has the opportunity to deal with cutting-edge technologies in the field'),
('TRA', 'Area trasversale', 'Trasversal area', 'Scienze motorie e sportive; religione cattolica; attività alternative', 'Exercise science and sports; Catholic religion; alternative activities');

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

--
-- Dump dei dati per la tabella `learning_block`
--

INSERT INTO `learning_block` (`id`, `number`, `school_year`, `start`, `end`) VALUES
(1, 5, 2021, '2022-04-27', '2022-06-08'),
(2, 1, 2022, '2022-10-26', '2022-12-06'),
(3, 2, 2022, '2022-09-14', '2022-10-26'),
(4, 3, 2022, '2023-01-07', '2023-02-18'),
(5, 4, 2022, '2023-02-18', '2023-04-01'),
(6, 5, 2022, '2023-04-01', '2023-05-13'),
(7, 6, 2022, '2023-05-13', '2023-06-07');

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

--
-- Dump dei dati per la tabella `learning_context`
--

INSERT INTO `learning_context` (`id`, `italian_title`, `english_title`, `italian_description`, `english_description`) VALUES
(1, 'Progetto individuale \"SPECIFICO\"', 'Individual project \"SPECIFIC\"', '<p>\r\nAttività orientate al potenziamento delle abilità riguardanti il proprio settore\r\n</p>', '<p>\r\nActivities geared toward skill enhancement concerning one\'s field\r\n</p>'),
(2, 'Progetto individuale \"PERSONALE\"', 'Individual project \"PERSONAL\"', NULL, NULL),
(3, '\"ESPERIENZE DI CITTADINANZA ATTIVA\"', '\"ACTIVE CITIZENSHIP EXPERIENCES\"', NULL, NULL);

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

--
-- Dump dei dati per la tabella `limited`
--

INSERT INTO `limited` (`learning_block_id`, `ordinary_class_study_year`, `ordinary_class_address`, `ordinary_class_school_year`, `learning_area_id`, `credits`) VALUES
(6, 1, 'BIO', 2022, 'SM', 4),
(6, 4, 'ODO', 2022, 'COM', 2),
(6, 5, 'BIO', 2022, 'SM', 4),
(7, 1, 'BIO', 2022, 'COM', 2),
(7, 1, 'BIO', 2022, 'SM', 8),
(7, 4, 'ODO', 2022, 'SM', 8),
(7, 5, 'BIO', 2022, 'COM', 2),
(7, 5, 'BIO', 2022, 'SM', 8);

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

--
-- Dump dei dati per la tabella `ordinary_class`
--

INSERT INTO `ordinary_class` (`study_year_id`, `study_address_id`, `school_year`, `italian_displayed_name`, `english_displayed_name`, `annual_credits_study_year`, `annual_credits_address`, `annual_credits_definition_year`) VALUES
(1, 'ATS', 2020, '', '', 1, 'ATS', 2020),
(1, 'BIO', 2018, '', '', 1, 'BIO', 2018),
(1, 'BIO', 2022, '', '', 1, 'BIO', 2022),
(1, 'ODO', 2019, '', '', 1, 'ODO', 2019),
(1, 'TUR', 2019, '', '', 1, 'TUR', 2019),
(2, 'ATS', 2021, '', '', 2, 'ATS', 2020),
(2, 'BIO', 2019, '', '', 2, 'BIO', 2018),
(2, 'ODO', 2020, '', '', 2, 'ODO', 2019),
(2, 'TUR', 2020, '', '', 2, 'TUR', 2019),
(3, 'ATS', 2022, '', '', 3, 'ATS', 2020),
(3, 'BIO', 2020, '', '', 3, 'BIO', 2018),
(3, 'ODO', 2021, '', '', 3, 'ODO', 2019),
(3, 'TUR', 2021, '', '', 3, 'TUR', 2019),
(4, 'BIO', 2021, '4a biologia', '4th biology', 4, 'BIO', 2018),
(4, 'ODO', 2022, '4a odontotecnica', '4th dental technician', 2, 'ODO', 2019),
(4, 'TUR', 2022, '', '', 2, 'TUR', 2019),
(5, 'BIO', 2022, '', '', 5, 'BIO', 2018);

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

--
-- Dump dei dati per la tabella `ordinary_teach`
--

INSERT INTO `ordinary_teach` (`ordinary_class_study_year`, `ordinary_class_address`, `ordinary_class_school_year`, `section`, `teaching_id`, `teacher_id`) VALUES
(1, 'BIO', 2022, 'A', 'BMTCS', 3),
(1, 'BIO', 2022, 'A', 'ITA', 1),
(1, 'BIO', 2022, 'A', 'TB', 2),
(4, 'ODO', 2022, 'A', 'CHI', 2),
(4, 'ODO', 2022, 'A', 'DMSL', 3),
(4, 'ODO', 2022, 'A', 'ITA', 1),
(5, 'BIO', 2022, 'A', 'ITA', 1),
(5, 'BIO', 2022, 'A', 'TB', 2);

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

--
-- Dump dei dati per la tabella `personal_growth_area`
--

INSERT INTO `personal_growth_area` (`id`, `italian_title`, `english_title`, `italian_description`, `english_description`) VALUES
(1, 'Benessere personale', 'Personal well-being', NULL, NULL),
(2, 'Prospettive di crescita', 'Growth prospects', '<p>Area in cui uno studente può effettuare corsi che gli permettono di crescere e migliorare le sue competenze</p>', '<p>Area in which a student can take courses that enable him/her to grow and improve his/her skills</p>'),
(3, 'Imprenditività', 'Entrepreneurship', NULL, NULL);

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

--
-- Dump dei dati per la tabella `project_class`
--

INSERT INTO `project_class` (`course_id`, `learning_block_id`, `italian_displayed_name`, `english_displayed_name`, `proposer_teacher_id`, `certifying_admin_id`, `admin_confirmation`) VALUES
(3, 7, NULL, NULL, 2, 2, '2022-09-09'),
(4, 6, NULL, NULL, 2, 2, '2022-09-09'),
(4, 7, 'Acqua magica', 'Magic water', 2, 2, '2022-09-09'),
(5, 6, NULL, NULL, 2, 1, '2022-09-09'),
(5, 7, NULL, NULL, 2, 1, '2022-09-09'),
(6, 6, NULL, NULL, 1, 2, '2022-09-08'),
(6, 7, NULL, NULL, 1, 2, '2022-09-08');

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

--
-- Dump dei dati per la tabella `project_teach`
--

INSERT INTO `project_teach` (`teacher_id`, `project_class_course_id`, `project_class_block`, `section`, `main`) VALUES
(1, 6, 6, 'A', 1),
(1, 6, 7, 'A', 1),
(2, 3, 7, 'A', 1),
(2, 4, 7, 'A', 1),
(2, 5, 7, 'A', 1),
(3, 4, 6, 'A', 1),
(3, 4, 7, 'A', 0),
(3, 5, 6, 'A', 1),
(3, 5, 7, 'A', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `cf` varbinary(64) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varbinary(64) NOT NULL,
  `name` varchar(75) NOT NULL,
  `surname` varchar(75) NOT NULL,
  `gender` varbinary(44) NOT NULL,
  `birth_date` varbinary(44) NOT NULL,
  `address` varbinary(384) NOT NULL,
  `google` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `student`
--

INSERT INTO `student` (`id`, `cf`, `username`, `email`, `password`, `name`, `surname`, `gender`, `birth_date`, `address`, `google`) VALUES
(1, 'U2FsdGVkX19ocoZH/Qb3aHrH7rZ2VEIc2I0o3rgtyFu3kvCxnawsGL0Mh6SG7eGR', 'Student1', 'student1@mail.com', 'e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a', 'Simone', 'Fronza', 'U2FsdGVkX1/5J9UEhi4PvesX2LFK6MseVhnvFYrPr+A=', 'U2FsdGVkX1/2PBGMe+CdoLxjV62cm5Y7bx1kEr6Ri28=', 'U2FsdGVkX18NK9HzW60oTz7mKU+3tBzZtpv6U6Hxxj7/t0koY2KtgkJBUf3f1XkXBV7yfzIsfuFyf6MqJ4PPew==', 0),
(2, 'U2FsdGVkX18YKCy8ONJqLm3DF3he/VudEwcxKORIHQR1RFau1rMzv4Dp5/yD9pOg', 'Student2', 'student2@mail.com', 'e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a', 'Pietro', 'Compri', 'U2FsdGVkX1/5J9UEhi4PvesX2LFK6MseVhnvFYrPr+A=', 'U2FsdGVkX1/XT7AtfadfPbOS/1mKDZmPrvqZLATS1PM=', 'U2FsdGVkX1/5RDEhuyvYc44ZBZxqI7MvuULEtNbnhgBcmldMg3mkC9R2CAi2zxdL99TDhd6F/P2BCr4r7Hn+Bg==', 0),
(3, 'U2FsdGVkX18kGEZpOUK5eW1CEmk1EBOrJJrqNqQ/c5c3D1rq6ZeA/SEyTcWnD2Zw', 'Student3', 'student3@mail.com', 'e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a', 'Giovanni', 'Paoli', 'U2FsdGVkX1+go4QttyMN2vMbI/n1elpRt6Lae8oRo6o=', 'U2FsdGVkX1+59zNNxJdlJ6OOIwhquZbw74a6tFcuixo=', 'U2FsdGVkX19W1QK7SbwyD6MgYB1NQe9+CHoWxRQlPPUbwcxpr07nSpB+wMCHGobA', 0),
(4, 'U2FsdGVkX19L21id+geyNA1iFCLp7kMKV3tCkpqzE0vLb6mBuZ+zuI6F1XbOmTk2', 'Student4', 'student4@mail.com', 'e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a', 'Sara', 'Azzoni', 'U2FsdGVkX1+HXPsNgOc9KEm6A2YI2PGPZB7BGUvs6U8=', 'U2FsdGVkX18ijo+OzeWuQ41WDdKRJEXy9IjCcGWDVrs=', 'U2FsdGVkX1/HA1V6Ke3lrKeimigSFfWhoLDyS5la5FYjfSCnYEShtoTyf1VaUOjG', 0);

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

--
-- Dump dei dati per la tabella `study_address`
--

INSERT INTO `study_address` (`id`, `italian_title`, `english_title`, `italian_description`, `english_description`) VALUES
('ATS', 'Animazione Turistico-Sportiva', 'Tourist-Sports Animation', NULL, NULL),
('BIO', 'Biotecnologie sanitarie', 'Health biotechnology', '<h2>Istituto tecnologico per le biotecnologie sanitarie</h2>\r\n<p>Se per anni hai chiesto in regalo un microscopio e vorresti poter analizzare sempre tutto, allora l’Istituto Tecnologico per le Biotecnologie Sanitarie è la scuola giusta per te!\r\n\r\nÈ la scelta ideale per chi è interessato alla tutela della salute dell\'uomo e all\'equilibrio degli ambienti naturali, a chi vuole conoscere le principali tecnologie sanitarie nel campo biomedicale, farmaceutico e alimentare e incrementare lo sviluppo sostenibile.</p>', '<h2>Technological Institute for Health Biotechnology</h2>\r\n<p>If you have been asking for a microscope for years and would like to be able to analyse everything all the time, then the Technological Institute for Health Biotechnology is the right school for you!\r\n\r\nIt is the ideal choice for anyone interested in the protection of human health and the balance of natural environments, for those who want to learn about key health technologies in the biomedical, pharmaceutical and food fields and to increase sustainable development.</p>'),
('ODO', 'Odontotecnico', 'Dental technician', '<h2>Istituto professionale per odontotecnici</h2>\r\n<p>L’Istituto professionale per odontotecnici è un percorso scolastico professionalizzante, che ti permette di sviluppare abilità manuali nella modellazione e disegno. È un indirizzo dove teoria e pratica sono bilanciate: imparerai a gestire tutto il processo di realizzazione degli apparecchi ortodontici, dalla progettazione alla creazione delle protesi fisse e mobili.</p>', '<h2>Professional Institute for Dental Technicians</h2>\r\n<p>The Professional Institute for Dental Technicians is a vocational school course, which allows you to develop manual skills in modelling and design. It is a course where theory and practice are balanced: you will learn to manage the entire process of making orthodontic appliances, from design to the creation of fixed and removable prostheses.</p>'),
('TUR', 'Turismo', 'Tourism', '<h2>Istituto tecnico turistico quadriennale</h2>\r\n<p>Se il turismo ti affascina e senti che la promozione del territorio potrebbe essere la tua strada, l’Istituto Tecnico Turistico Quadriennale è la scuola che fa per te! Sviluppa le competenze per lavorare nelle imprese del settore turistico, per tutelare e valorizzarere il territorio, e per prepararti all’università.</p>', '<h2>Four-year technical tourism institute</h2>\r\n<p>If tourism fascinates you and you feel that promoting the territory could be your path, the four-year Technical Tourism Institute is the school for you! Develop the skills to work in businesses in the tourism sector, to protect and enhance the local area, and to prepare you for university.</p>');

-- --------------------------------------------------------

--
-- Struttura della tabella `study_year`
--

CREATE TABLE `study_year` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `study_year`
--

INSERT INTO `study_year` (`id`) VALUES
(1),
(2),
(3),
(4),
(5);

-- --------------------------------------------------------

--
-- Struttura della tabella `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `cf` varbinary(64) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varbinary(64) NOT NULL,
  `name` varchar(75) NOT NULL,
  `surname` varchar(75) NOT NULL,
  `gender` varbinary(44) NOT NULL,
  `birth_date` varbinary(44) NOT NULL,
  `address` varbinary(384) NOT NULL,
  `google` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `teacher`
--

INSERT INTO `teacher` (`id`, `cf`, `username`, `email`, `password`, `name`, `surname`, `gender`, `birth_date`, `address`, `google`) VALUES
(1, 'U2FsdGVkX18tZtTcMyTGY8FcT5BuOEeSWPwj+f0q2LBuCgEzqw0XLK3J6r0jwcWi', 'Teacher1', 'teacher1@mail.com', 'e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a', 'Francesco', 'Bianchi', 'U2FsdGVkX1/5J9UEhi4PvesX2LFK6MseVhnvFYrPr+A=', 'U2FsdGVkX18Ga0SI9mVf5jEodnBSJbn6cXhPlNhgA0g=', 'U2FsdGVkX1/3yGRkyjyq7eSuDiycBBA5JKFhDmans/lPLd+hD3cHjVUbIiT9V4ye', 0),
(2, 'U2FsdGVkX19ftz7Uvteyh3c/oB6Mf8pDYSbKqU2eMcjMd5aIVKVkF0VE4L4aKuC5', 'Teacher2', 'teacher2@mail.com', 'e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a', 'Anna', 'Mazzari', 'U2FsdGVkX1+HXPsNgOc9KEm6A2YI2PGPZB7BGUvs6U8=', 'U2FsdGVkX1/qk+TeOnfoouaXTtuk2laJF5GaD1eJh8w=', 'U2FsdGVkX18SNMYIxPO0rkIvDqnjVoRH2fTBzFZ4RpVuy9fT24/tnfPa36B6GmCj', 0),
(3, 'U2FsdGVkX19+i+4+n+ge/4fQih4HaYxP2n1rODhtKpeoj0WO9Qm3oDLk0Okb9l0a', 'Teacher3', 'teacher3@mail.com', 'e7cf3ef4f17c3999a94f2c6f612e8a888e5b1026878e4e19398b23bd38ec221a', 'Martina', 'Adami', 'U2FsdGVkX1+HXPsNgOc9KEm6A2YI2PGPZB7BGUvs6U8=', 'U2FsdGVkX1/iIKJ/NoP5eHSHhEMq95MjA0Ttwbvk6iU=', 'U2FsdGVkX18+bkapPbdjeRbPXR/ZaanVnJP98zUrhGrphIAyA0vDy6WX7/keE2Z4', 0);

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
-- Dump dei dati per la tabella `teaching`
--

INSERT INTO `teaching` (`id`, `italian_title`, `english_title`, `italian_description`, `english_description`) VALUES
('AT', 'Arte e territorio', 'Art and Territory', NULL, NULL),
('BMTCS', 'Biologia, microbiologia e tecnolgie di controllo sanitario', 'Biology, microbiology and health control technology', NULL, NULL),
('CAS', 'Chimica analitica e strumentale', 'Analytical and instrumental chemistry', NULL, NULL),
('CD', 'Competenza digitale', 'Digital competence', NULL, NULL),
('CHI', 'Scienze integrate (Chimica)', 'Integrated sciences (Chemisrty)', NULL, NULL),
('COB', 'Chimica organica e biochimica', 'Organic chemistry and biochemistry', NULL, NULL),
('DE', 'Diritto ed economia', 'Law and economics', NULL, NULL),
('DLT', 'Diritto e legislazione turistica', 'Tourism law and legislation', NULL, NULL),
('DMSL', 'Scienze dei materiali dentali e laboratorio', 'Dental Materials Science and Laboratory', NULL, NULL),
('DPCLS', 'Diritto e pratica commerciale, legislazione socio-sanitaria', 'Commercial law and practice, social and health legislation', NULL, NULL),
('DTA', 'Discipline turistiche e aziendali', 'Tourism and business disciplines', NULL, NULL),
('EA', 'Economia aziendale', 'Business economics', NULL, NULL),
('ELO', 'Esercitazioni di laboratorio di odontotecnica', 'Dental laboratory exercises', NULL, NULL),
('FIS', 'Scienze integrate (Fisica)', 'Integrated sciences (Physics)', NULL, NULL),
('GEO', 'Geografia', 'Geography', NULL, NULL),
('GNA', 'Gnatologia', 'Gnathology', NULL, NULL),
('GT', 'Geografia Turistica', 'Tourism geography', NULL, NULL),
('IAF', 'Igiene, Anatomia, Fisiologia', 'Hygiene, Anatomy, Physiology', NULL, NULL),
('IAFP', 'Igiene, Anatomia, Fisiologia, Patologia', 'Hygiene, Anatomy, Physiology, Pathology', NULL, NULL),
('INF', 'Informatica', 'Informatics', '<p>Qui lo studente imparerà ad conoscere il computer e la rete a cui è collegato.<br/>Inoltre avrà la possibilità di imparare molti linguaggi di programmazione</p>', '<p>Here the student will learn about the computer and the network to which it is connected.<br/>He will also have the opportunity to learn many programming languages</p>.'),
('ING', 'Inglese', 'English', NULL, NULL),
('ITA', 'Lingua e letteratura italiana', 'Italian language and literature', NULL, NULL),
('LS', 'Legislazione sanitaria', 'Health legislation', NULL, NULL),
('MAT', 'Matematica', 'Mathematics', NULL, NULL),
('RMO', 'Rappresentazione e modellazione di odontotecnica', 'Dental representation and modelling', NULL, NULL),
('SMS', 'Scienze motorie e sportive', 'Motor and sport sciences', NULL, NULL),
('STA', 'Scienze e tecnologie applicate', 'Applied sciences and technologies', NULL, NULL),
('STO', 'Storia', 'History', '<p>Insegnamento dove lo studente impara la storia del mondo attraverso i secoli</p>', '<p>Teaching where the student learns the history of the world through the ages</p>'),
('TB', 'Scienze integrate (Terra + Biologia)', 'Integrated sciences (Earth + Biology)', '<p>Studio della terra e della biologia naturale</p>', '<p>Study of earth and natural biology</p>'),
('TED', 'Tedesco', 'German', NULL, NULL),
('TI', 'Tecnologie informatiche', 'Information technology', NULL, NULL),
('TIC', 'Tecnologie dell\'informazione e della comunicazione', 'Information and communication technology', NULL, NULL),
('TL', 'Terza lingua', 'Third language', NULL, NULL),
('TTRG', 'Tecnologie e tecniche di rappresentazione grafica', 'Graphic representation technologies and techniques', NULL, NULL);

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
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

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
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

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
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `announcement`
--
ALTER TABLE `announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `citizenship_report`
--
ALTER TABLE `citizenship_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT per la tabella `learning_block`
--
ALTER TABLE `learning_block`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `learning_context`
--
ALTER TABLE `learning_context`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `personal_growth_area`
--
ALTER TABLE `personal_growth_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
