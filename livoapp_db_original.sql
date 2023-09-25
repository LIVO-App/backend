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
(2, 1, 'BIO', 1, 0, 'SPE'),
(2, 1, 'TUR4', 0, 0, 'SPE'),
(3, 1, 'BIO', 1, 1, 'PER'),
(3, 1, 'TUR4', 0, 0, 'PER'),
(3, 1, 'ODO', 0, 0, 'PER'),
(4, 1, 'BIO', 1, 1, 'SPE'),
(4, 1, 'ODO', 0, 0, 'SPE'),
(4, 1, 'TUR4', 0, 0, 'SPE'),
(5, 1, 'BIO', 0, 1, 'PER'),
(5, 1, 'ODO', 1, 1, 'PER'),
(5, 1, 'TUR4', 0, 1, 'PER'),
(6, 1, 'BIO', 0, 1, 'SPE'),
(6, 1, 'ODO', 1, 1, 'SPE'),
(6, 1, 'TUR4', 0, 1, 'SPE');

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

INSERT INTO `announcement` (`id`, `publisher_id`, `is_admin`, `project_class_course_id`, `project_class_session`, `section`, `publishment`, `italian_title`, `english_title` , `italian_message`, `english_message`) VALUES
(1, 2, 0, 5, 1, 'A', '2023-03-25', 'Avviso di fine corso', 'End of the course announcement', 'Attenzione, il corso sta per finire', 'Attention, the course is about to end');

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
(1, 2),
(1, 3),
(2, 2),
(2, 5),
(3, 2),
(3, 5),
(4, 1),
(4, 4),
(5, 1),
(5, 5),
(6, 1),
(6, 4);

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
  `italian_expected_learning_results` varchar(1000) NOT NULL,
  `english_expected_learning_results` varchar(1000) NOT NULL,
  `italian_criterions` varchar(1000) NOT NULL,
  `english_criterions` varchar(1000) NOT NULL,
  `italian_activities` varchar(1000) NOT NULL,
  `english_activities` varchar(1000) NOT NULL,
  `learning_area_id` varchar(5) NOT NULL,
  `min_students` int(11) NOT NULL,
  `max_students` int(11) NOT NULL,
  `proposer_teacher_id` int(11) NOT NULL,
  `certifying_admin_id` int(11) DEFAULT NULL,
  `admin_confirmation` date DEFAULT NULL,
  `to_be_modified` tinyint(1) DEFAULT NULL,
  `assets` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `course`
--

