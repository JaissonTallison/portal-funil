--
-- PostgreSQL database dump
--

\restrict hFmpevtMn9261nZDBTkGt9vpcHYzOXASsrH13VeF0PrRs9N9G53wc6QHmc5ibam

-- Dumped from database version 16.14
-- Dumped by pg_dump version 16.14

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

DROP DATABASE IF EXISTS portalfunil;
--
-- Name: portalfunil; Type: DATABASE; Schema: -; Owner: portalfunil
--

CREATE DATABASE portalfunil WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE portalfunil OWNER TO portalfunil;

\unrestrict hFmpevtMn9261nZDBTkGt9vpcHYzOXASsrH13VeF0PrRs9N9G53wc6QHmc5ibam
\connect portalfunil
\restrict hFmpevtMn9261nZDBTkGt9vpcHYzOXASsrH13VeF0PrRs9N9G53wc6QHmc5ibam

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
-- Name: ArticleStatus; Type: TYPE; Schema: public; Owner: portalfunil
--

CREATE TYPE public."ArticleStatus" AS ENUM (
    'DRAFT',
    'REVIEW',
    'PUBLISHED',
    'ARCHIVED'
);


ALTER TYPE public."ArticleStatus" OWNER TO portalfunil;

--
-- Name: ListingStatus; Type: TYPE; Schema: public; Owner: portalfunil
--

CREATE TYPE public."ListingStatus" AS ENUM (
    'PENDING',
    'ACTIVE',
    'REFUSED',
    'EXPIRED',
    'PAUSED'
);


ALTER TYPE public."ListingStatus" OWNER TO portalfunil;

--
-- Name: ListingType; Type: TYPE; Schema: public; Owner: portalfunil
--

CREATE TYPE public."ListingType" AS ENUM (
    'SALE',
    'PURCHASE',
    'SERVICE',
    'JOB',
    'OTHER'
);


ALTER TYPE public."ListingType" OWNER TO portalfunil;

--
-- Name: ReportStatus; Type: TYPE; Schema: public; Owner: portalfunil
--

CREATE TYPE public."ReportStatus" AS ENUM (
    'RECEIVED',
    'REVIEW',
    'PUBLISHED',
    'RESOLVED',
    'UNDER_REVIEW',
    'VERIFIED',
    'CLOSED',
    'REJECTED'
);


ALTER TYPE public."ReportStatus" OWNER TO portalfunil;

--
-- Name: ReportType; Type: TYPE; Schema: public; Owner: portalfunil
--

CREATE TYPE public."ReportType" AS ENUM (
    'POLICIAL',
    'URBANO',
    'PAUTA',
    'MIDIA',
    'ANONIMA'
);


ALTER TYPE public."ReportType" OWNER TO portalfunil;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: portalfunil
--

