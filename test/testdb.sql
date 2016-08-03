DROP TABLE IF EXISTS testing.person_test;

CREATE SCHEMA testing;

CREATE TABLE testing.person_test
(
  name text NOT NULL,
  CONSTRAINT pk_name PRIMARY KEY (name)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE testing.person_test
  OWNER TO "Omar";
