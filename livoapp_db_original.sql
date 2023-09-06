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
  `first_access` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `admin`
--

INSERT INTO `admin` (`id`, `cf`, `username`, `email`, `password`, `name`, `surname`, `gender`, `birth_date`, `address`, `google`, `first_access`) VALUES
(1, NULL, 'admin', 'fronzapietro@gmail.com', '0x38343464396164326334653438376434303465663736616564313765613435323839656166363434643739646162303233613434383164613532396439306530', 'Pietro', 'Fronza', NULL, NULL, NULL, 0, 0),
(2, NULL, 'claudio.march', 'march@istitutodecarneri.it', '0x38373434386365343762303465333138346637386333333933366462666335646566363834616532313866376161393633626337633763646136363031613034', 'Claudio', 'March', NULL, NULL, NULL, 0, 0);

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
(23, 1, 'ODO', 2023, 'A'),
(24, 1, 'ODO', 2023, 'A');
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

INSERT INTO `citizenship_report` (`id`, `student_id`, `delivery`, `certifying_admin_id`, `admin_confirmation`, `start`, `hours`, `experience_place`, `referent_sign`) VALUES
(3, 1, '2023-04-02', 1, '2023-04-03', '2022-04-27', 11, 'Via Giovanni Segantini 16, Trento, TN', 'Firma'),
(4, 2, '2023-04-04', NULL, NULL, '2023-02-01', 11, 'Via Marconi 16 Castel d\'Azzano, VR', 'Firma 2');

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
  `to_be_modified` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `course`
--

