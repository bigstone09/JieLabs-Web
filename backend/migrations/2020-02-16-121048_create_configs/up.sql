CREATE TABLE configs (
    id INTEGER PRIMARY KEY NOT NULL,
    key TEXT NOT NULL UNIQUE,
    value TEXT
)