INSERT INTO `course` (`id`, `italian_title`, `english_title`, `creation_school_year`, `italian_description`, `english_description`, `up_hours`, `credits`, `italian_expected_learning_results`, `english_expected_learning_results`, `italian_criterions`, `english_criterions`, `italian_activities`, `english_activities`, `learning_area_id`, `min_students`, `max_students`, `proposer_teacher_id`, `certifying_admin_id`, `admin_confirmation`, `assets`) VALUES
(1, 'Gestire il cambiamento', 'Managing change', '2022-08-25', '<p>\nL’unica costante nella nostra vita è il cambiamento. A volte siamo noi a decidere consapevolmente di dare una svolta alla nostra vita (ad es. quando cambiamo sport, scuola, amici); altre volte è il contesto che cambia attorno a noi e ci costringe ad adeguarci alle nuove condizioni. Quanti cambiamenti hai già affrontato nella tua vita? Li hai accolti come un’opportunità o ti sei sentito in difficoltà?\n</p>', '<p>\r\nThe one constant in our lives is change. Sometimes it is we who consciously decide to turn our lives around (e.g. when we change sport, school, friends); other times it is the context that changes around us and forces us to adapt to the new conditions. How many changes have you already faced in your life? Did you welcome them as an opportunity or did you feel challenged?\r\n</p>', 12, 4, '<ul>\r\n<li><b>Riconoscere</b> e <b>descrivere</b> le principali dinamiche legate ai singoli momenti di un cambiamento, sia personale che professionale;</li>\r\n<li><b>Affrontare</b> con maggiore consapevolezza e sicurezza interiore processi di cambiamento;</li>\r\n<li><b>Applicare</b> diverse strategie per lavorare in modo costruttivo in situazioni inaspettate e imprevedibili;</li>\r\n<li><b>Interagire</b> con gli altri in modo appropriato al contesto e alle aspettative sociali</li>\r\n</ul>', '<ul>\r\n<li><b>Recognize</b> and <b>describe</b> the main dynamics associated with individual moments of change, both personal and professional;</li>\r\n<li><b>Deal</b> with greater awareness and inner confidence in change processes;</li>\r\n<li><b>Apply</b> different strategies to work constructively in unexpected and unpredictable situations;</li>\r\n<li><b>Interact</b> with others in ways appropriate to the context and social expectations</li>\r\n</ul>', '<p>\r\nIl corso presenta diverse domande in itinere, alcune sotto forma di quiz, altre proposte unicamente per stimolare la tua riflessione personale. Queste domande non verranno valutate ai fini del superamento del corso. Verranno invece valutati i quiz che faremo al termine di ogni \"\"capitolo\"\".<br />\r\nInoltre <b>sarà valutata la partecipazione</b> alle attività di riflessione e di Role Play\r\n</p>', '<p>\r\nThe course has several on-going questions, some in the form of quizzes, others offered solely to stimulate your personal reflection. These questions will not be evaluated for the purpose of passing the course. Instead, the quizzes we will take at the end of each \"\"chapter\"\" will be evaluated.<br />\r\nIn addition, <b>participation</b> in the reflection and Role Play activities will be <b>evaluated</b>\r\n</p>', '<p>\r\nDurante il corso sono proposti strumenti e attività pratiche per avviare un processo di riflessione sul proprio modo di porsi nei confronti del cambiamento. Le attività affronteranno 5 temi:\r\n</p>\r\n<ul>\r\n<li>Riconoscere il cambiamento e trarne il meglio</li>\r\n<li>Il processo di cambiamento</li>\r\n<li>Gestione del cambiamento in classe</li>\r\n<li>Gestione del cambiamento in famiglia e nel mio ambiente sociale</li>\r\n<li>Competenze necessarie per il cambiamento</li>\r\n</ul>', '<p>\r\nDuring the course, practical tools and activities are offered to initiate a process of reflection on one\'s attitude toward change. Activities will address 5 themes:\r\n</p>\r\n<ul>\r\n<li>Recognizing change and making the best of it</li>\r\n<li>The process of change</li>\r\n<li>Change management in the classroom</li>\r\n<li>Managing change in the family and in my social environment</li>\r\n<li>Skills needed for change</li>\r\n</ul>', 'COM', 10, 15, 1, NULL, NULL, '/assets/courses/course_1'),
(2, 'Green Power🌳🌵🪷: come le piante dominano il mondo', 'Green Power🌳🌵🪷: how plants rule the world', '2021-08-25', '<p>\r\nSiamo sicuri di essere i padroni del mondo o esiste una \"nazione delle piante\"? Dov\'è il segreto del loro successo? Perchè da loro dipende la nostra vita e perchè potrebbero essere loro a salvarci?\r\n</p>', '<p>\r\nAre we sure we are the masters of the world or is there a \"plant nation\"? Where is the secret of their success? Why do our lives depend on them and why could they be the ones to save us?\r\n</p>', 0, 4, '<ul>\r\n<li><b>Comprendere</b> i molteplici ruoli svolti dalle piante e <b>metterli in relazione</b> con lo sfruttamento delle risorse, la difesa dai rischi naturali e la riduzione dei problemi ambientali.</li>\r\n<li><b>Progettare e realizzare</b> un esperimento scientifico per rispondere ad una domanda, formulando un\'ipotesi, raccogliendo dei dati ed elaborandoli.</li>\r\n</ul>', '<ul>\n<li><b>Understand</b> the multiple roles played by plants and <b>relate them</b> to resource exploitation, defense against natural hazards and reduction of environmental problems</li>\n<li>Design and carry out a scientific experiment to answer a question by formulating a hypothesis, collecting data and processing it</li>\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n<li>Valutazione positiva project work</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n<li>Positive evaluation project work</li>\r\n</ul>', '<p>\r\nIl corso offre una panoramica sulla distribuzione delle piante e la biodiversità vegetale, utilizzando immagini,video e campioni e facendo uso di esempi della nostra realtà quotidiana. Passerà in rassegna quindi gli aspetti legati a cibo, farmaci, fotosintesi, clima, adattamenti all\'ambiente. A ciò si affiancherà una parte pratica in cui, lavorando a gruppi, gli studenti dovranno realizzare un esperimento scientifico per mostrare un aspetto specifico legato al mondo vegetale\r\n</p>', '<p>\nThe course provides an overview of plant distribution and plant biodiversity, using images,videos and samples and making use of examples from our everyday reality. It will then review aspects related to food, drugs, photosynthesis, climate, and adaptations to the environment. This will be accompanied by a practical part in which, working in groups, students will have to carry out a scientific experiment to show a specific aspect related to the plant world\n</p>', 'COM', 10, 15, 1, 1, '2021-09-13', '/assets/courses/course_1'),
(3, 'Green Power🌳🌵🪷: come le piante dominano il mondo', 'Green Power🌳🌵🪷: how plants rule the world', '2022-09-08', '<p>\r\nSiamo sicuri di essere i padroni del mondo o esiste una \"nazione delle piante\"? Dov\'è il segreto del loro successo? Perchè da loro dipende la nostra vita e perchè potrebbero essere loro a salvarci?\r\n</p>', '<p>\r\nAre we sure we are the masters of the world or is there a \"plant nation\"? Where is the secret of their success? Why do our lives depend on them and why could they be the ones to save us?\r\n</p>', 0, 4, '<ul>\r\n<li><b>Comprendere</b> i molteplici ruoli svolti dalle piante e <b>metterli in relazione</b> con lo sfruttamento delle risorse, la difesa dai rischi naturali e la riduzione dei problemi ambientali.</li>\r\n<li><b>Progettare e realizzare</b> un esperimento scientifico per rispondere ad una domanda, formulando un\'ipotesi, raccogliendo dei dati ed elaborandoli.</li>\r\n</ul>', '<ul>\n<li><b>Understand</b> the multiple roles played by plants and <b>relate them</b> to resource exploitation, defense against natural hazards and reduction of environmental problems</li>\n<li>Design and carry out a scientific experiment to answer a question by formulating a hypothesis, collecting data and processing it</li>\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n<li>Valutazione positiva project work</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n<li>Positive evaluation project work</li>\r\n</ul>', '<p>\r\nIl corso offre una panoramica sulla distribuzione delle piante e la biodiversità vegetale, utilizzando immagini,video e campioni e facendo uso di esempi della nostra realtà quotidiana. Passerà in rassegna quindi gli aspetti legati a cibo, farmaci, fotosintesi, clima, adattamenti all\'ambiente. A ciò si affiancherà una parte pratica in cui, lavorando a gruppi, gli studenti dovranno realizzare un esperimento scientifico per mostrare un aspetto specifico legato al mondo vegetale\r\n</p>', '<p>\r\nThe course provides an overview of plant distribution and plant biodiversity, using images,videos and samples and making use of examples from our everyday reality. It will then review aspects related to food, drugs, photosynthesis, climate, and adaptations to the environment. This will be accompanied by a practical part in which, working in groups, students will have to carry out a scientific experiment to show a specific aspect related to the plant world\r\n</p>', 'SM', 1, 25, 2, 2, '2022-09-09', '/assets/courses/course_1'),
(4, 'La magia dell\'acqua 💧🧊', 'The magic of water 💧🧊', '2022-08-25', '<p>\r\n“Se vi è una magia su questo pianeta, è contenuta nell’acqua (L. Eiseley)”.<br />\r\nUn percorso alla scoperta della sostanza che rende speciale il nostro Pianeta, dalle caratteristiche molecolari agli effetti sull’uomo e sull’ambiente.\r\n</p>', '<p>\r\n\"If there is any magic on this planet, it is contained in water (L. Eiseley)\".<br />\r\nA journey to discover the substance that makes our Planet special, from molecular characteristics to effects on humans and the environment.\r\n</p>', 0, 4, '<ul>\r\n<li><b>Comprendere</b> le proprietà fisico-chimiche dell\'acqua e <b>riconoscerne</b> l\'importanza per la vita.</li>\r\n<li><b>Individuare</b> il ruolo dell\'acqua nelle cellule e negli organismi <b>riflettendo</b> sulle strategie di conservazione.\r\n<li><b>Riconoscere</b> rischi e risorse degli ambienti acquatici e le alterazioni antropiche</li>\r\n</ul>', '<ul>\r\n<li><b>Understand</b> the physicochemical properties of water and <b>recognize</b> its importance to life.</li>\r\n<li><b>Identify</b> the role of water in cells and organisms by <b>reflecting</b> on conservation strategies.</li>\r\n<li><b>Recognize</b> risks and resources of aquatic environments and anthropogenic alterations</li>\r\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n<li>Valutazione positiva della relazione di laboratorio e della scheda di osservazione di campo</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n<li>Positive evaluation of the laboratory report and field observation form</li>\r\n</ul>', '<p>\r\nIl corso si propone di offrire una panoramica sull’elemento più caratterizzante della Terra, analizzandone peculiarità e ruolo fondamentale per i viventi. Le caratteristiche chimiche dell’acqua verranno indagate anche attraverso semplici esperimenti, mentre gli aspetti più legati alla fisiologia, alla patologia e all’igiene nell’uomo saranno esplorati per mezzo di attività guidate individuali e a piccoli gruppi e avvalendosi di supporti multimediali. Gli aspetti naturalistici e ambientali verranno indagati con delle uscite sul territorio progettate ad hoc (qualità delle acque, rischio idrogeologico, ecc.)\r\n</p>', '<p>\r\nThe course aims to provide an overview of the Earth\'s most defining element, analyzing its peculiarities and fundamental role for living things. The chemical characteristics of water will also be investigated through simple experiments, while aspects more related to physiology, pathology and hygiene in humans will be explored by means of individual and small-group guided activities and making use of multimedia supports. Naturalistic and environmental aspects will be investigated with specially designed field trips (water quality, hydrogeological risk, etc.).\r\n</p>', 'SM', 15, 20, 2, 1, '2021-09-13', '/assets/courses/course_1'),
(5, 'A qualcuno piace caldo🥵', 'Some people like it hot🥵', '2021-08-25', '<b>\r\nCorso dove gli studenti studieranno il cambiamento climatico\r\n</b>', '<b>\r\nCourse where students will study climate change\r\n</b>', 2, 3, '<ul>\r\n<li><b>Comprendere</b> le cause del cambiamento climatico in corso <b>evidenziando</b> quali attività antropiche ne sono responsabili.</li>\r\n<li><b>Distinguere</b> cause ed effetti del cambiamenti climatici <b>mettendole in relazione</b> fra loro.</li>\r\n<li><b>Riflettere</b> sull\'impatto dei propri comportamenti e delle proprie scelte ragionando su possibili alternative.</li>\r\n</ul>', '<ul>\r\n<li><b>Understand</b> the causes of current climate change by <b>highlighting</b> which anthropogenic activities are responsible for it.</li>\r\n<li><b>Distinguish</b> causes and effects of climate change by <b>relating them</b> to each other.</li>\r\n<li><b>Reflect</b> on the impact of their own behaviors and choices by reasoning about possible alternatives.</li>\r\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n</ul>', '<p>\r\nIl corso parte dalle esperienze degli studenti sui cambiamenti climatici per riorganizzarli in una cornice di rigore scientifico e dare loro gli strumenti per partecipare attivamente al dibattito pubblico e di riflettere sui propri comportamenti e le ricadute che essi hanno sull\'ambiente. Ci si concentrerà sulle relazioni di causa-effetto e sulla complessità che caratterizza questi sistemi. Si metteranno in evidenza le cnseguenze di questo fenomeno negli ambiti ambientale, sanitario, economico.\r\n</p>', '<p>\r\nThe course starts with students\' experiences of climate change to reorganize them into a framework of scientific rigor and give them the tools to actively participate in public debate and to reflect on their own behaviors and the effects they have on the environment. There will be a focus on cause-and-effect relationships and the complexity that characterizes these systems. The cnseguences of this phenomenon in the environmental, health, and economic spheres will be highlighted.\r\n</p>', 'SM', 15, 25, 2, 1, '2021-09-13', '/assets/courses/course_1'),
(6, 'Dieci minuti scritti. Sperimentazioni di scrittura', 'Ten minutes written. Experiments in writing', '2022-08-25', '<p>\r\nScrivere può essere un piacere o un peso, ma prima di tutto è frutto di esercizio. Scrivere è una ginnastica per le idee, un metodo per sviluppare il proprio pensiero creativo e cercare idee e rapporti nuovi e originali con ciò che ci circonda. La scrittura creativa è questo: provare, scoprendo risorse, creatività e invenzione che, forse, non si sapeva di avere.\r\n</p>', '<p>\r\nWriting can be a pleasure or a burden, but first and foremost it is the result of exercise. Writing is a gymnastics for ideas, a method of developing one\'s creative thinking and seeking new and original ideas and relationships with what surrounds us. Creative writing is this: trying, discovering resources, creativity and invention that, perhaps, you did not know you had.\r\n</p>', 0, 4, '<ul>\r\n<li><b>Comprendere</b> le caratteristiche di vari tipi di testo e i rudimenti del processo creativo su cui si basa la scrittura</li>\r\n<li><b>Applicare</b>: le principali regole di scrittura, utilizzare i diversi registri in base ai testi e le griglie di autocorrezione</li>\r\n<li><b>Produrre</b>: microtesti di varie tipologie, facendo riferimento agli esercizi base della scrittura creativa</li>\r\n<ul>', '<ul>\r\n<li><b>Understand</b> the characteristics of various types of text and the rudiments of the creative process on which writing is based</li>\r\n<li><b>Apply</b>: the main rules of writing, use different registers according to texts and self-correction grids</li>\r\n<li><b>Produce</b>: microtexts of various types, referring to the basic exercises of creative writing</li>\r\n<ul>', '<ul>\r\n<li>L\'impegno nelle esercitaizoni e l\'attenzione a seguire indicazioni e consigli per evitare il ripetersi di errori, oltre alla costanza nella produzione delle esercizi assegnati, concorreranno alla valutazione finale, che consisterà nella stesura di un minitesto di tipologia a scelta fra quelle affrontate, la cui correttezzia è determinata dai parametri stessi del testo precedentemente presentati agli studenti.</li>\r\n<li>Presenza almeno 60% ore</li>\r\n</ul>', '<ul>\r\n<li>Commitment to the exercises and attention to following directions and advice to avoid the repetition of errors, as well as consistency in the production of the assigned exercises, will contribute to the final assessment, which will consist of the writing of a mini-text of a type chosen from those addressed, the correctness of which is determined by the very parameters of the text previously presented to the students.</li>\r\n<li>Attendance at least 60% hours</li>\r\n</ul>', '<p>\r\nIl corso ha carattere laboratoriale e prevede la stesura di microtesti di varia natura oltre ad attività pratiche di scrittura creativa, sviluppando un approccio originale alle tematiche proposte\r\n</p>', '<p>\r\nThe course is workshop-based in nature and involves the writing of microtexts of various kinds as well as practical creative writing activities, developing an original approach to the proposed topics\r\n</p>', 'COM', 10, 20, 1, 2, '2022-09-08', '/assets/courses/course_1');

