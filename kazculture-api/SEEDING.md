# Database Seeding

This document explains how to seed the database with initial data.

## Admin User Seed

The admin user seed creates a default administrator account for the application.

### Default Admin Credentials

- **Email**: `admin@kazculture.kz`
- **Password**: `admin123`
- **Role**: `ADMIN`

### Running the Seed

1. Make sure your database is running and migrations have been applied
2. Run the seed command:

```bash
npm run seed:admin
```

Or using pnpm:

```bash
pnpm seed:admin
```

### What the Seed Does

- Checks if an admin user already exists (prevents duplicate creation)
- Creates a new admin user with the default credentials
- Sets the user as email verified
- Assigns ADMIN role
- Hashes the password using bcrypt (handled by the User entity)

### Security Note

**Important**: Change the default admin password after first login for security purposes.

### Troubleshooting

If you encounter any issues:

1. Ensure your database is running and accessible
2. Check that your `.env` file has the correct database configuration
3. Verify that migrations have been run successfully
4. Check the console output for any error messages

### Customizing the Seed

You can modify the seed file at `src/seeds/admin-user.seed.ts` to:
- Change default credentials
- Add more initial users
- Set different user roles
- Add additional user properties 