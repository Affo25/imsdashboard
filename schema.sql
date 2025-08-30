-- User table schema for IMS Dashboard
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    designation TEXT,
    type TEXT NOT NULL DEFAULT 'user' CHECK (type IN ('admin', 'user', 'manager', 'sales', 'accounts', 'marketing', 'development')),
    country TEXT,
    areas TEXT, -- JSON string for areas array
    phone TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    avatar TEXT,
    birthday TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on type for role-based queries
CREATE INDEX IF NOT EXISTS idx_users_type ON users(type);

-- Create index on status for active user queries
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- Trigger to update updated_at timestamp
CREATE TRIGGER IF NOT EXISTS update_users_updated_at 
    AFTER UPDATE ON users
    FOR EACH ROW
    BEGIN
        UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