-- --------------------------------------------------------

--
-- Struttura della tabella `grade`
--

CREATE TABLE `grade` (
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

INSERT INTO `grade` (`student_id`, `teacher_id`, `project_class_course_id`, `project_class_session`, `italian_description`, `english_description`, `publication`, `grade`, `final`) VALUES
(1, 1, 5, 1, 'Compito di Chimica', 'Chemisrty test', '2023-09-05 09:10:15', 9, 0);

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
(1, 5, 1, 'A', 'PER', NULL),
(1, 4, 1, 'A', 'SPE', NULL),
(1, 6, 1, 'A', 'SPE', NULL),
(2, 5, 1, 'A', 'PER', NULL),
(2, 6, 1, 'A', 'SPE', NULL);

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
(1, 0, 2023, '2023-09-01', '2023-09-18', 1, '2023-08-18'),
(2, 1, 2023, '2023-09-19', '2023-10-27', 1, '2023-09-14'),
(3, 2, 2023, '2023-10-30', '2023-12-08', 1, '2023-10-19'),
(4, 3, 2023, '2023-12-11', '2024-02-02', 1, '2023-11-30'),
(5, 4, 2023, '2024-02-05', '2024-03-15', 1, '2024-01-24'),
(6, 5, 2023, '2024-03-18', '2024-04-26', 1, '2024-03-09');

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
(3, 1, 1, 'BIO', 2023, NULL, 'PER', 3),
(4, 1, 1, 'TUR4', 2023, 'SM', 'SPE', 4),
(5, 1, 1, 'TUR4', 2023, 'COM', 'SPE', 4),
(6, 1, 1, 'TUR4', 2023, NULL, 'PER', 3),
(7, 1, 1, 'ODO', 2023, 'SM', 'SPE', 4),
(8, 1, 1, 'ODO', 2023, 'COM', 'SPE', 4),
(9, 1, 1, 'ODO', 2023, NULL, 'PER', 3),
(10, 2, 1, 'BIO', 2023, 'SM', 'SPE', 4),
(11, 2, 1, 'BIO', 2023, 'COM', 'SPE', 4),
(12, 2, 1, 'BIO', 2023, 'SGET', 'SPE', 2),
(13, 2, 1, 'BIO', 2023, NULL, 'PER', 3),
(14, 2, 1, 'TUR4', 2023, 'SM', 'SPE', 4),
(15, 2, 1, 'TUR4', 2023, 'COM', 'SPE', 4),
(16, 2, 1, 'TUR4', 2023, 'SGET', 'SPE', 2),
(17, 2, 1, 'TUR4', 2023, NULL, 'PER', 3),
(18, 2, 1, 'ODO', 2023, 'SM', 'SPE', 4),
(19, 2, 1, 'ODO', 2023, 'COM', 'SPE', 4),
(20, 2, 1, 'ODO', 2023, 'SGET', 'SPE', 2),
(21, 2, 1, 'ODO', 2023, NULL, 'PER', 3),
(22, 3, 1, 'BIO', 2023, 'SM', 'SPE', 4),
(23, 3, 1, 'BIO', 2023, 'COM', 'SPE', 4),
(24, 3, 1, 'BIO', 2023, 'TEC', 'SPE', 2),
(25, 3, 1, 'BIO', 2023, NULL, 'PER', 3),
(26, 3, 1, 'TUR4', 2023, 'SM', 'SPE', 4),
(27, 3, 1, 'TUR4', 2023, 'COM', 'SPE', 4),
(28, 3, 1, 'TUR4', 2023, 'TEC', 'SPE', 2),
(29, 3, 1, 'TUR4', 2023, NULL, 'PER', 3),
(30, 3, 1, 'ODO', 2023, 'SM', 'SPE', 4),
(31, 3, 1, 'ODO', 2023, 'COM', 'SPE', 4),
(32, 3, 1, 'ODO', 2023, 'TEC', 'SPE', 2),
(33, 3, 1, 'ODO', 2023, NULL, 'PER', 3),
(34, 4, 1, 'BIO', 2023, 'SM', 'SPE', 2),
(35, 4, 1, 'BIO', 2023, 'COM', 'SPE', 4),
(36, 4, 1, 'BIO', 2023, 'TEC', 'SPE', 2),
(37, 4, 1, 'BIO', 2023, 'SGET', 'SPE', 2),
(38, 4, 1, 'BIO', 2023, NULL, 'PER', 3),
(39, 4, 1, 'TUR4', 2023, 'SM', 'SPE', 2),
(40, 4, 1, 'TUR4', 2023, 'COM', 'SPE', 4),
(41, 4, 1, 'TUR4', 2023, 'TEC', 'SPE', 2),
(42, 4, 1, 'TUR4', 2023, 'SGET', 'SPE', 2),
(43, 4, 1, 'TUR4', 2023, NULL, 'PER', 3),
(44, 4, 1, 'ODO', 2023, 'SM', 'SPE', 2),
(45, 4, 1, 'ODO', 2023, 'COM', 'SPE', 4),
(46, 4, 1, 'ODO', 2023, 'TEC', 'SPE', 2),
(47, 4, 1, 'ODO', 2023, 'SGET', 'SPE', 2),
(48, 4, 1, 'ODO', 2023, NULL, 'PER', 3),
(49, 5, 1, 'BIO', 2023, 'SM', 'SPE', 4),
(50, 5, 1, 'BIO', 2023, 'COM', 'SPE', 4),
(51, 5, 1, 'BIO', 2023, 'SGET', 'SPE', 2),
(52, 5, 1, 'BIO', 2023, NULL, 'PER', 3),
(53, 5, 1, 'TUR4', 2023, 'SM', 'SPE', 4),
(54, 5, 1, 'TUR4', 2023, 'COM', 'SPE', 4),
(55, 5, 1, 'TUR4', 2023, 'SGET', 'SPE', 2),
(56, 5, 1, 'TUR4', 2023, NULL, 'PER', 3),
(57, 5, 1, 'ODO', 2023, 'SM', 'SPE', 4),
(58, 5, 1, 'ODO', 2023, 'COM', 'SPE', 4),
(59, 5, 1, 'ODO', 2023, 'SGET', 'SPE', 2),
(60, 5, 1, 'ODO', 2023, NULL, 'PER', 3),
(61, 6, 1, 'BIO', 2023, 'SM', 'SPE', 2),
(62, 6, 1, 'BIO', 2023, 'COM', 'SPE', 4),
(63, 6, 1, 'BIO', 2023, 'TEC', 'SPE', 2),
(64, 6, 1, 'BIO', 2023, 'SGET', 'SPE', 2),
(65, 6, 1, 'BIO', 2023, NULL, 'PER', 3),
(66, 6, 1, 'TUR4', 2023, 'SM', 'SPE', 2),
(67, 6, 1, 'TUR4', 2023, 'COM', 'SPE', 4),
(68, 6, 1, 'TUR4', 2023, 'TEC', 'SPE', 2),
(69, 6, 1, 'TUR4', 2023, 'SGET', 'SPE', 2),
(70, 6, 1, 'TUR4', 2023, NULL, 'PER', 3),
(71, 6, 1, 'ODO', 2023, 'SM', 'SPE', 2),
(72, 6, 1, 'ODO', 2023, 'COM', 'SPE', 4),
(73, 6, 1, 'ODO', 2023, 'TEC', 'SPE', 2),
(74, 6, 1, 'ODO', 2023, 'SGET', 'SPE', 2),
(75, 6, 1, 'ODO', 2023, NULL, 'PER', 3);

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
(2, 1, NULL, NULL, 1, 1, 1, 1, '2023-07-31', NULL, '2023-08-15'),
(3, 1, NULL, NULL, 1, 1, 1, 1, '2023-07-31', NULL, '2023-08-15'),
(4, 1, NULL, NULL, 1, 1, 1, 1, '2023-07-31', NULL, '2023-08-15'),
(5, 1, NULL, NULL, 1, 1, 1, 1, '2023-07-31', NULL, '2023-08-15'),
(6, 1, NULL, NULL, 1, 1, 1, 1, '2023-07-31', NULL, '2023-08-15');

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
(1, 6, 1, 'A', 1),
(4, 5, 1, 'A', 1);

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
(2, NULL, 'giulia.battistel', 'giulia.battistel@istitutodecarneri.it', '648849c64d11d86ce9d787d3f95efb8760721f793b07d67fc4e77d6b9835a749', 'Giulia', 'Battistel', NULL, NULL, NULL, 0, 0, '/assets/users/students/battistel')
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
(19, NULL, 'giovanni.scalfi', 'scalfi@istitutodecarneri.it', 'c7f34fdb4f26f71402547e71d7042ada08588c8edd28fbe5de144124609128b9', 'Giovanni', 'Scalfi', NULL, NULL, NULL, 0, 0, '/assets/users/teachers/scalfi');

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
  ADD PRIMARY KEY (`student_id`,`teacher_id`,`project_class_course_id`,`project_class_session`,`publication`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `learning_session`
--
ALTER TABLE `learning_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `limited`
--
ALTER TABLE `limited`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT per la tabella `personal_growth_area`
--
ALTER TABLE `personal_growth_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT per la tabella `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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