/// <reference types="node" />
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

interface AdminSetupOptions {
  email?: string;
  password?: string;
  force?: boolean;
}

/**
 * Setup or update admin user
 * This can be run independently to create/update admin user
 */
export async function setupAdmin(options: AdminSetupOptions = {}) {
  const email = options.email || process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = options.password || process.env.ADMIN_PASSWORD || 'changeme123';
  const force = options.force || false;

  try {
    console.log('🔧 Setting up admin user...');
    console.log(`   Email: ${email}`);

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    });

    if (existingAdmin && !force) {
      console.log('⚠️  Admin user already exists!');
      console.log('   Use force=true to update password');
      return {
        success: false,
        message: 'Admin user already exists. Use force=true to update.',
        user: existingAdmin,
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Password hashed');

    // Create or update admin
    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'admin',
      },
      create: {
        email,
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Admin user created/updated successfully!');
    console.log(`   ID: ${admin.id}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);

    return {
      success: true,
      message: 'Admin user created/updated successfully',
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    };
  } catch (error) {
    console.error('❌ Error setting up admin:', error);
    throw error;
  }
}

/**
 * CLI entry point for admin setup
 */
async function main() {
  const args = process.argv.slice(2);
  const options: AdminSetupOptions = {};

  // Parse command line arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--email' && args[i + 1]) {
      options.email = args[i + 1];
      i++;
    } else if (args[i] === '--password' && args[i + 1]) {
      options.password = args[i + 1];
      i++;
    } else if (args[i] === '--force') {
      options.force = true;
    }
  }

  try {
    const result = await setupAdmin(options);
    if (result.success) {
      console.log('\n🎉 Admin setup complete!');
      process.exit(0);
    } else {
      console.log('\n⚠️  Admin setup incomplete');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Admin setup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}
