import { User, UserRole } from '../users/entities/user.entity';
import databaseConfig from '../config/database.config';

async function seedAdminUser() {
  try {
    await databaseConfig.initialize();
    console.log('Database connection established');

    const userRepository = databaseConfig.getRepository(User);

    // Check if admin user already exists
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@kazculture.kz' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const adminUser = new User();
    adminUser.name = 'Admin User';
    adminUser.email = 'admin@kazculture.kz';
    adminUser.hashedPassword = 'admin123'; // This will be hashed by the entity hook
    adminUser.role = UserRole.ADMIN;
    adminUser.isEmailVerified = true;

    await userRepository.save(adminUser);
    console.log('Admin user created successfully');
    console.log('Email: admin@kazculture.kz');
    console.log('Password: admin123');

  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await databaseConfig.destroy();
    console.log('Database connection closed');
  }
}

// Run the seed if this file is executed directly
if (require.main === module) {
  seedAdminUser()
    .then(() => {
      console.log('Seed completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}

export { seedAdminUser }; 