import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.user.deleteMany();

  // Create test users
  const password = await hash('Password123!', 12);

  const adminCoach = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'Coach',
      hashedPassword: password,
      role: UserRole.ADMIN_COACH,
    },
  });

  const sportsCoach = await prisma.user.create({
    data: {
      email: 'coach@example.com',
      firstName: 'Sports',
      lastName: 'Coach',
      hashedPassword: password,
      role: UserRole.SPORTS_COACH,
    },
  });

  const athlete = await prisma.user.create({
    data: {
      email: 'athlete@example.com',
      firstName: 'Test',
      lastName: 'Athlete',
      hashedPassword: password,
      role: UserRole.ATHLETE,
      athlete: {
        create: {
          gender: 'MALE',
          graduationYear: 2025,
        },
      },
    },
  });

  console.log({ adminCoach, sportsCoach, athlete });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 