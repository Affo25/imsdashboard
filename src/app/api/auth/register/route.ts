import { NextRequest, NextResponse } from 'next/server';
import { createUser, DatabaseError } from '@/lib/db';

interface RegisterRequestBody {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
  designation?: string;
  type?: 'admin' | 'user' | 'manager' | 'sales' | 'accounts' | 'marketing' | 'development';
  country?: string;
  areas?: string[];
  phone?: string;
  birthday?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as RegisterRequestBody;
    const { email, password, first_name, last_name, designation, type = 'user', country, areas, phone, birthday } = body;

    if (!email || !password || !first_name) {
      return NextResponse.json(
        { error: 'Email, password, and first name are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const user = await createUser({
      email,
      password,
      first_name,
      last_name,
      designation,
      type: type as 'admin' | 'user' | 'manager' | 'sales' | 'accounts' | 'marketing' | 'development',
      country,
      areas,
      phone,
      birthday,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        designation: user.designation,
        type: user.type,
        country: user.country,
        areas: user.areas,
        phone: user.phone,
        status: user.status,
        avatar: user.avatar,
        birthday: user.birthday,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}