CREATE TYPE public."Role" AS ENUM (
    'READER',
    'JOURNALIST',
    'EDITOR',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO portalfunil;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO portalfunil;

--
-- Name: articles; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public.articles (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    content text NOT NULL,
    image text NOT NULL,
    status public."ArticleStatus" DEFAULT 'DRAFT'::public."ArticleStatus" NOT NULL,
    published_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    read_time integer DEFAULT 3 NOT NULL,
    is_live boolean DEFAULT false NOT NULL,
    is_featured boolean DEFAULT false NOT NULL,
    is_sponsored boolean DEFAULT false NOT NULL,
    sponsor text,
    author_id text NOT NULL,
    category_id text NOT NULL
);


ALTER TABLE public.articles OWNER TO portalfunil;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public.audit_logs (
    id text NOT NULL,
    user_id text,
    user_email text NOT NULL,
    action text NOT NULL,
    entity text NOT NULL,
    entity_id text,
    details jsonb,
    ip text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO portalfunil;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public.categories (
    id text NOT NULL,
    slug text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.categories OWNER TO portalfunil;

--
-- Name: events; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public.events (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    start_date timestamp(3) without time zone NOT NULL,
    end_date timestamp(3) without time zone,
    "time" text,
    venue text NOT NULL,
    neighborhood text,
    address text,
    price text,
    is_free boolean DEFAULT false NOT NULL,
    image text NOT NULL,
    age_rating text,
    organizer text,
    is_highlighted boolean DEFAULT false NOT NULL,
    is_sponsored boolean DEFAULT false NOT NULL,
    sponsor text,
    tags text[],
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.events OWNER TO portalfunil;

--
-- Name: listing_contacts; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public.listing_contacts (
    id text NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    whatsapp text,
    location text NOT NULL,
    listing_id text NOT NULL
);


ALTER TABLE public.listing_contacts OWNER TO portalfunil;

--
-- Name: listings; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public.listings (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    type public."ListingType" NOT NULL,
    price double precision,
    images text[],
    status public."ListingStatus" DEFAULT 'PENDING'::public."ListingStatus" NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    is_featured boolean DEFAULT false NOT NULL,
    expires_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE public.listings OWNER TO portalfunil;

--
-- Name: newsletters; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public.newsletters (
    id text NOT NULL,
    email text NOT NULL,
    name text,
    confirmed_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.newsletters OWNER TO portalfunil;

--
-- Name: page_views; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public.page_views (
    id text NOT NULL,
    path text NOT NULL,
    article_id text,
    session_id text NOT NULL,
    user_agent text,
    country text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.page_views OWNER TO portalfunil;

--
-- Name: report_history; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public.report_history (
    id text NOT NULL,
    report_id text NOT NULL,
    from_status public."ReportStatus" NOT NULL,
    to_status public."ReportStatus" NOT NULL,
    notes text,
    user_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.report_history OWNER TO portalfunil;

--
-- Name: reports; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public.reports (
    id text NOT NULL,
    protocol text NOT NULL,
    type public."ReportType" NOT NULL,
    name text,
    phone text,
    email text,
    location text,
    description text NOT NULL,
    status public."ReportStatus" DEFAULT 'RECEIVED'::public."ReportStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    assigned_to_id text,
    notes text
);


ALTER TABLE public.reports OWNER TO portalfunil;

--
-- Name: users; Type: TABLE; Schema: public; Owner: portalfunil
--

CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    avatar text,
    password_hash text NOT NULL,
    role public."Role" DEFAULT 'READER'::public."Role" NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO portalfunil;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
c5f3ed5e-7497-41bd-bbbc-d0c7eb370821	1f049d462c7ac68313c92f9aa0d798d401fe2da0201fcfed27afa0fc4025f724	2026-06-08 04:25:05.016097+00	20260608042504_init	\N	\N	2026-06-08 04:25:04.798433+00	1
4295b05a-2dab-4051-abff-ca1045643c65	0c9b5b281da12fef09f1652b81b0bcb9b3b4ffef8e7d49e405f368e6a762adf1	2026-06-08 15:09:17.315521+00	20260608150917_add_reports	\N	\N	2026-06-08 15:09:17.284772+00	1
76a4f3b1-dad5-4300-946b-06ff90b22726	723d4a524943f74ca4875854125ad8cd2ed3598e08b1e53e999e0231f6ddc640	2026-06-08 16:48:31.778307+00	20260608164831_v1_1_0_editorial_governance	\N	\N	2026-06-08 16:48:31.700421+00	1
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public.articles (id, slug, title, description, content, image, status, published_at, created_at, updated_at, views, read_time, is_live, is_featured, is_sponsored, sponsor, author_id, category_id) FROM stdin;
cmq4plsqm000f8qj281fgcest	chuvas-intensas-manaus-estado-atencao	Chuvas intensas colocam Manaus em estado de atenção	Defesa Civil monitora regiões críticas enquanto trânsito registra lentidão nas principais avenidas da capital.	A Defesa Civil de Manaus emitiu um alerta máximo nesta segunda-feira após chuvas intensas atingirem a capital amazonense.\n\nO sistema meteorológico que atinge Manaus é resultante de um canal de umidade que se formou sobre a Amazônia nos últimos dias. As chuvas devem persistir até o final da semana, com acumulados que podem chegar a 150 milímetros em 24 horas.\n\nAs equipes da Defesa Civil e do Corpo de Bombeiros estão em estado de prontidão, com 12 equipes distribuídas pelos principais pontos críticos da cidade.\n\nPara emergências, o número de atendimento da Defesa Civil é o 199, disponível 24 horas por dia.	https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070	PUBLISHED	2026-06-07 10:30:00	2026-06-08 04:27:02.975	2026-06-08 04:27:02.975	1240	4	t	t	f	\N	cmq4plsq2000d8qj2b0u79sap	cmq4pk06700091411z3de27ys
cmq4plsqx000h8qj2c35b95q9	zona-franca-manaus-recorde-investimentos	Zona Franca de Manaus bate recorde com R$ 2,1 bi em investimentos	Polo industrial registra o melhor primeiro trimestre em toda sua história, impulsionado por empresas de tecnologia e eletroeletrônicos.	A Zona Franca de Manaus (ZFM) registrou no primeiro trimestre de 2026 o maior volume de investimentos de sua história, atingindo R$ 2,1 bilhões.\n\nSegundo dados da Superintendência da Zona Franca de Manaus (Suframa), o crescimento foi de 34% em relação ao mesmo período de 2025.\n\nO setor de tecnologia e eletroeletrônicos liderou os investimentos, com a instalação de três novas plantas fabris e a ampliação de outras quatro unidades já existentes.\n\nO presidente da Suframa afirmou que os números demonstram a solidez do modelo Zona Franca e sua importância para o desenvolvimento sustentável da Amazônia.	https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070	PUBLISHED	2026-06-07 08:15:00	2026-06-08 04:27:02.985	2026-06-08 04:27:02.985	892	5	f	t	f	\N	cmq4plsq2000d8qj2b0u79sap	cmq4pk04x00001411y96wevr1
cmq4plsr6000j8qj21cztaqt3	transito-lento-avenida-djalma-batista	Trânsito lento na Avenida Djalma Batista após acidente	Colisão entre dois veículos causa congestionamento de 4 km na principal via da Zona Norte.	Um acidente entre dois veículos na Avenida Djalma Batista causa lentidão de aproximadamente 4 quilômetros nesta segunda-feira.\n\nO acidente ocorreu por volta das 7h30, próximo ao Shopping Manaus ViaNorte. O IMMU registrou o incidente e enviou agentes de trânsito para o local.\n\nMotoristas que trafegam pela região devem preferir vias alternativas como a Avenida Constantino Nery ou a Avenida Torquato Tapajós.\n\nA lentidão afeta principalmente o sentido Centro-Zona Norte.	https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070	PUBLISHED	2026-06-07 07:45:00	2026-06-08 04:27:02.994	2026-06-08 04:27:02.994	645	3	t	f	f	\N	cmq4plsq2000d8qj2b0u79sap	cmq4pk06200081411es1tuf1d
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public.audit_logs (id, user_id, user_email, action, entity, entity_id, details, ip, created_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public.categories (id, slug, name) FROM stdin;
cmq4pk04x00001411y96wevr1	politica	Política
cmq4pk05800011411d9qvov1k	futebol	Futebol
cmq4pk05d00021411ajlstm4a	policial	Policial
cmq4pk05h00031411krdqkk95	economia	Economia
cmq4pk05l00041411mnrlm743	tecnologia	Tecnologia
cmq4pk05p00051411qdhsa01c	saude	Saúde
cmq4pk05t00061411mke57fgo	mundo	Mundo
cmq4pk05x00071411utdu8grs	clima	Clima
cmq4pk06200081411es1tuf1d	transito	Trânsito
cmq4pk06700091411z3de27ys	alerta	Alerta
cmq4pk06c000a14113mcvowim	colunas	Colunas
cmq4pk06g000b1411rb9l4cw6	famosos	Famosos
cmq4pk06k000c14114jvixul9	curiosidades	Curiosidades
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public.events (id, slug, title, description, category, start_date, end_date, "time", venue, neighborhood, address, price, is_free, image, age_rating, organizer, is_highlighted, is_sponsored, sponsor, tags, created_at, updated_at) FROM stdin;
cmq4plsrf000k8qj2llqrna6q	festival-amazonas-2026	Festival Amazonas de Ópera 2026	A 30ª edição do maior festival de ópera da América Latina acontece no coração de Manaus, com apresentações no histórico Teatro Amazonas e espetáculos gratuitos no Largo de São Sebastião.	festival	2026-07-15 00:00:00	2026-07-30 00:00:00	20:00	Teatro Amazonas	Centro	\N	R$ 80 – R$ 300	f	https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069	Livre	Governo do Amazonas / Secretaria de Cultura	t	f	\N	{opera,cultura,teatro-amazonas,classica}	2026-06-08 04:27:03.003	2026-06-08 04:27:03.003
cmq4pm8vc000l146lr9k4tqyp	feira-artesanato-zona-franca	Feira de Artesanato da Zona Franca	A maior feira de produtos regionais e artesanato do Amazonas reúne mais de 200 expositores com produtos típicos, gastronomia regional e apresentações folclóricas.	feira	2026-06-20 00:00:00	2026-06-22 00:00:00	09:00	Centro de Convenções Vasco Vasquez	Centro	\N	\N	t	https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070	\N	SEPROR / Prefeitura de Manaus	f	f	\N	{artesanato,regional,cultura}	2026-06-08 04:27:23.88	2026-06-08 04:27:23.88
cmq4pm8vi000m146leqd4iuiv	show-boi-bumba-garantido	Apresentação Especial Boi-Bumbá Garantido	O bicampeão Boi-Bumbá Garantido apresenta espetáculo especial com os melhores momentos do festival, num evento aberto ao público no Centro de Convenções.	show	2026-06-28 00:00:00	\N	19:00	Arena da Amazônia	Flores	\N	\N	t	https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074	\N	Associação Folclórica Boi-Bumbá Garantido	f	f	\N	{boi-bumba,folclore,parintins,cultura}	2026-06-08 04:27:23.886	2026-06-08 04:27:23.886
\.


--
-- Data for Name: listing_contacts; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public.listing_contacts (id, name, phone, email, whatsapp, location, listing_id) FROM stdin;
\.


--
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public.listings (id, title, description, category, type, price, images, status, views, is_featured, expires_at, created_at, updated_at, user_id) FROM stdin;
\.


--
-- Data for Name: newsletters; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public.newsletters (id, email, name, confirmed_at, created_at) FROM stdin;
\.


--
-- Data for Name: page_views; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public.page_views (id, path, article_id, session_id, user_agent, country, created_at) FROM stdin;
\.


--
-- Data for Name: report_history; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public.report_history (id, report_id, from_status, to_status, notes, user_id, created_at) FROM stdin;
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public.reports (id, protocol, type, name, phone, email, location, description, status, created_at, updated_at, assigned_to_id, notes) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: portalfunil
--

COPY public.users (id, email, name, avatar, password_hash, role, is_active, created_at, updated_at) FROM stdin;
cmq4plsq2000d8qj2b0u79sap	admin@portalfunil.com.br	Admin Portal Funil	\N	$2b$12$.F.NI1G1deorkM39fPsZq.ZXCzfOs5407dl4J4W1WGWTRWG2RQYHq	ADMIN	t	2026-06-08 04:27:02.955	2026-06-08 04:27:02.955
cmq4q52bx0000kgnp5b30tzae	test@example.com	Test User	\N	$2b$12$XyrUb25MVP9lyQbOLh4zqepx3.faIc2GAhkrHcMP8HNFF9imSxyJm	READER	t	2026-06-08 04:42:01.869	2026-06-08 04:42:01.869
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: listing_contacts listing_contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.listing_contacts
    ADD CONSTRAINT listing_contacts_pkey PRIMARY KEY (id);


--
-- Name: listings listings_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_pkey PRIMARY KEY (id);


--
-- Name: newsletters newsletters_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.newsletters
    ADD CONSTRAINT newsletters_pkey PRIMARY KEY (id);


--
-- Name: page_views page_views_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.page_views
    ADD CONSTRAINT page_views_pkey PRIMARY KEY (id);


--
-- Name: report_history report_history_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.report_history
    ADD CONSTRAINT report_history_pkey PRIMARY KEY (id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: articles_category_id_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX articles_category_id_idx ON public.articles USING btree (category_id);


--
-- Name: articles_slug_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX articles_slug_idx ON public.articles USING btree (slug);


--
-- Name: articles_slug_key; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE UNIQUE INDEX articles_slug_key ON public.articles USING btree (slug);


--
-- Name: articles_status_published_at_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX articles_status_published_at_idx ON public.articles USING btree (status, published_at DESC);


--
-- Name: audit_logs_created_at_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX audit_logs_created_at_idx ON public.audit_logs USING btree (created_at DESC);


--
-- Name: audit_logs_entity_entity_id_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX audit_logs_entity_entity_id_idx ON public.audit_logs USING btree (entity, entity_id);


--
-- Name: audit_logs_user_id_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX audit_logs_user_id_idx ON public.audit_logs USING btree (user_id);


--
-- Name: categories_slug_key; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE UNIQUE INDEX categories_slug_key ON public.categories USING btree (slug);


--
-- Name: events_slug_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX events_slug_idx ON public.events USING btree (slug);


--
-- Name: events_slug_key; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE UNIQUE INDEX events_slug_key ON public.events USING btree (slug);


--
-- Name: events_start_date_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX events_start_date_idx ON public.events USING btree (start_date);


--
-- Name: listing_contacts_listing_id_key; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE UNIQUE INDEX listing_contacts_listing_id_key ON public.listing_contacts USING btree (listing_id);


--
-- Name: listings_category_status_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX listings_category_status_idx ON public.listings USING btree (category, status);


--
-- Name: listings_status_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX listings_status_idx ON public.listings USING btree (status);


--
-- Name: newsletters_email_key; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE UNIQUE INDEX newsletters_email_key ON public.newsletters USING btree (email);


--
-- Name: page_views_article_id_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX page_views_article_id_idx ON public.page_views USING btree (article_id);


--
-- Name: page_views_path_created_at_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX page_views_path_created_at_idx ON public.page_views USING btree (path, created_at);


--
-- Name: report_history_report_id_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX report_history_report_id_idx ON public.report_history USING btree (report_id);


--
-- Name: reports_protocol_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX reports_protocol_idx ON public.reports USING btree (protocol);


--
-- Name: reports_protocol_key; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE UNIQUE INDEX reports_protocol_key ON public.reports USING btree (protocol);


--
-- Name: reports_status_idx; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE INDEX reports_status_idx ON public.reports USING btree (status);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: portalfunil
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: articles articles_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: articles articles_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: audit_logs audit_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: listing_contacts listing_contacts_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.listing_contacts
    ADD CONSTRAINT listing_contacts_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: listings listings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.listings
    ADD CONSTRAINT listings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: report_history report_history_report_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.report_history
    ADD CONSTRAINT report_history_report_id_fkey FOREIGN KEY (report_id) REFERENCES public.reports(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reports reports_assigned_to_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: portalfunil
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_assigned_to_id_fkey FOREIGN KEY (assigned_to_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict hFmpevtMn9261nZDBTkGt9vpcHYzOXASsrH13VeF0PrRs9N9G53wc6QHmc5ibam

