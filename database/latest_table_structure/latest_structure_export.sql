PGDMP                     	    u            db7gah347b7r9s    9.6.4    9.6.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           1262    9211549    db7gah347b7r9s    DATABASE     �   CREATE DATABASE "db7gah347b7r9s" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
     DROP DATABASE "db7gah347b7r9s";
             bccoxbtohkbpnf    false                        2615    10100036    public    SCHEMA        CREATE SCHEMA "public";
    DROP SCHEMA "public";
             bccoxbtohkbpnf    false                        3079    13277    plpgsql 	   EXTENSION     C   CREATE EXTENSION IF NOT EXISTS "plpgsql" WITH SCHEMA "pg_catalog";
    DROP EXTENSION "plpgsql";
                  false            �           0    0    EXTENSION "plpgsql"    COMMENT     B   COMMENT ON EXTENSION "plpgsql" IS 'PL/pgSQL procedural language';
                       false    1            �            1259    10302558    desktops    TABLE       CREATE TABLE "desktops" (
    "specfication_key" integer,
    "width" numeric(6,2),
    "height" numeric(6,2),
    "depth" numeric(6,2),
    "weight" character varying(255),
    "processor" character varying(255),
    "ram" character varying(255),
    "cpu_core" smallint,
    "hard_drive_size" character varying(255),
    "brand" character varying(255),
    "price" numeric(6,2)
);
     DROP TABLE "public"."desktops";
       public         bccoxbtohkbpnf    false    3            �            1259    10302549    items    TABLE     d   CREATE TABLE "items" (
    "model_number" character varying(255),
    "specification_id" integer
);
    DROP TABLE "public"."items";
       public         bccoxbtohkbpnf    false    3            �            1259    10302734    laptops    TABLE     �  CREATE TABLE "laptops" (
    "screen_size" numeric(4,2),
    "weight" character varying(255),
    "processor" character varying(255),
    "ram" character varying(255),
    "cpu_core" smallint,
    "hard_drive_size" character varying(255),
    "battery" character varying(255),
    "brand" character varying(255),
    "operating_system" character varying(255),
    "price" numeric(6,2),
    "specification_key" integer
);
    DROP TABLE "public"."laptops";
       public         bccoxbtohkbpnf    false    3            �            1259    10302727    monitors    TABLE     �   CREATE TABLE "monitors" (
    "specification_key" integer,
    "screen_size" numeric(4,2),
    "weight" character varying(255),
    "brand" character varying(255),
    "price" numeric(6,2)
);
     DROP TABLE "public"."monitors";
       public         bccoxbtohkbpnf    false    3            �            1259    10302988    tablets    TABLE       CREATE TABLE "tablets" (
    "screen_size" numeric(4,2),
    "width" numeric(6,2),
    "height" numeric(6,2),
    "weight" character varying(255),
    "processor" character varying(255),
    "ram" character varying(255),
    "cpu_core" smallint,
    "hard_drive_size" character varying(255),
    "battery" character varying(255),
    "brand" character varying(255),
    "operating_system" character varying(255),
    "camera" character varying(255),
    "price" numeric(6,2),
    "depth" numeric(6,2),
    "specification_key" integer
);
    DROP TABLE "public"."tablets";
       public         bccoxbtohkbpnf    false    3            �          0    10302558    desktops 
   TABLE DATA               �   COPY "desktops" ("specfication_key", "width", "height", "depth", "weight", "processor", "ram", "cpu_core", "hard_drive_size", "brand", "price") FROM stdin;
    public       bccoxbtohkbpnf    false    186            �          0    10302549    items 
   TABLE DATA               >   COPY "items" ("model_number", "specification_id") FROM stdin;
    public       bccoxbtohkbpnf    false    185            �          0    10302734    laptops 
   TABLE DATA               �   COPY "laptops" ("screen_size", "weight", "processor", "ram", "cpu_core", "hard_drive_size", "battery", "brand", "operating_system", "price", "specification_key") FROM stdin;
    public       bccoxbtohkbpnf    false    188            �          0    10302727    monitors 
   TABLE DATA               ]   COPY "monitors" ("specification_key", "screen_size", "weight", "brand", "price") FROM stdin;
    public       bccoxbtohkbpnf    false    187            �          0    10302988    tablets 
   TABLE DATA               �   COPY "tablets" ("screen_size", "width", "height", "weight", "processor", "ram", "cpu_core", "hard_drive_size", "battery", "brand", "operating_system", "camera", "price", "depth", "specification_key") FROM stdin;
    public       bccoxbtohkbpnf    false    189            ^           2606    10302564 &   desktops desktops_specfication_key_key 
   CONSTRAINT     l   ALTER TABLE ONLY "desktops"
    ADD CONSTRAINT "desktops_specfication_key_key" UNIQUE ("specfication_key");
 V   ALTER TABLE ONLY "public"."desktops" DROP CONSTRAINT "desktops_specfication_key_key";
       public         bccoxbtohkbpnf    false    186    186            \           2606    10302553    items items_model_number_key 
   CONSTRAINT     ^   ALTER TABLE ONLY "items"
    ADD CONSTRAINT "items_model_number_key" UNIQUE ("model_number");
 L   ALTER TABLE ONLY "public"."items" DROP CONSTRAINT "items_model_number_key";
       public         bccoxbtohkbpnf    false    185    185            b           2606    10303004 %   laptops laptops_specification_key_key 
   CONSTRAINT     l   ALTER TABLE ONLY "laptops"
    ADD CONSTRAINT "laptops_specification_key_key" UNIQUE ("specification_key");
 U   ALTER TABLE ONLY "public"."laptops" DROP CONSTRAINT "laptops_specification_key_key";
       public         bccoxbtohkbpnf    false    188    188            `           2606    10303001 '   monitors monitors_specification_key_key 
   CONSTRAINT     n   ALTER TABLE ONLY "monitors"
    ADD CONSTRAINT "monitors_specification_key_key" UNIQUE ("specification_key");
 W   ALTER TABLE ONLY "public"."monitors" DROP CONSTRAINT "monitors_specification_key_key";
       public         bccoxbtohkbpnf    false    187    187            d           2606    10303006 %   tablets tablets_specification_key_key 
   CONSTRAINT     l   ALTER TABLE ONLY "tablets"
    ADD CONSTRAINT "tablets_specification_key_key" UNIQUE ("specification_key");
 U   ALTER TABLE ONLY "public"."tablets" DROP CONSTRAINT "tablets_specification_key_key";
       public         bccoxbtohkbpnf    false    189    189            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     