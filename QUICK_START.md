# IMS Dashboard - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Environment Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp env.example .env.local
   ```

3. **Edit `.env.local` and set your JWT secret:**
   ```env
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

### Step 2: Database Setup

Your Cloudflare D1 database is already configured and ready to use:

- **Database ID**: `427e0283-4eb2-4430-8111-fff046afbbb2`
- **Database Name**: `imsdashboard-db`
- **Status**: ✅ Schema applied, users populated

### Step 3: Start Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## 🔐 Login Credentials

You can login with these existing users:

| Email | Password | Role |
|-------|----------|------|
| `admin@example.com` | (contact admin) | Admin |
| `admin@ims.com` | (contact admin) | User |
| `test@gmail.com` | (contact admin) | Admin |

## 📝 Create New Users

1. Go to `/register` to create new users
2. Fill out the comprehensive registration form
3. Users will be saved to the remote Cloudflare D1 database

## 🗄️ Database Commands

```bash
# View users in remote database
npm run db:execute -- "SELECT * FROM users;"

# Backup database
npm run db:backup

# Access local database shell (for development)
npm run db:shell
```

## 🚀 Deploy to Production

```bash
npm run deploy
```

Your application will be deployed to Cloudflare Workers with the remote database!

## ✅ What's Working

- ✅ **Remote Database**: Connected to Cloudflare D1
- ✅ **User Registration**: Complete form with all fields
- ✅ **User Authentication**: JWT-based login system
- ✅ **Dashboard**: Protected routes with role-based access
- ✅ **Database Management**: Backup and query tools

## 🆘 Need Help?

- Check the `DEPLOYMENT.md` for detailed instructions
- Review the `README.md` for comprehensive documentation
- Database issues? Use `npm run db:execute` to check remote database
