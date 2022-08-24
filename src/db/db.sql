DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id bigserial NOT NULL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
    id bigserial NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    body VARCHAR(400) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE 
);

