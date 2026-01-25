#!/usr/bin/env node

/**
 * Generate a secure JWT secret
 * Usage: node scripts/generate-jwt-secret.js [length]
 * Default length: 64 bytes (128 hex characters)
 */

const crypto = require('crypto');

const length = parseInt(process.argv[2] || '64', 10);

if (isNaN(length) || length < 32) {
  console.error('Error: Secret length must be at least 32 bytes');
  process.exit(1);
}

const secret = crypto.randomBytes(length).toString('hex');

console.log('\n🔐 Generated JWT Secret:');
console.log('='.repeat(80));
console.log(secret);
console.log('='.repeat(80));
console.log(`\nLength: ${secret.length} characters (${length} bytes)`);
console.log('\nAdd this to your .env file:');
console.log(`JWT_SECRET="${secret}"\n`);
