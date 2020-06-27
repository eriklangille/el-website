-- docker run --name postgres-0 -e POSTGRES_PASSWORD=pass123 -d -p 5432:5432 postgres:alpine
-- if it already exists: docker start postgres-0
-- docker exec -it postgres-0 bash
-- psql -U postgres

-- Database for el-website
create Database elwebsite;

-- Need tables for project list, blogs.

-- Blog list
create table blog(blog_id serial primary key, created_date date, modified_date date, title text, post_url text, author text, image uuid, short_desc text, post text, published boolean);

-- Project list
create table projects (project_id serial primary key, created_date date, modified_date date, start_date date, finish_date date, title text, image uuid, description text, published boolean, button_link text, button_text text);

-- Sample project
insert into projects (created_date, modified_date, start_date, finish_date, title, image, description, published)
values (current_timestamp, current_timestamp, '2020-6-1', '2020-6-26', 'Personal website', '0b5f1b65-c37d-4350-b979-b62bc4eb1f7e', 'The creation of my website using React, Next.js, and Node.js.', true)

-- Blog hashtags
create table blog_hashtags(blog_tag_id serial primary key, blog_id uuid, tag_id uuid);

-- Hashtag list
create table hashtags(tag_id uuid primary key, tag_name text, tag_color varchar(7));

-- Image List
create table image_list(image_id uuid primary key, linked_item smallint, linked_id integer);

-- Sample Blog Posts
insert into blog (created_date, modified_date, title, post_url, author, image_url, short_desc, post) values('2020-05-13', '2020-05-13', 'Hunting with Jasmine', 'hunting-jasmine', 'Erik Langille', 'https://eriklangille.com/static/media/img3.37ce126e.jpg', 'Jasmine is a feline friend that is on the prowl for critters. By studying her behaviour, one can become a hunter too.', 'Jasmine the feline friend is my favourite cat. She has been with our family for over eight years now and is well behaved pet. And she has a few tricks up her sleeve. ');

-- User table
create table users(user_id uuid primary key, name varchar(12), email text, password text, created_date date, admin_user boolean);