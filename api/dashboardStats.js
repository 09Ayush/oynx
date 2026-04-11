
// api/dashboardStats.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 1. Get Total Active Projects
    const totalProjects = await prisma.project.count({
      where: { isArchived: false }
    });

    // 2. Get Completed Projects
    const completedProjects = await prisma.project.count({
      where: { 
        status: 'COMPLETED',
        isArchived: false 
      }
    });

    // 3. Get Overdue Tasks
    const overdueTasks = await prisma.project.count({
      where: {
        dueDate: { lt: new Date() }, // Deadline is in the past
        status: { not: 'COMPLETED' }, // And it's not finished
        isArchived: false
      }
    });

    // 4. Calculate Efficiency Percentage
    const systemEfficiency = totalProjects === 0 
      ? 0 
      : Math.round((completedProjects / totalProjects) * 100);

    // Send the calculations back to the frontend
    return res.status(200).json({
      totalProjects,
      completedProjects,
      overdueTasks,
      systemEfficiency
    });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to calculate stats' });
  }
}