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
  `main_study_year` tinyint(1) NOT NULL DEFAULT 0,
  `learning_context_id` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `accessible`
--

INSERT INTO `accessible` (`course_id`, `study_year_id`, `study_address_id`, `presidium`, `main_study_year`, `learning_context_id`) VALUES
(1, 1, 'BIO', 1, 0, 'SPE'),
(1, 1, 'ODO', 0, 0, 'SPE'),
(1, 1, 'TUR4', 0, 0, 'SPE'),
(2, 1, 'BIO', 1, 0, 'SPE'),
(2, 1, 'ODO', 0, 0, 'SPE'),
(2, 1, 'TUR4', 0, 0, 'SPE'),
(3, 1, 'BIO', 1, 0, 'SPE'),
(3, 1, 'ODO', 1, 0, 'SPE'),
(3, 1, 'TUR4', 0, 0, 'SPE'),
(4, 1, 'BIO', 0, 0, 'SPE'),
(4, 1, 'ODO', 1, 0, 'SPE'),
(4, 1, 'TUR4', 0, 0, 'SPE'),
(5, 1, 'BIO', 0, 0, 'SPE'),
(5, 1, 'ODO', 1, 0, 'SPE'),
(5, 1, 'TUR4', 0, 0, 'SPE'),
(6, 1, 'BIO', 1, 0, 'PER'),
(6, 1, 'ODO', 0, 0, 'PER'),
(6, 1, 'TUR4', 0, 0, 'PER'),
(7, 1, 'BIO', 0, 0, 'SPE'),
(7, 1, 'ODO', 0, 0, 'SPE'),
(7, 1, 'TUR4', 1, 0, 'SPE'),
(8, 1, 'BIO', 0, 0, 'PER'),
(8, 1, 'ODO', 1, 0, 'PER'),
(8, 1, 'TUR4', 0, 0, 'PER'),
(9, 1, 'BIO', 0, 0, 'PER'),
(9, 1, 'ODO', 1, 0, 'PER'),
(9, 1, 'TUR4', 0, 0, 'PER'),
(10, 1, 'BIO', 0, 0, 'SPE'),
(10, 1, 'ODO', 0, 0, 'SPE'),
(10, 1, 'TUR4', 1, 0, 'SPE'),
(11, 1, 'BIO', 1, 0, 'SPE'),
(11, 1, 'ODO', 0, 0, 'SPE'),
(11, 1, 'TUR4', 0, 0, 'SPE'),
(12, 1, 'BIO', 1, 0, 'SPE'),
(12, 1, 'ODO', 0, 0, 'SPE'),
(12, 1, 'TUR4', 0, 0, 'SPE'),
(13, 1, 'BIO', 0, 0, 'SPE'),
(13, 1, 'ODO', 0, 0, 'SPE'),
(13, 1, 'TUR4', 1, 0, 'SPE'),
(14, 1, 'BIO', 1, 0, 'SPE'),
(14, 1, 'ODO', 0, 0, 'SPE'),
(14, 1, 'TUR4', 0, 0, 'SPE'),
(15, 1, 'BIO', 0, 0, 'SPE'),
(15, 1, 'ODO', 0, 0, 'SPE'),
(15, 1, 'TUR4', 1, 0, 'SPE'),
(16, 1, 'BIO', 0, 0, 'SPE'),
(16, 1, 'ODO', 1, 0, 'SPE'),
(16, 1, 'TUR4', 0, 0, 'SPE'),
(17, 1, 'BIO', 0, 0, 'PER'),
(17, 1, 'ODO', 0, 0, 'PER'),
(17, 1, 'TUR4', 1, 0, 'PER'),
(18, 1, 'BIO', 0, 0, 'SPE'),
(18, 1, 'ODO', 0, 0, 'SPE'),
(18, 1, 'TUR4', 0, 0, 'SPE'),
(19, 1, 'BIO', 0, 0, 'SPE'),
(19, 1, 'ODO', 0, 0, 'SPE'),
(19, 1, 'TUR4', 1, 0, 'SPE'),
(20, 1, 'BIO', 1, 0, 'SPE'),
(20, 1, 'ODO', 0, 0, 'SPE'),
(20, 1, 'TUR4', 0, 0, 'SPE'),
(20, 2, 'BIO', 1, 0, 'SPE'),
(20, 2, 'ODO', 0, 0, 'SPE'),
(20, 2, 'TUR4', 0, 0, 'SPE'),
(21, 1, 'BIO', 0, 0, 'SPE'),
(21, 1, 'ODO', 0, 0, 'SPE'),
(21, 1, 'TUR4', 1, 0, 'SPE'),
(21, 2, 'BIO', 0, 0, 'SPE'),
(21, 2, 'ODO', 0, 0, 'SPE'),
(21, 2, 'TUR4', 1, 0, 'SPE'),
(22, 1, 'BIO', 0, 0, 'SPE'),
(22, 1, 'ODO', 0, 0, 'SPE'),
(22, 1, 'TUR4', 1, 0, 'SPE'),
(23, 1, 'BIO', 0, 0, 'SPE'),
(23, 1, 'ODO', 0, 0, 'SPE'),
(23, 1, 'TUR4', 1, 0, 'SPE'),
(24, 1, 'BIO', 1, 0, 'SPE'),
(24, 1, 'ODO', 0, 0, 'SPE'),
(24, 1, 'TUR4', 0, 0, 'SPE'),
(25, 1, 'BIO', 0, 0, 'SPE'),
(25, 1, 'ODO', 0, 0, 'SPE'),
(25, 1, 'TUR4', 1, 0, 'SPE');

-- --------------------------------------------------------

--
-- Struttura della tabella `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `cf` varbinary(64),
  `username` varchar(50) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varbinary(64) NOT NULL,
  `name` varchar(75) NOT NULL,
  `surname` varchar(75) NOT NULL,
  `gender` varbinary(44),
  `birth_date` varbinary(44),
  `address` varbinary(384),
  `google` tinyint(1) NOT NULL,
  `first_access` tinyint(1) NOT NULL DEFAULT 1,
  `assets` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `admin`
--

INSERT INTO `admin` (`id`, `cf`, `username`, `email`, `password`, `name`, `surname`, `gender`, `birth_date`, `address`, `google`, `first_access`, `assets`) VALUES
(1, NULL, 'admin', 'fronzapietro@gmail.com', 'f993b5bf51459b7352a2906633481b14c476214ac3ce5d2cb51ee60e8e8a4314', 'Pietro', 'Fronza', NULL, NULL, NULL, 0, 0, '/assets/users/admins/admin'),
(2, NULL, 'claudio.march', 'march@istitutodecarneri.it', '82c60bb8db450ea353c08247ec3fd0642c2d7293d211ea88a7466bce0b3c4628', 'Claudio', 'March', NULL, NULL, NULL, 0, 0, '/assets/users/admins/march');

-- --------------------------------------------------------

--
-- Struttura della tabella `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `publisher_id` int(11) NOT NULL,
  `is_admin` tinyint(1) DEFAULT 0,
  `project_class_course_id` int(11) NOT NULL,
  `project_class_session` int(11) NOT NULL,
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
(1, 'ING'),
(2, 'ING'),
(3, 'MAT'),
(4, 'MAT'),
(5, 'CHI'),
(6, 'TTRG'),
(7, 'TB'),
(8, 'ELO'),
(9, 'ELO'),
(10, 'MAT'),
(11, 'ITA'),
(12, 'STO'),
(13, 'ING'),
(14, 'TB'),
(15, 'TED'),
(16, 'DE'),
(17, 'INF'),
(18, 'ITA'),
(19, 'GEO'),
(20, 'IAF'),
(21, 'TB');
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
(1, 1, 'BIO', 2023, 'A'),
(2, 1, 'BIO', 2023, 'A'),
(3, 1, 'BIO', 2023, 'A'),
(4, 1, 'BIO', 2023, 'A'),
(5, 1, 'BIO', 2023, 'A'),
(6, 1, 'BIO', 2023, 'A'),
(7, 1, 'BIO', 2023, 'A'),
(8, 1, 'BIO', 2023, 'A'),
(9, 1, 'BIO', 2023, 'A'),
(10, 1, 'BIO', 2023, 'A'),
(11, 1, 'BIO', 2023, 'A'),
(12, 1, 'BIO', 2023, 'A'),
(13, 1, 'BIO', 2023, 'A'),
(14, 1, 'BIO', 2023, 'A'),
(15, 1, 'BIO', 2023, 'A'),
(16, 1, 'BIO', 2023, 'A'),
(17, 1, 'BIO', 2023, 'A'),
(18, 1, 'BIO', 2023, 'A'),
(19, 1, 'BIO', 2023, 'A'),
(20, 1, 'BIO', 2023, 'A'),
(21, 1, 'BIO', 2023, 'A'),
(22, 1, 'BIO', 2023, 'A'),
(23, 1, 'ODO', 2023, 'A'),
(24, 1, 'ODO', 2023, 'A'),
(25, 1, 'ODO', 2023, 'A'),
(26, 1, 'ODO', 2023, 'A'),
(27, 1, 'ODO', 2023, 'A'),
(28, 1, 'ODO', 2023, 'A'),
(29, 1, 'ODO', 2023, 'A'),
(30, 1, 'ODO', 2023, 'A'),
(31, 1, 'ODO', 2023, 'A'),
(32, 1, 'ODO', 2023, 'A'),
(33, 1, 'ODO', 2023, 'A'),
(34, 1, 'ODO', 2023, 'A'),
(35, 1, 'ODO', 2023, 'A'),
(36, 1, 'ODO', 2023, 'A'),
(37, 1, 'ODO', 2023, 'A'),
(38, 1, 'ODO', 2023, 'A'),
(39, 1, 'ODO', 2023, 'A'),
(40, 1, 'ODO', 2023, 'A'),
(41, 1, 'ODO', 2023, 'A'),
(42, 1, 'ODO', 2023, 'A'),
(43, 1, 'ODO', 2023, 'A'),
(44, 1, 'TUR4', 2023, 'A'),
(45, 1, 'TUR4', 2023, 'A'),
(46, 1, 'TUR4', 2023, 'A'),
(47, 1, 'TUR4', 2023, 'A'),
(48, 1, 'TUR4', 2023, 'A'),
(49, 1, 'TUR4', 2023, 'A'),
(50, 1, 'TUR4', 2023, 'A'),
(51, 1, 'TUR4', 2023, 'A'),
(52, 1, 'TUR4', 2023, 'A'),
(53, 1, 'TUR4', 2023, 'A'),
(54, 1, 'TUR4', 2023, 'A'),
(55, 1, 'TUR4', 2023, 'A'),
(56, 1, 'TUR4', 2023, 'A'),
(57, 1, 'TUR4', 2023, 'A'),
(58, 1, 'TUR4', 2023, 'A'),
(59, 1, 'TUR4', 2023, 'A'),
(60, 1, 'TUR4', 2023, 'A'),
(61, 1, 'TUR4', 2023, 'A'),
(62, 1, 'TUR4', 2023, 'A'),
(63, 1, 'TUR4', 2023, 'A'),
(64, 1, 'TUR4', 2023, 'A'),
(65, 1, 'TUR4', 2023, 'A');
-- --------------------------------------------------------

--
-- Struttura della tabella `characterize`
--

