import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromRequest } from '@/lib/jwt';

// Define protected routes and their required roles
const protectedRoutes = {
  '/dashboard': ['admin', 'user', 'manager', 'sales', 'accounts', 'marketing', 'development'],
  '/admin': ['admin'],
  '/api/admin': ['admin'],
  '/api/users': ['admin', 'manager'],
} as const;

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if the route is protected
  const protectedRoute = Object.keys(protectedRoutes).find(route => 
    pathname.startsWith(route)
  );

  if (!protectedRoute) {
    return NextResponse.next();
  }

  // Extract and verify token
  const token = extractTokenFromRequest(request);
  
  if (!token) {
    return redirectToLogin(request);
  }

  const payload = verifyToken(token);
  
  if (!payload) {
    return redirectToLogin(request);
  }

  // Check role permissions
  const requiredRoles = protectedRoutes[protectedRoute as keyof typeof protectedRoutes];
  if (!requiredRoles.includes(payload.type as any)) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    );
  }

  // Add user info to headers for use in API routes
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', payload.userId.toString());
  requestHeaders.set('x-user-email', payload.email);
  requestHeaders.set('x-user-type', payload.type);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};