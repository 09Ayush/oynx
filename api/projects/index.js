import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        include: { assignee: true } // Grab the user's name from the relation!
      });
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch projects' });
    }
  }

  if (req.method === 'POST') {
    try {
      const data = req.body;
      const newProject = await prisma.project.create({
        data: {
          title: data.title,
          description: data.description,
          status: data.status || 'TO DO',
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
          // Save the ID instead of the string!
          assigneeId: data.assigneeId ? parseInt(data.assigneeId) : null
        },
        include: { assignee: true } 
      });
      return res.status(201).json(newProject);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create project' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}