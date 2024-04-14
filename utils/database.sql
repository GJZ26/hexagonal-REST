DROP DATABASE IF EXISTS recu1 ;
CREATE DATABASE IF NOT EXISTS recu1;

USE recu1;

-- Crear la tabla 'authors'
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT UUID(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Crear la tabla 'entries'
CREATE TABLE entries (
    id UUID PRIMARY KEY DEFAULT UUID(),
    author_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

