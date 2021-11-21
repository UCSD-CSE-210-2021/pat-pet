-- Database export via SQLPro (https://www.sqlprostudio.com/allapps.html)
-- Exported by cosmo at 20-11-2021 16:20.
-- WARNING: This file may contain descructive statements such as DROPs.
-- Please ensure that you are running the script at the proper location.


-- BEGIN TABLE public.follow
DROP TABLE IF EXISTS public.follow CASCADE;
BEGIN;

CREATE TABLE IF NOT EXISTS public.follow (
	seq bigint DEFAULT nextval('follow_sampleid_seq'::regclass) NOT NULL,
	follower_id text NOT NULL,
	pet_id text NOT NULL,
	PRIMARY KEY(seq)
);

COMMIT;

-- Table public.follow contains no data. No inserts have been genrated.
-- Inserting 0 rows into public.follow


-- END TABLE public.follow

-- BEGIN TABLE public.pets
DROP TABLE IF EXISTS public.pets CASCADE;
BEGIN;

CREATE TABLE IF NOT EXISTS public.pets (
	id text NOT NULL,
	name text NOT NULL,
	description text NOT NULL,
	image_url text NOT NULL,
	owner_id text NOT NULL,
	category text NOT NULL,
	PRIMARY KEY(id)
);

COMMIT;

-- Inserting 4 rows into public.pets
-- Insert batch #1
INSERT INTO public.pets (id, name, description, image_url, owner_id, category) VALUES
('151c7e54-3a89-430d-9866-b245e393e536', 'Bon jovi', 'Bon jovi is a Canadian hairless cat, aka sphynx cat. He is very energetic and friendly to strangers', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F04%2F08%2Fsphynx-green-robe-1012208470-2000.jpg', 'f1fa9e2b-31be-49d6-ba21-52f9e805c84f', 'cat'),
('6addae3e-a18d-41a1-aa56-f2c764ee8ffd', 'Stairway', 'Stairway is an owl which loves to live in the attic. He''s normally quiet but he could be extremely ferocious when angry. ;)', 'https://i.natgeofe.com/n/9e03dc4c-3d08-439c-a2b2-ec6776f13e81/02-superb-owls-nationalgeographic_2564243.jpg', 'f1fa9e2b-31be-49d6-ba21-52f9e805c84f', 'owl'),
('2a8d8d91-025e-4600-b86c-eca9649c5a01', 'Cute Wallet Monster', 'The wallet monster is a creature made of carbon and plastic.', 'https://wenhao-su-dumbcard.glitch.me//images/walletIcon.png', 'f1fa9e2b-31be-49d6-ba21-52f9e805c84f', 'wallet'),
('5841323a-555d-4d16-8c6c-01c24e437631', 'Fatty', 'Fatty is a fat cat which loves to lie on the cold hard floor. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat. He''s fat.', 'https://wenhao-su-dumbcard.glitch.me//images/fatcatlying.jpg', 's9sdf23-lk24-sdf23-cvlkdfs-23jlkmds209j', 'cat');

-- END TABLE public.pets

-- BEGIN TABLE public.testing
DROP TABLE IF EXISTS public.testing CASCADE;
BEGIN;

CREATE TABLE IF NOT EXISTS public.testing (
	id integer NOT NULL,
	name text NOT NULL,
	PRIMARY KEY(id)
);

COMMIT;

-- Inserting 1 row into public.testing
-- Insert batch #1
INSERT INTO public.testing (id, name) VALUES
(143, 'mm');

-- END TABLE public.testing

-- BEGIN TABLE public.users
DROP TABLE IF EXISTS public.users CASCADE;
BEGIN;

CREATE TABLE IF NOT EXISTS public.users (
	id text NOT NULL,
	name text NOT NULL,
	contact text NOT NULL,
	zipcode text NOT NULL,
	avatar_url text,
	PRIMARY KEY(id)
);

COMMIT;

-- Inserting 2 rows into public.users
-- Insert batch #1
INSERT INTO public.users (id, name, contact, zipcode, avatar_url) VALUES
('f1fa9e2b-31be-49d6-ba21-52f9e805c84f', 'Johnny Silverhand', 'sldkl@klds.com', '94949', 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3076/30767392_sa.jpg'),
('s9sdf23-lk24-sdf23-cvlkdfs-23jlkmds209j', 'James Lemkin', 'fff@ucdavis.edu', '', NULL);

-- END TABLE public.users

