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

    assigned_to VARCHAR(255) NOT NULL
);