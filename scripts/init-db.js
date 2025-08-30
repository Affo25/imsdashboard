const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the schema file
const schemaPath = path.join(__dirname, '..', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

console.log('🚀 Initializing Cloudflare D1 Database...');
console.log('Database ID: 427e0283-4eb2-4430-8111-fff046afbbb2');
console.log('Database Name: imsdashboard-db');

try {
  // Execute the schema against the D1 database
  execSync(`wrangler d1 execute imsdashboard-db --file=${schemaPath}`, {
    stdio: 'inherit'
  });
  
  console.log('✅ Database schema applied successfully!');
  
  // Verify the table was created
  console.log('🔍 Verifying table creation...');
  execSync('wrangler d1 execute imsdashboard-db --command="SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'users\';"', {
    stdio: 'inherit'
  });
  
  console.log('✅ Database initialization completed successfully!');
  console.log('📝 You can now start using your IMS Dashboard application.');
  
} catch (error) {
  console.error('❌ Error initializing database:', error.message);
  console.log('💡 Make sure you have:');
  console.log('   1. Wrangler CLI installed: npm install -g wrangler');
  console.log('   2. Authenticated with Cloudflare: wrangler login');
  console.log('   3. Proper permissions for the D1 database');
  process.exit(1);
}
