--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-07 18:29:23

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

DROP DATABASE "COOP";
--
-- TOC entry 3326 (class 1262 OID 16565)
-- Name: COOP; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "COOP" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';


ALTER DATABASE "COOP" OWNER TO postgres;

\connect "COOP"

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

--
-- TOC entry 3320 (class 0 OID 16568)
-- Dependencies: 216
-- Data for Name: tareas; Type: TABLE DATA; Schema: coop; Owner: postgres
--

INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (5, 'tarea 1', '2023-06-16 19:59:55.612-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (6, 'Tarea 2', '2023-07-03 15:50:40.815919-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (7, 'Tarea 3', '2023-07-03 15:56:14.437275-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (8, 'Tarea 4', '2023-07-03 15:56:34.59786-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (9, 'Tarea 5', '2023-07-03 16:02:10.922427-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (10, 'Tarea 6', '2023-07-03 16:10:27.708274-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (11, 'Tarea 7', '2023-07-03 16:11:08.905386-04', true);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (12, 'Tarea 8', '2023-07-03 16:37:59.435507-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (13, 'Tarea 9', '2023-07-03 17:24:00.734501-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (14, 'Tarea 10', '2023-07-03 17:59:57.3678-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (15, 'Tarea 11', '2023-07-04 16:22:07.191435-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (16, 'Tarea 12', '2023-07-04 16:22:48.255154-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (17, 'Tarea 13', '2023-07-04 16:26:35.32684-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (18, 'Tarea 14', '2023-07-04 16:28:29.177206-04', true);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (19, 'Tarea 15', '2023-07-04 16:29:36.21639-04', false);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (20, 'Tarea 16', '2023-07-05 17:47:28.350791-04', true);
INSERT INTO coop.tareas (id, descripcion, fecha_creacion, vigente) OVERRIDING SYSTEM VALUE VALUES (22, 'test21', '2023-07-07 16:28:47.39734-04', true);


--
-- TOC entry 3327 (class 0 OID 0)
-- Dependencies: 215
-- Name: hibernate_sequences; Type: SEQUENCE SET; Schema: coop; Owner: postgres
--

SELECT pg_catalog.setval('coop.hibernate_sequences', 22, true);


-- Completed on 2023-07-07 18:29:23

--
-- PostgreSQL database dump complete
--

