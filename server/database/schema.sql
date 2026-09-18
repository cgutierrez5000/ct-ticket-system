CREATE TABLE IF NOT EXISTS users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'))
);

CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL
        CHECK (
            priority IN ('low', 'medium', 'high', 'urgent')
        ),
    status VARCHAR(20) NOT NULL DEFAULT 'open'
        CHECK (
            status IN ('open', 'in progress', 'closed')
        ),
    assigned_user_id INTEGER REFERENCES users(id)
);

