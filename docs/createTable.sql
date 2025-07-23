CREATE DATABASE IF NOT EXISTS currency;
use currency;

create table currencies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR (30) NOT NULL UNIQUE,
    name VARCHAR(30) NOT NULL,
    symbol VARCHAR(30),
    country VARCHAR(30),
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO currencies (code, name, symbol, country)
VALUES 
('USD', 'US Dollar', '$', 'United States'),
('EUR', 'Euro', '€', 'European Union'),
('JPY', 'Japanese Yen', '¥', 'Japan'),
('GBP', 'British Pound', '£', 'United Kingdom'),
('CNY', 'Chinese Yuan', '¥', 'China');

INSERT INTO users (email, password_hash, username)
VALUES
('alice@example.com', 'hashed_password_1', 'alice123'),
('bob@example.com', 'hashed_password_2', 'bob456'),
('carol@example.com', 'hashed_password_3', 'carol789');

