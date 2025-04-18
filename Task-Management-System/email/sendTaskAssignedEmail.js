import User from '../models/User.js';
import { sendEmail } from '../services/emailService.js';

export const sendTaskAssignedEmail = async (task) => {
  try {
    const assignedUser = await User.findByPk(task.assigned_to);
    if (!assignedUser) return;

    const taskUrl = `http://localhost:8080/tasks/${task.id}`;
    const subject = 'New Task Assigned';
    const body = `A new task has been assigned: ${taskUrl}`;

    await sendEmail(assignedUser.email, subject, body);

  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
  }
};
