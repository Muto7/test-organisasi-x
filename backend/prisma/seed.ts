import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { username: 'adminpusat' },
    update: {},
    create: {
      username: 'adminpusat',
      password: hashedPassword,
      role: 'PUSAT',
      wilayah: 'ALL'
    },
  });

  console.log('✅ Admin berhasil dibuat!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
