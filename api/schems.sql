

DROP TABLE IF EXISTS account;   
DROP TABLE IF EXISTS music_instrument;
DROP TABLE IF EXISTS instrument_type;
DROP TABLE IF EXISTS instrument_brand;

DROP TYPE IF EXISTS accountRole;
DROP TYPE IF EXISTS instrument_type;

CREATE TYPE accountRole AS ENUM ('admin', 'customer');

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
    CONSTRAINT music_instrument_pk PRIMARY KEY (id),
    CONSTRAINT music_instrument_type_fk FOREIGN KEY (type_id) REFERENCES instrument_type (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT music_instrument_brand_fk FOREIGN KEY (brand_id) REFERENCES instrument_brand (id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE(brand_id, name)
) WITH (
    OIDS=FALSE
);

INSERT INTO account(fname, lname, email, password, role) values('Timur', 'Ramazanov', 'test@mail.com', '1234', 'admin');

grant all privileges on all tables in schema public to music_store_client;
grant all privileges on all sequences in schema public to music_store_client;