INSERT INTO `course` (`id`, `italian_title`, `english_title`, `creation_school_year`, `italian_description`, `english_description`, `up_hours`, `credits`, `italian_expected_learning_results`, `english_expected_learning_results`, `italian_criterions`, `english_criterions`, `italian_activities`, `english_activities`, `learning_area_id`, `min_students`, `max_students`, `proposer_teacher_id`, `certifying_admin_id`, `admin_confirmation`) VALUES
(1, 'Gestire il cambiamento', 'Managing change', '2022-08-25', '<p>\nL’unica costante nella nostra vita è il cambiamento. A volte siamo noi a decidere consapevolmente di dare una svolta alla nostra vita (ad es. quando cambiamo sport, scuola, amici); altre volte è il contesto che cambia attorno a noi e ci costringe ad adeguarci alle nuove condizioni. Quanti cambiamenti hai già affrontato nella tua vita? Li hai accolti come un’opportunità o ti sei sentito in difficoltà?\n</p>', '<p>\r\nThe one constant in our lives is change. Sometimes it is we who consciously decide to turn our lives around (e.g. when we change sport, school, friends); other times it is the context that changes around us and forces us to adapt to the new conditions. How many changes have you already faced in your life? Did you welcome them as an opportunity or did you feel challenged?\r\n</p>', 12, 4, '<ul>\r\n<li><b>Riconoscere</b> e <b>descrivere</b> le principali dinamiche legate ai singoli momenti di un cambiamento, sia personale che professionale;</li>\r\n<li><b>Affrontare</b> con maggiore consapevolezza e sicurezza interiore processi di cambiamento;</li>\r\n<li><b>Applicare</b> diverse strategie per lavorare in modo costruttivo in situazioni inaspettate e imprevedibili;</li>\r\n<li><b>Interagire</b> con gli altri in modo appropriato al contesto e alle aspettative sociali</li>\r\n</ul>', '<ul>\r\n<li><b>Recognize</b> and <b>describe</b> the main dynamics associated with individual moments of change, both personal and professional;</li>\r\n<li><b>Deal</b> with greater awareness and inner confidence in change processes;</li>\r\n<li><b>Apply</b> different strategies to work constructively in unexpected and unpredictable situations;</li>\r\n<li><b>Interact</b> with others in ways appropriate to the context and social expectations</li>\r\n</ul>', '<p>\r\nIl corso presenta diverse domande in itinere, alcune sotto forma di quiz, altre proposte unicamente per stimolare la tua riflessione personale. Queste domande non verranno valutate ai fini del superamento del corso. Verranno invece valutati i quiz che faremo al termine di ogni \"\"capitolo\"\".<br />\r\nInoltre <b>sarà valutata la partecipazione</b> alle attività di riflessione e di Role Play\r\n</p>', '<p>\r\nThe course has several on-going questions, some in the form of quizzes, others offered solely to stimulate your personal reflection. These questions will not be evaluated for the purpose of passing the course. Instead, the quizzes we will take at the end of each \"\"chapter\"\" will be evaluated.<br />\r\nIn addition, <b>participation</b> in the reflection and Role Play activities will be <b>evaluated</b>\r\n</p>', '<p>\r\nDurante il corso sono proposti strumenti e attività pratiche per avviare un processo di riflessione sul proprio modo di porsi nei confronti del cambiamento. Le attività affronteranno 5 temi:\r\n</p>\r\n<ul>\r\n<li>Riconoscere il cambiamento e trarne il meglio</li>\r\n<li>Il processo di cambiamento</li>\r\n<li>Gestione del cambiamento in classe</li>\r\n<li>Gestione del cambiamento in famiglia e nel mio ambiente sociale</li>\r\n<li>Competenze necessarie per il cambiamento</li>\r\n</ul>', '<p>\r\nDuring the course, practical tools and activities are offered to initiate a process of reflection on one\'s attitude toward change. Activities will address 5 themes:\r\n</p>\r\n<ul>\r\n<li>Recognizing change and making the best of it</li>\r\n<li>The process of change</li>\r\n<li>Change management in the classroom</li>\r\n<li>Managing change in the family and in my social environment</li>\r\n<li>Skills needed for change</li>\r\n</ul>', 'COM', 10, 15, 1, NULL, NULL),
(2, 'Green Power🌳🌵🪷: come le piante dominano il mondo', 'Green Power🌳🌵🪷: how plants rule the world', '2021-08-25', '<p>\r\nSiamo sicuri di essere i padroni del mondo o esiste una \"nazione delle piante\"? Dov\'è il segreto del loro successo? Perchè da loro dipende la nostra vita e perchè potrebbero essere loro a salvarci?\r\n</p>', '<p>\r\nAre we sure we are the masters of the world or is there a \"plant nation\"? Where is the secret of their success? Why do our lives depend on them and why could they be the ones to save us?\r\n</p>', 0, 4, '<ul>\r\n<li><b>Comprendere</b> i molteplici ruoli svolti dalle piante e <b>metterli in relazione</b> con lo sfruttamento delle risorse, la difesa dai rischi naturali e la riduzione dei problemi ambientali.</li>\r\n<li><b>Progettare e realizzare</b> un esperimento scientifico per rispondere ad una domanda, formulando un\'ipotesi, raccogliendo dei dati ed elaborandoli.</li>\r\n</ul>', '<ul>\n<li><b>Understand</b> the multiple roles played by plants and <b>relate them</b> to resource exploitation, defense against natural hazards and reduction of environmental problems</li>\n<li>Design and carry out a scientific experiment to answer a question by formulating a hypothesis, collecting data and processing it</li>\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n<li>Valutazione positiva project work</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n<li>Positive evaluation project work</li>\r\n</ul>', '<p>\r\nIl corso offre una panoramica sulla distribuzione delle piante e la biodiversità vegetale, utilizzando immagini,video e campioni e facendo uso di esempi della nostra realtà quotidiana. Passerà in rassegna quindi gli aspetti legati a cibo, farmaci, fotosintesi, clima, adattamenti all\'ambiente. A ciò si affiancherà una parte pratica in cui, lavorando a gruppi, gli studenti dovranno realizzare un esperimento scientifico per mostrare un aspetto specifico legato al mondo vegetale\r\n</p>', '<p>\nThe course provides an overview of plant distribution and plant biodiversity, using images,videos and samples and making use of examples from our everyday reality. It will then review aspects related to food, drugs, photosynthesis, climate, and adaptations to the environment. This will be accompanied by a practical part in which, working in groups, students will have to carry out a scientific experiment to show a specific aspect related to the plant world\n</p>', 'COM', 10, 15, 1, 1, '2021-09-13'),
(3, 'Green Power🌳🌵🪷: come le piante dominano il mondo', 'Green Power🌳🌵🪷: how plants rule the world', '2022-09-08', '<p>\r\nSiamo sicuri di essere i padroni del mondo o esiste una \"nazione delle piante\"? Dov\'è il segreto del loro successo? Perchè da loro dipende la nostra vita e perchè potrebbero essere loro a salvarci?\r\n</p>', '<p>\r\nAre we sure we are the masters of the world or is there a \"plant nation\"? Where is the secret of their success? Why do our lives depend on them and why could they be the ones to save us?\r\n</p>', 0, 4, '<ul>\r\n<li><b>Comprendere</b> i molteplici ruoli svolti dalle piante e <b>metterli in relazione</b> con lo sfruttamento delle risorse, la difesa dai rischi naturali e la riduzione dei problemi ambientali.</li>\r\n<li><b>Progettare e realizzare</b> un esperimento scientifico per rispondere ad una domanda, formulando un\'ipotesi, raccogliendo dei dati ed elaborandoli.</li>\r\n</ul>', '<ul>\n<li><b>Understand</b> the multiple roles played by plants and <b>relate them</b> to resource exploitation, defense against natural hazards and reduction of environmental problems</li>\n<li>Design and carry out a scientific experiment to answer a question by formulating a hypothesis, collecting data and processing it</li>\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n<li>Valutazione positiva project work</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n<li>Positive evaluation project work</li>\r\n</ul>', '<p>\r\nIl corso offre una panoramica sulla distribuzione delle piante e la biodiversità vegetale, utilizzando immagini,video e campioni e facendo uso di esempi della nostra realtà quotidiana. Passerà in rassegna quindi gli aspetti legati a cibo, farmaci, fotosintesi, clima, adattamenti all\'ambiente. A ciò si affiancherà una parte pratica in cui, lavorando a gruppi, gli studenti dovranno realizzare un esperimento scientifico per mostrare un aspetto specifico legato al mondo vegetale\r\n</p>', '<p>\r\nThe course provides an overview of plant distribution and plant biodiversity, using images,videos and samples and making use of examples from our everyday reality. It will then review aspects related to food, drugs, photosynthesis, climate, and adaptations to the environment. This will be accompanied by a practical part in which, working in groups, students will have to carry out a scientific experiment to show a specific aspect related to the plant world\r\n</p>', 'SM', 1, 25, 2, 2, '2022-09-09'),
(4, 'La magia dell\'acqua 💧🧊', 'The magic of water 💧🧊', '2022-08-25', '<p>\r\n“Se vi è una magia su questo pianeta, è contenuta nell’acqua (L. Eiseley)”.<br />\r\nUn percorso alla scoperta della sostanza che rende speciale il nostro Pianeta, dalle caratteristiche molecolari agli effetti sull’uomo e sull’ambiente.\r\n</p>', '<p>\r\n\"If there is any magic on this planet, it is contained in water (L. Eiseley)\".<br />\r\nA journey to discover the substance that makes our Planet special, from molecular characteristics to effects on humans and the environment.\r\n</p>', 0, 4, '<ul>\r\n<li><b>Comprendere</b> le proprietà fisico-chimiche dell\'acqua e <b>riconoscerne</b> l\'importanza per la vita.</li>\r\n<li><b>Individuare</b> il ruolo dell\'acqua nelle cellule e negli organismi <b>riflettendo</b> sulle strategie di conservazione.\r\n<li><b>Riconoscere</b> rischi e risorse degli ambienti acquatici e le alterazioni antropiche</li>\r\n</ul>', '<ul>\r\n<li><b>Understand</b> the physicochemical properties of water and <b>recognize</b> its importance to life.</li>\r\n<li><b>Identify</b> the role of water in cells and organisms by <b>reflecting</b> on conservation strategies.</li>\r\n<li><b>Recognize</b> risks and resources of aquatic environments and anthropogenic alterations</li>\r\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n<li>Valutazione positiva della relazione di laboratorio e della scheda di osservazione di campo</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n<li>Positive evaluation of the laboratory report and field observation form</li>\r\n</ul>', '<p>\r\nIl corso si propone di offrire una panoramica sull’elemento più caratterizzante della Terra, analizzandone peculiarità e ruolo fondamentale per i viventi. Le caratteristiche chimiche dell’acqua verranno indagate anche attraverso semplici esperimenti, mentre gli aspetti più legati alla fisiologia, alla patologia e all’igiene nell’uomo saranno esplorati per mezzo di attività guidate individuali e a piccoli gruppi e avvalendosi di supporti multimediali. Gli aspetti naturalistici e ambientali verranno indagati con delle uscite sul territorio progettate ad hoc (qualità delle acque, rischio idrogeologico, ecc.)\r\n</p>', '<p>\r\nThe course aims to provide an overview of the Earth\'s most defining element, analyzing its peculiarities and fundamental role for living things. The chemical characteristics of water will also be investigated through simple experiments, while aspects more related to physiology, pathology and hygiene in humans will be explored by means of individual and small-group guided activities and making use of multimedia supports. Naturalistic and environmental aspects will be investigated with specially designed field trips (water quality, hydrogeological risk, etc.).\r\n</p>', 'SM', 15, 20, 2, 1, '2021-09-13'),
(5, 'A qualcuno piace caldo🥵', 'Some people like it hot🥵', '2021-08-25', '<b>\r\nCorso dove gli studenti studieranno il cambiamento climatico\r\n</b>', '<b>\r\nCourse where students will study climate change\r\n</b>', 2, 3, '<ul>\r\n<li><b>Comprendere</b> le cause del cambiamento climatico in corso <b>evidenziando</b> quali attività antropiche ne sono responsabili.</li>\r\n<li><b>Distinguere</b> cause ed effetti del cambiamenti climatici <b>mettendole in relazione</b> fra loro.</li>\r\n<li><b>Riflettere</b> sull\'impatto dei propri comportamenti e delle proprie scelte ragionando su possibili alternative.</li>\r\n</ul>', '<ul>\r\n<li><b>Understand</b> the causes of current climate change by <b>highlighting</b> which anthropogenic activities are responsible for it.</li>\r\n<li><b>Distinguish</b> causes and effects of climate change by <b>relating them</b> to each other.</li>\r\n<li><b>Reflect</b> on the impact of their own behaviors and choices by reasoning about possible alternatives.</li>\r\n</ul>', '<ul>\r\n<li>presenza almeno 60% ore</li>\r\n<li>superamento delle verifiche di merito</li>\r\n</ul>', '<ul>\r\n<li>attendance at least 60% hours</li>\r\n<li>passing merit tests</li>\r\n</ul>', '<p>\r\nIl corso parte dalle esperienze degli studenti sui cambiamenti climatici per riorganizzarli in una cornice di rigore scientifico e dare loro gli strumenti per partecipare attivamente al dibattito pubblico e di riflettere sui propri comportamenti e le ricadute che essi hanno sull\'ambiente. Ci si concentrerà sulle relazioni di causa-effetto e sulla complessità che caratterizza questi sistemi. Si metteranno in evidenza le cnseguenze di questo fenomeno negli ambiti ambientale, sanitario, economico.\r\n</p>', '<p>\r\nThe course starts with students\' experiences of climate change to reorganize them into a framework of scientific rigor and give them the tools to actively participate in public debate and to reflect on their own behaviors and the effects they have on the environment. There will be a focus on cause-and-effect relationships and the complexity that characterizes these systems. The cnseguences of this phenomenon in the environmental, health, and economic spheres will be highlighted.\r\n</p>', 'SM', 15, 25, 2, 1, '2021-09-13'),
(6, 'Dieci minuti scritti. Sperimentazioni di scrittura', 'Ten minutes written. Experiments in writing', '2022-08-25', '<p>\r\nScrivere può essere un piacere o un peso, ma prima di tutto è frutto di esercizio. Scrivere è una ginnastica per le idee, un metodo per sviluppare il proprio pensiero creativo e cercare idee e rapporti nuovi e originali con ciò che ci circonda. La scrittura creativa è questo: provare, scoprendo risorse, creatività e invenzione che, forse, non si sapeva di avere.\r\n</p>', '<p>\r\nWriting can be a pleasure or a burden, but first and foremost it is the result of exercise. Writing is a gymnastics for ideas, a method of developing one\'s creative thinking and seeking new and original ideas and relationships with what surrounds us. Creative writing is this: trying, discovering resources, creativity and invention that, perhaps, you did not know you had.\r\n</p>', 0, 4, '<ul>\r\n<li><b>Comprendere</b> le caratteristiche di vari tipi di testo e i rudimenti del processo creativo su cui si basa la scrittura</li>\r\n<li><b>Applicare</b>: le principali regole di scrittura, utilizzare i diversi registri in base ai testi e le griglie di autocorrezione</li>\r\n<li><b>Produrre</b>: microtesti di varie tipologie, facendo riferimento agli esercizi base della scrittura creativa</li>\r\n<ul>', '<ul>\r\n<li><b>Understand</b> the characteristics of various types of text and the rudiments of the creative process on which writing is based</li>\r\n<li><b>Apply</b>: the main rules of writing, use different registers according to texts and self-correction grids</li>\r\n<li><b>Produce</b>: microtexts of various types, referring to the basic exercises of creative writing</li>\r\n<ul>', '<ul>\r\n<li>L\'impegno nelle esercitaizoni e l\'attenzione a seguire indicazioni e consigli per evitare il ripetersi di errori, oltre alla costanza nella produzione delle esercizi assegnati, concorreranno alla valutazione finale, che consisterà nella stesura di un minitesto di tipologia a scelta fra quelle affrontate, la cui correttezzia è determinata dai parametri stessi del testo precedentemente presentati agli studenti.</li>\r\n<li>Presenza almeno 60% ore</li>\r\n</ul>', '<ul>\r\n<li>Commitment to the exercises and attention to following directions and advice to avoid the repetition of errors, as well as consistency in the production of the assigned exercises, will contribute to the final assessment, which will consist of the writing of a mini-text of a type chosen from those addressed, the correctness of which is determined by the very parameters of the text previously presented to the students.</li>\r\n<li>Attendance at least 60% hours</li>\r\n</ul>', '<p>\r\nIl corso ha carattere laboratoriale e prevede la stesura di microtesti di varia natura oltre ad attività pratiche di scrittura creativa, sviluppando un approccio originale alle tematiche proposte\r\n</p>', '<p>\r\nThe course is workshop-based in nature and involves the writing of microtexts of various kinds as well as practical creative writing activities, developing an original approach to the proposed topics\r\n</p>', 'COM', 10, 20, 1, 2, '2022-09-08');

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
(1, 0, 2023, '2023-09-01', '2022-09-18', 1, '2022-08-18'),
(2, 1, 2023, '2022-09-19', '2022-10-27', 1, '2022-09-14'),
(3, 2, 2023, '2022-10-30', '2022-12-08', 1, '2022-10-19'),
(4, 3, 2023, '2023-12-11', '2023-02-02', 1, '2022-11-30');

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
(11, 2, 1, 'BIO', 2023, 'COM', 'SPE', 8),
(12, 2, 1, 'BIO', 2023, NULL, 'PER', 3),
(13, 2, 1, 'TUR4', 2023, 'SM', 'SPE', 4),
(14, 2, 1, 'TUR4', 2023, 'COM', 'SPE', 8),
(15, 2, 1, 'TUR4', 2023, NULL, 'PER', 3),
(16, 2, 1, 'ODO', 2023, 'SM', 'SPE', 4),
(17, 2, 1, 'ODO', 2023, 'COM', 'SPE', 8),
(18, 2, 1, 'ODO', 2023, NULL, 'PER', 3),
(19, 3, 1, 'BIO', 2023, 'SM', 'SPE', 4),
(20, 3, 1, 'BIO', 2023, 'COM', 'SPE', 8),
(21, 3, 1, 'BIO', 2023, NULL, 'PER', 3),
(22, 3, 1, 'TUR4', 2023, 'SM', 'SPE', 4),
(23, 3, 1, 'TUR4', 2023, 'COM', 'SPE', 8),
(24, 3, 1, 'TUR4', 2023, NULL, 'PER', 3),
(25, 3, 1, 'ODO', 2023, 'SM', 'SPE', 4),
(26, 3, 1, 'ODO', 2023, 'COM', 'SPE', 8),
(27, 3, 1, 'ODO', 2023, NULL, 'PER', 3);

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
  `coordinator` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ordinary_teach`
--

INSERT INTO `ordinary_teach` (`ordinary_class_study_year`, `ordinary_class_address`, `ordinary_class_school_year`, `section`, `teaching_id`, `teacher_id`, `coordinator`) VALUES
(1, 'BIO', 2023, 'A', 'REL', 1, 0),
(1, 'ODO', 2023, 'A', 'REL', 1, 0),
(1, 'TUR4', 2023, 'A', 'REL', 1, 0),
(1, 'BIO', 2023, 'A', 'ING', 2, 0),
(1, 'ODO', 2023, 'A', 'ING', 2, 0),
(1, 'ODO', 2023, 'A', 'TED', 2, 0),
(1, 'BIO', 2023, 'A', 'SMS', 3, 0),
(1, 'ODO', 2023, 'A', 'SMS', 3, 0),
(1, 'TUR4', 2023, 'A', 'SMS', 3, 0),
(1, 'BIO', 2023, 'A', 'MAT', 4, 0),
(1, 'BIO', 2023, 'A', 'FIS', 4, 0),
(1, 'BIO', 2023, 'A', 'DE', 5, 0),
(1, 'ODO', 2023, 'A', 'DE', 5, 0),
(1, 'BIO', 2023, 'A', 'TTRG', 6, 0),
(1, 'ODO', 2023, 'A', 'MAT', 6, 0),
(1, 'BIO', 2023, 'A', 'CHI', 7, 0),
(1, 'ODO', 2023, 'A', 'CHI', 7, 0),
(1, 'TUR4', 2023, 'A', 'EA', 8, 0),
(1, 'ODO', 2023, 'A', 'IAF', 9, 0),
(1, 'TUR4', 2023, 'A', 'TB', 9, 0),
(1, 'ODO', 2023, 'A', 'RMO', 10, 0),
(1, 'ODO', 2023, 'A', 'ELO', 10, 0),
(1, 'TUR4', 2023, 'A', 'MAT', 11, 0),
(1, 'TUR4', 2023, 'A', 'FIS', 11, 0),
(1, 'BIO', 2023, 'A', 'ITA', 12, 0),
(1, 'BIO', 2023, 'A', 'STO', 12, 0),
(1, 'TUR4', 2023, 'A', 'ITA', 12, 0),
(1, 'TUR4', 2023, 'A', 'STO', 12, 0),
(1, 'TUR4', 2023, 'A', 'ING', 13, 0),
(1, 'BIO', 2023, 'A', 'TB', 14, 0),
(1, 'BIO', 2023, 'A', 'TED', 15, 0),
(1, 'TUR4', 2023, 'A', 'TED', 15, 0),
(1, 'TUR4', 2023, 'A', 'DE', 16, 0),
(1, 'BIO', 2023, 'A', 'TI', 17, 0),
(1, 'ODO', 2023, 'A', 'TIC', 17, 0),
(1, 'TUR4', 2023, 'A', 'INF', 17, 0),
(1, 'ODO', 2023, 'A', 'ITA', 18, 0),
(1, 'ODO', 2023, 'A', 'STO', 18, 0),
(1, 'TUR4', 2023, 'A', 'GEO', 19, 0);

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
(5, 'CLIL', 'CLIL', NULL, NULL);

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
(2, 1, NULL, NULL, 1, 1, 1, 1, '2023-07-31', 0, '2023-08-15'),
(3, 1, NULL, NULL, 1, 1, 1, 1, '2023-07-31', 0, '2023-08-15'),
(4, 1, NULL, NULL, 1, 1, 1, 1, '2023-07-31', 0, '2023-08-15'),
(5, 1, NULL, NULL, 1, 1, 1, 1, '2023-07-31', 0, '2023-08-15'),
(6, 1, NULL, NULL, 1, 1, 1, 1, '2023-07-31', 0, '2023-08-15');

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
  `first_access` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `student`
--

INSERT INTO `student` (`id`, `cf`, `username`, `email`, `password`, `name`, `surname`, `gender`, `birth_date`, `address`, `google`, `first_access`) VALUES
(1, NULL, 'aurora.avi', 'aurora.avi@istitutodecarneri.it', '0x64356263386261373032623864633462383133316239393963356531373231323333313634616530346134363438316634393566613039633066343536353864', 'Aurora', 'Avi', NULL, NULL, NULL, 0, 0),
(2, NULL, 'giulia.battistel', 'giulia.battistel@istitutodecarneri.it', '0x37326163373636646266316262643734656530633834323463353931353764393163303962643734363939653565333235623332393363343466646161656239', 'Giulia', 'Battistel', NULL, NULL, NULL, 0, 0),
(23, NULL, 'leonardo.angeli', 'leonardo.angeli@istitutodecarneri.it', '0x64666237316433366465326236333934363564376366376438363161346362396462623162346364646361616565646364333833353731656162343538323135', 'Leonardo', 'Angeli', NULL, NULL, NULL, 0, 0),
(24, NULL, 'enika.babi', 'enika.babi@istitutodecarneri.it', '0x38326437303864643338616536616339343632306365356563396133653030366564323333303637616332346432666132656531653065323562313637373564', 'Enika', 'Babi', NULL, NULL, NULL, 0, 0);

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
  `first_access` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `teacher`
--

INSERT INTO `teacher` (`id`, `cf`, `username`, `email`, `password`, `name`, `surname`, `gender`, `birth_date`, `address`, `google`, `first_access`) VALUES
(1, NULL, 'alessandro.anderle', 'anderle@istitutodecarneri.it', '0x64393732393834333134396564323564663164313639353063373064643132316234616163396339396162643137316564336533333363666637653633626565', 'Alessandro', 'Anderle', NULL, NULL, NULL, 0, 0),
(2, NULL, 'italo.arcidiacono', 'arcidiacono@istitutodecarneri.it', '0x61353361663865376237326663613731323432336135306233663065623663343234343133306433623931393731346661623837376432336231363066663238', 'Italo Lucio', 'Arcidiacono', NULL, NULL, NULL, 0, 0),
(3, NULL, 'guillermo.austin', 'austin@istitutodecarneri.it', '0x64376338373332383861396430373262376536353963343165386336313931373736363663383938376132333161643937316533633366363734373066376238', 'Guillermo Jorge', 'Austin', NULL, NULL, NULL, 0, 0),
(4, NULL, 'erika.bella', 'bella@istitutodecarneri.it', '0x36636439343862313561653532343061663133383730363033643935336565346432613036323930663062333266396462646338653066383134653330623133', 'Erika', 'Bella', NULL, NULL, NULL, 0, 0),
(5, NULL, 'stefania.bozzolan', 'bozzolan@istitutodecarneri.it', '0x31663530346538313336313730383161656462363261303131376231356337393733333462636432613137303264383461393231666236653463303033303635', 'Stefania', 'Bozzolan', NULL, NULL, NULL, 0, 0),
(6, NULL, 'lino.capozza', 'capozza@istitutodecarneri.it', '0x30643438396131366634383532653166356434356539636331636236343135623931626237386564343436633465333937643135613139353636656534316530', 'Lino', 'Capozza', NULL, NULL, NULL, 0, 0),
(7, NULL, 'dennis.dapra', 'dapra@istitutodecarneri.it', '0x36316366376238363135633835386435343730623239353830653966353065636539663135356464663432333563306638663632306631616238303863313166', 'Dennis', 'Daprà', NULL, NULL, NULL, 0, 0),
(8, NULL, 'edo.grassi', 'grassi@istitutodecarneri.it', '0x39356462383431656463633964386164336261396538363536393531353362323837393431303935313932633134363663343439373031613535633561623132', 'Edo', 'Grassi', NULL, NULL, NULL, 0, 0),
(9, NULL, 'mario.grasso', 'grasso@istitutodecarneri.it', '0x31373839623664646361326331643565646162613561623539336630666234343530373137393062653939316666613533666432643333393735376164623535', 'Mario', 'Grasso', NULL, NULL, NULL, 0, 0),
(10, NULL, 'manuela.grott', 'grott@istitutodecarneri.it', '0x66656439373137363033336230376464333264363166313564323163336562356666333937663431653136633636313730363564636564336265353930653134', 'Manuela', 'Grott', NULL, NULL, NULL, 0, 0),
(11, NULL, 'giuseppe.lucarelli', 'lucarelli@istitutodecarneri.it', '0x63653633323234376162653234393737666166636662303834366436646262353433393034356566646238376663303732353835333161633432363134353430', 'Giuseppe', 'Lucarelli', NULL, NULL, NULL, 0, 0),
(12, NULL, 'mila.magnani', 'magnani@istitutodecarneri.it', '0x62626235373438656466363931386238346336366637333539313436353364303032636333323163636536303632343436613635663262376635346664653535', 'Mila', 'Magnani', NULL, NULL, NULL, 0, 0),
(13, NULL, 'rita.nagy', 'nagy@istitutodecarneri.it', '0x36323035333839303536383930653830333563383833323839303137323166623561383132656464643038663762623061656463353835366437626562376237', 'Rita', 'Nagy', NULL, NULL, NULL, 0, 0),
(14, NULL, 'michela.oss', 'oss@istitutodecarneri.it', '0x36643262663562366332653361643864633731326630323337653763353564363738356538623563643061646138323830373938626136373738666636376236', 'Michela', 'Oss', NULL, NULL, NULL, 0, 0),
(15, NULL, 'manuela.pruner', 'pruner@istitutodecarneri.it', '0x64323765343835613430363634643936336134626138363261616334356166383432326137663063633866316665343939333732356339333635393237346361', 'Manuela', 'Pruner', NULL, NULL, NULL, 0, 0),
(16, NULL, 'roberta.ravelli', 'ravelli@istitutodecarneri.it', '0x61633234613333636236646339313337333364306135356665313062353930363135343566363336633666636235626430363037343865326239343237663262', 'Roberta', 'Ravelli', NULL, NULL, NULL, 0, 0),
(17, NULL, 'luca.riccadonna', 'riccadonna@istitutodecarneri.it', '0x62323632616263316264393131356333376564396337633462376338393332353766656463643562333134616237643835363762643434636230313266613536', 'Luca', 'Riccadonna', NULL, NULL, NULL, 0, 0),
(18, NULL, 'giorgia.salomon', 'salomon@istitutodecarneri.it', '0x63666432613266353163326365393832306334313935356137636230663663376266336237643034343430356139633634383230333932643236343864366339', 'Giorgia', 'Salomon', NULL, NULL, NULL, 0, 0),
(19, NULL, 'giovanni.scalfi', 'scalfi@istitutodecarneri.it', '0x63376633346664623466323666373134303235343765373164373034326164613038353838633865646432386662653564653134343132343630393132386239', 'Giovanni', 'Scalfi', NULL, NULL, NULL, 0, 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT per la tabella `personal_growth_area`
--
ALTER TABLE `personal_growth_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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