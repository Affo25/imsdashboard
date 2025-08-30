#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function runMigrations() {
  console.log('🚀 Running database migrations...');
  
  const migrationsDir = path.join(__dirname, '../migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    console.error('❌ Migrations directory not found');
    process.exit(1);
  }

  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  if (migrationFiles.length === 0) {
    console.log('ℹ️ No migration files found');
    return;
  }

  console.log('📋 Found migrations:');
  migrationFiles.forEach(file => {
    console.log(`   - ${file}`);
  });

  console.log('\n📝 To apply these migrations to your Cloudflare D1 database:');
  console.log('\n1. First, create your D1 database:');
  console.log('   wrangler d1 create imsdashboard-db');
  
  console.log('\n2. Copy the database_id from the output and update wrangler.jsonc');
  
  console.log('\n3. Run the migrations:');
  migrationFiles.forEach(file => {
    const migrationPath = path.join(migrationsDir, file);
    console.log(`   wrangler d1 execute imsdashboard-db --file=${migrationPath}`);
  });

  console.log('\n4. For local development, also run:');
  migrationFiles.forEach(file => {
    const migrationPath = path.join(migrationsDir, file);
    console.log(`   wrangler d1 execute imsdashboard-db --local --file=${migrationPath}`);
  });

  console.log('\n✅ Migration setup complete!');
  console.log('\n📖 Next steps:');
  console.log('   - Update JWT_SECRET in wrangler.jsonc');
  console.log('   - Run: npm install');
  console.log('   - Run: npm run dev');
}

runMigrations().catch(console.error);