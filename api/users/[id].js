import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  const userId = parseInt(id);

  if (req.method === 'DELETE') {
    try {
      // 1. Safety first: Unassign this user from any active projects!
      await prisma.project.updateMany({
        where: { assigneeId: userId },
        data: { assigneeId: null }
      });

      // 2. Now it is safe to delete the user
      await prisma.user.delete({
        where: { id: userId },
      });
      
      return res.status(204).end(); 
    } catch (error) {
      console.error("Delete User Error:", error);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  }

  res.setHeader('Allow', ['DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}