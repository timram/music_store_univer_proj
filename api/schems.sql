

DROP TABLE IF EXISTS account;   

DROP TYPE IF EXISTS accountRole;

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

grant all privileges on all tables in schema public to music_store_client;
grant all privileges on all sequences in schema public to music_store_client;
