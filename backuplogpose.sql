PGDMP                           {            logpose    15.2    15.2 ?    b           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            c           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            d           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            e           1262    16758    logpose    DATABASE     �   CREATE DATABASE logpose WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE logpose;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            f           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    16780    articles    TABLE     E  CREATE TABLE public.articles (
    id integer NOT NULL,
    picture character varying(255),
    title character varying(255),
    content text,
    "createdBy" integer,
    "categoryId" integer,
    "statusId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.articles;
       public         heap    postgres    false    4            �            1259    16779    articles_id_seq    SEQUENCE     �   ALTER TABLE public.articles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.articles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219    4            �            1259    16789 
   categories    TABLE     �   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255),
    picture character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.categories;
       public         heap    postgres    false    4            �            1259    16788    categories_id_seq    SEQUENCE     �   ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    221            �            1259    16877    comments    TABLE       CREATE TABLE public.comments (
    id integer NOT NULL,
    name character varying(255),
    "userId" integer,
    "articleId" integer,
    content character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updateAt" timestamp without time zone
);
    DROP TABLE public.comments;
       public         heap    postgres    false    4            �            1259    16876    comments_id_seq    SEQUENCE     �   ALTER TABLE public.comments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231    4            �            1259    16888    forgotRequest    TABLE     �   CREATE TABLE public."forgotRequest" (
    id integer NOT NULL,
    email character varying(255),
    code character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updateAt" timestamp without time zone
);
 #   DROP TABLE public."forgotRequest";
       public         heap    postgres    false    4            �            1259    16887    forgotRequest_id_seq    SEQUENCE     �   ALTER TABLE public."forgotRequest" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."forgotRequest_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    233    4            �            1259    16805    likes    TABLE     �   CREATE TABLE public.likes (
    id integer NOT NULL,
    "articleId" integer,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.likes;
       public         heap    postgres    false    4            �            1259    16804    likes_id_seq    SEQUENCE     �   ALTER TABLE public.likes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.likes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225    4            �            1259    16771    profiles    TABLE     �  CREATE TABLE public.profiles (
    id integer NOT NULL,
    "userId" integer,
    picture character varying(255),
    "fullName" character varying(255),
    "phoneNumber" character varying(255),
    job character varying(255),
    about character varying(255),
    username character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.profiles;
       public         heap    postgres    false    4            �            1259    16770    profiles_id_seq    SEQUENCE     �   ALTER TABLE public.profiles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217    4            �            1259    16868    requestArticle    TABLE     _  CREATE TABLE public."requestArticle" (
    id integer NOT NULL,
    "articleId" integer,
    "userId" integer NOT NULL,
    message character varying(255) NOT NULL,
    "typeRequest" character varying(255),
    "statusRequest" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 $   DROP TABLE public."requestArticle";
       public         heap    postgres    false    4            �            1259    16867    requestArticle_id_seq    SEQUENCE     �   ALTER TABLE public."requestArticle" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."requestArticle_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    229            �            1259    16812    role    TABLE     #  CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    code character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.role;
       public         heap    postgres    false    4            �            1259    16811    role_id_seq    SEQUENCE     �   ALTER TABLE public.role ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    227    4            �            1259    16798    statusArticle    TABLE     �   CREATE TABLE public."statusArticle" (
    id integer NOT NULL,
    status character varying(10),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
 #   DROP TABLE public."statusArticle";
       public         heap    postgres    false    4            �            1259    16797    statusArticle_id_seq    SEQUENCE     �   ALTER TABLE public."statusArticle" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."statusArticle_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    223            �            1259    16897    tags    TABLE     �   CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.tags;
       public         heap    postgres    false    4            �            1259    16896    tags_id_seq    SEQUENCE     �   ALTER TABLE public.tags ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    235    4            �            1259    16760    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "roleId" integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    16759    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    4    215            O          0    16780    articles 
   TABLE DATA           �   COPY public.articles (id, picture, title, content, "createdBy", "categoryId", "statusId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    219   �I       Q          0    16789 
   categories 
   TABLE DATA           Q   COPY public.categories (id, name, picture, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   �I       [          0    16877    comments 
   TABLE DATA           e   COPY public.comments (id, name, "userId", "articleId", content, "createdAt", "updateAt") FROM stdin;
    public          postgres    false    231   J       ]          0    16888    forgotRequest 
   TABLE DATA           S   COPY public."forgotRequest" (id, email, code, "createdAt", "updateAt") FROM stdin;
    public          postgres    false    233   1J       U          0    16805    likes 
   TABLE DATA           T   COPY public.likes (id, "articleId", "userId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    225   NJ       M          0    16771    profiles 
   TABLE DATA           �   COPY public.profiles (id, "userId", picture, "fullName", "phoneNumber", job, about, username, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   kJ       Y          0    16868    requestArticle 
   TABLE DATA           �   COPY public."requestArticle" (id, "articleId", "userId", message, "typeRequest", "statusRequest", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    229   �J       W          0    16812    role 
   TABLE DATA           U   COPY public.role (id, name, code, description, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    227   �J       S          0    16798    statusArticle 
   TABLE DATA           O   COPY public."statusArticle" (id, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    223   eK       _          0    16897    tags 
   TABLE DATA           B   COPY public.tags (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    235   �K       K          0    16760    users 
   TABLE DATA           X   COPY public.users (id, email, password, "roleId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   �K       g           0    0    articles_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.articles_id_seq', 1, false);
          public          postgres    false    218            h           0    0    categories_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.categories_id_seq', 1, false);
          public          postgres    false    220            i           0    0    comments_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.comments_id_seq', 1, false);
          public          postgres    false    230            j           0    0    forgotRequest_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."forgotRequest_id_seq"', 1, false);
          public          postgres    false    232            k           0    0    likes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.likes_id_seq', 1, false);
          public          postgres    false    224            l           0    0    profiles_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.profiles_id_seq', 1, false);
          public          postgres    false    216            m           0    0    requestArticle_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."requestArticle_id_seq"', 1, false);
          public          postgres    false    228            n           0    0    role_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.role_id_seq', 3, true);
          public          postgres    false    226            o           0    0    statusArticle_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."statusArticle_id_seq"', 3, true);
          public          postgres    false    222            p           0    0    tags_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tags_id_seq', 1, false);
          public          postgres    false    234            q           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    214            �           2606    16787    articles articles_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.articles DROP CONSTRAINT articles_pkey;
       public            postgres    false    219            �           2606    16796    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    221            �           2606    16886    comments comments_content_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_content_key UNIQUE (content);
 G   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_content_key;
       public            postgres    false    231            �           2606    16884    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    231            �           2606    16895     forgotRequest forgotRequest_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."forgotRequest"
    ADD CONSTRAINT "forgotRequest_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."forgotRequest" DROP CONSTRAINT "forgotRequest_pkey";
       public            postgres    false    233            �           2606    16810    likes likes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_pkey;
       public            postgres    false    225            �           2606    16778    profiles profiles_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.profiles DROP CONSTRAINT profiles_pkey;
       public            postgres    false    217            �           2606    16875 "   requestArticle requestArticle_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."requestArticle"
    ADD CONSTRAINT "requestArticle_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."requestArticle" DROP CONSTRAINT "requestArticle_pkey";
       public            postgres    false    229            �           2606    16819    role role_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public            postgres    false    227            �           2606    16803     statusArticle statusArticle_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."statusArticle"
    ADD CONSTRAINT "statusArticle_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."statusArticle" DROP CONSTRAINT "statusArticle_pkey";
       public            postgres    false    223            �           2606    16902    tags tags_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
       public            postgres    false    235            �           2606    16769    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215            �           2606    16767    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            O      x������ � �      Q      x������ � �      [      x������ � �      ]      x������ � �      U      x������ � �      M      x������ � �      Y      x������ � �      W   �   x�e�1�0�9�� ������X!�iR%a��T����e}�/E��L�n|�N�-��4G��쀵61[w�i	F`�*//9V �U�bS�$�I�E��������"8�Y��Z�
�ֲi6J�>�9�"��yg߻���!�Z;F�������F-�BJ���PdY���R�      S   G   x�3�,H�K��K�4202�50�52S00�2��21�36��0���2�,�/.IM��ʘ�(5+5���=... �6      _      x������ � �      K      x������ � �     