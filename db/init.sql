-- db/init.sql

CREATE TABLE IF NOT EXISTS people (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Test edebilmemiz için başlangıçta birkaç sahte veri (Seed Data) ekleyelim
INSERT INTO people (full_name, email) VALUES 
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com')
ON CONFLICT (email) DO NOTHING;