import User from '../models/User.js';
import { sendEmail } from '../services/emailService.js';

const URL =  `http://${process.env.HOST}:${process.env.PORT}`;

export const sendTaskAssignedEmail = async (task) => {
  try {
    
    const assignedUser = await User.findByPk(task.assigned_to);
    if (!assignedUser) return;

    const taskUrl = `${URL}/tasks/${task.id}`;

    const subject = 'New Task Assigned';
    const body = `A new task has been assigned: ${taskUrl}`;

    await sendEmail(assignedUser.email, subject, body);

  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
  }
};
