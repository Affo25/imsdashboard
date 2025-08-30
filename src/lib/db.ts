import bcrypt from 'bcryptjs';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
  designation?: string;
  type: 'admin' | 'user' | 'manager' | 'sales' | 'accounts' | 'marketing' | 'development';
  country?: string;
  areas?: string[]; // Will be stored as JSON string in SQLite
  phone?: string;
  status: 'active' | 'inactive';
  avatar?: string;
  birthday?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
  designation?: string;
  type?: 'admin' | 'user' | 'manager' | 'sales' | 'accounts' | 'marketing' | 'development';
  country?: string;
  areas?: string[];
  phone?: string;
  avatar?: string;
  birthday?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(userData: CreateUserData): Promise<User> {
  const { env } = getCloudflareContext();
  
  try {
    const hashedPassword = await hashPassword(userData.password);
    const areasJson = userData.areas ? JSON.stringify(userData.areas) : null;
    
    const result = await env.DB.prepare(`
      INSERT INTO users (
        email, password, first_name, last_name, designation, type, 
        country, areas, phone, avatar, birthday
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING id, email, first_name, last_name, designation, type, 
                country, areas, phone, status, avatar, birthday, created_at, updated_at
    `).bind(
      userData.email,
      hashedPassword,
      userData.first_name,
      userData.last_name || null,
      userData.designation || null,
      userData.type || 'user',
      userData.country || null,
      areasJson,
      userData.phone || null,
      userData.avatar || null,
      userData.birthday || null
    ).first<User & { areas: string }>();

    if (!result) {
      throw new DatabaseError('Failed to create user');
    }

    // Parse areas JSON back to array
    const user: User = {
      ...result,
      areas: result.areas ? JSON.parse(result.areas) : undefined
    };

    return user;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
    if (errorMessage.includes('UNIQUE constraint failed')) {
      throw new DatabaseError('Email already exists');
    }
    throw new DatabaseError(errorMessage);
  }
}

export async function authenticateUser(credentials: LoginCredentials): Promise<User | null> {
  const { env } = getCloudflareContext();
  
  try {
    const user = await env.DB.prepare(`
      SELECT id, email, password, first_name, last_name, designation, type, 
             country, areas, phone, status, avatar, birthday, created_at, updated_at
      FROM users
      WHERE email = ? AND status = 'active'
    `).bind(credentials.email).first<User & { password: string; areas: string }>();

    if (!user) {
      return null;
    }

    const isValidPassword = await verifyPassword(credentials.password, user.password);
    if (!isValidPassword) {
      return null;
    }

    // Return user without password, parse areas JSON
    const { password: _, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      areas: user.areas ? JSON.parse(user.areas) : undefined
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function getUserById(id: number): Promise<User | null> {
  const { env } = getCloudflareContext();
  
  try {
    const user = await env.DB.prepare(`
      SELECT id, email, first_name, last_name, designation, type, 
             country, areas, phone, status, avatar, birthday, created_at, updated_at
      FROM users
      WHERE id = ? AND status = 'active'
    `).bind(id).first<User & { areas: string }>();

    if (!user) return null;

    return {
      ...user,
      areas: user.areas ? JSON.parse(user.areas) : undefined
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { env } = getCloudflareContext();
  
  try {
    const user = await env.DB.prepare(`
      SELECT id, email, first_name, last_name, designation, type, 
             country, areas, phone, status, avatar, birthday, created_at, updated_at
      FROM users
      WHERE email = ? AND status = 'active'
    `).bind(email).first<User & { areas: string }>();

    if (!user) return null;

    return {
      ...user,
      areas: user.areas ? JSON.parse(user.areas) : undefined
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function updateUserLastLogin(userId: number): Promise<void> {
  const { env } = getCloudflareContext();
  
  try {
    await env.DB.prepare(`
      UPDATE users 
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(userId).run();
  } catch (error) {
    console.error('Error updating user last login:', error);
  }
}

export async function getAllUsers(): Promise<User[]> {
  const { env } = getCloudflareContext();
  
  try {
    const result = await env.DB.prepare(`
      SELECT id, email, first_name, last_name, designation, type, 
             country, areas, phone, status, avatar, birthday, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
    `).all<User & { areas: string }>();

    if (!result.results) return [];

    return result.results.map((user: User & { areas: string }) => ({
      ...user,
      areas: user.areas ? JSON.parse(user.areas) : undefined
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}