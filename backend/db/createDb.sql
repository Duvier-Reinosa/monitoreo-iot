CREATE TABLE IF NOT EXISTS agent_logs (
    id SERIAL PRIMARY KEY,
    agent_name VARCHAR(255) NOT NULL,
    log_time TIMESTAMP default now(),
    log_value float8 NOT NULL
);