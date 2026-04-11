import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // 1. GET: Fetch all users (with auto-seeding)
  if (req.method === 'GET') {
    try {
      let users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });

      if (users.length === 0) {
        await prisma.user.createMany({
          data: [
            { name: 'Ishani Gupta', handle: '@ishani', role: 'MANAGER' },
            { name: 'Vihaan Reddy', handle: '@vihaan', role: 'USER' },
            { name: 'Ananya Sharma', handle: '@ananya', role: 'USER' },
          ]
        });
        users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
      }
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  // 2. POST: Create a new user
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const newUser = await prisma.user.create({
        data: {
          name: data.name,
          handle: data.handle,
          role: data.role || 'USER',
        }
      });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}