CREATE TABLE `characterize` (
  `course_id` int(11) NOT NULL,
  `growth_area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `characterize`
--

INSERT INTO `characterize` (`course_id`, `growth_area_id`) VALUES
(1, 1),
(2, 1),
(2, 6),
(3, 2),
(3, 3),
(4, 2),
(5, 1),
(5, 2),
(5, 4),
(6, 1),
(6, 6),
(7, 1),
(7, 2),
(7, 5),
(7, 6),
(8, 1),
(8, 2),
(9, 1),
(9, 5),
(10, 2),
(11, 1),
(11, 2),
(12, 2),
(13, 2),
(14, 1),
(14, 4),
(15, 2),
(16, 2),
(16, 6),
(17, 2),
(18, 1),
(18, 2),
(19, 2),
(19, 4),
(20, 2),
(20, 4),
(20, 5),
(20, 6),
(21, 4),
(21, 5),
(21, 6),
(22, 2),
(23, 2),
(24, 1),
(25, 1);

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

-- INSERT INTO `citizenship_report` (`id`, `student_id`, `delivery`, `certifying_admin_id`, `admin_confirmation`, `start`, `hours`, `experience_place`, `referent_sign`) VALUES
-- (3, 1, '2023-04-02', 1, '2023-04-03', '2022-04-27', 11, 'Via Giovanni Segantini 16, Trento, TN', 'Firma'),
-- (4, 2, '2023-04-04', NULL, NULL, '2023-02-01', 11, 'Via Marconi 16 Castel d\'Azzano, VR', 'Firma 2');

-- --------------------------------------------------------

--
-- Struttura della tabella `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `italian_title` varchar(250) NOT NULL,
  `english_title` varchar(250) NOT NULL,
  `creation_school_year` int(11) NOT NULL,
  `italian_description` varchar(1000) NOT NULL,
  `english_description` varchar(1000) NOT NULL,
  `up_hours` int(11) NOT NULL,
  `credits` int(11) NOT NULL,
  `italian_expected_learning_results` varchar(2000) NOT NULL,
  `english_expected_learning_results` varchar(2000) NOT NULL,
  `italian_criterions` varchar(2000) NOT NULL,
  `english_criterions` varchar(2000) NOT NULL,
  `italian_activities` varchar(2000) NOT NULL,
  `english_activities` varchar(2000) NOT NULL,
  `learning_area_id` varchar(5) NOT NULL,
  `min_students` int(11) NOT NULL,
  `max_students` int(11) NOT NULL,
  `proposer_teacher_id` int(11) NOT NULL,
  `certifying_admin_id` int(11) DEFAULT NULL,
  `admin_confirmation` date DEFAULT NULL,
  `to_be_modified` tinyint(1) DEFAULT NULL,
  `assets` varchar(1000)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `course`
--

INSERT INTO `course` (`id`, `italian_title`, `english_title`, `creation_school_year`, `italian_description`, `english_description`, `up_hours`, `credits`, `italian_expected_learning_results`, `english_expected_learning_results`, `italian_criterions`, `english_criterions`, `italian_activities`, `english_activities`, `learning_area_id`, `min_students`, `max_students`, `proposer_teacher_id`, `certifying_admin_id`, `admin_confirmation`, `to_be_modified`, `assets`) VALUES
(1, 'Sport. Gioco perché penso', 'Sport. I think therefore I play', '2023', '<p>Cos\'&egrave lo sport? Perch&egrave pratichiamo sport? Quali sono i benefici dello sport?</p>', '<p>What is Sport? Why do we play? What are the benefits of sport?</p>', 0, 2, '<p>Il percorso in lingua inglese ha lo scopo, sia di migliorare le abilità linguistiche del gruppo classe, sia di sollecitare l’interesse e la curiosità di studenti e studentesse verso un elemento cardine della nostra quotidianità: lo sport. Cos’è lo sport? Cosa lo distingue dal gioco? Perch&egrave &egrave così capillarmente diffuso nelle società umane? Il biliardo è uno sport? Sono alcune domande alle quali si cercherà di dare una risposta. Attraverso brevi video, il dialogo in classe, l’esperienza diretta, citazioni di frasi, l’analisi di contributi artistici e alcuni testi di riferimento, il percorso ha lo scopo di rendere gli studenti maggiormente consapevoli delle motivazioni che ci portano, quasi istintivamente, a giocare e praticare sport. Inoltre, si ritiene utile riflettere sui benefici dello sport sotto l’aspetto, sia fisico, sia psicologico. Uno spazio del progetto sarà anche dedicato alla riflessione su categorie fondanti dello sport come la motivazione, l’impegno e l’atten', '<p>The English language course aims, both to improve the language skills of the class group, and to arouse the interest and curiosity of male and female students towards a pivotal element of our everyday life: sports. What is sport? What distinguishes it from game? Why is it so spread in human societies? Is pool a sport? These are some questions that will be attempted to be answered. Through short videos, in-class dialogue, direct experience, quotations of phrases, analysis of artistic contributions and some reference texts, the course aims to make students more aware of the motivations that lead us, almost instinctively, to play and practice sports. In addition, it is considered useful to reflect on the benefits of sports from the aspect, both physical and psychological. A space in the project will also be devoted to reflecting on such foundational categories of sports as motivation, commitment and focus and their positive effects in the education of the person.</p>', '<p>Svolgimento test in itinere e compito conclusivo. Saranno valutati i progressi ottenuti nell\'ambito delle abilità comunicative, dell’ampliamento del lessico e delle competenze acquisite. Saranno oggetto di valutazione anche la puntualità e la cura nello svolgere i compiti assegnati, gli interventi personali e il supporto al lavoro dei compagni. Presenza almeno 60% ore.</p>', '<p>In-course test and final task. Progress in communication skills, vocabulary expansion and acquired skills will be assessed. Punctuality and care in carrying out assigned tasks, personal interventions and support for classmates\' work will also be assessed. Attendance at least 60% hours.</p>', '<p>Le attivit&agrave; in classe saranno orientate a sollecitare l\'esposizione orale in lingua inglese, privilegiando il contenuto piuttosto che la correttezza grammaticale. Si far&agrave; quindi largo uso della lezione dialogata e dell\'apprendimento attraverso la partecipazione in prima persona.&nbsp;</p><p>Nello specifico la metodologia sar&agrave; la seguente:</p><ul><li>Brainstorming;</li><li>Lezioni partecipate e dialogate con immagini e video;</li><li>Reading and Comprehension;</li><li>Listening and Speaking activities;</li><li>Lavori a coppie;</li><li>Uso di strumenti informatici;</li><li>Ricerche e approfondimenti individuali;</li><li>Uso di mappe concettuali;</li><li>Piccoli lavori di gruppo;</li><li>Esercizio alla pratica dell&rsquo;esposizione orale;</li><li>Inquiry Based Learning;</li><li>Flipped Classroom;</li><li>Problem solving.</li></ul>', '<p>Classroom activities will be focused on soliciting oral exposition in English, emphasizing content rather than grammatical correctness. Therefore, extensive use will be made of the dialogic lesson and learning through first-person participation. <br />Specifically, the methodology will be as follows:</p><ul><li>Brainstorming;</li><li>Participatory and dialogic teaching;</li><li>Pictures and videos;</li><li>Reading and Comprehension;</li><li>Listening and Speaking activities;</li><li>Pair work;</li><li>Use of computer tools;</li><li>Individual research and in-depth study;</li><li>Use of concept maps;</li><li>Small group work;</li><li>Exercise in oral expository practice;</li><li>Inquiry Based Learning;</li><li>Flipped Classroom;</li><li>Problem solving.</li></ul>', 'COM', 18, 22, 2, 2, '2023-09-14', NULL, '/assets/courses/course_1'),
(2, 'Cyberbullismo – Impariamo a difenderci', 'Cyberbullying – Let\'s learn to protect ourselves', '2023', '<p>Cos\'&egrave; il cyberbullismo? Possiamo difenderci? S&igrave;!</p>', '<p>What is Cyberbullying? Can we protect ourselves from it? Yes!</p>', 0, 2, '<p>Con la frequenza del corso conoscerai le caratteristiche del cyberbullismo e cosa lo distingue dal bullismo off-line, imparerai e individuerai le strategie di autodifesa per un utilizzo pi&ugrave; sereno della rete e dell\'universo social; migliorerai inoltre le tue abilit&agrave; e capacit&agrave; di comprensione e comunicazione in lingua inglese.&nbsp;</p><p>Analizzerai anche alcune forme di cyberbullismo passivo, che ci rendono talvolta partecipanti inconsapevoli di atti di bullismo on line.&nbsp;</p><p>Attraverso lo studio di casi singoli, brevi video, il dialogo in classe, l&rsquo;esperienza diretta, l&rsquo;analisi di contributi artistici e la presa in esame degli strumenti legislativi di tutela contro il bullismo, il percorso ha lo scopo sia di renderti maggiormente consapevole delle conseguenze dei comportamenti nella vostra vita digitale, sia di acquisire consapevolezza sulle iniziative a tua tutela.</p>', '<p>By attending this course you will learn about the characteristics of cyberbullying and what distinguishes it from off-line bullying; you will learn and identify self-defense strategies for a more serene use of the Web and the social universe; and you will improve your English language comprehension and communication skills and abilities. <br />You will also analyze some forms of passive cyberbullying, which sometimes make us unwitting participants in online bullying. <br />Through individual case studies, short videos, in-class dialogue, direct experience, analysis of artistic contributions, and consideration of legislative tools for protection against bullying, the course aims both to make you more aware of the consequences of behavior in your digital life and to gain awareness of initiatives to protect you.</p>', '<p>Svolgimento test in itinere e compito conclusivo.</p><p>Saranno valutati i progressi ottenuti nell\'ambito delle abilit&agrave; comunicative, dell&rsquo;ampliamento del lessico e delle competenze acquisite.</p><p>Saranno oggetto di valutazione anche la puntualit&agrave; e la cura nello svolgere i compiti assegnati, gli interventi personali e il supporto al lavoro dei compagni.</p><p>Presenza almeno 60% ore.</p>', '<p>In-course test and final task.<br />Progress in communication skills, vocabulary expansion and acquired skills will be assessed.<br />Punctuality and care in carrying out assigned tasks, personal interventions and support for classmates\' work will also be assessed.<br />Attendance at least 60% hours.</p>', '<p>Le attivit&agrave; in classe saranno orientate a sollecitare l\'esposizione orale in lingua inglese, privilegiando il contenuto piuttosto che la correttezza grammaticale. Si far&agrave; quindi largo uso della lezione dialogata e dell\'apprendimento attraverso la partecipazione in prima persona.&nbsp;</p><p>Nello specifico la metodologia sar&agrave; la seguente:</p><ul><li>Brainstorming;</li><li>Lezioni partecipate e dialogate con immagini e video;</li><li>Reading and Comprehension;</li><li>Listening and Speaking activities;</li><li>Lavori a coppie;</li><li>Uso di strumenti informatici;</li><li>Ricerche e approfondimenti individuali;</li><li>Uso di mappe concettuali;</li><li>Piccoli lavori di gruppo;</li><li>Esercizio alla pratica dell&rsquo;esposizione orale;</li><li>Inquiry Based Learning;</li><li>Flipped Classroom;</li><li>Problem solving.</li></ul>', '<p>Classroom activities will be focused on soliciting oral exposition in English, emphasizing content rather than grammatical correctness. Therefore, extensive use will be made of the dialogic lesson and learning through first-person participation. <br />Specifically, the methodology will be as follows:</p><ul><li>Brainstorming;</li><li>Participatory and dialogic teaching;</li><li>Pictures and videos;</li><li>Reading and Comprehension;</li><li>Listening and Speaking activities;</li><li>Pair work;</li><li>Use of computer tools;</li><li>Individual research and in-depth study;</li><li>Use of concept maps;</li><li>Small group work;</li><li>Exercise in oral expository practice;</li><li>Inquiry Based Learning;</li><li>Flipped Classroom;</li><li>Problem solving.</li></ul>', 'COM', 18, 22, 2, 2, '2023-09-14', NULL, '/assets/courses/course_2'),
(3, 'Poligoni stellati e messaggi segreti', 'Star Polygons and secret message', '2023', '<p>1, 2, 3, 4, 5, &hellip;. A che et&agrave; hai cominciato a contare?&nbsp;</p><p>Potr&agrave; sembrarti strano ma questi numeri ti possono ancora sorprendere!</p><p>Partendo da un approccio grafico, che tu stesso andrai a disegnare, analizzeremo il concetto di numero primo e di numero composto, ragioneremo su alcune propriet&agrave; dei numeri e rifletteremo su alcuni problemi ancora senza risposta della matematica.&nbsp;</p><p>Chiss&agrave; se avete mai provato a scrivere un messaggio segreto; la matematica &egrave; anche per questo!</p>', '<p>1, 2, 3, 4, 5, &hellip; At what age did you start counting?</p><p>It may seem strange to you but these numbers can still surprise you!</p><ul><li>Graphical approach designed by yourself.</li><li>Analysis of the concept of prime number and composite number.</li><li>Reflections on some still unanswered problems in mathematics.</li><li>Creating a secret code to write messages.</li></ul><p>Here&rsquo;s what awaits you!</p>', 0, 2, '<p>Seguendo questo corso sarai in grado di:</p><ul><li>Rappresentare poligoni stellati partendo da un poligono a n lati e utilizzare la corretta nomenclatura.</li><li>Riconoscere un poligono stellato semplice, un poligono stellato composto e un poligono degenere.</li><li>Dedurre quanti poligoni stellati si possono ottenere da un poligono a n lati.</li><li>Distinguere un numero primo da un numero composto e conoscere i criteri di divisibilit&agrave; e le condizioni di primariet&agrave;.</li><li>Presentare dei problemi aperti riguardante i numeri primi.</li><li>Codificare e decodificare un messaggio segreto con il metodo impiegato da Giulio Cesare e altri metodi semplici.</li></ul><p>Percepire la matematica come un prodotto del pensiero umano che evolve nel tempo</p>', '<p>By following this course you will be able to:</p><ul><li>Represent star polygons starting from a n-sided polygon and use the correct nomenclature. </li><li>Recognize a simple starry polygon, a compound starry polygon and a degenerate polygon. </li><li>Deduce how many star polygons can be obtained from a n-sided polygon. </li><li>Distinguish a prime number from a compound number and know the criteria of divisibility & agrave; and the conditions of primary & agrave;. </li><li>Presenting open issues regarding prime numbers. </li><li>Encode and decode a secret message with the method employed by Julius Caesar and other simple methods. </li></ul><p>Perceiving mathematics as a product of human thought evolving over time</p>', '<p>Test a risposta multipla e a completamento sui nuclei essenziali affrontati nel percorso didattico.</p>', '<p>Multiple-choice and completetion tests on the essential nuclei addressed in the educational path.</p>', '<p>Seguendo questo corso sarai in grado di:</p><ul><li>Rappresentare poligoni stellati partendo da un poligono a n lati e utilizzare la corretta nomenclatura.</li><li>Riconoscere un poligono stellato semplice, un poligono stellato composto e un poligono degenere.</li><li>Dedurre quanti poligoni stellati si possono ottenere da un poligono a n lati.</li><li>Distinguere un numero primo da un numero composto e conoscere i criteri di divisibilit&agrave; e le condizioni di primariet&agrave;.</li><li>Presentare dei problemi aperti riguardante i numeri primi.</li><li>Codificare e decodificare un messaggio segreto con il metodo impiegato da Giulio Cesare e altri metodi semplici.</li><li>Percepire la matematica come un prodotto del pensiero umano che evolve nel tempo.</li></ul>', '<p>This activity explores certain properties of natural numbers, particularly related to the concepts of primality and divisibility. These are fundamental concepts that underpin countless applications in various fields of human activities, from art to computer science.</p><p>It begins with an artistic perspective, examining the mosaics of the Alhambra, initially representing star polygons obtainable from regular polygons and then analyzing the results in tables and generalizing the observations made (PBL - Problem-Based Learning).</p><p>Next, the concepts of prime and composite numbers are revisited, and the criteria for divisibility are reviewed and expanded upon. Starting from these considerations, mathematics is seen as the product of the human intellect, which is not static but constantly evolving and expanding.</p><p>The course concludes with insights into cryptography, where historical encoding and decoding methods are analyzed and tested, and attempts are made to develop new ones (Experiential Learning).</p>', 'SM', 1, 22, 4, 2, '2023-09-14', NULL, '/assets/courses/course_3'),
(4, 'Tutti diamo i numeri.', 'Tutti diamo i numeri.', '2023', '<p>La capacit&agrave; di calcolo &egrave; fondamentale in ogni aspetto della vita, dall\'ambito finanziario al quotidiano. Il calcolo mentale e con strumenti &egrave; essenziale per prendere decisioni informate, risolvere problemi complessi e comprendere il mondo che ci circonda. Con i numeri interi, razionali come frazioni e rappresentazioni decimali, si acquisiscono competenze matematiche cruciali per la vita,&nbsp; ed interpretando dati e miglioriamo la precisione nel pensiero critico oltre alla capacit&agrave; di&nbsp; gestire le risorse.</p>', '<p>The ability to perform calculations is fundamental in every aspect of life, from financial matters to everyday tasks. Mental and tool-based calculation is essential for making informed decisions, solving complex problems, and understanding the world around us. Proficiency with whole numbers, rationals in the form of fractions, and decimal representations equips us with crucial life mathematical skills, enabling us to interpret data and enhance precision in critical thinking, along with resource management.</p>', 0, 2, '<p>Al termine del corso, lo studente dimostrer&agrave; abilit&agrave; nel calcolo mediante il riconoscimento e l\'applicazione di strategie di calcolo mentale, utilizzando metodi convenzionali con carta e penna, nonch&eacute; strumenti digitali. Sar&agrave; in grado di eseguire operazioni con numeri interi e razionali, comprendere le frazioni, sia nella loro forma scritta che nella rappresentazione decimale, dimostrando comprensione e precisione nel risolvere problemi matematici</p>', '<p>At the end of the course, the student will demonstrate proficiency in calculations through the recognition and application of mental calculation strategies, using conventional methods with paper and pencil, as well as digital tools. They will be able to perform operations with whole numbers and rationals, understand fractions, both in their written form and in decimal representation, demonstrating comprehension and precision in solving mathematical problems</p>', '<p>Frequenza di almeno 60% del corso</p><p>Test in itinere</p><p>Prova di competenza finale</p>', '<p>Frequenza di almeno 60% del corso</p><p>Test in itinere</p><p>Prova di competenza finale</p>', '<p>Frequenza di almeno 60% del corso</p><p>Test in itinere</p><p>L&rsquo;attivit&agrave; proposta si articola in&nbsp;momenti di calcolo, manuale e con strumenti, effettuati su numeri naturali, frazioni e numeri decimali, e in momenti di esplorazione e riflessione sulle propriet&agrave;.</p><p>Le attivit&agrave; proposte saranno in forma di gioco e problem solving su problemi reali</p><p>Verranno utilizzati dei fogli elettronici</p>', '<p>The proposed activity consists of moments of calculation, both manual and using tools, performed on natural numbers, fractions, and decimals, as well as moments of exploration and reflection on their properties. The activities will be in the form of games and problem-solving with real-world problems. Electronic spreadsheets will be used.</p>', 'SM', 18, 22, 6, 2, '2023-09-14', NULL, '/assets/courses/course_4'),
(5, 'Come “ non rompersi” a scuola', 'How to \'Keep It Together\' at School', '2023', '<p>\"Come non rompersi a scuola\"! Questo percorso d&rsquo;apprendimento &egrave; molto pi&ugrave; di una semplice lezione di sicurezza. &Egrave; una guida interattiva per esplorare il tuo ambiente scolastico in modo coinvolgente ed educativo. Imparerai non solo a conoscere la struttura della scuola, ma anche come affrontare situazioni di emergenza, comportarti in modo sicuro durante le uscite e navigare il mondo digitale in modo responsabile. Preparati per un\'avventura educativa che render&agrave; la tua esperienza scolastica pi&ugrave; informata e sicura che mai!</p>', '<p>\"Surviving School Safely\"! This learning journey is much more than a simple safety lesson. It\'s an interactive guide to explore your school environment in an engaging and educational way. You will not only learn about the school\'s structure but also how to handle emergency situations, behave safely during outings, and navigate the digital world responsibly. Get ready for an educational adventure that will make your school experience more informed and secure than ever before!</p>', 0, 2, '<p>Seguendo questo corso sarai in grado di conoscere la struttura della tua nuova scuola e tutti i simboli e i cartelli che incontrerai all&rsquo;interno dell&rsquo; edificio e nella tua classe</p><p>Sarai in grado di capire come comportarti in caso di pericolo o incidente</p><p>Imparerai come stare a scuola e come agire durante le uscite sul territorio&nbsp;</p><p>Sarai in grado di usare i social&nbsp; ed evitare pericoli sul web.</p>', '<p>Following this course you will be able to know the structure of your new school and all the symbols and signs that you will encounter at the & rsquo;building and in your classroom</p><p>You will be able to understand how to behave in case of danger or accident</p><p>You will learn how to stay in school and how to act during outings on the territory&nbsp;</p><p>You will be able to use the social&nbsp; and avoid dangers on the web. </p>', '<p>I criteri per superare il corso prevedono una frequenza di almeno il 60% ,</p><p>&nbsp;il superamento di un test finale a risposta multipla con almeno il 75% delle risposte corrette.</p><p>Determinante per la valutazione positiva del corso sono l&rsquo;impegno e una partecipazione attiva durante le lezioni</p>', '<p>I criteri per superare il corso prevedono una frequenza di almeno il 60% ,</p><p>&nbsp;il superamento di un test finale a risposta multipla con almeno il 75% delle risposte corrette.</p><p>To pass the course, you must:</p><p>Attend at least 60% of the sessions.</p><p>Achieve a minimum score of 75% on the final multiple-choice test.</p><p>Active participation and commitment during lessons are vital for a positive evaluation of the course.</p>', '<p>Il corso prevede una parte frontale in aula e un coinvolgimento diretto degli studenti tramite dibattito e attivit&agrave; di problem solving.</p><p>Per comprendere meglio alcuni aspetti del corso gli studenti dovranno affrontare alcuni studi di caso per comprendere come approcciarsi a determinati eventi o accadimenti</p>', '<p>The course includes a frontal part in the classroom and a direct involvement of students through debate and problem solving activities.</p><p>To better understand some aspects of the course, students will have to face some case studies to understand how to approach certain events</p>', 'SM', 18, 22, 7, 2, '2023-09-14', NULL, '/assets/courses/course_5'),
(6, 'Piccoli alchimisti', 'Little alchemists', '2023', '<p>The course includes a frontal part in the classroom and a direct involvement of students through debate and problem solving activities.</p><p>I profumi e i sapori delle piante aromatiche, gli oli essenziali e gli estratti vegetali come cura e mantenimento della salute. Partecipa e impara a conoscere il fascino e il potere della natura.</p>', '<p>The Fragrances and Flavors of Aromatic Plants, Essential Oils, and Plant Extracts for Health and Well-being.\" Join and learn to discover the charm and power of nature.</p>', 0, 3, '<p>Se ascolterai attentamente imparerai a conoscere la storia e i principi attivi di alcune delle pi&ugrave; diffuse piante officinali e capirai&nbsp; quali sono i benefici che alcuni estratti hanno sulla salute e come talvolta possano invece risultare velenosi</p><p>Imparerai cosa dona profumo e sapore a molte delle piante che ti circondano e vedrai come si estraggono queste sostanze con delle dimostrazioni in laboratorio imparando i nomi delle principali parti degli organi vegetali.</p>', '<p>If you listen carefully you will learn about the history and active ingredients of some of the most popular medicinal plants and understand what are the benefits that some extracts have on health and how they can sometimes turn out to be poisonous</p><p>You will learn what gives fragrance and flavor to many of the plants around you and you will see how these substances are extracted with demonstrations in the laboratory learning the names of the main parts of plant organs.</p>', '<p>I criteri per superare il corso prevedono una frequenza di almeno il 60% , il superamento di un test finale a risposta multipla con almeno il 75% delle risposte corrette.</p><p>Determinante per la valutazione positiva del corso sono l&rsquo;impegno e una partecipazione attiva durante le lezioni</p>', '<p>The criteria for passing the course include a frequency of at least 60% , passing a final multiple choice test with at least 75% of the correct answers.</p><p>Decisive for the positive evaluation of the course are the commitment and active participation during the lessons</p>', '<p>Il corso si svolge in laboratorio chimico biologico dove si affronteranno alcune lezioni&nbsp; teoriche preparatorie per poi applicare le conoscenze a pratiche di laboratorio come la distillazione in corrente di vapore per l&rsquo;estrazione di oli essenziali&nbsp; e la preparazione e&nbsp; l&rsquo;osservazione al microscopio ottico di alcune parti delle piante officinali che verranno direttamente&nbsp; eseguite dagli studenti suddivisi in piccoli gruppi . La maggior parte delle piante utilizzate saranno prelevate dal orto didattico della scuola che sar&agrave; visitato dal gruppo per comprendere&nbsp; l&rsquo;importanza che alcune specie vegetali hanno per la salute del ecosistema agricolo del nostro territorio</p>', '<p>he course takes place in a chemical-biological laboratory where some preparatory theoretical lessons will be covered before applying the knowledge to &nbsp;the students, divided into small groups. Most of the plants used will be harvested from the school\'s educational garden, which the group will visit to understand the importance of certain plant species for the health of our local agricultural ecosystem</p>', 'TEC', 18, 22, 7, 2, '2023-09-14', NULL, '/assets/courses/course_6'),
(7, 'Attenzione! Animali pericolosi in Trentino!', 'WARNING! Dangerous animals in Trentino!', '2023', '<p>Hai pi&ugrave; paura di una zanzara o di un orso? La risposta sembra facile, ma a pensarci bene forse non &egrave; cos&igrave; ovvio. In un mondo che sta cambiando sono arrivati alcuni animali pericolosi anche in Trentino oppure alcuni di loro lo sono diventati. Dobbiamo confrontarci con paure antiche e nuove, ma studiare e conoscere questi animali pu&ograve; aiutarci a gestire al meglio la situazione e limitare i danni&hellip;non perdere tempo e iscriviti subito, ci sono molte cose interessanti e utili da scoprire!</p>', '<p>Are you more afraid of a mosquito or a bear? The answer seems easy, but thinking about it maybe it\'s not so obvious. In a changing world, some dangerous animals have also arrived in Trentino while some of them have become threatening. We have to confront old and new fears, but studying and knowing these animals can help us to better manage the situation and limit the damage&hellip; don\'t hesitate and sign up now, there are many interesting and useful things to discover!</p>', 0, 2, '<p>Capire la differenza tra invertebrati e vertebrati (dalla loro anatomia di base al loro rapporto con l\'uomo), analizzare le problematiche determinate dai singoli animali, valutare in quale ambito possono risultare dannosi per noi (salute, economia,...), comprendere la correlazione tra la presenza di questi animali pericolosi in Trentino ed i cambiamenti climatici e l\'attivit&agrave; umana, ipotizzare soluzioni per eliminare o mitigare il problema su scala locale e globale.</p>', '<p>Understand the difference between invertebrates and vertebrates (from their basic anatomy to their relationship with humans), analyze the problems determined by individual animals, assess in which area they can be harmful to us (health, economy,...)understand the correlation between the presence of these dangerous animals in Trentino and climate change and human activity, hypothesize solutions to eliminate or mitigate the problem on a local and global scale.</p>', '<p>I criteri da soddisfare per ottenere il credito relativo a questo corso sono i seguenti: frequenza di partecipazione 60% minimo, rispetto della scadenze delle consegne, superamento del test finale con almeno il 60% delle risposte corrette.&nbsp; Impegno, coinvolgimento e partecipazione sono elementi che vengono presi in considerazioni e possono contribuire positivamente alla valutazione finale.</p>', '<p>The criteria in order to obtain credit for this course are as follows: attendance at least 60%, respect of delivery deadlines and passing the final test with at least 60% correct answers. Effort, engagement and participation are elements that are taken into consideration and can contribute positively to the final evaluation.</p>', '<p>Il corso prevede l&rsquo;utilizzo della lingua inglese per affrontare i temi proposti attraverso la metodologia CLIL. Questa include la possibilit&agrave; di discutere riguardo preconoscenze e curiosit&agrave; emergenti, di lavorare individualmente, a coppie e a gruppi, di utilizzare strumenti multimediali, di produrre lavori originali quali ricerche, presentazioni, video.&nbsp;</p><p>Per imparare in modo divertente e coinvolgente, useremo diverse tecniche speciali durante le lezioni. Ci saranno giochi interattivi, storie da risolvere insieme, video divertenti e tanto altro ancora. In questo modo, ogni lezione sar&agrave; un\'avventura nuova e interessante!</p>', '<p>The course offers the opportunity to discuss pre-knowledge and emerging curiosities, work individually, in pairs and groups, use digital tools, produce original works such as research, presentations, videos.</p><p>To make learning fun and engaging, we will use several special techniques during the lessons. There will be interactive games, stories to solve together, fun videos and much more. This way, every lesson will be a new and interesting adventure!</p>', 'SM', 14, 22, 9, 2, '2023-09-14', NULL, '/assets/courses/course_7'),
(8, 'Il sapore delle emozioni', 'The taste of emotions', '2023', '<p>Benvenuti a un viaggio emozionante attraverso il mondo dei colori, dei profumi e delle emozioni!</p><p>Questo modulo di apprendimento vi condurr&agrave; in un\'avventura unica, dove scopriremo come i colori e i profumi possono influenzare profondamente ci&ograve; che proviamo e come possiamo utilizzare questa conoscenza nella vita di tutti i giorni.</p><p>Sei pronto a metterti in gioco?</p>', '<p>Welcome to an exciting journey through the world of colors, scents, and emotions! This learning module will take you on a unique adventure where we will discover how colors and scents can profoundly influence what we feel and how we can use this knowledge in our everyday lives. Are you ready to get started?</p>', 0, 3, '<p>Seguendo questo corso sarai in grado di:</p><ul><li>Comprendere la teoria dei colori</li><li>Esplorare l&rsquo;importanza dei profumi nell&rsquo;esperienza umana</li><li>Investigare come i colori e i profumi possano influenzare le emozioni</li><li>Sperimentare in modo pratico la relazione fra colori, profumi ed emozioni</li></ul>', '<p>By following this course you will be able to:</p><ul><li>Understand color theory</li><li>Explore the importance of perfumes in the process;human experience</li><li>Investigating how colors and scents can affect emotions</li><li>Experimenting in a practical way the relationship between colors, scents and emotions</li></ul>', '<p>Frequenza minima di almeno il 60%</p><ul><li>Partecipazione attiva</li><li>Rispetto delle consegne delle attivit&agrave; assegnate</li><li>Realizzazione delle attivit&agrave; assegnate in gruppo o singolarmente</li></ul>', '<p>Minimum attendance of at least 60%</p><ul><li>Active participation</li><li>Adherence to assigned activity deadlines</li><li>Completion of assigned activities individually or in groups</li></ul>', '<p>Gli incontri avvengono seguendo la metodologia della lezione segmentata ripartita in:</p><ol type=\"a\"><li>Preconoscenza: per partire da quello che si sa con brainstorming iniziale o recupero delle&nbsp;preconoscenze</li><li>Lezione: per spiegare l&rsquo;argomento con momenti &ldquo;brevi&rdquo;, senza per&ograve; rinunciare alla&nbsp;complessit&agrave;</li><li>Attivit&agrave;: con esercizi operativi e collaborativi, per mettere in pratica, confrontarsi e&nbsp;riconoscere le eventuali difficolt&agrave;</li><li>Restituzione: per chiarire i dubbi, con la condivisione, i feedback e i chiarimenti circa le&nbsp;attivit&agrave; svolte</li><li>Conclusione: per fare il punto su quello che si &egrave; imparato, fornendo anche spunti e consigli&nbsp;di riflessione</li></ol>', '<p>The sessions follow a segmented lesson methodology, divided into:</p><ol type=\"a\"><li>Preknowledge: Starting from what is already known through initial brainstorming or recalling prior knowledge.</li><li>Lecture: Explaining the topic with concise segments, without sacrificing complexity.</li><li>Activity: Engaging in operational and collaborative exercises to put knowledge into practice, discuss, and identify potential challenges.</li><li>Feedback: Clarifying doubts through sharing, feedback, and explanations regarding the activities.</li><li>Conclusion: Summarizing what has been learned, providing insights, and offering reflective suggestions.</li></ol>', 'TEC', 18, 22, 10, 2, '2023-09-14', NULL, '/assets/courses/course_8'),
(9, 'Sei capace di fare belle foto? – Fotografia 101', 'Can You Take Great Photos? - Photography 101', '2023', '<p>Oggi quasi tutti scattano foto, sia con il loro cellulare che con una fotocamera dedicata. Ma sai cosa serve per scattare una bella fotografia? Unisciti a noi mentre esploriamo i principi fondamentali della fotografia e miglioriamo il tuo inglese allo stesso tempo. Puoi usare il tuo telefono, oppure porta con te la tua fotocamera digitale. Insieme, intraprenderemo un percorso per migliorare le tue abilit&agrave; fotografiche!</p>', '<p>Almost everyone takes photos today, whether with their mobile phones or dedicated cameras. But do you know what it takes to capture a great photograph? Join us as we explore the fundamental principles of photography while practicing your English skills. You can use your phone, or if you have one, bring along your digital camera. Together, we\'ll embark on a journey to improve your photographic skills!</p>', 0, 3, '<p>Seguendo questo corso in inglese, imparerai le basi della fotografia migliorando contemporaneamente le tue competenze in inglese. Ti sentirai pi&ugrave; sicuro nell\'uso della tua fotocamera o del tuo smartphone, comprenderai i concetti chiave della fotografia in inglese e utilizzerai semplici trucchi per migliorare le tue foto. Alla fine del corso, sarai in grado di scattare ottime foto e raccontare storie attraverso le tue immagini, il tutto mentre migliorerai il tuo inglese.</p>', '<p>By joining this course in English, you\'ll learn the basics of photography while improving your English skills. You\'ll feel more confident using your camera or smartphone, understand key photo concepts in English, and use simple tricks to make your photos better. At the end of the course, you\'ll be able to take great pictures and tell stories through your photos, all while getting better at English.</p>', '<p>Durante il corso, valuteremo i tuoi progressi nella fotografia e nell\'inglese. La valutazione terr&agrave; conto della partecipazione, del coinvolgimento, dell\'applicazione delle tecniche fotografiche e della puntualit&agrave;. Il progetto finale avr&agrave; un ruolo significativo, poich&eacute; comporta la presentazione delle tue fotografie alla classe. Sii presente, coinvolto e impegnato, poich&eacute; influenzer&agrave; la tua valutazione complessiva.</p>', '<p>Throughout the course, we will assess your progress in photography and English. The evaluation will consider your participation, engagement, application of photographic techniques, and punctuality. The final project will play a significant role as it involves presenting your photographs to the class. Be present, engaged, and committed, as it will have an important impact on your overall evaluation.</p>', '<p>Questo corso &egrave; composto da cinque lezioni di tre ore ciascuna, progettate per rendere l\'apprendimento interessante e significativo. Mettiamo l\'accento sull\'apprendimento pratico, in cui gli studenti partecipano attivamente e imparano facendo.</p><p>Nelle nostre lezioni, combiniamo teoria con esercizi pratici all\'aperto, laboratori di editing fotografico e discussioni creative sulla composizione e sull\'uso della luce. Gli studenti collaborano nello sviluppare idee fotografiche e risolvere sfide.</p><p>Questo corso si concentra sulla fotografia pratica, con esempi pratici e lavoro di squadra, offrendo agli studenti un\'esperienza di apprendimento completa e divertente.</p>', '<p>This course consists of five three-hour lessons designed to make learning both interesting and meaningful. We emphasize hands-on learning, where students actively participate and learn by doing.</p><p>In our lessons, we blend theory with outdoor practical exercises, photo editing labs, and creative discussions about composition and using light. Students collaborate on developing photo ideas and solving challenges.</p><p>This course focuses on practical photography, hands-on examples, and teamwork, providing students with an enjoyable and comprehensive learning experience.</p>', 'TEC', 12, 20, 20, 2, '2023-09-14', NULL, '/assets/courses/course_9'),
(10, 'Costruire un buon rapporto… con i numeri.', 'Build a good relationship... with numbers.', '2023', '<p>Esploreremo il potere dei numeri e la loro importanza nella vita quotidiana. Immaginate di essere di fronte a una decisione importante&hellip; i numeri sono la chiave per prendere decisioni informate e sostenibili. Durante questo corso, esploreremo come i rapporti numerici, le proporzioni e il calcolo percentuale possano aiutarci a prendere decisioni pi&ugrave; consapevoli e razionali. Insieme, scopriremo come questi concetti matematici possono avere un impatto significativo sulla nostra vita quotidiana.</p>', '<p>We will explore the power of numbers and their importance in everyday life. Imagine facing an important decision... numbers are the key to making informed and sustainable decisions. During this course, we will explore how numerical relationships, proportions, and percentage calculations can help us make more conscious and rational decisions. Together, we will discover how these mathematical concepts can have a significant impact on our daily lives.</p>', 0, 2, '<ol><li>Gli studenti saranno in grado di comprendere i concetti di base legati ai rapporti numerici, alle proporzioni e al calcolo percentuale, riconoscendo le definizioni chiave e le formule fondamentali.</li><li>Gli studenti saranno in grado di applicare la loro conoscenza per risolvere problemi pratici che coinvolgono rapporti numerici e proporzioni. Saranno in grado di utilizzare formule e strategie appropriate per eseguire calcoli percentuali.</li><li>Gli studenti svilupperanno la capacit&agrave; di analizzare situazioni complesse in cui sono coinvolti rapporti numerici, proporzioni e calcolo percentuale. Saranno in grado di suddividere problemi complessi in sotto-problemi pi&ugrave; gestibili.</li><li>Gli studenti svilupperanno la capacit&agrave; di valutare le loro soluzioni e valutare la validit&agrave; delle conclusioni basate su calcoli percentuali in contesti del mondo reale. Saranno in grado di giudicare la pertinenza e l\'efficacia delle strategie utilizzate.</li></ol>', '<ol><li>Students will be able to understand the basic concepts related to numerical ratios, proportions and percentage calculation, recognizing key definitions and fundamental formulas. </li><li>Students will be able to apply their knowledge to solve practical problems involving numerical ratios and proportions. They will be able to use appropriate formulas and strategies to perform percentage calculations. </li><li>Students will develop the ability to analyze complex situations in which numerical ratios, proportions and percentage calculation are involved. They will be able to divide complex problems into more manageable sub-problems. </li><li>Students will develop the ability to evaluate their solutions and evaluate the validity of conclusions based on percentage calculations in real world contexts. They will be able to judge the relevance and effectiveness of the strategies used. </li></ol>', '<ol><li><strong>Prove in itinere:</strong> Sar&agrave; somministrato un test breve al termine di tutte (o alcune) delle singole lezioni per valutare la comprensione immediata degli argomenti trattati.</li><li><strong>Verifica finale:</strong> Alla fine del corso, gli studenti affronteranno una verifica completa che coprir&agrave; l\'intero percorso.</li><li><strong>Voto finale:</strong> Il voto finale sar&agrave; basato sulla combinazione dei punteggi ottenuti nelle prove in itinere e sulla verifica finale.</li></ol>', '<ol><li>Ongoing Assessments: A brief test will be administered at the end of each (or some) individual lessons to assess immediate comprehension of the topics covered.</li><li>Final Assessment: At the end of the course, students will undertake a comprehensive final assessment that will cover the entire curriculum.</li><li>Final Grade: The final grade will be based on the combination of scores achieved in the ongoing assessments and the final assessment.</li></ol>', '<ol><li><strong>Risoluzione di problemi reali:</strong> scenari del mondo reale che richiedono l\'applicazione di rapporti numerici, proporzioni e calcolo percentuale al fine di risolvere situazioni complesse.</li><li><strong>Esercizi di base:</strong> calcolo ed esempi di semplici rapporti numerici (definizione classica di probabilit&agrave;, media aritmetica, etc&hellip;)</li><li><strong>Proporzioni dirette e inverse:</strong> risoluzione di problemi che coinvolgono proporzioni dirette e inverse.</li><li><strong>Calcolo percentuale semplice:</strong> calcoli percentuali di base, come sconti e aumenti.</li><li><strong>Esercizi &ldquo;avanzati&rdquo;:</strong> problemi pi&ugrave; complessi, come calcoli percentuali su investimenti e problemi finanziari.</li></ol>', '<ol><li>Basic Exercises: Calculations and examples involving simple numerical ratios (classical definition of probability, arithmetic mean, etc...)</li><li>Direct and Inverse Proportions: Problem-solving involving direct and inverse proportions.</li><li>Simple Percentage Calculations: Basic percentage calculations, such as discounts and increases.</li><li>\"Advanced Exercises\": More complex problems, such as percentage calculations related to investments and financial issues.</li><li>Real-World Problem Solving: Real-world scenarios requiring the application of numerical ratios, proportions, and percentage calculations to solve complex situations</li></ol>', 'SM', 18, 22, 11, 2, '2023-09-14', NULL, '/assets/courses/course_10'),
(11, 'Minuti scritti', 'Written Minutes', '2023', '<p>La scrittura creativa &egrave; una porta verso realt&agrave; inesplorate, personaggi vividi e storie che fioriscono come giardini segreti. E&rsquo; architettura delle emozioni, scultura delle idee e pittura delle avventure. Ogni parola scritta &egrave; una finestra aperta sull&rsquo;anima, un\'opera d\'arte unica che prende vita nell&rsquo;immaginazione. Qui non ci sono regole, solo il potere di esprimersi liberamente e di abbracciare la bellezza di creare.</p><p>Sei pronto a scoprire il tuo potere delle parole e come trasformare le pagine in mondi magici?</p>', '<p>Creative writing is a gateway to unexplored realities, vivid characters, and stories that blossom like secret gardens. It\'s the architecture of emotions, the sculpture of ideas, and the painting of adventures. Every written word is an open window to the soul, a unique work of art that comes to life in the imagination. Here, there are no rules, only the power to express oneself freely and embrace the beauty of creation.&nbsp;</p><p>Are you ready to discover the power of your words and how to turn pages into magical worlds?</p>', 0, 2, '<p>Seguendo questo corso sarai in grado di:</p><ul><li>riscoprire la tua creativit&agrave; e la tua immaginazione&nbsp;</li><li>sviluppare le abilit&agrave; di scrittura lavorando su singoli aspetti</li><li>esplorare diverse tecniche di scrittura per arricchire il tuo stile&nbsp;</li><li>sperimentare la libert&agrave; espressiva e l\'originalit&agrave; nella creazione di storie</li></ul>', '<p>By following this course you will be able to:</p><ul><li>rediscover your creativity and your imagination&nbsp;</li><li>develop your writing skills by working on individual aspects</li><li>explore different writing techniques to enrich your style&nbsp;</li><li>experience freedom expressiveness and originality in creating stories</li></ul>', '<ul><li>frequenza di almeno il 60%</li><li>partecipazione attiva</li><li>puntualit&agrave; e completezza nella consegna</li><li>svolgimento attivit&agrave; domestica</li><li>valutazione dei prodotti in progress, ossia degli scritti realizzati durante le lezioni</li></ul>', '<ul><li>Attendance of at least 60%</li><li>Active participation</li><li>Punctuality and completeness in assignments submission&nbsp;</li><li>Completion of homework</li><li>Evaluation of in-progress products, i.e., writings done during the lessons</li></ul>', '<p>Il modulo &egrave; un laboratorio di scrittura con metodologia <strong>Writing and Reading Workshop</strong> (WRW) e si basa su due elementi: il &ldquo;fare assieme&rdquo; in classe lavorando sul processo di scrittura e la divisione dell&rsquo;attivit&agrave; in mini lezioni che sono suddivise in tre momenti fondamentali:</p><ol type=\"a\"><li>stesura di un mini testo in un breve tempo predefinito partendo da uno stimolo</li><li>riflessione sulla consegna attraverso l&rsquo;analisi di testi campione che stimolano la riflessione</li><li>condivisione del lavoro personale e riflessione sulle modalit&agrave; di procedura</li></ol>', '<p>The module is a writing workshop using the <strong>Writing and Reading Workshop</strong> (WRW) methodology, based on two elements: \"working together\" in class to focus on the writing process and breaking the activity down into mini-lessons that are divided into three key moments:&nbsp;</p><ol type=\"a\"><li>Writing a mini-text in a short predeterminated time&nbsp; starting from a prompt&nbsp;</li><li>Reflecting on the task through the analysis of sample texts that encourage reflection</li><li>Sharing personal work and reflecting on the procedural methods</li></ol>', 'COM', 18, 22, 12, 2, '2023-09-14', NULL, '/assets/courses/course_11'),
(12, 'L’impero del gusto', 'The Empire of Taste', '2023', '<p>Hai mai pensato a cosa mangiavano i nostri antenati? Come si cucinava senza l\'ausilio dei moderni strumenti? E quali influenze culturali hanno plasmato le loro tavole?&nbsp;</p><p>O ancora: quali ingredienti erano comuni nell\'alimentazione dell\'antichit&agrave; e come differiscono dai nostri giorni? Quali erano le tradizioni e le credenze legate all\'alimentazione in diverse civilt&agrave; antiche? L&rsquo;archeologia ci pu&ograve; aiutare a scoprire indizi sull\'alimentazione delle civilt&agrave; antiche?</p><p>In questo modulo esplorerai l\'alimentazione nelle civilt&agrave; antiche, scegliendo su cosa investigare: com&rsquo;erano i pop-corn dell&rsquo;antica Grecia oppure la birra di pi&ugrave; di 2000 anni fa.&nbsp;</p><p>Pronto a soddisfare la tua curiosit&agrave; gastronomica?</p>', '<p>Have you ever wondered what our ancestors ate? How did they cook without the aid of modern tools? And what cultural influences shaped their tables?</p><p>Or, furthermore: what ingredients were common in ancient diets and how do they differ from ours today? What were the traditions and beliefs related to food in different ancient civilizations? Can archaeology help us discover clues about the diets of ancient civilizations?</p><p>In this module, you will explore the diets of ancient civilizations, choosing what to investigate: were there ancient Greek popcorn or beer from over 2000 years ago?</p><p>Are you ready to satisfy your gastronomic curiosity?</p>', 0, 2, '<p>Seguendo questo corso sarai in grado di:</p><ul><li>Esplorare le pratiche alimentari delle civilt&agrave; antiche attraverso la creazione di un podcast.</li><li>Acquisire competenze di produzione audio e narrazione.</li><li>Condurre ricerche storiche per ottenere informazioni accurate sull\'alimentazione antica.</li><li>Comprendere l\'importanza della cucina nel contesto culturale e sociale.</li></ul>', '<p>By following this course you will be able to:</p><ul><li>Explore the food practices of ancient civilizations through the creation of a podcast. </li><li>Acquire audio production and storytelling skills. </li><li>Conduct historical research to obtain accurate information on ancient nutrition. </li><li>Understanding the importance of cooking in the cultural and social context. </li></ul>', '<ul><li>frequenza di almeno il 60%</li><li>partecipazione attiva</li><li>impegno e coinvolgimento nell&rsquo;attivit&agrave;</li><li>valutazione del lavoro finale realizzato durante il modulo</li></ul>', '<ul><li>Attendance of at least 60%&nbsp;</li><li>Active participation</li><li>Commitment and engagement in activities&nbsp;</li><li>Evaluation of the final work completed during the module</li></ul>', '<p>Il modulo &egrave; un laboratorio realizzato in modalit&agrave; STEAM in cui gli studenti, poste determinate consegne, lavorano in gruppi alla realizzazione di un prodotto finale.</p><p>Nello specifico, per questo modulo si possono individuare quattro fasi:</p><ol><li>stimolo iniziale</li><li>fase di ricerca autonoma dei materiali e loro studio</li><li>creazione del progetto da realizzare</li><li>presentazione del progetto e feedback</li></ol><p>Per questo il modulo utilizza la metodologia del <strong>lavoro di gruppo</strong> con lo scopo di favorire il confronto e il problem solving</p>', '<p>The module is a STEAM-based workshop in which students, given specific assignments, work in groups to create a final product.</p><p>Specifically, for this module, there are four phases:</p><ol><li>Initial stimulus&nbsp;</li><li>Independent research phase for materials and their study&nbsp;</li><li>Creation of the project to be realized P</li><li>roject presentation and feedback</li></ol><p>Therefore, the module employs group work methodology with the aim of encouraging discussion and problem-solving.</p>', 'SGET', 18, 22, 12, 2, '2023-09-14', NULL, '/assets/courses/course_12'),
(13, 'Dimmi con chi vai e ti dirò chi sei', 'Tell me who you go with, and I\'ll tell you who you are', '2023', '<p>Chi sei tu? Ti conosci? Sicuramente una domanda che ci facciamo tanto spesso. Proviamo a scoprirlo e intanto ci conosciamo tutti!</p>', '<p>Who are you? Do you know yourself? Surely it&rsquo;s a question we often ask ourselves. Let&rsquo;s try to find it out and in the meantime we also get to know each other!</p>', 0, 2, '<p>Durante questo modulo imparerai a raccontare in inglese le cose che ti piacciono e le cose che non sono di tuo gradimento. Acquisirai le competenze per descrivere al meglio le persone sia fisicamente che caratterialmente. Imparerai a presentarti in inglese e a fare le domande giuste per conoscere gli altri. Ti sar&agrave; chiesto di cercare e portare esempi di test della personalit&agrave; che poi faremo insieme e rifletteremo sui risultati.</p>', '<p>During this module you will learn to tell in English the things you like and the things that are not to your liking. You will acquire the skills to best describe people both physically and character. You will learn to introduce yourself in English and ask the right questions to get to know others. You will be asked to research and bring examples of personality tests that we will then do together and reflect on the results.</p>', '<ul><li>frequenza di almeno il 60 % del totale delle ore previste dal modulo</li><li>partecipazione attiva</li><li>puntualit&agrave; e completezza nella consegna delle attivit&agrave;</li><li>valutazione del lavoro finale realizzato - realizzazione di un video di 2 minuti dove ti presenti</li></ul>', '<ul><li>Frequency of at least 60 % of the total hours of the module</li><li>active participation</li><li>punctuality and completeness in the delivery of activities</li><li>evaluation of the final work carried out - realization of a 2-minute video where you present yourself</li></ul>', '<ul type=\"none\"><li>Lezioni interattive con focus sulla produzione (parlare e scrivere)</li><li>Utilizzo di testi, audio e video</li><li>Lavoro a coppie</li><li>Lavori di gruppo</li><li>Ricerche individuali</li></ul>', '<ul type=\"none\"><li>Interactive lessons with a focus on production (speaking and writing)</li><li>Use of texts, audio, and video</li><li>Pair work</li><li>Group assignments</li><li>Individual research</li></ul>', 'COM', 18, 22, 13, 2, '2023-09-14', NULL, '/assets/courses/course_13'),
(14, 'Unplugged: per una vita con stile', 'Unplugged: lifestyle for life', '2023', '<p>Ti sei mai trovato di fronte a qualche problema e dover prendere decisioni difficili? Oppure non sapere cosa fare? Nella vita capita spesso e a volte agiamo d&rsquo;istinto e non sempre i risultati sono quelli che vorremmo.</p><p>Conoscenza e prevenzione sono&nbsp; i pilastri che ci possono indicare la strada migliore. Questo corso pu&ograve; offrirti la cassetta per gli attrezzi per affrontare al meglio le situazioni che ti potrebbero capitare&hellip;iscriviti!</p>', '<p>Have you ever found yourself facing some problem and having to make difficult decisions? Or not knowing what to do? It happens often in life and sometimes we act instinctively and the results are not always the ones we would like.</p><p>Knowledge and prevention are the basis that can show us the best way. This course can offer you the toolbox to better deal with the situations that may arise&hellip;sign up!</p>', 0, 2, '<p>Seguendo questo corso sarai in grado di:</p><ul><li>potenziare le abilit&agrave; necessarie per affrontare la vita quotidiana</li><li>sviluppare competenze e risorse per resistere alle pressioni e alle influenze sociali</li><li>riconoscere le&nbsp; informazioni scientificamente solide sulle sostanze e i loro effetti sulla salute</li><li>scegliere gli atteggiamenti corretti nei confronti dell&rsquo;uso delle sostanze</li></ul>', '<p>By following this course you will be able to:</p><ul><li>strengthen the skills needed to cope with everyday life</li><li>develop skills and resources to resist social pressures and influences</li><li>recognise scientifically sound information on substances and their health effects</li><li>choose the correct attitudes towards the use of substances</li></ul>', '<p>I criteri da soddisfare per ottenere il credito relativo a questo corso sono i seguenti: frequenza di partecipazione 60% minimo, consegna di una riflessione personale conclusiva oltrech&eacute; impegno, coinvolgimento e partecipazione.</p>', '<p>In order to obtain credit for this course you are requested to: attendance at least 60%, write a conclusive and personal re-elaboration. Also effort, engagement and participation will be taken into consideration.</p>', '<p>In questo corso alleneremo le nostre life skills (pensiero critico e creativo, capacit&agrave; decisionale e di problem solving, empatia, gestione delle emozioni,&hellip;) che ci proteggono dai comportamenti a rischio e sono importanti per la prevenzione all&rsquo;uso di sostanze.</p><p>Faremo attivit&agrave; a coppie e in gruppi ma anche giochi perch&eacute; &egrave; importante stare bene assieme agli altri, sempre rispettando la sensibilit&agrave; di ognuno.</p>', '<p>In this course we train our life skills (critical and creative thinking, decision-making and problem solving, empathy, emotion management,&hellip;) which protect us from risky behavior and are important for the prevention of substance use.</p><p>We practise activities in pairs and in groups but also play games because it is important to feel good with others, always respecting everyone&rsquo;s sensitivity.</p>', 'SM', 18, 22, 14, 2, '2023-09-14', NULL, '/assets/courses/course_14'),
(15, 'Der Hof – sulle tracce della cultura germanica nel nostro territorio', 'Der Hof - On the traces of Germanic culture in our territory', '2023-09-11', '<p>Dove &egrave; corretto collocare il confine tra cultura italiana e cultura tedesca? Al Brennero? Fra Alto Adige e Trentino? E se un confine come lo immaginiamo noi&hellip;non esistesse? La scoperta del <em>hof </em>ci conduce sulle tracce della cultura germanica in Trentino.</p>', '<p>Where is it right to place the border between Italian and German culture? Al Brennero? Between Alto Adige and Trentino? And if a border as we imagine it... did not exist? The discovery of the <em>hof </em>leads us on the traces of German culture in Trentino.</p>', 0, 2, '<p>Seguendo questo corso imparerai a conoscere come si svolgeva la vita quotidiana nel maso e chi erano i suoi abitanti; Avrai la possibilit&agrave; di migliorare l&rsquo;abilit&agrave; di lettura e ascolto in lingua tedesca e di arricchire il patrimonio lessicale; potrai raccontare ai compagni attraverso un post, cosa hai imparato e cosa ti &egrave; piaciuto di pi&ugrave; durante il corso. Avrai la possibilit&agrave; di visitare un maso.</p>', 'By taking this course you will learn about the daily life of the farm and its inhabitants; you will have the opportunity to improve your reading and listening skills in German and to enrich your vocabulary; you can tell your classmates through a post, what you learned and what you liked most during the course. You will have the opportunity to visit a farm.', '<p>Presenza ad almeno il 60% delle lezioni, grado di Coinvolgimento, Partecipazione attiva, valutazione del contributo per il sito della scuola, Impegno</p>', '<p>Presence at least 60% of lessons, degree of Involvement, Active participation, evaluation of the contribution for the school site, Commitment</p>', '<p>Percorso di apprendimento:</p><ol><li>Was ist ein Bauernhof? Die germanische Besiedlung: il termine <em>hof </em>e la colonizzazione germanica del Trentino</li><li>Der Hof im Fersental: Ortsnamen, die traditionelle Hofwirtschaft: toponomastica; l&rsquo;economia del maso mocheno, agricoltura, allevamento e <em>krumern</em>;</li><li>Der Filzerhof: conoscere un maso a pochi chilometri dalla nostra scuola- Architettura, arredamento e paesaggio;</li><li>Das immaterielle Vermӧgen: leggende da narrare e ricette da sperimentare;</li><li>Freilichtmuseum: il maso nei musei a cielo aperto in Tirol, S&uuml;dtirol e Trentino;</li><li>Produzione di un contributo per il sito della scuola;</li></ol><p>Se compatibile con la programmazione didattica si prevede un&rsquo;uscita sul territorio per la visita del Filzerhof.</p>', '<p>Course of learning:</p><ol><li>Was ist ein Bauernhof? Die germanische Besiedlung: the term <em>hof</em> and the German colonization of Trentino</li><li>Der Hof im Fersental: Ortsnamen, die traditionelle Hofwirtschaft: toponomastica; the economy of the farm mocheno, agriculture, breeding and <em>krumern</em>;</li><li>Der Filzerhof: get to know a farm a few kilometers from our school- Architecture, furniture and landscape;</li><li>Das immaterielle Vermӧgen: legends to tell and recipes to experiment;</li><li>Freilichtmuseum: the farm in the open air museums in Tirol, S&uuml;dtirol and Trentino;</li><li>Production of a contribution to the school site;</li></ol><p>If compatible with the educational program, there will be an exit to the territory for the visit of the Filzerhof.</p>', 'COM', 18, 22, 15, 2, '2023-09-14', NULL, '/assets/courses/course_15'),
(16, 'Il rispetto delle regole tra dovere e volere', 'Rules’ respect between duty and will', '2023', '<p>La legalit&agrave; &egrave; un&nbsp; principio cardine della convivenza civile. Il mancato rispetto delle regole potrebbe danneggiare chi ci circonda.</p><p>In questo percorso vedremo quanto l&rsquo;apporto del singolo sia importante per la convivenza pacifica tra le persone sia all&rsquo;interno di piccole societ&agrave;, sia nelle societ&agrave; pi&ugrave; complesse di cui facciamo parte; vedremo come la partecipazione attiva, democratica e solidale di ognuno di noi possa rendere pi&ugrave; egualitaria la nostra societ&agrave;.</p>', '<p>Legality is a fundamental principle of civil coexistence. Non compliance with the rules could harm those around us.&nbsp;</p><p>This course will show how important the contribution of each individual is for a peaceful coexistence among people, both within small and more complex societies they belong to, and how fair,&nbsp; active and&nbsp; democratic participation can make society more egalitarian.</p>', 0, 2, '<p>Seguendo questo corso sarai in grado di:</p><ul><li>comprendere le motivazioni che ti portano a rispettare le regole</li><li>riconoscere le ricadute concrete delle proprie scelte e dei comportamenti quotidiani</li><li>riconoscere l&rsquo;importanza dei limiti per l&rsquo;esistenza della libert&agrave;</li><li>saper valutare l&rsquo;importanza delle norme che regolano la convivenza civile</li><li>comprendere l&rsquo;importanza del volontariato all&rsquo;interno della societ&agrave;</li><li>conoscere e applicare i principi democratici</li><li>conoscere le caratteristiche delle organizzazioni criminali e come operano</li><li>conoscere l&rsquo;operato di chi contrasta la criminalit&agrave; organizzata</li></ul>', '<p>By following this course you will be able to:</p><ul><li>understand the reasons that lead you to respect the rules</li><li>recognize the concrete consequences of their choices and daily behavior</li><li>recognize the importance of limits to the existence of freedom</li><li>know how to evaluate the importance of the rules governing civil coexistence</li><li>understand the importance of volunteering within society</li><li>know and apply democratic principles</li><li>know the characteristics of criminal organisations and how they operate</li><li>to know the actions of those who fight organised crime</li></ul>', '<ul><li>frequenza di almeno il 60%</li><li>partecipazione attiva e personale</li><li>capacit&agrave; di lavorare in gruppo</li><li>puntualit&agrave; e completezza nelle consegne</li><li>valutazione e valorizzazione delle capacit&agrave; personali&nbsp; e dell&rsquo;impegno del singolo</li></ul>', '<ul><li>60% of attendance minimum</li><li>personal and active class participation</li><li>teamwork&nbsp;</li><li>submitting completed tasks on time</li><li>assessment and enhancement of personal skills and individual commitment </li></ul>', '<p>Il modulo vuole essere un laboratorio di conoscenza e lavoro sulla legalit&agrave; e sulla solidariet&agrave;, basato su attivit&agrave; di riflessione, confronto e di responsabilizzazione.</p><p>Le attivit&agrave; sono svolte favorendo la partecipazione attiva e valorizzando la condivisione e il&nbsp; confronto; attraverso l&rsquo;analisi di documenti, testi e video potrai capire l&rsquo;importanza e l&rsquo;attualit&agrave; del tema.</p>', '<p>This workshop will allow learners to acquire a better knowledge about and work on themes as legality and solidarity by reflecting, discussing and raising one&rsquo;s awareness.</p><p>Activities are developed encouraging active participation and enhancing discussion. Learners will understand the topic&rsquo;s importance and the topicality through the analysis of documents, texts and videos.</p>', 'SGET', 1, 22, 16, 2, '2023-09-14', NULL, '/assets/courses/course_16'),
(17, 'Da idea a realtà: scopri il magico mondo della modellazione 3D! ', 'From idea to reality: dive into the enchanting world of 3D modeling!', '2023-09-11', '<p>Benvenuto nel mondo del design e della creativit&agrave;! Immagina di poter trasformare un pensiero in un oggetto tangibile, con il solo click di un mouse. Con questo modulo di introduzione alla modellazione 3D con Fusion360, il sogno pu&ograve; diventare realt&agrave;!</p>', '<p>Welcome to the world of design and creativity! Imagine being able to transform a thought into a tangible object with just the click of a mouse. With this introductory module on 3D modeling with Fusion360, the dream can become reality!</p>', 0, 3, '<p>Seguendo questo corso sarai in grado di:</p><ul><li>Identificare gli strumenti e le funzioni base di Fusion360</li><li>Apprendere le terminologie e i concetti legati alla modellazione 3D</li><li>Descrivere il processo che va dalla progettazione di un modello in Fusion360 alla stampa 3D</li><li>Utilizzare gli strumenti di Fusion360 nella progettazione di un modello 3D di base</li><li>Valutare potenziali problemi di stampa basate sugli elementi di design</li><li>Creare un pezzo 3D che verr&agrave; realizzato con la stampante</li></ul>', '<p>By following this course you will be able to:</p><ol><li>Identify the basic tools and functions of Fusion360</li><li>Learn 3D modeling terminologies and concepts</li><li>Describe the process from designing a model in Fusion360 to 3D printing</li><li>Use Fusion360 tools in designing a basic 3D model</li><li>Evaluate potential printing problems based on design elements</li><li>Create a 3D piece that will be made with the printer</li></ol>', '<p>I criteri da soddisfare per ottenere il credito relativo a questo corso sono i seguenti:&nbsp;</p><ul><li>Frequenza di partecipazione 60% minimo</li><li>Presenza in classe e partecipazione attiva</li><li>Capacit&agrave; dello studente di seguire le istruzioni e replicare un modello come dimostrato nelle lezioni</li></ul>', '<p>The criteria to meet in order to earn credit for this course are as follows:</p><ul><li>Minimum participation frequency of 60%</li><li>Attendance in class and active participation</li><li>The student\'s ability to follow instructions and replicate a model as demonstrated in the lessons.</li></ul>', '<p>Gli studenti riceveranno la sfida di creare un oggetto che risolva un problema quotidiano.</p><p>Attraverso la discussione iniziale si identificheranno le conoscenze che gi&agrave; hanno e ci&ograve; che si dovr&agrave; scoprire per progettare l&rsquo;oggetto utilizzando Fusion360.</p><p>Gli studenti inizieranno a familiarizzare con Fusion360 utilizzando oltre le esercitazioni in classe, anche risorse online, tutorial e documentazione.</p><p>Lavoreranno in piccoli gruppi o individualmente per esplorare le funzionalit&agrave; di base del software e comprenderne le potenzialit&agrave;.</p><p>Al gruppo o allo studente verr&agrave; chiesto di ideare l&rsquo;oggetto tenendo conto di eventuali vincoli dati e di creare a mano schizzi preliminari del design.</p><p>Con le conoscenze acquisite del software si proceder&agrave; a trasformare l&rsquo;idea in un modello 3D.</p><p>Una volta finalizzato il design, gli studenti preparano i loro modelli per la stampa 3D</p>', '<p>Students will be challenged to create an object that solves an everyday problem.&nbsp;</p><p>Through initial discussion, they will identify the knowledge they already have and what needs to be discovered to design the object using Fusion360.</p><p>Students will begin to familiarize themselves with Fusion360, utilizing not only in-class exercises but also online resources, tutorials, and documentation.&nbsp;</p><p>They will work in small groups or individually to explore the software\'s basic functionalities and understand its capabilities.&nbsp;</p><p>Groups or individual students will be asked to conceptualize the object, considering any given constraints, and to manually sketch preliminary designs.</p><p>With the knowledge acquired about the software, they will proceed to transform the idea into a 3D model.</p><p>Once the design is finalized, students will prepare their models for 3D printing.</p>', 'TEC', 10, 18, 17, 2, '2023-09-14', NULL, '/assets/courses/course_17'),
(18, 'Colpo di fulmine o innamoramento lento?', 'Love at first sight or slow falling in love?', '2023', '<p>Cos&rsquo;&egrave; l&rsquo;innamoramento? Come &egrave; stato rappresentato da scrittori e poeti? Dal balcone di <i>Romeo e Giulietta</i> al <i>Bacio</i> di Klimt, da <i>Una ragazza perfetta al 100%</i> al fascino della <i>Sirena</i>: scopri le dimensioni emotive di questo sentimento tra psicologia, chimica e espressioni artistiche. </p>', '<p>What is falling in love? How was it represented by writers and poets? From Romeo and Juliet\'s balcony to Klimt\'s Kiss, from A 100% perfect girl to the charm of the Siren: discover the emotional dimensions of this feeling between psychology, chemistry and artistic expressions.</p>', 0, 2, '<p>Al termine del percorso avrai esercitato le tue capacit&agrave; linguistiche sulle parole dell&rsquo;amore, di esposizione orale descrivendo assieme ai tuoi compagni opere pittoriche, di interpretazione dei testi riflettendo sui luoghi e i momenti dell&rsquo;innamoramento, di scrittura con brevi produzioni e di creazione di percorsi multimediali.</p>', '<p>At the end of the course you will have exercised your language skills on the words of love, oral exposure describing together with your fellow paintings, interpretation of texts reflecting on the places and moments of falling in love, writing with short productions and creation of multimedia paths.</p>', '<p>Valutazioni in itinere: esercitazioni terminologiche, scritture di sintesi e analisi di immagini e testi.</p><p>Valutazione al termine del percorso: presentazione di slide con immagini e testi.</p><p>Valutazione complessiva: si terr&agrave; conto dell&rsquo;attenzione e della partecipazione al percorso, della puntualit&agrave; e cura nello svolgimento delle esercitazioni in itinere, della puntualit&agrave; e cura nello svolgimento della verifica al termine del percorso. Saranno inoltre valutate le capacit&agrave; di lavorare autonomamente e in gruppo in base alle consegne.</p><p>Presenza almeno del 60% delle lezioni.</p>', '<p>Evaluations during the course: terminological exercises, writing summaries and analysis of images and texts.</p><p>Evaluation at the end of the course: presentation of slides with images and texts.</p><p>Overall assessment: attention and participation in the course, punctuality and care in carrying out exercises during the course, punctuality and care in carrying out the verification at the end of the course will be taken into account. The ability to work independently and in groups based on deliveries will also be evaluated.</p><p>Attendance of at least 60% of the lessons.</p>', '<p>Il percorso prevede dei momenti teorici di condivisione di linguaggio e concetti e presentazione degli esempi di innamoramento sia nell&rsquo;arte sia nella letteratura attraverso slide specifiche.&nbsp;</p><p>Lezioni partecipate con momenti di brainstorming e apporti personali riguardanti i concetti proposti.</p><p>Letture guidate interpretative.</p><p>Rielaborazioni di testi.</p><p>Esposizioni orali e uso di strumenti informatici.</p><p>Lavori di gruppo.</p>', '<p>The course includes theoretical moments of sharing language and concepts and presentation of examples of falling in love both in art and literature through specific slides.</p><p>Participatory lessons with moments of brainstorming and personal contributions regarding the proposed concepts.</p><p>Interpretive guided readings.</p><p>Text reworkings.</p><p>Oral presentations and use of IT tools.</p><p>Group work.</p>', 'COM', 1, 22, 18, 2, '2023-09-14', NULL, '/assets/courses/course_18'),
(19, 'Dove viviamo? Alla scoperta del Trentino', 'Where do we live? Descovering Trentino', '2023', '<p>Conosci il Trentino? Cosa sai della terra nella quale stai crescendo? Montagne, laghi e poi? Scopriamo insieme i piatti tipici, le tradizioni, i castelli, le aree protette e molto altro. E cosa vuol dire essere autonomi? Decidere da soli vuol dire essere liberi, ma anche essere responsabili della libert&agrave; che abbiamo. Questo vale per il Trentino e per ciascuno di noi!!!</p>', '<p>Do you know Trentino? What do you know about the land you are growing up in? Mountains, lakes and then? Let\'s discover together the typical dishes, the traditions, the castles, the protected areas and much more. And what does it mean to be autonomous? Deciding for yourself means being free, but also being responsible for the freedom we have. This applies to Trentino and to each of us!!!</p>', 0, 2, '<p>Alla fine del corso sentirai di essere parte della tua terra. Gusterai il piacere di conoscere ed apprezzare il Trentino ed avrai scoperto tante cose interessanti che non ti aspettavi. Imparerai a ragionare da prospettive diverse, ad incrociare informazioni di carattere geografico, storico, culturale ed economico.&nbsp;</p><p>Imparerai a raccogliere a riconoscere le fonti attendibili per selezionare il materiale utili, organizzandolo per tipologia e categorie, coniugando sintesi ed approfondimento.&nbsp;</p><p>Ti sperimenterai nella presentazione di un argomento, realizzando uno strumento multimediale di comunicazione da presentare alla classe, misurandoti con le tue capacit&agrave; di public speaking, superando la tua timidezza ed apprezzando il lavoro dei tuoi compagni e delle tue compagne.</p>', '<p>At the end of the course you will feel that you are part of your land. You will enjoy the pleasure of knowing and appreciating Trentino and you will have discovered many interesting things that you did not expect. You will learn to reason from different perspectives, to cross information of a geographical, historical, cultural and economic nature. <br />You will learn to collect to recognize reliable sources to select useful material, organizing it by type and categories, combining synthesis and deepening. <br />You will experience the presentation of a topic, creating a multimedia communication tool to present to the class, measuring yourself with your public speaking skills, overcoming your shyness and appreciating the work of your companions and your companions.</p>', '<ul><li >frequenza di almeno il 67 % del totale delle ore previste dal modulo</li><li>partecipazione attiva</li><li>disponibilit&agrave; al lavoro di gruppo e spirito collaborativo</li><li>puntualit&agrave; e completezza nella consegna delle attivit&agrave;</li><li>Variet&agrave; e profondit&agrave; delle ricerche di materiali</li><li>Impegno nella realizzazione del lavoro finale</li><li>Disponibilit&agrave; a mettersi in gioco nel public speaking</li></ul>', '<ul><li>attendance of at least 67% of the total scheduled module hours</li><li>Active partecipation</li><li>work in a team and a collaborative attitude</li><li>Punctuality and completeness in the submission of assignments</li><li>Variety and depth of material searches</li><li>Commitment to the completion of the final work</li><li>Willingness to get involved in public speaking</li></ul>', '<p>Dopo una breve presentazione da parte del docente, ragioneremo insieme sulle diverse categorie a partire dalle quali interessarci del Trentino.</p><p>Ogni studente proporr&agrave; e poi sceglier&agrave; un ambito, confrontandosi con il gruppo ed insieme ad esso individuando gli elementi pi&ugrave; interessanti</p><p>Seguir&agrave; una fase di ricerca di informazioni, individuale ed in gruppo, accompagnata dal contributo del docente e dal confronto con gli altri.</p><p>Ci confronteremo sui diversi strumenti multimediali per realizzare la presentazione (video, power point, interviste ai protagonisti, rassegna stampa</p><ul><li>Lezione frontale</li><li>Brainstorming;</li><li>Lezioni partecipate e dialogate con immagini e video;</li><li>Simulazioni di ricerca informazione nel web</li><li>Lavori individuali, a coppie e/o in piccoli gruppi;</li><li>Uso di strumenti informatici;</li><li>Realizzazione di un video</li><li>Esercizio di public speaking;</li></ul>', '<p>After a brief presentation by the teacher, we will discuss together the different categories from which to be interested in Trentino.</p><p>Each student will propose and then choose a field, confronting the group and together with it identifying the most interesting elements</p><p>There will be a phase of research of information, individual and in groups, accompanied by the contribution of the teacher and the comparison with others.</p><p>We will discuss the various multimedia tools to realize the presentation (video, power point, interviews with the protagonists, press review</p><ul><li>Frontal lesson</li><li>Brainstorming;</li><li>Participatory and dialogic teaching with pictures and videos</li><li>Web serch exercise&nbsp;</li><li>Individual, pair and/or small group work</li><li>Use of computer tools;</li><li>Making a video</li><li>Public speaking activity</li></ul>', 'SGET', 12, 22, 19, 2, '2023-09-14', NULL, '/assets/courses/course_19'),
(20, 'DNA: il segreto della vita', 'DNA: the secret of life', '2023', '<p>&ldquo;Il DNA non sa nulla e non si cura di nulla. Il DNA, semplicemente, &egrave;. E noi danziamo alla sua musica.&rdquo;<br />(Richard Dawkins).</p><p>La scoperta del DNA &egrave; la pi&ugrave; rivoluzionaria degli ultimi decenni e una delle pi&ugrave; straordinarie di sempre. Conoscere il DNA ha permesso di svelare molti misteri dell&rsquo;esistenza e lavorare con il DNA ci consente di fare cose impensabili fino a poco tempo fa.</p><p>Di cosa si tratta? Come &egrave; possibile? Iscriviti e lo scoprirai!</p>', '<p>&ldquo;DNA neither cares nor knows. DNA just is. And we dance to its music&rdquo;. (Richard Dawkins).</p><p>The discovery of DNA is the most revolutionary in decades and one of the most extraordinary ever. Knowing DNA has allowed us to reveal many mysteries of existence and working with DNA allows us to do things that were unthinkable until recently.</p><p>What is it about? How is it possible? Sign up and you will find out!</p>', 0, 2, '<p>Scoprire la struttura del DNA ed imparare a comprendere, interpretare e prevedere il &ldquo;codice segreto&rdquo; con le informazioni contenute nelle cellule dei viventi. Rendersi conto dei numerosi campi di impiego delle tecnologie correlate al DNA. Applicare a semplici, ma interessanti situazioni le conoscenze relative al DNA attraverso esercizi, disegni, schemi, video.</p>', '<p>Discover the structure of DNA and learn to understand, interpret and predict the \"secret code\" with the information contained in the cells of living. Understand the many fields of use of DNA-related technologies. Apply to simple, but interesting situations the knowledge related to DNA through exercises, drawings, diagrams, videos.</p>', '<p>I criteri da soddisfare per ottenere il credito relativo a questo corso sono i seguenti: frequenza di partecipazione 60% minimo, rispetto della scadenze delle consegne, superamento del test finale con almeno il 60% delle risposte corrette.&nbsp; Impegno, coinvolgimento e partecipazione sono elementi che vengono presi in considerazioni e possono contribuire positivamente alla valutazione finale.</p>', '<p>The criteria in order to obtain credit for this course are as follows: attendance at least 60%, respect of delivery deadlines and passing the final test with at least 60% correct answers. Effort, engagement and participation are elements that are taken into consideration and can contribute positively to the final evaluation.</p>', '<p>Il corso prevede l&rsquo;utilizzo della lingua inglese per affrontare i temi proposti attraverso la metodologia CLIL. Questa include la possibilit&agrave; di discutere riguardo preconoscenze e curiosit&agrave; emergenti, di lavorare individualmente, a coppie e a gruppi, di utilizzare strumenti multimediali, di produrre lavori originali quali ricerche, presentazioni, video.&nbsp;</p><p>Per imparare in modo divertente e coinvolgente, useremo diverse tecniche speciali durante le lezioni. Ci saranno giochi interattivi, storie da risolvere insieme, video divertenti e tanto altro ancora. In questo modo, ogni lezione sar&agrave; un\'avventura nuova e interessante!</p>', '<p>The course offers the opportunity to discuss pre-knowledge and emerging curiosities, work individually, in pairs and groups, use digital tools, produce original works such as research, presentations, videos.</p><p>To make learning fun and engaging, we will use several special techniques during the lessons. There will be interactive games, stories to solve together, fun videos and much more. This way, every lesson will be a new and interesting adventure!</p>', 'SM', 14, 22, 9, 2, '2023-09-14', NULL, '/assets/courses/course_20'),
(21, 'Ötzi: l’Uomo dei Ghiacci tra storia e scienza', 'Ötzi: the Ice Man between history and science the secret of life', '2023', '<p>Cosa c&rsquo;&egrave; di pi&ugrave; bello che la passione per la scoperta di cose nuove? &Ouml;tzi da questo punto di vista ci aiuta moltissimo, stimolando l&rsquo;interesse e la curiosit&agrave; per la scoperta scientifica, insegnandoci a riflettere, a fare deduzioni e collegamenti e anche spronandoci a realizzare nuovi metodi e tecnologie per comprendere meglio lui e il suo mondo riemerso dal passato.</p><p>Iscriviti al corso e vedrai che &Ouml;tzi trover&agrave; il modo di stupire anche te!</p>', '<p>What could be better than the passion for discovering new things? From this point of view &Ouml;tzi helps us a lot, stimulating the interest and curiosity for scientific discovery, teaching us to reflect, to make deductions and connections and also encouraging us to create new methods and technologies to better understand him and his world re-emerged from the past.</p><p>Sign up for the course and you\'ll see that &Ouml;tzi will find a way to amaze you too!</p>', 0, 2, '<p>Conoscere la storia di &Ouml;tzi e della sua scoperta, l&rsquo;ipotesi sulla sua morte e le tecniche di conservazione e datazione. Saper riconoscere le difficolt&agrave; per sopravvivere al tempo di &Ouml;tzi e creare dei collegamenti con gli oggetti ed i resti rinvenuti sul suo corpo o nelle vicinanze. Conoscere il suo stato di salute ed ipotizzare da cosa potesse essere stato determinato. Chiedersi, infine, quali informazioni utili o interessanti per la nostra vita possiamo ricavare dallo studio di &Ouml;tzi.</p>', '<p>Know the history of &Ouml;tzi and his discovery, the hypothesis about his death and the techniques of conservation and dating. Knowing how to recognize the difficulties of surviving in &Ouml;tzi&rsquo;s time and making connections with objects and remains found on or near his body. To know his state of health and to guess what might have determined him. Ask yourself, finally, what useful or interesting information for our lives we can get from &Ouml;tzi&rsquo;s study.</p>', '<p>I criteri da soddisfare per ottenere il credito relativo a questo corso sono i seguenti: frequenza di partecipazione 60% minimo, rispetto della scadenze delle consegne, superamento del test finale con almeno il 60% delle risposte corrette.&nbsp; Impegno, coinvolgimento e partecipazione sono elementi che vengono presi in considerazioni e possono contribuire positivamente alla valutazione finale.</p>', '<p>The criteria in order to obtain credit for this course are as follows: attendance at least 60%, respect of delivery deadlines and passing the final test with at least 60% correct answers. Effort, engagement and participation are elements that are taken into consideration and can contribute positively to the final evaluation.</p>', '<p>Il corso prevede l&rsquo;utilizzo della lingua inglese per affrontare i temi proposti attraverso la metodologia CLIL. Questa include la possibilit&agrave; di discutere riguardo preconoscenze e curiosit&agrave; emergenti, di lavorare individualmente, a coppie e a gruppi, di utilizzare strumenti multimediali, di produrre lavori originali quali ricerche, presentazioni, video.&nbsp;</p><p>Per imparare in modo divertente e coinvolgente, useremo diverse tecniche speciali durante le lezioni. Ci saranno giochi interattivi, storie da risolvere insieme, video divertenti e tanto altro ancora. In questo modo, ogni lezione sar&agrave; un\'avventura nuova e interessante!</p>', '<p>The course offers the opportunity to discuss pre-knowledge and emerging curiosities, work individually, in pairs and groups, use digital tools, produce original works such as research, presentations, videos.</p><p>To make learning fun and engaging, we will use several special techniques during the lessons. There will be interactive games, stories to solve together, fun videos and much more. This way, every lesson will be a new and interesting adventure!</p>', 'SM', 14, 22, 9, 2, '2023-09-14', NULL, '/assets/courses/course_21'),
(22, 'Trame di celluloide', 'Celluloid Plots', 2023, '<p>Cos&rsquo;&egrave; una storia?</p><p>un ponte che collega l\'immaginazione alla realt&agrave;, creando legami tra il reale e l\'irreale. E&rsquo; l\'incantesimo che lega eventi, emozioni e riflessioni in una danza coinvolgente di significato. &Egrave; la forza che trasforma le semplici idee in avventure epiche e connessioni profonde.&nbsp;</p><p>Ma &egrave; anche un ingranaggio complesso, raffinato, ben calibrato in ogni sua parte, studiato per emozionare, coinvolgere, stupire fin anche disorientare.&nbsp;</p><p>Quali sono questi ingranaggi? Perch&eacute; una storia non sono libri, non sono film, ma &egrave; un&rsquo;emozione trasmessa?</p><p>Scoprilo con noi, entrando in quel mondo, fatto di parole, pagine e cellulosa</p>', '<p>What is a story? It\'s a bridge that connects imagination to reality, creating links between the real and the unreal. It\'s the enchantment that ties events, emotions, and reflections in an engaging dance of meaning. It\'s the force that transforms simple ideas into epic adventures and deep connections.</p><p>But it\'s also a complex, refined, finely tuned mechanism, designed to excite, engage, amaze, and even disorient. What are these gears? Why is a story not just books or movies but an emotion transmitted?</p><p>Discover it with us! Come in a world made of words, pages, and cellulose</p>', 0, 2, '<p>Seguendo questo corso sarai in grado di:</p><ul><li>analizzare e comprendere i principi fondamentali del testo narrativo.</li><li>esaminare come il film \"Zootropolis\" utilizza gli elementi narrativi per creare una storia coinvolgente.</li><li>sviluppare competenze di analisi critica e di espressione scritta attraverso il confronto tra il film e il testo narrativo.</li><li>promuovere la riflessione sull\'importanza delle tematiche affrontate nel film.</li></ul>', '<p>By following this course you will be able to:</p><ul><li>analyze and understand the fundamental principles of the narrative text.</li><li>examine how the film \"Zootropolis\" uses narrative elements to create an engaging story.</li><li>develop skills of critical analysis and written expression through the comparison between the film and the narrative text.</li><li>promote reflection on the importance of the themes addressed in the film.</li></ul>', '<ul><li>frequenza di almeno il 60%</li><li>partecipazione attiva</li><li>puntualit&agrave; e completezza nella consegna delle attivit&agrave;</li><li>valutazione dei prodotti in progress</li><li>valutazione del lavoro finale, ovvero della realizzazione di un prodotto (saggio critico, trailer di commento, PowerPoint, podcast&hellip;) in cui si analizza come il film \"Zootropolis\" utilizza gli elementi narrativi per trasmettere i suoi messaggi e coinvolgere il pubblico</li></ul>', '<ul><li>Attendance of at least 60%&nbsp;</li><li>Active participation&nbsp;</li><li>Punctuality and completeness in the completion of activities&nbsp;</li><li>Evaluation of in-progress products&nbsp;</li><li>Evaluation of the final work, namely the creation of a product (critical essay, commentary trailer, PowerPoint, podcast...) in which the film \"Zootropolis\" is analyzed for how it uses narrative elements to convey its messages and engage the audience.</li></ul>', '<p>Gli incontri avvengono seguendo la metodologia della <strong>lezione segmentata</strong> ripartita in:</p><ol><li><strong>Preconoscenza</strong>: per partire da quello che si sa con brainstorming iniziale o recupero delle preconoscenze</li><li><strong>Lezione</strong>: per spiegare l&rsquo;argomento con momenti &ldquo;brevi&rdquo;, senza per&ograve; rinunciare alla complessit&agrave;</li><li><strong>Attivit&agrave;</strong>: con esercizi operativi e collaborativi, per mettere in pratica, confrontarsi e riconoscere le eventuali difficolt&agrave;</li><li><strong>Restituzione</strong>: per chiarire i dubbi, con la condivisione, i feedback e i chiarimenti circa le attivit&agrave; svolte</li><li><strong>Conclusione</strong>: per fare il punto su quello che si &egrave; imparato, fornendo anche spunti e consigli di riflessione</li></ol>', '<p>The meetings follow the segmented lesson methodology, divided into:&nbsp;</p><ol><li>Pre-knowledge: starting from what is already known through initial brainstorming or retrieval of prior knowledge.&nbsp;</li><li>Lesson: to explain the topic with \"brief\" moments, without sacrificing complexity.&nbsp;</li><li>Activity: with operational and collaborative exercises, to put into practice, engage in discussions, and recognize any difficulties.&nbsp;</li><li>Feedback: to clarify doubts, with sharing, feedback and explanations regarding the activities carried out.</li><li>Conclusion: to summarize what has been learned, providing insights and reflective advice as well.</li></ol>', 'COM', 18, 22, 12, NULL, NULL, NULL, '/assets/courses/course_22'),
(23, 'Inchiostri dell’anima', 'Inks of Soul', 2023, '<p>Una straordinaria avventura nella scrittura autobiografica per rivelare i segreti della tua identit&agrave; e del tuo essere unico.</p><p>Un viaggio nel profondo del proprio essere attraverso le parole che disegnano la mappa della tua interiorit&agrave;, imparando a raccontare di s&egrave; attraverso le tecniche, le scelte lessicali e le strategie di scrittura adatte a rendere interessante e coinvolgente la propria narrazione.</p><p>Sei pronto a immergerti nelle profondit&agrave; di te stesso? Allora preparati a scrivere, a rivelare e a scoprire la tua unica e straordinaria identit&agrave; attraverso la scrittura autobiografica in prosa.</p>', '<p>An extraordinary adventure in autobiographical writing to reveal the secrets of your identity and your uniqueness. A journey deep into your own being through words that map your-inner-self, learning to tell your story through techniques, lexical choices, and writing strategies that make your narrative interesting and engaging. Are you ready to dive into the depths of yourself? Then get ready to write, reveal, and discover your unique and extraordinary identity through prose autobiographical writing.</p>', 0, 2, '<p>Seguendo questo corso sarai in grado di:</p><ul><li>individuare possibili spunti di scrittura tramite attivatori</li><li>&ldquo;smontare&rdquo; un testo mentore di genere autobiografico</li><li>usare strategie di scrittura</li><li>riflettere sulla funzione della parola scritta</li></ul>', '<p>By following this course you will be able to:</p><ul><li>identify possible writing cues through activators</li><li>\"disassemble\" an autobiographical mentor text</li><li>use writing strategies</li><li>reflect on the function of the written word</li></ul>', '<ul><li>frequenza di almeno il 60%</li><li>partecipazione attiva</li><li>puntualit&agrave; e completezza nella consegna</li><li>valutazione dei prodotti in progress, ossia degli scritti realizzati durante la prima parte della lezione (cadenza settimanale)</li><li>valutazione del lavoro finale realizzato durante il modulo, ovvero la realizzazione di un breve testo autobiografico sotto forma di memoir</li></ul>', '<ul><li>Attendance of at least 60%&nbsp;</li><li>Active participation&nbsp;</li><li>Punctuality and completeness in the completion of assignments&nbsp;</li><li>Evaluation of in-progress products, meaning the writings produced during the first part of the lesson (weekly frequency)&nbsp;</li><li>Evaluation of the final work completed during the module, which is the creation of a short autobiographical text in the form of a memoir.</li></ul>', '<p>Il modulo &egrave; un laboratorio di scrittura con metodologia Writing and Reading Workshop (WRW) e si basa su due elementi: il &ldquo;fare assieme&rdquo; in classe lavorando sul processo di scrittura e la divisione dell&rsquo;attivit&agrave; in mini lezioni che sono suddivise in tre momenti fondamentali:</p><ol type=\"a\"><li>stesura di un mini testo in 10 minuti partendo da uno stimolo</li><li>riflessione sulla consegna attraverso l&rsquo;analisi di testi campione che stimolano la riflessione</li><li>condivisione del lavoro personale e riflessione sulle modalit&agrave; di procedura</li></ol>', '<p>The module is a writing workshop using the &ldquo;Writing and Reading Workshop (WRW)&rdquo; methodology, based on two elements: \"working together\" in class to focus on the writing process and breaking the activity down into mini-lessons that are divided into three key moments:&nbsp;</p><ol type=\"a\"><li>Writing a mini-text in 10 minutes starting from a prompt&nbsp;</li><li>Reflecting on the task through the analysis of sample texts that encourage reflection</li><li>Sharing personal work and reflecting on the procedural methods</li></ol>', 'COM', 18, 22, 12, NULL, NULL, NULL, NULL),
(24, 'Gli animali e noi / Gli animali intorno a noi. L\'essere umano: un animale tra gli animali', 'Animals and Us / Animals Around Us. Human being: an animal among animals', 2023, '<p>Da dove nasce il legame essere umano-animale? Perch&eacute; gli animali contribuiscono positivamente al benessere delle persone? E perch&eacute; proprio il cane?</p>', '<p>Where does the human-animal bond come from? Why do animals make a positive contribution to human well-being? And why the dog in particular?</p>', 0, 2, '<p>Il percorso in lingua inglese ha lo scopo sia di migliorare le abilit&agrave; linguistiche del gruppo classe, sia di evidenziare l&rsquo;importanza del rapporto tra esseri umani e animali domestici e selvatici, sulla base del principio che l&rsquo;essere umano sia animale tra gli animali.&nbsp;</p><p>Il modulo parte dal presupposto che l&rsquo;interazione tra specie diverse sia un processo spontaneo per affrontare condizioni ambientali avverse e che il supporto di un altro animale sociale per natura con i sensi pi&ugrave; sviluppati dei nostri pu&ograve; rappresentare un vantaggio notevole per la nostra esistenza.&nbsp;</p><p>Attraverso lo studio delle differenze tra animali domestici e selvatici, gli habitat, l&rsquo;organizzazione sociale, l&rsquo;interazione con gli esseri umani, il contributo alla comprensione dei comportamenti umani e il ruolo della rappresentazione degli animali nelle arti, il percorso si propone di fornire agli studenti e alle studentesse un un affinamento degli strumenti per comprendere il ruolo centrale degli animali all&rsquo;interno delle societ&agrave; umane.</p>', '<p>The English language course aims both to improve the language skills of the class group and to highlight the importance of the relationship between humans and domestic and wild animals, based on the principle that humans are animals among animals. <br />The module assumes that interaction between different species is a spontaneous process to cope with adverse environmental conditions and that the support of another social animal by nature with more developed senses than ours can be a considerable advantage for our existence. <br />Through the study of differences between domestic and wild animals, habitats, social organisation, interaction with humans, contribution to the understanding of human behaviour and the role of animal representation in the arts, the course aims to provide students with a refinement of the tools to understand the central role of animals within human societies.</p>', '<p>Svolgimento test in itinere e compito conclusivo.</p><p>Saranno valutati i progressi ottenuti nell\'ambito delle abilit&agrave; comunicative, dell&rsquo;ampliamento del lessico e delle competenze acquisite.</p><p>Saranno oggetto di valutazione anche la puntualit&agrave; e la cura nello svolgere i compiti assegnati, gli interventi personali e il supporto al lavoro dei compagni.</p><p>Presenza almeno 60% ore.</p>', '<p>In-course test and final task.<br />Progress in communication skills, vocabulary expansion and acquired skills will be assessed.<br />Punctuality and care in carrying out assigned tasks, personal interventions and support for classmates\' work will also be assessed.<br />Attendance at least 60% hours.</p>', '<p>Le attivit&agrave; in classe saranno orientate a sollecitare l\'esposizione orale in lingua inglese, privilegiando il contenuto piuttosto che la correttezza grammaticale. Si far&agrave; quindi largo uso della lezione dialogata e dell\'apprendimento attraverso la partecipazione in prima persona.&nbsp;</p><p>Nello specifico la metodologia sar&agrave; la seguente:</p><ul><li>Brainstorming;</li><li>Lezioni partecipate e dialogate con immagini e video;</li><li>Reading and Comprehension;</li><li>Listening and Speaking activities;</li><li>Lavori a coppie;</li><li>Uso di strumenti informatici;</li><li>Ricerche e approfondimenti individuali;</li><li>Uso di mappe concettuali;</li><li>Piccoli lavori di gruppo;</li><li>Esercizio alla pratica dell&rsquo;esposizione orale;</li><li>Inquiry Based Learning;</li><li>Flipped Classroom;</li><li>Problem solving.</li></ul>', '<p>Classroom activities will be focused on soliciting oral exposition in English, emphasizing content rather than grammatical correctness. Therefore, extensive use will be made of the dialogic lesson and learning through first-person participation. <br />Specifically, the methodology will be as follows:</p><ul><li>Brainstorming;</li><li>Participatory and dialogic teaching;</li><li>Pictures and videos;</li><li>Reading and Comprehension;</li><li>Listening and Speaking activities;</li><li>Pair work;</li><li>Use of computer tools;</li><li>Individual research and in-depth study;</li><li>Use of concept maps;</li><li>Small group work;</li><li>Exercise in oral expository practice;</li><li>Inquiry Based Learning;</li><li>Flipped Classroom;</li><li>Problem solving.</li></ul>', 'COM', 21, 22, 2, NULL, NULL, NULL, NULL),
(25, 'Esistono due tipi di bugie: le bugie e le statistiche', 'There are two kinds of lies: lies and statistics', 2023, '<p>In un\'epoca in cui i dati pervadono ogni aspetto della nostra esistenza, la loro comprensione &egrave; diventata una competenza fondamentale.</p><p>Il corso &egrave; progettato per introdurre gli studenti alla statistica e per mostrarne l&rsquo;impatto tangibile sulla nostra quotidianit&agrave;. Nel corso delle lezioni, acquisiremo competenze nella raccolta accurata dei dati, nella loro elaborazione per generare grafici significativi mediante l\'impiego di strumenti software. Inoltre, impareremo a utilizzare strategicamente queste informazioni per prendere decisioni informate e razionali.</p>', '<p>At a time when data pervades every aspect of our existence, their understanding has become a fundamental skill.<br />The course is designed to introduce students to statistics and to show their tangible impact on our daily lives. During the lessons, we will acquire skills in the accurate collection of data, in their processing to generate meaningful graphs through the use of software tools. In addition, we will learn to strategically use this information to make informed and rational decisions.</p>', 0, 2, '<ol><li aria-level=\"1\"><strong>Valutare dati in modo critico.</strong> Gli studenti potranno analizzare dati reali e prendere decisioni basate su prove solide.</li><li aria-level=\"1\"><strong>Gestire dati in modo competente.</strong> Gli studenti saranno in grado di raccogliere, elaborare e organizzare dati.</li><li aria-level=\"1\"><strong>Creare grafici efficaci.</strong> Gli studenti potranno comunicare visivamente i dati attraverso grafici a barre, istogrammi e diagrammi a dispersione.</li><li aria-level=\"1\"><strong>Comprendere misure statistiche.</strong> Gli studenti conosceranno le misure di tendenza centrale e dispersione e sapranno come applicarle in contesti reali.</li><li aria-level=\"1\"><strong>Pensiero critico e onest&agrave;.</strong> Gli studenti saranno in grado di applicare le loro competenze statistiche in situazioni reali, come interpretare dati di notizie, sondaggi o altre fonti di informazioni, valutando criticamente le analisi statistiche e identificando eventuali manipolazioni o distorsioni dei dati.</li></ol>', '<ol><li>Evaluate data critically. Students will analyze real data and make decisions based on solid evidence.</li><li>Manage data competently. Students will be able to collect, process and organize data.</li><li>Create effective graphs. Students will communicate data visually through bar charts, histograms, and scatterplot diagrams.</li><li>Understand statistical measures. Students will know the measures of central trend and dispersion and will know how to apply them in real contexts.</li><li>Critical thinking and honesty. Students will be able to apply their statistical skills in real-world situations, such as interpreting news data, surveys or other sources of information, critically evaluating statistical analysis and identifying any manipulation or distortion of data.</li></ol>', '<ol><li><strong>Valutazione finale</strong>: il voto finale sar&agrave; basato sulla combinazione dei punteggi ottenuti nelle prove in itinere e sulla verifica finale.</li><li><strong>Prove in itinere:</strong> al termine delle singole lezioni potrebbe essere somministrato un test breve per valutare la comprensione immediata degli argomenti trattati.</li><li><strong>Verifica finale:</strong> alla fine del corso, gli studenti affronteranno una verifica completa che coprir&agrave; l\'intero percorso.</li></ol>', '<ol><li>Final assessment: the final grade will be based on the combination of the scores obtained in the ongoing tests and on the final verification.</li><li>In itinere tests: at the end of the individual lessons a short test could be administered to evaluate the immediate understanding of the topics covered.</li><li>Final examination: at the end of the course, students will face a complete examination that will cover the entire course.</li></ol>', '<ol><li><strong>Conclusioni statistiche ed etica:</strong> metodologie per trarre conclusioni basate sui dati senza pregiudizi, identificazione e prevenzione di errori comuni nelle analisi statistiche, riflessione sull\'uso disonesto delle statistiche e promozione dell\'onest&agrave; nell\'analisi e nella comunicazione dei dati.</li><li><strong>Introduzione alla statistica:</strong> esplorazione dei concetti fondamentali della statistica e discussione della loro rilevanza nella vita quotidiana.</li><li><strong>Raccolta e classificazione dei dati:</strong> pratica nella raccolta accurata dei dati e nell\'organizzazione in base alle loro caratteristiche distintive.</li><li><strong>Elaborazione dati e grafici:</strong> utilizzo di software specializzato per elaborare dati e creare grafici efficaci, tra cui grafici a barre, istogrammi e diagrammi a dispersione.</li><li><strong>Misure di tendenza centrale e dispersione:</strong> applicazione di misure di tendenza centrale (media, mediana, moda) e dispersione (deviazione standard, varianza) sui dati reali.</li></ol>', '<ol><li>Statistical and ethical conclusions: methodologies for drawing conclusions based on data without bias, identification and prevention of common errors in statistical analysis, reflection on the dishonest use of statistics and promotion of honesty in data analysis and communication.</li><li>Introduction to statistics: exploration of the fundamental concepts of statistics and discussion of their relevance in everyday life.</li><li>Data collection and classification: practice in accurate data collection and organization according to their distinctive characteristics.</li><li>Data and Graph Processing: Use specialized software to process data and create effective graphs, including bar charts, histograms, and scatter diagrams.</li><li>Measures of central trend and dispersion: application of measures of central trend (mean, median, fashion) and dispersion (standard deviation, variance) on the real data.</li></ol>', 'SM', 18, 22, 11, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `grade`
--

CREATE TABLE `grade` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `project_class_course_id` int(11) NOT NULL,
  `project_class_session` int(11) NOT NULL,
  `italian_description` varchar(1000) NOT NULL,
  `english_description` varchar(1000) NOT NULL,
  `publication` datetime NOT NULL,
  `grade` float NOT NULL,
  `final` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `grade`
--


-- --------------------------------------------------------

--
-- Struttura della tabella `subscribed`
--

CREATE TABLE `subscribed` (
  `student_id` int(11) NOT NULL,
  `project_class_course_id` int(11) NOT NULL,
  `project_class_session` int(11) NOT NULL,
  `section` varchar(3) NOT NULL DEFAULT '',
  `learning_context_id` varchar(5) NOT NULL,
  `pending` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `subscribed`
--

INSERT INTO `subscribed` (`student_id`, `project_class_course_id`, `project_class_session`, `section`, `learning_context_id`, `pending`) VALUES
(1, 2, 1, 'A', 'SPE', NULL),
(1, 6, 1, 'A', 'PER', NULL),
(1, 7, 1, 'A', 'SPE', NULL),
(1, 10, 1, 'A', 'SPE', NULL),
(1, 13, 1, 'A', 'SPE', NULL),
(1, 19, 1, 'A', 'SPE', NULL),
(2, 2, 1, 'A', 'SPE', NULL),
(2, 3, 1, 'A', 'SPE', NULL),
(2, 5, 1, 'A', 'SPE', NULL),
(2, 9, 1, 'A', 'PER', NULL),
(2, 13, 1, 'A', 'SPE', NULL),
(2, 16, 1, 'A', 'SPE', NULL),
(3, 1, 1, 'A', 'SPE', NULL),
(3, 3, 1, 'A', 'SPE', NULL),
(3, 6, 1, 'A', 'PER', NULL),
(3, 7, 1, 'A', 'SPE', NULL),
(3, 15, 1, 'A', 'SPE', NULL),
(3, 19, 1, 'A', 'SPE', NULL),
(4, 1, 1, 'A', 'SPE', NULL),
(4, 2, 1, 'A', 'SPE', NULL),
(4, 7, 1, 'A', 'SPE', NULL),
(4, 10, 1, 'A', 'SPE', NULL),
(4, 17, 1, 'A', 'PER', NULL),
(4, 19, 1, 'A', 'SPE', NULL),
(5, 1, 1, 'A', 'SPE', NULL),
(5, 5, 1, 'A', 'SPE', NULL),
(5, 6, 1, 'A', 'PER', NULL),
(5, 10, 1, 'A', 'SPE', NULL),
(5, 15, 1, 'A', 'SPE', NULL),
(5, 19, 1, 'A', 'SPE', NULL),
(6, 2, 1, 'A', 'SPE', NULL),
(6, 3, 1, 'A', 'SPE', NULL),
(6, 6, 1, 'A', 'PER', NULL),
(6, 12, 1, 'A', 'SPE', NULL),
(6, 13, 1, 'A', 'SPE', NULL),
(6, 14, 1, 'A', 'SPE', NULL),
(7, 2, 1, 'A', 'SPE', NULL),
(7, 6, 1, 'A', 'PER', NULL),
(7, 7, 1, 'A', 'SPE', NULL),
(7, 10, 1, 'A', 'SPE', NULL),
(7, 13, 1, 'A', 'SPE', NULL),
(7, 19, 1, 'A', 'SPE', NULL),
(8, 3, 1, 'A', 'SPE', NULL),
(8, 11, 1, 'A', 'SPE', NULL),
(8, 12, 1, 'A', 'SPE', NULL),
(8, 14, 1, 'A', 'SPE', NULL),
(8, 17, 1, 'A', 'PER', NULL),
(8, 18, 1, 'A', 'SPE', NULL),
(9, 2, 1, 'A', 'SPE', NULL),
(9, 7, 1, 'A', 'SPE', NULL),
(9, 10, 1, 'A', 'SPE', NULL),
(9, 11, 1, 'A', 'SPE', NULL),
(9, 17, 1, 'A', 'PER', NULL),
(9, 19, 1, 'A', 'SPE', NULL),
(10, 1, 1, 'A', 'SPE', NULL),
(10, 2, 1, 'A', 'SPE', NULL),
(10, 3, 1, 'A', 'SPE', NULL),
(10, 14, 1, 'A', 'SPE', NULL),
(10, 17, 1, 'A', 'PER', NULL),
(10, 19, 1, 'A', 'SPE', NULL),
(11, 1, 1, 'A', 'SPE', NULL),
(11, 2, 1, 'A', 'SPE', NULL),
(11, 5, 1, 'A', 'SPE', NULL),
(11, 6, 1, 'A', 'PER', NULL),
(11, 10, 1, 'A', 'SPE', NULL),
(11, 12, 1, 'A', 'SPE', NULL),
(12, 5, 1, 'A', 'SPE', NULL),
(12, 8, 1, 'A', 'PER', NULL),
(12, 10, 1, 'A', 'SPE', NULL),
(12, 11, 1, 'A', 'SPE', NULL),
(12, 12, 1, 'A', 'SPE', NULL),
(12, 18, 1, 'A', 'SPE', NULL),
(13, 3, 1, 'A', 'SPE', NULL),
(13, 8, 1, 'A', 'PER', NULL),
(13, 11, 1, 'A', 'SPE', NULL),
(13, 14, 1, 'A', 'SPE', NULL),
(13, 15, 1, 'A', 'SPE', NULL),
(13, 16, 1, 'A', 'SPE', NULL),
(14, 3, 1, 'A', 'SPE', NULL),
(14, 6, 1, 'A', 'PER', NULL),
(14, 11, 1, 'A', 'SPE', NULL),
(14, 12, 1, 'A', 'SPE', NULL),
(14, 14, 1, 'A', 'SPE', NULL),
(14, 18, 1, 'A', 'SPE', NULL),
(15, 1, 1, 'A', 'SPE', NULL),
(15, 2, 1, 'A', 'SPE', NULL),
(15, 6, 1, 'A', 'PER', NULL),
(15, 10, 1, 'A', 'SPE', NULL),
(15, 14, 1, 'A', 'SPE', NULL),
(15, 16, 1, 'A', 'SPE', NULL),
(16, 3, 1, 'A', 'SPE', NULL),
(16, 5, 1, 'A', 'SPE', NULL),
(16, 9, 1, 'A', 'PER', NULL),
(16, 12, 1, 'A', 'SPE', NULL),
(16, 13, 1, 'A', 'SPE', NULL),
(16, 18, 1, 'A', 'SPE', NULL),
(17, 3, 1, 'A', 'SPE', NULL),
(17, 9, 1, 'A', 'PER', NULL),
(17, 12, 1, 'A', 'SPE', NULL),
(17, 13, 1, 'A', 'SPE', NULL),
(17, 14, 1, 'A', 'SPE', NULL),
(17, 18, 1, 'A', 'SPE', NULL),
(18, 3, 1, 'A', 'SPE', NULL),
(18, 6, 1, 'A', 'PER', NULL),
(18, 11, 1, 'A', 'SPE', NULL),
(18, 12, 1, 'A', 'SPE', NULL),
(18, 14, 1, 'A', 'SPE', NULL),
(18, 18, 1, 'A', 'SPE', NULL),
(19, 1, 1, 'A', 'SPE', NULL),
(19, 3, 1, 'A', 'SPE', NULL),
(19, 8, 1, 'A', 'PER', NULL),
(19, 12, 1, 'A', 'SPE', NULL),
(19, 14, 1, 'A', 'SPE', NULL),
(19, 18, 1, 'A', 'SPE', NULL),
(20, 3, 1, 'A', 'SPE', NULL),
(20, 5, 1, 'A', 'SPE', NULL),
(20, 11, 1, 'A', 'SPE', NULL),
(20, 12, 1, 'A', 'SPE', NULL),
(20, 15, 1, 'A', 'SPE', NULL),
(20, 17, 1, 'A', 'PER', NULL),
(21, 5, 1, 'A', 'SPE', NULL),
(21, 10, 1, 'A', 'SPE', NULL),
(21, 11, 1, 'A', 'SPE', NULL),
(21, 16, 1, 'A', 'SPE', NULL),
(21, 17, 1, 'A', 'PER', NULL),
(21, 18, 1, 'A', 'SPE', NULL),
(22, 1, 1, 'A', 'SPE', NULL),
(22, 2, 1, 'A', 'SPE', NULL),
(22, 6, 1, 'A', 'PER', NULL),
(22, 10, 1, 'A', 'SPE', NULL),
(22, 14, 1, 'A', 'SPE', NULL),
(22, 16, 1, 'A', 'SPE', NULL),
(23, 1, 1, 'A', 'SPE', NULL),
(23, 6, 1, 'A', 'PER', NULL),
(23, 10, 1, 'A', 'SPE', NULL),
(23, 14, 1, 'A', 'SPE', NULL),
(23, 16, 1, 'A', 'SPE', NULL),
(23, 18, 1, 'A', 'SPE', NULL),
(24, 4, 1, 'A', 'SPE', NULL),
(24, 5, 1, 'A', 'SPE', NULL),
(24, 11, 1, 'A', 'SPE', NULL),
(24, 12, 1, 'A', 'SPE', NULL),
(24, 17, 1, 'A', 'PER', NULL),
(24, 18, 1, 'A', 'SPE', NULL),
(25, 2, 1, 'A', 'SPE', NULL),
(25, 4, 1, 'A', 'SPE', NULL),
(25, 8, 1, 'A', 'PER', NULL),
(25, 12, 1, 'A', 'SPE', NULL),
(25, 13, 1, 'A', 'SPE', NULL),
(25, 14, 1, 'A', 'SPE', NULL),
(26, 1, 1, 'A', 'SPE', NULL),
(26, 4, 1, 'A', 'SPE', NULL),
(26, 7, 1, 'A', 'SPE', NULL),
(26, 8, 1, 'A', 'PER', NULL),
(26, 15, 1, 'A', 'SPE', NULL),
(26, 19, 1, 'A', 'SPE', NULL),
(27, 1, 1, 'A', 'SPE', NULL),
(27, 3, 1, 'A', 'SPE', NULL),
(27, 5, 1, 'A', 'SPE', NULL),
(27, 6, 1, 'A', 'PER', NULL),
(27, 12, 1, 'A', 'SPE', NULL),
(27, 18, 1, 'A', 'SPE', NULL),
(28, 4, 1, 'A', 'SPE', NULL),
(28, 5, 1, 'A', 'SPE', NULL),
(28, 8, 1, 'A', 'PER', NULL),
(28, 13, 1, 'A', 'SPE', NULL),
(28, 18, 1, 'A', 'SPE', NULL),
(28, 19, 1, 'A', 'SPE', NULL),
(29, 7, 1, 'A', 'SPE', NULL),
(29, 10, 1, 'A', 'SPE', NULL),
(29, 11, 1, 'A', 'SPE', NULL),
(29, 16, 1, 'A', 'SPE', NULL),
(29, 17, 1, 'A', 'PER', NULL),
(29, 18, 1, 'A', 'SPE', NULL),
(30, 4, 1, 'A', 'SPE', NULL),
(30, 5, 1, 'A', 'SPE', NULL),
(30, 9, 1, 'A', 'PER', NULL),
(30, 11, 1, 'A', 'SPE', NULL),
(30, 16, 1, 'A', 'SPE', NULL),
(30, 18, 1, 'A', 'SPE', NULL),
(31, 1, 1, 'A', 'SPE', NULL),
(31, 2, 1, 'A', 'SPE', NULL),
(31, 4, 1, 'A', 'SPE', NULL),
(31, 7, 1, 'A', 'SPE', NULL),
(31, 12, 1, 'A', 'SPE', NULL),
(31, 17, 1, 'A', 'PER', NULL),
(32, 1, 1, 'A', 'SPE', NULL),
(32, 2, 1, 'A', 'SPE', NULL),
(32, 5, 1, 'A', 'SPE', NULL),
(32, 6, 1, 'A', 'PER', NULL),
(32, 10, 1, 'A', 'SPE', NULL),
(32, 16, 1, 'A', 'SPE', NULL),
(33, 1, 1, 'A', 'SPE', NULL),
(33, 2, 1, 'A', 'SPE', NULL),
(33, 5, 1, 'A', 'SPE', NULL),
(33, 6, 1, 'A', 'PER', NULL),
(33, 10, 1, 'A', 'SPE', NULL),
(33, 16, 1, 'A', 'SPE', NULL),
(34, 5, 1, 'A', 'SPE', NULL),
(34, 8, 1, 'A', 'PER', NULL),
(34, 10, 1, 'A', 'SPE', NULL),
(34, 11, 1, 'A', 'SPE', NULL),
(34, 16, 1, 'A', 'SPE', NULL),
(34, 18, 1, 'A', 'SPE', NULL),
(35, 2, 1, 'A', 'SPE', NULL),
(35, 6, 1, 'A', 'PER', NULL),
(35, 10, 1, 'A', 'SPE', NULL),
(35, 12, 1, 'A', 'SPE', NULL),
(35, 13, 1, 'A', 'SPE', NULL),
(35, 14, 1, 'A', 'SPE', NULL),
(36, 1, 1, 'A', 'SPE', NULL),
(36, 2, 1, 'A', 'SPE', NULL),
(36, 3, 1, 'A', 'SPE', NULL),
(36, 5, 1, 'A', 'SPE', NULL),
(36, 8, 1, 'A', 'PER', NULL),
(36, 16, 1, 'A', 'SPE', NULL),
(37, 1, 1, 'A', 'SPE', NULL),
(37, 4, 1, 'A', 'SPE', NULL),
(37, 7, 1, 'A', 'SPE', NULL),
(37, 12, 1, 'A', 'SPE', NULL),
(37, 17, 1, 'A', 'PER', NULL),
(37, 18, 1, 'A', 'SPE', NULL),
(38, 1, 1, 'A', 'SPE', NULL),
(38, 2, 1, 'A', 'SPE', NULL),
(38, 4, 1, 'A', 'SPE', NULL),
(38, 5, 1, 'A', 'SPE', NULL),
(38, 8, 1, 'A', 'PER', NULL),
(38, 19, 1, 'A', 'SPE', NULL),
(39, 10, 1, 'A', 'SPE', NULL),
(39, 11, 1, 'A', 'SPE', NULL),
(39, 14, 1, 'A', 'SPE', NULL),
(39, 16, 1, 'A', 'SPE', NULL),
(39, 17, 1, 'A', 'PER', NULL),
(39, 18, 1, 'A', 'SPE', NULL),
(40, 4, 1, 'A', 'SPE', NULL),
(40, 8, 1, 'A', 'PER', NULL),
(40, 11, 1, 'A', 'SPE', NULL),
(40, 14, 1, 'A', 'SPE', NULL),
(40, 16, 1, 'A', 'SPE', NULL),
(40, 18, 1, 'A', 'SPE', NULL),
(41, 2, 1, 'A', 'SPE', NULL),
(41, 4, 1, 'A', 'SPE', NULL),
(41, 7, 1, 'A', 'SPE', NULL),
(41, 11, 1, 'A', 'SPE', NULL),
(41, 17, 1, 'A', 'PER', NULL),
(41, 19, 1, 'A', 'SPE', NULL),
(43, 1, 1, 'A', 'SPE', NULL),
(43, 2, 1, 'A', 'SPE', NULL),
(43, 4, 1, 'A', 'SPE', NULL),
(43, 7, 1, 'A', 'SPE', NULL),
(43, 12, 1, 'A', 'SPE', NULL),
(43, 17, 1, 'A', 'PER', NULL),
(44, 4, 1, 'A', 'SPE', NULL),
(44, 7, 1, 'A', 'SPE', NULL),
(44, 9, 1, 'A', 'PER', NULL),
(44, 13, 1, 'A', 'SPE', NULL),
(44, 15, 1, 'A', 'SPE', NULL),
(44, 16, 1, 'A', 'SPE', NULL),
(45, 4, 1, 'A', 'SPE', NULL),
(45, 9, 1, 'A', 'PER', NULL),
(45, 13, 1, 'A', 'SPE', NULL),
(45, 14, 1, 'A', 'SPE', NULL),
(45, 15, 1, 'A', 'SPE', NULL),
(45, 16, 1, 'A', 'SPE', NULL),
(46, 2, 1, 'A', 'SPE', NULL),
(46, 5, 1, 'A', 'SPE', NULL),
(46, 6, 1, 'A', 'PER', NULL),
(46, 10, 1, 'A', 'SPE', NULL),
(46, 11, 1, 'A', 'SPE', NULL),
(46, 12, 1, 'A', 'SPE', NULL),
(47, 1, 1, 'A', 'SPE', NULL),
(47, 4, 1, 'A', 'SPE', NULL),
(47, 7, 1, 'A', 'SPE', NULL),
(47, 8, 1, 'A', 'PER', NULL),
(47, 18, 1, 'A', 'SPE', NULL),
(47, 19, 1, 'A', 'SPE', NULL),
(48, 3, 1, 'A', 'SPE', NULL),
(48, 7, 1, 'A', 'SPE', NULL),
(48, 9, 1, 'A', 'PER', NULL),
(48, 11, 1, 'A', 'SPE', NULL),
(48, 15, 1, 'A', 'SPE', NULL),
(48, 19, 1, 'A', 'SPE', NULL),
(49, 5, 1, 'A', 'SPE', NULL),
(49, 9, 1, 'A', 'PER', NULL),
(49, 10, 1, 'A', 'SPE', NULL),
(49, 13, 1, 'A', 'SPE', NULL),
(49, 15, 1, 'A', 'SPE', NULL),
(49, 19, 1, 'A', 'SPE', NULL),
(50, 4, 1, 'A', 'SPE', NULL),
(50, 9, 1, 'A', 'PER', NULL),
(50, 13, 1, 'A', 'SPE', NULL),
(50, 14, 1, 'A', 'SPE', NULL),
(50, 15, 1, 'A', 'SPE', NULL),
(50, 16, 1, 'A', 'SPE', NULL),
(51, 4, 1, 'A', 'SPE', NULL),
(51, 5, 1, 'A', 'SPE', NULL),
(51, 8, 1, 'A', 'PER', NULL),
(51, 13, 1, 'A', 'SPE', NULL),
(51, 15, 1, 'A', 'SPE', NULL),
(51, 16, 1, 'A', 'SPE', NULL),
(52, 2, 1, 'A', 'SPE', NULL),
(52, 4, 1, 'A', 'SPE', NULL),
(52, 9, 1, 'A', 'PER', NULL),
(52, 11, 1, 'A', 'SPE', NULL),
(52, 12, 1, 'A', 'SPE', NULL),
(52, 14, 1, 'A', 'SPE', NULL),
(54, 4, 1, 'A', 'SPE', NULL),
(54, 7, 1, 'A', 'SPE', NULL),
(54, 9, 1, 'A', 'PER', NULL),
(54, 13, 1, 'A', 'SPE', NULL),
(54, 15, 1, 'A', 'SPE', NULL),
(54, 16, 1, 'A', 'SPE', NULL),
(55, 3, 1, 'A', 'SPE', NULL),
(55, 13, 1, 'A', 'SPE', NULL),
(55, 14, 1, 'A', 'SPE', NULL),
(55, 15, 1, 'A', 'SPE', NULL),
(55, 17, 1, 'A', 'PER', NULL),
(55, 19, 1, 'A', 'SPE', NULL),
(56, 1, 1, 'A', 'SPE', NULL),
(56, 3, 1, 'A', 'SPE', NULL),
(56, 7, 1, 'A', 'SPE', NULL),
(56, 9, 1, 'A', 'PER', NULL),
(56, 15, 1, 'A', 'SPE', NULL),
(56, 19, 1, 'A', 'SPE', NULL),
(57, 3, 1, 'A', 'SPE', NULL),
(57, 13, 1, 'A', 'SPE', NULL),
(57, 14, 1, 'A', 'SPE', NULL),
(57, 15, 1, 'A', 'SPE', NULL),
(57, 17, 1, 'A', 'PER', NULL),
(57, 19, 1, 'A', 'SPE', NULL),
(58, 4, 1, 'A', 'SPE', NULL),
(58, 7, 1, 'A', 'SPE', NULL),
(58, 9, 1, 'A', 'PER', NULL),
(58, 13, 1, 'A', 'SPE', NULL),
(58, 15, 1, 'A', 'SPE', NULL),
(58, 19, 1, 'A', 'SPE', NULL),
(59, 3, 1, 'A', 'SPE', NULL),
(59, 7, 1, 'A', 'SPE', NULL),
(59, 9, 1, 'A', 'PER', NULL),
(59, 11, 1, 'A', 'SPE', NULL),
(59, 15, 1, 'A', 'SPE', NULL),
(59, 19, 1, 'A', 'SPE', NULL),
(60, 8, 1, 'A', 'PER', NULL),
(60, 10, 1, 'A', 'SPE', NULL),
(60, 11, 1, 'A', 'SPE', NULL),
(60, 12, 1, 'A', 'SPE', NULL),
(60, 14, 1, 'A', 'SPE', NULL),
(60, 18, 1, 'A', 'SPE', NULL),
(61, 3, 1, 'A', 'SPE', NULL),
(61, 5, 1, 'A', 'SPE', NULL),
(61, 9, 1, 'A', 'PER', NULL),
(61, 13, 1, 'A', 'SPE', NULL),
(61, 15, 1, 'A', 'SPE', NULL),
(61, 19, 1, 'A', 'SPE', NULL),
(62, 1, 1, 'A', 'SPE', NULL),
(62, 4, 1, 'A', 'SPE', NULL),
(62, 7, 1, 'A', 'SPE', NULL),
(62, 8, 1, 'A', 'PER', NULL),
(62, 18, 1, 'A', 'SPE', NULL),
(62, 19, 1, 'A', 'SPE', NULL),
(63, 7, 1, 'A', 'SPE', NULL),
(63, 8, 1, 'A', 'PER', NULL),
(63, 10, 1, 'A', 'SPE', NULL),
(63, 13, 1, 'A', 'SPE', NULL),
(63, 15, 1, 'A', 'SPE', NULL),
(63, 19, 1, 'A', 'SPE', NULL),
(64, 4, 1, 'A', 'SPE', NULL),
(64, 5, 1, 'A', 'SPE', NULL),
(64, 8, 1, 'A', 'PER', NULL),
(64, 13, 1, 'A', 'SPE', NULL),
(64, 15, 1, 'A', 'SPE', NULL),
(64, 16, 1, 'A', 'SPE', NULL),
(65, 4, 1, 'A', 'SPE', NULL),
(65, 7, 1, 'A', 'SPE', NULL),
(65, 9, 1, 'A', 'PER', NULL),
(65, 13, 1, 'A', 'SPE', NULL),
(65, 15, 1, 'A', 'SPE', NULL),
(65, 19, 1, 'A', 'SPE', NULL);

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
('TEC', 'Area tecnologica, artistica e motoria', 'Technological, artistic and motoric area', 'In quest\'area, uno studente ha la possibilità di avere a che fare con le tecnologie all\'avanguardia nel settore', 'In this area, a student has the opportunity to deal with cutting-edge technologies in the field');

-- --------------------------------------------------------

--
-- Struttura della tabella `learning_session`
--

CREATE TABLE `learning_session` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `school_year` int(11) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `num_groups` int(11) NOT NULL,
  `open_day` date
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `learning_session`
--

INSERT INTO `learning_session` (`id`, `number`, `school_year`, `start`, `end`, `num_groups`, `open_day`) VALUES
(1, 1, 2023, '2023-09-19', '2023-10-27', 2, '2023-09-14'),
(2, 2, 2023, '2023-10-30', '2023-12-08', 2, '2023-10-19'),
(3, 3, 2023, '2023-12-11', '2024-02-02', 1, '2023-11-30'),
(4, 4, 2023, '2024-02-05', '2024-03-15', 1, '2024-01-24'),
(5, 5, 2023, '2024-03-18', '2024-04-26', 1, '2024-03-09');

-- --------------------------------------------------------

--
-- Struttura della tabella `learning_context`
--

CREATE TABLE `learning_context` (
  `id` varchar(5) NOT NULL,
  `italian_title` varchar(250) NOT NULL,
  `english_title` varchar(250) NOT NULL,
  `italian_description` varchar(1000) DEFAULT NULL,
  `english_description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `learning_context`
--

INSERT INTO `learning_context` (`id`, `italian_title`, `english_title`, `italian_description`, `english_description`) VALUES
('SPE', 'Progetto individuale \"SPECIFICO\"', 'Individual project \"SPECIFIC\"', '<p>\r\nAttività orientate al potenziamento delle abilità riguardanti il proprio settore\r\n</p>', '<p>\r\nActivities geared toward skill enhancement concerning one\'s field\r\n</p>'),
('PER', 'Progetto individuale \"PERSONALE\"', 'Individual project \"PERSONAL\"', NULL, NULL),
('ECA', '\"ESPERIENZE DI CITTADINANZA ATTIVA\"', '\"ACTIVE CITIZENSHIP EXPERIENCES\"', NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `limited`
--

CREATE TABLE `limited` (
  `id` int(11) NOT NULL,
  `learning_session_id` int(11) NOT NULL,
  `ordinary_class_study_year` int(11) NOT NULL,
  `ordinary_class_address` varchar(5) NOT NULL,
  `ordinary_class_school_year` int(11) NOT NULL,
  `learning_area_id` varchar(5),
  `learning_context_id` varchar(5) NOT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `limited`
--

INSERT INTO `limited` (`id`, `learning_session_id`, `ordinary_class_study_year`, `ordinary_class_address`, `ordinary_class_school_year`, `learning_area_id`, `learning_context_id`, `credits`) VALUES
(1, 1, 1, 'BIO', 2023, 'SM', 'SPE', 4),
(2, 1, 1, 'BIO', 2023, 'COM', 'SPE', 4),
(3, 1, 1, 'BIO', 2023, 'SGET', 'SPE', 2),
(4, 1, 1, 'BIO', 2023, NULL, 'PER', 3),
(5, 1, 1, 'TUR4', 2023, 'SM', 'SPE', 4),
(6, 1, 1, 'TUR4', 2023, 'COM', 'SPE', 4),
(7, 1, 1, 'TUR4', 2023, 'SGET', 'SPE', 2),
(8, 1, 1, 'TUR4', 2023, NULL, 'PER', 3),
(9, 1, 1, 'ODO', 2023, 'SM', 'SPE', 4),
(10, 1, 1, 'ODO', 2023, 'COM', 'SPE', 4),
(11, 1, 1, 'ODO', 2023, 'SGET', 'SPE', 2),
(12, 1, 1, 'ODO', 2023, NULL, 'PER', 3),
(13, 2, 1, 'BIO', 2023, 'SM', 'SPE', 4),
(14, 2, 1, 'BIO', 2023, 'COM', 'SPE', 4),
(15, 2, 1, 'BIO', 2023, 'TEC', 'SPE', 2),
(16, 2, 1, 'BIO', 2023, NULL, 'PER', 3),
(17, 2, 1, 'TUR4', 2023, 'SM', 'SPE', 4),
(18, 2, 1, 'TUR4', 2023, 'COM', 'SPE', 4),
(19, 2, 1, 'TUR4', 2023, 'TEC', 'SPE', 2),
(20, 2, 1, 'TUR4', 2023, NULL, 'PER', 3),
(21, 2, 1, 'ODO', 2023, 'SM', 'SPE', 4),
(22, 2, 1, 'ODO', 2023, 'COM', 'SPE', 4),
(23, 2, 1, 'ODO', 2023, 'TEC', 'SPE', 2),
(24, 2, 1, 'ODO', 2023, NULL, 'PER', 3),
(25, 3, 1, 'BIO', 2023, 'SM', 'SPE', 2),
(26, 3, 1, 'BIO', 2023, 'COM', 'SPE', 4),
(27, 3, 1, 'BIO', 2023, 'TEC', 'SPE', 2),
(28, 3, 1, 'BIO', 2023, 'SGET', 'SPE', 2),
(29, 3, 1, 'BIO', 2023, NULL, 'PER', 3),
(30, 3, 1, 'TUR4', 2023, 'SM', 'SPE', 2),
(31, 3, 1, 'TUR4', 2023, 'COM', 'SPE', 4),
(32, 3, 1, 'TUR4', 2023, 'TEC', 'SPE', 2),
(33, 3, 1, 'TUR4', 2023, 'SGET', 'SPE', 2),
(34, 3, 1, 'TUR4', 2023, NULL, 'PER', 3),
(35, 3, 1, 'ODO', 2023, 'SM', 'SPE', 2),
(36, 3, 1, 'ODO', 2023, 'COM', 'SPE', 4),
(37, 3, 1, 'ODO', 2023, 'TEC', 'SPE', 2),
(38, 3, 1, 'ODO', 2023, 'SGET', 'SPE', 2),
(39, 3, 1, 'ODO', 2023, NULL, 'PER', 3),
(40, 4, 1, 'BIO', 2023, 'SM', 'SPE', 4),
(41, 4, 1, 'BIO', 2023, 'COM', 'SPE', 4),
(42, 4, 1, 'BIO', 2023, 'SGET', 'SPE', 2),
(43, 4, 1, 'BIO', 2023, NULL, 'PER', 3),
(44, 4, 1, 'TUR4', 2023, 'SM', 'SPE', 4),
(45, 4, 1, 'TUR4', 2023, 'COM', 'SPE', 4),
(46, 4, 1, 'TUR4', 2023, 'SGET', 'SPE', 2),
(47, 4, 1, 'TUR4', 2023, NULL, 'PER', 3),
(48, 4, 1, 'ODO', 2023, 'SM', 'SPE', 4),
(49, 4, 1, 'ODO', 2023, 'COM', 'SPE', 4),
(50, 4, 1, 'ODO', 2023, 'SGET', 'SPE', 2),
(51, 4, 1, 'ODO', 2023, NULL, 'PER', 3),
(52, 5, 1, 'BIO', 2023, 'SM', 'SPE', 2),
(53, 5, 1, 'BIO', 2023, 'COM', 'SPE', 4),
(54, 5, 1, 'BIO', 2023, 'TEC', 'SPE', 2),
(55, 5, 1, 'BIO', 2023, 'SGET', 'SPE', 2),
(56, 5, 1, 'BIO', 2023, NULL, 'PER', 3),
(57, 5, 1, 'TUR4', 2023, 'SM', 'SPE', 2),
(58, 5, 1, 'TUR4', 2023, 'COM', 'SPE', 4),
(59, 5, 1, 'TUR4', 2023, 'TEC', 'SPE', 2),
(60, 5, 1, 'TUR4', 2023, 'SGET', 'SPE', 2),
(61, 5, 1, 'TUR4', 2023, NULL, 'PER', 3),
(62, 5, 1, 'ODO', 2023, 'SM', 'SPE', 2),
(63, 5, 1, 'ODO', 2023, 'COM', 'SPE', 4),
(64, 5, 1, 'ODO', 2023, 'TEC', 'SPE', 2),
(65, 5, 1, 'ODO', 2023, 'SGET', 'SPE', 2),
(66, 5, 1, 'ODO', 2023, NULL, 'PER', 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `ordinary_class`
--

CREATE TABLE `ordinary_class` (
  `study_year_id` int(11) NOT NULL,
  `study_address_id` varchar(5) NOT NULL,
  `school_year` int(11) NOT NULL,
  `italian_displayed_name` varchar(250) DEFAULT NULL,
  `english_displayed_name` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ordinary_class`
--

INSERT INTO `ordinary_class` (`study_year_id`, `study_address_id`, `school_year`, `italian_displayed_name`, `english_displayed_name`) VALUES
(1, 'TUR4', 2023, NULL, NULL),
(1, 'BIO', 2023, NULL, NULL),
(1, 'ODO', 2023, NULL, NULL);

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
  `teacher_id` int(11) NOT NULL,
  `coordinator` tinyint(1) DEFAULT 0,
  `tutor` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ordinary_teach`
--

INSERT INTO `ordinary_teach` (`ordinary_class_study_year`, `ordinary_class_address`, `ordinary_class_school_year`, `section`, `teaching_id`, `teacher_id`, `coordinator`, `tutor`) VALUES
(1, 'BIO', 2023, 'A', 'REL', 1, 0, 0),
(1, 'ODO', 2023, 'A', 'REL', 1, 0, 0),
(1, 'TUR4', 2023, 'A', 'REL', 1, 0, 0),
(1, 'BIO', 2023, 'A', 'ING', 2, 0, 0),
(1, 'ODO', 2023, 'A', 'ING', 2, 0, 0),
(1, 'ODO', 2023, 'A', 'TED', 2, 0, 0),
(1, 'BIO', 2023, 'A', 'SMS', 3, 0, 0),
(1, 'ODO', 2023, 'A', 'SMS', 3, 0, 0),
(1, 'TUR4', 2023, 'A', 'SMS', 3, 0, 0),
(1, 'BIO', 2023, 'A', 'MAT', 4, 0, 0),
(1, 'BIO', 2023, 'A', 'FIS', 4, 0, 0),
(1, 'BIO', 2023, 'A', 'DE', 5, 0, 0),
(1, 'ODO', 2023, 'A', 'DE', 5, 0, 0),
(1, 'BIO', 2023, 'A', 'TTRG', 6, 0, 0),
(1, 'ODO', 2023, 'A', 'MAT', 6, 0, 0),
(1, 'BIO', 2023, 'A', 'CHI', 7, 0, 0),
(1, 'ODO', 2023, 'A', 'CHI', 7, 0, 0),
(1, 'TUR4', 2023, 'A', 'EA', 8, 0, 0),
(1, 'ODO', 2023, 'A', 'IAF', 9, 0, 0),
(1, 'TUR4', 2023, 'A', 'TB', 9, 0, 0),
(1, 'ODO', 2023, 'A', 'RMO', 10, 0, 0),
(1, 'ODO', 2023, 'A', 'ELO', 10, 0, 0),
(1, 'TUR4', 2023, 'A', 'MAT', 11, 0, 0),
(1, 'TUR4', 2023, 'A', 'FIS', 11, 0, 0),
(1, 'BIO', 2023, 'A', 'ITA', 12, 0, 0),
(1, 'BIO', 2023, 'A', 'STO', 12, 0, 0),
(1, 'TUR4', 2023, 'A', 'ITA', 12, 0, 0),
(1, 'TUR4', 2023, 'A', 'STO', 12, 0, 0),
(1, 'TUR4', 2023, 'A', 'ING', 13, 0, 0),
(1, 'BIO', 2023, 'A', 'TB', 14, 0, 0),
(1, 'BIO', 2023, 'A', 'TED', 15, 0, 0),
(1, 'TUR4', 2023, 'A', 'TED', 15, 0, 0),
(1, 'TUR4', 2023, 'A', 'DE', 16, 0, 0),
(1, 'BIO', 2023, 'A', 'TI', 17, 0, 0),
(1, 'ODO', 2023, 'A', 'TIC', 17, 0, 0),
(1, 'TUR4', 2023, 'A', 'INF', 17, 0, 0),
(1, 'ODO', 2023, 'A', 'ITA', 18, 0, 0),
(1, 'ODO', 2023, 'A', 'STO', 18, 0, 0),
(1, 'TUR4', 2023, 'A', 'GEO', 19, 0, 0);

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
(3, 'Imprenditività', 'Entrepreneurship', NULL, NULL),
(4, 'Orientamento', 'Orientation', NULL, NULL),
(5, 'CLIL', 'CLIL', NULL, NULL),
(6, 'Educazione civica', 'Civic education', NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `project_class`
--

CREATE TABLE `project_class` (
  `course_id` int(11) NOT NULL,
  `learning_session_id` int(11) NOT NULL,
  `italian_displayed_name` varchar(250) DEFAULT NULL,
  `english_displayed_name` varchar(250) DEFAULT NULL,
  `group` int(11) NOT NULL DEFAULT 1,
  `num_section` int(11) NOT NULL DEFAULT 1,
  `proposer_teacher_id` int(11) NOT NULL,
  `certifying_admin_id` int(11) DEFAULT NULL,
  `admin_confirmation` date DEFAULT NULL,
  `to_be_modified` tinyint(1) DEFAULT NULL,
  `final_confirmation` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `project_class`
--

INSERT INTO `project_class` (`course_id`, `learning_session_id`, `italian_displayed_name`, `english_displayed_name`, `group`, `num_section`, `proposer_teacher_id`, `certifying_admin_id`, `admin_confirmation`, `to_be_modified`, `final_confirmation`) VALUES
(1, 1, NULL, NULL, 2, 1, 2, 2, '2023-09-14', NULL, '2023-09-18'),
(2, 1, NULL, NULL, 1, 1, 2, 2, '2023-09-14', NULL, '2023-09-18'),
(3, 1, NULL, NULL, 2, 1, 4, 2, '2023-09-14', NULL, '2023-09-18'),
(4, 1, NULL, NULL, 2, 1, 6, 2, '2023-09-14', NULL, '2023-09-18'),
(5, 1, NULL, NULL, 1, 1, 7, 2, '2023-09-14', NULL, '2023-09-18'),
(6, 1, NULL, NULL, 1, 1, 7, 2, '2023-09-14', NULL, '2023-09-18'),
(7, 1, NULL, NULL, 1, 1, 9, 2, '2023-09-14', NULL, '2023-09-18'),
(8, 1, NULL, NULL, 1, 1, 10, 2, '2023-09-14', NULL, '2023-09-18'),
(9, 1, NULL, NULL, 1, 1, 20, 2, '2023-09-14', NULL, '2023-09-18'),
(10, 1, NULL, NULL, 1, 1, 11, 2, '2023-09-14', NULL, '2023-09-18'),
(11, 1, NULL, NULL, 2, 1, 12, 2, '2023-09-14', NULL, '2023-09-18'),
(11, 3, NULL, NULL, 1, 1, 12, NULL, NULL, NULL, NULL),
(12, 1, NULL, NULL, 1, 1, 12, 2, '2023-09-14', NULL, '2023-09-18'),
(13, 1, NULL, NULL, 2, 1, 13, 2, '2023-09-14', NULL, '2023-09-18'),
(14, 1, NULL, NULL, 1, 1, 14, 2, '2023-09-14', NULL, '2023-09-18'),
(15, 1, NULL, NULL, 1, 1, 15, 2, '2023-09-14', NULL, '2023-09-18'),
(16, 1, NULL, NULL, 1, 1, 16, 2, '2023-09-14', NULL, '2023-09-18'),
(17, 1, NULL, NULL, 1, 1, 17, 2, '2023-09-14', NULL, '2023-09-18'),
(18, 1, NULL, NULL, 1, 1, 18, 2, '2023-09-14', NULL, '2023-09-18'),
(19, 1, NULL, NULL, 1, 1, 19, 2, '2023-09-14', NULL, '2023-09-18'),
(20, 2, NULL, NULL, 1, 1, 9, 2, '2023-09-14', NULL, '2023-09-18'),
(21, 3, NULL, NULL, 1, 1, 9, 2, '2023-09-26', NULL, '2023-09-26'),
(22, 2, NULL, NULL, 1, 1, 12, NULL, NULL, NULL, NULL),
(23, 2, NULL, NULL, 2, 1, 12, NULL, NULL, NULL, NULL),
(24, 2, NULL, NULL, 1, 1, 2, NULL, NULL, NULL, NULL),
(25, 2, NULL, NULL, 1, 1, 9, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `project_teach`
--

CREATE TABLE `project_teach` (
  `teacher_id` int(11) NOT NULL,
  `project_class_course_id` int(11) NOT NULL,
  `project_class_session` int(11) NOT NULL,
  `section` varchar(3) NOT NULL DEFAULT 'A',
  `main` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `project_teach`
--

INSERT INTO `project_teach` (`teacher_id`, `project_class_course_id`, `project_class_session`, `section`, `main`) VALUES
(2, 1, 1, 'A', 1),
(2, 2, 1, 'A', 1),
(4, 3, 1, 'A', 1),
(6, 4, 1, 'A', 1),
(7, 5, 1, 'A', 1),
(7, 6, 1, 'A', 1),
(9, 7, 1, 'A', 1),
(9, 20, 2, 'A', 1),
(9, 21, 3, 'A', 1),
(10, 8, 1, 'A', 1),
(11, 10, 1, 'A', 1),
(12, 11, 1, 'A', 1),
(12, 12, 1, 'A', 1),
(13, 13, 1, 'A', 1),
(14, 14, 1, 'A', 1),
(15, 15, 1, 'A', 1),
(16, 16, 1, 'A', 1),
(17, 17, 1, 'A', 1),
(18, 18, 1, 'A', 1),
(19, 19, 1, 'A', 1),
(20, 9, 1, 'A', 1),
(12, 22, 2, 'A', 0),
(12, 23, 2, 'A', 0),
(2, 24, 2, 'A', 0),
(11, 25, 2, 'A', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `cf` varbinary(64),
  `username` varchar(50) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varbinary(64) NOT NULL,
  `name` varchar(75) NOT NULL,
  `surname` varchar(75) NOT NULL,
  `gender` varbinary(44),
  `birth_date` varbinary(44),
  `address` varbinary(384),
  `google` tinyint(1) NOT NULL,
  `first_access` tinyint(1) NOT NULL DEFAULT 1,
  `assets` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `student`
--

INSERT INTO `student` (`id`, `cf`, `username`, `email`, `password`, `name`, `surname`, `gender`, `birth_date`, `address`, `google`, `first_access`, `assets`) VALUES
(1, NULL, 'aurora.avi', 'aurora.avi@istitutodecarneri.it', '06a097a66551d16eaae96fcbfc529e23e65fb53ec83f48b1c23b5cdbe6195e8d', 'Aurora', 'Avi', NULL, NULL, NULL, 0, 0, '/assets/users/students/avi'),
(2, NULL, 'giulia.battistel', 'giulia.battistel@istitutodecarneri.it', '648849c64d11d86ce9d787d3f95efb8760721f793b07d67fc4e77d6b9835a749', 'Giulia', 'Battistel', NULL, NULL, NULL, 0, 0, '/assets/users/students/battistel'),
(3, NULL, 'luca.bonvecchio', 'luca.bonvecchio@istitutodecarneri.it', 'b4b7ac146381299a500f7b283520272c243534b65bd920a6ad4288edcb8bbc41', 'Luca', 'Bonvecchio', NULL, NULL, NULL, 0, 0, '/assets/users/students/bonvecchio'),
(4, NULL, 'francesco.bortolotti', 'francesco.bortolotti@istitutodecarneri.it', '562fb5c06172005e51c87acde4787adeb5ecc9989065e2dfe7f5101ad959df84', 'Francesco', 'Bortolotti', NULL, NULL, NULL, 0, 0, '/assets/users/students/bortolotti'),
(5, NULL, 'giuseppe.caliari', 'giuseppe.caliari@istitutodecarneri.it', 'd804d9145ca0449757d48c70edf2094b7202ab44500940ed8089c6796b207423', 'Giuseppe', 'Caliari', NULL, NULL, NULL, 0, 0, '/assets/users/students/caliari'),
(6, NULL, 'mattia.campestrin', 'mattia.campestrin@istitutodecarneri.it', 'e9480fd2f784e5346df76e914bffa8b42ed6cf0e31dce90e41d11a8fa6d852c0', 'Mattia', 'Campestrin', NULL, NULL, NULL, 0, 0, '/assets/users/students/campestrin'),
(7, NULL, 'sebastiano.casagranda', 's.casagranda@istitutodecarneri.it', '034c71a085e2cd779233fe252a5f87b43617d8b705a05bee840b147d081c9b9a', 'Sebastiano', 'Casagranda', NULL, NULL, NULL, 0, 0, '/assets/users/students/casagranda'),
(8, NULL, 'caterina.eccher', 'caterina.eccher@istitutodecarneri.it', '5527d6d69bb0c9ae42c3fa7e1de5dde83e0fcf99aaa90f818d4a5d4cfc539005', 'Caterina', 'Eccher', NULL, NULL, NULL, 0, 0, '/assets/users/students/eccher'),
(9, NULL, 'sebastiano.faoro', 'sebastiano.faoro@istitutodecarneri.it', '5055eccb35d5fe43ca9bba542f06c47913277ab452905fc1f9882b8fe6ccee27', 'Sebastiano', 'Faoro', NULL, NULL, NULL, 0, 0, '/assets/users/students/faoro'),
(10, NULL, 'marco.giuliano', 'marco.giuliano@istitutodecarneri.it', 'e7de526338dba8acd370b40a1772681d1c326708c8de382b77d24038d00b89d7', 'Marco Cesare', 'Giuliano', NULL, NULL, NULL, 0, 0, '/assets/users/students/giuliano'),
(11, NULL, 'adriano.gjoni', 'adriano.gjoni@istitutodecarneri.it', '37936693a468c34d55184a8938298fb1d4d61d4a129db43eaada6149aef29f9c', 'Adriano', 'Gjoni', NULL, NULL, NULL, 0, 0, '/assets/users/students/gjoni'),
(12, NULL, 'nicolas.lavecchia', 'nicolas.lavecchia@istitutodecarneri.it', '715b02da694f7c274c9e399f718d83cab73d4d7b803dbae0fbd3173ae849d74c', 'Nicolas', 'La Vecchia', NULL, NULL, NULL, 0, 0, '/assets/users/students/lavecchia'),
(13, NULL, 'elisa.libardi', 'elisa.libardi@istitutodecarneri.it', 'b4cc01ba285ad84c6755b2a3b3109804c9b0a6178db7831a59b1f19e1e3379b3', 'Elisa', 'Libardi', NULL, NULL, NULL, 0, 0, '/assets/users/students/libardi'),
(14, NULL, 'anna.maffei', 'anna.maffei@istitutodecarneri.it', 'b979ff17953588548725eef759bffbcd7c123e6d0c778f59df2a672aa65be7b1', 'Anna', 'Maffei', NULL, NULL, NULL, 0, 0, '/assets/users/students/maffei'),
(15, NULL, 'jenny.merlonghi', 'jenny.merlonghi@istitutodecarneri.it', '5909fd84063f196d1a7518018d5d941033cae791f7446116e82db33fd1a87934', 'Jenny', 'Merlonghi', NULL, NULL, NULL, 0, 0, '/assets/users/students/merlonghi'),
(16, NULL, 'alice.poffoschmid', 'alice.poffoschmid@istitutodecarneri.it', '7ca0408bdc7a35e1716aeee3d6317c04ab276810c2ea57592c4b3e2a35ee0db5', 'Alice', 'Poffo Schmid', NULL, NULL, NULL, 0, 0, '/assets/users/students/poffoschmid'),
(17, NULL, 'isabel.poffoschmid', 'isabel.poffoschmid@istitutodecarneri.it', 'd5a40925fe1df141a368a0ff5ea2f741d9949dc9abacf479c4e914b887902337', 'Isabel', 'Poffo Schmid', NULL, NULL, NULL, 0, 0, '/assets/users/students/poffoschmid'),
(18, NULL, 'giada.rattin', 'giada.rattin@istitutodecarneri.it', '18312ab3afd02d9273372abde816695de6ee404999c9f6f25d50bccf8c374a78', 'Giada', 'Rattin', NULL, NULL, NULL, 0, 0, '/assets/users/students/rattin'),
(19, NULL, 'anida.romeghea', 'anida.romeghea@istitutodecarneri.it', '009461313dcda9e1c6155627742769db732bf402276b327a3fa2092021a5fa80', 'Anida Selena', 'Romeghea', NULL, NULL, NULL, 0, 0, '/assets/users/students/romeghea'),
(20, NULL, 'giuseppe.savoca', 'giuseppe.savoca@istitutodecarneri.it', '61c28f9c142f2734ed834fad5fc2f091dc052d409634cadd1549d21d3692280b', 'Giuseppe', 'Savoca', NULL, NULL, NULL, 0, 0, '/assets/users/students/savoca'),
(21, NULL, 'vanessa.tonidandel', 'vanessa.tonidandel@istitutodecarneri.it', '70438e84640b7bb42d612881c8960352a6016ab670b8b1bb58f1d57db1cac149', 'Vanessa', 'Tonidandel', NULL, NULL, NULL, 0, 0, '/assets/users/students/tonidandel'),
(22, NULL, 'nicole.valcanover', 'nicole.valcanover@istitutodecarneri.it', '049c15e14666dc1e9a118131dd9e1e88e6899ff878d61e0a318da2ef1bb4dc06', 'Nicole', 'Valcanover', NULL, NULL, NULL, 0, 0, '/assets/users/students/valcanover'),
(23, NULL, 'leonardo.angeli', 'leonardo.angeli@istitutodecarneri.it', '2f886e6b3ffbcb35c8f7c08181f1fccad0192d86dbe47595b86c5beb29eb99e8', 'Leonardo', 'Angeli', NULL, NULL, NULL, 0, 0, '/assets/users/students/angeli'),
(24, NULL, 'enika.babi', 'enika.babi@istitutodecarneri.it', '8021d937d0515a6a884d1749fac92362ad254f84e6ba0b9f6f5519b7e4026dc7', 'Enika', 'Babi', NULL, NULL, NULL, 0, 0, '/assets/users/students/babi'),
(25, NULL, 'marco.belloli', 'marco.belloli@istitutodecarneri.it', 'a293a342328e62f3bde74758f3339421b5152ebee077b9ca4f1b958003916ab9', 'Marco', 'Belloli', NULL, NULL, NULL, 0, 0, '/assets/users/students/belloli'),
(26, NULL, 'mattia.brigadue', 'mattia.brigadue@istitutodecarneri.it', 'dab58241677e138873767af3e3b11ef3b0418b74326abb77e12f9d487912e6b9', 'Mattia', 'Brigadue', NULL, NULL, NULL, 0, 0, '/assets/users/students/brigadue'),
(27, NULL, 'klea.cerriku', 'klea.cerriku@istitutodecarneri.it', 'f84d061da8110ea6860feb8f6a58558c169161ae95bf08c2e38465795f57d352', 'Klea', 'Cerriku', NULL, NULL, NULL, 0, 0, '/assets/users/students/cerriku'),
(28, NULL, 'yosra.chourabi', 'yosra.chourabi@istitutodecarneri.it', '4a3718df834e131d09640d237e7f2894dafbf17c8b0f6778e5f02322fc51fb2a', 'Yosra', 'Chourabi', NULL, NULL, NULL, 0, 0, '/assets/users/students/chourabi'),
(29, NULL, 'asia.desiderato', 'asia.desiderato@istitutodecarneri.it', 'e004d387b3a508b739d608b461f5b4709d292c8dbe3b1a2394fc71f0fd620180', 'Asia', 'Desiderato', NULL, NULL, NULL, 0, 0, '/assets/users/students/desiderato'),
(30, NULL, 'aulona.djaferi', 'aulona.djaferi@istitutodecarneri.it', '8f53009e69b3c8d7d686213b156b83129adb98cd9f7eff7250f012a816ace902', 'Aulona', 'Djaferi', NULL, NULL, NULL, 0, 0, '/assets/users/students/djaferi'),
(31, NULL, 'rizvan.ferati', 'rizvan.ferati@istitutodecarneri.it', 'd15dff4143cfdd87843127579bbaef4874b3fe54252a54cf66e97adc0e4fb9f5', 'Rizvan', 'Ferati', NULL, NULL, NULL, 0, 0, '/assets/users/students/ferati'),
(32, NULL, 'eduardo.ferreiradoamaral', 'e.ferreiradoamaral@istitutodecarneri.it', 'f6f532250aa3b426ff7b4b57786bfa894680f0644119a8c73ece2d4993589e78', 'Eduardo', 'Ferreira Do Amaral', NULL, NULL, NULL, 0, 0, '/assets/users/students/ferreiradoamaral'),
(33, NULL, 'daniel.garbini', 'daniel.garbini@istitutodecarneri.it', '11211a76bb862a8d65a46ba977c0620861cb3613e81f7e723278887b611ddb10', 'Daniel', 'Garbini', NULL, NULL, NULL, 0, 0, '/assets/users/students/garbini'),
(34, NULL, 'eliza.gega', 'eliza.gega@istitutodecarneri.it', 'c1b610ed9532ee00611c749c5561c7dccd35e760b7c06df81c1efcd72a149fa4', 'Eliza', 'Gega', NULL, NULL, NULL, 0, 0, '/assets/users/students/gega'),
(35, NULL, 'luca.genoesi', 'luca.genoesi@istitutodecarneri.it', 'e693bcf05f9506321a4d18da0f1540d3bf4bbc2e5a31927a4fd3322fbe8a346f', 'Luca', 'Genoesi', NULL, NULL, NULL, 0, 0, '/assets/users/students/genoesi'),
(36, NULL, 'justin.giovannini', 'justin.giovannini@istitutodecarneri.it', '73bf340bce439214e8ae09de9e70caed8c6986eafa734dfda5a370bb98aaee4d', 'Justin', 'Giovannini', NULL, NULL, NULL, 0, 0, '/assets/users/students/giovannini'),
(37, NULL, 'francesco.gjermeni', 'francesco.gjermeni@istitutodecarneri.it', 'fca30adb605125682b6bce9451b211c7b2c77225f5d2b73311b3a320de24e902', 'Francesco', 'Gjermeni', NULL, NULL, NULL, 0, 0, '/assets/users/students/gjermeni'),
(38, NULL, 'pietro.iobstraibizer', 'pietro.iobstraibizer@istitutodecarneri.it', '6135978310a7f3607b3657bda4ae2034b24565fe0b893cc0710f77d8d0227070', 'Pietro', 'Iobstraibizer', NULL, NULL, NULL, 0, 0, '/assets/users/students/iobstraibizer'),
(39, NULL, 'alejna.musliovska', 'alejna.musliovska@istitutodecarneri.it', '1e3a40d5c673c3568536b07d246a78458001aa7a32a51bc07a71ab0475baa736', 'Alejna', 'Musliovska', NULL, NULL, NULL, 0, 0, '/assets/users/students/musliovska'),
(40, NULL, 'siria.pedenzini', 'siria.pedenzini@istitutodecarneri.it', '1c003cae7346d7a66a1f56ed0f1ea1e10bcb8852a0d27355b27252eb58a574a2', 'Siria', 'Pedenzini', NULL, NULL, NULL, 0, 0, '/assets/users/students/pedenzini'),
(41, NULL, 'raffaele.scalvini', 'raffaele.scalvini@istitutodecarneri.it', 'e8b930b9daed32fa39bb4d12b75180352f250192bce455ba4017da0585babad3', 'Raffaele', 'Scalvini', NULL, NULL, NULL, 0, 0, '/assets/users/students/scalvini'),
(42, NULL, 'mattia.segesti', 'mattia.segesti@istitutodecarneri.it', 'd53372d3addd9b2580dcdfcf67f4c990a734b55daa5b573eecb404266060e1a1', 'Mattia', 'Segesti', NULL, NULL, NULL, 0, 0, '/assets/users/students/segesti'),
(43, NULL, 'gabriele.tison', 'gabriele.tison@istitutodecarneri.it', 'ca6d536e971a1a677f6bcbcbfa43bef8c36a9a2bc0637b47c1defa01001fc5c3', 'Gabriele', 'Tison', NULL, NULL, NULL, 0, 0, '/assets/users/students/tison'),
(44, NULL, 'ivan.bongiovanni', 'ivan.bongiovanni@istitutodecarneri.it', '01c72a0739b8131dae657f2e34821b5e56273e139f48d0f1d0a2161783f04708', 'Ivan', 'Bongiovanni', NULL, NULL, NULL, 0, 0, '/assets/users/students/bongiovanni'),
(45, NULL, 'maddalena.bozzola', 'maddalena.bozzola@istitutodecarneri.it', '32b7861813b1b1ced1cfa5bce61795930b7a011c1c9a156247bedc18333cf29d', 'Maddalena', 'Bozzola', NULL, NULL, NULL, 0, 0, '/assets/users/students/bozzola'),
(46, NULL, 'flavio.brancaccio', 'flavio.brancaccio@istitutodecarneri.it', 'e7971a0f7a4b43acc5803cba35f5d890941befd638c1b2eb8368bf3228d4fd56', 'Flavio', 'Brancaccio', NULL, NULL, NULL, 0, 0, '/assets/users/students/brancaccio'),
(47, NULL, 'kevin.celia', 'kevin.celia@istitutodecarneri.it', 'b79b0cbc5e38a5cfb911d9100a380d2e8ba261b0601eb85590a501d36d4f3e23', 'Kevin', 'Celia', NULL, NULL, NULL, 0, 0, '/assets/users/students/celia'),
(48, NULL, 'marta.chiettini', 'marta.chiettini@istitutodecarneri.it', 'aaafa8b123ba3c62951b77098a5f1dc5aa029efe188ec5ad981b2c59206245eb', 'Marta', 'Chiettini', NULL, NULL, NULL, 0, 0, '/assets/users/students/chiettini'),
(49, NULL, 'daniele.dallona', 'daniele.dallona@istitutodecarneri.it', '5010dca45e781727999986ce7ebb0e741cfb2255b9becb2b0283ab51c571e7d7', 'Daniele', 'Dallona', NULL, NULL, NULL, 0, 0, '/assets/users/students/dallona'),
(50, NULL, 'giada.decarli', 'giada.decarli@istitutodecarneri.it', 'f90c85cad592528e4efab51f6f1d466e6baf518754bc9a53d4db9a04563cc509', 'Giada', 'Decarli', NULL, NULL, NULL, 0, 0, '/assets/users/students/decarli'),
(51, NULL, 'sara.eccel', 'sara.eccel@istitutodecarneri.it', '4835a8750d3fcccef68b9c3a0aa2b3eb7a28b30e1364a853272ec3f9b3c946ea', 'Sara', 'Eccel', NULL, NULL, NULL, 0, 0, '/assets/users/students/eccel'),
(52, NULL, 'giada.folgheraiter', 'giada.folgheraiter@istitutodecarneri.it', '02bcde01b9763bed187fdd13d63491041ef1319b38e7e1b1ebc6b6b177be2ba5', 'Giada', 'Folgheraiter', NULL, NULL, NULL, 0, 0, '/assets/users/students/folgheraiter'),
(53, NULL, 'ziah.francis', 'ziah.francis@istitutodecarneri.it', '590a427bee6a666bca7d480279a0a5419ddf52fd215a36cf26921bf8188cb047', 'Ziah Mekhi Tyler', 'Francis', NULL, NULL, NULL, 0, 0, '/assets/users/students/francis'),
(54, NULL, 'zaira.gardumi', 'zaira.gardumi@istitutodecarneri.it', '54b4e1b034ae04e2f3215abba3851e55de0c9186cfcedb6e6fb28a5b11acb9f7', 'Zaira', 'Gardumi', NULL, NULL, NULL, 0, 0, '/assets/users/students/gardumi'),
(55, NULL, 'eleonora.giovannini', 'eleonora.giovannini@istitutodecarneri.it', 'cdef264b0b45a140fffeb2650c23289d6f37af9d292079e7b0e413a555efdf81', 'Eleonora', 'Giovannini', NULL, NULL, NULL, 0, 0, '/assets/users/students/giovannini'),
(56, NULL, 'cristofer.laner', 'cristofer.laner@istitutodecarneri.it', '7f5bf2abc5c320d0d5ef3c818bf5273290e2dd0383816ededfdfef52bed5b382', 'Cristofer', 'Laner', NULL, NULL, NULL, 0, 0, '/assets/users/students/laner'),
(57, NULL, 'maddalena.lazzaretti', 'maddalena.lazzaretti@istitutodecarneri.it', 'd7fe9a42232fbb163089b48c1bb62d10cafcdbb4d41b740989658767d70b286c', 'Maddalena', 'Lazzaretti', NULL, NULL, NULL, 0, 0, '/assets/users/students/lazzaretti'),
(58, NULL, 'sara.libardi', 'sara.libardi@istitutodecarneri.it', 'fa60a51a1d99ee7f830cf4d8a4dea6071de024be691cc8094f8047ec57837511', 'Sara', 'Libardi', NULL, NULL, NULL, 0, 0, '/assets/users/students/libardi'),
(59, NULL, 'serena.negriolli', 'serena.negriolli@istitutodecarneri.it', '636540f317a8924a44971a07ec36115401bbd65a1aa2a1c493bd55f801cf6aa5', 'Serena', 'Negriolli', NULL, NULL, NULL, 0, 0, '/assets/users/students/negriolli'),
(60, NULL, 'francesca.prandel', 'francesca.prandel@istitutodecarneri.it', '23bcd9b52c45bb04017a29502ad673fc4f17ac77398cef1cc191292f927af5d9', 'Francesca', 'Prandel', NULL, NULL, NULL, 0, 0, '/assets/users/students/prandel'),
(61, NULL, 'federico.ruffinengo', 'federico.ruffinengo@istitutodecarneri.it', '85c9888f92516871ecbf70c6eb8697326e4c3a2645db4382cc779dc686671d24', 'Federico', 'Ruffinengo', NULL, NULL, NULL, 0, 0, '/assets/users/students/ruffinengo'),
(62, NULL, 'amar.selmani', 'amar.selmani@istitutodecarneri.it', '853eff5ca5060e8131be2ad536a5d3208b1feba577acfa194a66649ade7a0583', 'Amar', 'Selmani', NULL, NULL, NULL, 0, 0, '/assets/users/students/selmani'),
(63, NULL, 'giulia.serafini', 'giulia.serafini@istitutodecarneri.it', 'd6d4cd6b1d878e6f9747f8870704fe3071f42ac7601264442cbea7c80d53d2e3', 'Giulia', 'Serafini', NULL, NULL, NULL, 0, 0, '/assets/users/students/serafini'),
(64, NULL, 'virginia.tonelli', 'virginia.tonelli@istitutodecarneri.it', 'b83b054d697fb19a43a98284757f5fac8bbe6919227bccec755180028dcb4dbf', 'Virginia', 'Tonelli', NULL, NULL, NULL, 0, 0, '/assets/users/students/tonelli'),
(65, NULL, 'giada.turatto', 'giada.turatto@istitutodecarneri.it', 'e1acd2d0073f603c1210cbcfdf0d1b0d3244e0063bc0b9c96f6db48f2a881268', 'Giada', 'Turatto', NULL, NULL, NULL, 0, 0, '/assets/users/students/turatto');
-- --------------------------------------------------------

--
-- Struttura della tabella `study_address`
--

CREATE TABLE `study_address` (
  `id` varchar(5) NOT NULL,
  `italian_title` varchar(250) NOT NULL,
  `english_title` varchar(250) NOT NULL,
  `italian_description` varchar(1000) DEFAULT NULL,
  `english_description` varchar(1000) DEFAULT NULL,
  `max_classes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `study_address`
--

INSERT INTO `study_address` (`id`, `italian_title`, `english_title`, `italian_description`, `english_description`, `max_classes`) VALUES
('ATS', 'Animazione Turistico-Sportiva', 'Tourist-Sports Animation', NULL, NULL, 5),
('BIO', 'Biotecnologie sanitarie', 'Health biotechnology', '<h2>Istituto tecnologico per le biotecnologie sanitarie</h2>\r\n<p>Se per anni hai chiesto in regalo un microscopio e vorresti poter analizzare sempre tutto, allora l’Istituto Tecnologico per le Biotecnologie Sanitarie è la scuola giusta per te!\r\n\r\nÈ la scelta ideale per chi è interessato alla tutela della salute dell\'uomo e all\'equilibrio degli ambienti naturali, a chi vuole conoscere le principali tecnologie sanitarie nel campo biomedicale, farmaceutico e alimentare e incrementare lo sviluppo sostenibile.</p>', '<h2>Technological Institute for Health Biotechnology</h2>\r\n<p>If you have been asking for a microscope for years and would like to be able to analyse everything all the time, then the Technological Institute for Health Biotechnology is the right school for you!\r\n\r\nIt is the ideal choice for anyone interested in the protection of human health and the balance of natural environments, for those who want to learn about key health technologies in the biomedical, pharmaceutical and food fields and to increase sustainable development.</p>',5),
('ODO', 'Odontotecnico', 'Dental technician', '<h2>Istituto professionale per odontotecnici</h2>\r\n<p>L’Istituto professionale per odontotecnici è un percorso scolastico professionalizzante, che ti permette di sviluppare abilità manuali nella modellazione e disegno. È un indirizzo dove teoria e pratica sono bilanciate: imparerai a gestire tutto il processo di realizzazione degli apparecchi ortodontici, dalla progettazione alla creazione delle protesi fisse e mobili.</p>', '<h2>Professional Institute for Dental Technicians</h2>\r\n<p>The Professional Institute for Dental Technicians is a vocational school course, which allows you to develop manual skills in modelling and design. It is a course where theory and practice are balanced: you will learn to manage the entire process of making orthodontic appliances, from design to the creation of fixed and removable prostheses.</p>',5),
('TUR4', 'Turismo', 'Tourism', '<h2>Istituto tecnico turistico quadriennale</h2>\r\n<p>Se il turismo ti affascina e senti che la promozione del territorio potrebbe essere la tua strada, l’Istituto Tecnico Turistico Quadriennale è la scuola che fa per te! Sviluppa le competenze per lavorare nelle imprese del settore turistico, per tutelare e valorizzarere il territorio, e per prepararti all’università.</p>', '<h2>Four-year technical tourism institute</h2>\r\n<p>If tourism fascinates you and you feel that promoting the territory could be your path, the four-year Technical Tourism Institute is the school for you! Develop the skills to work in businesses in the tourism sector, to protect and enhance the local area, and to prepare you for university.</p>', 4);

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
  `cf` varbinary(64),
  `username` varchar(50) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varbinary(64) NOT NULL,
  `name` varchar(75) NOT NULL,
  `surname` varchar(75) NOT NULL,
  `gender` varbinary(44),
  `birth_date` varbinary(44),
  `address` varbinary(384),
  `google` tinyint(1) NOT NULL,
  `first_access` tinyint(1) NOT NULL DEFAULT 1,
  `assets` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `teacher`
--

INSERT INTO `teacher` (`id`, `cf`, `username`, `email`, `password`, `name`, `surname`, `gender`, `birth_date`, `address`, `google`, `first_access`, `assets`) VALUES
(1, NULL, 'alessandro.anderle', 'anderle@istitutodecarneri.it', 'd9729843149ed25df1d16950c70dd121b4aac9c99abd171ed3e333cff7e63bee', 'Alessandro', 'Anderle', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/anderle'),
(2, NULL, 'italo.arcidiacono', 'arcidiacono@istitutodecarneri.it', 'a53af8e7b72fca712423a50b3f0eb6c4244130d3b919714fab877d23b160ff28', 'Italo Lucio', 'Arcidiacono', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/arcidiacono'),
(3, NULL, 'guillermo.austin', 'austin@istitutodecarneri.it', 'd7c873288a9d072b7e659c41e8c619177666c8987a231ad971e3c3f67470f7b8', 'Guillermo Jorge', 'Austin', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/austin'),
(4, NULL, 'erika.bella', 'bella@istitutodecarneri.it', '6cd948b15ae5240af13870603d953ee4d2a06290f0b32f9dbdc8e0f814e30b13', 'Erika', 'Bella', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/bella'),
(5, NULL, 'stefania.bozzolan', 'bozzolan@istitutodecarneri.it', '1f504e813617081aedb62a0117b15c797334bcd2a1702d84a921fb6e4c003065', 'Stefania', 'Bozzolan', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/bozzolan'),
(6, NULL, 'lino.capozza', 'capozza@istitutodecarneri.it', '0d489a16f4852e1f5d45e9cc1cb6415b91bb78ed446c4e397d15a19566ee41e0', 'Lino', 'Capozza', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/capozza'),
(7, NULL, 'dennis.dapra', 'dapra@istitutodecarneri.it', 'cd5805673b9edf30c3c2d54a357c055f58ff9e56cb004aa56908f21426fe89d7', 'Dennis', 'Daprà', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/dapra'),
(8, NULL, 'edo.grassi', 'grassi@istitutodecarneri.it', '95db841edcc9d8ad3ba9e865695153b287941095192c1466c449701a55c5ab12', 'Edo', 'Grassi', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/grassi'),
(9, NULL, 'mario.grasso', 'grasso@istitutodecarneri.it', '1789b6ddca2c1d5edaba5ab593f0fb445071790be991ffa53fd2d339757adb55', 'Mario', 'Grasso', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/grasso'),
(10, NULL, 'manuela.grott', 'grott@istitutodecarneri.it', 'fed97176033b07dd32d61f15d21c3eb5ff397f41e16c6617065dced3be590e14', 'Manuela', 'Grott', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/grott'),
(11, NULL, 'giuseppe.lucarelli', 'lucarelli@istitutodecarneri.it', 'ce632247abe24977fafcfb0846d6dbb5439045efdb87fc07258531ac42614540', 'Giuseppe', 'Lucarelli', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/lucarelli'),
(12, NULL, 'mila.magnani', 'magnani@istitutodecarneri.it', 'bbb5748edf6918b84c66f735914653d002cc321cce6062446a65f2b7f54fde55', 'Mila', 'Magnani', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/magnani'),
(13, NULL, 'rita.nagy', 'nagy@istitutodecarneri.it', '6205389056890e8035c88328901721fb5a812eddd08f7bb0aedc5856d7beb7b7', 'Rita', 'Nagy', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/nagy'),
(14, NULL, 'michela.oss', 'oss@istitutodecarneri.it', '6d2bf5b6c2e3ad8dc712f0237e7c55d6785e8b5cd0ada8280798ba6778ff67b6', 'Michela', 'Oss', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/oss'),
(15, NULL, 'manuela.pruner', 'pruner@istitutodecarneri.it', 'd27e485a40664d963a4ba862aac45af8422a7f0cc8f1fe4993725c93659274ca', 'Manuela', 'Pruner', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/pruner'),
(16, NULL, 'roberta.ravelli', 'ravelli@istitutodecarneri.it', 'ac24a33cb6dc913733d0a55fe10b59061545f636c6fcb5bd060748e2b9427f2b', 'Roberta', 'Ravelli', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/revalli'),
(17, NULL, 'luca.riccadonna', 'riccadonna@istitutodecarneri.it', 'b262abc1bd9115c37ed9c7c4b7c893257fedcd5b314ab7d8567bd44cb012fa56', 'Luca', 'Riccadonna', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/riccadonna'),
(18, NULL, 'giorgia.salomon', 'salomon@istitutodecarneri.it', 'cfd2a2f51c2ce9820c41955a7cb0f6c7bf3b7d044405a9c64820392d2648d6c9', 'Giorgia', 'Salomon', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/salomon'),
(19, NULL, 'giovanni.scalfi', 'scalfi@istitutodecarneri.it', 'c7f34fdb4f26f71402547e71d7042ada08588c8edd28fbe5de144124609128b9', 'Giovanni', 'Scalfi', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/scalfi'),
(20, NULL, 'dylan.kier', 'kier@istitutodecarneri.it', 'dd50643fa9452cf058d7eb7422a7ff4d5ca15e0d2a65591024a5a3b3b8063658', 'Dylan', 'Kier', NULL, NULL, NULL,0,0, '/assets/users/teachers/kier');

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
('REL', 'Religione cattolica', 'Religion', NULL, NULL),
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
  ADD PRIMARY KEY (`course_id`,`study_year_id`,`study_address_id`, `learning_context_id`),
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
  ADD KEY `project_class_course_id` (`project_class_course_id`,`project_class_session`);

--
-- Indici per le tabelle `associated`
--
ALTER TABLE `associated`
  ADD PRIMARY KEY (`course_id`, `teaching_id`),
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
-- Indici per le tabelle `characterize`
--
ALTER TABLE `characterize`
  ADD PRIMARY KEY (`course_id`, `growth_area_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `growth_area_id` (`growth_area_id`);

--
-- Indici per le tabelle `citizenship_report`
--
ALTER TABLE `citizenship_report`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `delivery` (`student_id`,`delivery`),
  ADD KEY `certifying_admin_id` (`certifying_admin_id`);

--
-- Indici per le tabelle `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `course` (`italian_title`,`english_title`,`creation_school_year`),
  ADD KEY `learning_area_id` (`learning_area_id`),
  ADD KEY `course_ibfk_3` (`proposer_teacher_id`),
  ADD KEY `course_ibfk_4` (`certifying_admin_id`);

--
-- Indici per le tabelle `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `publication` (`student_id`,`teacher_id`,`project_class_course_id`,`project_class_session`,`publication`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `project_class_course_id` (`project_class_course_id`,`project_class_session`);

--
-- Indici per le tabelle `subscribed`
--
ALTER TABLE `subscribed`
  ADD PRIMARY KEY (`student_id`,`project_class_course_id`,`project_class_session`,`section`),
  ADD KEY `project_class_course_id` (`project_class_course_id`,`project_class_session`);

--
-- Indici per le tabelle `learning_area`
--
ALTER TABLE `learning_area`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `italian_title` (`italian_title`),
  ADD UNIQUE KEY `english_title` (`english_title`);

--
-- Indici per le tabelle `learning_session`
--
ALTER TABLE `learning_session`
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
  ADD PRIMARY KEY (`id`),
  ADD KEY `ordinary_class_study_year` (`ordinary_class_study_year`,`ordinary_class_address`,`ordinary_class_school_year`),
  ADD KEY `learning_area_id` (`learning_area_id`),
  ADD KEY `learning_context_id` (`learning_context_id`);

--
-- Indici per le tabelle `ordinary_class`
--
ALTER TABLE `ordinary_class`
  ADD PRIMARY KEY (`study_year_id`,`study_address_id`,`school_year`),
  ADD KEY `study_address_id` (`study_address_id`);

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
  ADD PRIMARY KEY (`course_id`,`learning_session_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `learning_session_id` (`learning_session_id`),
  ADD KEY `project_class_ibfk_3` (`proposer_teacher_id`),
  ADD KEY `project_class_ibfk_4` (`certifying_admin_id`);

--
-- Indici per le tabelle `project_teach`
--
ALTER TABLE `project_teach`
  ADD PRIMARY KEY (`teacher_id`,`project_class_course_id`,`project_class_session`,`section`),
  ADD KEY `project_class_course_id` (`project_class_course_id`,`project_class_session`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT per la tabella `citizenship_report`
--
ALTER TABLE `citizenship_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT per la tabella `grade`
--
ALTER TABLE `grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT per la tabella `learning_session`
--
ALTER TABLE `learning_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `limited`
--
ALTER TABLE `limited`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT per la tabella `personal_growth_area`
--
ALTER TABLE `personal_growth_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT per la tabella `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `accessible`
--
ALTER TABLE `accessible`
  ADD CONSTRAINT `accessible_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `accessible_ibfk_2` FOREIGN KEY (`study_year_id`) REFERENCES `study_year` (`id`),
  ADD CONSTRAINT `accessible_ibfk_3` FOREIGN KEY (`study_address_id`) REFERENCES `study_address` (`id`),
  ADD CONSTRAINT `accessible_ibfk_4` FOREIGN KEY (`learning_context_id`) REFERENCES `learning_context` (`id`);

--
-- Limiti per la tabella `announcement`
--
ALTER TABLE `announcement`
  ADD CONSTRAINT `announcement_ibfk_2` FOREIGN KEY (`project_class_course_id`,`project_class_session`) REFERENCES `project_class` (`course_id`, `learning_session_id`);

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
-- Limiti per la tabella `characterize`
--
ALTER TABLE `characterize`
  ADD CONSTRAINT `characterize_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `characterize_ibfk_2` FOREIGN KEY (`growth_area_id`) REFERENCES `personal_growth_area` (`id`);

--
-- Limiti per la tabella `citizenship_report`
--
ALTER TABLE `citizenship_report`
  ADD CONSTRAINT `citizenship_report_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `citizenship_report_ibfk_2` FOREIGN KEY (`certifying_admin_id`) REFERENCES `admin` (`id`);

--
-- Limiti per la tabella `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`learning_area_id`) REFERENCES `learning_area` (`id`),
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`proposer_teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `course_ibfk_3` FOREIGN KEY (`certifying_admin_id`) REFERENCES `admin` (`id`);

--
-- Limiti per la tabella `grade`
--
ALTER TABLE `grade`
  ADD CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `grade_ibfk_3` FOREIGN KEY (`project_class_course_id`,`project_class_session`) REFERENCES `project_class` (`course_id`, `learning_session_id`);

--
-- Limiti per la tabella `subscribed`
--
ALTER TABLE `subscribed`
  ADD CONSTRAINT `subscribed_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `subscribed_ibfk_2` FOREIGN KEY (`project_class_course_id`,`project_class_session`) REFERENCES `project_class` (`course_id`, `learning_session_id`),
  ADD CONSTRAINT `subscribed_ibfk_3` FOREIGN KEY (`learning_context_id`) REFERENCES `learning_context` (`id`);

--
-- Limiti per la tabella `limited`
--
ALTER TABLE `limited`
  ADD CONSTRAINT `limited_ibfk_1` FOREIGN KEY (`learning_session_id`) REFERENCES `learning_session` (`id`),
  ADD CONSTRAINT `limited_ibfk_2` FOREIGN KEY (`ordinary_class_study_year`,`ordinary_class_address`,`ordinary_class_school_year`) REFERENCES `ordinary_class` (`study_year_id`, `study_address_id`, `school_year`),
  ADD CONSTRAINT `limited_ibfk_3` FOREIGN KEY (`learning_area_id`) REFERENCES `learning_area` (`id`),
  ADD CONSTRAINT `limited_ibfk_4` FOREIGN KEY (`learning_context_id`) REFERENCES `learning_context` (`id`),
  ADD CONSTRAINT `limited_ibunique_1` UNIQUE (`learning_session_id`,`ordinary_class_study_year`,`ordinary_class_address`,`ordinary_class_school_year`,`learning_area_id`,`learning_context_id`);

--
-- Limiti per la tabella `ordinary_class`
--
ALTER TABLE `ordinary_class`
  ADD CONSTRAINT `ordinary_class_ibfk_1` FOREIGN KEY (`study_year_id`) REFERENCES `study_year` (`id`),
  ADD CONSTRAINT `ordinary_class_ibfk_2` FOREIGN KEY (`study_address_id`) REFERENCES `study_address` (`id`);

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
  ADD CONSTRAINT `project_class_ibfk_2` FOREIGN KEY (`learning_session_id`) REFERENCES `learning_session` (`id`),
  ADD CONSTRAINT `project_class_ibfk_3` FOREIGN KEY (`proposer_teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `project_class_ibfk_4` FOREIGN KEY (`certifying_admin_id`) REFERENCES `admin` (`id`);

--
-- Limiti per la tabella `project_teach`
--
ALTER TABLE `project_teach`
  ADD CONSTRAINT `project_teach_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `project_teach_ibfk_2` FOREIGN KEY (`project_class_course_id`,`project_class_session`) REFERENCES `project_class` (`course_id`, `learning_session_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;