-- Role: postgres
-- DROP ROLE IF EXISTS postgres;

CREATE ROLE postgres WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  REPLICATION
  ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:4YAf/5mlIpya6R/QVTFlCw==$Pbe8ml67tVuwi/VS6IsH+w8KQHuod/XmBcI2HpzYOu0=:UY3TA3bbhjmnaifRmVP+UJHWe6D1SfcQgKZ2iBzQs9g=';