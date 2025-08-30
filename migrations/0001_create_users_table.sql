-- Create users table with extended fields to match the MongoDB schema
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  designation TEXT,
  type TEXT NOT NULL DEFAULT 'user' CHECK (type IN ('admin', 'user', 'manager', 'sales', 'accounts', 'marketing', 'development')),
  country TEXT,
  areas TEXT, -- JSON string for array of areas
  phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  avatar TEXT,
  birthday DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users (type);
CREATE INDEX IF NOT EXISTS idx_users_status ON users (status);

-- Create user_sessions table for session management
CREATE TABLE IF NOT EXISTS user_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token_hash TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions (token_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON user_sessions (user_id);

-- Insert default admin user (password: admin123)
INSERT OR IGNORE INTO users (email, password, first_name, last_name, type, status) 
VALUES (
  'admin@example.com', 
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LdyBBD8J/Pxy.xyz1', -- bcrypt hash of 'admin123'
  'System', 
  'Administrator',
  'admin',
  'active'
);