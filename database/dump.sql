--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."vetVisits" DROP CONSTRAINT "vetVisits_pkey";
ALTER TABLE ONLY public.todo DROP CONSTRAINT todo_pkey;
ALTER TABLE ONLY public.reminder DROP CONSTRAINT reminder_pkey;
ALTER TABLE ONLY public.pets DROP CONSTRAINT pets_pkey;
ALTER TABLE ONLY public."petProfile" DROP CONSTRAINT "petProfile_pkey";
ALTER TABLE public."vetVisits" ALTER COLUMN "vetVisitId" DROP DEFAULT;
ALTER TABLE public.todo ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.todo ALTER COLUMN "todoId" DROP DEFAULT;
ALTER TABLE public.reminder ALTER COLUMN "reminderId" DROP DEFAULT;
ALTER TABLE public.pets ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.pets ALTER COLUMN "petId" DROP DEFAULT;
DROP SEQUENCE public."vetVisits_vetVisitId_seq";
DROP TABLE public."vetVisits";
DROP SEQUENCE public."todo_userId_seq";
DROP SEQUENCE public."todo_todoId_seq";
DROP TABLE public.todo;
DROP SEQUENCE public."reminder_reminderId_seq";
DROP TABLE public.reminder;
DROP SEQUENCE public."pets_userId_seq";
DROP SEQUENCE public."pets_petId_seq";
DROP TABLE public.pets;
DROP TABLE public."petProfile";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: petProfile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."petProfile" (
    "petId" integer NOT NULL,
    "userId" integer NOT NULL,
    name text NOT NULL,
    "imgUrl" text NOT NULL,
    breed text NOT NULL,
    "dateOfBirth" date NOT NULL,
    description text NOT NULL,
    "bloodType" text NOT NULL,
    allergies text,
    medication text,
    vaccines text NOT NULL,
    "specializedDiet" text,
    "lastVetVisit" text NOT NULL
);


--
-- Name: pets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pets (
    "petId" integer NOT NULL,
    "userId" integer NOT NULL,
    name text NOT NULL,
    "imgUrl" text NOT NULL,
    breed text NOT NULL,
    "dateOfBirth" date NOT NULL,
    description text NOT NULL,
    "bloodType" text,
    allergies text,
    medication text,
    vaccines text,
    "specializedDiet" text
);


--
-- Name: pets_petId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."pets_petId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pets_petId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."pets_petId_seq" OWNED BY public.pets."petId";


--
-- Name: pets_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."pets_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pets_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."pets_userId_seq" OWNED BY public.pets."userId";


--
-- Name: reminder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reminder (
    "reminderId" integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    description text NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    repeat text NOT NULL
);


--
-- Name: reminder_reminderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."reminder_reminderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reminder_reminderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."reminder_reminderId_seq" OWNED BY public.reminder."reminderId";


--
-- Name: todo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.todo (
    "todoId" integer NOT NULL,
    "userId" integer NOT NULL,
    todo text NOT NULL,
    "isCompleted" boolean
);


--
-- Name: todo_todoId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."todo_todoId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: todo_todoId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."todo_todoId_seq" OWNED BY public.todo."todoId";


--
-- Name: todo_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."todo_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: todo_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."todo_userId_seq" OWNED BY public.todo."userId";


--
-- Name: vetVisits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."vetVisits" (
    "vetVisitId" integer NOT NULL,
    "petId" integer NOT NULL,
    date date NOT NULL,
    reason text NOT NULL,
    notes text
);


--
-- Name: vetVisits_vetVisitId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."vetVisits_vetVisitId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vetVisits_vetVisitId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."vetVisits_vetVisitId_seq" OWNED BY public."vetVisits"."vetVisitId";


--
-- Name: pets petId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets ALTER COLUMN "petId" SET DEFAULT nextval('public."pets_petId_seq"'::regclass);


--
-- Name: pets userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets ALTER COLUMN "userId" SET DEFAULT nextval('public."pets_userId_seq"'::regclass);


--
-- Name: reminder reminderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reminder ALTER COLUMN "reminderId" SET DEFAULT nextval('public."reminder_reminderId_seq"'::regclass);


--
-- Name: todo todoId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todo ALTER COLUMN "todoId" SET DEFAULT nextval('public."todo_todoId_seq"'::regclass);


--
-- Name: todo userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todo ALTER COLUMN "userId" SET DEFAULT nextval('public."todo_userId_seq"'::regclass);


--
-- Name: vetVisits vetVisitId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."vetVisits" ALTER COLUMN "vetVisitId" SET DEFAULT nextval('public."vetVisits_vetVisitId_seq"'::regclass);


--
-- Data for Name: petProfile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."petProfile" ("petId", "userId", name, "imgUrl", breed, "dateOfBirth", description, "bloodType", allergies, medication, vaccines, "specializedDiet", "lastVetVisit") FROM stdin;
1	1	Buddy	/images/buddy.jpg	Pug	2016-01-04	very friendly, enjoys head pats, snores	A+	Bees	Nexxguard	Bordatella Distemper Hepatitis Rabies	 Gluten Free	10/10/19
2	1	CK	/images/ck.jpg	Bombay	2018-11-20	picky eater, loves to cuddle, eats shoelaces	B-	N/A	N/A	FVRCP FELV FIP Rabies	Outdoor Forumla	05/04/20
3	1	Twix	/images/twix.png	Maltese Poodle Mix	2015-09-01	loves friends and people	A+	Bees	Nexxguard	Bordatella Distemper Hepatitis Rabies	N/A	10/10/19
\.


--
-- Data for Name: pets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pets ("petId", "userId", name, "imgUrl", breed, "dateOfBirth", description, "bloodType", allergies, medication, vaccines, "specializedDiet") FROM stdin;
\.


--
-- Data for Name: reminder; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reminder ("reminderId", name, type, description, date, "time", repeat) FROM stdin;
1	 Buddy	Medication	1 tablet of Prednisone for allergies	2020-08-07	18:00:00	Daily
2	 CK	Hygiene	Change litter box	2020-08-12	12:00:00	Tuesdays
3	 Twix	Feeding	Feed three scoops of kibble & one scoop of chicken	2020-08-15	08:00:00	Daily
\.


--
-- Data for Name: todo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.todo ("todoId", "userId", todo, "isCompleted") FROM stdin;
6	1	change pee pad	\N
7	1	fill water	\N
\.


--
-- Data for Name: vetVisits; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."vetVisits" ("vetVisitId", "petId", date, reason, notes) FROM stdin;
\.


--
-- Name: pets_petId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--


SELECT pg_catalog.setval('public."pets_petId_seq"', 61, true);



--
-- Name: pets_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."pets_userId_seq"', 1, false);


--
-- Name: reminder_reminderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."reminder_reminderId_seq"', 1, false);


--
-- Name: todo_todoId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."todo_todoId_seq"', 7, true);


--
-- Name: todo_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."todo_userId_seq"', 1, false);


--
-- Name: vetVisits_vetVisitId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."vetVisits_vetVisitId_seq"', 33, true);


--
-- Name: petProfile petProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."petProfile"
    ADD CONSTRAINT "petProfile_pkey" PRIMARY KEY ("petId");


--
-- Name: pets pets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pets_pkey PRIMARY KEY ("petId");


--
-- Name: reminder reminder_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reminder
    ADD CONSTRAINT reminder_pkey PRIMARY KEY ("reminderId");


--
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY ("todoId");


--
-- Name: vetVisits vetVisits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."vetVisits"
    ADD CONSTRAINT "vetVisits_pkey" PRIMARY KEY ("vetVisitId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

