DROP TABLE IF EXISTS music_instrument;
DROP TABLE IF EXISTS instrument_type;
DROP TABLE IF EXISTS instrument_brand;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS post_type;
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS user_order;
DROP TABLE IF EXISTS account;

DROP TYPE IF EXISTS accountRole;
DROP TYPE IF EXISTS orderSTatus;

CREATE TYPE accountRole AS ENUM ('admin', 'customer');
CREATE TYPE orderStatus AS ENUM ('pending', 'success', 'fail');

CREATE TABLE account(
    id serial,
    fname varchar(128) NOT NULL DEFAULT '',
    lname varchar(128) NOT NULL DEFAULT '',
    email varchar(128) UNIQUE NOT NULL,
    password varchar(128) NOT NULL,
    role accountRole NOT NULL,
    CONSTRAINT account_pk PRIMARY KEY (id)
) WITH (
    OIDS=FALSE
);

CREATE TABLE instrument_type(
    id serial,
    name varchar(128) NOT NULL UNIQUE,
    CONSTRAINT instrument_type_pk PRIMARY KEY (id)
) WITH (
    OIDS=FALSE
);

CREATE TABLE instrument_brand(
    id serial,
    name varchar(128) NOT NULL UNIQUE,
    CONSTRAINT instrument_brand_pk PRIMARY KEY (id)
) WITH (
    OIDS=FALSE
);

CREATE TABLE music_instrument(
    id serial,
    name varchar(128) NOT NULL,
    type_id integer NOT NULL,
    brand_id integer NOT NULL,
    price float NOT NULL,
    count integer NOT NULL DEFAULT 0,
    availability boolean NOT NULL DEFAULT FALSE,
    created_at timestamp NOT NULL DEFAULT now(),
    image_url varchar(256),
    CONSTRAINT music_instrument_pk PRIMARY KEY (id),
    CONSTRAINT music_instrument_type_fk FOREIGN KEY (type_id) REFERENCES instrument_type (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT music_instrument_brand_fk FOREIGN KEY (brand_id) REFERENCES instrument_brand (id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE(brand_id, name)
) WITH (
    OIDS=FALSE
);

CREATE TABLE post_type(
    id serial,
    name varchar(128) NOT NULL UNIQUE,
    display_name varchar(128) NOT NULL,
    CONSTRAINT post_type_pk  PRIMARY KEY (id)
) WITH (
    OIDS=FALSE
);

CREATE TABLE post(
    id serial,
    title varchar(128) NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    body text NOT NULL,
    image_url varchar(256),
    description varchar(1028) DEFAULT '',
    enabled boolean NOT NULL DEFAULT false,
    post_type_id integer NOT NULL,
    CONSTRAINT post_pk  PRIMARY KEY (id),
    CONSTRAINT post_typ_post_fk FOREIGN KEY (post_type_id) REFERENCES post_type (ID) ON DELETE CASCADE ON UPDATE CASCADE
) WITH (
    OIDS=FALSE
);

CREATE TABLE user_order(
    id serial UNIQUE,
    account_id integer NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    status orderStatus NOT NULL,
    CONSTRAINT user_order_pk  PRIMARY KEY (id),
    CONSTRAINT order_account_fk FOREIGN KEY (account_id) REFERENCES account (ID) ON DELETE CASCADE ON UPDATE CASCADE
) WITH (
    OIDS=FALSE
);

CREATE TABLE order_item(
    id serial,
    item_id integer NOT NULL,
    order_id integer NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT order_item_pk  PRIMARY KEY (id),
    CONSTRAINT order_item_fk FOREIGN KEY (item_id) REFERENCES music_instrument (ID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT order_item_order_fk FOREIGN KEY (order_id) REFERENCES user_order (id) ON DELETE CASCADE ON UPDATE CASCADE
) WITH (
    OIDS=FALSE
);

INSERT INTO account(fname, lname, email, password, role) values('Timur', 'Ramazanov', 'test@mail.com', '1234', 'admin');

INSERT INTO post_type(name, display_name    ) values('stock', 'Акции');
INSERT INTO post_type(name, display_name) values('news', 'Новости');
INSERT INTO post_type(name, display_name) values('blog', 'Блог');

grant all privileges on all tables in schema public to music_store_client;
grant all privileges on all sequences in schema public to music_store_client;
