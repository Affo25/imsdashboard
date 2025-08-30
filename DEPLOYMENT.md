# IMS Dashboard - Cloudflare Deployment Guide

This guide will help you deploy your IMS Dashboard application to Cloudflare Workers with D1 database.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install globally
   ```bash
   npm install -g wrangler
   ```
3. **Node.js**: Version 18 or higher

## Step 1: Authentication

Login to Cloudflare using Wrangler:

```bash
wrangler login
```

## Step 2: Database Setup

Your D1 database is already configured with:
- **Database ID**: `427e0283-4eb2-4430-8111-fff046afbbb2`
- **Database Name**: `imsdashboard-db`

### Initialize Database Schema

Run the database initialization script:

```bash
npm run db:init
```

This will:
- Create the `users` table with all required fields
- Set up indexes for better performance
- Create triggers for automatic timestamp updates

### Verify Database Setup

Check if the table was created successfully:

```bash
npm run db:execute -- --command="SELECT name FROM sqlite_master WHERE type='table';"
```

## Step 3: Environment Configuration

Create a `.env.local` file in your project root:

```bash
# Copy the example file
cp env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=production
```

## Step 4: Build and Deploy

### Development

For local development with Cloudflare Workers:

```bash
npm run dev
```

### Production Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## Step 5: Verify Deployment

1. **Check your deployment URL** (usually `https://imsdashboard.your-subdomain.workers.dev`)
2. **Test user registration** at `/register`
3. **Test user login** at `/login`
4. **Verify database operations** by checking if users are created

## Database Management

### Access Database Shell

```bash
npm run db:shell
```

### Execute Custom Queries

```bash
npm run db:execute -- --command="SELECT * FROM users;"
```

### Backup Database

```bash
wrangler d1 export imsdashboard-db --output=backup.sql
```

### Restore Database

```bash
wrangler d1 execute imsdashboard-db --file=backup.sql
```

## Troubleshooting

### Common Issues

1. **Authentication Error**
   ```bash
   wrangler login
   ```

2. **Database Connection Error**
   - Verify database ID in `wrangler.toml`
   - Check permissions in Cloudflare dashboard

3. **Build Errors**
   ```bash
   npm run build
   npm run check
   ```

4. **Environment Variables**
   - Ensure `.env.local` is properly configured
   - Check JWT_SECRET is set

### Useful Commands

```bash
# Check Wrangler version
wrangler --version

# List all D1 databases
wrangler d1 list

# Check database info
wrangler d1 info imsdashboard-db

# View logs
wrangler tail
```

## Security Considerations

1. **JWT Secret**: Use a strong, random string for JWT_SECRET
2. **Environment Variables**: Never commit `.env.local` to version control
3. **Database Access**: Limit database access to necessary operations only
4. **HTTPS**: Cloudflare Workers automatically provide HTTPS

## Performance Optimization

1. **Database Indexes**: Already configured in schema
2. **Caching**: Implement caching for frequently accessed data
3. **Connection Pooling**: D1 handles this automatically
4. **CDN**: Cloudflare provides global CDN automatically

## Monitoring

1. **Cloudflare Analytics**: Monitor traffic and performance
2. **Error Tracking**: Check Wrangler logs for errors
3. **Database Performance**: Monitor query performance in Cloudflare dashboard

## Support

If you encounter issues:

1. Check the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
2. Review [D1 database documentation](https://developers.cloudflare.com/d1/)
3. Check the project's README.md for additional information

## Next Steps

After successful deployment:

1. **Customize the application** for your specific needs
2. **Add more features** like inventory management
3. **Implement monitoring** and analytics
4. **Set up CI/CD** for automated deployments
5. **Configure custom domain** if needed
