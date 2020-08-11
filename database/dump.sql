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
ALTER TABLE public.todo ALTER COLUMN "todoId" DROP DEFAULT;
ALTER TABLE public.reminder ALTER COLUMN "petId" DROP DEFAULT;
ALTER TABLE public.pets ALTER COLUMN "petId" DROP DEFAULT;
DROP SEQUENCE public."vetVisits_vetVisitId_seq";
DROP TABLE public."vetVisits";
DROP SEQUENCE public."todo_todoId_seq";
DROP TABLE public.todo;
DROP SEQUENCE public."reminder_petId_seq";
DROP TABLE public.reminder;
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
-- Name: reminder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reminder (
    "petId" integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    description text NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    repeat text NOT NULL
);


--
-- Name: reminder_petId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."reminder_petId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reminder_petId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."reminder_petId_seq" OWNED BY public.reminder."petId";


--
-- Name: todo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.todo (
    "todoId" integer NOT NULL,
    "userId" integer NOT NULL,
    todo text NOT NULL,
    "isCompleted" boolean NOT NULL
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
-- Name: reminder petId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reminder ALTER COLUMN "petId" SET DEFAULT nextval('public."reminder_petId_seq"'::regclass);


--
-- Name: todo todoId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todo ALTER COLUMN "todoId" SET DEFAULT nextval('public."todo_todoId_seq"'::regclass);


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
<<<<<<< HEAD
34	1	Max	/images/petImage/max.jpg	Pomeranian	2020-07-29	very friendly	\N	\N	\N	\N	\N
35	1	Daisy	/images/petImage/daisy.jpg	Pomeranian	2018-01-30	snores	\N	\N	\N	\N	\N
36	1	Dragon	/images/petImage/dragon.jpg	lizard	2020-08-06	very friendly	\N	\N	\N	\N	\N
=======
1	1	Buddy	/images/buddy.jpg	Pug	2016-01-04	very friendly, enjoys head pats, snores	A+	Bees	Nexxguard	Bordatella Distemper Hepatitis Rabies	Gluten Free
2	1	CK	/images/ck.jpg	Bombay	2018-11-20	picky eater, loves to cuddle, eats shoelaces	B-	N/A	N/A	FVRCP FELV FIP Rabies	Outdoor Forumla
3	1	Twix	/images/twix.png	Maltese Poodle Mix	2015-09-01	loves friends and people	A+	Bees	Nexxguard	Bordatella Distemper Hepatitis Rabies	\N
15	1	Max	/images/petImage/max.jpg	Golden Retriever	2020-07-29	not potty trained yet	\N	\N	\N	\N	\N
16	1	Daisy	/images/petImage/daisy.jpg	Pomeranian	2014-01-28	snores	\N	\N	\N	\N	\N
17	1	max4	/images/petImage/max.jpg	Golden Retriever	2018-07-27	scared of people	\N	\N	\N	\N	\N
>>>>>>> 03f23301bd2fab8ff1b778fbf29e849197595ebb
\.


--
-- Data for Name: reminder; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reminder ("petId", name, type, description, date, "time", repeat) FROM stdin;
2	CK	Hygiene	Change litter box	2020-08-12	12:00:00	Tuesdays.
3	Twix	Feeding	Feed three scoops of kibble & one scoop of chicken	2020-08-15	08:00:00	Daily.
1	Buddy	Medication	1 tablet of Prednisone for allergies	2020-08-07	18:00:00	Daily.
\.


--
-- Data for Name: todo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.todo ("todoId", "userId", todo, "isCompleted") FROM stdin;
1	1	Give medicine	f
2	1	Chane litter box	f
3	1	Fresh water for Daisy	t
\.


--
-- Data for Name: vetVisits; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."vetVisits" ("vetVisitId", "petId", date, reason, notes) FROM stdin;
1	1	2019-10-10	Buddy ate a shoelace, the vet says to schedule another appointment in three days if he doesn't pass it. Urgh! So gross! True story!	Keep shoelaces and ribbons off the floor.
2	2	2020-05-04	Had to bring CK in for stitches after getting into a fight with the neighborhood cats.	My boy won.
3	3	2019-10-10	Twix had an ear infection.	Apply ointment and air out.
\.


--
-- Name: pets_petId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."pets_petId_seq"', 36, true);


--
-- Name: reminder_petId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."reminder_petId_seq"', 1, false);


--
-- Name: todo_todoId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."todo_todoId_seq"', 1, false);


--
-- Name: vetVisits_vetVisitId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."vetVisits_vetVisitId_seq"', 1, false);


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
    ADD CONSTRAINT reminder_pkey PRIMARY KEY ("petId");


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

