# IMS Dashboard - Inventory Management System

A comprehensive inventory management system built with Next.js, TypeScript, and Cloudflare Workers.

## Features

### 🔐 Authentication System
- JWT-based authentication with secure token management
- Role-based access control (Admin, User, Manager, Sales, Accounts, Marketing, Development)
- Password hashing with bcryptjs
- HTTP-only cookies for secure token storage

### 👤 User Management
- Complete user registration with all fields:
  - **Personal Information**: First Name, Last Name, Email, Phone, Birthday
  - **Professional Details**: Designation, User Type, Country
  - **Areas of Expertise**: Dynamic tag-based input system
  - **Security**: Password with confirmation
- User profile management
- User status tracking (Active/Inactive)

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Beautiful gradient backgrounds
- Interactive form elements with icons
- Loading states and error handling
- Success notifications

### 🛡️ Security Features
- Input validation and sanitization
- Email format validation
- Password strength requirements
- CSRF protection
- Secure cookie settings

## Database Schema

The user table includes all necessary fields for comprehensive user management:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    designation TEXT,
    type TEXT NOT NULL DEFAULT 'user',
    country TEXT,
    areas TEXT, -- JSON string for areas array
    phone TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    avatar TEXT,
    birthday TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Cloudflare account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd imsdashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
JWT_SECRET=your-secret-key-here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## User Registration

### Complete User Registration Form

The registration form includes all user fields:

1. **Personal Information**
   - First Name (required)
   - Last Name
   - Email Address (required)
   - Phone Number
   - Birthday

2. **Professional Information**
   - Designation/Job Title
   - User Type (dropdown with all roles)
   - Country

3. **Areas of Expertise**
   - Dynamic tag input system
   - Press Enter to add areas
   - Click × to remove areas

4. **Security**
   - Password (minimum 6 characters)
   - Confirm Password

### User Types Available
- **User**: Basic access
- **Admin**: Full system access
- **Manager**: Management-level access
- **Sales**: Sales-specific features
- **Accounts**: Financial access
- **Marketing**: Marketing tools access
- **Development**: Technical features access

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Request/Response Examples

#### Register User
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe",
  "designation": "Software Engineer",
  "type": "user",
  "country": "United States",
  "areas": ["JavaScript", "React", "Node.js"],
  "phone": "+1-555-0123",
  "birthday": "1990-01-01"
}
```

#### Login User
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

## Project Structure

```
src/
├── app/
│   ├── api/auth/          # Authentication API routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── layout.tsx        # Root layout
├── components/
│   └── DashboardLayout.tsx # Dashboard layout component
├── contexts/
│   └── AuthContext.tsx   # Authentication context
├── lib/
│   ├── db.ts            # Database operations
│   └── jwt.ts           # JWT utilities
└── middleware.ts        # Route protection middleware
```

## Deployment

### Cloudflare Workers
This project is configured for Cloudflare Workers deployment:

```bash
npm run deploy
```

### Environment Variables for Production
- `JWT_SECRET`: Secure random string for JWT signing
- Database configuration (Cloudflare D1)

## Security Considerations

1. **Password Security**: Passwords are hashed using bcryptjs with 12 salt rounds
2. **JWT Security**: Tokens are stored in HTTP-only cookies
3. **Input Validation**: All user inputs are validated and sanitized
4. **Role-based Access**: Middleware protects routes based on user roles
5. **CSRF Protection**: Built-in protection against CSRF attacks

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.