import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  const projectId = parseInt(id);

  if (req.method === 'PUT') {
    try {
      const data = req.body;
      
      if (data.dueDate === "") data.dueDate = null;
      else if (data.dueDate) data.dueDate = new Date(data.dueDate);

      // Clean up the assignee data for Prisma
      if (data.assigneeId) data.assigneeId = parseInt(data.assigneeId);
      if (data.assigneeId === "") data.assigneeId = null;
      delete data.assignee; 

      const updatedProject = await prisma.project.update({
        where: { id: projectId },
        data: data,
        include: { assignee: true } // Grab the user's name!
      });
      return res.status(200).json(updatedProject);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update project' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.project.delete({ where: { id: projectId } });
      return res.status(204).end(); 
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete project' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}